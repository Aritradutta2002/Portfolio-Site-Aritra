import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aritra Dutta — Full Stack Application Engineer",
    short_name: "Aritra Dutta",
    description:
      "Full Stack Application Engineer at TCS. Scalable Java microservices, Azure PaaS, and GenAI platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
