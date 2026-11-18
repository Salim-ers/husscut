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

const anchorPairs = [
  ...Object.values(pageAnchors),
  ...meatCategories.map((category) => category.anchor),
  ...charcuterieGroups.map((group) => group.anchor),
].map((anchor) => [anchor.fr, anchor.en] as const);

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = mainNavigation.map((key) => ({ href: pathFor(locale, key), label: dict.nav[key] }));
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
    <header className="sticky top-0 z-50 border-b border-ivory/10 bg-ink/95" style={{ viewTransitionName: "site-header" }}>
      <div className="container-site flex h-16 items-center justify-between gap-3 lg:h-[4.75rem]">
        <BrandLink href={homeHref} label={dict.a11y.homeLink} />

        <nav aria-label={dict.a11y.mainNavigation} className="hidden lg:block">
          <NavLinks items={items} variant="bar" />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">{switcher}</div>
          <a href={`tel:${business.phone.e164}`} className="btn btn-secondary btn-sm px-3 sm:px-4">
            <PhoneIcon />
            <span className="max-[359px]:sr-only lg:hidden">{dict.actions.call}</span>
            <span className="hidden lg:inline">{business.phone.display}</span>
          </a>
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
    </header>
  );
}
