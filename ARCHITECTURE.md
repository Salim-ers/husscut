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
│   │   ├── commander/ · order/   page « Commander » (un dossier par langue)
│   │   ├── charcuterie/ · contact/ · cookies/   segments identiques dans les deux langues
│   │   ├── la-maison/ · our-shop/ · mentions-legales/ · legal-notice/ · confidentialite/ · privacy/
│   │   ├── not-found.tsx · error.tsx
│   ├── _lib/define-page.tsx      fabrique de page : métadonnées, fil d'Ariane, transition
│   ├── global-not-found.tsx      404 bilingue hors /fr et /en
│   ├── global-error.tsx · robots.ts · sitemap.ts · icon.png · apple-icon.png · fonts.ts
├── components/
│   ├── layout/                   SiteHeader, MobileMenu (<dialog>), LanguageSwitch, NavLinks, SiteFooter
│   ├── motion/                   NeonIntro (+ script d'amorçage), PageTransition, RouteEffects,
│   │                             SplitWords, KnifeRule
│   ├── layout/ (suite)           ScrollChrome (en-tête au défilement)
│   ├── shared/                   HoursTable, TodayMarker, JsonLd, PageHero
│   └── ui/                       Photo, ExternalLink, RichText, icônes
├── content/                      source unique des données (voir README)
├── features/
│   ├── home/ · house/ · order/ · reviews/ · legal/ · errors/
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
Catalogue ─ ligne produit (lien) → /commander?topic=availability&item=<id>#formulaire
                                                    │
                       validation Zod (navigateur) ─┤
                                                    ├─ mode e-mail (si configuré) : action serveur →
                                                    │  champ piège, délai minimal, limitation de débit,
                                                    │  validation Zod serveur, Resend avec délai (8 s)
                                                    │  et clé d'idempotence → « envoyée » seulement si
                                                    │  le prestataire renvoie un identifiant.
                                                    └─ mode aperçu (envoi non configuré) : rien ne part ;
                                                       le visiteur lit que sa demande n'a pas été
                                                       transmise et peut appeler la boutique.
```

Le formulaire n'existe que sur la page « Commander » ; « Nous trouver » renvoie vers elle. Aucun SMS
n'est préparé côté visiteur : la boutique reçoit la demande par e-mail. Sous le bouton d'envoi, un
lien mène à la politique de confidentialité.

## Cookies et carte

Un bandeau (`CookieBanner`) demande l'accord pour Google Maps, seul contenu tiers pouvant déposer des
cookies : « Accepter » et « Refuser » ont le même poids. Le choix (`granted` / `denied`) est gardé dans
`localStorage` (`src/lib/consent.ts`) et modifiable sur la page Cookies. Accepté : la carte s'affiche
d'emblée dans « Nous trouver ». Refusé ou sans choix : un plan dessiné en CSS, sans aucune requête vers
Google, avec un bouton « Afficher la carte ».

## Couleurs

Un seul fond (ardoise) sur tout le site, sans bande de couleur pleine largeur ni section ivoire.
La couleur vient de lueurs `.glow` qui s'éteignent avant les bords, de cartes `.tone-char` /
`.tone-ember` / `.tone-blood` et de panneaux arrondis `.panel-blood` (appels à commander).
Pas de numérotation « 01 / 02 », pas de traits devant les surtitres, pas de points médians.

## Photos

Chaque photo de `src/content/media.ts` apparaît une seule fois sur tout le site (vérifié par
`content.test.ts`). Les doublons visuels (même prise recadrée) ont été retirés de la photothèque.

## Mouvement

Direction : une boucherie de luxe la nuit — ardoise, néon doré, rouge de la viande — et le jeu du
couteau comme fil conducteur (coupe, lame, fil doré). Tout passe par transform, opacity ou
clip-path ; tout respecte `prefers-reduced-motion` ; rien ne dépend du survol.

| Moment | Réalisation | Mouvement réduit |
|---|---|---|
| Intro « Le néon s'allume » | Script d'amorçage avant rendu ; CSS pur ; ~1,3 s ; interrompue à la première interaction ; une fois par session | Absente |
| Hero d'accueil | Une seule photo, révélée par une lame qui traverse l'écran le long de la coupe, puis qui se pose ; titre ligne à ligne | Photo statique |
| En-tête | Transparent en haut de page, capsule vitrée au défilement, s'efface en descendant (geste du visiteur seulement), revient en remontant (`ScrollChrome`) | Sans transition |
| Titres | Mots qui sortent de sous la ligne (`SplitWords`) : à l'affichage (haut de page) ou à l'entrée dans l'écran | Visibles d'emblée |
| Photos | Aperçu flou visible immédiatement, puis l'image se pose par un léger dézoom (transform) à l'entrée dans l'écran ; aucun cache qui masque l'image | Visibles d'emblée |
| Trait de couteau | Une lame traverse la largeur et laisse un fil doré (`KnifeRule`) | Statique |
| « La carte » | Cartes empilées (sticky, CSS) | Identique (pas d'animation) |
| « Le geste » | Scène épinglée : la lame suit la diagonale de la photo, qui s'ouvre en deux (--p) | État final |
| « La vitrine » | Galerie horizontale épinglée sur ordinateur, glissée (scroll-snap) sur mobile | Défilement horizontal natif |
| « Maturation » | Le cadre reste fixe ; seule la photo zoome à l'intérieur (--p, transform composité) ; scène épinglée raccourcie | État final |
| Entrée de page « La coupe » | Nouvelle page en fondu avec légère montée (420 ms), fil doré qui traverse le haut de l'écran ; opacity et transform seulement, sans capture de la page (les View Transitions, trop lourdes sur téléphone, ont été retirées) | Instantanée |

Les scènes liées au défilement reçoivent leur avancement `--p` (0 → 1) de `RouteEffects` ;
sans script ou en mouvement réduit, `--p` vaut 1 et le CSS affiche l'état final. Les scènes
épinglées portent `overflow-x: clip` (pas de débordement horizontal, l'épinglage reste possible).
Sur écran tactile, ni grain plein écran ni flou d'arrière-plan (`backdrop-filter`) : fonds pleins, défilement plus léger.

## Sécurité

- En-têtes : CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`,
  `Permissions-Policy`, HSTS, COOP ; `noindex` hors production.
- CSP avec `'unsafe-inline'` pour les scripts : nécessaire aux scripts en ligne de Next.js sur des
  pages statiques (pas de nonce par requête). Les autres directives sont strictes ; seule
  `frame-src` autorise Google Maps, chargé après accord du visiteur.
- Aucun secret côté navigateur ; clés uniquement en variables d'environnement serveur.
- Journaux sans données personnelles (codes d'erreur uniquement).
- Limitation de débit en mémoire : limite connue sur une plateforme serverless (une mémoire par
  instance). Suffisant pour une vitrine ; à remplacer par un stockage partagé si le volume augmente.

## Données personnelles

Aucun cookie déposé par le site, aucune mesure d'audience. `sessionStorage` retient que l'intro a
été vue ; `localStorage` retient le choix du visiteur pour la carte (accepté ou refusé), modifiable sur la page Cookies.
La page Cookies permet de retirer cet accord.
