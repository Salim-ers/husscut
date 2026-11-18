import Image from "next/image";
import type { CSSProperties } from "react";
import { photos, type PhotoKey } from "@/content/media";
import type { Locale } from "@/i18n/config";

interface PhotoProps {
  photo: PhotoKey;
  locale: Locale;
  /** Attribut sizes de l'image responsive. */
  sizes: string;
  /** Ratio CSS du cadre, ex. "4 / 5". */
  ratio?: string;
  large?: boolean;
  zoom?: boolean;
  /** Apparition par volet diagonal à la première entrée dans l'écran. */
  reveal?: boolean;
  /** Retard de l'apparition, en millisecondes (cascades). */
  delay?: number;
  /** Image principale (LCP) : préchargée et prioritaire, avec un léger recadrage à l'affichage. */
  eager?: boolean;
  /** Parallaxe douce au défilement (l'image glisse dans son cadre). */
  parallax?: boolean;
  className?: string;
  /** Image purement décorative (alt vide), quand le texte voisin la décrit déjà. */
  decorative?: boolean;
}

/** Cadre photo du site : rayon de 20 ou 24 px, recadrage sur le point focal, mouvements optionnels. */
export function Photo({ photo, locale, sizes, ratio, large, zoom, reveal, delay, eager, parallax, className = "", decorative }: PhotoProps) {
  const entry = photos[photo];
  const style: CSSProperties & Record<string, string | number> = {};
  if (ratio) style.aspectRatio = ratio;
  if (delay) style["--d"] = delay;
  return (
    <div
      className={`photo ${large ? "photo-lg" : ""} ${zoom ? "photo-zoom" : ""} ${eager ? "load-photo" : ""} ${parallax ? "parallax" : ""} ${className}`}
      style={style}
      data-reveal={reveal ? "photo" : undefined}
      data-progress={parallax ? "" : undefined}
    >
      <Image
        src={entry.src}
        alt={decorative ? "" : entry.alt[locale]}
        sizes={sizes}
        quality={78}
        preload={eager}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "low"}
        placeholder={eager ? "empty" : "blur"}
        className="h-full w-full object-cover"
        style={{ objectPosition: entry.focus }}
      />
    </div>
  );
}
