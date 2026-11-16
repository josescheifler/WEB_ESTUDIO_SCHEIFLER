import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { SITE } from "@/lib/site";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Consultoría estratégica y comercio exterior`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Gerenciamiento externo, ingeniería de costos, comercio exterior y modernización municipal. Consultoría estratégica desde Entre Ríos para empresas y gobiernos.",
  keywords: [
    "comercio exterior",
    "consultoría",
    "ingeniería de costos",
    "exportación",
    "importación",
    "gerenciamiento externo",
    "municipios",
    "Entre Ríos",
  ],
  authors: [{ name: "José Antonio Scheifler" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: SITE.name,
    title: `${SITE.name} | Consultoría estratégica`,
    description: "Potenciamos capitales públicos y privados.",
  },
};

export const viewport: Viewport = {
  themeColor: "#010144",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy-950"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <div id="contenido">{children}</div>
        <Footer />
        <ChatWidget />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
