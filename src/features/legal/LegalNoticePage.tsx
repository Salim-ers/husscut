import { ExternalLink } from "@/components/ui/ExternalLink";
import { business } from "@/content/business";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { FactList, LegalLayout, LegalSection } from "./LegalLayout";

/**
 * Mentions légales. Les données d'immatriculation proviennent de l'annuaire des entreprises ;
 * le siège, le capital, le RCS, la TVA, le responsable de publication, l'e-mail et l'hébergeur
 * restent à confirmer par HussCut (le contrôle de publication bloque la mise en production).
 */
export function LegalNoticePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const l = dict.legal;
  const p = l.publisher;
  const legal = business.legal;
  const host = legal.host;

  return (
    <LegalLayout title={dict.meta.legal.title}>
      <LegalSection title={p.title}>
        <FactList
          pending={l.pending}
          items={[
            { term: p.company, value: legal.companyName },
            { term: p.form, value: locale === "fr" ? legal.legalForm : "SAS (simplified joint-stock company)" },
            { term: p.capital, value: legal.shareCapital },
            { term: p.headOffice, value: legal.headOfficeAddress },
            { term: p.siren, value: legal.siren },
            { term: p.rcs, value: legal.rcs },
            { term: p.vat, value: legal.vatNumber },
            { term: p.shopAddress, value: `${business.address.street}, ${business.address.postalCode} ${business.address.city}` },
            { term: p.shopSiret, value: legal.shopSiret },
            { term: p.naf, value: legal.nafCode },
            { term: p.phone, value: <a href={`tel:${business.phone.e164}`} className="link-inline">{business.phone.display}</a> },
            { term: p.email, value: legal.publisherEmail ? <a href={`mailto:${legal.publisherEmail}`} className="link-inline">{legal.publisherEmail}</a> : null },
            { term: p.director, value: legal.publicationDirector },
          ]}
        />
      </LegalSection>

      <LegalSection title={l.host.title}>
        <FactList
          pending={l.pending}
          items={[
            { term: l.host.name, value: host?.name ?? null },
            { term: l.host.address, value: host?.address ?? null },
            { term: l.host.contact, value: host?.contact ?? null },
          ]}
        />
      </LegalSection>

      <LegalSection title={l.design.title}>
        <p>
          {l.design.text}{" "}
          <ExternalLink href={business.credits.url} newTabLabel={dict.a11y.newTab} className="link-inline">
            quad-core.fr
          </ExternalLink>
        </p>
      </LegalSection>

      <LegalSection title={l.ip.title}>
        <p>{l.ip.text}</p>
      </LegalSection>

      <LegalSection title={l.reviews.title}>
        <p>{l.reviews.text}</p>
      </LegalSection>
    </LegalLayout>
  );
}
