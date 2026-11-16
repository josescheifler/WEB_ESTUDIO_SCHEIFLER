"use client";

import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const url = () => window.location.href;

  const shareWhatsApp = () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} — ${url()}`)}`, "_blank", "noopener,noreferrer");

  const shareLinkedIn = () =>
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`,
      "_blank",
      "noopener,noreferrer",
    );

  async function copy() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: url() });
        return;
      }
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const btn =
    "inline-flex items-center gap-2 rounded-full border border-navy-900/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-[0.68rem] font-semibold uppercase tracking-eyebrow text-navy-900/45">Compartir</span>
      <button type="button" onClick={shareWhatsApp} className={btn}>WhatsApp</button>
      <button type="button" onClick={shareLinkedIn} className={btn}>LinkedIn</button>
      <button type="button" onClick={copy} className={btn} aria-live="polite">
        {copied ? "¡Copiado!" : "Copiar link"}
      </button>
    </div>
  );
}
