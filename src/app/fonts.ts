import localFont from "next/font/local";

/**
 * Polices auto-hébergées (SIL Open Font License) : aucune requête vers un service tiers.
 * - Libre Caslon Condensed : titres. Serif classique et légèrement condensé, dans l'esprit
 *   de l'enseigne en capitales romaines et du lettrage « HussCut From Paris ».
 * - Instrument Sans : texte courant et interface.
 * La signature manuscrite reste exclusivement celle du vrai logo (images fournies).
 */
export const caslon = localFont({
  src: "../fonts/libre-caslon-condensed-latin-wght.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-caslon",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const caslonItalic = localFont({
  src: "../fonts/libre-caslon-condensed-latin-wght-italic.woff2",
  weight: "400 700",
  style: "italic",
  variable: "--font-caslon-italic",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const instrument = localFont({
  src: "../fonts/instrument-sans-latin-wdth-wght.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-instrument",
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});

export const fontVariables = `${caslon.variable} ${caslonItalic.variable} ${instrument.variable}`;
