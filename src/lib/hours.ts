import { business, type TimeRange, type Weekday } from "@/content/business";
import type { Locale } from "@/i18n/config";

export const weekdays: readonly Weekday[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/** « 19:45 » → « 19 h 45 » (fr) ou « 7:45 pm » (en). */
export function formatTime(locale: Locale, time: string): string {
  const [h = "0", m = "00"] = time.split(":");
  const hours = Number(h);
  if (locale === "fr") return m === "00" ? `${hours} h` : `${hours} h ${m}`;
  const suffix = hours >= 12 ? "pm" : "am";
  const h12 = hours % 12 === 0 ? 12 : hours % 12;
  return m === "00" ? `${h12} ${suffix}` : `${h12}:${m} ${suffix}`;
}

export function formatRanges(locale: Locale, ranges: readonly TimeRange[], words: { closed: string; and: string }): string {
  if (ranges.length === 0) return words.closed;
  return ranges.map(([open, close]) => `${formatTime(locale, open)} – ${formatTime(locale, close)}`).join(` ${words.and} `);
}

export interface HoursRow {
  day: Weekday;
  label: string;
  value: string;
  closed: boolean;
}

export function weekRows(locale: Locale, dict: { closed: string; and: string; days: Record<Weekday, string> }): HoursRow[] {
  return weekdays.map((day) => {
    const ranges = business.hours.weekly[day];
    return { day, label: dict.days[day], value: formatRanges(locale, ranges, dict), closed: ranges.length === 0 };
  });
}

/** Jour de la semaine à Paris pour un instant donné (indépendant du fuseau du serveur ou du visiteur). */
export function parisWeekday(date: Date): Weekday {
  const name = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", weekday: "long" }).format(date).toLowerCase();
  const day = weekdays.find((candidate) => candidate === name);
  if (!day) throw new Error(`Jour inattendu : ${name}`);
  return day;
}
