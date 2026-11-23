import Link from "next/link";
import { business } from "@/content/business";
import { InstagramIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { charcuterieGroups, meatCategories } from "@/content/catalogue";
import { pageAnchors } from "@/i18n/anchors";
import { type Locale, otherLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { mainNavigation, pathFor } from "@/i18n/routes";
import { BrandLink } from "./BrandLink";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ScrollChrome } from "./ScrollChrome";

const anchorPairs = [
  ...Object.values(pageAnchors),
  ...meatCategories.map((category) => category.anchor),
  ...charcuterieGroups.map((group) => group.anchor),
].map((anchor) => [anchor.fr, anchor.en] as const);

/**
 * En-tête fixe : transparent sur le haut de page, puis capsule vitrée qui s'efface en
 * descendant et revient en remontant (ScrollChrome). « Commander » est l'action principale.
 */
export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = mainNavigation.map((key) => ({ href: pathFor(locale, key), label: dict.nav[key], cta: key === "order" }));
  const target = otherLocale(locale);
  const homeHref = pathFor(locale, "home");

  const switcher = (
    <LanguageSwitch
      locale={locale}
      target={target}
      text={dict.language.target}
      label={dict.a11y.switchLanguage}
      anchorPairs={anchorPairs}
    />
  );

  return (
    <header className="site-header">
      <div className="container-site">
        <div className="site-header__bar">
          <BrandLink href={homeHref} label={dict.a11y.homeLink} />

          <nav aria-label={dict.a11y.mainNavigation} className="hidden lg:block">
            <NavLinks items={items} variant="bar" />
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden lg:block">{switcher}</div>
            <a
              href={`tel:${business.phone.e164}`}
              className="hidden size-11 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:text-gold lg:inline-flex"
              aria-label={`${dict.actions.callShop} ${business.phone.display}`}
            >
              <PhoneIcon />
            </a>
            <Link href={pathFor(locale, "order")} className="btn btn-primary nav-cta header-cta lg:hidden">
              {dict.actions.order}
            </Link>
            <MobileMenu
              items={items}
              labels={{ open: dict.a11y.openMenu, close: dict.a11y.closeMenu, navigation: dict.a11y.mainNavigation }}
              brand={<BrandLink href={homeHref} label={dict.a11y.homeLink} />}
              footer={
                <div className="flex flex-col gap-3">
                  <a href={`tel:${business.phone.e164}`} className="btn btn-primary w-full">
                    <PhoneIcon />
                    {dict.actions.callShop}
                    <span className="font-normal">{business.phone.display}</span>
                  </a>
                  <ExternalLink href={business.directionsUrl} newTabLabel={dict.a11y.newTab} className="btn btn-secondary w-full">
                    <PinIcon />
                    {dict.actions.startDirections}
                  </ExternalLink>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <ExternalLink href={business.instagram.url} newTabLabel={dict.a11y.newTab} className="link-quiet">
                      <InstagramIcon />
                      {business.instagram.handle}
                    </ExternalLink>
                    {switcher}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
      <ScrollChrome />
    </header>
  );
}
