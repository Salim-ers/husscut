import { definePage } from "@/app/_lib/define-page";
import { MeatsPage } from "@/features/catalogue/MeatsPage";

const page = definePage({ route: "meats", only: "en", render: (locale, dict) => <MeatsPage locale={locale} dict={dict} /> });

export const generateMetadata = page.generateMetadata;
export default page.Page;
