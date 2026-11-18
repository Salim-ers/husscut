import { describe, expect, it } from "vitest";
import { translateAnchor } from "./anchors";
import { locales } from "./config";
import { equivalentPath, matchRoute, pathFor, routeKeys } from "./routes";
import { format, plain, typo } from "./typography";

describe("routes FR/EN", () => {
  it("donne un chemin unique à chaque page dans chaque langue", () => {
    const paths = routeKeys.flatMap((key) => locales.map((locale) => pathFor(locale, key)));
    expect(new Set(paths).size).toBe(paths.length);
    expect(pathFor("fr", "meats")).toBe("/fr/viandes");
    expect(pathFor("en", "meats")).toBe("/en/meats");
    expect(pathFor("en", "home")).toBe("/en");
  });

  it("retrouve la page équivalente dans l'autre langue", () => {
    expect(equivalentPath("/fr/viandes", "en")).toBe("/en/meats");
    expect(equivalentPath("/en/our-shop", "fr")).toBe("/fr/la-maison");
    expect(equivalentPath("/fr/mentions-legales/", "en")).toBe("/en/legal-notice");
    expect(equivalentPath("/fr/inconnue", "en")).toBe("/en");
    expect(matchRoute("/en/privacy")).toEqual({ locale: "en", key: "privacy" });
  });

  it("traduit les ancres de section", () => {
    expect(translateAnchor("#boeuf", "fr", "en")).toBe("beef");
    expect(translateAnchor("#smoked-and-cured", "en", "fr")).toBe("fumes-et-secs");
    expect(translateAnchor("#venir", "fr", "en")).toBe("visit");
    expect(translateAnchor("#inconnue", "fr", "en")).toBeNull();
    expect(translateAnchor("", "fr", "en")).toBeNull();
  });
});

describe("micro-typographie", () => {
  it("ajoute les espaces insécables françaises et l'apostrophe typographique", () => {
    expect(typo("fr", "Objet : l'agneau !")).toBe("Objet : l’agneau !");
    expect(typo("en", "Subject: it's")).toBe("Subject: it’s");
  });

  it("interpole et nettoie les marqueurs", () => {
    expect(format("{n} produits", { n: 3 })).toBe("3 produits");
    expect(format("{x} reste", {})).toBe("{x} reste");
    expect(plain("Paris 11^e")).toBe("Paris 11e");
  });
});
