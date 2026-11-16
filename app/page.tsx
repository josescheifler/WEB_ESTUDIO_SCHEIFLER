import Image from "next/image";
import Link from "next/link";
import NewsSection from "@/components/NewsSection";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { SITE, whatsappLink } from "@/lib/site";

// Las notas se refrescan solas cada 5 minutos (y al instante al publicar desde /admin).
export const revalidate = 300;

const MARQUEE = [
  "Comercio exterior",
  "Ingeniería de costos",
  "Gerenciamiento externo",
  "Inteligencia comercial",
  "Landed cost",
  "Ingeniería fiscal",
  "Desarrollo productivo",
  "Sourcing internacional",
];

const SERVICES = [
  {
    n: "01",
    title: "Exportación",
    lead: "Su producto, en el mercado correcto y al precio correcto.",
    items: ["Inteligencia comercial", "Ingeniería de costos FOB", "Búsqueda de compradores"],
    icon: "M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.5-2.5 3.75-5.5 3.75-9S14.5 5.5 12 3m0 18c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3M3.5 9h17M3.5 15h17",
  },
  {
    n: "02",
    title: "Importación",
    lead: "Sepa cuánto le cuesta realmente cada unidad puesta en su depósito.",
    items: ["Cálculo de landed cost", "Sourcing y proveedores", "Pagos al exterior"],
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    n: "03",
    title: "Consultoría",
    lead: "Un socio estratégico en la mesa de decisiones, sin costo fijo de gerencia.",
    items: ["Auditoría de procesos", "Outsourcing gerencial", "Diagnóstico de rentabilidad"],
    icon: "M3 3v18h18M7 15l4-4 3 3 6-6m0 0h-4m4 0v4",
  },
];

const GOV = [
  {
    title: "Ingeniería fiscal",
    text: "Transformación de tasas arcaicas en recaudación genuina, con un esquema donde al privado le convenga producir.",
  },
  {
    title: "Gerenciamiento ejecutivo",
    text: "Mentalidad de gestión privada aplicada a la cosa pública: objetivos, indicadores y resultados medibles.",
  },
  {
    title: "Desarrollo productivo",
    text: "Entendemos qué necesitan las empresas locales para crecer y generar empleo, y lo convertimos en política pública.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Una videollamada de 30 minutos para entender su situación, sus números y lo que está en juego.",
  },
  {
    n: "02",
    title: "Estrategia",
    text: "Costos, precios, mercados y riesgos sobre la mesa. Un plan claro, con prioridades y cifras concretas.",
  },
  {
    n: "03",
    title: "Acompañamiento",
    text: "Trabajamos junto a su equipo, su contador y su despachante hasta que los resultados se vean.",
  },
];

