import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Radna strana za podesavanje grada; nema sta da trazi u pretrazi.
      disallow: ["/api/", "/sr/provera-grada", "/en/provera-grada"],
    },
    sitemap: "https://popzify.com/sitemap.xml",
    host: "https://popzify.com",
  };
}
