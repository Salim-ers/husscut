import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("filtrer un rayon n'affiche que lui et rend l'URL partageable", async ({ page }) => {
  await page.goto("/fr/viandes");
  const filters = page.getByRole("navigation", { name: "Afficher un rayon" });
  await filters.getByRole("link", { name: "Agneau", exact: true }).click();
  await expect(page).toHaveURL(/\/fr\/viandes#agneau$/);
  await expect(filters.getByRole("link", { name: "Agneau", exact: true })).toHaveAttribute("aria-current", "true");
  await expect(page.getByRole("heading", { level: 2, name: "Agneau" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Bœuf" })).toBeHidden();
  await expect(page.getByRole("heading", { level: 3, name: "Souris d’agneau" })).toBeVisible();

  await filters.getByRole("link", { name: "Tout voir" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "Bœuf" })).toBeVisible();
  await expect(page).toHaveURL(/\/fr\/viandes$/);
});

test("un lien direct vers un rayon arrive filtré", async ({ page }) => {
  await page.goto("/en/meats#poultry");
  await expect(page.getByRole("heading", { level: 2, name: "Poultry" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Beef" })).toBeHidden();
});

test("« Demander la disponibilité » préremplit le formulaire", async ({ page }) => {
  await page.goto("/fr/viandes");
  await page.getByRole("link", { name: /^Côte de bœuf/ }).click();
  await expect(page).toHaveURL(/\/fr\/commander\?topic=availability&item=cote-de-boeuf#formulaire$/);
  await expect(page.getByRole("radio", { name: "Disponibilité ou commande" })).toBeChecked();
  await expect(page.locator("[data-prefilled-product]")).toContainText("Côte de bœuf");
  await page.getByRole("button", { name: /Retirer ce produit/ }).click();
  await expect(page.locator("[data-prefilled-product]")).toHaveCount(0);
});

test("la charcuterie mène aux coffrets avec nombre de personnes et date", async ({ page }) => {
  await page.goto("/fr/charcuterie");
  await page.getByRole("link", { name: "Demander une planche ou un coffret" }).click();
  await expect(page.getByRole("radio", { name: "Planche ou coffret" })).toBeChecked();
  await expect(page.getByLabel(/Nombre de personnes/)).toBeVisible();
  await expect(page.getByLabel(/Date souhaitée/)).toBeVisible();
});
