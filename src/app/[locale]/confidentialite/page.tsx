import { definePage } from "@/app/_lib/define-page";
import { PrivacyPage } from "@/features/legal/PrivacyPage";

const page = definePage({ route: "privacy", only: "fr", render: (locale, dict) => <PrivacyPage locale={locale} dict={dict} /> });

export const generateMetadata = page.generateMetadata;
export default page.Page;
