import type { Post } from "@prisma/client";
import { prisma } from "./prisma";

export type { Post };

/**
 * Trae notas sin tirar abajo la página si la base no responde
 * (por ejemplo durante el build o una caída momentánea): devuelve [].
 */
export async function getPosts(take?: number): Promise<Post[]> {
  try {
    return await prisma.post.findMany({ orderBy: { createdAt: "desc" }, take });
  } catch (error) {
    console.error("[posts] No se pudo leer la base de datos:", error);
    return [];
  }
}

export async function getPost(id: number): Promise<Post | null> {
  try {
    return await prisma.post.findUnique({ where: { id } });
  } catch (error) {
    console.error("[posts] No se pudo leer la nota", id, error);
    return null;
  }
}

/** Texto plano corto para tarjetas: usa la bajada o limpia el Markdown del cuerpo. */
export function excerpt(post: Pick<Post, "subtitle" | "content">, max = 220) {
  const source = post.subtitle?.trim() || post.content;
  const plain = source
    .replace(/!\[[^\]]*]\([^)]*\)/g, "") // imágenes
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1") // links → texto
    .replace(/[#>*_`~|-]+/g, " ") // marcas de formato
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max).replace(/\s+\S*$/, "") + "…" : plain;
}

export function formatDate(date: Date, style: "long" | "short" = "long") {
  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  });
}

export function isExternal(post: Pick<Post, "externalUrl">) {
  return !!post.externalUrl && /^https?:\/\//i.test(post.externalUrl);
}

export const FALLBACK_IMAGE = "/hero.jpg";

export function readingMinutes(content: string) {
  return Math.max(1, Math.round(content.split(/\s+/).length / 220));
}
