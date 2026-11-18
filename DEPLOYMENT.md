# Déploiement

## Environnements

| Environnement | `SITE_ENV` | Indexation | Contrôle de publication |
|---|---|---|---|
| Local | non défini | non | informatif |
| Préproduction / aperçus Vercel | `preview` | non (`noindex`, robots fermé) | informatif |
| Production | `production` | oui | **bloquant** |

## Vercel (recommandé)

1. Importer le dépôt dans Vercel (framework détecté : Next.js). Node 22.
2. Variables du projet :
   - Production : `NEXT_PUBLIC_SITE_URL=https://<domaine>`, `SITE_ENV=production`.
   - Preview : `NEXT_PUBLIC_SITE_URL=https://<url-de-preview>`, `SITE_ENV=preview`.
   - Facultatif, envoi e-mail : `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
     (domaine d'envoi vérifié chez Resend). Un changement de ces variables demande un redéploiement :
     le mode du formulaire est fixé au build.
3. Ne pas brancher le domaine de la boutique sans consigne explicite de HussCut.

## Avant la mise en production

1. Compléter `src/content/business.ts` d'après `CONTENU-A-CONFIRMER.md` et passer les drapeaux
   (`hours.confirmed`, `googleListing.verified`, `reviews.reuseAuthorized`,
   `media.portraitRightsConfirmed`) à `true` une fois confirmés.
2. `SITE_ENV=production npm run build` doit passer le contrôle sans point bloquant.
3. Recette : `npm run check` puis `npm run test:e2e`.
4. Après déploiement : vérifier `/robots.txt`, `/sitemap.xml`, l'absence d'en-tête `X-Robots-Tag`,
   les liens d'appel et d'itinéraire sur téléphone, la carte après clic, le crédit QuadCore.
5. Suivre les Core Web Vitals réels (Vercel Speed Insights ou Search Console) : les valeurs de
   `RECETTE.md` sont des mesures de laboratoire.

## Retour arrière

Le site n'a pas de données persistées : un retour arrière consiste à re-promouvoir le déploiement
Vercel précédent (« Promote to Production »). Aucune migration ni sauvegarde n'est nécessaire.

## Maintenance courante

- Ajouter ou retirer un produit : `src/content/catalogue.ts` (sans prix ni poids ; espèce explicite
  pour bacon, jambon, chorizo, saucisson…). Les tests vérifient ces règles.
- Changer les horaires : `src/content/business.ts` → `hours.weekly`. Une fois confirmés, ils sont
  aussi publiés dans les données structurées.
- Nouvelle photo : l'ajouter à `PHOTOS` dans `scripts/prepare-media.mjs`, relancer
  `npm run media -- <dossier>`, puis la déclarer dans `src/content/media.ts` avec ses textes
  alternatifs FR/EN. Vérifier qu'aucun prix n'est lisible.
- Dépendances : `npm audit --omit=dev` (0 vulnérabilité à la livraison ; les alertes restantes
  concernent l'outillage de test uniquement).
