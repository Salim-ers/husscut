import type { L10n } from "@/i18n/config";
import type { PhotoKey } from "./media";

/**
 * Catalogue éditorial de la boutique.
 *
 * Sources : gammes visibles sur les plateformes de livraison (noms uniquement) et
 * étiquettes de la vitrine sur les photos fournies. Règles :
 * - aucun prix, poids promis, stock ni délai ;
 * - chaque produit n'apparaît qu'une fois ;
 * - l'espèce n'est indiquée que lorsqu'elle figure dans le nom vérifié ;
 * - pas de vignette par produit : chaque rayon porte une seule photo d'ambiance, et
 *   chaque photo n'apparaît qu'une fois sur le site (voir content.test.ts).
 *
 * Écartés en attendant confirmation de l'espèce par HussCut : « Smoky bacon »,
 * « Prosciutto by HussCut », « Chorizo fumé », « Chorizo à griller »,
 * « Saucisse à l'ail fumée », « Bâton de berger », « Hot-dog », « Fermier ail et fines
 * herbes », « Rôti de veau bacon fromage ».
 */

export interface Product {
  /** Identifiant stable, utilisé dans les liens de demande (?item=). */
  id: string;
  name: L10n;
  note?: L10n;
}

export interface Section<Id extends string> {
  id: Id;
  /** Ancre partageable, localisée. */
  anchor: L10n;
  name: L10n;
  description: L10n;
  ambiance?: PhotoKey;
  products: readonly Product[];
}

export type MeatCategoryId = "boeuf" | "veau" | "agneau" | "volaille" | "grillades" | "creations" | "epicerie";
export type CharcuterieGroupId = "fines-tranches" | "fumes-secs" | "a-partager";

const p = (id: string, fr: string, en: string, extra: Omit<Product, "id" | "name"> = {}): Product => ({
  id,
  name: { fr, en },
  ...extra,
});

