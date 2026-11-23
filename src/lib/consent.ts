/**
 * Choix du visiteur pour la carte Google Maps (seul contenu tiers du site susceptible de déposer
 * des cookies) : « granted », « denied », ou null tant qu'il n'a rien choisi. Gardé sur l'appareil
 * (localStorage, sans cookie) jusqu'à ce qu'il le change sur la page Cookies.
 * Le stockage peut être indisponible (navigation privée, réglages stricts) : on se replie alors
 * sur « aucun choix », sans erreur visible ; un choix fait pendant la visite reste valable en mémoire.
 */
export type MapConsent = "granted" | "denied";

const MAP_CONSENT_KEY = "hc:map-consent";
const CHANGE_EVENT = "hc:consent";
let memory: MapConsent | null = null;

export function readMapConsent(): MapConsent | null {
  try {
    const value = window.localStorage.getItem(MAP_CONSENT_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // Stockage indisponible : on garde le choix fait pendant la visite.
  }
  return memory;
}

export function setMapConsent(value: MapConsent): void {
  memory = value;
  try {
    window.localStorage.setItem(MAP_CONSENT_KEY, value);
  } catch {
    // Stockage indisponible : le choix vaut pour cette visite seulement.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Abonnement aux changements (même onglet et autres onglets), pour useSyncExternalStore. */
export function subscribeMapConsent(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Rendu serveur : aucun choix connu (rien de tiers n'est rendu côté serveur). */
export const serverMapConsent = (): MapConsent | null | "unknown" => "unknown";
