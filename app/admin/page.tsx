"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createPost, type ActionResult } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
      {pending ? "Publicando…" : "Publicar nota"}
    </button>
  );
}

const input =
  "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-navy-900 transition-colors placeholder:text-navy-900/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
const label = "mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-900/55";

export default function AdminPage() {
  const [result, setResult] = useState<ActionResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const res = await createPost(formData);
    setResult(res);
    if (res.success) formRef.current?.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-paper pb-24 pt-32 sm:pt-40">
      <div className="container-site max-w-4xl">
        <span className="eyebrow text-gold-dark">Panel interno</span>
        <h1 className="mt-5 font-serif text-display-md font-light text-navy-900">
          Editor de <span className="italic">notas</span>
        </h1>
        <p className="mt-4 max-w-xl text-navy-900/60">
          Completá cada campo por separado. El cuerpo acepta Markdown: <code>**negrita**</code>, <code>## subtítulo</code>,{" "}
          <code>&gt; cita</code> y listas con <code>-</code>.
        </p>

        {result && (
          <div
            role="status"
            className={`mt-8 rounded-2xl border px-5 py-4 text-sm font-medium ${
              result.success ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {result.message}
          </div>
        )}

        <form ref={formRef} action={handleSubmit} className="mt-10 space-y-6">
          <fieldset className="space-y-5 rounded-3xl border border-navy-900/[0.08] bg-white/60 p-6 sm:p-8">
            <legend className="px-2 font-serif text-lg text-navy-900">Encabezado</legend>
            <div>
              <label htmlFor="a-title" className={label}>Título principal</label>
              <input id="a-title" name="title" required maxLength={300} placeholder="Ej: El dólar en bandas…" className={`${input} font-serif text-xl`} />
            </div>
            <div>
              <label htmlFor="a-sub" className={label}>Bajada / copete</label>
              <textarea id="a-sub" name="subtitle" rows={3} maxLength={1000} placeholder="Resumen corto que va debajo del título. También se usa en las tarjetas." className={`${input} font-serif italic`} />
            </div>
            <div>
              <label htmlFor="a-author" className={label}>Autor</label>
              <input id="a-author" name="author" defaultValue="Por José A. Scheifler (*)" className={input} />
            </div>
          </fieldset>

          <fieldset className="grid gap-5 rounded-3xl border border-navy-900/[0.08] bg-white/60 p-6 sm:grid-cols-2 sm:p-8">
            <legend className="px-2 font-serif text-lg text-navy-900">Clasificación y medios</legend>
            <div>
              <label htmlFor="a-cat" className={label}>Categoría</label>
              <select id="a-cat" name="category" className={input}>
                <option value="ANÁLISIS">Análisis</option>
                <option value="OPINIÓN">Opinión</option>
                <option value="ECONOMÍA">Economía</option>
                <option value="ECONOMÍA REGIONAL">Economía regional</option>
                <option value="COMERCIO EXTERIOR">Comercio exterior</option>
                <option value="NOVEDADES">Novedades</option>
              </select>
            </div>
            <div>
              <label htmlFor="a-src" className={label}>Medio / fuente</label>
              <input id="a-src" name="source" defaultValue="Estudio Scheifler" placeholder="Ej: Diario Junio" className={input} />
            </div>
            <div>
              <label htmlFor="a-img" className={label}>URL de la imagen</label>
              <input id="a-img" name="imageUrl" type="url" placeholder="https://…" className={input} />
            </div>
            <div>
              <label htmlFor="a-ext" className={label}>Link a la fuente original (opcional)</label>
              <input id="a-ext" name="externalUrl" type="url" placeholder="https://…" className={input} />
            </div>
          </fieldset>

          <div>
            <label htmlFor="a-body" className={label}>Cuerpo de la nota</label>
            <textarea
              id="a-body"
              name="content"
              required
              rows={16}
              placeholder="Escribí acá el desarrollo de la nota. No hace falta repetir título ni autor."
              className={`${input} font-serif text-lg leading-relaxed`}
            />
          </div>

          <div className="grid gap-5 rounded-3xl bg-navy-900 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8">
            <div>
              <label htmlFor="a-pass" className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
                Clave de administrador
              </label>
              <input id="a-pass" type="password" name="password" required autoComplete="current-password" className={input} />
            </div>
            <div className="sm:w-56">
              <SubmitButton />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
