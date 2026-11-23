"use client";

import { type MouseEvent, type ReactNode, useEffect, useRef, useSyncExternalStore } from "react";
import { format } from "@/i18n/typography";

export interface FilterSection {
  id: string;
  anchor: string;
  label: string;
  count: number;
  node: ReactNode;
}

interface CatalogueFilterProps {
  listId: string;
  sections: readonly FilterSection[];
  labels: { filterLabel: string; all: string; count: string; countOne: string };
}

/** L'ancre de l'URL est la source de vérité du filtre (partageable, compatible retour arrière). */
const HASH_EVENT = "hc:hash";
const subscribeToHash = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  window.addEventListener(HASH_EVENT, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener(HASH_EVENT, callback);
  };
};
const readHash = () => decodeURIComponent(window.location.hash.replace(/^#/, ""));

/**
 * Filtre par rayon. Les capsules sont de vrais liens d'ancre (#boeuf…) : sans JavaScript,
 * elles mènent à la section. Avec JavaScript, elles n'affichent que le rayon choisi et
 * gardent l'ancre dans l'URL, donc partageable.
 */
export function CatalogueFilter({ listId, sections, labels }: CatalogueFilterProps) {
  const hash = useSyncExternalStore(subscribeToHash, readHash, () => "");
  const active = sections.find((section) => section.anchor === hash)?.id ?? null;
  const listRef = useRef<HTMLDivElement>(null);

  // Arrivée directe sur une ancre de rayon : une fois les autres rayons masqués (rendu client),
  // la barre de filtres est recalée sous l'en-tête.
  const arrivedOnSection = useRef(false);
  useEffect(() => {
    if (arrivedOnSection.current || !active) return;
    arrivedOnSection.current = true;
    const frame = requestAnimationFrame(() => listRef.current?.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [active]);

  function select(event: MouseEvent<HTMLAnchorElement>, section: FilterSection | null) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    const url = `${window.location.pathname}${window.location.search}${section ? `#${section.anchor}` : ""}`;
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(HASH_EVENT));
    const top = listRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) listRef.current?.scrollIntoView({ block: "start" });
  }

  const visible = active ? sections.filter((section) => section.id === active) : sections;
  const shown = visible.reduce((sum, section) => sum + section.count, 0);

  return (
    <div ref={listRef} id={listId} className="scroll-mt-16 lg:scroll-mt-[4.75rem]">
      <nav
        aria-label={labels.filterLabel}
        className="filter-bar sticky top-16 z-30 -mx-[clamp(1.25rem,4.2vw,3rem)] lg:top-[4.75rem]"
      >
        <ul className="flex gap-2 overflow-x-auto px-[clamp(1.25rem,4.2vw,3rem)] py-3 [scrollbar-width:none]" role="list">
          <li>
            <a href={`#${listId}`} className="chip" aria-current={active === null ? "true" : undefined} onClick={(event) => select(event, null)}>
              {labels.all}
            </a>
          </li>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.anchor}`}
                className="chip"
                aria-current={active === section.id ? "true" : undefined}
                onClick={(event) => select(event, section)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="sr-only" aria-live="polite">
        {format(shown === 1 ? labels.countOne : labels.count, { n: shown })}
      </p>
      {sections.map((section) => (
        <div key={section.id} hidden={active !== null && active !== section.id}>
          {section.node}
        </div>
      ))}
    </div>
  );
}
