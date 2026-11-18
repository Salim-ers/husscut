import { describe, expect, it, vi } from "vitest";
import fr from "@/i18n/dictionaries/fr";
import { composeRequestText, formatRequestDate, smsHref } from "./lib/compose-message";
import { createRateLimiter } from "./lib/rate-limit";
import { contactRequestHref } from "./lib/topics";
import { isPhoneOrEmail, parisToday, validateContact } from "./schemas/contact-schema";
import { headerSafe, readEmailConfig, sendRequestEmail } from "./services/email-delivery";

const known = (id: string) => ["cote-de-boeuf", "coffret-signature"].includes(id);
const sms = { requireReplyTo: false, today: "2026-11-18", isKnownItem: known };
const email = { ...sms, requireReplyTo: true };

describe("validation de la demande", () => {
  it("accepte une demande minimale", () => {
    const result = validateContact({ name: " Nadia ", topic: "question", message: "Avez-vous du gigot samedi ?" }, sms);
    expect(result).toEqual({ success: true, data: { name: "Nadia", topic: "question", message: "Avez-vous du gigot samedi ?" } });
  });

  it("signale chaque champ invalide par un code traduisible", () => {
    const result = validateContact({ name: "", topic: "autre", message: "court" }, sms);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toEqual({ name: "nameRequired", topic: "topicInvalid", message: "messageTooShort" });
  });

  it("refuse un message trop long et une date passée ou un nombre de personnes hors limites", () => {
    const result = validateContact({ name: "A", topic: "platter", message: "x".repeat(1001), people: "0", date: "2026-11-17" }, sms);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors).toMatchObject({ message: "messageTooLong", people: "peopleInvalid", date: "dateInvalid" });
  });

  it("ne garde que les champs utiles au sujet choisi", () => {
    const platter = validateContact({ name: "A", topic: "platter", message: "Pour un anniversaire", people: "8", date: "2026-12-05", item: "cote-de-boeuf" }, sms);
    expect(platter.success && platter.data).toEqual({ name: "A", topic: "platter", message: "Pour un anniversaire", people: 8, date: "2026-12-05" });
    const availability = validateContact({ name: "A", topic: "availability", message: "Deux côtes svp", item: "cote-de-boeuf", people: "4" }, sms);
    expect(availability.success && availability.data).toEqual({ name: "A", topic: "availability", message: "Deux côtes svp", item: "cote-de-boeuf" });
  });

  it("ignore sans erreur un produit inconnu (lien modifié)", () => {
    const result = validateContact({ name: "A", topic: "availability", message: "Bonjour, dispo ?", item: "<script>" }, sms);
    expect(result.success && result.data.item).toBeUndefined();
  });

  it("exige un moyen de réponse valide en mode e-mail", () => {
    expect(validateContact({ name: "A", topic: "question", message: "Une question précise" }, email)).toMatchObject({ success: false, errors: { replyTo: "replyToInvalid" } });
    expect(validateContact({ name: "A", topic: "question", message: "Une question précise", replyTo: "06 12 34 56 78" }, email).success).toBe(true);
    expect(isPhoneOrEmail("client@example.fr")).toBe(true);
    expect(isPhoneOrEmail("+33 6 12 34 56 78")).toBe(true);
    expect(isPhoneOrEmail("123")).toBe(false);
    expect(isPhoneOrEmail("pas un contact")).toBe(false);
  });

  it("calcule la date du jour à Paris", () => {
    expect(parisToday(new Date("2026-11-18T23:30:00Z"))).toBe("2026-11-19");
  });
});

