import Image from "next/image";
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
  reveal?: boolean;
  /** Image principale (LCP) : préchargée et prioritaire. */
  eager?: boolean;
  className?: string;
  /** Image purement décorative (alt vide), quand le texte voisin la décrit déjà. */
  decorative?: boolean;
}

/** Cadre photo du site : rayon de 20 ou 24 px, recadrage sur le point focal, révélation optionnelle. */
export function Photo({ photo, locale, sizes, ratio, large, zoom, reveal, eager, className = "", decorative }: PhotoProps) {
  const entry = photos[photo];
  return (
    <div
      className={`photo ${large ? "photo-lg" : ""} ${zoom ? "photo-zoom" : ""} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      data-reveal={reveal ? "" : undefined}
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
