import { errorCopy } from "@/features/errors/error-copy";
import type { Dictionary } from "./fr";

const en: Dictionary = {
  meta: {
    siteName: "HussCut",
    titleTemplate: "%s | HussCut, halal butcher in Nation, Paris",
    home: {
      title: "HussCut | Halal butcher in Paris 11, Nation",
      description:
        "Halal butcher and charcuterie at 13 avenue Philippe-Auguste, Paris 11 (Nation metro): beef, veal, lamb, poultry, grill favourites, charcuterie and sharing boxes.",
    },
    meats: {
      title: "Meats",
      description:
        "Beef, veal, lamb, poultry, grill favourites, butcher's creations and fine pantry at HussCut, halal butcher in Nation, Paris 11. Ask about availability before you come.",
    },
    charcuterie: {
      title: "Charcuterie",
      description:
        "Thin slices, smoked and cured meats, pâtés, terrines, boards and boxes: halal charcuterie from HussCut in Nation, Paris 11.",
    },
    house: {
      title: "Our shop",
      description:
        "The HussCut counter at 13 avenue Philippe-Auguste, Nation: cutting on the block, the display counter and the dry-ageing cabinet.",
    },
    contact: {
      title: "Find us & contact",
      description:
        "Address, opening hours, phone, directions and map for HussCut, 13 avenue Philippe-Auguste, Paris 11, a few steps from Nation metro.",
    },
    order: {
      title: "Order",
      description:
        "Order from HussCut, halal butcher in Nation: prepare a request for cuts, boards or boxes to collect at the counter, or get delivery through Uber Eats and Deliveroo.",
    },
    legal: { title: "Legal notice", description: "Legal notice for the HussCut butcher's website." },
    privacy: { title: "Privacy", description: "How the HussCut website handles your personal data." },
    cookies: { title: "Cookies and preferences", description: "Cookies, local storage and third-party content on the HussCut website." },
    notFound: { title: "Page not found" },
    ogAlt: "HussCut neon logo and a rib of beef on the butcher's block",
  },

  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNavigation: "Main navigation",
    footerNavigation: "Site map",
    legalNavigation: "Legal information",
    homeLink: "HussCut, back to home page",
    newTab: "(opens in a new tab)",
    externalSite: "(external site)",
    switchLanguage: "Lire cette page en français",
    breadcrumbHome: "Home",
  },

  nav: {
    home: "Home",
    meats: "Meats",
    charcuterie: "Charcuterie",
    house: "Our shop",
    order: "Order",
    contact: "Find us",
    legal: "Legal notice",
    privacy: "Privacy",
    cookies: "Cookies and preferences",
  },

  language: { current: "EN", target: "FR", targetName: "Français" },

  actions: {
    call: "Call",
    callShop: "Call the shop",
    directions: "Directions",
    startDirections: "Get directions",
    instagram: "Instagram",
    order: "Order",
  },

  hours: {
    title: "Shop opening hours",
    closed: "Closed",
    today: "Today",
    and: "and",
    note: "Hours are indicative. Bank holiday or any doubt? Call the shop before you come.",
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
  },

  home: {
    hero: {
      kicker: "Butcher and charcuterie, Paris 11",
      titleLines: ["Meat,", "at its finest"],
      halal: "Halal",
      subtitle:
        "Dry-aged ribs, marbled cuts, fine charcuterie and sharing boxes: chosen, trimmed and sliced on the block, a few steps from Nation.",
      primary: "Order",
      secondary: "Explore our meats",
      metro: "Nation metro",
      scroll: "Scroll",
    },
    manifesto: {
      kicker: "The HussCut house",
      text: "Here, meat is chosen *like a fine vintage*. A marbling, an ageing, a thickness: tell the team what you're cooking, and they trim and slice the cut right in front of you.",
    },
    universes: {
      kicker: "The menu",
      title: "Three counters, *one standard*",
      meats: {
        title: "Meats",
        text: "Beef, veal, lamb, poultry and grill favourites, sold by the cut. From everyday steaks to dry-aged ribs.",
        link: "See the meats",
      },
      charcuterie: {
        title: "Charcuterie",
        text: "Thin slices, smoked and cured meats, pâtés, terrines, boards and boxes to share.",
        link: "See the charcuterie",
      },
      creations: {
        title: "Butcher's creations",
        text: "Marinated skewers, rolls, cordons bleus and ready-to-cook preparations.",
        link: "See the creations",
      },
    },
    gesture: {
      kicker: "The craft",
      title: "Trimmed and sliced *on the block*",
      text: "Cuts are trimmed and sliced on the block, under the shop's neon sign. Tell the team what you're cooking and for how many: they'll steer you to the right cut and thickness.",
      steps: ["Choose the cut", "Trim it", "Slice it to the thickness you want"],
      link: "Discover the shop",
    },
    gallery: {
      kicker: "The counter",
      title: "A display *worth a look*",
      text: "Ribs under the neon, prime cuts, roasts, grills: a glimpse of what crosses the counter.",
      hint: "Scroll",
      captions: {
        neon: "Under the neon",
        exception: "The prime cut",
        rotie: "The roast",
        papier: "On HussCut paper",
        vitrine: "The display",
        roule: "The rolled roast",
        grillade: "The grill",
        cote: "The grilled rib",
      },
    },
    ageing: {
      kicker: "Dry-ageing",
      title: "Time *makes the flavour*",
      text: "In the dry-ageing cabinet, ribs of beef rest on their racks. Ask at the counter which ones are ready.",
      cta: "See the beef",
    },
    order: {
      kicker: "Order",
      title: "Your order, *cut to measure*",
      text: "A specific cut, a quantity for a big table, a box for guests: prepare your request, and the shop will confirm availability and when to come by.",
      modes: {
        takeaway: { title: "Collect at the counter", text: "Prepare your request, the shop replies." },
        platter: { title: "Boards & boxes", text: "For drinks, a party or a gathering." },
        delivery: { title: "Delivery", text: "On Uber Eats and Deliveroo, on their terms." },
      },
      cta: "Order",
    },
  },

  reviews: {
    kicker: "Google reviews",
    title: "What *our customers* say",
    intro: "Excerpts from reviews posted on the shop's Google listing.",
    excerpt: "Excerpt",
    source: "Review posted on Google",
    rating: "{n} out of 5 stars",
    translated: "Translated from French",
    seeAll: "See all reviews on Google",
  },

  meats: {
    kicker: "The menu",
    title: "Meats",
    lede: "Beef, veal, lamb, poultry, grill favourites, butcher's creations and fine pantry. The selection changes from day to day: for a specific cut or a large quantity, ask before you come.",
    filterLabel: "Show a section",
    all: "Show all",
    count: "{n} products shown",
    countOne: "{n} product shown",
    sectionCount: "{n} products",
    footnote:
      "This list reflects what the shop usually offers. It changes with the seasons and deliveries, and no prices are given online: the shop will tell you at the counter or by phone.",
  },

  catalogue: {
    rowHint: "ask about availability",
    orderTitle: "Something caught your eye?",
    orderText: "Tap a product on the menu or prepare your request: the shop will confirm availability and when to come by.",
  },

  charcuterie: {
    kicker: "The menu",
    title: "Charcuterie",
    lede: "Thin slices, smoked and cured meats, pâtés and terrines: choose at the counter, or have it prepared for guests.",
    speciesNote:
      "The animal is stated when it is part of the product name. For ingredients or allergens, please ask in the shop.",
    platters: {
      title: "Boards and boxes",
      text: "For drinks or a gathering, tell the shop how many people and the date you have in mind. The team will let you know what's possible.",
      cta: "Ask for a board or box",
    },
  },

  house: {
    kicker: "Nation, Paris 11",
    title: "Our shop",
    gestures: {
      kicker: "The craft",
      title: "By the knife, *before your eyes*",
      items: ["Slicing", "Tying", "Presenting"],
    },
    lede: "HussCut is a neighbourhood halal butcher and charcuterie at 13 avenue Philippe-Auguste, a few steps from Place de la Nation.",
    portraitCaption: "At the HussCut counter, under the neon sign.",
    chapters: {
      cut: {
        title: "The cut",
        text: "On the block, cuts are trimmed and sliced in front of you. A thickness, a weight, a cut for the oven or the grill: just ask at the counter.",
      },
      counter: {
        title: "The counter",
        text: "In the display, meats sit alongside skewers, sausages and charcuterie. Ribs of beef rest in a dry-ageing cabinet.",
      },
      address: {
        title: "The address",
        text: "A black shopfront on avenue Philippe-Auguste, large windows, and the golden neon on the back wall. The counter is right inside the door.",
      },
    },
    halal: {
      title: "Halal butcher and charcuterie",
      pending:
        "For any question about the halal certification of the meat (certifying body, products covered), please ask in the shop: the team will answer at the counter.",
      certifier: "Certifying body",
      scope: "Scope",
      proof: "View the certificate",
    },
    invite: {
      title: "Come to the counter",
      text: "13 avenue Philippe-Auguste, Paris 11. Nation metro.",
      cta: "Hours and directions",
    },
  },

  contact: {
    kicker: "Find us",
    title: "Find us & contact",
    lede: "A few steps from Nation metro, at 13 avenue Philippe-Auguste. Looking for a specific cut? Call before you come.",
    question: {
      title: "A request?",
      text: "A question, a specific cut, a board or a box: everything is prepared on the Order page, or simply by phone.",
      orderLink: "Prepare a request",
    },
    visit: {
      title: "Come to the counter",
      addressLabel: "Address",
      phoneLabel: "Phone",
      socialLabel: "Instagram",
      deliveryLabel: "Delivery",
      deliveryText: "Order online through the platforms, on their own terms:",
    },
    form: {
      intro: "Fill in this form: your request goes to the shop, which will reply by phone or by email.",
      required: "required",
      optional: "optional",
      name: "Your name",
      replyTo: "Phone or email for the reply",
      topicLegend: "Your request is about",
      topics: {
        question: "A question",
        availability: "Availability or an order",
        platter: "A board or box",
      },
      product: "Product",
      removeProduct: "Remove this product",
      people: "Number of people",
      date: "Preferred date",
      message: "Your message",
      messageHint: "{n} characters left",
      placeholders: {
        question: "Your question for the shop",
        availability: "The cut, quantity or weight you'd like, and when you'd like to come by",
        platter: "The occasion, your preferences, anything to avoid",
      },
      submit: "Send my request",
      sending: "Sending…",
      privacyNotice: "Your contact details are only used to reply to your request.",
      privacyLink: "Privacy policy",
      errorSummary: "Please fix the highlighted fields to continue.",
      errors: {
        nameRequired: "Please enter your name.",
        nameTooLong: "Your name is longer than 80 characters.",
        replyToInvalid: "Please enter a valid phone number or email address.",
        messageTooShort: "Please write your message (at least 10 characters).",
        messageTooLong: "Your message is longer than 1,000 characters.",
        peopleInvalid: "Please enter a number of people between 1 and 50.",
        dateInvalid: "Please choose a date from today onwards.",
        topicInvalid: "Please choose what your request is about.",
      },
      lines: {
        greeting: "New request from {name}.",
        topic: "Subject: {topic}",
        product: "Product: {product}",
        people: "Number of people: {n}",
        date: "Preferred date: {date}",
        sentFrom: "Received through the HussCut website form.",
      },
      preview: {
        title: "Your request is ready",
        text: "Online sending will be switched on very soon: this request has not been passed to the shop yet. To order right now, give the shop a call.",
        edit: "Edit my request",
      },
      result: {
        sent: "Request sent to the shop. HussCut will reply using the contact details you gave.",
        failed: "Sending failed: your request was not delivered. Try again in a moment or call the shop.",
        rateLimited: "Too many requests from this connection. Try again in a few minutes or call the shop.",
      },
    },
    map: {
      title: "Map",
      consent:
        "The map is provided by Google Maps, which may set cookies and receive your IP address. It is shown if you accept it.",
      show: "Show the map",
      hide: "Hide the map",
      frameTitle: "Google Maps: HussCut, 13 avenue Philippe-Auguste, Paris",
      alternative: "Without the map, directions open straight in your navigation app.",
    },
  },

  order: {
    kicker: "Counter pick-up or delivery",
    title: "Order",
    lede: "A specific cut, a quantity for a big table, a box for guests: prepare your request in two minutes, and the shop will confirm availability and when to come by.",
    notice:
      "No order is confirmed until the shop replies. HussCut will tell you about availability, quantity and when to come by. Nothing is paid online.",
    steps: {
      title: "How it works",
      items: [
        { title: "You prepare", text: "The cuts, the quantity or the occasion, and the date you have in mind." },
        { title: "The shop confirms", text: "HussCut replies about availability and when to come by." },
        { title: "You collect at the counter", text: "13 avenue Philippe-Auguste, a few steps from Nation metro." },
      ],
    },
    formTitle: "Prepare my order",
    delivery: {
      kicker: "Delivery",
      title: "Rather have it *delivered*?",
      text: "HussCut is also available on two delivery platforms. Orders are then placed on the platform, on its own terms.",
      cta: "Order on {name}",
    },
    call: {
      title: "Easier by phone?",
      text: "Call the shop during opening hours: the team will take your request in person.",
    },
  },

  footer: {
    awning: "Boucherie Charcuterie",
    tagline: "Halal butcher and charcuterie in Nation, Paris 11.",
    visit: "The shop",
    explore: "This site",
    follow: "Follow and order",
    deliveryLabel: "Delivery",
    deliveryItem: "Delivery: {name}",
    credit: "Created by",
    rights: "HussCut. All rights reserved.",
  },

  legal: {
    pending: "Information being confirmed",
    lastUpdate: "Last updated: {date}",
    publisher: {
      title: "Website publisher",
      company: "Company name",
      form: "Legal form",
      capital: "Share capital",
      headOffice: "Registered office",
      siren: "SIREN",
      shopSiret: "Shop SIRET",
      shopAddress: "Shop address",
      rcs: "Trade register",
      vat: "EU VAT number",
      naf: "NAF code",
      phone: "Phone",
      email: "Email",
      director: "Publication director",
    },
    host: { title: "Hosting", name: "Host", address: "Address", contact: "Contact" },
    design: { title: "Design and development", text: "Website designed and built by QuadCore." },
    ip: {
      title: "Intellectual property",
      text: "The photographs, logo, emblem and HussCut sign belong to their respective owners. Any reproduction without permission is prohibited. The illustrative photos in the Veal and Lamb sections come from the free image libraries Pexels and Unsplash.",
    },
    reviews: {
      title: "Customer reviews",
      text: "The review excerpts shown come from the shop's Google listing. They are reproduced unchanged, with their authors' initials, and link to the listing for the full text. English versions are translations.",
    },
  },

  privacy: {
    intro:
      "This website presents the HussCut shop. It has no customer accounts, no payments and no audience measurement. This page describes the only data that may be processed.",
    controller: {
      title: "Data controller",
      text: "HUSSCUT, SAS, shop at 13 avenue Philippe-Auguste, 75011 Paris, France.",
    },
    sections: [
      {
        id: "email",
        title: "Requests by email",
        text: "The details entered in the Order form (name, phone or email, message and, where relevant, product, number of people and date) are emailed to the shop through an email delivery provider acting on its behalf. They are only used to reply to your request and are never sold or used for advertising.",
      },
      {
        id: "map",
        title: "Google Maps",
        text: "The map is only loaded if you accept it, from the cookie banner or the “Show the map” button. Google then receives your IP address and may set cookies, under its own privacy policy. You can change your mind at any time on the Cookies page.",
      },
      {
        id: "links",
        title: "External links",
        text: "Links to Instagram, Google, Uber Eats and Deliveroo open third-party sites. Their own privacy rules apply as soon as you visit them.",
      },
      {
        id: "logs",
        title: "Technical logs",
        text: "As with any website, the host keeps technical logs (IP address, page requested, date) to keep the service secure and running.",
      },
    ],
    retention: {
      title: "Retention",
      text: "Requests are kept for as long as needed to answer them. The exact period is set by the shop.",
    },
    rights: {
      title: "Your rights",
      text: "You can ask to access, correct or delete your data by writing to the shop or asking at the counter. You can also contact the French data protection authority, the CNIL (cnil.fr).",
    },
  },

  cookies: {
    intro:
      "The HussCut website uses no analytics or advertising cookies. It does not set any cookies itself: only the Google Maps map, if you accept it, may do so.",
    banner: {
      label: "Cookies",
      text: "To show the access map, Google Maps may set cookies. Nothing is loaded without your consent.",
      accept: "Accept",
      refuse: "Decline",
      more: "Learn more",
    },
    storageTitle: "What the site keeps on your device",
    storage: [
      "The animated introduction plays once per visit: this is remembered for your browser session only.",
      "Your choice for Google Maps (accepted or declined) is kept on this device, without a cookie, until you change it here.",
      "The order form sets no cookies.",
    ],
    thirdPartyTitle: "Third-party content",
    thirdParty: "Only the Google Maps map, loaded after your consent, may set Google cookies.",
    preferencesTitle: "Your preferences",
    mapAllowed: "Google Maps: accepted, shown automatically on this device.",
    mapDenied: "Google Maps: declined. It only shows if you click “Show the map”.",
    mapAsk: "Google Maps: no choice saved yet, the site will ask you.",
    accept: "Accept the map",
    revoke: "Decline the map",
    saved: "Saved.",
  },

  errors: errorCopy.en,
};

export default en;
