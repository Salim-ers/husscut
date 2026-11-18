"use client";

import { useEffect } from "react";

/** Seuil au-delà duquel l'en-tête peut s'effacer en descendant. */
const HIDE_AFTER = 480;
/** Un défilement compte comme geste du visiteur s'il suit une interaction de moins d'une seconde. */
const GESTURE_WINDOW = 1000;

/**
 * Comportement de l'en-tête au défilement, via deux attributs sur <html> lus par le CSS :
 * - data-scrolled : la barre transparente devient une capsule vitrée ;
 * - data-header-hidden : elle s'efface quand le visiteur descend, revient dès qu'il remonte.
 * Seul un défilement provoqué par un geste (molette, toucher, clavier) la masque : ni un saut
 * d'ancre, ni l'ancrage automatique du navigateur pendant le chargement. Un focus clavier à
 * l'intérieur (CSS :focus-within) ou le menu mobile ouvert la gardent visible.
 */
export function ScrollChrome() {
  useEffect(() => {
    const html = document.documentElement;
    let last = window.scrollY;
    let frame = 0;
    let lastGesture = -Infinity;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      html.toggleAttribute("data-scrolled", y > 24);
      const menuOpen = document.querySelector("dialog[open]") !== null;
      const byGesture = performance.now() - lastGesture < GESTURE_WINDOW;
      if (y <= HIDE_AFTER || delta < -4 || menuOpen) {
        html.removeAttribute("data-header-hidden");
      } else if (byGesture && delta > 4) {
        html.setAttribute("data-header-hidden", "");
      }
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onGesture = () => {
      lastGesture = performance.now();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    const gestures = ["wheel", "touchmove", "keydown"] as const;
    gestures.forEach((type) => window.addEventListener(type, onGesture, { passive: true }));
    return () => {
      window.removeEventListener("scroll", onScroll);
      gestures.forEach((type) => window.removeEventListener(type, onGesture));
      cancelAnimationFrame(frame);
      html.removeAttribute("data-header-hidden");
    };
  }, []);

  return null;
}
