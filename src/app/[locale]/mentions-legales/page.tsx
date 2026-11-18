import { definePage } from "@/app/_lib/define-page";
import { LegalNoticePage } from "@/features/legal/LegalNoticePage";

const page = definePage({ route: "legal", only: "fr", render: (locale, dict) => <LegalNoticePage locale={locale} dict={dict} /> });

export const generateMetadata = page.generateMetadata;
export default page.Page;
