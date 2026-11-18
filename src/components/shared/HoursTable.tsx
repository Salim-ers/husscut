import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { weekRows } from "@/lib/hours";
import { TodayMarker } from "./TodayMarker";

interface HoursTableProps {
  locale: Locale;
  dict: Dictionary["hours"];
  /** Affiche la note « horaires indicatifs ». */
  withNote?: boolean;
  headingLevel?: "h2" | "h3";
  tone?: "dark" | "light";
}

/** Horaires de la boutique, jour par jour. Le jour courant (heure de Paris) est signalé côté client. */
export function HoursTable({ locale, dict, withNote = true, headingLevel = "h3", tone = "dark" }: HoursTableProps) {
  const rows = weekRows(locale, dict);
  const Heading = headingLevel;
  const muted = tone === "dark" ? "text-mute" : "text-mute-ink";
  return (
    <div className="hours" data-hours>
      <Heading className="font-sans text-[0.9875rem] font-semibold tracking-normal">{dict.title}</Heading>
      <dl className="mt-3 grid grid-cols-[minmax(6.5rem,auto)_1fr] gap-x-5 text-[0.9875rem]">
        {rows.map((row) => (
          <div key={row.day} className="contents" data-day={row.day}>
            <dt className={`border-t py-2 ${tone === "dark" ? "border-ivory/12" : "border-ink/12"}`}>{row.label}</dt>
            <dd className={`flex flex-wrap items-baseline justify-between gap-x-3 border-t py-2 ${tone === "dark" ? "border-ivory/12" : "border-ink/12"} ${row.closed ? muted : ""}`}>
              <span>{row.value}</span>
              <TodayMarker day={row.day} label={dict.today} tone={tone} />
            </dd>
          </div>
        ))}
      </dl>
      {withNote ? <p className={`mt-3 text-sm ${muted}`}>{dict.note}</p> : null}
    </div>
  );
}
