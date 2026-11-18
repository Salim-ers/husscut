"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import type { Locale } from "@/i18n/config";
import { equivalentPath } from "@/i18n/routes";

interface LanguageSwitchProps {
  locale: Locale;
  target: Locale;
  /** Texte visible, ex. « EN ». */
  text: string;
  /** Complément lu par les lecteurs d'écran après le texte visible, ex. « Read this page in English ». */
  label: string;
  /** Paires d'ancres [fr, en] pour garder la section en changeant de langue. */
  anchorPairs: readonly (readonly [string, string])[];
  className?: string;
  onNavigate?: () => void;
}

/**
 * Bascule FR/EN vers la page équivalente. Conserve les paramètres neutres (?topic, ?item)
 * et traduit l'ancre courante (#boeuf ↔ #beef). Sans JavaScript, le lien mène à la page équivalente.
 */
export function LanguageSwitch({ locale, target, text, label, anchorPairs, className = "", onNavigate }: LanguageSwitchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const href = equivalentPath(pathname, target);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const { search, hash } = window.location;
    const anchor = hash.replace(/^#/, "");
    const fromIndex = locale === "fr" ? 0 : 1;
    const pair = anchor ? anchorPairs.find((candidate) => candidate[fromIndex] === decodeURIComponent(anchor)) : undefined;
    const translated = pair ? `#${pair[1 - fromIndex]}` : "";
    if (!search && !translated) {
      onNavigate?.();
      return;
    }
    event.preventDefault();
    onNavigate?.();
    router.push(`${href}${search}${translated}`);
  }

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      onClick={handleClick}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ivory/25 px-3 text-sm font-semibold tracking-wide transition-colors hover:border-gold hover:text-gold ${className}`}
    >
      {text}
      <span className="sr-only"> — {label}</span>
    </Link>
  );
}