export const meatCategories: readonly Section<MeatCategoryId>[] = [
  {
    id: "boeuf",
    anchor: { fr: "boeuf", en: "beef" },
    name: { fr: "Bœuf", en: "Beef" },
    description: {
      fr: "Pièces à griller, à rôtir ou à mijoter, des steaks du quotidien aux côtes maturées.",
      en: "Cuts to grill, roast or braise, from everyday steaks to dry-aged ribs.",
    },
    ambiance: "piecesPersilleesBois",
    products: [
      p("cote-de-boeuf", "Côte de bœuf", "Rib of beef (côte de bœuf)", {
        note: { fr: "Simmental ou Galice, selon disponibilité", en: "Simmental or Galician, depending on availability" },
      }),
      p("entrecote-wagyu", "Entrecôte Wagyu australien", "Australian Wagyu ribeye"),
      p("faux-filet", "Faux-filet", "Sirloin (faux-filet)", {
        note: { fr: "Aussi en Black Angus australien et en Wagyu japonais", en: "Also in Australian Black Angus and Japanese Wagyu" },
      }),
      p("filet-galice", "Filet de Galice", "Galician fillet"),
      p("rumsteak", "Rumsteak", "Rump steak"),
      p("bavette", "Bavette", "Flank steak (bavette)"),
      p("paleron", "Paleron", "Blade steak (paleron)"),
      p("basse-cote", "Basse côte", "Chuck rib (basse côte)"),
      p("gite", "Gîte de bœuf", "Beef shin (gîte)"),
      p("bourguignon", "Bourguignon", "Bourguignon braising beef"),
      p("rosbif", "Rosbif", "Roast beef joint"),
      p("piece-du-boucher-marinee", "Pièce du boucher marinée", "Marinated butcher's cut"),
      p("emince-de-boeuf", "Émincé de bœuf", "Sliced beef strips"),
      p("steak-hache", "Steak haché", "Beef burger patty"),
      p("boeuf-hache", "Bœuf haché", "Minced beef"),
      p("carpaccio-pesto", "Carpaccio al pesto verde", "Carpaccio al pesto verde"),
    ],
  },
  {
    id: "veau",
    anchor: { fr: "veau", en: "veal" },
    name: { fr: "Veau", en: "Veal" },
    description: {
      fr: "Escalopes, côtes, filet, blanquette et paupiettes.",
      en: "Escalopes, chops, fillet, blanquette and paupiettes.",
    },
    ambiance: "veauJarretVitrine",
    products: [
      p("cote-de-veau", "Côte de veau", "Veal chop", {
        note: { fr: "Avec ou sans os", en: "Bone-in or boneless" },
      }),
      p("filet-de-veau", "Filet de veau", "Veal fillet"),
      p("escalope-de-veau", "Escalope de veau", "Veal escalope"),
      p("blanquette", "Blanquette de veau", "Veal for blanquette"),
      p("paupiette-de-veau", "Paupiette de veau", "Veal paupiette"),
      p("foie-de-veau", "Foie de veau", "Calf's liver"),
    ],
  },
  {
    id: "agneau",
    anchor: { fr: "agneau", en: "lamb" },
    name: { fr: "Agneau", en: "Lamb" },
    description: {
      fr: "Côtes, gigot, épaule, souris et morceaux à mijoter.",
      en: "Chops, leg, shoulder, shank and cuts for slow cooking.",
    },
    ambiance: "agneauCotelettesGrillees",
    products: [
      p("cotes-agneau", "Côtes d'agneau", "Lamb chops"),
      p("tranche-de-gigot", "Tranche de gigot", "Leg of lamb steak"),
      p("epaule-agneau", "Épaule d'agneau", "Lamb shoulder"),
      p("souris-agneau", "Souris d'agneau", "Lamb shank"),
      p("roti-agneau", "Rôti d'agneau", "Lamb roast"),
      p("collier-agneau", "Collier d'agneau", "Lamb neck"),
      p("saute-agneau", "Sauté d'agneau", "Diced lamb for stewing"),
      p("emince-agneau", "Émincé d'agneau", "Sliced lamb strips"),
    ],
  },
  {
    id: "volaille",
    anchor: { fr: "volaille", en: "poultry" },
    name: { fr: "Volaille", en: "Poultry" },
    description: {
      fr: "Poulet, poulet fermier, dinde et canard.",
      en: "Chicken, free-range chicken, turkey and duck.",
    },
    ambiance: "volailleEntiere",
    products: [
      p("poulet-fermier-pattes-noires", "Poulet fermier pattes noires", "Black-legged free-range chicken"),
      p("filet-poulet-fermier-label-rouge", "Filet de poulet fermier Label Rouge", "Label Rouge free-range chicken breast"),
      p("filet-de-poulet", "Filet de poulet", "Chicken breast"),
      p("supreme-de-volaille", "Suprême de volaille", "Chicken supreme"),
      p("cuisse-fermiere", "Cuisse de poulet fermier", "Free-range chicken leg"),
      p("cuisse-de-poulet", "Cuisse de poulet", "Chicken leg"),
      p("pilons-de-poulet", "Pilons de poulet", "Chicken drumsticks"),
      p("escalope-de-dinde", "Escalope de dinde", "Turkey escalope"),
      p("magret-de-canard", "Magret de canard", "Duck breast (magret)"),
      p("emince-poulet-curry", "Émincé de poulet au curry", "Curried chicken strips"),
    ],
  },
  {
    id: "grillades",
    anchor: { fr: "grillades", en: "grill" },
    name: { fr: "Grillades", en: "For the grill" },
    description: {
      fr: "Merguez, saucisses et brochettes, prêtes pour le grill.",
      en: "Merguez, sausages and skewers, ready for the grill.",
    },
    ambiance: "saucissesVitrine",
    products: [
      p("merguez-douces", "Merguez douces", "Mild merguez"),
      p("merguez-epicees", "Merguez épicées", "Spicy merguez"),
      p("saucisses-de-veau", "Saucisses de veau", "Veal sausages"),
      p("brochettes-boeuf-marinees", "Brochettes de bœuf marinées", "Marinated beef skewers"),
      p("brochettes-agneau", "Brochettes d'agneau", "Lamb skewers"),
      p("brochettes-poulet", "Brochettes de poulet", "Chicken skewers"),
    ],
  },
  {
    id: "creations",
    anchor: { fr: "creations-boucheres", en: "butchers-creations" },
    name: { fr: "Créations bouchères", en: "Butcher's creations" },
    description: {
      fr: "Cordons bleus, panés, émincés et préparations prêtes à cuisiner.",
      en: "Cordons bleus, breaded pieces, strips and ready-to-cook preparations.",
    },
    ambiance: "roulesFromage",
    products: [
      p("cordon-bleu-authentique", "Cordon bleu authentique", "Classic cordon bleu"),
      p("cordon-bleu-parisien", "Cordon bleu parisien", "Parisian cordon bleu"),
      p("donuts-poulet-mozza", "Donut's poulet mozza", "Chicken & mozzarella “donuts”"),
      p("tenders", "Tenders", "Chicken tenders", {
        note: { fr: "Spicy, corn flakes ou oriental", en: "Spicy, cornflake or oriental" },
      }),
      p("wings", "Wings", "Chicken wings", {
        note: { fr: "Texan ou panure légèrement épicée", en: "Texan or lightly spiced coating" },
      }),
      p("nuggets", "Nuggets", "Nuggets"),
      p("yakitori", "Yakitori", "Yakitori"),
      p("emince-poulet-cepes-girolles", "Émincé de poulet cèpes et girolles", "Chicken strips with ceps and chanterelles"),
    ],
  },
  {
    id: "epicerie",
    anchor: { fr: "epicerie-fine", en: "pantry" },
    name: { fr: "Épicerie fine", en: "Fine pantry" },
    description: {
      fr: "Sauces, pains, œufs, olives et petites touches pour accompagner la viande.",
      en: "Sauces, buns, eggs, olives and finishing touches to go with the meat.",
    },
    ambiance: "etalSaucesBrochettes",
    products: [
      p("sauces", "Sauces", "Sauces", {
        note: { fr: "Barbecue, oignon, cornichons", en: "Barbecue, onion, gherkin" },
      }),
      p("pains", "Pains buns et pains hot-dog", "Burger and hot-dog buns"),
      p("oeufs-bio", "Œufs bio extra-frais", "Extra-fresh organic eggs"),
      p("olives", "Olives nature", "Plain olives"),
      p("tapenade-truffe", "Tapenade de truffe noire", "Black truffle tapenade"),
      p("romarin", "Romarin", "Rosemary"),
    ],
  },
];

