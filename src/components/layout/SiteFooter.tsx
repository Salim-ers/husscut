import Image from "next/image";
import Link from "next/link";
import logoFull from "@/assets/brand/logo-full.webp";
import { KnifeRule } from "@/components/motion/KnifeRule";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ArrowIcon, ExternalIcon, InstagramIcon, PhoneIcon } from "@/components/ui/icons";
import { RichText } from "@/components/ui/RichText";
import { business } from "@/content/business";
import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { pathFor, siteMap } from "@/i18n/routes";
import { format } from "@/i18n/typography";

const BUILD_YEAR = new Date().getFullYear();

/** Pied de page commun à toutes les pages publiques, crédit QuadCore compris. */
export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const visitHref = `${pathFor(locale, "contact")}#${pageAnchors.visit[locale]}`;
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-ink pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_80%_at_50%_100%,color-mix(in_srgb,var(--color-crimson)_30%,transparent),transparent_70%)]"
      />
      <div className="container-site relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-4">
          <Image src={logoFull} alt="HussCut" sizes="176px" className="h-auto w-44" />
          <p className="awning mt-6 text-sm text-ivory">{dict.footer.awning}</p>
          <p className="mt-2 max-w-xs text-mute">
            <RichText text={dict.footer.tagline} />
          </p>
          <Link href={pathFor(locale, "order")} className="btn btn-primary nav-cta mt-8">
            {dict.actions.order}
            <ArrowIcon />
          </Link>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-xs font-semibold tracking-[0.26em] text-gold uppercase">{dict.footer.visit}</h2>
          <address className="mt-4 not-italic">
            {business.address.street}
            <br />
            {business.address.postalCode} {business.address.city}
            <br />
            <span className="text-mute">{dict.home.hero.metro}</span>
          </address>
          <p className="mt-4">
            <a href={`tel:${business.phone.e164}`} className="link-quiet text-ivory">
              <PhoneIcon />
              {business.phone.display}
            </a>
          </p>
          <p>
            <Link href={visitHref} className="link-quiet">
              {dict.hours.title}
            </Link>
          </p>
        </div>

        <nav aria-label={dict.a11y.footerNavigation} className="lg:col-span-2">
          <h2 className="font-sans text-xs font-semibold tracking-[0.26em] text-gold uppercase">{dict.footer.explore}</h2>
          <ul className="mt-3">
            {siteMap.map((key) => (
              <li key={key}>
                <Link href={pathFor(locale, key)} className="inline-flex min-h-11 items-center transition-colors hover:text-gold">
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-xs font-semibold tracking-[0.26em] text-gold uppercase">{dict.footer.follow}</h2>
          <ul className="mt-3">
            <li>
              <ExternalLink href={business.instagram.url} newTabLabel={dict.a11y.newTab} className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-gold">
                <InstagramIcon />
                Instagram {business.instagram.handle}
              </ExternalLink>
            </li>
            {business.delivery.map((platform) => (
              <li key={platform.id}>
                <ExternalLink href={platform.url} newTabLabel={dict.a11y.newTab} className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-gold">
                  {format(dict.footer.deliveryItem, { name: platform.name })}
                  <ExternalIcon className="size-4 text-mute" />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* L'enseigne de la façade, en capitales romaines : « HUSSCUT · PARIS ». */}
      <div className="container-site relative" aria-hidden="true">
        <KnifeRule />
        <p
          className="deco-text mt-6 text-center font-display text-[clamp(2.5rem,0.5rem+11vw,15rem)] leading-[0.9] font-semibold tracking-[0.06em] text-ivory/10 select-none"
          data-text={business.name.toUpperCase()}
        />
        <p className="deco-text mt-2 text-center font-display text-sm font-semibold tracking-[0.6em] text-gold/70" data-text="PARIS" />
      </div>

      <div className="container-site relative mt-10 flex flex-col gap-4 border-t border-ivory/10 py-6 text-sm text-mute lg:flex-row lg:items-center lg:justify-between">
        <p>
          © {BUILD_YEAR} {dict.footer.rights}
        </p>
        <nav aria-label={dict.a11y.legalNavigation}>
          <ul className="flex flex-wrap gap-x-6">
            {(["legal", "privacy", "cookies"] as const).map((key) => (
              <li key={key}>
                <Link href={pathFor(locale, key)} className="inline-flex min-h-11 items-center hover:text-ivory">
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p data-credit>
          {dict.footer.credit}{" "}
          <ExternalLink href={business.credits.url} newTabLabel={dict.a11y.newTab} className="link-inline text-ivory">
            {business.credits.studio}
          </ExternalLink>
        </p>
      </div>
    </footer>
  );
}
