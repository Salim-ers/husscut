import Link from "next/link";
import { ArrowIcon, PhoneIcon } from "@/components/ui/icons";
import { Knife } from "@/components/ui/Knife";
import { business } from "@/content/business";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { pathFor } from "@/i18n/routes";

/** Fin de catalogue : un seul appel à commander, dans un panneau sang de bœuf. */
export function OrderPanel({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.catalogue;
  return (
    <section className="section" aria-labelledby="order-panel-title">
      <div className="container-site">
        <div className="panel-blood flex flex-col gap-8 p-7 sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-16">
          <div>
            <span className="block w-24 text-gold" data-reveal="up" aria-hidden="true">
              <Knife />
            </span>
            <h2 id="order-panel-title" className="display-2 mt-6 max-w-[18ch]">
              {c.orderTitle}
            </h2>
            <p className="lede mt-5 max-w-[44ch] text-ivory/85">{c.orderText}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href={pathFor(locale, "order")} className="btn btn-primary min-h-14 px-8 text-base">
              {dict.actions.order}
              <ArrowIcon />
            </Link>
            <a href={`tel:${business.phone.e164}`} className="btn btn-secondary">
              <PhoneIcon />
              {dict.actions.callShop}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
