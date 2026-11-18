import { Knife } from "@/components/ui/Knife";

/**
 * Séparateur animé : à la première entrée dans l'écran, une lame traverse la largeur
 * et laisse derrière elle un fil doré qui vire au rouge. Décoratif.
 */
export function KnifeRule({ className = "" }: { className?: string }) {
  return (
    <div className={`knife-rule ${className}`} data-reveal="knife" aria-hidden="true">
      <span className="knife-rule__line" />
      <span className="knife-rule__track">
        <span className="knife-rule__blade">
          <Knife />
        </span>
      </span>
    </div>
  );
}
