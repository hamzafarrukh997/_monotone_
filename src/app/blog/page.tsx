import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { InsightsIndex } from "@/components/sections/InsightsIndex";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website Design & Digital Growth Insights",
  description:
    "Practical guides from Monotone on website planning, design, development, SEO, content, and turning visitors into enquiries.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return <InsightsIndex posts={posts} />;
}
