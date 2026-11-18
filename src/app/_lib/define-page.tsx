import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PageTransition } from "@/components/motion/PageTransition";
import { JsonLd } from "@/components/shared/JsonLd";
import { isLocale, type Locale } from "@/i18n/config";
import { type Dictionary, getDictionary } from "@/i18n/get-dictionary";
import type { RouteKey } from "@/i18n/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type Params = { params: Promise<{ locale: string }> };

interface PageDefinition {
  route: RouteKey;
  /** Langue unique servie par ce dossier (segments localisés : « viandes » ↔ « meats »). */
  only?: Locale;
  render: (locale: Locale, dict: Dictionary) => ReactNode;
}

function resolveLocale(raw: string, only?: Locale): Locale | null {
  if (!isLocale(raw)) return null;
  if (only && raw !== only) return null;
  return raw;
}

/**
 * Fabrique une page localisée : métadonnées (canonical, hreflang, Open Graph),
 * fil d'Ariane structuré, transition de page et rendu de la fonctionnalité.
 */
export function definePage({ route, only, render }: PageDefinition) {
  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const locale = resolveLocale((await params).locale, only);
    if (!locale) return {};
    const dict = getDictionary(locale);
    const meta = dict.meta[route];
    return pageMetadata({
      locale,
      route,
      title: meta.title,
      description: meta.description,
      absoluteTitle: route === "home",
      siteName: dict.meta.siteName,
      ogAlt: dict.meta.ogAlt,
    });
  }

  async function Page({ params }: Params) {
    const locale = resolveLocale((await params).locale, only);
    if (!locale) notFound();
    const dict = getDictionary(locale);
    return (
      <PageTransition>
        {route !== "home" ? (
          <JsonLd
            data={breadcrumbJsonLd(locale, [
              { route: "home", name: dict.a11y.breadcrumbHome },
              { route, name: dict.meta[route].title },
            ])}
          />
        ) : null}
        {render(locale, dict)}
      </PageTransition>
    );
  }

  return { generateMetadata, Page };
}
