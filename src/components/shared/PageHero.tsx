import type { CSSProperties, ReactNode } from "react";
import { KnifeRule } from "@/components/motion/KnifeRule";
import { SplitWords } from "@/components/motion/SplitWords";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import type { PhotoKey } from "@/content/media";
import type { Locale } from "@/i18n/config";

interface PageHeroProps {
  locale: Locale;
  kicker: string;
  title: string;
  lede?: string;
  /** Photo principale (LCP), bord taillé en biais. */
  photo: PhotoKey;
  /** Petite photo inclinée, posée en débord sur la principale. */
  secondPhoto?: PhotoKey;
  children?: ReactNode;
}

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Haut de page des pages intérieures : surtitre, titre dont les mots montent à l'affichage,
 * photo recadrée avec reflet de lame, seconde photo en débord, puis trait de couteau.
 */
export function PageHero({ locale, kicker, title, lede, photo, secondPhoto, children }: PageHeroProps) {
  return (
    <section className="glow-red relative overflow-x-clip pt-8 pb-14 lg:pt-14 lg:pb-20" aria-labelledby="page-title">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-6">
        <div className="lg:col-span-6 xl:col-span-7">
          <p className="kicker load-in" style={delay(0)}>
            <span>
              <RichText text={kicker} />
            </span>
          </p>
          <SplitWords as="h1" id="page-title" mode="load" text={title} className="display-1 mt-6 max-w-[14ch]" />
          {lede ? (
            <p className="lede load-in mt-7 max-w-[46ch] text-mute" style={delay(2)}>
              <RichText text={lede} />
            </p>
          ) : null}
          {children ? (
            <div className="load-in mt-8" style={delay(3)}>
              {children}
            </div>
          ) : null}
        </div>
        <div className="relative lg:col-span-6 xl:col-span-5">
          <Photo
            photo={photo}
            locale={locale}
            sizes="(min-width: 80rem) 36vw, (min-width: 64rem) 48vw, 92vw"
            ratio="4 / 5"
            large
            eager
            className="cut-edge [--cut:14%]"
          />
          {secondPhoto ? (
            <div className="absolute -bottom-10 -left-2 w-[40%] -rotate-3 rounded-[20px] ring-4 ring-ink sm:-left-8 lg:-left-14">
              <Photo photo={secondPhoto} locale={locale} sizes="(min-width: 64rem) 16vw, 40vw" ratio="4 / 5" reveal delay={500} />
            </div>
          ) : null}
        </div>
      </div>
      <div className="container-site mt-20">
        <KnifeRule />
      </div>
    </section>
  );
}
