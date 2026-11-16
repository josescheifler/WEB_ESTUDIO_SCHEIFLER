"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export type ActionResult = { success: boolean; message: string };

const DEFAULT_AUTHOR = "Por José A. Scheifler (*)";

function field(formData: FormData, name: string, max = 500) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Solo acepta links http(s); evita que se cuelen "javascript:" u otros esquemas. */
function safeUrl(value: string) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function passwordMatches(input: string, expected: string) {
  // Comparación en tiempo constante (sobre hashes del mismo largo).
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function createPost(formData: FormData): Promise<ActionResult> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return { success: false, message: "El panel no está configurado (falta ADMIN_PASSWORD)." };
  }

  const ip = clientIp(await headers());

  // Máximo 5 intentos fallidos cada 15 minutos por IP.
  const failures = rateLimit(`admin:fail:${ip}`, 5, 15 * 60_000);
  if (!failures.ok) {
    return {
      success: false,
      message: `Demasiados intentos. Probá de nuevo en ${Math.ceil(failures.retryAfterSec / 60)} min.`,
    };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || !passwordMatches(password, expected)) {
    await new Promise((r) => setTimeout(r, 800)); // frena la fuerza bruta
    return { success: false, message: "Contraseña incorrecta." };
  }

  const title = field(formData, "title", 300);
  const content = field(formData, "content", 100_000);
  if (!title || !content) {
    return { success: false, message: "El título y el cuerpo son obligatorios." };
  }

  const rawImage = field(formData, "imageUrl", 2000);
  const rawExternal = field(formData, "externalUrl", 2000);
  const imageUrl = safeUrl(rawImage);
  const externalUrl = safeUrl(rawExternal);
  if ((rawImage && !imageUrl) || (rawExternal && !externalUrl)) {
    return { success: false, message: "Los links tienen que empezar con https://" };
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        subtitle: field(formData, "subtitle", 1000) || null,
        author: field(formData, "author", 200) || DEFAULT_AUTHOR,
        content,
        category: field(formData, "category", 60) || "GENERAL",
        source: field(formData, "source", 120) || "Estudio Scheifler",
        imageUrl,
        externalUrl,
      },
    });

    revalidatePath("/");
    revalidatePath("/prensa");
    revalidatePath(`/prensa/${post.id}`);
    return { success: true, message: "Nota publicada correctamente." };
  } catch (error) {
    console.error("[admin] Error al guardar la nota:", error);
    return { success: false, message: "Error al guardar en la base de datos." };
  }
}
