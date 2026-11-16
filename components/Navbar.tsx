"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/#empresas", label: "Empresas" },
  { href: "/#gobierno", label: "Gobierno" },
  { href: "/#estudio", label: "El Estudio" },
  { href: "/prensa", label: "Prensa" },
  { href: "/#faq", label: "Preguntas" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Páginas que arrancan con una portada oscura: el menú va transparente arriba de todo.
  const darkTop = pathname === "/" || /^\/prensa\/[^/]+$/.test(pathname);
  const solid = (scrolled || !darkTop) && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => href === "/prensa" && pathname.startsWith("/prensa");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-navy-900/[0.06] bg-paper/85 py-3 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <nav className="container-site flex items-center justify-between" aria-label="Principal">
          <Link href="/" aria-label={`${SITE.name} — inicio`} className="relative z-10" onClick={() => setOpen(false)}>
            <Logo tone={solid ? "dark" : "light"} />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`link-underline pb-1 text-[0.78rem] font-medium tracking-[0.04em] transition-colors ${
                    solid ? "text-navy-900/70 hover:text-navy-900" : "text-white/75 hover:text-white"
                  } ${isActive(l.href) ? (solid ? "!text-navy-900 bg-[length:100%_1px]" : "!text-white bg-[length:100%_1px]") : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/#contacto"
              className={`hidden rounded-full px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:inline-flex ${
                solid
                  ? "bg-navy-900 text-white hover:bg-gold hover:text-navy-950"
                  : "bg-white text-navy-900 hover:bg-gold"
              }`}
            >
              Contacto
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                open ? "text-white" : solid ? "text-navy-900" : "text-white"
              }`}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px bg-current transition-all duration-300 ${
                    open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa */}
      <div
        id="menu-movil"
        className={`fixed inset-0 z-40 flex flex-col bg-navy-950 transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="meridians pointer-events-none absolute inset-0" />
        <div className="container-site relative flex flex-1 flex-col justify-center pt-24">
          <ul className="space-y-2">
            {[{ href: "/", label: "Inicio" }, ...LINKS, { href: "/#contacto", label: "Contacto" }].map((l, i) => (
              <li
                key={l.href}
                className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-2 font-serif text-4xl text-white sm:text-5xl"
                >
                  <span className="font-sans text-xs tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="transition-colors group-hover:text-gold">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-site relative border-t border-white/10 py-8 text-sm text-white/60">
          <a href={`mailto:${SITE.email}`} className="block hover:text-white">
            {SITE.email}
          </a>
          <span className="mt-1 block">{SITE.location}</span>
        </div>
      </div>
    </>
  );
}
