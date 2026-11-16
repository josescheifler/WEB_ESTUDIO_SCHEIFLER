// Datos de contacto centralizados: se cambian en un solo lugar.
export const SITE = {
  name: "Estudio Scheifler & Asoc.",
  tagline: "Desarrollo económico y negocios internacionales",
  // Firma profesional (Res. 99 y Res. 3 CPCEER: "Dr." siempre junto al título del diploma, con matrícula y domicilio).
  professional: "Dr. José Antonio Scheifler",
  title: "Licenciado en Comercio Internacional",
  matricula: "Mat. N° 16007 CPCEER",
  whatsappNumber: "5493454948738",
  whatsappDisplay: "+54 9 345 494-8738",
  email: "direccion@estudioscheifler.com.ar",
  calendar: "https://calendar.app.google/mva39qFrowM7Lzk97",
  linktree: "https://linktr.ee/EstudioScheifler",
  formspree: "https://formspree.io/f/xojdnjqa",
  // Domicilio profesional. Completar con calle y número cuando corresponda.
  location: "Los Charrúas, Entre Ríos · Argentina",
};

// Redes sociales: pegar la URL cuando cada perfil esté creado. Las vacías no se muestran.
export const SOCIALS: { name: string; url: string }[] = [
  { name: "LinkedIn", url: "" },
  { name: "Instagram", url: "" },
  { name: "Facebook", url: "" },
];

export function whatsappLink(text = "Hola, quisiera realizar una consulta.") {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
