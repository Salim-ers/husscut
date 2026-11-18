import { describe, expect, it } from "vitest";
import { formatRanges, formatTime, parisWeekday, weekRows } from "./hours";
import { breadcrumbJsonLd, serializeJsonLd, storeJsonLd } from "./structured-data";

const words = { closed: "Fermé", and: "et" };

describe("horaires", () => {
  it("formate les heures à la française et à l'anglaise", () => {
    expect(formatTime("fr", "09:00")).toBe("9 h");
    expect(formatTime("fr", "19:45")).toBe("19 h 45");
    expect(formatTime("en", "19:45")).toBe("7:45 pm");
    expect(formatTime("en", "12:00")).toBe("12 pm");
  });

  it("affiche la coupure du vendredi et le dimanche fermé", () => {
    expect(formatRanges("fr", [["09:00", "13:00"], ["14:30", "19:45"]], words)).toBe("9 h – 13 h et 14 h 30 – 19 h 45");
    expect(formatRanges("fr", [], words)).toBe("Fermé");
    const rows = weekRows("fr", { ...words, days: { monday: "Lundi", tuesday: "Mardi", wednesday: "Mercredi", thursday: "Jeudi", friday: "Vendredi", saturday: "Samedi", sunday: "Dimanche" } });
    expect(rows).toHaveLength(7);
    expect(rows.find((row) => row.day === "sunday")?.closed).toBe(true);
  });

  it("calcule le jour à l'heure de Paris, y compris autour de minuit et du changement d'heure", () => {
    expect(parisWeekday(new Date("2026-11-18T23:30:00Z"))).toBe("thursday"); // 00 h 30 à Paris
    expect(parisWeekday(new Date("2026-03-29T00:30:00Z"))).toBe("sunday");
    expect(parisWeekday(new Date("2026-06-30T22:30:00Z"))).toBe("wednesday"); // 00 h 30 (heure d'été)
  });
});

describe("données structurées", () => {
  it("décrivent la boutique sans note agrégée, sans prix et sans horaires non confirmés", () => {
    const data = storeJsonLd("fr", "Boucherie-charcuterie halal");
    const text = JSON.stringify(data);
    expect(data["@type"]).toBe("Store");
    expect(data.telephone).toBe("+33 6 65 63 76 11");
    expect(text).not.toMatch(/aggregateRating|priceRange|openingHoursSpecification/);
  });

  it("produisent un fil d'Ariane et une sérialisation sûre", () => {
    const crumbs = breadcrumbJsonLd("en", [
      { route: "home", name: "Home" },
      { route: "meats", name: "Meats" },
    ]);
    expect(crumbs.itemListElement[1]?.item).toMatch(/\/en\/meats$/);
    expect(serializeJsonLd({ x: "</script><script>" })).not.toContain("</script>");
  });
});
