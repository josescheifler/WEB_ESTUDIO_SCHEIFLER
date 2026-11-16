import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import ShareButtons from "@/components/ShareButtons";
import { excerpt, FALLBACK_IMAGE, formatDate, getPost, isExternal, readingMinutes } from "@/lib/posts";
import { SITE } from "@/lib/site";

export const revalidate = 300;

type PageProps = { params: Promise<{ id: string }> };

async function load(params: PageProps["params"]) {
  const { id } = await params;
  const n = Number(id);
  if (!Number.isInteger(n) || n <= 0) return null;
  return getPost(n);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await load(params);
  if (!post) return { title: "Nota no encontrada" };
  const description = excerpt(post, 160);
  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author || "José A. Scheifler"],
      ...(post.imageUrl ? { images: [post.imageUrl] } : {}),
    },
  };
}

export default async function NotaPage({ params }: PageProps) {
  const post = await load(params);
  if (!post) notFound();

  const external = isExternal(post);

  return (
    <main className="bg-paper">
      {/* Portada */}
      <header className="grain relative isolate flex min-h-[78svh] items-end overflow-hidden bg-navy-950 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element -- imágenes de medios externos */}
        <img src={post.imageUrl || FALLBACK_IMAGE} alt="" className="absolute inset-0 -z-10 h-full w-full animate-slow-zoom object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />

        <div className="container-site pb-16 pt-40 sm:pb-20">
          <div className="max-w-4xl">
            <div className="flex animate-fade-up flex-wrap items-center gap-3">
              <Link href="/prensa" className="text-[0.7rem] font-semibold uppercase tracking-eyebrow text-white/60 hover:text-white">
                Prensa
              </Link>
              <span className="text-white/30">/</span>
              <span className="rounded-full bg-gold px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-navy-950">
                {post.category || "Actualidad"}
              </span>
            </div>

            <h1 className="mt-8 animate-fade-up font-serif text-display-lg font-light [animation-delay:120ms]">{post.title}</h1>

            <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm text-white/65 [animation-delay:240ms]">
              <span className="font-semibold uppercase tracking-[0.12em] text-white">{post.source || "Estudio Scheifler"}</span>
              <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
              <span>{readingMinutes(post.content)} min de lectura</span>
            </div>
          </div>
        </div>
      </header>

      <article className="container-site py-16 sm:py-24">
        <div className="mx-auto max-w-[44rem]">
          {post.subtitle && (
            <p className="font-serif text-2xl font-light italic leading-relaxed text-navy-900/80 sm:text-[1.7rem]">
              {post.subtitle}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-navy-900/10 py-6">
            {post.author && <p className="font-semibold text-navy-900">{post.author}</p>}
            {external && (
              <a
                href={post.externalUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy-900 hover:text-gold-dark"
              >
                Publicado en {post.source || "el medio original"} ↗
              </a>
            )}
          </div>

          <div className="dropcap prose prose-lg prose-estudio mt-12 max-w-none font-serif prose-p:leading-[1.8]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <footer className="mt-20 space-y-10 border-t border-navy-900/15 pt-10">
            <ShareButtons title={post.title} />

            <div className="flex flex-col gap-6 rounded-3xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <p className="font-serif text-2xl">¿Le afecta este escenario?</p>
                <p className="mt-2 text-sm text-white/60">Analicemos juntos el impacto en su empresa o municipio.</p>
              </div>
              <a href={SITE.calendar} target="_blank" rel="noopener noreferrer" className="btn-gold shrink-0 !py-3.5">
                Agendar diagnóstico
              </a>
            </div>

            <Link href="/prensa" className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy-900">
              <span className="transition-transform group-hover:-translate-x-1">←</span> Volver a la sala de prensa
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
