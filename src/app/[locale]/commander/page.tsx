import { definePage } from "@/app/_lib/define-page";
import { OrderPage } from "@/features/order/OrderPage";

const page = definePage({ route: "order", only: "fr", render: (locale, dict) => <OrderPage locale={locale} dict={dict} /> });

export const generateMetadata = page.generateMetadata;
export default page.Page;
