import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

test.describe("intro « Le néon s'allume »", () => {
  test("joue à la première arrivée, se termine seule et ne rejoue pas à la navigation", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("html")).toHaveAttribute("data-intro", /play|done/);
    await expect(page.locator("html")).toHaveAttribute("data-intro", "done", { timeout: 2500 });
    await expect(page.locator(".intro")).toBeHidden();
    await page.getByRole("link", { name: "Découvrir nos viandes" }).click();
    await expect(page).toHaveURL(/\/fr\/viandes$/);
    await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
    await page.reload();
    await expect(page.locator("html")).not.toHaveAttribute("data-intro", "play");
  });

  test("s'interrompt à la première interaction et ne bloque pas le contenu", async ({ page }) => {
    await page.goto("/fr/contact");
    const started = Date.now();
    await page.keyboard.press("Tab");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "done", { timeout: 600 });
    expect(Date.now() - started).toBeLessThan(1200);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("est absente en mouvement réduit", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/fr");
    await expect(page.locator("html")).not.toHaveAttribute("data-intro", "play");
    await expect(page.locator(".intro")).toBeHidden();
    await context.close();
  });
});

test.describe("transitions de page", () => {
  test.beforeEach(async ({ page }) => skipIntro(page));

  test("clics rapides successifs : la navigation aboutit sur la dernière page", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop-1440", "Barre de navigation visible sur ordinateur");
    await page.goto("/fr");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    await nav.getByRole("link", { name: "Les viandes", exact: true }).click();
    await nav.getByRole("link", { name: "La charcuterie", exact: true }).click();
    await nav.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page).toHaveURL(/\/fr\/contact$/);
    await expect(page.locator("h1")).toHaveText("Contact & commandes");
  });

  test("chaque photo amenée à l'écran se révèle", async ({ page }) => {
    await page.goto("/fr");
    const photos = page.locator("[data-reveal]");
    const count = await photos.count();
    expect(count).toBeGreaterThan(3);
    for (let index = 0; index < count; index++) {
      const photo = photos.nth(index);
      await photo.scrollIntoViewIfNeeded();
      await expect(photo).toHaveClass(/is-revealed/);
      await expect(photo).toHaveCSS("opacity", "1");
    }
  });
});
