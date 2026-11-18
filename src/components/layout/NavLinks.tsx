"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

export interface NavItem {
  href: string;
  label: string;
  /** Entrée mise en avant comme bouton d'action (« Commander »). */
  cta?: boolean;
}

/** Liens du menu principal, avec aria-current sur la page affichée. */
export function NavLinks({ items, variant, onNavigate }: { items: readonly NavItem[]; variant: "bar" | "panel"; onNavigate?: () => void }) {
  const pathname = usePathname();

  if (variant === "bar") {
    return (
      <ul className="flex items-center gap-0.5 xl:gap-1.5">
        {items.map((item) => {
          const current = pathname === item.href;
          return (
            <li key={item.href} className={item.cta ? "ml-3" : undefined}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={onNavigate}
                className={item.cta ? "btn btn-primary btn-sm nav-cta" : "nav-link"}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="menu-stagger flex flex-col">
      {items.map((item, index) => {
        const current = pathname === item.href;
        return (
          <li key={item.href} style={{ "--i": index } as CSSProperties}>
            <Link href={item.href} aria-current={current ? "page" : undefined} onClick={onNavigate} className={`menu-link ${item.cta ? "text-gold" : ""}`}>
              <span className="index-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
