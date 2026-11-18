import { describe, expect, it } from "vitest";
import { business } from "../src/content/business";
import { launchChecks } from "./launch-gate";

describe("contrôle de publication", () => {
  it("bloque la production tant que les informations obligatoires manquent", () => {
    const blocking = launchChecks().filter((check) => check.blocking && !check.ok);
    expect(blocking.map((check) => check.id)).toEqual(
      expect.arrayContaining(["hours", "head-office", "publication-director", "host", "google-listing", "portrait-rights"]),
    );
  });

  it("laisse passer un dossier complet", () => {
    const complete = {
      ...business,
      hours: { ...business.hours, confirmed: true },
      googleListing: { ...business.googleListing, verified: true },
      reviews: { reuseAuthorized: true, showExcerpts: true },
      media: { portraitRightsConfirmed: true },
      legal: {
        ...business.legal,
        headOfficeAddress: "Adresse du siège",
        shareCapital: "1 000 €",
        rcs: "RCS Paris 903 983 146",
        publicationDirector: "Nom du responsable",
        publisherEmail: "contact@example.fr",
        host: { name: "Hébergeur", address: "Adresse", contact: "Contact" },
      },
    } as unknown as typeof business;
    expect(launchChecks(complete).filter((check) => check.blocking && !check.ok)).toEqual([]);
  });
});
