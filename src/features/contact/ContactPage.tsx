import Link from "next/link";
import { SplitWords } from "@/components/motion/SplitWords";
import { HoursTable } from "@/components/shared/HoursTable";
import { PageHero } from "@/components/shared/PageHero";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ArrowIcon, ExternalIcon, InstagramIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { Knife } from "@/components/ui/Knife";
import { Photo } from "@/components/ui/Photo";
import { business } from "@/content/business";
import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { pathFor } from "@/i18n/routes";
import { format } from "@/i18n/typography";
import { MapConsent } from "./components/MapConsent";

/**
 * « Nous trouver » : venir au comptoir, horaires, plan. Pas de formulaire ici : toute demande
 * (question, commande, coffret) passe par la page « Commander » ou par téléphone.
 */
export function ContactPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.contact;

  return (
    <>
      <PageHero locale={locale} kicker={c.kicker} title={c.title} lede={c.lede} photo="facade">
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
      <section id={pageAnchors.visit[locale]} className="section scroll-mt-24" aria-labelledby="visit-title">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <SplitWords as="h2" id="visit-title" text={c.visit.title} className="display-1" />
            <dl className="mt-10 grid gap-6 sm:grid-cols-2" data-reveal="up">
              <div className="sm:col-span-2">
                <dt className="text-sm text-mute">{c.visit.addressLabel}</dt>
                <dd className="mt-1 font-display text-[1.5rem] leading-snug font-semibold tracking-[0.02em]">
                  <address className="not-italic">
                    {business.address.street}
                    <br />
                    {business.address.postalCode} {business.address.city}
                    <span className="mt-1 block font-sans text-[0.9875rem] font-normal tracking-normal text-mute">{dict.home.hero.metro}</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-mute">{c.visit.phoneLabel}</dt>
                <dd className="mt-1 text-lg">
                  <a href={`tel:${business.phone.e164}`} className="link-inline">
                    {business.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-mute">{c.visit.socialLabel}</dt>
                <dd className="mt-1 text-lg">
                  <ExternalLink href={business.instagram.url} newTabLabel={dict.a11y.newTab} className="link-inline inline-flex items-center gap-2">
                    <InstagramIcon />
                    {business.instagram.handle}
                  </ExternalLink>
                </dd>
              </div>
            </dl>
            <div className="mt-12 max-w-md" data-reveal="up">
              <HoursTable locale={locale} dict={dict.hours} />
            </div>
          </div>
          <div className="self-start lg:col-span-5 lg:col-start-8">
            <Photo photo="silhouetteNeon" locale={locale} sizes="(min-width: 64rem) 36vw, 92vw" ratio="4 / 5" large reveal />
          </div>
        </div>
      </section>

      {/* Une demande : tout passe par « Commander » */}
      <section className="pb-8" aria-labelledby="question-title">
        <div className="container-site">
          <div className="panel-blood grid gap-10 p-7 sm:p-12 lg:grid-cols-12 lg:items-end lg:gap-6 lg:p-16">
            <div className="lg:col-span-7">
              <span className="block w-24 text-gold" data-reveal="up" aria-hidden="true">
                <Knife />
              </span>
              <SplitWords as="h2" id="question-title" text={c.question.title} className="display-1 mt-6" />
              <p className="lede mt-6 max-w-[44ch] text-ivory/85">{c.question.text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={pathFor(locale, "order")} className="btn btn-primary">
                  {c.question.orderLink}
                  <ArrowIcon />
                </Link>
                <a href={`tel:${business.phone.e164}`} className="btn btn-secondary">
                  <PhoneIcon />
                  {business.phone.display}
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <h3 className="font-sans text-[0.9875rem] font-semibold tracking-normal">{c.visit.deliveryLabel}</h3>
              <p className="mt-1 text-ivory/75">{c.visit.deliveryText}</p>
              <ul className="mt-3" role="list">
                {business.delivery.map((platform) => (
                  <li key={platform.id}>
                    <ExternalLink href={platform.url} newTabLabel={dict.a11y.newTab} className="link-quiet">
                      {format(dict.order.delivery.cta, { name: platform.name })}
                      <ExternalIcon className="size-4" />
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id={pageAnchors.map[locale]} className="section scroll-mt-24" aria-labelledby="map-title">
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
