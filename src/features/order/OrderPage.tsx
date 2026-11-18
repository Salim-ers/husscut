import type { CSSProperties } from "react";
import { KnifeRule } from "@/components/motion/KnifeRule";
import { SplitWords } from "@/components/motion/SplitWords";
import { HoursTable } from "@/components/shared/HoursTable";
import { PageHero } from "@/components/shared/PageHero";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ArrowIcon, ExternalIcon, PhoneIcon } from "@/components/ui/icons";
import { Knife } from "@/components/ui/Knife";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { business } from "@/content/business";
import { listAllProducts } from "@/content/catalogue";
import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { format, typo } from "@/i18n/typography";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { getContactDeliveryMode } from "@/features/contact/lib/delivery-mode";

/**
 * « Commander » : une demande de commande est une prise de contact que la boutique confirme.
 * Ni prix, ni panier, ni paiement, ni délai promis. Trois voies : retrait au comptoir
 * (demande par SMS ou e-mail), planches et coffrets, livraison via les plateformes.
 */
export function OrderPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const o = dict.order;
  const productNames = Object.fromEntries(listAllProducts().map((product) => [product.id, typo(locale, product.name[locale])]));
  const formAnchor = pageAnchors.requestForm[locale];

  return (
    <>
      <PageHero locale={locale} kicker={o.kicker} title={o.title} lede={o.lede} photo="cotesNeonPlanche" secondPhoto="coffretCharcuterieFleurs">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`#${formAnchor}`} className="btn btn-primary">
            {o.formTitle}
            <ArrowIcon />
          </a>
          <a href={`#${pageAnchors.delivery[locale]}`} className="btn btn-secondary">
            {o.delivery.kicker}
          </a>
        </div>
      </PageHero>

      {/* Comment ça se passe */}
      <section id={pageAnchors.steps[locale]} className="surface-light scroll-mt-24 py-20 lg:py-28" aria-labelledby="steps-title">
        <div className="container-site">
          <SplitWords as="h2" id="steps-title" text={o.steps.title} className="display-1 max-w-[18ch]" />
          <ol className="mt-14 grid gap-6 md:grid-cols-3" role="list">
            {o.steps.items.map((step, index) => (
              <li
                key={step.title}
                data-reveal="up"
                style={{ "--d": index * 150 } as CSSProperties}
                className="relative flex flex-col gap-5 rounded-[24px] border border-ink/12 bg-paper p-7 sm:p-9"
              >
                <span className="font-display text-[3.5rem] leading-none font-semibold text-crimson">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="display-3">{step.title}</h3>
                <p className="text-mute-ink">{step.text}</p>
                {index < o.steps.items.length - 1 ? (
                  <span className="absolute top-12 -right-7 z-10 hidden w-12 text-bronze md:block" aria-hidden="true">
                    <Knife />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="filet mt-12 max-w-[64ch] text-[0.9875rem] text-mute-ink" data-reveal="up">
            {o.notice}
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="bg-char py-20 lg:py-28" aria-labelledby="order-form-title">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SplitWords as="h2" id="order-form-title" text={o.formTitle} className="display-1" />
              <div className="mt-10 rounded-[24px] border border-ivory/12 bg-ink/50 p-6 sm:p-8">
                <h3 className="font-display text-[1.25rem] font-semibold tracking-[0.03em]">{o.call.title}</h3>
                <p className="mt-2 text-mute">{o.call.text}</p>
                <a href={`tel:${business.phone.e164}`} className="btn btn-secondary mt-5">
                  <PhoneIcon />
                  {business.phone.display}
                </a>
                <div className="mt-8">
                  <HoursTable locale={locale} dict={dict.hours} withNote={false} />
                </div>
              </div>
            </div>
          </div>
          <div id={formAnchor} className="scroll-mt-28 lg:col-span-6 lg:col-start-7">
            <div className="surface-light rounded-[24px] p-5 sm:p-8 lg:p-10">
              <ContactForm
                locale={locale}
                mode={getContactDeliveryMode()}
                copy={dict.contact.form}
                phone={{ e164: business.phone.e164, display: business.phone.display }}
                callLabel={dict.actions.callShop}
                productNames={productNames}
                defaultTopic="availability"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Planches et coffrets */}
      <section className="glow-red overflow-x-clip py-20 lg:py-28" aria-labelledby="order-platters-title">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-6">
            <Photo photo="grandCoffretFromages" locale={locale} sizes="(min-width: 64rem) 16vw, 30vw" ratio="3 / 5" reveal className="-rotate-2" />
            <Photo photo="coffretNoirFleurs" locale={locale} sizes="(min-width: 64rem) 16vw, 30vw" ratio="3 / 5" reveal delay={150} className="mt-10" />
            <Photo photo="rosaceCharcuterie" locale={locale} sizes="(min-width: 64rem) 16vw, 30vw" ratio="3 / 5" reveal delay={300} className="rotate-2" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="kicker" data-reveal="up">
              {o.platters.kicker}
            </p>
            <SplitWords as="h2" id="order-platters-title" text={o.platters.title} className="display-1 mt-5" />
            <p className="lede mt-6 max-w-[40ch] text-mute" data-reveal="up">
              {o.platters.text}
            </p>
            {/* Lien complet (rechargement) : le formulaire lit le sujet dans l'adresse à son montage. */}
            <a href={`?topic=platter#${formAnchor}`} className="btn btn-primary mt-8">
              {o.platters.cta}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Livraison */}
      <section id={pageAnchors.delivery[locale]} className="surface-blood scroll-mt-24 py-20 lg:py-28" aria-labelledby="delivery-title">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-6">
            <p className="kicker" data-reveal="up">
              {o.delivery.kicker}
            </p>
            <h2 id="delivery-title" className="display-1 mt-5">
              <RichText text={o.delivery.title} />
            </h2>
            <p className="lede mt-6 max-w-[42ch] text-ivory/90" data-reveal="up">
              {o.delivery.text}
            </p>
          </div>
          <ul className="grid gap-4 lg:col-span-5 lg:col-start-8" role="list">
            {business.delivery.map((platform, index) => (
              <li key={platform.id} data-reveal="up" style={{ "--d": index * 120 } as CSSProperties}>
                <ExternalLink
                  href={platform.url}
                  newTabLabel={dict.a11y.newTab}
                  className="group flex min-h-20 items-center justify-between gap-4 rounded-[20px] border border-ivory/15 bg-ink/40 px-6 py-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-gold/60"
                >
                  <span className="font-display text-[1.375rem] font-semibold tracking-[0.04em]">{format(o.delivery.cta, { name: platform.name })}</span>
                  <ExternalIcon className="size-5 text-gold" />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-site mt-16">
          <KnifeRule />
        </div>
      </section>
    </>
  );
}
