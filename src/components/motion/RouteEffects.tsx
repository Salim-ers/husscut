"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Effets liés au changement de page :
 * - le focus clavier est replacé sur le contenu principal (sauf ancre ciblée) ;
 * - les photos marquées data-reveal apparaissent à leur première entrée dans l'écran.
 */
export function RouteEffects({ mainId }: { mainId: string }) {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else if (!window.location.hash) {
      document.getElementById(mainId)?.focus({ preventScroll: true });
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
    if (targets.length === 0) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("is-revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.12 },
    );
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname, mainId]);

  return null;
}
