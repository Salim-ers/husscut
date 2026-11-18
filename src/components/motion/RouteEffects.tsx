"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const LARGE = "(min-width: 64rem)";
const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Effets liés au changement de page :
 * - le focus clavier est replacé sur le contenu principal (sauf ancre ciblée) ;
 * - les éléments marqués data-reveal apparaissent à leur première entrée dans l'écran ;
 * - les scènes marquées data-progress reçoivent leur avancement --p (0 → 1) au défilement :
 *   « view » (défaut) pendant la traversée de l'écran, « pin » sur la hauteur d'une scène
 *   épinglée, « pin-lg » épinglée sur grand écran seulement ;
 * - la galerie data-hscroll devient un défilement horizontal épinglé sur grand écran.
 * En mouvement réduit, rien n'est animé : --p reste à 1 (état final, CSS).
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

    const cleanups: (() => void)[] = [];

    /* ---- Révélations ---------------------------------------------------------- */
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
    if (targets.length > 0) {
      if (!("IntersectionObserver" in window)) {
        targets.forEach((element) => element.classList.add("is-revealed"));
      } else {
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
        cleanups.push(() => observer.disconnect());
      }
    }

    /* ---- Scènes liées au défilement ------------------------------------------ */
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    if (scenes.length > 0 && !window.matchMedia(REDUCED).matches) {
      const large = window.matchMedia(LARGE);
      const galleries = scenes.filter((scene) => scene.hasAttribute("data-hscroll"));

      const layout = () => {
        for (const gallery of galleries) {
          const track = gallery.querySelector<HTMLElement>(".hscroll__track");
          if (large.matches && track) {
            gallery.classList.add("is-pinned");
            const travel = Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
            gallery.style.setProperty("--pin-h", `${travel + window.innerHeight}px`);
          } else {
            gallery.classList.remove("is-pinned");
            gallery.style.removeProperty("--pin-h");
          }
        }
      };

      const pinned = (scene: HTMLElement) => {
        const mode = scene.dataset.progress;
        return mode === "pin" || (mode === "pin-lg" && large.matches) || scene.classList.contains("is-pinned");
      };

      let frame = 0;
      const update = () => {
        frame = 0;
        const viewport = window.innerHeight;
        for (const scene of scenes) {
          const rect = scene.getBoundingClientRect();
          let progress: number;
          if (pinned(scene)) {
            const range = rect.height - viewport;
            progress = range > 0 ? -rect.top / range : rect.top <= 0 ? 1 : 0;
          } else {
            progress = (viewport - rect.top) / (viewport + rect.height);
          }
          scene.style.setProperty("--p", Math.min(1, Math.max(0, progress)).toFixed(4));
        }
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      const relayout = () => {
        layout();
        schedule();
      };

      layout();
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", relayout);
      large.addEventListener("change", relayout);
      cleanups.push(() => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", relayout);
        large.removeEventListener("change", relayout);
        cancelAnimationFrame(frame);
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname, mainId]);

  return null;
}
