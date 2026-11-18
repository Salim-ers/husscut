import { Fragment } from "react";

/**
 * Affiche un texte du dictionnaire en convertissant « 11^e » en 11<sup>e</sup>.
 * Les polices utilisées n'ont pas le caractère « ᵉ » : l'exposant HTML garantit le rendu.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\^(\w+)/);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, index) => (index % 2 === 1 ? <sup key={index}>{part}</sup> : <Fragment key={index}>{part}</Fragment>))}
    </>
  );
}
