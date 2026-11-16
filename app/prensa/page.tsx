import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/Reveal";
import { getPosts } from "@/lib/posts";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Sala de prensa",
  description: "Análisis de coyuntura, economía regional y comercio exterior por José A. Scheifler.",
};

export default async function PrensaPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen bg-paper pb-28 pt-32 sm:pt-40">
      <div className="container-site">
        <header className="border-b border-navy-900/15 pb-12">
          <span className="eyebrow animate-fade-up text-gold-dark">Actualidad &amp; coyuntura</span>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="animate-fade-up font-serif text-display-xl font-light text-navy-900 [animation-delay:120ms]">
              Sala de <span className="italic text-gold-dark">prensa</span>
            </h1>
            <p className="max-w-sm animate-fade-up font-serif text-lg italic leading-relaxed text-navy-900/60 [animation-delay:240ms]">
              Información estratégica para la toma de decisiones.
            </p>
          </div>
        </header>

        {posts.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-serif text-2xl text-navy-900/60">Todavía no hay artículos publicados.</p>
          </div>
        )}

        {featured && (
          <section className="py-16 sm:py-20" aria-label="Nota destacada">
            <Reveal>
              <PostCard post={featured} variant="featured" />
            </Reveal>
          </section>
        )}

        {rest.length > 0 && (
          <section className="border-t border-navy-900/15 pt-16">
            <div className="mb-14 flex items-baseline justify-between gap-6">
              <h2 className="font-serif text-3xl font-light text-navy-900 sm:text-4xl">Ediciones anteriores</h2>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-navy-900/45">
                {rest.length} {rest.length === 1 ? "nota" : "notas"}
              </span>
            </div>
            <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 100}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
