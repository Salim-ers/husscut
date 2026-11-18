import { definePage } from "@/app/_lib/define-page";
import { HomePage } from "@/features/home/HomePage";

const page = definePage({ route: "home", render: (locale, dict) => <HomePage locale={locale} dict={dict} /> });

export const generateMetadata = page.generateMetadata;
export default page.Page;
