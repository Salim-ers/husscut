import { describe, expect, it } from "vitest";
import en from "@/i18n/dictionaries/en";
import fr from "@/i18n/dictionaries/fr";
import { business } from "./business";
import { charcuterieGroups, findProduct, listAllProducts, meatCategories } from "./catalogue";
import { photos } from "./media";
import { googleReviews } from "./reviews";

const PRICE_OR_WEIGHT = /€|\beur\b|\d+\s?(g|kg|gr)\b|\d+[,.]\d{2}/i;
const AMBIGUOUS = /\b(bacon|jambon|chorizo|saucisson|saucisse|lardons|pastrami|prosciutto)\b/i;
const SPECIES = /(bœuf|boeuf|veau|poulet|dinde|agneau|canard|volaille)/i;

describe("catalogue", () => {
  const products = listAllProducts();

  it("n'a aucun identifiant en double, ni produit présent dans deux rayons", () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("couvre les sept rayons de viande et les trois familles de charcuterie demandés", () => {
    expect(meatCategories.map((c) => c.id)).toEqual(["boeuf", "veau", "agneau", "volaille", "grillades", "creations", "epicerie"]);
    expect(charcuterieGroups.map((g) => g.id)).toEqual(["fines-tranches", "fumes-secs", "a-partager"]);
    for (const section of [...meatCategories, ...charcuterieGroups]) expect(section.products.length).toBeGreaterThan(0);
  });

  it("ne contient ni prix ni poids, dans aucune langue", () => {
    for (const product of products) {
      for (const text of [product.name.fr, product.name.en, product.note?.fr ?? "", product.note?.en ?? ""]) {
        expect(text, product.id).not.toMatch(PRICE_OR_WEIGHT);
      }
    }
  });

  it("précise l'espèce pour les noms ambigus (bacon, jambon, saucisson…)", () => {
    for (const product of products) {
      if (AMBIGUOUS.test(product.name.fr)) expect(product.name.fr, product.id).toMatch(SPECIES);
    }
  });

  it("n'associe que des photos existantes et des ancres uniques", () => {
    for (const product of products) if (product.photo) expect(photos[product.photo]).toBeDefined();
    const anchors = [...meatCategories, ...charcuterieGroups].flatMap((section) => [section.anchor.fr, section.anchor.en]);
    expect(new Set(anchors).size).toBe(anchors.length);
  });

  it("retrouve un produit par identifiant et ignore les identifiants inconnus", () => {
    expect(findProduct("cote-de-boeuf")?.name.fr).toBe("Côte de bœuf");
    expect(findProduct("inconnu")).toBeUndefined();
    expect(findProduct(null)).toBeUndefined();
  });
});

describe("avis Google", () => {
  it("n'affiche que des initiales, une note valide et une traduction", () => {
    for (const review of googleReviews) {
      expect(review.author).toMatch(/^([A-Z]\.)( ?[A-Z]\.)?(-[A-Z]\.)?$|^[A-Z]\. [A-Z]\.(-[A-Z]\.)?$/);
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
      expect(review.translation.length).toBeGreaterThan(10);
    }
    const serialized = JSON.stringify(googleReviews);
    for (const fullName of ["Ben-Addi", "Hammoum", "Haki"]) expect(serialized).not.toContain(fullName);
  });
});

describe("données de la boutique", () => {
  it("garde les coordonnées publiques exactes", () => {
    expect(business.address.street).toBe("13 avenue Philippe-Auguste");
    expect(business.address.postalCode).toBe("75011");
    expect(business.phone.e164).toBe("+33665637611");
    expect(business.legal.shopSiret.replace(/\s/g, "")).toBe("90398314600023");
    expect(business.credits.url).toBe("https://www.quad-core.fr/");
  });

  it("n'invente pas de certification halal ni d'éléments légaux non confirmés", () => {
    expect(business.halalCertification).toBeNull();
    expect(business.legal.headOfficeAddress).toBeNull();
    expect(business.legal.publicationDirector).toBeNull();
  });
});

describe("dictionnaires", () => {
  const keys = (value: unknown, prefix = ""): string[] =>
    value && typeof value === "object" && !Array.isArray(value)
      ? Object.entries(value).flatMap(([key, child]) => keys(child, `${prefix}${key}.`))
      : [prefix.slice(0, -1)];

  it("ont exactement les mêmes clés en français et en anglais", () => {
    expect(keys(en).sort()).toEqual(keys(fr).sort());
  });

  it("ne contiennent ni mention de démo, ni promesse d'envoi, ni prix", () => {
    for (const dict of [fr, en]) {
      const text = JSON.stringify(dict);
      expect(text).not.toMatch(/\bd[ée]mo\b|lorem|ipsum/i);
      expect(text).not.toMatch(/€/);
      // « envoyé » n'apparaît que dans le résultat du mode e-mail, après acceptation du prestataire.
      const smsCopy = JSON.stringify({ ready: dict.contact.form.ready, sms: dict.contact.form.sms });
      expect(smsCopy).not.toMatch(/message envoyé|message sent/i);
    }
  });
});
