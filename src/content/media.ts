import type { StaticImageData } from "next/image";
import type { L10n } from "@/i18n/config";

import armoireMaturation from "@/assets/photos/armoire-maturation.webp";
import billotFromParis from "@/assets/photos/billot-from-paris.webp";
import boeufFicele from "@/assets/photos/boeuf-ficele.webp";
import brochettesVitrine from "@/assets/photos/brochettes-vitrine.webp";
import chambreFroide from "@/assets/photos/chambre-froide.webp";
import coffretFleursJaunes from "@/assets/photos/coffret-fleurs-jaunes.webp";
import coffretFromages from "@/assets/photos/coffret-fromages.webp";
import coffretNoirFleurs from "@/assets/photos/coffret-noir-fleurs.webp";
import comptoirInterieur from "@/assets/photos/comptoir-interieur.webp";
import cotesMaturees from "@/assets/photos/cotes-maturees.webp";
import etalSaucesBrochettes from "@/assets/photos/etal-sauces-brochettes.webp";
import facade from "@/assets/photos/facade.webp";
import gesteParage from "@/assets/photos/geste-parage.webp";
import gesteTrancheMarbree from "@/assets/photos/geste-tranche-marbree.webp";
import heroCoteBillotNeon from "@/assets/photos/hero-cote-billot-neon.webp";
import pateEnCroute from "@/assets/photos/pate-en-croute.webp";
import pieceMarbreeComptoir from "@/assets/photos/piece-marbree-comptoir.webp";
import piecesPersilleesBois from "@/assets/photos/pieces-persillees-bois.webp";
import portraitComptoir from "@/assets/photos/portrait-comptoir.webp";
import rosaceCharcuterie from "@/assets/photos/rosace-charcuterie.webp";
import roulesFromage from "@/assets/photos/roules-fromage.webp";
import saucissesVitrine from "@/assets/photos/saucisses-vitrine.webp";
import silhouetteNeon from "@/assets/photos/silhouette-neon.webp";
import steaksPersillesInox from "@/assets/photos/steaks-persilles-inox.webp";
import terrinePlancheBois from "@/assets/photos/terrine-planche-bois.webp";
import tranchesPapier from "@/assets/photos/tranches-papier.webp";
import volailleEntiere from "@/assets/photos/volaille-entiere.webp";
/* Photos supplémentaires (novembre 2026), préparées par scripts/prepare-extra-media.mjs. */
import piecePapierSigne from "@/assets/photos/piece-papier-signe.webp";
import pieceRotieFleurs from "@/assets/photos/piece-rotie-fleurs.webp";
import cotesNeonPlanche from "@/assets/photos/cotes-neon-planche.webp";
import rotiRouleAgrumes from "@/assets/photos/roti-roule-agrumes.webp";
/* Photos d'illustration libres de droit (rayons sans photo fournie par HussCut) :
   - veau : Pexels, photo 7741801 (licence Pexels, usage commercial libre) ;
   - agneau : Unsplash, photo V65tvNj3GXI (licence Unsplash, usage commercial libre). */
import veauJarretVitrine from "@/assets/photos/veau-jarret-vitrine.webp";
import agneauCotelettesGrillees from "@/assets/photos/agneau-cotelettes-grillees.webp";
import grilladeArdoise from "@/assets/photos/grillade-ardoise.webp";
import vitrineAgrumes from "@/assets/photos/vitrine-agrumes.webp";
import coteGrilleeBeurre from "@/assets/photos/cote-grillee-beurre.webp";
import tranchesPersillees from "@/assets/photos/tranches-persillees.webp";
import burrataTranches from "@/assets/photos/burrata-tranches.webp";
import pavesRomarin from "@/assets/photos/paves-romarin.webp";

export interface Photo {
  src: StaticImageData;
  alt: L10n;
  /** Point focal pour les recadrages (object-position). */
  focus?: string;
}

