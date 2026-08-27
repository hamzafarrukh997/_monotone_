import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ContactCTA } from "@/components/ContactCTA";
import { getAllPosts } from "@/lib/blog";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on design, web development, and growth from the Monotone team.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Ideas worth sharing"
        lead="Practical notes on design, web development, and growth."
      />

      <Section aria-label="All posts" className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Card
              key={post.slug}
              href={routes.post(post.slug)}
              eyebrow={formatDate(post.date)}
              title={post.title}
            >
              {post.excerpt}
            </Card>
          ))}
        </div>
      </Section>

      <ContactCTA />
    </>
  );
}
