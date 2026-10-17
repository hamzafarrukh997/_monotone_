/**
 * Blog reader — the single entry point for reading MDX posts from
 * `content/blog/`. Pages must never touch the filesystem directly; they call
 * these helpers so the frontmatter contract lives in exactly one place.
 *
 * Server-only: uses `fs`. Import from Server Components / metadata only.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  title: string;
  metaTitle: string;
  slug: string;
  date: string;
  updated: string;
  excerpt: string;
  cover: string;
  tags: string[];
  category: string;
  kicker: string;
  readTime: string;
  visual: string;
  featured: boolean;
  toc: string[];
  faqs: { question: string; answer: string }[];
  /** Slugs of related service categories (content/services.ts). */
  relatedServices: string[];
};

export type Post = {
  meta: PostMeta;
  /** Raw MDX body, ready to be compiled by next-mdx-remote. */
  content: string;
};

function readPostFile(fileName: string): Post {
  const fullPath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const meta: PostMeta = {
    title: String(data.title ?? ""),
    metaTitle: String(data.metaTitle ?? data.title ?? ""),
    slug: String(data.slug ?? fileName.replace(/\.mdx?$/, "")),
    date: String(data.date ?? ""),
    updated: String(data.updated ?? data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    cover: String(data.cover ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: String(data.category ?? data.tags?.[0] ?? "Studio notes"),
    kicker: String(data.kicker ?? "Useful thinking, clearly shared."),
    readTime: String(data.readTime ?? "4 min read"),
    visual: String(data.visual ?? "clarity"),
    featured: Boolean(data.featured ?? false),
    toc: Array.isArray(data.toc) ? data.toc.map(String) : [],
    faqs: Array.isArray(data.faqs)
      ? data.faqs
          .map((item) => ({
            question: String(item?.question ?? ""),
            answer: String(item?.answer ?? ""),
          }))
          .filter((item) => item.question && item.answer)
      : [],
    relatedServices: Array.isArray(data.relatedServices)
      ? data.relatedServices.map(String)
      : [],
  };

  return { meta, content };
}

function listPostFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => /\.mdx?$/.test(file));
}

/** All post metadata, newest first. */
export function getAllPosts(): PostMeta[] {
  return listPostFiles()
    .map((file) => readPostFile(file).meta)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.date === b.date) return a.title.localeCompare(b.title);
      return a.date < b.date ? 1 : -1;
    });
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return listPostFiles()
    .map(readPostFile)
    .find((post) => post.meta.slug === slug);
}

/**
 * Related posts, ranked by shared tags + shared related-services, excluding the
 * post itself. Falls back to most-recent posts if nothing overlaps.
 */
export function getRelatedPosts(slug: string, limit = 2): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((post) => post.slug === slug);
  if (!current) return all.slice(0, limit);

  const others = all.filter((post) => post.slug !== slug);
  const scored = others
    .map((post) => {
      const shared =
        post.tags.filter((t) => current.tags.includes(t)).length +
        post.relatedServices.filter((s) =>
          current.relatedServices.includes(s),
        ).length;
      return { post, shared };
    })
    .sort((a, b) => b.shared - a.shared);

  return scored.slice(0, limit).map((entry) => entry.post);
}