describe("composition du SMS", () => {
  const copy = { ...fr.contact.form.sms, topics: fr.contact.form.topics };

  it("rédige un message lisible, sans espace insécable", () => {
    const text = composeRequestText(
      { name: "Nadia", topic: "platter", people: 6, date: "2026-11-21", message: "Sans fromage svp." },
      { locale: "fr", copy: { ...copy, topic: "Objet : {topic}" } },
    );
    expect(text).toContain("Bonjour HussCut, c'est Nadia.");
    expect(text).toContain("Objet : Planche ou coffret");
    expect(text).toContain("Nombre de personnes : 6");
    expect(text).toContain("samedi 21 novembre 2026");
    expect(text).toContain("Sans fromage svp.");
    expect(text).not.toContain(" ");
  });

  it("mentionne le produit demandé depuis le catalogue", () => {
    const text = composeRequestText({ name: "Sam", topic: "availability", item: "cote-de-boeuf", message: "Pour samedi." }, { locale: "fr", copy, productName: "Côte de bœuf" });
    expect(text).toContain("Produit : Côte de bœuf");
  });

  it("produit un lien sms: compatible iOS/Android, message encodé", () => {
    const href = smsHref("+33665637611", "Bonjour & merci ?\nÀ bientôt");
    expect(href.startsWith("sms:+33665637611?&body=")).toBe(true);
    expect(decodeURIComponent(href.split("body=")[1] ?? "")).toBe("Bonjour & merci ?\nÀ bientôt");
  });

  it("formate la date dans chaque langue", () => {
    expect(formatRequestDate("en", "2026-11-21")).toBe("Saturday, 21 November 2026");
    expect(formatRequestDate("fr", "pas-une-date")).toBe("pas-une-date");
  });

  it("construit le lien de demande depuis le catalogue", () => {
    expect(contactRequestHref("fr", { topic: "availability", item: "cote-de-boeuf" })).toBe("/fr/contact?topic=availability&item=cote-de-boeuf#formulaire");
    expect(contactRequestHref("en", { topic: "platter" })).toBe("/en/contact?topic=platter#request-form");
  });
});

describe("envoi e-mail (prestataire simulé)", () => {
  const config = { apiKey: "re_test", to: "boutique@example.fr", from: "site@example.fr" };
  const base = { subject: "Une question — Nadia", text: "Bonjour", idempotencyKey: "0f8b1f0e-1111-4c4c-9c9c-123456789abc" };

  it("reste en mode SMS tant que la configuration est incomplète", () => {
    expect(readEmailConfig({})).toBeNull();
    expect(readEmailConfig({ RESEND_API_KEY: "x", CONTACT_TO_EMAIL: "a@b.fr" })).toBeNull();
    expect(readEmailConfig({ RESEND_API_KEY: "x", CONTACT_TO_EMAIL: "a@b.fr", CONTACT_FROM_EMAIL: "c@d.fr" })).toEqual({ apiKey: "x", to: "a@b.fr", from: "c@d.fr" });
  });

  it("ne déclare le succès qu'avec une réponse 2xx portant un identifiant", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));
    await expect(sendRequestEmail(config, { ...base, replyTo: "client@example.fr", fetchImpl })).resolves.toEqual({ ok: true, id: "email_123" });
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer re_test");
    expect(headers["Idempotency-Key"]).toBe(base.idempotencyKey);
    expect(JSON.parse(String(init.body))).toMatchObject({ to: ["boutique@example.fr"], reply_to: "client@example.fr" });
  });

  it("traite refus, réponse sans identifiant, coupure réseau et délai dépassé comme des échecs", async () => {
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const rejected = vi.fn(async () => new Response("nope", { status: 500 }));
    const noId = vi.fn(async () => new Response(JSON.stringify({}), { status: 200 }));
    const network = vi.fn(async () => {
      throw new TypeError("fetch failed");
    });
    const timeout = vi.fn(async () => {
      throw new DOMException("timed out", "TimeoutError");
    });
    await expect(sendRequestEmail(config, { ...base, fetchImpl: rejected })).resolves.toEqual({ ok: false, reason: "rejected" });
    await expect(sendRequestEmail(config, { ...base, fetchImpl: noId })).resolves.toEqual({ ok: false, reason: "invalid-response" });
    await expect(sendRequestEmail(config, { ...base, fetchImpl: network })).resolves.toEqual({ ok: false, reason: "network" });
    await expect(sendRequestEmail(config, { ...base, fetchImpl: timeout })).resolves.toEqual({ ok: false, reason: "timeout" });
    // Aucune donnée personnelle dans les journaux.
    for (const call of errorLog.mock.calls) expect(String(call[0])).not.toMatch(/Nadia|example\.fr/);
    errorLog.mockRestore();
  });

  it("neutralise les retours à la ligne dans l'objet", () => {
    expect(headerSafe("Nadia\r\nBcc: x@y.z")).toBe("Nadia Bcc: x@y.z");
  });
});

describe("limitation de débit", () => {
  it("bloque au-delà du seuil puis libère après la fenêtre", () => {
    const allow = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(allow("ip", 0)).toBe(true);
    expect(allow("ip", 10)).toBe(true);
    expect(allow("ip", 20)).toBe(false);
    expect(allow("autre", 20)).toBe(true);
    expect(allow("ip", 1100)).toBe(true);
  });
});
