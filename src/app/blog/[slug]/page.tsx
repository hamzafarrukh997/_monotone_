import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
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
    <article>
      <h1>{meta.title}</h1>
      <p>
        <small>{meta.date}</small>
      </p>
      <p>{meta.excerpt}</p>
      {meta.tags.length > 0 ? <p>Tags: {meta.tags.join(", ")}</p> : null}

      {/* MDX body renders as default, unstyled HTML elements. */}
      <MDXRemote source={content} />

      {/* Related service categories */}
      {relatedServices.length > 0 ? (
        <section aria-label="Related services">
          <h2>Related services</h2>
          <ul>
            {relatedServices.map((service) => (
              <li key={service.slug}>
                <a href={routes.service(service.slug)}>{service.title}</a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Related posts */}
      {relatedPosts.length > 0 ? (
        <section aria-label="Related posts">
          <h2>Keep reading</h2>
          <ul>
            {relatedPosts.map((related) => (
              <li key={related.slug}>
                <a href={routes.post(related.slug)}>{related.title}</a>
              </li>
            ))}
          </ul>
          <a href={routes.blog}>All insights</a>
        </section>
      ) : null}

      <section aria-label="Contact call to action">
        <a href={routes.contact}>Book a call</a>
      </section>
    </article>
  );
}
