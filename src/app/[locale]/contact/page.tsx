import { definePage } from "@/app/_lib/define-page";
import { ContactPage } from "@/features/contact/ContactPage";

const page = definePage({ route: "contact", render: (locale, dict) => <ContactPage locale={locale} dict={dict} /> });

export const generateMetadata = page.generateMetadata;
export default page.Page;
