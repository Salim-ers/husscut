# HussCut — site vitrine FR/EN

Site de **HussCut**, boucherie-charcuterie halal au 13 avenue Philippe-Auguste, Paris 11ᵉ (métro Nation).
Conception et développement : **QuadCore**.

Six pages publiques dans deux langues (accueil, viandes, charcuterie, la maison, commander, nous trouver & contact),
plus les mentions légales, la confidentialité et les cookies. Aucun prix, panier, paiement ni compte client :
une demande de commande est une prise de contact que la boutique confirme.

## Stack

| Élément | Choix | Pourquoi |
|---|---|---|
| Framework | Next.js 16 (App Router), React 19.3 | Pages statiques rapides, transitions natives (`<ViewTransition>`), déploiement Vercel simple |
| Langage | TypeScript strict (`noUncheckedIndexedAccess`) | Contenu typé, dictionnaires FR/EN forcés à la même forme |
| Styles | Tailwind CSS 4 + tokens CSS (`src/styles/globals.css`) | Design system centralisé, pas de bibliothèque d'interface |
| Validation | Zod 4 | Un seul schéma pour le navigateur et le serveur |
| Polices | Cinzel (capitales romaines de l'enseigne), Cormorant Garamond (serif du tee-shirt « HussCut From Paris »), Instrument Sans — auto-hébergées, OFL | Cohérence avec la marque, aucune requête vers Google Fonts |
| Tests | Vitest (unitaires), Playwright + axe-core (bout en bout, accessibilité) | |

Pas de base de données, d'authentification ni d'espace d'administration : le contenu est centralisé
dans `src/content/` et le site est entièrement statique, à l'exception de l'action serveur d'envoi
d'e-mail (inactive tant qu'elle n'est pas configurée).

## Prérequis

- Node.js ≥ 22.18 (le script de contrôle de publication s'exécute en TypeScript natif)
- npm 10+

## Installation et démarrage

```bash
npm ci
cp .env.example .env.local   # puis compléter si besoin
npm run dev                  # http://localhost:3000 → redirige vers /fr
```

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run typecheck` | Génère les types de routes puis `tsc --noEmit` |
| `npm run lint` | ESLint (config Next.js + TypeScript) |
| `npm test` | Tests unitaires (Vitest) |
| `npm run build` | Contrôle de publication puis build de production |
| `npm start` | Sert le build |
| `npm run test:e2e` | Recette Playwright sur 320, 390, 768 et 1440 px (nécessite un build et `npm start`, ou laisse Playwright le lancer) |
| `npm run media -- <dossier>` | Régénère les médias depuis le dossier de photos fourni (voir ci-dessous) |
| `node scripts/prepare-extra-media.mjs` | Régénère les photos supplémentaires (fichiers numérotés et images Instagram déposés à la racine) |
| `npm run check` | typecheck + lint + tests + build |

Pour Playwright avec un Chrome déjà installé : `CHROME_PATH=/usr/bin/google-chrome npm run test:e2e`.
Sinon : `npx playwright install chromium` une fois.

## Configuration

Voir `.env.example`.

- `NEXT_PUBLIC_SITE_URL` : URL publique (canonical, hreflang, Open Graph, sitemap).
- `SITE_ENV=production` : rend le site indexable **et** active le contrôle de publication, qui refuse
  le build tant que des informations obligatoires manquent (voir `CONTENU-A-CONFIRMER.md`).
  Toute autre valeur : `noindex` (balise, en-tête `X-Robots-Tag`, robots.txt fermé).
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` : facultatifs. Tant qu'ils ne sont pas
  tous renseignés, le formulaire fonctionne en mode **« Préparer mon SMS »**.

## Médias

Les photos fournies par HussCut (archive `New.zip`) sont converties par `scripts/prepare-media.mjs` :
WebP pleine définition dans `src/assets/photos`, logos transparents dans `src/assets/brand`,
icônes dans `src/app`, image Open Graph dans `public/`. `next/image` sert ensuite des variantes
AVIF/WebP aux largeurs utiles.

Photos écartées car elles montrent des prix lisibles : listées en tête du script. Deux photos sont
recadrées à la source pour la même raison.

## Contenu

| Fichier | Contenu |
|---|---|
| `src/content/business.ts` | Coordonnées, horaires, liens, données légales, drapeaux de confirmation |
| `src/content/catalogue.ts` | Rayons et produits (noms seulement) |
| `src/content/reviews.ts` | Extraits d'avis Google (initiales) |
| `src/content/media.ts` | Photos et textes alternatifs FR/EN |
| `src/i18n/dictionaries/{fr,en}.ts` | Tous les textes de l'interface |

## Documentation

- `ARCHITECTURE.md` — découpage, flux, sécurité, mouvement, choix structurants
- `DEPLOYMENT.md` — environnements, variables, publication, retour arrière
- `CONTENU-A-CONFIRMER.md` — informations à obtenir de HussCut avant publication
- `RECETTE.md` — contrôles réellement exécutés et résultats
- `CLAUDE.md` — règles du projet pour les évolutions futures
