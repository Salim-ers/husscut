/**
 * Prépare les médias du site à partir du dossier de photos fourni par HussCut.
 *
 *   node scripts/prepare-media.mjs <dossier-source>
 *
 * - Photos : export WebP pleine définition (qualité 84) dans src/assets/photos.
 *   next/image génère ensuite les variantes AVIF/WebP aux largeurs utiles.
 * - Logos : WebP avec transparence dans src/assets/brand. Le lettrage seul
 *   (« wordmark ») est isolé du logo complet en masquant le nez du taureau :
 *   aucun tracé n'est redessiné.
 * - Icônes dans src/app (conventions Next.js) et image Open Graph dans public/.
 *
 * Photos volontairement exclues (prix lisibles à l'écran) :
 *   « Vitrine de boucherie, lumière naturelle-36 », « Coupes de bœuf chez HussCut Paris-41 »,
 *   « Coupes de bœuf marbré sous le néon-23 », « Étiquette de prix floutée chez HUSSCUT-47 »,
 *   « Boucherie parisienne, lumière à la fenêtre-27 ».
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src) {
  console.error("Usage : node scripts/prepare-media.mjs <dossier-source>");
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, "..");
const photosOut = path.join(root, "src/assets/photos");
const brandOut = path.join(root, "src/assets/brand");
const appOut = path.join(root, "src/app");

/** Les noms d'archive encodent les accents en « #Uxxxx ». */
const decode = (name) => name.replace(/#U([0-9a-fA-F]{4})/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));

/**
 * clé de sortie → nom du fichier source (décodé), ou { file, extract } pour recadrer
 * à la source une zone qui montrerait un prix lisible.
 */
const PHOTOS = {
  "hero-cote-billot-neon": "Pièce de bœuf sur billot, néon parisien-37.png",
  "portrait-comptoir": "Portrait du boucher chez HussCut Paris-30.png",
  "geste-tranche-marbree": "Découpe marbrée chez HussCut Paris-9.png",
  "geste-parage": "Découpe de bœuf chez HussCut Paris-13.png",
  "billot-from-paris": "Steak à moelle sous néons-33.png",
  "chambre-froide": "Chambre froide de la boucherie HussCut-29.png",
  facade: "Vitrine parisienne sans passants.png",
  // Bas de l'image retiré : étiquettes de prix dans la vitrine.
  "comptoir-interieur": { file: "Comptoir de boucherie sans boucher.png", extract: { left: 0, top: 0, width: 941, height: 1440 } },
  "armoire-maturation": "Vitrine authentique de boucherie parisienne-38.png",
  // Bord droit retiré : étiquette avec prix (flou mais lisible).
  "cotes-maturees": { file: "Côtes de bœuf maturées en vitrine-4.png", extract: { left: 0, top: 0, width: 820, height: 1609 } },
  "piece-marbree-comptoir": "Pièce marbrée sur comptoir en bois-22.png",
  "steaks-persilles-inox": "Steaks persillés sur plateau inox-6.png",
  "pieces-persillees-bois": "Deux pièces persillées sur planche de bois-35.png",
  "boeuf-ficele": "Bœuf ficelé sous lumière boutique-34.png",
  "etal-sauces-brochettes": "Étal frais de boucherie parisienne-32.png",
  "brochettes-vitrine": "Brochettes marinées et poivrons en vitrine-28.png",
  "saucisses-vitrine": "Saucisses fraîches dans la vitrine-26.png",
  "roules-fromage": "Roulés rouges au fromage, étal parisien-39.png",
  "volaille-entiere": "Volaille entière sous lumière douce-5.png",
  "coffret-fleurs-jaunes": "Écrin de charcuterie aux fleurs jaunes-43.png",
  "coffret-noir-fleurs": "Coffret noir, bœuf et fleurs-1.png",
  "coffret-fromages": "Écrin noir de charcuteries et fromages-16.png",
  "rosace-charcuterie": "Rosace de charcuterie aux fleurs-45.png",
  "tranches-papier": "Assortiment de tranches et fromages-8.png",
  "pate-en-croute": "Pâté en croûte sur planche de préparation-18.png",
  "terrine-planche-bois": "Terrine artisanale sur planche de bois-21.png",
  "silhouette-neon": "Silhouette bovine au néon HussCut-17.png",
};

const LOGO_FULL = "Logo taureau néon HussCut transparent.png";
const EMBLEM = "Emblème de taureau néon doré.png";

/**
 * Sépare le lettrage « HussCut » du taureau dans le logo complet.
 * 1. Les « cœurs » de tube (alpha > 200) sont regroupés en composantes connexes.
 * 2. Une composante appartient au taureau si elle commence au-dessus de BULL_MAX_TOP.
 * 3. Une distance (BFS multi-source) attribue chaque pixel au cœur le plus proche.
 */
function isolateWordmark(data, width, height, channels) {
  const BULL_MAX_TOP = 700;
  const n = width * height;
  const alpha = (i) => data[i * channels + 3];
  const label = new Int32Array(n).fill(-1);
  const isBullComponent = [];
  let current = 0;
  for (let start = 0; start < n; start++) {
    if (label[start] !== -1 || alpha(start) <= 200) continue;
    const queue = [start];
    label[start] = current;
    let minY = height;
    for (let q = 0; q < queue.length; q++) {
      const i = queue[q];
      const x = i % width;
      const y = (i - x) / width;
      if (y < minY) minY = y;
      for (const j of [i - 1, i + 1, i - width, i + width]) {
        if (j < 0 || j >= n || label[j] !== -1 || alpha(j) <= 200) continue;
        if ((j === i - 1 && x === 0) || (j === i + 1 && x === width - 1)) continue;
        label[j] = current;
        queue.push(j);
      }
    }
    isBullComponent[current] = minY < BULL_MAX_TOP;
    current++;
  }
  // owner : 1 = taureau, 2 = lettrage
  const owner = new Uint8Array(n);
  const frontier = [];
  for (let i = 0; i < n; i++) {
    if (label[i] >= 0) {
      owner[i] = isBullComponent[label[i]] ? 1 : 2;
      frontier.push(i);
    }
  }
  for (let q = 0; q < frontier.length; q++) {
    const i = frontier[q];
    const x = i % width;
    for (const j of [i - 1, i + 1, i - width, i + width]) {
      if (j < 0 || j >= n || owner[j] !== 0) continue;
      if ((j === i - 1 && x === 0) || (j === i + 1 && x === width - 1)) continue;
      owner[j] = owner[i];
      frontier.push(j);
    }
  }
  // Le halo du lettrage ne dépasse pas ~30 px au-dessus du plus haut tube.
  let lettersTop = height;
  for (let i = 0; i < n; i++) {
    if (label[i] >= 0 && !isBullComponent[label[i]]) lettersTop = Math.min(lettersTop, Math.floor(i / width));
  }
  for (let i = 0; i < n; i++) {
    if (owner[i] !== 2 || Math.floor(i / width) < lettersTop - 30) data[i * channels + 3] = 0;
  }
}

async function main() {
  const entries = await fs.readdir(src);
  const byDecoded = new Map(entries.map((f) => [decode(f).normalize("NFC"), f]));
  const resolve = (wanted) => {
    const hit = byDecoded.get(wanted.normalize("NFC"));
    if (!hit) throw new Error(`Fichier introuvable dans la source : ${wanted}`);
    return path.join(src, hit);
  };

  await fs.mkdir(photosOut, { recursive: true });
  await fs.mkdir(brandOut, { recursive: true });

  for (const [key, entry] of Object.entries(PHOTOS)) {
    const out = path.join(photosOut, `${key}.webp`);
    const { file, extract } = typeof entry === "string" ? { file: entry, extract: null } : entry;
    let pipeline = sharp(resolve(file)).rotate();
    if (extract) pipeline = pipeline.extract(extract);
    const info = await pipeline.webp({ quality: 84, effort: 5 }).toFile(out);
    console.log(`photo  ${key}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} Ko`);
  }

  // Logo complet et emblème : transparence conservée, aucune retouche du tracé.
  const logoPath = resolve(LOGO_FULL);
  const emblemPath = resolve(EMBLEM);
  await sharp(logoPath).resize({ width: 960 }).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(path.join(brandOut, "logo-full.webp"));
  await sharp(emblemPath).trim({ threshold: 1 }).resize({ width: 512 }).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(path.join(brandOut, "emblem.webp"));

  // Lettrage seul : chaque pixel (halo compris) est attribué au tube néon le plus proche ;
  // ceux qui appartiennent au taureau sont rendus transparents. Rien n'est redessiné.
  const { data, info } = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  isolateWordmark(data, info.width, info.height, info.channels);
  const { width, height, channels } = info;
  await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: 1 })
    .resize({ width: 720 })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(path.join(brandOut, "wordmark.webp"));

  // Icônes : emblème sur fond ardoise (les icônes ne gèrent pas bien le halo transparent).
  const INK = { r: 23, g: 19, b: 17, alpha: 1 };
  const iconFrom = async (size, file) => {
    const inner = await sharp(emblemPath).trim({ threshold: 1 }).resize({ width: Math.round(size * 0.78), height: Math.round(size * 0.78), fit: "inside" }).png().toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: INK } })
      .composite([{ input: inner, gravity: "center" }])
      .png({ palette: true, quality: 90, compressionLevel: 9 })
      .toFile(path.join(appOut, file));
  };
  await iconFrom(512, "icon.png");
  await iconFrom(180, "apple-icon.png");

  // Image Open Graph 1200×630 : logo complet sur ardoise à gauche, côte sous le néon à droite.
  const ogPhoto = await sharp(resolve(PHOTOS["hero-cote-billot-neon"]))
    .resize({ width: 600, height: 630, fit: "cover", position: "centre" })
    .toBuffer();
  const ogLogo = await sharp(logoPath).resize({ width: 470 }).png().toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: INK } })
    .composite([
      { input: ogLogo, left: 65, top: Math.round((630 - Math.round((470 * 1188) / 1324)) / 2) },
      { input: ogPhoto, left: 600, top: 0 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(root, "public/opengraph-image.jpg"));

  console.log("Médias prêts.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
