import { expect, test } from "@playwright/test";
import { isDesktop, navigation, publicPaths, skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test.describe("pages publiques", () => {
  for (const path of publicPaths) {
    test(`${path} : un titre, crédit QuadCore, ni débordement, ni prix, ni nom complet`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      const credit = page.locator("[data-credit] a");
      await expect(credit).toHaveAttribute("href", "https://www.quad-core.fr/");
      await expect(page.locator("[data-credit]")).toContainText(/Créé par QuadCore|Created by QuadCore/);
      await expect(page.locator("[data-credit]")).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const text = await page.locator("body").innerText();
      expect(text).not.toMatch(/€|\d+,\d{2}\s?€/);
      expect(text).not.toMatch(/Ben-Addi|Hammoum|Haki/);
      expect(text).not.toMatch(/\bdémo\b|\bdemo\b/i);
      await expect(page.locator(`a[href^="tel:+33665637611"]`).first()).toBeAttached();
    });
  }
});

test("le menu mène à chaque page et le retour arrière fonctionne", async ({ page }, info) => {
  await page.goto("/fr");
  const targets = [
    { name: "Les viandes", url: /\/fr\/viandes$/, h1: "Les viandes" },
    { name: "La charcuterie", url: /\/fr\/charcuterie$/, h1: "La charcuterie" },
    { name: "La maison", url: /\/fr\/la-maison$/, h1: "La maison" },
    { name: "Nous trouver", url: /\/fr\/contact$/, h1: "Nous trouver & contact" },
    { name: "Commander", url: /\/fr\/commander$/, h1: "Commander" },
  ];
  for (const target of targets) {
    const nav = await navigation(page, info);
    await nav.getByRole("link", { name: target.name, exact: true }).click();
    await expect(page).toHaveURL(target.url);
    await expect(page.locator("h1")).toHaveText(target.h1);
    if (isDesktop(info)) {
      await expect(page.getByRole("navigation", { name: "Navigation principale" }).getByRole("link", { name: target.name, exact: true })).toHaveAttribute("aria-current", "page");
    } else {
      await expect(page.getByRole("dialog")).toBeHidden();
    }
  }
  await page.goBack();
  await expect(page).toHaveURL(/\/fr\/contact$/);
  await expect(page.locator("h1")).toHaveText("Nous trouver & contact");
  await page.goBack();
  await expect(page).toHaveURL(/\/fr\/la-maison$/);
  await page.goForward();
  await expect(page.locator("h1")).toHaveText("Nous trouver & contact");
});

test("un lien de contenu change de page et le focus revient au contenu", async ({ page }) => {
  await page.goto("/fr/charcuterie");
  await page.getByRole("link", { name: "Demander une planche ou un coffret" }).click();
  await expect(page).toHaveURL(/\/fr\/commander\?topic=platter#formulaire$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/fr\/charcuterie$/);
  await page.getByRole("link", { name: /HussCut, retour à l.accueil/ }).first().click();
  await expect(page).toHaveURL(/\/fr$/);
  await expect(page.locator("main")).toBeFocused();
});

test("le sélecteur de langue garde la page, l'ancre et les paramètres", async ({ page }, info) => {
  await page.goto("/fr/viandes#agneau");
  const switchTo = async (name: RegExp) => {
    if (isDesktop(info)) await page.locator("header").getByRole("link", { name }).click();
    else {
      await page.getByRole("button", { name: /ouvrir le menu|open menu/i }).click();
      await page.getByRole("dialog").getByRole("link", { name }).click();
    }
  };
  await switchTo(/Read this page in English/);
  await expect(page).toHaveURL(/\/en\/meats#lamb$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toHaveText("Meats");

  await page.goto("/en/order?topic=availability&item=bavette#request-form");
  await switchTo(/Lire cette page en français/);
  await expect(page).toHaveURL(/\/fr\/commander\?topic=availability&item=bavette#formulaire$/);
  await expect(page.locator("[data-prefilled-product]")).toContainText("Bavette");
});

test("adresses inconnues : 404 localisée ou bilingue", async ({ page }) => {
  // Page de langue servie dans l'autre langue : 404 dans la mise en page du site.
  const crossed = await page.goto("/en/viandes");
  expect(crossed?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText(/This page doesn.t exist/);
  await expect(page.locator("[data-credit]")).toBeVisible();
  // Adresse inconnue : la langue n'est pas déterminable, la 404 est bilingue.
  for (const path of ["/fr/page-inexistante", "/inconnu"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveCount(2);
    await expect(page.getByRole("link", { name: /Retour à l.accueil/ })).toHaveAttribute("href", "/fr");
  }
});
