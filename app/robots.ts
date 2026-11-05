import type { MetadataRoute } from "next";
import siteCopy from "@/lib/site-copy.json";

const baseUrl = siteCopy.meta.baseUrl.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
