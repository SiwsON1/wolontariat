import type { MetadataRoute } from "next";
import { content } from "@/lib/content";
import { getAllCities } from "@/lib/cities";

export const dynamic = "force-static";

const BASE = "https://wolontariat.org.pl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    content.getAllPosts(),
    content.getCategories(),
  ]);
  const cities = getAllCities();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/blog`, priority: 0.8 },
    { url: `${BASE}/wolontariat`, priority: 0.8 },
    { url: `${BASE}/o-nas`, priority: 0.5 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE}/kategoria/${category.slug}`,
    priority: 0.6,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE}/wolontariat/${city.slug}`,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...categoryPages, ...cityPages];
}
