"use client";

import { useEffect, useId, useState } from "react";
import { forgetMapConsent, readMapConsent, rememberMapConsent } from "@/lib/consent";

interface MapConsentProps {
  embedUrl: string;
  copy: { consent: string; show: string; remember: string; hide: string; frameTitle: string };
}

/**
 * Carte Google Maps chargée uniquement après action du visiteur (ou accord mémorisé à sa demande).
 * Avant cela, aucune requête n'est faite vers Google.
 */
export function MapConsent({ embedUrl, copy }: MapConsentProps) {
  const uid = useId();
  const [shown, setShown] = useState(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- accord mémorisé lisible uniquement côté navigateur
    if (readMapConsent()) setShown(true);
  }, []);

  if (shown) {
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
        <button
          type="button"
          className="link-quiet self-start"
          onClick={() => {
            forgetMapConsent();
            setShown(false);
          }}
        >
          {copy.hide}
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-64 flex-col justify-center gap-5 rounded-[24px] border border-ivory/15 bg-char p-6 sm:p-10" data-map-placeholder>
      <p className="max-w-[52ch] text-mute">{copy.consent}</p>
      <label htmlFor={`${uid}-remember`} className="flex min-h-11 items-center gap-3 text-[0.9875rem]">
        <input
          id={`${uid}-remember`}
          type="checkbox"
          className="size-[1.125rem] accent-gold"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
        />
        {copy.remember}
      </label>
      <button
        type="button"
        className="btn btn-secondary self-start"
        onClick={() => {
          if (remember) rememberMapConsent();
          setShown(true);
        }}
      >
        {copy.show}
      </button>
    </div>
  );
}
