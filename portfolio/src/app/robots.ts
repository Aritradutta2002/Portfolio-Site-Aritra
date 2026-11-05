import type { MetadataRoute } from "next";

const BASE = "https://www.aritrodutta.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/desktop", "/no-stalking"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
