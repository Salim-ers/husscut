"use client";

import { useSyncExternalStore, useState } from "react";
import { forgetMapConsent, readMapConsent } from "@/lib/consent";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

/** Réglage de l'accord Google Maps mémorisé sur l'appareil, et son retrait. */
export function MapPreferences({ copy }: { copy: { mapAllowed: string; mapAsk: string; revoke: string; revoked: string } }) {
  const stored = useSyncExternalStore(subscribe, readMapConsent, () => false);
  const [revoked, setRevoked] = useState(false);
  const allowed = stored && !revoked;

  return (
    <div className="flex flex-col gap-4" data-map-preferences>
      <p className="text-mute">{allowed ? copy.mapAllowed : copy.mapAsk}</p>
      {allowed ? (
        <button
          type="button"
          className="btn btn-secondary self-start"
          onClick={() => {
            forgetMapConsent();
            setRevoked(true);
          }}
        >
          {copy.revoke}
        </button>
      ) : null}
      <p aria-live="polite" className="text-[0.9375rem] font-medium">
        {revoked ? copy.revoked : ""}
      </p>
    </div>
  );
}