/**
 * Photothèque fournie par HussCut. Les textes alternatifs décrivent ce qui est visible,
 * sans nommer de personne ni affirmer d'origine ou de composition.
 */
export const photos = {
  heroCoteBillotNeon: {
    src: heroCoteBillotNeon,
    alt: {
      fr: "Côte de bœuf posée sur le billot en bois, sous l'enseigne néon HussCut.",
      en: "Bone-in rib of beef on the wooden butcher's block, beneath the HussCut neon sign.",
    },
    focus: "50% 55%",
  },
  portraitComptoir: {
    src: portraitComptoir,
    alt: {
      fr: "Au comptoir de HussCut, un boucher présente un plateau de côtes de bœuf devant l'enseigne néon.",
      en: "At the HussCut counter, a butcher holds a tray of rib steaks in front of the neon sign.",
    },
    focus: "55% 40%",
  },
  gesteTrancheMarbree: {
    src: gesteTrancheMarbree,
    alt: {
      fr: "Une main gantée tranche au couteau une pièce de bœuf très persillée, sur un billot.",
      en: "A gloved hand slices a heavily marbled piece of beef on a butcher's block.",
    },
    focus: "50% 45%",
  },
  gesteParage: {
    src: gesteParage,
    alt: {
      fr: "Des mains gantées parent une pièce de bœuf au couteau sur une planche blanche.",
      en: "Gloved hands trim a cut of beef with a knife on a white board.",
    },
    focus: "50% 50%",
  },
  billotFromParis: {
    src: billotFromParis,
    alt: {
      fr: "Un boucher de dos, tee-shirt « HussCut From Paris », découpe une côte de bœuf sous le néon.",
      en: "A butcher seen from behind, in a “HussCut From Paris” T-shirt, cuts a rib of beef under the neon.",
    },
    focus: "50% 40%",
  },
  chambreFroide: {
    src: chambreFroide,
    alt: {
      fr: "Saucisses sèches et pièce séchée suspendues en chambre froide, étiquette « La sélection by HussCut ».",
      en: "Dry sausages and a cured piece hanging in the cold room, with a “La sélection by HussCut” tag.",
    },
    focus: "55% 45%",
  },
  facade: {
    src: facade,
    alt: {
      fr: "Façade de la boutique : enseigne « HussCut Paris » et store « Boucherie Charcuterie ».",
      en: "The shop front: “HussCut Paris” sign and “Boucherie Charcuterie” awning.",
    },
    focus: "50% 38%",
  },
  comptoirInterieur: {
    src: comptoirInterieur,
    alt: {
      fr: "L'intérieur de la boutique : vitrine réfrigérée, balance et grandes fenêtres sur l'avenue.",
      en: "Inside the shop: chilled display counter, scales and large windows onto the avenue.",
    },
    focus: "50% 50%",
  },
  armoireMaturation: {
    src: armoireMaturation,
    alt: {
      fr: "Côtes de bœuf en maturation sur les clayettes d'une armoire réfrigérée.",
      en: "Ribs of beef dry-ageing on the shelves of a chilled cabinet.",
    },
    focus: "40% 45%",
  },
  cotesMaturees: {
    src: cotesMaturees,
    alt: {
      fr: "Trains de côtes de bœuf maturés, os apparents, dans l'armoire de maturation.",
      en: "Dry-aged racks of beef ribs, bones showing, in the ageing cabinet.",
    },
    focus: "45% 50%",
  },
  pieceMarbreeComptoir: {
    src: pieceMarbreeComptoir,
    alt: {
      fr: "Pièce de bœuf très persillée posée sur un comptoir en bois.",
      en: "A heavily marbled piece of beef resting on a wooden counter.",
    },
    focus: "50% 60%",
  },
  steaksPersillesInox: {
    src: steaksPersillesInox,
    alt: {
      fr: "Côte de bœuf et pièce persillée présentées sur un plateau inox.",
      en: "A rib steak and a marbled cut presented on a stainless-steel tray.",
    },
    focus: "50% 45%",
  },
  piecesPersilleesBois: {
    src: piecesPersilleesBois,
    alt: {
      fr: "Deux pièces de bœuf très persillées sur une planche en bois.",
      en: "Two heavily marbled cuts of beef on a wooden board.",
    },
    focus: "50% 50%",
  },
  boeufFicele: {
    src: boeufFicele,
    alt: {
      fr: "Rôtis de bœuf ficelés, alignés sous la lumière de la boutique.",
      en: "Tied beef roasts lined up under the shop lights.",
    },
    focus: "50% 50%",
  },
  etalSaucesBrochettes: {
    src: etalSaucesBrochettes,
    alt: {
      fr: "Vitrine garnie de brochettes, de saucisses et de pots de sauces.",
      en: "Display counter with skewers, sausages and jars of sauce.",
    },
    focus: "35% 50%",
  },
  brochettesVitrine: {
    src: brochettesVitrine,
    alt: {
      fr: "Brochettes marinées aux poivrons, alignées dans la vitrine.",
      en: "Marinated skewers with peppers, lined up in the display counter.",
    },
    focus: "50% 50%",
  },
  saucissesVitrine: {
    src: saucissesVitrine,
    alt: {
      fr: "Merguez et saucisses fraîches rangées dans la vitrine, avec les cartons « La sélection ».",
      en: "Merguez and fresh sausages arranged in the counter, with “La sélection” cards.",
    },
    focus: "50% 50%",
  },
  roulesFromage: {
    src: roulesFromage,
    alt: {
      fr: "Roulés de viande rouge garnis de fromage, dans la vitrine.",
      en: "Red meat rolls filled with cheese, in the display counter.",
    },
    focus: "50% 50%",
  },
  volailleEntiere: {
    src: volailleEntiere,
    alt: {
      fr: "Volaille entière tenue à deux mains, sous une lumière douce.",
      en: "A whole bird held in both hands, in soft light.",
    },
    focus: "50% 45%",
  },
  coffretFleursJaunes: {
    src: coffretFleursJaunes,
    alt: {
      fr: "Coffret noir de charcuterie tranchée, décoré de fleurs comestibles jaunes.",
      en: "Black box of sliced charcuterie decorated with yellow edible flowers.",
    },
    focus: "50% 45%",
  },
  coffretNoirFleurs: {
    src: coffretNoirFleurs,
    alt: {
      fr: "Coffret noir garni de charcuteries tranchées et de fleurs comestibles.",
      en: "Black box filled with sliced charcuterie and edible flowers.",
    },
    focus: "50% 55%",
  },
  coffretFromages: {
    src: coffretFromages,
    alt: {
      fr: "Coffret noir de charcuteries, fromages, noix de pécan et fleurs.",
      en: "Black box of charcuterie, cheeses, pecans and flowers.",
    },
    focus: "50% 50%",
  },
  rosaceCharcuterie: {
    src: rosaceCharcuterie,
    alt: {
      fr: "Rosace de fines tranches de charcuterie, décorée de fleurs et de tomates cerises.",
      en: "A rosette of thin charcuterie slices, decorated with flowers and cherry tomatoes.",
    },
    focus: "50% 40%",
  },
  tranchesPapier: {
    src: tranchesPapier,
    alt: {
      fr: "Fines tranches de charcuterie et de fromage présentées sur papier blanc.",
      en: "Thin slices of charcuterie and cheese on white paper.",
    },
    focus: "50% 40%",
  },
  pateEnCroute: {
    src: pateEnCroute,
    alt: {
      fr: "Pâté en croûte entamé au couteau sur une planche de préparation.",
      en: "A pâté en croûte being cut with a knife on a prep board.",
    },
    focus: "40% 50%",
  },
  terrinePlancheBois: {
    src: terrinePlancheBois,
    alt: {
      fr: "Tranches de terrine et pain grillé sur une planche en bois.",
      en: "Slices of terrine and toasted bread on a wooden board.",
    },
    focus: "50% 50%",
  },
  silhouetteNeon: {
    src: silhouetteNeon,
    alt: {
      fr: "Enseigne néon HussCut allumée dans l'obscurité.",
      en: "The HussCut neon sign glowing in the dark.",
    },
    focus: "55% 40%",
  },
  piecePapierSigne: {
    src: piecePapierSigne,
    alt: {
      fr: "Pièce de bœuf très persillée posée sur le papier signé HussCut.",
      en: "A heavily marbled piece of beef resting on HussCut's signature paper.",
    },
    focus: "50% 55%",
  },
  pieceRotieFleurs: {
    src: pieceRotieFleurs,
    alt: {
      fr: "Pièce rôtie aux herbes, décorée de romarin et de fleurs comestibles.",
      en: "A herb-roasted joint decorated with rosemary and edible flowers.",
    },
    focus: "50% 45%",
  },
  cotesNeonPlanche: {
    src: cotesNeonPlanche,
    alt: {
      fr: "Côtes de bœuf alignées sur une planche, sous l'enseigne néon HussCut.",
      en: "Ribs of beef lined up on a board beneath the HussCut neon sign.",
    },
    focus: "50% 55%",
  },
  rotiRouleAgrumes: {
    src: rotiRouleAgrumes,
    alt: {
      fr: "Rôti roulé et ficelé, garni de citron vert et de romarin.",
      en: "A rolled, tied roast garnished with lime and rosemary.",
    },
    focus: "40% 55%",
  },
  grilladeArdoise: {
    src: grilladeArdoise,
    alt: {
      fr: "Viande grillée tranchée sur une ardoise, avec des rondelles d'oignon rouge.",
      en: "Sliced grilled meat on slate, with red onion rings.",
    },
    focus: "50% 50%",
  },
  vitrineAgrumes: {
    src: vitrineAgrumes,
    alt: {
      fr: "Vitrine de viandes rouges, décorée d'orange et de persil.",
      en: "A counter of red meats decorated with orange and parsley.",
    },
    focus: "40% 50%",
  },
  coteGrilleeBeurre: {
    src: coteGrilleeBeurre,
    alt: {
      fr: "Côte de bœuf grillée, beurre aux herbes et romarin, sur un plateau.",
      en: "A grilled rib of beef with herb butter and rosemary, on a tray.",
    },
    focus: "50% 50%",
  },
  tranchesPersillees: {
    src: tranchesPersillees,
    alt: {
      fr: "Fines tranches de viande séchée très persillée.",
      en: "Thin slices of heavily marbled cured meat.",
    },
    focus: "50% 50%",
  },
  burrataTranches: {
    src: burrataTranches,
    alt: {
      fr: "Burrata posée sur de fines tranches de viande, décorée de jeunes pousses.",
      en: "Burrata on thin slices of meat, topped with microgreens.",
    },
    focus: "50% 55%",
  },
  pavesRomarin: {
    src: pavesRomarin,
    alt: {
      fr: "Deux pavés de bœuf et du romarin sur le papier HussCut.",
      en: "Two beef steaks and rosemary on HussCut paper.",
    },
    focus: "50% 40%",
  },
  veauJarretVitrine: {
    src: veauJarretVitrine,
    alt: {
      fr: "Tranches de jarret à l'os, façon osso buco, sur un plateau noir en vitrine (photo d'illustration).",
      en: "Bone-in shank slices, osso buco style, on a black tray in a display counter (illustrative photo).",
    },
    focus: "55% 50%",
  },
  agneauCotelettesGrillees: {
    src: agneauCotelettesGrillees,
    alt: {
      fr: "Côtelettes d'agneau grillées sur une plaque en fonte (photo d'illustration).",
      en: "Grilled lamb chops on a cast-iron plate (illustrative photo).",
    },
    focus: "50% 45%",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
