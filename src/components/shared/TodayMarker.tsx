"use client";

import { useSyncExternalStore } from "react";
import type { Weekday } from "@/content/business";
import { parisWeekday } from "@/lib/hours";

const subscribe = () => () => {};

/**
 * Pastille « Aujourd'hui » sur la ligne du jour (heure de Paris).
 * Rendue uniquement côté client pour éviter un décalage avec le rendu statique.
 */
export function TodayMarker({ day, label, tone }: { day: Weekday; label: string; tone: "dark" | "light" }) {
  const today = useSyncExternalStore(
    subscribe,
    () => parisWeekday(new Date()),
    () => null,
  );
  if (today !== day) return null;
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold ${
        tone === "dark" ? "bg-gold text-ink" : "bg-ink text-ivory"
      }`}
    >
      {label}
    </span>
  );
}
