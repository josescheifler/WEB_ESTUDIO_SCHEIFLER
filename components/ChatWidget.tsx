"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { SITE, whatsappLink } from "@/lib/site";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "ian-chat-v2";
const SUGGESTIONS = [
  "Quiero empezar a exportar",
  "¿Cómo calculo mi costo de importación?",
  "Busco asesoría para un municipio",
];
const FALLBACK = `Se me cruzaron los cables 🔌. ¿Seguimos por [WhatsApp](${whatsappLink()})?`;

function load(): Msg[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Msg[]) : [];
  } catch {
    return [];
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restaurar la charla de esta pestaña
  useEffect(() => setMessages(load()), []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {}
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Cartelito de bienvenida, una sola vez por sesión
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ian-teaser") === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 7000);
    return () => clearTimeout(t);
  }, []);

  function dismissTeaser() {
    setTeaser(false);
    try {
      sessionStorage.setItem("ian-teaser", "1");
    } catch {}
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });
      const data = (await res.json().catch(() => ({}))) as { response?: string };
      const reply = typeof data.response === "string" && data.response.trim() ? data.response : FALLBACK;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: FALLBACK }]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function toggle() {
    setOpen((v) => !v);
    dismissTeaser();
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat con IAn, asistente virtual"
          className="flex h-[min(36rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] origin-bottom-right animate-pop-in flex-col overflow-hidden rounded-3xl border border-navy-900/10 bg-paper shadow-[0_30px_80px_-20px_rgba(1,1,68,0.45)] sm:w-[24rem]"
        >
          <div className="grain relative overflow-hidden bg-navy-900 px-5 py-4 text-white">
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gold font-serif text-lg italic text-navy-950">
                  IA
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-navy-900 bg-emerald-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold">IAn · Asistente del Estudio</p>
                  <p className="text-xs text-white/55">Responde al instante</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMessages([])}
                    className="rounded-full px-2 py-1 text-[0.65rem] uppercase tracking-wider text-white/50 hover:text-white"
                  >
                    Reiniciar
                  </button>
                )}
                <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat" className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
            {messages.length === 0 && (
              <div className="animate-fade-in">
                <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-relaxed text-navy-900 shadow-soft">
                  ¡Hola! 👋 Soy <strong>IAn</strong>, el asistente del Estudio Scheifler. Contame qué necesitás y te oriento en
                  el momento.
                </div>
                <p className="mb-2 mt-6 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-navy-900/40">
                  Sugerencias
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-navy-900/15 bg-white px-3.5 py-2 text-left text-xs text-navy-900 transition-colors hover:border-gold hover:bg-gold/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div
                  className={`max-w-[88%] px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-2xl rounded-br-md bg-navy-900 text-white"
                      : "rounded-2xl rounded-bl-md bg-white text-navy-900 shadow-soft"
                  }`}
                >
                  {m.role === "user" ? (
                    <span className="whitespace-pre-wrap">{m.content}</span>
                  ) : (
                    <ReactMarkdown
                      components={{
                        a: (props) => (
                          <a
                            href={props.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-navy-900 underline decoration-gold decoration-2 underline-offset-2 hover:text-gold-dark"
                          >
                            {props.children}
                          </a>
                        ),
                        strong: (props) => <strong className="font-semibold">{props.children}</strong>,
                        ul: (props) => <ul className="my-2 list-disc space-y-1 pl-4 marker:text-gold">{props.children}</ul>,
                        ol: (props) => <ol className="my-2 list-decimal space-y-1 pl-4 marker:text-gold">{props.children}</ol>,
                        p: (props) => <p className="mb-2 last:mb-0">{props.children}</p>,
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start" aria-label="IAn está escribiendo">
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-4 shadow-soft">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-900/40" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={onSubmit} className="border-t border-line bg-white p-3">
            <div className="flex items-center gap-2 rounded-full border border-navy-900/10 bg-paper pl-4 pr-1.5 transition-colors focus-within:border-gold">
              <label htmlFor="ian-input" className="sr-only">Escribí tu consulta</label>
              <input
                id="ian-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1500}
                placeholder="Escribí tu consulta…"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-navy-900 placeholder:text-navy-900/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Enviar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white transition-all hover:bg-gold hover:text-navy-950 disabled:opacity-30"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1.5 text-[0.7rem] text-navy-900/50 hover:text-navy-900"
            >
              ¿Preferís hablar con una persona? <span className="font-semibold underline decoration-gold">WhatsApp</span>
            </a>
          </form>
        </div>
      )}

      {/* Cartelito */}
      {teaser && !open && (
        <div className="relative hidden max-w-[16rem] animate-pop-in rounded-2xl bg-white p-4 pr-8 text-sm text-navy-900 shadow-lift sm:block">
          <button
            type="button"
            onClick={dismissTeaser}
            aria-label="Cerrar"
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-navy-900/40 hover:text-navy-900"
          >
            ×
          </button>
          <button type="button" onClick={toggle} className="text-left">
            <span className="font-semibold">¿Tenés una consulta rápida?</span>
            <br />
            <span className="text-navy-900/60">IAn te responde al instante.</span>
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${SITE.whatsappDisplay}`}
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1fa855] shadow-lift transition-all duration-300 hover:scale-105 ${
            open ? "pointer-events-none scale-75 opacity-0" : ""
          }`}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? "Cerrar chat" : "Abrir chat con IAn"}
          className="group flex h-14 items-center gap-3 rounded-full bg-navy-900 pl-2 pr-2 sm:pr-5 text-white shadow-[0_16px_40px_-12px_rgba(1,1,68,0.6)] transition-all duration-300 hover:bg-navy-800"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-serif text-base italic text-navy-950 transition-transform duration-300 group-hover:rotate-[-8deg]">
            {open ? (
              <svg className="h-4 w-4 not-italic" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeWidth={2.5} d="M6 9l6 6 6-6" />
              </svg>
            ) : (
              "IA"
            )}
          </span>
          <span className="hidden text-sm font-semibold sm:inline">{open ? "Cerrar" : "Preguntale a IAn"}</span>
        </button>
      </div>
    </div>
  );
}
