import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://wolontariat.org.pl/sitemap.xml",
    host: "https://wolontariat.org.pl",
  };
}
