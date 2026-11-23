import type { ReactNode } from "react";

/**
 * Entrée de page « La coupe » : à chaque navigation, la nouvelle page est montée à neuf ;
 * elle apparaît en fondu avec une légère montée, pendant qu'un fil doré traverse le haut de
 * l'écran comme une lame. Uniquement opacity et transform (composités, sans capture d'écran
 * de la page entière comme le faisaient les View Transitions) : fluide même sur téléphone.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="page-enter">
      <span className="page-enter__blade" aria-hidden="true" />
      {children}
    </div>
  );
}
