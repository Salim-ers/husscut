import { definePage } from "@/app/_lib/define-page";
import { HousePage } from "@/features/house/HousePage";

const page = definePage({ route: "house", only: "en", render: (locale, dict) => <HousePage locale={locale} dict={dict} /> });

export const generateMetadata = page.generateMetadata;
export default page.Page;
