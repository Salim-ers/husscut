"use client";

import { useParams } from "next/navigation";
import { NotFoundView } from "@/features/errors/NotFoundView";
import { isLocale } from "@/i18n/config";

/** 404 dans la mise en page du site (page inconnue sous /fr ou /en). */
export default function LocaleNotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params.locale) ? params.locale : "fr";
  return <NotFoundView locale={locale} />;
}
