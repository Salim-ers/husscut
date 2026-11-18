# CLAUDE.md — règles du projet HussCut

Site vitrine statique Next.js 16 / React 19.3 / TypeScript strict / Tailwind 4, FR et EN.
Lire `ARCHITECTURE.md` avant toute modification structurelle.

## Commandes

- `npm run dev` · `npm run typecheck` · `npm run lint` · `npm test` · `npm run build` · `npm run test:e2e`
- Toujours finir par `npm run check` ; lancer `npm run test:e2e` pour toute modification d'interface.

## Règles de contenu (non négociables)

- Aucun prix, poids promis, stock, délai, panier ou paiement. Les tests le vérifient.
- Une information non confirmée par HussCut reste `null` dans `src/content/business.ts`. Ne jamais
  inventer : avis, note globale, certification, organisme halal, biographie, provenance, adresse.
- Avis : initiales uniquement, extraits fidèles, pas de note agrégée (ni à l'écran, ni en JSON-LD).
- Espèce explicite pour les noms ambigus (bacon, jambon, chorizo, saucisson…) ou produit écarté.
- Photo associée à un produit uniquement si l'identification est certaine ; jamais de photo
  montrant un prix lisible ; jamais d'image générée, ni de capture de plateforme de livraison.
- Logos : uniquement les fichiers fournis (`src/assets/brand`). Pas de police cursive à la place
  du lettrage.
- Formulaire : ne jamais afficher « envoyé » sans confirmation du prestataire.
- Ne pas publier sur le domaine de la boutique sans consigne explicite.

## Conventions de code

- Textes : uniquement dans `src/i18n/dictionaries/{fr,en}.ts` (même forme, vérifiée par le typage
  et un test). Marqueurs : `^e` pour l'exposant, `{n}` pour l'interpolation.
- Liens internes : `pathFor(locale, key)` ; jamais de chemin écrit en dur.
- Nouvelle page : un dossier par segment localisé + `definePage({ route, only, render })`, puis
  ajouter la route dans `src/i18n/routes.ts` et ses métadonnées dans les dictionnaires.
- Composants client seulement si nécessaire (état, navigateur). Pas de `any`, pas de règle
  ESLint désactivée sans justification écrite à côté.
- Rayons : boutons 16 px, secondaires 14 px, champs 12–14 px, cartes photo 20 px, grandes
  compositions 24 px, filtres en capsule. Cibles tactiles ≥ 44 px.
- Couleurs : tokens de `globals.css` uniquement. Rouge viande (`red` pour le texte sur sombre,
  `crimson`, `blood`, `oxblood` pour les fonds et bandeaux) : couleur d'ambiance, jamais pour une action.
  Or (#EABD75) pour les actions sur fond sombre,
  bronze (#7A531C) pour les liens sur ivoire.
- Mouvement : transform, opacity ou clip-path ; respecter `prefers-reduced-motion` ; rien ne dépend
  du survol. Briques réutilisables : `SplitWords`, `Marquee`, `KnifeRule`, `PageHero`, `data-reveal`
  (`up`, `photo`, `words`, `knife`) et `data-progress` (voir ARCHITECTURE.md).
- Polices : Cinzel (titres), Cormorant Garamond (accents « *mot* » des dictionnaires), Instrument Sans.
  Le lettrage manuscrit « HussCut » reste exclusivement le logo fourni.

## Sécurité

- Secrets uniquement en variables d'environnement serveur ; `.env.example` sans valeur.
- Toute entrée serveur passe par `validateContact` (Zod). Journaux sans données personnelles.
- Toute ressource tierce nouvelle doit être ajoutée à la CSP (`next.config.ts`) et, si elle
  dépose des traceurs, chargée après consentement.
