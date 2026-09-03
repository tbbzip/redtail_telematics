import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

// Keep these sources aligned with the tags published in GTM-NJBD87XB.
const thirdPartyScriptSources = [
  "https://www.googletagmanager.com",
  "https://tagmanager.google.com",
  "https://www.googleadservices.com",
  "https://www.google.com",
  "https://pagead2.googlesyndication.com",
  "https://googleads.g.doubleclick.net",
  "https://*.clarity.ms",
].join(" ");

const thirdPartyStyleSources = [
  "https://www.googletagmanager.com",
  "https://tagmanager.google.com",
  "https://fonts.googleapis.com",
].join(" ");

const thirdPartyImageSources = [
  "https://www.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.g.doubleclick.net",
  "https://googleads.g.doubleclick.net",
  "https://google.com",
  "https://*.google.com",
  "https://*.google.co.uk",
  "https://pagead2.googlesyndication.com",
  "https://www.googleadservices.com",
  "https://ssl.gstatic.com",
  "https://www.gstatic.com",
  "https://*.clarity.ms",
  "https://c.bing.com",
].join(" ");

const thirdPartyConnectSources = [
  "https://www.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://*.g.doubleclick.net",
  "https://googleads.g.doubleclick.net",
  "https://ad.doubleclick.net",
  "https://google.com",
  "https://*.google.com",
  "https://*.google.co.uk",
  "https://pagead2.googlesyndication.com",
  "https://www.googleadservices.com",
  "https://*.clarity.ms",
  "https://c.bing.com",
].join(" ");

const thirdPartyFrameSources = ["https://www.googletagmanager.com"].join(" ");

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} ${thirdPartyScriptSources}`,
  `style-src 'self' 'unsafe-inline' ${thirdPartyStyleSources}`,
  `img-src 'self' blob: data: https://cdn.sanity.io ${thirdPartyImageSources}`,
  "font-src 'self' data: https://fonts.gstatic.com",
  `connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io ${thirdPartyConnectSources}`,
  `frame-src 'self' ${thirdPartyFrameSources}`,
  "media-src 'self' blob: data:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), geolocation=(), microphone=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Sanity Studio manages its own external assets and authentication flow.
        source: "/((?!studio(?:/|$)).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
