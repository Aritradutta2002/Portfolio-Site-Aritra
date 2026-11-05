import type { MetadataRoute } from "next";

const BASE = "https://www.aritrodutta.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/classic`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/desktop`, changeFrequency: "monthly", priority: 0.4 },
  ];
}
