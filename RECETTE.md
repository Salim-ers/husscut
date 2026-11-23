# Recette — résultats réellement obtenus

Date : 18 novembre 2026. Environnement : Node 22.23, Next.js 16.4.6, Chrome (Playwright 1.65),
build de production servi localement (`next start`), `SITE_ENV=preview` sauf mention contraire.

Ces résultats ne constituent pas un audit indépendant : ils ont été produits par la même équipe
(et le même outil) que le développement. Une relecture par un tiers reste recommandée.

## Contrôles exécutés

| Contrôle | Commande | Résultat |
|---|---|---|
| Typage strict | `npm run typecheck` | 0 erreur |
| Lint | `npm run lint` | 0 erreur, 0 avertissement |
| Tests unitaires | `npm test` | 40/40 réussis (5 fichiers) |
| Build de production | `npm run build` | réussi, 30 pages statiques |
| Recette bout en bout | `npm run test:e2e` | 169 réussis, 0 échec, 39 ignorés par conception (tests propres à une largeur) |
| Accessibilité (axe-core, WCAG 2.0/2.1/2.2 A et AA) | inclus dans la recette | 0 violation sur les 16 pages, à 390 et 1440 px |
| Responsive | balayage 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560, 3840 px × 6 pages | aucun débordement horizontal ni texte coupé |
| Dépendances de production | `npm audit --omit=dev` | 0 vulnérabilité |
| Lighthouse (mobile simulé, préproduction) | accueil, viandes, contact | Accessibilité 100, Bonnes pratiques 100, Performance 90–92, SEO 69 (uniquement à cause du `noindex` voulu) |
| Lighthouse (build de contrôle `SITE_ENV=production`) | accueil | SEO 100, Accessibilité 100, Bonnes pratiques 100 |

## Ce que couvre la recette bout en bout (320, 390, 768, 1440 px)

- Les 16 pages publiques : statut 200, un seul `h1`, crédit « Créé par / Created by QuadCore »
  visible et lié à https://www.quad-core.fr/, lien d'appel présent, aucun débordement, aucun « € »,
  aucun nom complet d'auteur d'avis, aucune mention « démo ».
- Menu principal vers chaque page (menu mobile en `<dialog>` sur petit écran), `aria-current`,
  retour arrière et avant du navigateur, arrivée directe sur une page intérieure, lien de contenu,
  focus replacé sur le contenu après navigation.
- Sélecteur de langue : page équivalente, ancre traduite (`#agneau` → `#lamb`), paramètres conservés,
  `lang` mis à jour.
- 404 : localisée pour une page servie dans la mauvaise langue, bilingue pour une adresse inconnue.
- Intro : jouée à la première visite, terminée seule, interrompue à la première touche,
  non rejouée à la navigation ni au rechargement, absente en mouvement réduit.
- Transitions : clics rapides successifs aboutissent sur la dernière page ; chaque photo amenée à
  l'écran se révèle.
- Catalogue : filtre par rayon, URL partageable, lien direct filtré, « Demander la disponibilité »
  préremplit le formulaire (sujet + produit), retrait du produit, coffrets avec personnes et date.
- Formulaire (page Commander uniquement) : erreurs explicites et focus sur le premier champ fautif ;
  sans envoi configuré, la demande n'est jamais présentée comme envoyée (aperçu explicite, appel
  proposé) ; aucun lien `sms:` ; lien vers la politique de confidentialité ; version anglaise.
- Cookies et carte : bandeau à la première visite (Accepter / Refuser de même poids) ; refus gardé,
  aucune requête vers Google ; accord : carte affichée d'emblée dans « Nous trouver » ; choix
  modifiable sur la page Cookies ; itinéraire disponible sans la carte.
- Clavier : lien d'évitement ; menu mobile ouvert au clavier, Échap, focus restitué.
- Cibles tactiles ≥ 44 px pour les actions principales (accueil, viandes, contact).

## Tests unitaires (40)

