import Link from "next/link";
import { SplitWords } from "@/components/motion/SplitWords";
import { HoursTable } from "@/components/shared/HoursTable";
import { PageHero } from "@/components/shared/PageHero";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ArrowIcon, InstagramIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { business } from "@/content/business";
import { listAllProducts } from "@/content/catalogue";
import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { pathFor } from "@/i18n/routes";
import { typo } from "@/i18n/typography";
import { ContactForm } from "./components/ContactForm";
import { MapConsent } from "./components/MapConsent";
import { getContactDeliveryMode } from "./lib/delivery-mode";

/** « Nous trouver & contact » : venir au comptoir, horaires, plan, et une question à la boutique. */
export function ContactPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.contact;
  const productNames = Object.fromEntries(listAllProducts().map((product) => [product.id, typo(locale, product.name[locale])]));

  return (
    <>
      <PageHero locale={locale} kicker={c.kicker} title={c.title} lede={c.lede} photo="facade" secondPhoto="comptoirInterieur">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ExternalLink href={business.directionsUrl} newTabLabel={dict.a11y.newTab} className="btn btn-primary">
            <PinIcon />
            {dict.actions.startDirections}
          </ExternalLink>
          <a href={`tel:${business.phone.e164}`} className="btn btn-secondary">
            <PhoneIcon />
            {dict.actions.callShop}
          </a>
        </div>
      </PageHero>

      {/* Venir au comptoir */}
      <section id={pageAnchors.visit[locale]} className="surface-light scroll-mt-24 py-20 lg:py-28" aria-labelledby="visit-title">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <p className="kicker" data-reveal="up">
              {dict.nav.contact}
            </p>
            <SplitWords as="h2" id="visit-title" text={c.visit.title} className="display-1 mt-5" />
            <dl className="mt-10 grid gap-6 sm:grid-cols-2" data-reveal="up">
              <div className="sm:col-span-2">
                <dt className="text-sm text-mute-ink">{c.visit.addressLabel}</dt>
                <dd className="mt-1 font-display text-[1.5rem] leading-snug font-semibold tracking-[0.02em]">
                  <address className="not-italic">
                    {business.address.street}
                    <br />
                    {business.address.postalCode} {business.address.city}
                    <span className="mt-1 block font-sans text-[0.9875rem] font-normal tracking-normal text-mute-ink">{dict.home.hero.metro}</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-mute-ink">{c.visit.phoneLabel}</dt>
                <dd className="mt-1 text-lg">
                  <a href={`tel:${business.phone.e164}`} className="link-inline">
                    {business.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-mute-ink">{c.visit.socialLabel}</dt>
                <dd className="mt-1 text-lg">
                  <ExternalLink href={business.instagram.url} newTabLabel={dict.a11y.newTab} className="link-inline inline-flex items-center gap-2">
                    <InstagramIcon />
                    {business.instagram.handle}
                  </ExternalLink>
                </dd>
              </div>
            </dl>
            <div className="mt-12 max-w-md" data-reveal="up">
              <HoursTable locale={locale} dict={dict.hours} tone="light" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 self-start lg:col-span-5 lg:col-start-8">
            <Photo photo="silhouetteNeon" locale={locale} sizes="(min-width: 64rem) 20vw, 46vw" ratio="3 / 4" large reveal className="col-span-2" />
            <Photo photo="cotesMatureesSuspendues" locale={locale} sizes="(min-width: 64rem) 20vw, 46vw" ratio="4 / 5" reveal delay={150} />
            <Photo photo="coteGrilleeBeurre" locale={locale} sizes="(min-width: 64rem) 20vw, 46vw" ratio="4 / 5" reveal delay={300} />
          </div>
        </div>
      </section>

      {/* Une question */}
      <section className="bg-char py-20 lg:py-28" aria-labelledby="question-title">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <SplitWords as="h2" id="question-title" text={c.question.title} className="display-1" />
            <p className="lede mt-6 max-w-[40ch] text-mute" data-reveal="up">
              {c.question.text}
            </p>
            <Link href={pathFor(locale, "order")} className="btn btn-primary mt-8">
              {c.question.orderLink}
              <ArrowIcon />
            </Link>
            <div className="mt-12 border-t border-ivory/12 pt-6">
              <h3 className="font-sans text-[0.9875rem] font-semibold tracking-normal">{c.visit.deliveryLabel}</h3>
              <p className="mt-1 text-mute">{c.visit.deliveryText}</p>
              <Link href={`${pathFor(locale, "order")}#${pageAnchors.delivery[locale]}`} className="link-quiet">
                {business.delivery.map((platform) => platform.name).join(" · ")}
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <div id={pageAnchors.requestForm[locale]} className="scroll-mt-28 lg:col-span-6 lg:col-start-7">
            <div className="surface-light rounded-[24px] p-5 sm:p-8 lg:p-10">
              <h3 className="display-3">{c.form.title}</h3>
              <div className="mt-4">
                <ContactForm
                  locale={locale}
                  mode={getContactDeliveryMode()}
                  copy={c.form}
                  phone={{ e164: business.phone.e164, display: business.phone.display }}
                  callLabel={dict.actions.callShop}
                  productNames={productNames}
                  defaultTopic="question"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id={pageAnchors.map[locale]} className="scroll-mt-24 border-t border-ivory/10 py-16 lg:py-24" aria-labelledby="map-title">
        <div className="container-site">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="map-title" className="display-2">
                {c.map.title}
              </h2>
              <p className="mt-2 text-mute">{c.map.alternative}</p>
            </div>
            <ExternalLink href={business.directionsUrl} newTabLabel={dict.a11y.newTab} className="btn btn-secondary self-start sm:self-auto">
              <PinIcon />
              {dict.actions.startDirections}
            </ExternalLink>
          </div>
          <MapConsent embedUrl={business.mapEmbedUrl} copy={c.map} />
        </div>
      </section>
    </>
  );
}
