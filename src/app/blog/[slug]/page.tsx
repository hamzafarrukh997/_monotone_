import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { ContactCTA } from "@/components/ContactCTA";
import { mdxComponents } from "@/components/mdx";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { getServicesForSlugs, routes } from "@/lib/links";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: { canonical: routes.post(meta.slug) },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.excerpt,
      images: meta.cover ? [meta.cover] : undefined,
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const relatedPosts = getRelatedPosts(meta.slug);
  const relatedServices = getServicesForSlugs(meta.relatedServices);

  return (
    <>
      <Container as="article" className="py-section">
        <header className="max-w-3xl">
          <p className="text-sm text-muted">{formatDate(meta.date)}</p>
          <h1 className="mt-3 text-title font-semibold text-fg sm:text-display">
            {meta.title}
          </h1>
          <p className="mt-4 text-lead text-muted">{meta.excerpt}</p>
          {meta.tags.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-sm border border-border px-2 py-1 text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div className="mt-10 max-w-3xl">
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        {/* Related service categories */}
        {relatedServices.length > 0 ? (
          <div className="mt-12 max-w-3xl">
            <h2 className="text-heading font-semibold text-fg">Related services</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedServices.map((service) => (
                <Card
                  key={service.slug}
                  href={routes.service(service.slug)}
                  title={service.title}
                >
                  {service.excerpt}
                </Card>
              ))}
            </div>
          </div>
        ) : null}
      </Container>

      {/* Related posts */}
      {relatedPosts.length > 0 ? (
        <Section aria-label="Related posts" className="border-t border-border">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-title font-semibold text-fg">Keep reading</h2>
            <Link href={routes.blog}>All insights →</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((related) => (
              <Card
                key={related.slug}
                href={routes.post(related.slug)}
                eyebrow={formatDate(related.date)}
                title={related.title}
              >
                {related.excerpt}
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Button href={routes.blog} variant="secondary">
              Back to all insights
            </Button>
          </div>
        </Section>
      ) : null}

      <ContactCTA />
    </>
  );
}
