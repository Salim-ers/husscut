import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LegalLayout, LegalSection } from "./LegalLayout";
import { MapPreferences } from "./MapPreferences";

/** Cookies et préférences : le site n'en dépose pas ; seule la carte, à la demande, peut le faire. */
export function CookiesPage({ dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.cookies;
  return (
    <LegalLayout title={dict.meta.cookies.title} intro={c.intro}>
      <LegalSection title={c.preferencesTitle}>
        <MapPreferences copy={{ mapAllowed: c.mapAllowed, mapAsk: c.mapAsk, revoke: c.revoke, revoked: c.revoked }} />
      </LegalSection>
      <LegalSection title={c.storageTitle}>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          {c.storage.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </LegalSection>
      <LegalSection title={c.thirdPartyTitle}>
        <p>{c.thirdParty}</p>
      </LegalSection>
    </LegalLayout>
  );
}
