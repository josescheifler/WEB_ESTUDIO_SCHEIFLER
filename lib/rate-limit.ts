// Limitador simple en memoria (ventana deslizante por clave).
// En serverless cada instancia tiene su propia memoria, así que es un freno
// "best effort": corta abusos obvios (scripts, loops) sin infraestructura extra.

const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    buckets.set(key, hits);
    const retryAfterMs = windowMs - (now - hits[0]);
    return { ok: false as const, retryAfterSec: Math.ceil(retryAfterMs / 1000) };
  }

  hits.push(now);
  buckets.set(key, hits);

  // Limpieza ocasional para que el Map no crezca sin control.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }

  return { ok: true as const, remaining: limit - hits.length };
}

export function clientIp(headers: Headers) {
  return (
    headers.get("x-nf-client-connection-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anon"
  );
}
