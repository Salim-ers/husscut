import { definePage } from "@/app/_lib/define-page";
import { CookiesPage } from "@/features/legal/CookiesPage";

const page = definePage({ route: "cookies", render: (locale, dict) => <CookiesPage locale={locale} dict={dict} /> });

export const generateMetadata = page.generateMetadata;
export default page.Page;
