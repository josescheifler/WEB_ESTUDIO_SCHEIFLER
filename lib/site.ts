// Datos de contacto centralizados: se cambian en un solo lugar.
export const SITE = {
  name: "Estudio Scheifler & Asoc.",
  tagline: "Desarrollo económico y negocios internacionales",
  whatsappNumber: "5493454948738",
  whatsappDisplay: "+54 9 345 494-8738",
  email: "direccion@estudioscheifler.com.ar",
  calendar: "https://calendar.app.google/mva39qFrowM7Lzk97",
  linktree: "https://linktr.ee/EstudioScheifler",
  formspree: "https://formspree.io/f/xojdnjqa",
  location: "Los Charrúas, Entre Ríos · Argentina",
};

export function whatsappLink(text = "Hola, quisiera realizar una consulta.") {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
