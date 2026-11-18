import { HoursTable } from "@/components/shared/HoursTable";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ExternalIcon, InstagramIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { business } from "@/content/business";
import { listAllProducts } from "@/content/catalogue";
import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { typo } from "@/i18n/typography";
import { ContactForm } from "./components/ContactForm";
import { MapConsent } from "./components/MapConsent";
import { getContactDeliveryMode } from "./lib/delivery-mode";

/** « Contact & commandes » : venir, appeler, écrire. Aucune promesse de prix, stock ou délai. */
export function ContactPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.contact;
  const productNames = Object.fromEntries(listAllProducts().map((product) => [product.id, typo(locale, product.name[locale])]));

  return (
    <>
      <section className="pt-10 pb-20 lg:pt-16 lg:pb-28" aria-labelledby="page-title">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h1 id="page-title" className="display-1">
              {c.title}
            </h1>
            <p className="lede mt-6 max-w-[40ch] text-mute">{c.lede}</p>
            <p className="filet mt-6 max-w-[46ch] text-[0.9875rem]">{c.notice}</p>

            <div id={pageAnchors.visit[locale]} className="mt-14 scroll-mt-24">
              <h2 className="display-3">{c.visit.title}</h2>
              <dl className="mt-6 grid gap-5">
                <div>
                  <dt className="text-sm text-mute">{c.visit.addressLabel}</dt>
                  <dd className="mt-1 text-lg">
                    <address className="not-italic">
                      {business.address.street}, {business.address.postalCode} {business.address.city}
                      <span className="block text-[0.9875rem] text-mute">{dict.home.hero.metro}</span>
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ExternalLink href={business.directionsUrl} newTabLabel={dict.a11y.newTab} className="btn btn-primary">
                  <PinIcon />
                  {dict.actions.startDirections}
                </ExternalLink>
                <a href={`tel:${business.phone.e164}`} className="btn btn-secondary">
                  <PhoneIcon />
                  {dict.actions.callShop}
                </a>
              </div>
              <div className="mt-10 max-w-md">
                <HoursTable locale={locale} dict={dict.hours} />
              </div>
              <div className="mt-10 border-t border-ivory/12 pt-6">
                <h3 className="font-sans text-[0.9875rem] font-semibold tracking-normal">{c.visit.deliveryLabel}</h3>
                <p className="mt-1 text-mute">{c.visit.deliveryText}</p>
                <ul className="mt-2 flex flex-wrap gap-x-6">
                  {business.delivery.map((platform) => (
                    <li key={platform.id}>
                      <ExternalLink href={platform.url} newTabLabel={dict.a11y.newTab} className="link-quiet">
                        {platform.name}
                        <ExternalIcon className="size-4" />
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div id={pageAnchors.requestForm[locale]} className="scroll-mt-24 lg:col-span-6 lg:col-start-7">
            <div className="surface-light rounded-[24px] p-5 sm:p-8 lg:sticky lg:top-28 lg:p-10">
              <h2 className="display-3">{c.form.title}</h2>
              <div className="mt-4">
                <ContactForm
                  locale={locale}
                  mode={getContactDeliveryMode()}
                  copy={c.form}
                  phone={{ e164: business.phone.e164, display: business.phone.display }}
                  callLabel={dict.actions.callShop}
                  productNames={productNames}
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
              <h2 id="map-title" className="display-3">
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
