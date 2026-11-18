"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  href: string;
  label: string;
}

/** Liens du menu principal, avec aria-current sur la page affichée. */
export function NavLinks({ items, variant, onNavigate }: { items: readonly NavItem[]; variant: "bar" | "panel"; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className={variant === "bar" ? "flex items-center gap-1 xl:gap-2" : "flex flex-col"}>
      {items.map((item) => {
        const current = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
              className={
                variant === "bar"
                  ? `inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9875rem] font-medium transition-colors hover:text-gold ${
                      current ? "text-gold underline decoration-gold decoration-1 underline-offset-[0.45em]" : "text-ivory"
                    }`
                  : `font-display flex min-h-14 items-center border-b border-ivory/10 py-3 text-[2.125rem] leading-none font-semibold ${
                      current ? "text-gold" : "text-ivory"
                    }`
              }
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
