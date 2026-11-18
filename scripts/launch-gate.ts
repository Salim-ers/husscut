/**
 * Contrôle de publication — exécuté avant chaque `npm run build`.
 *
 * - SITE_ENV ≠ production : liste les informations encore à confirmer, sans bloquer
 *   (préproduction non indexée).
 * - SITE_ENV = production : refuse le build tant qu'un point bloquant reste ouvert.
 *
 * Lancement : node scripts/launch-gate.ts (Node ≥ 22.18, suppression native des types).
 */
import { business } from "../src/content/business.ts";

export interface LaunchCheck {
  id: string;
  label: string;
  blocking: boolean;
  ok: boolean;
}

export function launchChecks(data: typeof business = business): LaunchCheck[] {
  const legal = data.legal;
  return [
    { id: "hours", label: "Horaires de la boutique confirmés (19 h 45 ou 19 h 50 ?)", blocking: true, ok: data.hours.confirmed },
    { id: "head-office", label: "Adresse du siège social (mentions légales)", blocking: true, ok: legal.headOfficeAddress !== null },
    { id: "share-capital", label: "Capital social (mentions légales)", blocking: true, ok: legal.shareCapital !== null },
    { id: "rcs", label: "Immatriculation RCS (ville du greffe)", blocking: true, ok: legal.rcs !== null },
    { id: "publication-director", label: "Responsable de la publication", blocking: true, ok: legal.publicationDirector !== null },
    { id: "publisher-email", label: "E-mail de contact de l'éditeur", blocking: true, ok: legal.publisherEmail !== null },
    { id: "host", label: "Hébergeur (nom, adresse, contact)", blocking: true, ok: legal.host !== null },
    { id: "vat", label: "Numéro de TVA intracommunautaire (si assujettie)", blocking: false, ok: legal.vatNumber !== null },
    { id: "google-listing", label: "URL exacte de la fiche Google vérifiée", blocking: true, ok: data.googleListing.verified },
    {
      id: "reviews-reuse",
      label: "Autorisation de réutiliser les extraits d'avis Google (sinon business.reviews.showExcerpts = false)",
      blocking: true,
      ok: data.reviews.reuseAuthorized || !data.reviews.showExcerpts,
    },
    { id: "portrait-rights", label: "Droits de diffusion du portrait (page « La maison »)", blocking: true, ok: data.media.portraitRightsConfirmed },
    { id: "halal-certification", label: "Certification halal : organisme, périmètre, justificatif", blocking: false, ok: data.halalCertification !== null },
  ];
}

function run() {
  const production = process.env.SITE_ENV === "production";
  const checks = launchChecks();
  const open = checks.filter((check) => !check.ok);
  const blocking = open.filter((check) => check.blocking);

  console.log(`\nContrôle de publication HussCut — environnement : ${production ? "production" : "préproduction (non indexée)"}`);
  if (open.length === 0) {
    console.log("  Toutes les informations sont confirmées.\n");
    return;
  }
  for (const check of open) console.log(`  ${check.blocking ? "[bloquant]" : "[à prévoir]"} ${check.label}`);
  console.log("");

  if (production && blocking.length > 0) {
    console.error(`Publication refusée : ${blocking.length} point(s) bloquant(s). Complétez src/content/business.ts.\n`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) run();
