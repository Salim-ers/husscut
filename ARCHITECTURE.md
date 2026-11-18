# Architecture

## Vue d'ensemble

Site vitrine (type A, avec un parcours de contact). Toutes les pages sont générées statiquement
(`generateStaticParams`) pour `fr` et `en`. La seule partie serveur dynamique est l'action
`sendContactRequest`, utilisée uniquement si l'envoi e-mail est configuré.

```text
src/
├── app/
│   ├── [locale]/                 mise en page racine par langue (<html lang>)
│   │   ├── layout.tsx            en-tête, pied de page, intro, effets de navigation, JSON-LD
│   │   ├── page.tsx              accueil
│   │   ├── viandes/ · meats/     segments localisés (un dossier par langue, 404 dans l'autre)
│   │   ├── charcuterie/ · contact/ · cookies/   segments identiques dans les deux langues
│   │   ├── la-maison/ · our-shop/ · mentions-legales/ · legal-notice/ · confidentialite/ · privacy/
│   │   ├── not-found.tsx · error.tsx
│   ├── _lib/define-page.tsx      fabrique de page : métadonnées, fil d'Ariane, transition
│   ├── global-not-found.tsx      404 bilingue hors /fr et /en
│   ├── global-error.tsx · robots.ts · sitemap.ts · icon.png · apple-icon.png · fonts.ts
├── components/
│   ├── layout/                   SiteHeader, MobileMenu (<dialog>), LanguageSwitch, NavLinks, SiteFooter
│   ├── motion/                   NeonIntro (+ script d'amorçage), PageTransition, RouteEffects
│   ├── shared/                   HoursTable, TodayMarker, JsonLd
│   └── ui/                       Photo, ExternalLink, RichText, icônes
├── content/                      source unique des données (voir README)
├── features/
│   ├── home/ · house/ · reviews/ · legal/ · errors/
│   ├── catalogue/                MeatsPage, CharcuteriePage, CatalogueSection, CatalogueFilter
│   └── contact/
│       ├── ContactPage.tsx
│       ├── components/           ContactForm, MapConsent
│       ├── actions/              send-contact-request.ts (action serveur)
│       ├── services/             email-delivery.ts (Resend, sans dépendance)
│       ├── schemas/              contact-schema.ts (Zod, partagé client/serveur)
│       └── lib/                  compose-message, topics, rate-limit, delivery-mode
├── i18n/                         config, routes, ancres, dictionnaires, typographie
├── lib/                          site, metadata, structured-data, hours, consent
└── styles/globals.css            tokens et composants
scripts/                          prepare-media.mjs, launch-gate.ts
tests/e2e/                        Playwright
```

## Choix structurants

- **Routage FR/EN.** `src/i18n/routes.ts` est la seule table des chemins. Les segments différents
  selon la langue ont un dossier par langue ; `definePage({ only })` renvoie une 404 si le dossier
  est appelé dans l'autre langue. Le sélecteur de langue garde la page, les paramètres neutres
  (`?topic`, `?item`) et traduit l'ancre (`#boeuf` ↔ `#beef`).
- **Contenu centralisé.** Aucun texte n'est écrit en dur dans les composants. Les dictionnaires
  ont la même forme (typage) et une micro-typographie appliquée au chargement (espaces insécables,
  apostrophes).
- **Pas de base de données** : le catalogue est éditorial et sans prix ; une modification passe
  par `src/content/catalogue.ts` et un redéploiement. Un espace d'administration serait
  disproportionné tant que l'offre change peu.
- **Une valeur non confirmée vaut `null`.** Elle s'affiche « en cours de confirmation » et le
  contrôle de publication refuse la production.

## Formulaire de contact

```text
Catalogue ─ « Demander la disponibilité » → /contact?topic=availability&item=<id>#formulaire
                                                    │
                       validation Zod (navigateur) ─┤
                                                    ├─ mode SMS (défaut) : texte composé localement,
                                                    │  lien sms: explicite, copie, appel. Rien ne transite
                                                    │  par le site ; jamais « message envoyé ».
                                                    └─ mode e-mail (si configuré) : action serveur →
                                                       champ piège, délai minimal, limitation de débit,
                                                       validation Zod serveur, Resend avec délai (8 s)
                                                       et clé d'idempotence → « envoyée » seulement si
                                                       le prestataire renvoie un identifiant.
```

## Mouvement

| Moment | Réalisation | Mouvement réduit |
|---|---|---|
| Intro « Le néon s'allume » | Script d'amorçage avant rendu ; CSS pur ; ~1,3 s ; interrompue à la première interaction ; une fois par session | Absente |
| Hero « Du néon au billot » | Recadrage 1,07 → 1, accroche en deux temps, dérive au défilement (CSS scroll-driven, ordinateur) | Statique |
| Transition « La coupe » | `<ViewTransition>` de React 19.3 + View Transitions du navigateur ; révélation diagonale 320 ms ; clics traversants | Fondu 160 ms |
| Photos | Apparition à la première entrée dans l'écran (IntersectionObserver) | Visibles d'emblée |

Sans prise en charge des View Transitions, la navigation est simplement instantanée.

## Sécurité

- En-têtes : CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`,
  `Permissions-Policy`, HSTS, COOP ; `noindex` hors production.
- CSP avec `'unsafe-inline'` pour les scripts : nécessaire aux scripts en ligne de Next.js sur des
  pages statiques (pas de nonce par requête). Les autres directives sont strictes ; seule
  `frame-src` autorise Google Maps, chargé après clic.
- Aucun secret côté navigateur ; clés uniquement en variables d'environnement serveur.
- Journaux sans données personnelles (codes d'erreur uniquement).
- Limitation de débit en mémoire : limite connue sur une plateforme serverless (une mémoire par
  instance). Suffisant pour une vitrine ; à remplacer par un stockage partagé si le volume augmente.

## Données personnelles

Aucun cookie déposé par le site, aucune mesure d'audience. `sessionStorage` retient que l'intro a
été vue ; `localStorage` retient l'accord pour la carte uniquement si le visiteur coche « Se souvenir ».
La page Cookies permet de retirer cet accord.
