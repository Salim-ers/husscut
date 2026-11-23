"use client";

import { useSyncExternalStore } from "react";
import { PinIcon } from "@/components/ui/icons";
import { readMapConsent, serverMapConsent, setMapConsent, subscribeMapConsent } from "@/lib/consent";

interface MapConsentProps {
  embedUrl: string;
  address: string;
  copy: { consent: string; show: string; hide: string; frameTitle: string };
}

/**
 * Carte Google Maps : affichée d'emblée si le visiteur a accepté (bandeau cookies ou bouton),
 * sinon un plan dessiné en CSS (aucune requête vers Google) avec un bouton pour l'afficher.
 */
export function MapConsent({ embedUrl, address, copy }: MapConsentProps) {
  const consent = useSyncExternalStore(subscribeMapConsent, readMapConsent, serverMapConsent);

  if (consent === "granted") {
    return (
      <div className="flex flex-col gap-3">
        <div className="photo photo-lg aspect-[4/3] w-full sm:aspect-[16/9]">
          <iframe
            src={embedUrl}
            title={copy.frameTitle}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <button type="button" className="link-quiet self-start" onClick={() => setMapConsent("denied")}>
          {copy.hide}
        </button>
      </div>
    );
  }

  return (
    <div className="map-placeholder photo-lg aspect-[4/5] w-full sm:aspect-[16/9]" data-map-placeholder>
      <div className="map-placeholder__pin" aria-hidden="true">
        <PinIcon />
      </div>
      <div className="map-placeholder__panel">
        <p className="font-display text-[1.1rem] font-semibold tracking-[0.02em]">{address}</p>
        <p className="mt-2 max-w-[48ch] text-[0.9375rem] text-mute">{copy.consent}</p>
        <button type="button" className="btn btn-primary mt-5" onClick={() => setMapConsent("granted")}>
          {copy.show}
        </button>
      </div>
    </div>
  );
}
