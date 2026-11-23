"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { NavLinks, type NavItem } from "./NavLinks";

interface MobileMenuProps {
  items: readonly NavItem[];
  labels: { open: string; close: string; navigation: string };
  /** Logo affiché en tête du panneau. */
  brand: ReactNode;
  /** Actions rapides (appel, itinéraire, Instagram) et sélecteur de langue. */
  footer: ReactNode;
}

/**
 * Menu mobile plein écran en <dialog> natif : focus piégé, Échap, fond inerte et retour du
 * focus sur le bouton d'ouverture sont gérés par le navigateur. Ouverture par une coupe
 * diagonale, liens qui montent l'un après l'autre (sauf mouvement réduit).
 */
export function MobileMenu({ items, labels, brand, footer }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        className="header-icon-btn lg:hidden"
        aria-haspopup="dialog"
        aria-controls="menu-mobile"
        aria-label={labels.open}
        onClick={() => dialogRef.current?.showModal()}
      >
        <MenuIcon />
      </button>
      <dialog
        ref={dialogRef}
        id="menu-mobile"
        className="menu-dialog lg:hidden"
        aria-label={labels.navigation}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="flex min-h-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="container-site flex h-[var(--header-h)] items-center justify-between">
            {brand}
            <button
              type="button"
              className="header-icon-btn"
              aria-label={labels.close}
              onClick={close}
              autoFocus
            >
              <CloseIcon />
            </button>
          </div>
          <nav aria-label={labels.navigation} className="container-site mt-6">
            <NavLinks items={items} variant="panel" onNavigate={close} />
          </nav>
          <div className="container-site mt-auto pt-10">{footer}</div>
        </div>
      </dialog>
    </>
  );
}
