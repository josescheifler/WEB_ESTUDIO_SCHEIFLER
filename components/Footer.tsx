import Link from "next/link";
import Logo from "./Logo";
import { SITE, SOCIALS, whatsappLink } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-white">
      <div className="meridians pointer-events-none absolute inset-0" />

      <div className="container-site relative pb-10 pt-20 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Logo tone="light" />
            <p className="mt-8 max-w-md font-serif text-2xl font-light leading-snug text-white/85 sm:text-3xl">
              Cuentas claras. <span className="italic text-gold">Negocios seguros.</span>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
              Desarrollo comercial, negocios internacionales y gestión pública. Profesional matriculado en el CPCEER.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold">Contacto</h2>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
                  WhatsApp {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="link-underline break-all hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.calendar} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
                  Agendar videollamada
                </a>
              </li>
              <li className="text-white/45">{SITE.location}</li>
            </ul>
            {SOCIALS.some((s) => s.url) && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
                {SOCIALS.filter((s) => s.url).map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-eyebrow text-gold">Explorar</h2>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li><Link href="/#empresas" className="link-underline hover:text-white">Sector privado</Link></li>
              <li><Link href="/#gobierno" className="link-underline hover:text-white">Sector público</Link></li>
              <li><Link href="/#estudio" className="link-underline hover:text-white">El Estudio</Link></li>
              <li><Link href="/prensa" className="link-underline hover:text-white">Sala de prensa</Link></li>
              <li>
                <a href={SITE.linktree} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
                  Linktree oficial
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none mt-20 select-none whitespace-nowrap font-serif text-[clamp(3.5rem,13vw,12rem)] font-light leading-none tracking-[-0.04em] text-white/[0.05]"
        >
          Scheifler &amp; Asoc.
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {SITE.professional} · {SITE.title} · {SITE.matricula} · {SITE.location}
          </p>
          <p>© {year} {SITE.name} Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
