import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { SITE, whatsappLink } from "@/lib/site";

// La clave va SOLO en la variable de entorno ANTHROPIC_API_KEY (Netlify → Environment variables).
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Haiku: rápido y económico, ideal para un chat de web. Se puede cambiar sin tocar código
// con la variable de entorno ANTHROPIC_MODEL.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-5-5";

const MAX_MESSAGE_CHARS = 1500;
const MAX_HISTORY = 12; // últimos mensajes que se mandan como contexto
const MAX_TOTAL_CHARS = 9000;

const SYSTEM_PROMPT = `
Sos "IAn", el asistente virtual del ${SITE.name}.

PERSONALIDAD
- Cercano, resolutivo y con buena onda, pero siempre profesional. Español rioplatense (vos).
- Respuestas breves: 2 a 5 oraciones o una lista corta. Usá emojis con moderación.
- No inventes precios, plazos, normativa puntual ni datos que no conozcas: en esos casos ofrecé que José lo analice.
- Si te preguntan algo fuera de los servicios del estudio, respondé corto y volvé al tema.

SERVICIOS
1. Comercio exterior: importación y exportación, inteligencia comercial, costos FOB y landed cost, sourcing y pagos al exterior, logística y aduana (en equipo con el despachante).
2. Ingeniería de costos: detectar fugas de dinero, rentabilidad real y precios estratégicos.
3. Consultoría estratégica: gerenciamiento externo, diagnóstico empresarial, auditoría y reingeniería de procesos.
4. Sector público: modernización de municipios, ingeniería fiscal y mejora de la recaudación con foco en desarrollo productivo.

DATOS
- Lidera el estudio el Dr. José Antonio Scheifler, Licenciado en Comercio Internacional, Mat. N° 16007 CPCEER.
- Ubicación: ${SITE.location}. Atiende clientes de todo el país y del exterior.
- En la web se puede agendar una videollamada de 30 minutos: [Agendar videollamada](${SITE.calendar})

LINKS (usá SIEMPRE este formato Markdown para que se puedan clicar)
- WhatsApp: [${SITE.whatsappDisplay}](${whatsappLink()})
- Email: [${SITE.email}](mailto:${SITE.email})

OBJETIVO
Entender qué necesita la persona y llevarla a un próximo paso concreto: WhatsApp o videollamada.
`.trim();

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const b = body as { messages?: unknown; message?: unknown };

  // Compatibilidad con el formato viejo { message: "..." }
  const raw: unknown[] = Array.isArray(b.messages)
    ? b.messages
    : typeof b.message === "string"
      ? [{ role: "user", content: b.message }]
      : [];

  const clean: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_HISTORY)) {
    if (!m || typeof m !== "object") continue;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") continue;
    const text = content.trim().slice(0, MAX_MESSAGE_CHARS);
    if (!text) continue;
    // La API exige alternar roles: fusionamos mensajes seguidos del mismo rol.
    const last = clean[clean.length - 1];
    if (last && last.role === role) last.content += "\n\n" + text;
    else clean.push({ role, content: text });
  }

  while (clean.length && clean[0].role !== "user") clean.shift();
  if (!clean.length || clean[clean.length - 1].role !== "user") return null;

  let total = clean.reduce((n, m) => n + m.content.length, 0);
  while (total > MAX_TOTAL_CHARS && clean.length > 1) {
    total -= clean.shift()!.content.length;
    while (clean.length && clean[0].role !== "user") total -= clean.shift()!.content.length;
  }
  return clean.length ? clean : null;
}

export async function POST(req: Request) {
  const ip = clientIp(req.headers);

  // 8 mensajes por minuto y 40 por hora por IP: suficiente para una charla real,
  // corta scripts que quieran gastar créditos.
  const burst = rateLimit(`chat:m:${ip}`, 8, 60_000);
  const hourly = rateLimit(`chat:h:${ip}`, 40, 3_600_000);
  if (!burst.ok || !hourly.ok) {
    return NextResponse.json(
      {
        error: "rate_limited",
        response: `Uy, vamos muy rápido 😅. Esperá un ratito o seguimos por [WhatsApp](${whatsappLink()}).`,
      },
      { status: 429 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[chat] Falta ANTHROPIC_API_KEY");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("\n")
      .trim();

    return NextResponse.json({ response: text || "Perdón, no te entendí bien. ¿Me lo contás de otra forma?" });
  } catch (error) {
    console.error("[chat] Error de Anthropic:", error);
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}
