import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { portfolio } from "@/content/portfolio";
import { offers } from "@/content/offers";
import { getAllPosts } from "@/lib/blog";
import { routes } from "@/lib/links";

/** Only canonical, indexable pages belong in the sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPaths = [
    routes.home,
    routes.services,
    routes.offers,
    routes.work,
    routes.blog,
    routes.process,
    routes.contact,
  ];

  const dynamicPaths = [
    ...services.map((s) => routes.service(s.slug)),
    ...offers.map((o) => routes.offer(o.slug)),
    ...portfolio.map((p) => routes.workItem(p.slug)),
  ];

  const pages = [...staticPaths, ...dynamicPaths].map((path) => ({
    url: path === routes.home ? base : new URL(path, base).toString(),
  }));

  const posts = getAllPosts().map((post) => ({
    url: new URL(routes.post(post.slug), base).toString(),
    lastModified: post.updated,
  }));

  return [...pages, ...posts];
}
