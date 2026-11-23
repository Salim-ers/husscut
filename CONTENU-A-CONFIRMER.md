# Informations à confirmer par HussCut

Tant qu'un point **bloquant** reste ouvert, `SITE_ENV=production npm run build` échoue.
Toutes les valeurs se renseignent dans `src/content/business.ts`.

## Bloquant pour la publication

| Point | Situation actuelle | Où |
|---|---|---|
| Horaires de la boutique | Base indicative : lun.–jeu. et sam. 9 h–19 h 45, ven. 9 h–13 h et 14 h 30–19 h 45, dim. fermé. La fiche Google indique 19 h 45, Mappy 19 h 50. Affichés « à titre indicatif » et absents des données structurées. | `hours` |
| Siège social | L'annuaire indique que la boutique est un établissement secondaire : le siège est ailleurs. | `legal.headOfficeAddress` |
| Capital social | Inconnu | `legal.shareCapital` |
| Immatriculation RCS | Ville du greffe inconnue (dépend du siège) | `legal.rcs` |
| Responsable de la publication | Inconnu | `legal.publicationDirector` |
| E-mail de l'éditeur | Aucun e-mail fourni | `legal.publisherEmail` |
| Hébergeur | Vercel prévu mais non confirmé (nom, adresse, contact) | `legal.host` |
| Fiche Google | Le lien actuel est une recherche Google Maps qui ouvre la fiche. Remplacer par le lien « Partager » de la fiche. | `googleListing` |
| Avis Google | Deux extraits affichés (initiales M. B.-A. et H. H., 5/5). Autorisation de réutilisation à confirmer ; sinon `reviews.showExcerpts = false` et seul le lien reste. **Pour en afficher davantage** : fournir des captures des avis Google (texte lisible) ; ils s'ajoutent dans `src/content/reviews.ts` (initiales, extrait fidèle, traduction), le bloc s'adapte au nombre. Aucun autre extrait d’avis public n’a été trouvé hors de la fiche Google (recherche du 18/11/2026). | `reviews` |
| Portrait (page « La maison ») | Droits de diffusion à confirmer. Le portrait n'est pas nommé. | `media.portraitRightsConfirmed` |

## À prévoir (non bloquant)

| Point | Situation |
|---|---|
| Certification halal | Le bloc oriente vers la boutique. Pour l'afficher : organisme, périmètre, justificatif (`halalCertification`). Aucun sceau ni organisme n'a été supposé. |
| TVA intracommunautaire | À renseigner si la société y est assujettie. |
| Envoi du formulaire par e-mail | Fournir une adresse de réception et un domaine d'envoi pour activer l'envoi (Resend). En attendant : mode aperçu, la demande n'est pas transmise et le visiteur en est informé. |
| Histoire du gérant | Aucune source publique fiable trouvée : la page raconte le lieu, le comptoir et l'offre. Une biographie peut être ajoutée si HussCut la fournit. |
| Date d'ouverture | L'établissement est enregistré depuis le 18/11/2021 ; la date d'ouverture au public n'est pas affichée faute de confirmation. |
| Produits écartés | Espèce non vérifiée : « Smoky bacon », « Prosciutto by HussCut », « Chorizo fumé », « Chorizo à griller », « Saucisse à l'ail fumée », « Bâton de berger », « Hot-dog », « Fermier ail et fines herbes », « Rôti de veau bacon fromage ». À ajouter avec l'espèce exacte. |
| Assemblage du logo | L'en-tête associe l'emblème et le lettrage néon fournis, côte à côte, sans redessin. À valider. |
| Langue des e-mails | La demande reçue par la boutique est rédigée dans la langue du visiteur. |
| Photos d'illustration | Rayons Veau et Agneau : photos libres de droit (Pexels 7741801, Unsplash V65tvNj3GXI), signalées comme illustrations. À remplacer par des photos de la boutique dès qu'elles existent. |
| Prix sur photo | Les étiquettes de prix de la photo « côtes sous le néon » ont été floutées. |
| Photos supplémentaires | 27 photos ajoutées le 18/11/2026 (fichiers numérotés et images du compte Instagram fournis). Écartées : prix lisibles, légendes de vidéo incrustées, portrait non validé, espèce non identifiable (liste dans `scripts/prepare-extra-media.mjs`). Aucune n'est associée à un produit précis. |
| Mention halal | Réduite à une petite étiquette dans le hero (retour du 18/11/2026) et présente dans les textes ; pas de sceau ni d'organisme. |

## Faits vérifiés utilisés

- HussCut, 13 avenue Philippe-Auguste, 75011 Paris ; téléphone 06 65 63 76 11 (carte de visite, ticket, fiche Google).
- Instagram @husscut ; bio « L'excellence de la viande halal. », « Métro Nation ».
- HUSSCUT, SAS, SIREN 903 983 146 ; SIRET de la boutique 903 983 146 00023 ; NAF 47.22Z ;
  société créée le 08/10/2021, établissement le 18/11/2021 (annuaire des entreprises, capture fournie).
- Pastrami de bœuf : étiquette de vitrine « Pastrami — Bœuf » sur une photo fournie.
- Armoire de maturation : étiquettes « Maturée » sur les photos fournies.
