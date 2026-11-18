import { expect, test } from "@playwright/test";
import { blockGoogle, skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("un envoi vide signale les champs et place le focus sur le premier", async ({ page }) => {
  await page.goto("/fr/contact");
  await page.getByRole("button", { name: "Préparer mon SMS" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("Corrigez les champs signalés");
  const name = page.getByLabel(/Votre nom/);
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused();
  await expect(page.getByText("Indiquez votre nom.")).toBeVisible();
  await expect(page.getByText("Écrivez votre message (10 caractères minimum).")).toBeVisible();
  await name.fill("Nadia");
  await expect(page.getByText("Indiquez votre nom.")).toHaveCount(0);
});

test("« Préparer mon SMS » prépare le message sans prétendre l'avoir envoyé", async ({ page, context }, info) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: info.project.use.baseURL ?? "http://127.0.0.1:3100" });
  await page.goto("/fr/contact");
  await page.getByLabel(/Votre nom/).fill("Nadia");
  await page.getByRole("radio", { name: "Planche ou coffret" }).check();
  await page.getByLabel(/Nombre de personnes/).fill("6");
  await page.getByLabel(/Votre message/).fill("Un coffret pour un anniversaire, sans fromage.");
  await page.getByRole("button", { name: "Préparer mon SMS" }).click();

  const heading = page.getByRole("heading", { name: "Votre SMS est prêt" });
  await expect(heading).toBeVisible();
  await expect(heading).toBeFocused();
  const href = await page.locator("[data-sms-link]").getAttribute("href");
  expect(href?.startsWith("sms:+33665637611?&body=")).toBe(true);
  const body = decodeURIComponent(href?.split("body=")[1] ?? "");
  expect(body).toContain("Nadia");
  expect(body).toContain("Planche ou coffret");
  expect(body).toContain("Nombre de personnes : 6");
  expect(body).toContain("sans fromage");
  await expect(page.locator("body")).not.toContainText(/message envoyé|demande envoyée/i);

  await page.getByRole("button", { name: "Copier le message" }).click();
  await expect(page.getByText(/Message copié|copie automatique n.a pas fonctionné/)).toBeVisible();

  await page.getByRole("button", { name: "Modifier ma demande" }).click();
  await expect(page.getByLabel(/Votre nom/)).toHaveValue("Nadia");
});

test("la carte Google n'est chargée qu'après le clic, l'itinéraire marche sans elle", async ({ page }) => {
  const google = await blockGoogle(page);
  await page.goto("/fr/contact");
  await expect(page.locator("iframe")).toHaveCount(0);
  const directions = page.getByRole("link", { name: /Lancer l.itinéraire/ }).first();
  await expect(directions).toHaveAttribute("href", /google\.com\/maps\/dir\/\?api=1&destination=/);
  await page.locator("[data-map-placeholder]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  expect(google).toEqual([]);

  await page.getByLabel("Se souvenir de mon choix sur cet appareil").check();
  await page.getByRole("button", { name: "Afficher la carte" }).click();
  await expect(page.locator("iframe")).toHaveAttribute("src", /google\.com\/maps/);

  await page.reload();
  await expect(page.locator("iframe")).toHaveCount(1);

  await page.goto("/fr/cookies");
  await page.getByRole("button", { name: "Retirer mon accord pour la carte" }).click();
  await expect(page.getByText(/C.est fait/)).toBeVisible();
  await page.goto("/fr/contact");
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("le contact anglais garde la même logique", async ({ page }) => {
  await page.goto("/en/contact?topic=availability&item=rosbif#request-form");
  await expect(page.getByRole("radio", { name: "Availability or an order" })).toBeChecked();
  await expect(page.locator("[data-prefilled-product]")).toContainText("Roast beef joint");
  await page.getByLabel(/Your name/).fill("Sam");
  await page.getByLabel(/Your message/).fill("Do you have one for Saturday?");
  await page.getByRole("button", { name: "Prepare my text message" }).click();
  const body = decodeURIComponent((await page.locator("[data-sms-link]").getAttribute("href"))?.split("body=")[1] ?? "");
  expect(body).toContain("Product: Roast beef joint");
});
