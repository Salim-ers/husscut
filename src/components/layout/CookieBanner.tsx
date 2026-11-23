"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { readMapConsent, serverMapConsent, setMapConsent, subscribeMapConsent } from "@/lib/consent";

interface CookieBannerProps {
  copy: { label: string; text: string; accept: string; refuse: string; more: string };
  cookiesHref: string;
}

/**
 * Bandeau de consentement : affiché tant que le visiteur n'a pas choisi pour Google Maps.
 * « Accepter » et « Refuser » ont le même poids visuel ; rien de tiers n'est chargé avant
 * l'accord. Non bloquant : le site reste utilisable sans répondre.
 */
export function CookieBanner({ copy, cookiesHref }: CookieBannerProps) {
  const consent = useSyncExternalStore(subscribeMapConsent, readMapConsent, serverMapConsent);
  if (consent !== null) return null;

  return (
    <section aria-label={copy.label} className="cookie-banner" data-cookie-banner>
      <p className="text-[0.9375rem] leading-snug text-ivory/90">
        {copy.text}{" "}
        <Link href={cookiesHref} className="link-inline whitespace-nowrap">
          {copy.more}
        </Link>
      </p>
      <div className="grid flex-none grid-cols-2 gap-2">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMapConsent("denied")}>
          {copy.refuse}
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMapConsent("granted")}>
          {copy.accept}
        </button>
      </div>
    </section>
  );
}
