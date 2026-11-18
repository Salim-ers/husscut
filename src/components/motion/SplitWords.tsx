import type { CSSProperties, ReactNode } from "react";
import { RichText } from "@/components/ui/RichText";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface SplitWordsProps {
  text: string;
  as?: Tag;
  id?: string;
  className?: string;
  /**
   * « scroll » : les mots montent à la première entrée dans l'écran (RouteEffects).
   * « load » : dès l'affichage, en CSS pur (titres de haut de page, sans attendre le script).
   */
  mode?: "scroll" | "load";
  /** Retard supplémentaire, en millisecondes. */
  delay?: number;
}

/**
 * Titre dont chaque mot sort de sous sa ligne, comme tranché. Le texte reste un texte
 * continu pour les lecteurs d'écran (simples <span> en ligne). Gère « *relief* » et « ^e ».
 */
export function SplitWords({ text, as: Component = "h2", id, className = "", mode = "scroll", delay = 0 }: SplitWordsProps) {
  const nodes: ReactNode[] = [];
  let index = 0;
  text.split(/\*([^*]+)\*/).forEach((segment, segmentIndex) => {
    const accent = segmentIndex % 2 === 1;
    segment.split(" ").forEach((word, wordIndex) => {
      if (wordIndex > 0) nodes.push(" ");
      if (!word) return;
      const style = { "--w": index } as CSSProperties;
      nodes.push(
        <span key={`${segmentIndex}-${wordIndex}`} className="w">
          <span className={accent ? "accent" : undefined} style={style}>
            <RichText text={word} />
          </span>
        </span>,
      );
      index += 1;
    });
  });

  return (
    <Component
      id={id}
      className={`${className} ${mode === "load" ? "split-load" : ""}`.trim()}
      data-reveal={mode === "scroll" ? "words" : undefined}
      style={delay ? ({ "--d": delay } as CSSProperties) : undefined}
    >
      {nodes}
    </Component>
  );
}
