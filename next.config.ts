import type { NextConfig } from "next";

/**
 * Indexation : seul l'environnement SITE_ENV=production est indexable.
 * Toute autre valeur (préproduction, aperçus Vercel, local) envoie « noindex ».
 */
const isProduction = process.env.SITE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
/** Servi en HTTPS (Vercel ou production) : on peut forcer la mise à niveau des requêtes. */
const servedOverHttps = isProduction || process.env.VERCEL === "1";

/**
 * CSP : le site est généré statiquement, donc sans nonce par requête. Next.js injecte
 * des scripts en ligne (données RSC), d'où 'unsafe-inline' pour script-src. Les autres
 * directives restent strictes. La carte Google n'est chargée qu'après un clic du visiteur.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(servedOverHttps ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  ...(isProduction ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // WebP seul : les sources sont déjà en WebP et l'encodage AVIF à la première demande
    // retardait nettement l'affichage des photos (cache froid).
    formats: ["image/webp"],
    deviceSizes: [360, 480, 640, 768, 960, 1200, 1440, 1920, 2560],
    imageSizes: [64, 96, 128, 192, 256, 320],
    qualities: [70, 78, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [{ source: "/", destination: "/fr", permanent: false }];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
