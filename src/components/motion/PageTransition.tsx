import { type ReactNode, ViewTransition } from "react";

/**
 * Transition « La coupe » entre deux pages : React déclenche la View Transition du
 * navigateur lors de chaque navigation (liens, retour/avance). Le CSS (classe « cut »)
 * révèle la nouvelle page par un bord diagonal. Sans prise en charge, rien ne change.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="cut" exit="cut" default="none">
      <div className="bg-ink">{children}</div>
    </ViewTransition>
  );
}
