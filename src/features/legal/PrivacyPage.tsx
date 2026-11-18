import { business } from "@/content/business";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { getContactDeliveryMode } from "@/features/contact/lib/delivery-mode";
import { LegalLayout, LegalSection } from "./LegalLayout";

/** Politique de confidentialité : uniquement les traitements réellement présents sur le site. */
export function PrivacyPage({ dict }: { locale: Locale; dict: Dictionary }) {
  const p = dict.privacy;
  const email = business.legal.publisherEmail;
  const emailDelivery = getContactDeliveryMode() === "email";
  const sections = p.sections.filter((section) => section.id !== "email" || emailDelivery);
  return (
    <LegalLayout title={dict.meta.privacy.title} intro={p.intro}>
      <LegalSection title={p.controller.title}>
        <p>{p.controller.text}</p>
        <p>
          <a href={`tel:${business.phone.e164}`} className="link-inline">
            {business.phone.display}
          </a>
          {email ? (
            <>
              {" "}
              <a href={`mailto:${email}`} className="link-inline">
                {email}
              </a>
            </>
          ) : null}
        </p>
      </LegalSection>
      {sections.map((section) => (
        <LegalSection key={section.id} title={section.title}>
          <p>{section.text}</p>
        </LegalSection>
      ))}
      <LegalSection title={p.retention.title}>
        <p>{p.retention.text}</p>
      </LegalSection>
      <LegalSection title={p.rights.title}>
        <p>{p.rights.text}</p>
      </LegalSection>
    </LegalLayout>
  );
}
