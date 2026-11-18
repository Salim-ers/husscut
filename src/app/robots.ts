import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/site";

/** Préproduction : tout est interdit aux robots. Production : site ouvert et sitemap déclaré. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
