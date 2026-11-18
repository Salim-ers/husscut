/**
 * Textes de l'interface en français. La version anglaise doit avoir exactement la même forme
 * (vérifié par le typage). Marqueurs : « ^e » = exposant (11^e) ; {n} = interpolation.
 * Les espaces insécables avant : ; ! ? sont ajoutées automatiquement (typography.ts).
 */
import { errorCopy } from "@/features/errors/error-copy";

const fr = {
  meta: {
    siteName: "HussCut",
    titleTemplate: "%s | HussCut, boucherie halal à Nation",
    home: {
      title: "HussCut | Boucherie halal à Paris 11^e, Nation",
      description:
        "Boucherie-charcuterie halal au 13 avenue Philippe-Auguste, Paris 11^e (métro Nation) : bœuf, veau, agneau, volaille, grillades, charcuterie et coffrets à partager.",
    },
    meats: {
      title: "Les viandes",
      description:
        "Bœuf, veau, agneau, volaille, grillades, créations bouchères et épicerie fine chez HussCut, boucherie halal à Nation, Paris 11^e. Demandez la disponibilité avant de passer.",
    },
    charcuterie: {
      title: "La charcuterie",
      description:
        "Fines tranches, pièces fumées et séchées, pâtés, terrines, planches et coffrets : la charcuterie halal de HussCut, à Nation, Paris 11^e.",
    },
    house: {
      title: "La maison",
      description:
        "Le comptoir HussCut au 13 avenue Philippe-Auguste, à Nation : la découpe sur le billot, l'étal et l'armoire de maturation.",
    },
    contact: {
      title: "Contact & commandes",
      description:
        "Adresse, horaires, téléphone et itinéraire de HussCut, 13 avenue Philippe-Auguste, Paris 11^e. Préparez une demande de disponibilité, de planche ou de coffret.",
    },
    legal: { title: "Mentions légales", description: "Mentions légales du site de la boucherie HussCut." },
    privacy: { title: "Confidentialité", description: "Comment le site HussCut traite vos données personnelles." },
    cookies: { title: "Cookies et préférences", description: "Cookies, stockage local et contenus tiers sur le site HussCut." },
    notFound: { title: "Page introuvable" },
    ogAlt: "Logo néon HussCut et côte de bœuf sur le billot",
  },

  a11y: {
    skipToContent: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    mainNavigation: "Navigation principale",
    footerNavigation: "Plan du site",
    legalNavigation: "Informations légales",
    homeLink: "HussCut, retour à l'accueil",
    newTab: "(nouvel onglet)",
    externalSite: "(site externe)",
    switchLanguage: "Read this page in English",
    breadcrumbHome: "Accueil",
  },

  nav: {
    home: "Accueil",
    meats: "Les viandes",
    charcuterie: "La charcuterie",
    house: "La maison",
    contact: "Contact",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    cookies: "Cookies et préférences",
  },

  language: { current: "FR", target: "EN", targetName: "English" },

  actions: {
    call: "Appeler",
    callShop: "Appeler la boutique",
    directions: "Itinéraire",
    startDirections: "Lancer l'itinéraire",
    instagram: "Instagram",
    askAvailability: "Demander la disponibilité",
  },

  hours: {
    title: "Horaires de la boutique",
    closed: "Fermé",
    today: "Aujourd'hui",
    and: "et",
    note: "Horaires communiqués à titre indicatif. Un jour férié ou un doute ? Appelez la boutique avant de vous déplacer.",
    days: {
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    },
  },

  home: {
    hero: {
      titleLines: ["L'excellence", "de la viande halal."],
      subtitle: "Boucherie & charcuterie à Nation, Paris 11^e",
      primary: "Découvrir nos viandes",
      secondary: "Venir à la boutique",
      metro: "Métro Nation",
    },
    universes: {
      title: "Ce que vous trouverez au comptoir",
      meats: {
        title: "Les viandes",
        text: "Bœuf, veau, agneau, volaille et grillades, présentés à la coupe.",
        link: "Voir les viandes",
      },
      charcuterie: {
        title: "La charcuterie",
        text: "Fines tranches, pièces fumées et séchées, planches et coffrets à partager.",
        link: "Voir la charcuterie",
      },
      creations: {
        title: "Les créations bouchères",
        text: "Brochettes marinées, cordons bleus et préparations prêtes à cuisiner.",
        link: "Voir les créations",
      },
    },
    gesture: {
      title: "Le geste, derrière le comptoir",
      text: "Les pièces sont parées et tranchées sur le billot, sous le néon de la boutique. Dites ce que vous cuisinez et pour combien de personnes : l'équipe vous oriente vers la bonne pièce et la bonne épaisseur.",
      link: "Découvrir la maison",
    },
    visit: {
      title: "Venir au comptoir",
      text: "À quelques pas du métro Nation, au 13 avenue Philippe-Auguste. Le plus simple pour une pièce précise : appeler avant de passer.",
      deliveryTitle: "Plutôt livré ?",
      deliveryText: "HussCut est aussi présent sur deux plateformes de livraison.",
    },
  },

  reviews: {
    title: "Avis Google",
    intro: "Extraits d'avis publiés sur la fiche Google de la boutique.",
    excerpt: "Extrait",
    source: "Avis publié sur Google",
    rating: "{n} étoiles sur 5",
    translated: "",
    seeAll: "Voir tous les avis sur Google",
  },

  meats: {
    title: "Les viandes",
    lede: "Bœuf, veau, agneau, volaille, grillades, créations bouchères et épicerie fine. La sélection change d'un jour à l'autre : pour une pièce précise ou une grande quantité, demandez avant de passer.",
    filterLabel: "Afficher un rayon",
    all: "Tout voir",
    count: "{n} produits affichés",
    countOne: "{n} produit affiché",
    sectionCount: "{n} produits",
    footnote:
      "Cette liste reflète l'offre habituelle de la boutique. Elle évolue selon les saisons et les arrivages, et aucun prix n'est communiqué en ligne : la boutique vous renseigne au comptoir ou par téléphone.",
  },

  charcuterie: {
    title: "La charcuterie",
    lede: "Fines tranches, pièces fumées et séchées, pâtés et terrines : la charcuterie se choisit au comptoir ou se prépare pour recevoir.",
    speciesNote:
      "L'espèce est indiquée quand elle figure dans le nom du produit. Pour la composition ou les allergènes, renseignez-vous en boutique.",
    platters: {
      title: "Planches et coffrets",
      text: "Pour un apéritif ou une réception, indiquez le nombre de personnes et la date souhaitée. La boutique vous répond sur ce qui est possible.",
      cta: "Demander une planche ou un coffret",
    },
  },

  house: {
    title: "La maison",
    lede: "HussCut est une boucherie-charcuterie halal de quartier, au 13 avenue Philippe-Auguste, à quelques pas de la place de la Nation.",
    portraitCaption: "Au comptoir de HussCut, sous l'enseigne néon.",
    chapters: {
      cut: {
        title: "La découpe",
        text: "Sur le billot, les pièces sont parées et tranchées devant vous. Une épaisseur, un poids, une découpe pour le four ou le grill : demandez au comptoir.",
      },
      counter: {
        title: "L'étal",
        text: "Dans la vitrine, les viandes côtoient les brochettes, les saucisses et la charcuterie. Les côtes de bœuf reposent dans une armoire de maturation.",
      },
      address: {
        title: "L'adresse",
        text: "Une façade noire sur l'avenue Philippe-Auguste, de grandes fenêtres, et le néon doré au mur du fond. Le comptoir est juste derrière la porte.",
      },
    },
    halal: {
      title: "Boucherie-charcuterie halal",
      pending:
        "Pour toute question sur la certification halal des viandes (organisme certificateur, produits concernés), renseignez-vous directement en boutique : l'équipe vous répond au comptoir.",
      certifier: "Organisme certificateur",
      scope: "Périmètre",
      proof: "Consulter le justificatif",
    },
    invite: {
      title: "Passez au comptoir",
      text: "13 avenue Philippe-Auguste, Paris 11^e. Métro Nation.",
      cta: "Horaires et accès",
    },
  },

  contact: {
    title: "Contact & commandes",
    lede: "Une question, une disponibilité à vérifier, une planche pour recevoir : préparez votre demande ici ou appelez la boutique.",
    notice:
      "Aucune commande n'est confirmée avant la réponse de la boutique. HussCut vous indique la disponibilité, la quantité et le moment pour passer.",
    visit: {
      title: "La boutique",
      addressLabel: "Adresse",
      phoneLabel: "Téléphone",
      socialLabel: "Instagram",
      deliveryLabel: "Livraison",
      deliveryText: "Commande en ligne sur les plateformes, selon leurs propres conditions :",
    },
    form: {
      title: "Préparer une demande",
      smsIntro:
        "Votre demande part par SMS depuis votre téléphone : préparez le message ici, relisez-le, puis ouvrez votre messagerie pour l'envoyer à la boutique.",
      emailIntro: "Votre demande est transmise par e-mail à la boutique, qui vous répond par le moyen indiqué.",
      required: "obligatoire",
      optional: "facultatif",
      name: "Votre nom",
      replyTo: "Téléphone ou e-mail pour vous répondre",
      topicLegend: "Votre demande concerne",
      topics: {
        question: "Une question",
        availability: "Disponibilité ou commande",
        platter: "Planche ou coffret",
      },
      product: "Produit concerné",
      removeProduct: "Retirer ce produit",
      people: "Nombre de personnes",
      date: "Date souhaitée",
      message: "Votre message",
      messageHint: "{n} caractères restants",
      placeholders: {
        question: "Votre question pour la boutique",
        availability: "La pièce, la quantité ou le poids souhaités, et quand vous aimeriez passer",
        platter: "L'occasion, vos préférences, ce que vous souhaitez éviter",
      },
      submitSms: "Préparer mon SMS",
      submitEmail: "Envoyer ma demande",
      sending: "Envoi en cours…",
      errorSummary: "Corrigez les champs signalés pour continuer.",
      errors: {
        nameRequired: "Indiquez votre nom.",
        nameTooLong: "Votre nom dépasse 80 caractères.",
        replyToInvalid: "Indiquez un numéro de téléphone ou une adresse e-mail valide.",
        messageTooShort: "Écrivez votre message (10 caractères minimum).",
        messageTooLong: "Votre message dépasse 1 000 caractères.",
        peopleInvalid: "Indiquez un nombre de personnes entre 1 et 50.",
        dateInvalid: "Choisissez une date à partir d'aujourd'hui.",
        topicInvalid: "Choisissez l'objet de votre demande.",
      },
      sms: {
        greeting: "Bonjour HussCut, c'est {name}.",
        topic: "Objet : {topic}",
        product: "Produit : {product}",
        people: "Nombre de personnes : {n}",
        date: "Date souhaitée : {date}",
        sentFrom: "Message préparé sur le site HussCut.",
      },
      ready: {
        title: "Votre SMS est prêt",
        text: "Relisez-le, puis ouvrez votre application SMS : le message ne part qu'au moment où vous appuyez sur Envoyer.",
        preview: "Message préparé pour le {phone}",
        open: "Ouvrir mes SMS",
        copy: "Copier le message",
        copied: "Message copié. Collez-le dans un SMS au {phone}.",
        copyFailed: "La copie automatique n'a pas fonctionné. Sélectionnez le texte du message pour le copier.",
        edit: "Modifier ma demande",
        desktopHint: "Sur ordinateur, copiez le message puis envoyez-le depuis votre téléphone, ou appelez la boutique.",
      },
      result: {
        sent: "Demande envoyée à la boutique. HussCut vous répondra par le moyen indiqué.",
        failed:
          "L'envoi n'a pas abouti : votre demande n'a pas été transmise. Réessayez, préparez un SMS ou appelez la boutique.",
        rateLimited: "Trop de demandes envoyées depuis cette connexion. Réessayez dans quelques minutes ou appelez la boutique.",
        fallbackSms: "Préparer un SMS à la place",
      },
    },
    map: {
      title: "Plan d'accès",
      consent:
        "La carte est fournie par Google Maps. L'afficher charge un contenu de Google, qui peut déposer des cookies et recevoir votre adresse IP.",
      show: "Afficher la carte",
      remember: "Se souvenir de mon choix sur cet appareil",
      hide: "Masquer la carte",
      frameTitle: "Carte Google Maps : HussCut, 13 avenue Philippe-Auguste, Paris",
      alternative: "Sans carte, l'itinéraire s'ouvre directement dans votre application de navigation.",
    },
  },

  footer: {
    awning: "Boucherie Charcuterie",
    tagline: "Boucherie-charcuterie halal à Nation, Paris 11^e.",
    visit: "La boutique",
    explore: "Le site",
    follow: "Suivre et commander",
    deliveryLabel: "Livraison",
    deliveryItem: "Livraison : {name}",
    credit: "Créé par",
    rights: "HussCut. Tous droits réservés.",
  },

  legal: {
    pending: "Information en cours de confirmation",
    lastUpdate: "Dernière mise à jour : {date}",
    publisher: {
      title: "Éditeur du site",
      company: "Dénomination",
      form: "Forme juridique",
      capital: "Capital social",
      headOffice: "Siège social",
      siren: "SIREN",
      shopSiret: "SIRET de la boutique",
      shopAddress: "Adresse de la boutique",
      rcs: "Immatriculation",
      vat: "TVA intracommunautaire",
      naf: "Code NAF",
      phone: "Téléphone",
      email: "E-mail",
      director: "Responsable de la publication",
    },
    host: { title: "Hébergement", name: "Hébergeur", address: "Adresse", contact: "Contact" },
    design: { title: "Conception et réalisation", text: "Site conçu et développé par QuadCore." },
    ip: {
      title: "Propriété intellectuelle",
      text: "Les photographies, le logo, l'emblème et l'enseigne HussCut appartiennent à leurs titulaires. Toute reproduction sans autorisation est interdite.",
    },
    reviews: {
      title: "Avis clients",
      text: "Les extraits d'avis affichés proviennent de la fiche Google de la boutique. Ils sont reproduits sans modification, avec les initiales de leurs auteurs, et renvoient vers la fiche pour la lecture complète.",
    },
  },

  privacy: {
    intro:
      "Ce site présente la boutique HussCut. Il ne propose ni compte client, ni paiement, ni mesure d'audience. Cette page décrit les seules données qui peuvent être traitées.",
    controller: {
      title: "Responsable du traitement",
      text: "HUSSCUT, SAS, boutique au 13 avenue Philippe-Auguste, 75011 Paris.",
    },
    sections: [
      {
        id: "sms",
        title: "Demande par SMS",
        text: "Lorsque vous préparez un SMS, le message est composé dans votre navigateur et n'est pas envoyé au site. Il part depuis votre téléphone, par votre opérateur. La boutique reçoit votre numéro et le contenu du message pour vous répondre.",
      },
      {
        id: "email",
        title: "Demande par e-mail",
        text: "Si l'envoi par e-mail est activé, votre nom, vos coordonnées de réponse et votre message sont transmis à la boutique par un prestataire d'envoi d'e-mails agissant pour son compte. Ils servent uniquement à répondre à votre demande.",
      },
      {
        id: "map",
        title: "Carte Google Maps",
        text: "La carte n'est chargée que si vous cliquez sur « Afficher la carte ». Google reçoit alors votre adresse IP et peut déposer des cookies, selon sa propre politique de confidentialité.",
      },
      {
        id: "links",
        title: "Liens externes",
        text: "Les liens vers Instagram, Google, Uber Eats et Deliveroo ouvrent des sites tiers. Leurs propres règles de confidentialité s'appliquent dès que vous les consultez.",
      },
      {
        id: "logs",
        title: "Journaux techniques",
        text: "Comme tout site, l'hébergeur enregistre des journaux techniques (adresse IP, page demandée, date) pour assurer la sécurité et le bon fonctionnement du service.",
      },
    ],
    retention: {
      title: "Durée de conservation",
      text: "Les demandes sont conservées le temps nécessaire pour y répondre. La durée précise est fixée par la boutique.",
    },
    rights: {
      title: "Vos droits",
      text: "Vous pouvez demander l'accès, la rectification ou l'effacement de vos données en écrivant à la boutique ou en la contactant au comptoir. Vous pouvez aussi saisir la CNIL (cnil.fr).",
    },
  },

  cookies: {
    intro:
      "Le site HussCut n'utilise aucun cookie de mesure d'audience ni de publicité. Il n'en dépose aucun lui-même.",
    storageTitle: "Ce que le site garde sur votre appareil",
    storage: [
      "L'introduction animée n'est jouée qu'une fois par visite : cette information est gardée le temps de la session de votre navigateur.",
      "Si vous cochez « Se souvenir de mon choix » sous la carte, votre accord pour Google Maps est gardé sur cet appareil jusqu'à ce que vous le retiriez ici.",
    ],
    thirdPartyTitle: "Contenu tiers",
    thirdParty: "Seule la carte Google Maps, chargée après votre clic, peut déposer des cookies de Google.",
    preferencesTitle: "Vos préférences",
    mapAllowed: "Carte Google Maps : affichée automatiquement sur cet appareil.",
    mapAsk: "Carte Google Maps : le site vous demande avant de l'afficher.",
    revoke: "Retirer mon accord pour la carte",
    revoked: "C'est fait : la carte ne sera plus affichée sans votre clic.",
  },

  errors: errorCopy.fr,
};

export type Dictionary = typeof fr;
export default fr;
