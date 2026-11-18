import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { KnifeRule } from "@/components/motion/KnifeRule";
import { Marquee } from "@/components/motion/Marquee";
import { SplitWords } from "@/components/motion/SplitWords";
import { ArrowIcon } from "@/components/ui/icons";
import { Knife, KnifeDown } from "@/components/ui/Knife";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { business } from "@/content/business";
import { meatCategories } from "@/content/catalogue";
import { photos, type PhotoKey } from "@/content/media";
import { pageAnchors } from "@/i18n/anchors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { pathFor } from "@/i18n/routes";
import { plain } from "@/i18n/typography";
import { contactRequestHref } from "@/features/contact/lib/topics";
import { GoogleReviews } from "@/features/reviews/GoogleReviews";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

const vars = (values: Record<string, string | number>) => values as CSSProperties;

export function HomePage({ locale, dict }: Props) {
  return (
    <>
      <Hero locale={locale} dict={dict} />
      <div className="relative z-10 -mt-8 overflow-x-clip pb-6 lg:-mt-10">
        <Marquee items={dict.home.marquee.cuts} />
        <Marquee items={dict.home.marquee.gestures} variant="ink" reverse duration={46} />
      </div>
      <Manifesto locale={locale} dict={dict} />
      <Universes locale={locale} dict={dict} />
      <Gesture locale={locale} dict={dict} />
      <Gallery locale={locale} dict={dict} />
      <Ageing locale={locale} dict={dict} />
      <Platters locale={locale} dict={dict} />
      <GoogleReviews locale={locale} dict={dict.reviews} newTabLabel={dict.a11y.newTab} />
      <OrderCall locale={locale} dict={dict} />
    </>
  );
}

/* ---- Hero « Du néon au billot » ------------------------------------------------
   Diaporama en fondu enchaîné (recadrage lent), ouvert par une lame qui traverse l'écran. */
const HERO_SLIDES: readonly PhotoKey[] = ["heroCoteBillotNeon", "cotesNeonPlanche", "piecePapierSigne", "armoireNeon"];

