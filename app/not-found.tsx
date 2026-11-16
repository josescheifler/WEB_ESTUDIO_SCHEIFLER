import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center bg-paper pt-24">
      <div className="container-site">
        <span className="eyebrow text-gold-dark">Error 404</span>
        <h1 className="mt-6 font-serif text-display-lg font-light text-navy-900">
          Esta página <span className="italic text-gold-dark">no existe.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-navy-900/60">
          Puede que el enlace esté roto o que la nota haya sido retirada.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn-navy">Volver al inicio</Link>
          <Link href="/prensa" className="btn-ghost-dark">Ir a prensa</Link>
        </div>
      </div>
    </main>
  );
}
