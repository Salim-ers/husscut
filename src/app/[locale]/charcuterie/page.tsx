import { definePage } from "@/app/_lib/define-page";
import { CharcuteriePage } from "@/features/catalogue/CharcuteriePage";

const page = definePage({ route: "charcuterie", render: (locale, dict) => <CharcuteriePage locale={locale} dict={dict} /> });

export const generateMetadata = page.generateMetadata;
export default page.Page;
