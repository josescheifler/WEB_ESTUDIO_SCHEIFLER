"use client";

import { useState, type FormEvent } from "react";
import { SITE, whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(SITE.formspree, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[28rem] flex-col items-start justify-center animate-pop-in">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="mt-8 font-serif text-3xl text-navy-900">Mensaje recibido.</h3>
        <p className="mt-3 max-w-sm text-navy-900/60">
          Gracias por escribir. Analizo su caso y le respondo a la brevedad.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-ghost-dark mt-8 !py-3">
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} action={SITE.formspree} method="POST" className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="cf-nombre" className="field-label">Nombre o empresa</label>
        <input id="cf-nombre" name="nombre" required autoComplete="name" className="field-input" placeholder="¿Con quién hablamos?" />
      </div>
      <div>
        <label htmlFor="cf-email" className="field-label">Email</label>
        <input id="cf-email" type="email" name="email" required autoComplete="email" className="field-input" placeholder="nombre@empresa.com" />
      </div>
      <div>
        <label htmlFor="cf-tel" className="field-label">WhatsApp <span className="normal-case tracking-normal opacity-60">(opcional)</span></label>
        <input id="cf-tel" type="tel" name="telefono" autoComplete="tel" className="field-input" placeholder="+54 9 …" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-asunto" className="field-label">Asunto</label>
        <div className="relative">
          <select id="cf-asunto" name="asunto" className="field-input cursor-pointer appearance-none pr-8">
            <option value="Consulta General">Consulta general</option>
            <option value="Comex">Comercio exterior</option>
            <option value="Costos">Costos y rentabilidad</option>
            <option value="Asesoria Contable">Asesoría contable</option>
            <option value="Sector Publico">Sector público</option>
          </select>
          <svg className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-mensaje" className="field-label">Mensaje</label>
        <textarea id="cf-mensaje" name="mensaje" rows={4} required className="field-input resize-none" placeholder="Cuénteme brevemente su situación…" />
      </div>
      {/* Campo trampa anti-spam de Formspree */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className="btn-navy w-full disabled:opacity-60 sm:w-auto">
          {status === "sending" ? "Enviando…" : "Enviar consulta"}
          <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </button>
        <p className="text-xs text-navy-900/45">Sus datos se usan solo para responder su consulta.</p>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700 sm:col-span-2">
          No se pudo enviar el formulario. Escríbanos por{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a> o a{" "}
          <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
        </p>
      )}
    </form>
  );
}
