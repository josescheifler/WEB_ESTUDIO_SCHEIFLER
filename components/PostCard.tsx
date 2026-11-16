import Link from "next/link";
import { excerpt, FALLBACK_IMAGE, formatDate, isExternal, type Post } from "@/lib/posts";

/** Nombre del medio a partir del enlace (evita rotular "Estudio Scheifler" una nota publicada en otro sitio). */
function mediaName(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "el medio";
  }
}

type Props = { post: Post; variant?: "default" | "featured"; tone?: "light" | "dark" };

/** Tarjeta de nota. Las notas externas (ej. Diario Junio) abren el medio original. */
export default function PostCard({ post, variant = "default" }: Props) {
  const external = isExternal(post);
  const href = external ? post.externalUrl! : `/prensa/${post.id}`;
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const featured = variant === "featured";

  return (
    <article className={`group relative flex h-full flex-col ${featured ? "lg:grid lg:grid-cols-12 lg:gap-12" : ""}`}>
      <div
        className={`relative overflow-hidden rounded-2xl bg-sand ${
          featured ? "aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]" : "aspect-[4/3]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- imágenes de medios externos */}
        <img
          src={post.imageUrl || FALLBACK_IMAGE}
          alt=""
          loading={featured ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-navy-900 backdrop-blur">
          {post.category || "Novedades"}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "pt-8 lg:col-span-5 lg:justify-center lg:pt-0" : "pt-6"}`}>
        <div className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-navy-900/50">
          <span className="text-gold-dark">{post.source || "Estudio Scheifler"}</span>
          <span className="h-px w-4 bg-navy-900/20" />
          <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt, "short")}</time>
        </div>

        <h3
          className={`mt-4 font-serif font-normal leading-[1.12] tracking-[-0.015em] text-navy-900 ${
            featured ? "text-3xl sm:text-4xl lg:text-[2.75rem]" : "text-[1.45rem]"
          }`}
        >
          <Link href={href} {...linkProps} className="after:absolute after:inset-0">
            <span className="link-underline">{post.title}</span>
          </Link>
        </h3>

        <p className={`mt-4 leading-relaxed text-navy-900/65 ${featured ? "text-lg" : "line-clamp-3 text-[0.95rem]"}`}>
          {excerpt(post, featured ? 320 : 180)}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy-900">
          {external ? `Leer en ${mediaName(post.externalUrl!)}` : "Leer nota"}
          <svg
            className={`h-4 w-4 text-gold transition-transform duration-300 ${
              external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            {external ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 17L17 7M17 7H9M17 7v8" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14m-6-6l6 6-6 6" />
            )}
          </svg>
          {external && <span className="sr-only">(abre en otra pestaña)</span>}
        </span>
      </div>
    </article>
  );
}
