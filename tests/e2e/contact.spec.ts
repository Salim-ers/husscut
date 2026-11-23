import { expect, test } from "@playwright/test";
import { blockGoogle, skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => skipIntro(page));

test("un envoi vide signale les champs et place le focus sur le premier", async ({ page }) => {
  await page.goto("/fr/commander");
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("Corrigez les champs signalés");
  const name = page.getByLabel(/Votre nom/);
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused();
  await expect(page.getByText("Indiquez votre nom.")).toBeVisible();
  await expect(page.getByText("Indiquez un numéro de téléphone ou une adresse e-mail valide.")).toBeVisible();
  await expect(page.getByText("Écrivez votre message (10 caractères minimum).")).toBeVisible();
  await name.fill("Nadia");
  await expect(page.getByText("Indiquez votre nom.")).toHaveCount(0);
});

test("sans envoi configuré, la demande n'est jamais présentée comme envoyée", async ({ page }) => {
  await page.goto("/fr/commander");
  await page.getByLabel(/Votre nom/).fill("Nadia");
  await page.getByLabel(/Téléphone ou e-mail/).fill("06 12 34 56 78");
  await page.getByRole("radio", { name: "Planche ou coffret" }).check();
  await page.getByLabel(/Nombre de personnes/).fill("6");
  await page.getByLabel(/Votre message/).fill("Un coffret pour un anniversaire, sans fromage.");
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();

  const result = page.locator("[data-form-result='preview']");
  await expect(result).toBeFocused();
  await expect(result).toContainText("pas encore été transmise");
  await expect(page.locator("body")).not.toContainText(/message envoyé|demande envoyée/i);
  await expect(result.getByRole("link", { name: /Appeler la boutique/ })).toHaveAttribute("href", "tel:+33665637611");
  await expect(page.locator('a[href^="sms:"]')).toHaveCount(0);

  await page.getByRole("button", { name: "Modifier ma demande" }).click();
  await expect(page.getByLabel(/Votre nom/)).toHaveValue("Nadia");
});

test("le formulaire renvoie à la politique de confidentialité", async ({ page }) => {
  await page.goto("/fr/commander");
  await expect(page.locator("form").getByRole("link", { name: "Politique de confidentialité" })).toHaveAttribute("href", "/fr/confidentialite");
});

test("« Nous trouver » n'a plus de formulaire mais renvoie vers Commander", async ({ page }) => {
  await page.goto("/fr/contact");
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Préparer une demande" })).toHaveAttribute("href", "/fr/commander");
});

test("carte refusée : plan dessiné, rien de Google ; un clic l'affiche et le choix est gardé", async ({ page }) => {
  const google = await blockGoogle(page);
  await page.goto("/fr/contact");
  await expect(page.locator("iframe")).toHaveCount(0);
  const directions = page.getByRole("link", { name: /Lancer l.itinéraire/ }).first();
  await expect(directions).toHaveAttribute("href", /google\.com\/maps\/dir\/\?api=1&destination=/);
  await page.locator("[data-map-placeholder]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  expect(google).toEqual([]);

  await page.getByRole("button", { name: "Afficher la carte" }).click();
  await expect(page.locator("iframe")).toHaveAttribute("src", /google\.com\/maps/);

  await page.reload();
  await expect(page.locator("iframe")).toHaveCount(1);

  await page.goto("/fr/cookies");
  await page.getByRole("button", { name: "Refuser la carte" }).click();
  await expect(page.getByText(/C.est enregistré/)).toBeVisible();
  await page.goto("/fr/contact");
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("le formulaire anglais garde la même logique", async ({ page }) => {
  await page.goto("/en/order?topic=availability&item=rosbif#request-form");
  await expect(page.getByRole("radio", { name: "Availability or an order" })).toBeChecked();
  await expect(page.locator("[data-prefilled-product]")).toContainText("Roast beef joint");
  await page.getByLabel(/Your name/).fill("Sam");
  await page.getByLabel(/Phone or email/).fill("sam@example.com");
  await page.getByLabel(/Your message/).fill("Do you have one for Saturday?");
  await page.getByRole("button", { name: "Send my request" }).click();
  await expect(page.locator("[data-form-result='preview']")).toContainText("has not been passed to the shop");
});

test("« Commander » : demande de disponibilité par défaut, livraison en liens externes, rien à payer", async ({ page }) => {
  await page.goto("/fr/commander");
  await expect(page.locator("h1")).toHaveText("Commander");
  await expect(page.getByRole("radio", { name: "Disponibilité ou commande" })).toBeChecked();
  await expect(page.getByRole("link", { name: /Commander sur Uber Eats/ })).toHaveAttribute("href", /ubereats\.com/);
  await expect(page.getByRole("link", { name: /Commander sur Deliveroo/ })).toHaveAttribute("href", /deliveroo\.fr/);
  await expect(page.locator("body")).not.toContainText(/panier|ajouter au panier|payer maintenant/i);
});

test.describe("bandeau cookies (première visite)", () => {
  test("refuser : le bandeau disparaît, le choix est gardé, rien de Google", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const google = await blockGoogle(page);
    await page.goto("/fr/contact");
    const banner = page.locator("[data-cookie-banner]");
    await expect(banner).toBeVisible();
    await banner.getByRole("button", { name: "Refuser" }).click();
    await expect(banner).toHaveCount(0);
    await page.reload();
    await expect(page.locator("[data-cookie-banner]")).toHaveCount(0);
    await expect(page.locator("iframe")).toHaveCount(0);
    expect(google).toEqual([]);
    await context.close();
  });

  test("accepter : la carte s'affiche directement dans « Nous trouver »", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await blockGoogle(page);
    await page.goto("/fr/contact");
    await page.locator("[data-cookie-banner]").getByRole("button", { name: "Accepter" }).click();
    await expect(page.locator("iframe")).toHaveAttribute("src", /google\.com\/maps/);
    await context.close();
  });
});