Catalogue (pas de doublon, pas de prix ni de poids, espèce explicite pour les noms ambigus),
avis (initiales seulement), données de la boutique, dictionnaires FR/EN de même forme et sans
« demande envoyée » dans l'aperçu, routes et ancres, typographie, horaires (fuseau de Paris, changement
d'heure), données structurées (pas de note agrégée ni d'horaires non confirmés), validation du
formulaire, composition de l'e-mail, envoi e-mail simulé (succès uniquement avec identifiant ; refus,
réponse invalide, coupure réseau et délai dépassé traités comme échecs ; journaux sans données
personnelles ; en-têtes neutralisés), limitation de débit, contrôle de publication.

## Performance mesurée (laboratoire)

LCP observé avec Chrome, CPU ralenti ×4, réseau 1,6 Mb/s + 150 ms (mobile 412 px, DPR 2,6),
serveur local sans CDN, trois passages :

| Page | LCP | CLS |
|---|---|---|
| Accueil, sans intro | 2,28 – 2,32 s | 0 |
| Accueil, première visite avec intro | 2,29 – 2,36 s (un passage isolé à 3,6 s) | 0 |
| Les viandes | 2,61 – 2,84 s | 0 |
| Contact | 0,70 – 0,72 s | 0 |

Les objectifs (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 au 75ᵉ percentile) se vérifient sur le terrain :
à suivre après mise en ligne (Speed Insights ou Search Console). La page « Les viandes » est la plus
proche de la limite en 4G lente ; piste si les mesures réelles le confirment : réduire la taille de
la photo d'ouverture sur mobile.

## Vérifications manuelles

- Photos : chaque photo utilisée a été contrôlée pour les étiquettes de prix ; 5 photos écartées et
  2 recadrées à la source.
- Transition « La coupe » et intro : capturées image par image (animations ralenties) dans Chrome.

## Non vérifié ici (à faire)

- Appareils réels (iPhone, Android, iPad), Safari et Firefox : non disponibles dans cet
  environnement. L'entrée de page n'utilise que opacity et transform ; en
  mouvement réduit, la navigation est instantanée.
- Envoi e-mail réel : non configuré, testé uniquement avec un prestataire simulé.
- Téléviseurs et bornes : couverts par le balayage 2560/3840 px seulement (pas de navigation télécommande prévue).
- Mesures de terrain des Core Web Vitals.

## Synthèse des critères d'acceptation

| Domaine | Statut | Preuve ou observation |
|---|---|---|
| Architecture | Validé | Modules par fonctionnalité, contenu centralisé, typage strict |
| Frontend | Validé | Recette sur 4 largeurs, balayage de 11 largeurs, axe sans violation |
| Backend | Partiellement validé | Formulaire en mode aperçu ; envoi e-mail testé en simulation, non configuré |
| Database | Non applicable | Aucune donnée persistée |
| Sécurité | Partiellement validé | En-têtes, validation serveur, secrets hors client ; CSP avec `'unsafe-inline'` (limite connue) ; limitation de débit par instance |
| UX/UI | Validé | Direction artistique propre à HussCut, revue sur captures |
| Motion | Validé | Intro non bloquante, transitions natives, mouvement réduit testé |
| SEO | Partiellement validé | Fondations testées (SEO 100 en configuration de production) ; domaine et fiche Google à confirmer |
| Performance | Partiellement validé | Mesures de laboratoire ci-dessus ; terrain à suivre |
| Tests | Validé | Résultats réellement obtenus, listés ci-dessus |
| Documentation | Validé | README, ARCHITECTURE, DEPLOYMENT, CONTENU-A-CONFIRMER, CLAUDE.md |
| Déploiement | À finaliser | Procédure prête ; publication bloquée par 10 informations à confirmer |

**Le site n'est pas « Production Ready »** : le contrôle de publication bloque tant que les
informations listées dans `CONTENU-A-CONFIRMER.md` ne sont pas confirmées par HussCut.