function Hero({ locale, dict }: Props) {
  const hero = dict.home.hero;
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="hero__media">
        {HERO_SLIDES.map((key, index) => {
          const photo = photos[key];
          return (
            <div key={key} className="hero__slide" style={vars({ "--i": index })}>
              <Image
                src={photo.src}
                alt={index === 0 ? photo.alt[locale] : ""}
                fill
                sizes="(min-width: 64rem) 60vw, 100vw"
                quality={80}
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                style={{ objectPosition: photo.focus }}
              />
            </div>
          );
        })}
      </div>
      <div className="hero__veil" />
      <div className="hero__knife" aria-hidden="true">
        <span className="hero__cutline" />
        <span className="hero__blade text-gold">
          <Knife />
        </span>
      </div>

      <div className="container-site relative z-10 grid min-h-[calc(100svh-var(--header-h))] content-end pt-[22svh] pb-12 lg:content-center lg:pt-6 lg:pb-28">
        <div className="max-w-[52rem]">
          <p className="kicker hero-after" style={vars({ "--i": 0 })}>
            <span>
              <RichText text={hero.kicker} />
            </span>
          </p>
          <h1 id="hero-title" className="display-xl mt-6 text-[clamp(2.1rem,0.5rem+6.2vw,6.25rem)]">
            {hero.titleLines.map((line, index) => (
              <span key={line} className="hero-line-mask">
                <span className="hero-line" style={vars({ "--i": index })}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-after mt-6 flex flex-wrap items-center gap-3 text-sm text-mute" style={vars({ "--i": 1 })}>
            <span className="tag">{hero.halal}</span>
            <span>
              {business.address.street} · {hero.metro}
            </span>
          </p>
          <p className="hero-after lede mt-5 max-w-[40ch] text-ivory/90" style={vars({ "--i": 2 })}>
            <RichText text={hero.subtitle} />
          </p>
          <div className="hero-after mt-9 flex flex-col gap-3 min-[460px]:flex-row min-[460px]:flex-wrap" style={vars({ "--i": 3 })}>
            <Link href={pathFor(locale, "order")} className="btn btn-primary">
              {hero.primary}
              <ArrowIcon />
            </Link>
            <Link href={pathFor(locale, "meats")} className="btn btn-secondary">
              {hero.secondary}
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-after absolute inset-x-0 bottom-0 z-10 hidden lg:block" style={vars({ "--i": 4 })} aria-hidden="true">
        <div className="container-site relative flex items-end justify-end gap-6 pb-14">
          <div className="scroll-cue absolute bottom-10 left-1/2 -translate-x-1/2">
            <span className="scroll-cue__knife">
              <KnifeDown />
            </span>
            {hero.scroll}
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="hero__labels text-[0.7rem] font-semibold tracking-[0.28em] text-mute uppercase">
              {hero.slides.map((label, index) => (
                <span key={label} className="hero__label" style={vars({ "--i": index })}>
                  {String(index + 1).padStart(2, "0")} — {label}
                </span>
              ))}
            </div>
            <div className="hero__bars">
              {hero.slides.map((label, index) => (
                <span key={label} className="hero__bar">
                  <span style={vars({ "--i": index })} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Manifeste : la phrase s'écrit mot à mot -------------------------------------- */
function Manifesto({ locale, dict }: Props) {
  const m = dict.home.manifesto;
  return (
    <section className="glow-red overflow-x-clip py-24 lg:py-36" aria-labelledby="manifesto-title">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-7">
          <p className="kicker" data-reveal="up">
            {m.kicker}
          </p>
          <SplitWords
            as="h2"
            id="manifesto-title"
            text={m.text}
            className="serif mt-8 max-w-[26ch] text-[clamp(1.75rem,0.95rem+3vw,3.75rem)] leading-[1.14] font-normal tracking-normal"
          />
          <KnifeRule className="mt-14 max-w-xl" />
        </div>
        <div className="relative grid grid-cols-2 gap-4 lg:col-span-4 lg:col-start-9">
          <Photo photo="piecePapierSigne" locale={locale} sizes="(min-width: 64rem) 26vw, 46vw" ratio="3 / 4" large reveal className="col-span-2 rotate-1" />
          <Photo photo="burrataTranches" locale={locale} sizes="(min-width: 64rem) 13vw, 46vw" ratio="4 / 5" reveal delay={200} className="-mt-24 -ml-6 -rotate-3 border-4 border-ink" />
          <Photo photo="steaksPersillesBillot" locale={locale} sizes="(min-width: 64rem) 13vw, 46vw" ratio="4 / 5" reveal delay={350} className="-mt-10 rotate-2 border-4 border-ink" />
        </div>
      </div>
    </section>
  );
}

/* ---- La carte : trois rayons en cartes empilées ------------------------------------- */
function Universes({ locale, dict }: Props) {
  const u = dict.home.universes;
  const creations = meatCategories.find((category) => category.id === "creations");
  const items: { key: string; title: string; text: string; link: string; href: string; photo: PhotoKey; tone: string }[] = [
    { key: "meats", ...u.meats, href: pathFor(locale, "meats"), photo: "coteNeonBillot", tone: "bg-char" },
    { key: "charcuterie", ...u.charcuterie, href: pathFor(locale, "charcuterie"), photo: "coffretPenseesJaunes", tone: "surface-blood" },
    {
      key: "creations",
      ...u.creations,
      href: `${pathFor(locale, "meats")}#${creations?.anchor[locale] ?? ""}`,
      photo: "brochettesMarinees",
      tone: "surface-light",
    },
  ];

  return (
    <section className="relative pt-4 pb-24 lg:pb-32" aria-labelledby="universes-title">
      <div className="container-site">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker" data-reveal="up">
              {u.kicker}
            </p>
            <SplitWords as="h2" id="universes-title" text={u.title} className="display-1 mt-5 max-w-[16ch]" />
          </div>
        </div>
        <ol className="mt-14 flex flex-col gap-8" role="list">
          {items.map((item, index) => (
            <li key={item.key} className={`stack-card group ${item.tone}`} style={vars({ "--i": index })}>
              <article className="grid min-h-[min(80svh,42rem)] lg:grid-cols-12" aria-labelledby={`univers-${item.key}`}>
                <div className="photo-zoom relative min-h-[16rem] overflow-hidden sm:min-h-[22rem] lg:col-span-7 lg:min-h-0">
                  <Image
                    src={photos[item.photo].src}
                    alt={photos[item.photo].alt[locale]}
                    fill
                    sizes="(min-width: 64rem) 58vw, 100vw"
                    quality={78}
                    placeholder="blur"
                    className="object-cover"
                    style={{ objectPosition: photos[item.photo].focus }}
                  />
                </div>
                <div className="flex flex-col justify-between gap-8 p-7 sm:p-10 lg:col-span-5 lg:p-12">
                  <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 id={`univers-${item.key}`} className="display-2">
                      <Link href={item.href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[:focus-visible]:underline">
                        {item.title}
                      </Link>
                    </h3>
                    <p className={`mt-4 max-w-[38ch] lede ${item.tone === "surface-light" ? "text-mute-ink" : "text-mute"}`}>{item.text}</p>
                  </div>
                  <span aria-hidden="true" className="link-quiet no-underline group-hover:underline">
                    {item.link}
                    <ArrowIcon />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---- Le geste : la lame traverse la photo au rythme du défilement -------------------- */
function Gesture({ locale, dict }: Props) {
  const g = dict.home.gesture;
  const photo = photos.gesteCouteauPersille;
  return (
    <section
      className="knife-scene pin-scene pin-scene--lg bg-char"
      data-progress="pin-lg"
      style={vars({ "--pin-h": "260vh" })}
      aria-labelledby="gesture-title"
    >
      <div className="pin-scene__sticky">
        <div className="container-site grid gap-14 py-20 lg:h-full lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-0">
          <div className="knife-scene__text lg:col-span-5">
            <p className="kicker" data-reveal="up" style={vars({ "--d": 0 })}>
              {g.kicker}
            </p>
            <h2 id="gesture-title" className="display-1 mt-5" data-reveal="up" style={vars({ "--d": 110 })}>
              <RichText text={g.title} />
            </h2>
            <p className="lede filet mt-7 max-w-[42ch] text-ivory/90" data-reveal="up" style={vars({ "--d": 220 })}>
              {g.text}
            </p>
            <ol className="mt-8 grid gap-3" role="list" data-reveal="up" style={vars({ "--d": 330 })}>
              {g.steps.map((step, index) => (
                <li key={step} className="flex items-baseline gap-4 border-t border-ivory/12 pt-3">
                  <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[1.0625rem] font-semibold tracking-[0.06em]">{step}</span>
                </li>
              ))}
            </ol>
            <Link href={pathFor(locale, "house")} className="link-quiet mt-8" data-reveal="up" style={vars({ "--d": 440 })}>
              {g.link}
              <ArrowIcon />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="knife-scene__frame mx-auto max-w-[28rem] lg:max-w-[min(30rem,62svh)]">
              <div className="knife-scene__half knife-scene__half--a">
                <Image src={photo.src} alt={photo.alt[locale]} fill sizes="(min-width: 64rem) 30rem, 90vw" quality={80} placeholder="blur" style={{ objectPosition: photo.focus }} />
              </div>
              <div className="knife-scene__half knife-scene__half--b" aria-hidden="true">
                <Image src={photo.src} alt="" fill sizes="(min-width: 64rem) 30rem, 90vw" quality={80} placeholder="blur" style={{ objectPosition: photo.focus }} />
              </div>
              <svg className="knife-scene__cut" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" y1="66" x2="100" y2="34" />
              </svg>
              <div className="knife-scene__travel" aria-hidden="true">
                <div className="knife-scene__blade text-gold">
                  <Knife />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- La vitrine : galerie horizontale (épinglée sur ordinateur, glissée sur mobile) ---- */
function Gallery({ locale, dict }: Props) {
  const g = dict.home.gallery;
  const items: { key: keyof typeof g.captions; photo: PhotoKey }[] = [
    { key: "neon", photo: "billotFromParis" },
    { key: "rotis", photo: "rotisFiceles" },
    { key: "persille", photo: "blocPersilleBillot" },
    { key: "selection", photo: "saucissesSelection" },
    { key: "coffret", photo: "grandCoffretFromages" },
    { key: "sechage", photo: "sechageSelection" },
    { key: "brochettes", photo: "brochettesVitrine" },
    { key: "roules", photo: "roulesFromageGrosPlan" },
    { key: "vitrine", photo: "vitrineAgrumes" },
    { key: "papier", photo: "pavesRomarin" },
  ];
  return (
    <section className="hscroll relative overflow-x-clip bg-ink py-20 lg:py-0" data-progress="" data-hscroll="" aria-labelledby="gallery-title">
      <div className="hscroll__sticky">
        <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker">{g.kicker}</p>
            <h2 id="gallery-title" className="display-1 mt-5">
              <RichText text={g.title} />
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-mute">{g.text}</p>
            <p className="mt-4 flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-gold uppercase" aria-hidden="true">
              {g.hint}
              <span className="w-12">
                <Knife />
              </span>
            </p>
          </div>
        </div>
        <div className="hscroll__viewport mt-10 lg:mt-14" tabIndex={0} role="region" aria-label={plain(g.title)}>
          <ul className="hscroll__track pb-4" role="list">
            {items.map((item, index) => (
              <li key={item.key} className="hscroll__card">
                <figure>
                  <Photo photo={item.photo} locale={locale} sizes="(min-width: 64rem) 32vw, 80vw" ratio={index % 3 === 1 ? "4 / 3" : "4 / 5"} zoom />
                  <figcaption className="mt-3 flex items-baseline gap-3">
                    <span className="index-num text-base">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-display text-sm font-semibold tracking-[0.14em] uppercase">{g.captions[item.key]}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-site mt-6 hidden lg:block" aria-hidden="true">
          <div className="hscroll__progress">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Maturation : la photo grandit au défilement ---------------------------------- */
function Ageing({ locale, dict }: Props) {
  const a = dict.home.ageing;
  const beef = meatCategories.find((category) => category.id === "boeuf");
  const photo = photos.armoireMaturation;
  return (
    <section
      className="zoom-scene pin-scene pin-scene--lg surface-blood"
      data-progress="pin-lg"
      style={vars({ "--pin-h": "200vh" })}
      aria-labelledby="ageing-title"
    >
      <div className="pin-scene__sticky">
        <div className="container-site grid gap-12 py-20 lg:h-full lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-0">
          <div className="lg:col-span-6">
            <div className="zoom-scene__frame mx-auto aspect-[4/5] w-full max-w-[min(34rem,64svh)]">
              <Image src={photo.src} alt={photo.alt[locale]} fill sizes="(min-width: 64rem) 40vw, 90vw" quality={80} placeholder="blur" style={{ objectPosition: photo.focus }} />
            </div>
          </div>
          <div className="zoom-scene__content lg:col-span-5 lg:col-start-8">
            <p className="kicker">{a.kicker}</p>
            <h2 id="ageing-title" className="display-1 mt-5">
              <RichText text={a.title} />
            </h2>
            <p className="lede mt-6 max-w-[40ch] text-ivory/90">{a.text}</p>
            <Link href={`${pathFor(locale, "meats")}#${beef?.anchor[locale] ?? ""}`} className="btn btn-primary mt-9">
              {a.cta}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Planches et coffrets : mosaïque en cascade -------------------------------------- */
function Platters({ locale, dict }: Props) {
  const p = dict.home.platters;
  return (
    <section className="surface-light overflow-x-clip py-24 lg:py-32" aria-labelledby="platters-title">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-5">
          <p className="kicker" data-reveal="up">
            {p.kicker}
          </p>
          <SplitWords as="h2" id="platters-title" text={p.title} className="display-1 mt-5" />
          <p className="lede mt-6 max-w-[40ch] text-mute-ink" data-reveal="up">
            {p.text}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-reveal="up">
            <Link href={contactRequestHref(locale, { topic: "platter" })} className="btn btn-primary">
              {p.cta}
              <ArrowIcon />
            </Link>
            <Link href={`${pathFor(locale, "charcuterie")}#${pageAnchors.platters[locale]}`} className="btn btn-secondary">
              {p.link}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-7">
          <Photo photo="coffretFleursJaunes" locale={locale} sizes="(min-width: 64rem) 28vw, 46vw" ratio="4 / 5" large reveal className="-rotate-2" />
          <Photo photo="rosaceCharcuterie" locale={locale} sizes="(min-width: 64rem) 28vw, 46vw" ratio="4 / 5" large reveal delay={150} className="mt-16 rotate-2" />
          <Photo photo="coffretCharcuterieFleurs" locale={locale} sizes="(min-width: 64rem) 28vw, 46vw" ratio="4 / 5" large reveal delay={250} className="-mt-10 rotate-1" />
          <Photo photo="coffretFromages" locale={locale} sizes="(min-width: 64rem) 28vw, 46vw" ratio="4 / 5" large reveal delay={350} className="mt-6 -rotate-1" />
        </div>
      </div>
    </section>
  );
}

/* ---- Commander : trois façons, un appel fort ------------------------------------------ */
function OrderCall({ locale, dict }: Props) {
  const o = dict.home.order;
  const orderHref = pathFor(locale, "order");
  const modes = [
    { key: "takeaway", ...o.modes.takeaway, href: contactRequestHref(locale, { topic: "availability" }) },
    { key: "platter", ...o.modes.platter, href: contactRequestHref(locale, { topic: "platter" }) },
    { key: "delivery", ...o.modes.delivery, href: `${orderHref}#${pageAnchors.delivery[locale]}` },
  ];
  return (
    <section className="surface-blood relative overflow-hidden py-24 lg:py-32" aria-labelledby="order-call-title">
      <div className="pointer-events-none absolute inset-x-0 top-6 opacity-60" aria-hidden="true">
        <div className="marquee" style={vars({ "--marquee-duration": "60s" })}>
          {["a", "b"].map((copy) => (
            <div key={copy} className="marquee__track">
              {[0, 1, 2, 3].map((n) => (
                <span key={n} className="deco-text display-xl outline-text" data-text={plain(o.cta)} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="container-site relative grid gap-14 pt-16 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pt-24">
        <div className="lg:col-span-6">
          <div className="crossed-knives text-gold" data-reveal="up" aria-hidden="true">
            <span>
              <Knife />
            </span>
            <span>
              <Knife />
            </span>
          </div>
          <p className="kicker mt-8">{o.kicker}</p>
          <SplitWords as="h2" id="order-call-title" text={o.title} className="display-1 mt-5" />
          <p className="lede mt-6 max-w-[42ch] text-ivory/90">{o.text}</p>
          <Link href={orderHref} className="btn btn-primary mt-9 min-h-14 px-8 text-base">
            {o.cta}
            <ArrowIcon />
          </Link>
        </div>
        <ul className="grid gap-4 lg:col-span-5 lg:col-start-8" role="list">
          {modes.map((mode, index) => (
            <li key={mode.key} data-reveal="up" style={vars({ "--d": index * 120 })}>
              <Link
                href={mode.href}
                className="group flex items-center gap-5 rounded-[20px] border border-ivory/15 bg-ink/35 p-5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-ink/55 sm:p-6"
              >
                <span className="index-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="font-display block text-[1.25rem] font-semibold tracking-[0.04em]">{mode.title}</span>
                  <span className="mt-1 block text-[0.9375rem] text-mute">{mode.text}</span>
                </span>
                <ArrowIcon className="text-gold" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
