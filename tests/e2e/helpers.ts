import type { Page, TestInfo } from "@playwright/test";

/** Pages publiques, dans les deux langues. */
export const publicPaths = [
  "/fr",
  "/en",
  "/fr/viandes",
  "/en/meats",
  "/fr/charcuterie",
  "/en/charcuterie",
  "/fr/la-maison",
  "/en/our-shop",
  "/fr/commander",
  "/en/order",
  "/fr/contact",
  "/en/contact",
  "/fr/mentions-legales",
  "/en/legal-notice",
  "/fr/confidentialite",
  "/en/privacy",
  "/fr/cookies",
  "/en/cookies",
] as const;

/** Marque l'intro comme déjà vue : les tests fonctionnels partent d'un site au repos. */
export async function skipIntro(page: Page) {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("hc:intro", "1");
    } catch {
      // Stockage indisponible : l'intro ne joue pas non plus.
    }
  });
}

/** Bloque tout appel à Google pendant les tests (la carte ne doit rien charger sans clic). */
export async function blockGoogle(page: Page, seen: string[] = []) {
  await page.route(/google\.com|gstatic\.com|googleapis\.com/, (route) => {
    seen.push(route.request().url());
    return route.abort();
  });
  return seen;
}

export const isDesktop = (info: TestInfo) => info.project.name === "desktop-1440";
export const isNarrow = (info: TestInfo) => info.project.name.startsWith("mobile");

/** Ouvre le menu mobile si nécessaire, puis renvoie la zone de navigation à utiliser. */
export async function navigation(page: Page, info: TestInfo) {
  if (isDesktop(info)) return page.getByRole("navigation", { name: /navigation principale|main navigation/i }).first();
  await page.getByRole("button", { name: /ouvrir le menu|open menu/i }).click();
  return page.getByRole("dialog").getByRole("navigation");
}
