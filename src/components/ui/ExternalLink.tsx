import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  /** Texte lu par les lecteurs d'écran, ex. « (nouvel onglet) ». */
  newTabLabel: string;
  children: ReactNode;
}

/** Lien vers un site tiers, ouvert dans un nouvel onglet et annoncé comme tel. */
export function ExternalLink({ href, newTabLabel, children, ...rest }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
