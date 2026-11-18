import localFont from "next/font/local";

/**
 * Polices auto-hébergées (SIL Open Font License) : aucune requête vers un service tiers.
 * - Cinzel : titres et capitales. Capitales romaines gravées, dans l'esprit de l'enseigne
 *   « HUSSCUT PARIS » et du store « BOUCHERIE CHARCUTERIE » de la façade.
 * - Cormorant Garamond : accents éditoriaux, citations, italiques. Serif classique proche du
 *   lettrage « HussCut From Paris » du tee-shirt de l'équipe.
 * - Instrument Sans : texte courant et interface.
 * La signature manuscrite reste exclusivement celle du vrai logo (images fournies).
 */
export const cinzel = localFont({
  src: "../fonts/cinzel-latin-wght.woff2",
  weight: "400 900",
  style: "normal",
  variable: "--font-cinzel",
  display: "swap",
  fallback: ["Trajan Pro", "Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const cormorant = localFont({
  src: "../fonts/cormorant-garamond-latin-wght.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
  fallback: ["Garamond", "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const cormorantItalic = localFont({
  src: "../fonts/cormorant-garamond-latin-wght-italic.woff2",
  weight: "300 700",
  style: "italic",
  variable: "--font-cormorant-italic",
  display: "swap",
  fallback: ["Garamond", "Georgia", "serif"],
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

export const fontVariables = `${cinzel.variable} ${cormorant.variable} ${cormorantItalic.variable} ${instrument.variable}`;
