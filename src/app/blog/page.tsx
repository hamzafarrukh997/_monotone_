import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { InsightsIndex } from "@/components/sections/InsightsIndex";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Clear, useful thinking on brand, websites, content, and sustainable digital growth.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <InsightsIndex posts={posts} />;
}
