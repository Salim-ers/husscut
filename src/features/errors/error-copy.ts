/**
 * Textes des pages d'erreur. Module minimal car il est chargé côté client
 * (error.tsx est une frontière d'erreur présente sur toutes les pages).
 * Les dictionnaires FR/EN réutilisent ces textes : une seule source.
 */
export const errorCopy = {
  fr: {
    notFound: {
      title: "Cette page n'existe pas",
      text: "Le lien est peut-être ancien ou incomplet. Les viandes, la charcuterie et l'adresse de la boutique restent à un clic.",
      home: "Retour à l'accueil",
      meats: "Voir les viandes",
    },
    generic: {
      title: "Cette page ne s'affiche pas",
      text: "Un problème technique empêche l'affichage. Réessayez dans un instant ; si cela persiste, la boutique reste joignable par téléphone.",
      retry: "Réessayer",
      home: "Retour à l'accueil",
    },
  },
  en: {
    notFound: {
      title: "This page doesn't exist",
      text: "The link may be old or incomplete. The meats, the charcuterie and the shop's address are one click away.",
      home: "Back to the home page",
      meats: "See the meats",
    },
    generic: {
      title: "This page can't be displayed",
      text: "A technical problem is preventing it from loading. Try again in a moment; if it persists, the shop can still be reached by phone.",
      retry: "Try again",
      home: "Back to the home page",
    },
  },
};
