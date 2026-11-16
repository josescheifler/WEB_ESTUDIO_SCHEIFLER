import Image from "next/image";

/** Isotipo + nombre tipografiado: se lee bien sobre fondo claro y oscuro. */
export default function Logo({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) {
  const light = tone === "light";
  return (
    <span className="flex items-center gap-3">
      <Image
        src={light ? "/isotipo-claro.png" : "/isotipo.png"}
        alt=""
        width={440}
        height={625}
        priority
        className="h-10 w-auto shrink-0 transition-opacity duration-300 sm:h-11"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[1.15rem] font-medium tracking-[-0.01em] sm:text-[1.3rem] ${
            light ? "text-white" : "text-navy-900"
          }`}
        >
          Scheifler <span className="italic text-gold">&amp;</span> Asoc.
        </span>
        {!compact && (
          <span
            className={`mt-1.5 hidden text-[0.56rem] font-semibold uppercase tracking-[0.24em] sm:block ${
              light ? "text-white/55" : "text-navy-900/50"
            }`}
          >
            Estudio · Negocios internacionales
          </span>
        )}
      </span>
    </span>
  );
}
