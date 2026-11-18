/**
 * Envoi d'une demande par e-mail via l'API Resend (https://resend.com/docs/api-reference/emails/send-email).
 * Aucun secret côté navigateur : ce module ne s'exécute que sur le serveur.
 */

export interface EmailConfig {
  apiKey: string;
  to: string;
  from: string;
}

export type DeliveryOutcome = { ok: true; id: string } | { ok: false; reason: "timeout" | "network" | "rejected" | "invalid-response" };

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Lit la configuration ; renvoie null si un seul élément manque (le site reste en mode SMS). */
export function readEmailConfig(env: Record<string, string | undefined> = process.env): EmailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

/** Retire retours à la ligne et caractères de contrôle d'une valeur placée dans un en-tête. */
export function headerSafe(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, 120);
}

interface SendOptions {
  subject: string;
  text: string;
  /** Adresse de réponse, uniquement si le visiteur a donné un e-mail valide. */
  replyTo?: string;
  /** Clé d'idempotence : une même demande renvoyée n'est délivrée qu'une fois. */
  idempotencyKey: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

/**
 * Le succès n'est déclaré que si le prestataire répond 2xx avec un identifiant d'e-mail.
 * Les erreurs sont journalisées sans données personnelles.
 */
export async function sendRequestEmail(config: EmailConfig, options: SendOptions): Promise<DeliveryOutcome> {
  const { fetchImpl = fetch, timeoutMs = 8000 } = options;
  let response: Response;
  try {
    response = await fetchImpl(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": options.idempotencyKey,
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: headerSafe(options.subject),
        text: options.text,
        ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(timeoutMs),
      cache: "no-store",
    });
  } catch (error) {
    const reason = error instanceof DOMException && error.name === "TimeoutError" ? "timeout" : "network";
    console.error(`[contact] envoi e-mail impossible (${reason})`);
    return { ok: false, reason };
  }

  if (!response.ok) {
    console.error(`[contact] envoi e-mail refusé par le prestataire (HTTP ${response.status})`);
    return { ok: false, reason: "rejected" };
  }

  try {
    const payload: unknown = await response.json();
    const id = typeof payload === "object" && payload !== null && "id" in payload ? (payload as { id: unknown }).id : undefined;
    if (typeof id === "string" && id.length > 0) return { ok: true, id };
  } catch {
    // Corps illisible : traité ci-dessous comme une réponse invalide.
  }
  console.error("[contact] réponse du prestataire sans identifiant d'e-mail");
  return { ok: false, reason: "invalid-response" };
}
