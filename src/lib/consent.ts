/**
 * Accord du visiteur pour la carte Google Maps, gardé sur l'appareil uniquement s'il le demande.
 * Le stockage peut être indisponible (navigation privée, réglages stricts) : on se replie alors
 * sur « demander à chaque fois », sans erreur visible.
 */
const MAP_CONSENT_KEY = "hc:map-consent";

export function readMapConsent(): boolean {
  try {
    return window.localStorage.getItem(MAP_CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

export function rememberMapConsent(): boolean {
  try {
    window.localStorage.setItem(MAP_CONSENT_KEY, "granted");
    return true;
  } catch {
    return false;
  }
}

export function forgetMapConsent(): void {
  try {
    window.localStorage.removeItem(MAP_CONSENT_KEY);
  } catch {
    // Stockage indisponible : il n'y a rien à effacer.
  }
}
