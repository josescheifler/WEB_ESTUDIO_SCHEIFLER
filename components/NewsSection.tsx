import Link from "next/link";
import PostCard from "./PostCard";
import Reveal from "./Reveal";
import { getPosts } from "@/lib/posts";

export default async function NewsSection() {
  const posts = await getPosts(3);
  if (posts.length === 0) return null;

  return (
    <section id="novedades" className="border-t border-line bg-paper py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow text-gold-dark">Prensa &amp; opinión</span>
            <h2 className="mt-5 max-w-2xl font-serif text-display-md font-light text-navy-900">
              Análisis de <span className="italic">coyuntura</span>
            </h2>
          </div>
          <Link href="/prensa" className="btn-ghost-dark w-fit !py-3">
            Ver todas las notas
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 120}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
