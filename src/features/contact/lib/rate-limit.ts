/**
 * Limitation de débit en mémoire (fenêtre glissante). Proportionnée à un site vitrine :
 * elle freine les envois répétés depuis une même adresse sur une instance serveur.
 * Limite connue : sur une plateforme serverless, chaque instance a sa propre mémoire.
 * Pour un volume important, la remplacer par un stockage partagé (Redis, Upstash…).
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return function check(key: string, now: number = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) {
      for (const [entryKey, times] of hits) {
        if (times.every((time) => now - time >= windowMs)) hits.delete(entryKey);
      }
    }
    return true;
  };
}
