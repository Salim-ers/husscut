import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { fontVariables } from "@/app/fonts";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BOOT_SCRIPT, NeonIntro } from "@/components/motion/NeonIntro";
import { RouteEffects } from "@/components/motion/RouteEffects";
import { JsonLd } from "@/components/shared/JsonLd";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { pathFor } from "@/i18n/routes";
import { plain } from "@/i18n/typography";
import { siteUrl } from "@/lib/site";
import { storeJsonLd } from "@/lib/structured-data";

const MAIN_ID = "contenu";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#171311",
  colorScheme: "dark",
  viewportFit: "cover",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    applicationName: dict.meta.siteName,
    title: { template: plain(dict.meta.titleTemplate), default: plain(dict.meta.home.title) },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <a href={`#${MAIN_ID}`} className="skip-link">
          {dict.a11y.skipToContent}
        </a>
        <NeonIntro />
        <SiteHeader locale={locale} dict={dict} />
        <main id={MAIN_ID} tabIndex={-1}>
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        <CookieBanner copy={dict.cookies.banner} cookiesHref={pathFor(locale, "cookies")} />
        <RouteEffects mainId={MAIN_ID} />
        <JsonLd data={storeJsonLd(locale, plain(dict.meta.home.description))} />
      </body>
    </html>
  );
}
