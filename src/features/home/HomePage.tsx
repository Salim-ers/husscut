import Image from "next/image";
import Link from "next/link";
import { HoursTable } from "@/components/shared/HoursTable";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ArrowIcon, ExternalIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { business } from "@/content/business";
import { meatCategories } from "@/content/catalogue";
import { photos, type PhotoKey } from "@/content/media";
import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { pathFor } from "@/i18n/routes";
import { GoogleReviews } from "@/features/reviews/GoogleReviews";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export function HomePage({ locale, dict }: Props) {
  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Universes locale={locale} dict={dict} />
      <Gesture locale={locale} dict={dict} />
      <GoogleReviews locale={locale} dict={dict.reviews} newTabLabel={dict.a11y.newTab} />
      <Visit locale={locale} dict={dict} />
    </>
  );
}

/* ---- Hero « Du néon au billot » ------------------------------------------- */
function Hero({ locale, dict }: Props) {
  const hero = dict.home.hero;
  const photo = photos.heroCoteBillotNeon;
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-site grid gap-10 pt-8 pb-16 sm:pt-12 lg:min-h-[calc(100svh-4.75rem)] lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-10">
        <div className="relative z-10 lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <h1 id="hero-title" className="display-1">
            {hero.titleLines.map((line) => (
              <span key={line} className="hero-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-after lede mt-5 max-w-[34ch] text-mute">
            <RichText text={hero.subtitle} />
          </p>
          <div className="hero-after mt-8 flex flex-col gap-3 min-[460px]:flex-row min-[460px]:flex-wrap">
            <Link href={pathFor(locale, "meats")} className="btn btn-primary">
              {hero.primary}
              <ArrowIcon />
            </Link>
            <Link href={`${pathFor(locale, "contact")}#${pageAnchors.visit[locale]}`} className="btn btn-secondary">
              {hero.secondary}
            </Link>
          </div>
          <address className="hero-after filet mt-10 text-[0.9875rem] not-italic">
            {business.address.street}, {business.address.postalCode} {business.address.city}
            <span className="block text-mute">{hero.metro}</span>
          </address>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <div
            className="photo photo-lg cut-edge hero-frame aspect-[4/5] max-h-[calc(100svh-7rem)] w-full [--cut:12%] lg:[--cut:18%]"
          >
            <div className="hero-drift absolute inset-x-0 -top-[6%] h-[112%]">
              <Image
                src={photo.src}
                alt={photo.alt[locale]}
                sizes="(min-width: 85rem) 680px, (min-width: 64rem) 48vw, 92vw"
                quality={78}
                preload
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover"
                style={{ objectPosition: photo.focus }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Trois univers ----------------------------------------------------------- */
function Universes({ locale, dict }: Props) {
  const u = dict.home.universes;
  const creations = meatCategories.find((category) => category.id === "creations");
  const items: { key: string; title: string; text: string; link: string; href: string; photo: PhotoKey; ratio: string; className: string; sizes: string }[] = [
    {
      key: "meats",
      ...u.meats,
      href: pathFor(locale, "meats"),
      photo: "pieceMarbreeComptoir",
      ratio: "4 / 5",
      className: "lg:col-span-7 lg:row-span-2",
      sizes: "(min-width: 64rem) 56vw, 92vw",
    },
    {
      key: "charcuterie",
      ...u.charcuterie,
      href: pathFor(locale, "charcuterie"),
      photo: "rosaceCharcuterie",
      ratio: "5 / 4",
      className: "lg:col-span-5",
      sizes: "(min-width: 64rem) 40vw, 92vw",
    },
    {
      key: "creations",
      ...u.creations,
      href: `${pathFor(locale, "meats")}#${creations?.anchor[locale] ?? ""}`,
      photo: "brochettesVitrine",
      ratio: "4 / 3",
      className: "lg:col-span-4 lg:col-start-9",
      sizes: "(min-width: 64rem) 32vw, 92vw",
    },
  ];

  return (
    <section className="surface-light py-20 lg:py-28" aria-labelledby="universes-title">
      <div className="container-site">
        <h2 id="universes-title" className="display-2 max-w-[22ch]">
          {u.title}
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-16">
          {items.map((item) => (
            <article key={item.key} className={`group relative ${item.className}`}>
              <Photo photo={item.photo} locale={locale} sizes={item.sizes} ratio={item.ratio} zoom reveal />
              <h3 className="display-3 mt-5">
                <Link href={item.href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[:focus-visible]:underline">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-[42ch] text-mute-ink">{item.text}</p>
              <span aria-hidden="true" className="link-quiet mt-1 no-underline group-hover:underline">
                {item.link}
                <ArrowIcon />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Le geste ---------------------------------------------------------------- */
function Gesture({ locale, dict }: Props) {
  const g = dict.home.gesture;
  return (
    <section className="bg-char py-20 lg:py-28" aria-labelledby="gesture-title">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-6">
          <Photo photo="gesteTrancheMarbree" locale={locale} sizes="(min-width: 64rem) 48vw, 92vw" ratio="4 / 5" large reveal />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id="gesture-title" className="display-2">
            {g.title}
          </h2>
          <p className="lede filet mt-6 max-w-[40ch]">{g.text}</p>
          <Link href={pathFor(locale, "house")} className="link-quiet mt-6">
            {g.link}
            <ArrowIcon />
          </Link>
          <Photo
            photo="billotFromParis"
            locale={locale}
            sizes="(min-width: 64rem) 26vw, 60vw"
            ratio="4 / 5"
            className="mt-12 w-3/5 lg:w-2/3"
            reveal
          />
        </div>
      </div>
    </section>
  );
}

/* ---- Venir au comptoir ----------------------------------------------------- */
function Visit({ locale, dict }: Props) {
  const v = dict.home.visit;
  return (
    <section className="py-20 lg:py-28" aria-labelledby="visit-title">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <Photo photo="facade" locale={locale} sizes="(min-width: 64rem) 40vw, 92vw" ratio="3 / 4" large reveal />
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <h2 id="visit-title" className="display-2">
            {v.title}
          </h2>
          <p className="lede mt-5 max-w-[40ch] text-mute">{v.text}</p>
          <address className="filet mt-8 text-lg not-italic">
            {business.address.street}
            <br />
            {business.address.postalCode} {business.address.city}
            <span className="block text-mute">{dict.home.hero.metro}</span>
          </address>
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
          <div className="mt-12 max-w-md">
            <HoursTable locale={locale} dict={dict.hours} />
          </div>
          <div className="mt-12 border-t border-ivory/12 pt-6">
            <h3 className="font-sans text-[0.9875rem] font-semibold tracking-normal">{v.deliveryTitle}</h3>
            <p className="mt-1 text-mute">
              {v.deliveryText}{" "}
              {business.delivery.map((platform, index) => (
                <span key={platform.id}>
                  {index > 0 ? (locale === "fr" ? " ou " : " or ") : null}
                  <ExternalLink href={platform.url} newTabLabel={dict.a11y.newTab} className="link-inline inline-flex items-center gap-1 text-ivory">
                    {platform.name}
                    <ExternalIcon className="size-3.5 text-mute" />
                  </ExternalLink>
                </span>
              ))}
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
