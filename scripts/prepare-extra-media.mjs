/**
 * Prépare les photos supplémentaires fournies par HussCut (novembre 2026) : fichiers numérotés
 * et images issues du compte Instagram de la boutique, déposés à la racine du dépôt.
 *
 *   node scripts/prepare-extra-media.mjs [dossier-source]   (par défaut : racine du dépôt)
 *
 * - Images Instagram : 40 px retirés à gauche, à droite et en bas pour supprimer les flèches
 *   et points de carrousel de l'interface.
 * - Bandes noires (cadres de story) retirées automatiquement en haut et en bas.
 * - Export WebP (qualité 84) dans src/assets/photos ; next/image produit ensuite les variantes.
 *
 * Écartées volontairement :
 *   « 14-35-54 » (prix lisibles en vitrine), « 17.jpg » et « 18.jpg » (légendes de vidéo
 *   incrustées), « 14-35-26 » (espèce non identifiable), « 11.jpg » (logo d'une plateforme),
 *   « 14-35-42 » (portrait : droits non confirmés), « 7.jpg » et « 9.jpg » (étiquettes de vitrine
 *   illisibles mais potentiellement tarifaires), doublons et images en basse définition.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.resolve(process.argv[2] ?? root);
const out = path.join(root, "src/assets/photos");

const ig = (time) => ({ file: `Screenshot 2026-11-18 at ${time} Instagram.png`, instagram: true });
const raw = (file) => ({ file });

/** clé de sortie → source */
const PHOTOS = {
  "piece-papier-signe": ig("14-31-21"),
  "piece-rotie-fleurs": ig("14-34-03"),
  "cotes-neon-planche": ig("14-35-06"),
  "roti-roule-agrumes": ig("14-36-55"),
  "grillade-ardoise": ig("14-36-59"),
  "vitrine-agrumes": ig("14-37-09"),
  "cote-grillee-beurre": raw("4.jpg"),
  "tranches-persillees": raw("12.png"),
  "burrata-tranches": raw("15.jpg"),
  "paves-romarin": raw("22.jpg"),
};

/** Nombre de lignes quasi noires (cadre de story) en haut et en bas de l'image. */
async function darkBands(input) {
  const { data, info } = await sharp(input).greyscale().raw().toBuffer({ resolveWithObject: true });
  const rowMean = (y) => {
    let sum = 0;
    for (let x = 0; x < info.width; x++) sum += data[y * info.width + x];
    return sum / info.width;
  };
  // Une ou deux lignes claires peuvent border le cadre noir (artefact de capture) : on les ignore.
  const band = (rowAt) => {
    let start = 0;
    while (start < 6 && rowMean(rowAt(start)) >= 10) start++;
    let end = start;
    while (end < info.height / 4 && rowMean(rowAt(end)) < 10) end++;
    return end > start + 4 ? end : 0;
  };
  const top = band((i) => i);
  const bottom = band((i) => info.height - 1 - i);
  return { top, bottom, width: info.width, height: info.height };
}

await fs.mkdir(out, { recursive: true });
for (const [key, entry] of Object.entries(PHOTOS)) {
  const input = path.join(src, entry.file);
  let image = sharp(input).rotate();
  const meta = await image.metadata();
  let left = 0;
  let top = 0;
  let width = meta.width;
  let height = meta.height;
  if (entry.instagram) {
    left = 40;
    width -= 80;
    height -= 40;
  }
  const bands = await darkBands(input);
  top = Math.max(top, bands.top);
  height = Math.min(height, meta.height - bands.bottom) - top;
  image = sharp(input).rotate().extract({ left, top, width, height });
  const file = path.join(out, `${key}.webp`);
  await image.webp({ quality: 84, effort: 6 }).toFile(file);
  const stat = await fs.stat(file);
  console.log(`${key}.webp  ${width}×${height}  ${(stat.size / 1024).toFixed(0)} Ko${bands.top || bands.bottom ? `  (bandes ${bands.top}/${bands.bottom})` : ""}`);
}
