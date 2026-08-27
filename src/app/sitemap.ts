import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { portfolio } from "@/content/portfolio";
import { offers } from "@/content/offers";
import { getAllPosts } from "@/lib/blog";
import { routes } from "@/lib/links";

/**
 * Generated sitemap. Every route is derived from the content layer so new
 * services, offers, case studies, and posts appear automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPaths = [
    routes.home,
    routes.services,
    routes.offers,
    routes.work,
    routes.blog,
    routes.process,
    routes.contact,
    routes.privacyPolicy,
    routes.terms,
    routes.cookiePolicy,
  ];

  const dynamicPaths = [
    ...services.map((s) => routes.service(s.slug)),
    ...offers.map((o) => routes.offer(o.slug)),
    ...portfolio.map((p) => routes.workItem(p.slug)),
    ...getAllPosts().map((post) => routes.post(post.slug)),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === routes.home ? 1 : 0.7,
  }));
}
