import type { ReactNode } from "react";
import { SplitWords } from "@/components/motion/SplitWords";

/** Gabarit des pages légales : lecture confortable, sur le même fond que le reste du site. */
export function LegalLayout({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <section className="glow pt-10 pb-14 lg:pt-16 lg:pb-20" aria-labelledby="page-title">
        <div className="container-site">
          <SplitWords as="h1" id="page-title" mode="load" text={title} className="display-1 max-w-[16ch]" />
          {intro ? <p className="lede load-in mt-6 max-w-[56ch] text-mute">{intro}</p> : null}
        </div>
      </section>
      <div className="pb-24 lg:pb-32">
        <div className="container-site">
          <div className="flex max-w-[68ch] flex-col gap-12">{children}</div>
        </div>
      </div>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="display-3">{title}</h2>
      <div className="mt-4 flex flex-col gap-3 text-[1.0625rem]">{children}</div>
    </section>
  );
}

/** Liste de définitions terme / valeur ; une valeur absente affiche le libellé « en cours de confirmation ». */
export function FactList({ items, pending }: { items: { term: string; value: ReactNode | null }[]; pending: string }) {
  return (
    <dl className="grid gap-x-6 sm:grid-cols-[minmax(11rem,auto)_1fr]">
      {items.map((item) => (
        <div key={item.term} className="contents">
          <dt className="border-t border-ivory/12 pt-3 pb-1 font-semibold sm:pb-3">{item.term}</dt>
          <dd className={`pb-3 sm:border-t sm:border-ivory/12 sm:pt-3 ${item.value === null ? "text-mute italic" : ""}`} data-pending={item.value === null ? "" : undefined}>
            {item.value ?? pending}
          </dd>
        </div>
      ))}
    </dl>
  );
}