const FAQ = [
  {
    q: "¿Ustedes reemplazan a mi estudio contable actual?",
    a: (
      <>
        <strong>No, lo potenciamos.</strong> No somos un estudio contable tradicional que liquida impuestos mensuales; somos
        una <strong>consultora de negocios y comercio exterior</strong>. Mientras su contador se asegura de cumplir con el
        fisco (mirando el pasado), nosotros analizamos sus costos y su estructura comercial para proyectar el crecimiento
        (mirando el futuro). Trabajamos en equipo con su administración actual.
      </>
    ),
  },
  {
    q: "Ya tengo despachante de aduana, ¿para qué necesito un licenciado?",
    a: (
      <>
        Es una distinción clave: el despachante es nuestro socio operativo (hace el trámite ante Aduana), pero el{" "}
        <strong>Licenciado en Comercio Internacional define la estrategia</strong>. Analizamos si el precio es correcto, la
        logística más eficiente, cómo recuperar reintegros y la estructuración financiera. No solo hacemos que la carga
        salga: hacemos que la operación sea <strong>rentable</strong>.
      </>
    ),
  },
  {
    q: "¿Trabajan únicamente con empresas que ya exportan?",
    a: (
      <>
        No. Trabajamos con cualquier PyME o municipio que quiera ordenar sus números para crecer. La mentalidad de
        comercio internacional implica <strong>eficiencia y competitividad</strong>, cualidades que sirven tanto para
        vender en China como en el mercado local. Si su estructura es eficiente puertas adentro, la exportación es una
        consecuencia natural.
      </>
    ),
  },
  {
    q: "¿Qué aporta un perfil de comercio exterior a un municipio?",
    a: (
      <>
        Aporta una visión de <strong>desarrollo productivo</strong>. Nuestra ingeniería fiscal no busca solo recaudar
        tasas, sino crear un ecosistema donde al privado le convenga producir. Ayudamos al municipio a gestionar sus
        recursos con la misma eficiencia que una empresa exportadora.
      </>
    ),
  },
  {
    q: "Mi empresa es familiar, ¿es viable contratar consultoría externa?",
    a: (
      <>
        Precisamente las estructuras familiares son las que más se benefician de una gerencia externa. Al no tener los
        costos fijos de contratar un gerente de comex o de finanzas a tiempo completo, usted accede a un servicio
        profesional por objetivos. <strong>Profesionalizamos la toma de decisiones</strong> sin cargar su estructura de
        costos fijos.
      </>
    ),
  },
];

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14m-6-6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section id="inicio" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-slow-zoom object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
          <div className="meridians absolute inset-0" />
        </div>

        <div className="container-site flex flex-1 flex-col justify-center pb-16 pt-36 sm:pt-40">
          <p className="eyebrow animate-fade-up text-gold [animation-delay:100ms]">
            Consultoría estratégica · Entre Ríos → el mundo
          </p>

          <h1 className="mt-8 max-w-5xl animate-fade-up font-serif text-display-xl font-light [animation-delay:200ms]">
            Potenciamos capitales
            <br />
            <span className="italic text-gold">públicos y privados.</span>
          </h1>

          <p className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-white/70 [animation-delay:350ms] sm:text-xl">
            Gerenciamiento externo, ingeniería de costos y desarrollo de negocios internacionales para empresas y
            gobiernos que quieren crecer con números claros.
          </p>

          <div className="mt-12 flex animate-fade-up flex-col gap-4 [animation-delay:500ms] sm:flex-row">
            <a href={SITE.calendar} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Agendar diagnóstico
              <Arrow />
            </a>
            <Link href="#empresas" className="btn-ghost-light">
              Conocer servicios
            </Link>
          </div>
        </div>

        {/* Dos puertas de entrada */}
        <div className="container-site relative grid animate-fade-up gap-px pb-10 [animation-delay:700ms] sm:grid-cols-2 sm:pb-14">
          {[
            { href: "#empresas", k: "Sector privado", t: "PyMEs, exportadores e importadores" },
            { href: "#gobierno", k: "Sector público", t: "Municipios y organismos de gobierno" },
          ].map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex items-center justify-between gap-6 border-t border-white/15 py-6 transition-colors hover:border-gold sm:pr-10"
            >
              <span>
                <span className="block text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold">{d.k}</span>
                <span className="mt-2 block font-serif text-xl text-white/90 sm:text-2xl">{d.t}</span>
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-navy-950">
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────────────────── MARQUEE ───────────────────────── */}
      <div className="relative overflow-hidden border-y border-navy-900/10 bg-paper py-5" aria-hidden>
        <div className="flex w-max animate-marquee">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="flex items-center whitespace-nowrap font-serif text-xl italic text-navy-900/70 sm:text-2xl">
              <span className="px-8">{w}</span>
              <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ───────────────────────── EMPRESAS ───────────────────────── */}
      <section id="empresas" className="bg-paper py-24 sm:py-36">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <span className="eyebrow text-gold-dark">Sector privado</span>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={100}>
              <h2 className="font-serif text-display-lg font-light text-navy-900">
                No vendemos trámites.
                <br />
                <span className="italic text-gold-dark">Gestionamos rentabilidad.</span>
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-900/65">
                Ingeniería de costos y seguridad normativa para su empresa. Cada decisión comercial, respaldada por
                números que se entienden.
              </p>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy-900/[0.08] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-navy-900/0 hover:shadow-lift sm:p-10">
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy-950">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                      </svg>
                    </span>
                    <span className="font-serif text-5xl font-light text-navy-900/10">{s.n}</span>
                  </div>
                  <h3 className="mt-10 font-serif text-3xl text-navy-900">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-navy-900/60">{s.lead}</p>
                  <ul className="mt-8 space-y-3 border-t border-navy-900/[0.08] pt-6 text-[0.95rem] text-navy-900/80">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── GOBIERNO ───────────────────────── */}
      <section id="gobierno" className="grain relative overflow-hidden bg-navy-900 py-24 text-white sm:py-36">
        <div className="meridians pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-gold/10 blur-3xl" />

        <div className="container-site relative grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow text-gold">Sector público</span>
            <h2 className="mt-8 font-serif text-display-lg font-light">
              De la administración
              <br />
              <span className="italic text-gold">a la producción.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-white/65">
              Transformamos municipios dependientes en motores de desarrollo económico real. Gestión política con
              mentalidad de eficiencia privada.
            </p>
            <Link href="#contacto" className="btn-gold mt-12">
              Solicitar diagnóstico
              <Arrow />
            </Link>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            {GOV.map((g, i) => (
              <Reveal key={g.title} delay={i * 120}>
                <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-white/15 py-9 transition-colors last:border-b hover:border-gold sm:gap-10">
                  <span className="pt-1 font-serif text-sm italic text-gold">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl transition-colors group-hover:text-gold sm:text-3xl">{g.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-white/60">{g.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── MÉTODO ───────────────────────── */}
      <section className="bg-sand/60 py-24 sm:py-32">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-gold-dark">Cómo trabajamos</span>
            <h2 className="mt-6 font-serif text-display-md font-light text-navy-900">
              Tres pasos. <span className="italic">Cero improvisación.</span>
            </h2>
          </Reveal>

          <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 140} className="relative">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-900/20 font-serif text-lg text-navy-900">
                    {s.n}
                  </span>
                  {i < STEPS.length - 1 && <span className="hidden h-px flex-1 bg-gradient-to-r from-navy-900/20 to-transparent md:block" />}
                </div>
                <h3 className="mt-8 font-serif text-2xl text-navy-900">{s.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-navy-900/60">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────────────── EL ESTUDIO ───────────────────────── */}
      <section id="estudio" className="overflow-hidden bg-paper py-24 sm:py-36">
        <div className="container-site grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] border border-gold/60" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand shadow-lift">
              <Image
                src="/jose-scheifler.jpg"
                alt="Dr. José Antonio Scheifler, Licenciado en Comercio Internacional"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-7 pt-24 text-white">
                <p className="font-serif text-2xl">Dr. José Antonio Scheifler</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/70">Licenciado en Comercio Internacional · Mat. N° 16007 CPCEER</p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-gold-dark">El Estudio</span>
              <h2 className="mt-6 font-serif text-display-lg font-light text-navy-900">
                Cuentas claras.
                <br />
                <span className="italic text-gold-dark">Negocios seguros.</span>
              </h2>
            </Reveal>

            <Reveal delay={100} className="mt-10 space-y-5 text-lg leading-relaxed text-navy-900/70">
              <p>
                En un mercado globalizado, los números no son solo cifras: son la brújula de su estrategia comercial.
                Licenciado en Comercio Internacional y consultor de negocios internacionales, con matrícula profesional
                en el <strong className="font-semibold text-navy-900">CPCEER</strong>, mi objetivo es simple: transformar
                la complejidad de los costos y del comercio internacional en rentabilidad clara.
              </p>
              <p>
                Somos una firma radicada en Entre Ríos con una visión que trasciende las fronteras locales. Entendemos que{" "}
                <strong className="font-semibold text-navy-900">
                  los costos, la gestión pública y el comercio internacional
                </strong>{" "}
                no pueden tratarse como áreas aisladas. Ya sea optimizando la recaudación de un municipio o estructurando la
                primera exportación de una PyME, el compromiso es el mismo: maximizar resultados minimizando riesgos.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <figure className="mt-12 rounded-3xl bg-navy-900 p-8 text-white sm:p-10">
                <svg className="h-8 w-8 text-gold" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
                  <path d="M9.3 25.6c-2.6 0-4.6-2-4.6-5.3 0-5.2 3.7-10.6 9-13.3l1.1 1.7c-3.5 2-5.6 4.8-5.9 7.6.4-.2.9-.3 1.5-.3 2.4 0 4.2 1.8 4.2 4.4 0 2.9-2.3 5.2-5.3 5.2zm13.6 0c-2.6 0-4.6-2-4.6-5.3 0-5.2 3.7-10.6 9-13.3l1.1 1.7c-3.5 2-5.6 4.8-5.9 7.6.4-.2.9-.3 1.5-.3 2.4 0 4.2 1.8 4.2 4.4 0 2.9-2.3 5.2-5.3 5.2z" />
                </svg>
                <blockquote className="mt-5 font-serif text-xl font-light leading-relaxed sm:text-2xl">
                  Su capital no admite errores. Todas nuestras proyecciones cuentan con el respaldo de un profesional
                  matriculado en el CPCEER.
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-between border-t border-white/15 pt-6">
                  <span className="font-serif text-2xl italic text-gold">J. A. Scheifler</span>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-white/50">
                    Mat. N° 16007 CPCEER
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────── PRENSA ───────────────────────── */}
      <NewsSection />

      {/* ───────────────────────── AGENDA ───────────────────────── */}
      <section id="agenda" className="bg-paper px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-20 text-center text-white sm:rounded-[2.5rem] sm:py-28">
          <div className="meridians pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute left-1/2 top-full h-[30rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl" />
          <Reveal className="relative mx-auto max-w-3xl">
            <span className="eyebrow text-gold">Videollamada · 30 minutos</span>
            <h2 className="mt-8 font-serif text-display-lg font-light">
              ¿Necesita un <span className="italic text-gold">diagnóstico rápido?</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/65">
              Los tiempos empresariales y públicos apremian. Coordine una videollamada directamente en nuestra agenda y
              evaluemos su situación.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={SITE.calendar} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Agendar videollamada
                <Arrow />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
                Escribir por WhatsApp
              </a>
            </div>
            <p className="mt-8 text-xs text-white/40">Sincronizado con Google Calendar</p>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── FAQ ───────────────────────── */}
      <section id="faq" className="bg-paper py-24 sm:py-36">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <span className="eyebrow text-gold-dark">Dudas comunes</span>
              <h2 className="mt-6 font-serif text-display-md font-light text-navy-900">
                Preguntas <span className="italic">frecuentes</span>
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-navy-900/60">
                ¿No encuentra su respuesta? Pregúntele a IAn, nuestro asistente, o escríbanos directamente.
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group border-t border-navy-900/15 last:border-b" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-8">
                    <span className="flex gap-6">
                      <span className="pt-1.5 font-serif text-sm italic text-gold-dark">0{i + 1}</span>
                      <span className="font-serif text-xl leading-snug text-navy-900 transition-colors group-hover:text-gold-dark sm:text-2xl">
                        {f.q}
                      </span>
                    </span>
                    <span className="relative mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-900/15 transition-all duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold">
                      <svg className="h-4 w-4 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                        <path strokeLinecap="round" strokeWidth={1.75} d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-9 pl-10 pr-4 text-[1.05rem] leading-relaxed text-navy-900/65 sm:pl-12 sm:pr-16 [&_strong]:font-semibold [&_strong]:text-navy-900">
                    {f.a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CONTACTO ───────────────────────── */}
      <section id="contacto" className="border-t border-line bg-white py-24 sm:py-36">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow text-gold-dark">Contacto</span>
            <h2 className="mt-6 font-serif text-display-lg font-light text-navy-900">
              Hablemos de <span className="italic text-gold-dark">negocios.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-navy-900/60">
              Complete el formulario y analizo su caso personalmente. Si prefiere algo más inmediato, elija el canal que le
              quede más cómodo.
            </p>

            <ul className="mt-12 divide-y divide-navy-900/10 border-y border-navy-900/10">
              {[
                { k: "WhatsApp", v: SITE.whatsappDisplay, href: whatsappLink(), ext: true },
                { k: "Email", v: SITE.email, href: `mailto:${SITE.email}`, ext: false },
                { k: "Videollamada", v: "Agendar 30 minutos", href: SITE.calendar, ext: true },
              ].map((c) => (
                <li key={c.k}>
                  <a
                    href={c.href}
                    {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-navy-900/45">{c.k}</span>
                      <span className="mt-1 block break-all text-navy-900 transition-colors group-hover:text-gold-dark">{c.v}</span>
                    </span>
                    <Arrow className="h-4 w-4 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-navy-900/45">{SITE.location}</p>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
            <div className="rounded-[2rem] border border-navy-900/[0.08] bg-paper p-7 sm:p-12">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
