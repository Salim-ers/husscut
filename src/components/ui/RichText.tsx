import { Fragment, type ReactNode } from "react";

/** Convertit « 11^e » en 11<sup>e</sup> (les polices n'ont pas le caractère « ᵉ »). */
function withSup(text: string, keyPrefix: string): ReactNode {
  const parts = text.split(/\^(\w+)/);
  if (parts.length === 1) return text;
  return parts.map((part, index) => (index % 2 === 1 ? <sup key={`${keyPrefix}-${index}`}>{part}</sup> : <Fragment key={`${keyPrefix}-${index}`}>{part}</Fragment>));
}

/**
 * Affiche un texte du dictionnaire :
 * - « 11^e » → exposant ;
 * - « *mots* » → mise en relief éditoriale (italique Cormorant, classe « accent »).
 */
export function RichText({ text }: { text: string }) {
  const segments = text.split(/\*([^*]+)\*/);
  if (segments.length === 1) return <>{withSup(text, "t")}</>;
  return (
    <>
      {segments.map((segment, index) =>
        index % 2 === 1 ? (
          <span key={index} className="accent">
            {withSup(segment, `a${index}`)}
          </span>
        ) : (
          <Fragment key={index}>{withSup(segment, `t${index}`)}</Fragment>
        ),
      )}
    </>
  );
}
