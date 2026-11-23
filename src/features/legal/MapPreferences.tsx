"use client";

import { useState, useSyncExternalStore } from "react";
import { readMapConsent, serverMapConsent, setMapConsent, subscribeMapConsent } from "@/lib/consent";

interface MapPreferencesProps {
  copy: { mapAllowed: string; mapDenied: string; mapAsk: string; accept: string; revoke: string; saved: string };
}

/** Réglage de l'accord Google Maps gardé sur l'appareil : accepter ou refuser à tout moment. */
export function MapPreferences({ copy }: MapPreferencesProps) {
  const consent = useSyncExternalStore(subscribeMapConsent, readMapConsent, serverMapConsent);
  const [saved, setSaved] = useState(false);
  const status = consent === "granted" ? copy.mapAllowed : consent === "denied" ? copy.mapDenied : copy.mapAsk;

  const choose = (value: "granted" | "denied") => {
    setMapConsent(value);
    setSaved(true);
  };

  return (
    <div className="flex flex-col gap-4" data-map-preferences>
      <p className="text-mute">{status}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" className="btn btn-secondary" aria-pressed={consent === "denied"} onClick={() => choose("denied")}>
          {copy.revoke}
        </button>
        <button type="button" className="btn btn-secondary" aria-pressed={consent === "granted"} onClick={() => choose("granted")}>
          {copy.accept}
        </button>
      </div>
      <p aria-live="polite" className="text-[0.9375rem] font-medium">
        {saved ? copy.saved : ""}
      </p>
    </div>
  );
}
