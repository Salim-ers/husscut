import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { blockGoogle, isNarrow, publicPaths, skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipIntro(page);
  await blockGoogle(page);
});

test.describe("audit axe (WCAG 2.2 A/AA)", () => {
  for (const path of publicPaths) {
    test(`${path}`, async ({ page }, info) => {
      test.skip(!["desktop-1440", "mobile-390"].includes(info.project.name), "Audit sur deux largeurs représentatives");
      await page.goto(path);
      await page.waitForTimeout(1200);
      // Affiche toutes les photos différées avant l'audit (contraste des textes posés à côté).
      await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-revealed")));
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const summary = results.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`);
      expect(summary).toEqual([]);
    });
  }
});

test("le lien d'évitement mène au contenu", async ({ page }) => {
  await page.goto("/fr/viandes");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Aller au contenu" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contenu$/);
});

test("menu mobile : ouverture au clavier, Échap, focus restitué", async ({ page }, info) => {
  test.skip(!isNarrow(info), "Menu mobile uniquement");
  await page.goto("/fr");
  const trigger = page.getByRole("button", { name: "Ouvrir le menu" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Fermer le menu" })).toBeFocused();
  await expect(dialog.getByRole("link", { name: /Appeler la boutique/ })).toBeVisible();
  await expect(dialog.getByRole("link", { name: /Lancer l.itinéraire/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("cibles tactiles d'au moins 44 px pour les actions principales", async ({ page }, info) => {
  test.skip(!isNarrow(info), "Contrôle sur écran tactile");
  for (const path of ["/fr", "/fr/viandes", "/fr/contact"]) {
    await page.goto(path);
    const small = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLElement>("main .btn, header .btn, header button, main .chip, main .product-cta"))
        .filter((element) => element.offsetParent !== null)
        .map((element) => ({ text: element.textContent?.trim().slice(0, 30), h: element.getBoundingClientRect().height }))
        .filter((box) => box.h < 44),
    );
    expect(small, path).toEqual([]);
  }
});
