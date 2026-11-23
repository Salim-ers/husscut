import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { KnifeRule } from "@/components/motion/KnifeRule";
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
      <Manifesto locale={locale} dict={dict} />
      <Universes locale={locale} dict={dict} />
      <Gesture locale={locale} dict={dict} />
      <Gallery locale={locale} dict={dict} />
      <Ageing locale={locale} dict={dict} />
      <GoogleReviews locale={locale} dict={dict.reviews} newTabLabel={dict.a11y.newTab} />
      <OrderCall locale={locale} dict={dict} />
    </>
  );
}

/* ---- Hero « Du néon au billot » ------------------------------------------------
   Une seule photo, ouverte par une lame qui traverse l'écran. */
function Hero({ locale, dict }: Props) {
  const hero = dict.home.hero;
  const photo = photos.heroCoteBillotNeon;
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="hero__media">
        <Image
          src={photo.src}
          alt={photo.alt[locale]}
          fill
          sizes="(min-width: 64rem) 60vw, 100vw"
          quality={78}
          preload
          loading="eager"
          fetchPriority="high"
          className="hero__img"
          style={{ objectPosition: photo.focus }}
        />
      </div>
      <div className="hero__veil" />
      <div className="hero__knife" aria-hidden="true">
        <span className="hero__cutline" />
        <span className="hero__blade text-gold">
          <Knife />
        </span>
      </div>

      <div className="container-site relative z-10 grid min-h-[calc(100svh-var(--header-h))] content-start pt-[calc(var(--hero-photo-h)-var(--header-h)-0.25rem)] pb-12 md:pb-16 lg:content-center lg:pt-6 lg:pb-28">
        <div className="max-w-[52rem]">
          <p className="kicker hero-after" style={vars({ "--i": 0 })}>
            <span>
              <RichText text={hero.kicker} />
            </span>
          </p>
          <h1 id="hero-title" className="display-xl mt-6 text-[clamp(2.1rem,0.6rem+6.6vw,6.25rem)]">
            {hero.titleLines.map((line, index) => (
              <span key={line} className="hero-line-mask">
                <span className="hero-line" style={vars({ "--i": index })}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-after lede mt-6 max-w-[40ch] text-ivory/90" style={vars({ "--i": 1 })}>
            <RichText text={hero.subtitle} />
          </p>
          <p className="hero-after mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mute" style={vars({ "--i": 2 })}>
            <span className="tag">{hero.halal}</span>
            <span>{business.address.street}</span>
            <span>{hero.metro}</span>
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

      <div className="hero-after absolute inset-x-0 bottom-8 z-10 hidden justify-center lg:flex" style={vars({ "--i": 4 })} aria-hidden="true">
        <div className="scroll-cue">
          <span className="scroll-cue__knife">
            <KnifeDown />
          </span>
          {hero.scroll}
        </div>
      </div>
    </section>
  );
}

/* ---- Manifeste : la phrase s'écrit mot à mot -------------------------------------- */
function Manifesto({ locale, dict }: Props) {
  const m = dict.home.manifesto;
  return (
    <section className="section glow" aria-labelledby="manifesto-title">
      <div className="container-site grid gap-12 md:grid-cols-12 md:items-center md:gap-8 lg:gap-6">
        <div className="md:col-span-7">
          <p className="kicker" data-reveal="up">
            {m.kicker}
          </p>
          <SplitWords
            as="h2"
            id="manifesto-title"
            text={m.text}
            className="serif mt-8 max-w-[26ch] text-[clamp(1.75rem,0.95rem+3vw,3.5rem)] leading-[1.16] font-normal tracking-normal"
          />
          <KnifeRule className="mt-14 max-w-xl" />
        </div>
        <div className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-none lg:col-span-4 lg:col-start-9">
          <Photo photo="piecePapierSigne" locale={locale} sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 40vw, 92vw" ratio="4 / 5" large reveal />
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
    { key: "meats", ...u.meats, href: pathFor(locale, "meats"), photo: "cotesNeonPlanche", tone: "tone-char" },
    { key: "charcuterie", ...u.charcuterie, href: pathFor(locale, "charcuterie"), photo: "coffretFleursJaunes", tone: "tone-blood" },
    {
      key: "creations",
      ...u.creations,
      href: `${pathFor(locale, "meats")}#${creations?.anchor[locale] ?? ""}`,
      photo: "brochettesVitrine",
      tone: "tone-ember",
    },
  ];

  return (
    <section className="section pt-0" aria-labelledby="universes-title">
      <div className="container-site">
        <p className="kicker" data-reveal="up">
          {u.kicker}
        </p>
        <SplitWords as="h2" id="universes-title" text={u.title} className="display-1 mt-5 max-w-[16ch]" />
        <ol className="mt-14 flex flex-col gap-8" role="list">
          {items.map((item, index) => (
            <li key={item.key} className={`stack-card group ${item.tone}`} style={vars({ "--i": index })}>
              <article className="grid min-h-[min(78svh,40rem)] lg:grid-cols-12" aria-labelledby={`univers-${item.key}`}>
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
                <div className="flex flex-col justify-end gap-6 p-7 sm:p-10 lg:col-span-5 lg:p-12">
                  <h3 id={`univers-${item.key}`} className="display-2">
                    <Link href={item.href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[:focus-visible]:underline">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="lede max-w-[38ch] text-ivory/80">{item.text}</p>
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
  const photo = photos.gesteTrancheMarbree;
  return (
    <section className="knife-scene pin-scene pin-scene--lg glow" data-progress="pin-lg" style={vars({ "--pin-h": "190vh" })} aria-labelledby="gesture-title">
      <div className="pin-scene__sticky">
        <div className="container-site grid gap-12 py-16 md:py-20 lg:h-full lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-0">
          <div className="lg:col-span-5">
            <p className="kicker" data-reveal="up" style={vars({ "--d": 0 })}>
              {g.kicker}
            </p>
            <h2 id="gesture-title" className="display-1 mt-5" data-reveal="up" style={vars({ "--d": 110 })}>
              <RichText text={g.title} />
            </h2>
            <p className="lede mt-7 max-w-[42ch] text-ivory/85" data-reveal="up" style={vars({ "--d": 220 })}>
              {g.text}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2" role="list" data-reveal="up" style={vars({ "--d": 330 })}>
              {g.steps.map((step) => (
                <li key={step} className="pill">
                  {step}
                </li>
              ))}
            </ul>
            <Link href={pathFor(locale, "house")} className="link-quiet mt-8" data-reveal="up" style={vars({ "--d": 440 })}>
              {g.link}
              <ArrowIcon />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="knife-scene__frame mx-auto max-w-[28rem] lg:max-w-[min(30rem,62svh)]">
              <div className="knife-scene__half knife-scene__half--a">
                <Image src={photo.src} alt={photo.alt[locale]} fill sizes="(min-width: 64rem) 30rem, 90vw" quality={78} placeholder="blur" style={{ objectPosition: photo.focus }} />
              </div>
              <div className="knife-scene__half knife-scene__half--b" aria-hidden="true">
                <Image src={photo.src} alt="" fill sizes="(min-width: 64rem) 30rem, 90vw" quality={78} placeholder="blur" style={{ objectPosition: photo.focus }} />
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
    { key: "exception", photo: "pieceMarbreeComptoir" },
    { key: "rotie", photo: "pieceRotieFleurs" },
    { key: "papier", photo: "pavesRomarin" },
    { key: "vitrine", photo: "vitrineAgrumes" },
    { key: "roule", photo: "rotiRouleAgrumes" },
    { key: "grillade", photo: "grilladeArdoise" },
    { key: "cote", photo: "coteGrilleeBeurre" },
  ];
  return (
    <section className="hscroll relative overflow-x-clip py-12 md:py-16 lg:py-0" data-progress="" data-hscroll="" aria-labelledby="gallery-title">
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
            <p className="mt-4 flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-gold uppercase" aria-hidden="true">
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
                  <Photo photo={item.photo} locale={locale} sizes="(min-width: 64rem) 30vw, 80vw" ratio={index % 3 === 1 ? "4 / 3" : "4 / 5"} zoom />
                  <figcaption className="mt-3 font-display text-sm font-semibold tracking-[0.12em] uppercase">{g.captions[item.key]}</figcaption>
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

/* ---- Maturation : la photo grandit au défilement, sur une lueur sang de bœuf ---------- */
function Ageing({ locale, dict }: Props) {
  const a = dict.home.ageing;
  const beef = meatCategories.find((category) => category.id === "boeuf");
  const photo = photos.armoireMaturation;
  return (
    <section className="zoom-scene pin-scene pin-scene--lg glow glow--left" data-progress="pin-lg" style={vars({ "--pin-h": "150vh" })} aria-labelledby="ageing-title">
      <div className="pin-scene__sticky">
        <div className="container-site grid gap-10 py-16 md:py-20 lg:h-full lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-0">
          <div className="lg:col-span-6">
            <div className="zoom-scene__frame mx-auto aspect-[4/5] w-full max-w-[min(34rem,64svh)]">
              <Image src={photo.src} alt={photo.alt[locale]} fill sizes="(min-width: 64rem) 40vw, 90vw" quality={78} placeholder="blur" style={{ objectPosition: photo.focus }} />
            </div>
          </div>
          <div className="zoom-scene__content lg:col-span-5 lg:col-start-8">
            <p className="kicker">{a.kicker}</p>
            <h2 id="ageing-title" className="display-1 mt-5">
              <RichText text={a.title} />
            </h2>
            <p className="lede mt-6 max-w-[40ch] text-ivory/85">{a.text}</p>
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

/* ---- Commander : un panneau sang de bœuf, deux lames croisées, trois façons ---------- */
function OrderCall({ locale, dict }: Props) {
  const o = dict.home.order;
  const orderHref = pathFor(locale, "order");
  const modes = [
    { key: "takeaway", ...o.modes.takeaway, href: contactRequestHref(locale, { topic: "availability" }) },
    { key: "platter", ...o.modes.platter, href: contactRequestHref(locale, { topic: "platter" }) },
    { key: "delivery", ...o.modes.delivery, href: `${orderHref}#${pageAnchors.delivery[locale]}` },
  ];
  return (
    <section className="section" aria-labelledby="order-call-title">
      <div className="container-site">
        <div className="panel-blood grid gap-12 p-7 sm:p-12 lg:grid-cols-12 lg:items-end lg:gap-6 lg:p-16">
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
          <ul className="grid gap-3 lg:col-span-5 lg:col-start-8" role="list">
            {modes.map((mode, index) => (
              <li key={mode.key} data-reveal="up" style={vars({ "--d": index * 120 })}>
                <Link href={mode.href} className="mode-link group">
                  <span className="flex-1">
                    <span className="font-display block text-[1.05rem] font-semibold tracking-[0.03em] sm:text-[1.2rem]">{mode.title}</span>
                    <span className="mt-1 block text-[0.9375rem] text-ivory/75">{mode.text}</span>
                  </span>
                  <ArrowIcon className="text-gold" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
