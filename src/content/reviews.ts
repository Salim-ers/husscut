import type { L10n } from "@/i18n/config";

export interface GoogleReviewExcerpt {
  id: string;
  /** Initiales uniquement : ni prénom, ni nom, ni avatar. */
  author: string;
  /** Note de l'avis, lisible sur la capture fournie. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Passage lisible, reproduit tel quel. Le texte complet est sur Google. */
  original: string;
  /** Traduction anglaise, présentée comme telle. */
  translation: L10n["en"];
}

/**
 * Deux avis publiés sur la fiche Google de la boutique, d'après la capture fournie.
 * Les avis étant tronqués sur Google, l'extrait s'arrête au dernier mot lisible ;
 * la suite n'est pas inventée.
 */
export const googleReviews: readonly GoogleReviewExcerpt[] = [
  {
    id: "review-mba",
    author: "M. B.-A.",
    rating: 5,
    original:
      "Très belle découverte ! Une présentation magnifique, un assortiment généreux et varié, avec des produits qui donnent vraiment envie. La qualité et le soin",
    translation:
      "A wonderful discovery! A beautiful presentation, a generous and varied selection, with products that really make you want them. The quality and the care",
  },
  {
    id: "review-hh",
    author: "H. H.",
    rating: 5,
    original:
      "C'était la première fois que j'achète chez huscut ,et ce ne sera pas la dernière dommage que cest 1 peu loin de chez moi !!",
    translation: "It was my first time buying from huscut, and it won't be the last. Shame it's a bit far from home!!",
  },
];