export const charcuterieGroups: readonly Section<CharcuterieGroupId>[] = [
  {
    id: "fines-tranches",
    anchor: { fr: "fines-tranches", en: "thin-slices" },
    name: { fr: "Fines tranches", en: "Thin slices" },
    description: {
      fr: "À trancher finement pour un sandwich, une assiette ou un apéritif.",
      en: "Sliced thin for a sandwich, a plate or an aperitif.",
    },
    ambiance: "tranchesPapier",
    products: [
      p("pastrami-de-boeuf", "Pastrami de bœuf", "Beef pastrami"),
      p("bresaola", "Bresaola", "Bresaola"),
      p("caviar-de-wagyu", "Caviar de Wagyu", "“Caviar de Wagyu”"),
      p("veau-au-torchon", "Veau au torchon", "Cloth-cooked veal (veau au torchon)"),
      p("jambon-de-poulet-roti", "Jambon de poulet rôti", "Roast chicken ham"),
      p("bacon-de-veau", "Bacon de veau", "Veal bacon"),
      p("bacon-de-boeuf", "Bacon de bœuf", "Beef bacon"),
    ],
  },
  {
    id: "fumes-secs",
    anchor: { fr: "fumes-et-secs", en: "smoked-and-cured" },
    name: { fr: "Fumés et secs", en: "Smoked and cured" },
    description: {
      fr: "Saucissons, viandes séchées et pièces fumées.",
      en: "Dry sausages, air-dried meats and smoked pieces.",
    },
    ambiance: "chambreFroide",
    products: [
      p("cecina", "Cecina premium", "Premium cecina"),
      p("rosette-de-boeuf", "Rosette de bœuf", "Beef rosette"),
      p("saucisson-boeuf-nature", "Saucisson sec de bœuf nature", "Plain dry beef saucisson"),
      p("saucisson-boeuf-fume", "Saucisson de bœuf fumé", "Smoked beef saucisson"),
      p("saucisson-boeuf-pistaches", "Saucisson de bœuf aux pistaches", "Beef saucisson with pistachios"),
      p("magret-de-canard-seche", "Magret de canard séché", "Air-dried duck breast"),
      p("lardons-de-veau-fumes", "Lardons de veau fumés", "Smoked veal lardons"),
      p("lkhlii", "Lkhlii", "Lkhlii"),
    ],
  },
  {
    id: "a-partager",
    anchor: { fr: "a-partager", en: "to-share" },
    name: { fr: "À partager", en: "To share" },
    description: {
      fr: "Planches, coffrets, pâtés et terrines.",
      en: "Boards, boxes, pâtés and terrines.",
    },
    ambiance: "terrinePlancheBois",
    products: [
      p("coffret-signature", "Coffret Signature", "Signature box", {
        note: { fr: "Pour 4 personnes", en: "Serves 4" },
      }),
      p("planche-charcuterie", "Planche de charcuterie", "Charcuterie board", {
        note: { fr: "Pour 2 à 3 personnes", en: "Serves 2 to 3" },
      }),
      p("pate-en-croute", "Pâté en croûte Richelieu", "Pâté en croûte Richelieu"),
      p("pate-sel-poivre", "Pâté sel et poivre", "Salt and pepper pâté"),
      p("terrine-de-canard", "Terrine de canard confit", "Duck confit terrine"),
      p("foie-gras-mi-cuit", "Foie gras mi-cuit", "Mi-cuit foie gras"),
    ],
  },
];

const allProducts: readonly Product[] = [...meatCategories, ...charcuterieGroups].flatMap((section) => section.products);
const productIndex = new Map(allProducts.map((product) => [product.id, product]));

export function findProduct(id: string | null | undefined): Product | undefined {
  return id ? productIndex.get(id) : undefined;
}

export function listAllProducts(): readonly Product[] {
  return allProducts;
}
