import Image from "next/image";
import logoFull from "@/assets/brand/logo-full.webp";

/**
 * Script exécuté avant le premier rendu (avant même l'hydratation de React) :
 * - marque <html> pour le CSS (classe « js ») ;
 * - décide si l'intro est jouée : première page vue de la session, mouvement non réduit ;
 * - la termine au premier clic, toucher, défilement ou touche, ou après 1,45 s.
 * Si le stockage de session est indisponible, l'intro est simplement omise.
 */
export const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("js");try{if(sessionStorage.getItem("hc:intro")||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;sessionStorage.setItem("hc:intro","1");d.setAttribute("data-intro","play");var ev=["pointerdown","keydown","wheel","touchstart"],t;function end(){d.setAttribute("data-intro","done");clearTimeout(t);ev.forEach(function(e){window.removeEventListener(e,end,true)})}ev.forEach(function(e){window.addEventListener(e,end,{capture:true,passive:true})});t=setTimeout(end,1450)}catch(e){d.removeAttribute("data-intro")}})();`;

/**
 * Intro « Le néon s'allume » : le vrai logo s'éclaire, une lame dorée traverse l'écran,
 * puis les deux moitiés s'écartent le long de la coupe. Environ 1,3 s, interrompue au
 * premier clic, toucher, défilement ou touche. Purement décorative : hors de l'arbre
 * d'accessibilité, le contenu de la page est déjà rendu dessous.
 */
export function NeonIntro() {
  return (
    <div className="intro" aria-hidden="true" inert>
      <div className="intro__half intro__half--a" />
      <div className="intro__half intro__half--b" />
      <div className="intro__logo">
        <Image src={logoFull} alt="" sizes="(max-width: 560px) 64vw, 352px" loading="lazy" />
      </div>
      <svg className="intro__line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="62" x2="100" y2="38" pathLength={1} />
      </svg>
    </div>
  );
}
