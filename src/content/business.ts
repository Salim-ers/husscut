/**
 * Source unique des informations commerciales et légales de HussCut.
 *
 * Règle : une valeur `null` signifie « non confirmée par HussCut ». Elle n'est jamais
 * remplacée par une supposition. Le contrôle de publication (scripts/launch-gate.ts)
 * refuse un build de production tant que les champs obligatoires restent à `null`
 * ou que les drapeaux `confirmed` / `verified` restent à `false`.
 *
 * Ce fichier n'importe rien : il est lu tel quel par le script de contrôle (Node).
 */

export type Weekday = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
/** Plage horaire au format 24 h « HH:MM », heure de Paris. */
export type TimeRange = readonly [open: string, close: string];

const ADDRESS_QUERY = "Boucherie HussCut, 13 avenue Philippe-Auguste, 75011 Paris";

export const business = {
  name: "HussCut",
  /** Formulation retenue dans l'interface. */
  activity: { fr: "boucherie-charcuterie halal", en: "halal butcher and charcuterie" },

  address: {
    street: "13 avenue Philippe-Auguste",
    postalCode: "75011",
    city: "Paris",
    countryCode: "FR",
    neighbourhood: "Nation",
    metro: "Nation",
  },

  phone: {
    display: "06 65 63 76 11",
    international: "+33 6 65 63 76 11",
    e164: "+33665637611",
  },

  instagram: { handle: "@husscut", url: "https://www.instagram.com/husscut/" },

  /** Plateformes de livraison : liens externes uniquement, aucun prix ni stock rapatrié. */
  delivery: [
    { id: "ubereats", name: "Uber Eats", url: "https://www.ubereats.com/fr/store/boucherie-husscut-paris/C4s2Y28DXQyAZlNp0IfAcg" },
    { id: "deliveroo", name: "Deliveroo", url: "https://deliveroo.fr/fr/menu/paris/11eme-nation/boucherie-husscut-halal" },
  ],

  /** Itinéraire indépendant de toute carte intégrée. */
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`,
  /** Carte intégrée, chargée uniquement après action du visiteur. */
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&output=embed`,

  /**
   * Fiche Google. L'URL actuelle est une recherche Google Maps qui ouvre la fiche
   * « Boucherie Husscut ». À remplacer par l'URL partagée depuis la fiche (avec son
   * identifiant) puis passer `verified` à true.
   */
  googleListing: {
    url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`,
    verified: false,
  },

  /**
   * Horaires de la BOUTIQUE (distincts des horaires de livraison des plateformes).
   * Base indicative issue du brief et de la fiche Google (fermeture 19 h 45).
   * Une source tierce (Mappy) indique 19 h 50 : à trancher avec HussCut.
   */
  hours: {
    confirmed: false,
    weekly: {
      monday: [["09:00", "19:45"]],
      tuesday: [["09:00", "19:45"]],
      wednesday: [["09:00", "19:45"]],
      thursday: [["09:00", "19:45"]],
      friday: [
        ["09:00", "13:00"],
        ["14:30", "19:45"],
      ],
      saturday: [["09:00", "19:45"]],
      sunday: [],
    } satisfies Record<Weekday, readonly TimeRange[]>,
  },

  /**
   * Certification halal : affichée uniquement après validation par HussCut
   * (organisme, périmètre, justificatif). Aucun sceau ni organisme supposé.
   */
  halalCertification: null as null | {
    certifier: string;
    scope: { fr: string; en: string };
    proofUrl: string | null;
  },

  /** Données issues de l'annuaire des entreprises (INSEE / DGFiP), à revérifier avant publication. */
  legal: {
    companyName: "HUSSCUT",
    legalForm: "SAS (société par actions simplifiée)",
    siren: "903 983 146",
    /** SIRET de l'établissement secondaire parisien (la boutique), à ne pas confondre avec le siège. */
    shopSiret: "903 983 146 00023",
    nafCode: "47.22Z",
    companyCreatedOn: "2021-10-08",
    shopCreatedOn: "2021-11-18",
    headOfficeAddress: null as string | null,
    shareCapital: null as string | null,
    rcs: null as string | null,
    vatNumber: null as string | null,
    publicationDirector: null as string | null,
    publisherEmail: null as string | null,
    host: null as null | { name: string; address: string; contact: string },
  },

  /** Avis Google : extraits affichés tant que la réutilisation n'est pas refusée. */
  reviews: {
    reuseAuthorized: false,
    /** Passer à false pour n'afficher que le lien vers la fiche Google. */
    showExcerpts: true,
  },

  media: {
    /** Portrait de la page « La maison » : droits de diffusion à confirmer. */
    portraitRightsConfirmed: false,
  },

  credits: { studio: "QuadCore", url: "https://www.quad-core.fr/" },
} as const;

export type Business = typeof business;
