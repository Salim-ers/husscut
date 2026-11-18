/**
 * Couteau de boucher stylisé (manche à rivets dorés, lame d'acier), pointe à droite.
 * La pointe est à 99,5 % de la largeur et 61 % de la hauteur : les scènes animées s'y alignent.
 * Purement décoratif : toujours masqué aux technologies d'assistance.
 */
export function Knife({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 36" className={`knife-svg ${className}`} aria-hidden="true" focusable="false">
      <rect x="2" y="12" width="58" height="13" rx="6.5" className="fill-char stroke-current" strokeWidth="1" />
      <circle cx="17" cy="18.5" r="1.8" className="fill-current" />
      <circle cx="31" cy="18.5" r="1.8" className="fill-current" />
      <circle cx="45" cy="18.5" r="1.8" className="fill-current" />
      <path d="M60 10.5h6v16h-6z" className="fill-current" />
      <path d="M66 9.5 170 11c16 .5 26 5 29 11-13 5.5-79 6-133 5.5Z" className="fill-steel" />
      <path d="M68 12.2 168 13.4" className="stroke-ivory" strokeOpacity="0.45" strokeWidth="0.7" fill="none" />
      <path d="M70 26.2c50 .4 105 0 126-4" className="stroke-steel-dark" strokeWidth="0.9" fill="none" />
    </svg>
  );
}

/** Petit couteau pointé vers le bas (indicateur de défilement, séparateurs). */
export function KnifeDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 120" className={`knife-svg ${className}`} aria-hidden="true" focusable="false">
      <rect x="11.5" y="2" width="13" height="38" rx="6.5" className="fill-char stroke-current" strokeWidth="1" />
      <circle cx="18" cy="13" r="1.6" className="fill-current" />
      <circle cx="18" cy="27" r="1.6" className="fill-current" />
      <path d="M10 40h16v5H10z" className="fill-current" />
      <path d="M10 45h16c.6 30-1.5 56-8 73-6-17-8.5-43-8-73Z" className="fill-steel" />
    </svg>
  );
}
