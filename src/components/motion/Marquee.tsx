import type { CSSProperties } from "react";
import { Knife } from "@/components/ui/Knife";

interface MarqueeProps {
  items: readonly string[];
  /** « crimson » : bandeau rouge boucherie ; « ink » : bandeau ardoise, mots en italique dorée. */
  variant?: "crimson" | "ink";
  reverse?: boolean;
  /** Durée d'un tour complet, en secondes. */
  duration?: number;
  className?: string;
}

/**
 * Bandeau qui défile sans fin, mots séparés par un petit couteau. Décoratif : les rayons
 * cités sont tous présents ailleurs dans la page, le bandeau est donc masqué aux lecteurs d'écran.
 * À l'arrêt en mouvement réduit ; en pause au survol.
 */
export function Marquee({ items, variant = "crimson", reverse, duration = 38, className = "" }: MarqueeProps) {
  const track = (key: string) => (
    <div className="marquee__track" key={key}>
      {items.map((item, index) => (
        <span key={`${key}-${index}`} className="marquee__item">
          <span className={`marquee-word ${variant === "ink" ? "marquee-word--serif" : ""}`}>{item}</span>
          <span className={`w-14 flex-none ${variant === "ink" ? "text-red" : "text-gold"}`}>
            <Knife />
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      aria-hidden="true"
      className={`marquee-band ${variant === "ink" ? "marquee-band--ink" : ""} ${className}`}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee" data-direction={reverse ? "reverse" : undefined}>
        {track("a")}
        {track("b")}
      </div>
    </div>
  );
}
