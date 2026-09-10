import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FAQShowcase } from "@/components/sections/FAQShowcase";
import { InsightArtwork } from "@/components/sections/InsightsIndex";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { getServicesForSlugs, routes } from "@/lib/links";
import { site } from "@/content/site";

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
    title: meta.metaTitle,
    description: meta.excerpt,
    alternates: { canonical: routes.post(meta.slug) },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.excerpt,
      publishedTime: meta.date,
      authors: [site.name],
      images: meta.cover ? [meta.cover] : undefined,
    },
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
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
  const canonicalUrl = new URL(routes.post(meta.slug), site.url).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: meta.title,
        description: meta.excerpt,
        author: { "@type": "Organization", name: site.name },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        datePublished: meta.date,
        dateModified: meta.date,
        mainEntityOfPage: canonicalUrl,
      },
      ...(meta.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: meta.faqs.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="bg-white text-[#2b2b2b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="mx-auto w-full max-w-[120rem] px-5 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24 lg:px-10 lg:pt-24 lg:pb-32">
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-[#2b2b2b]/25 pt-5 font-sans text-[0.65rem] font-semibold tracking-[0.14em] uppercase md:text-xs">
          <a
            href={routes.blog}
            className="group inline-flex items-center gap-3 transition-colors hover:text-accent"
          >
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            Monotone / Insights
          </a>
          <span className="text-[#2b2b2b]/55">{meta.category}</span>
        </div>

        <div className="mt-[clamp(4rem,7vw,8.5rem)] grid items-end gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:gap-20">
          <h1 className="m-0 max-w-[15ch] font-display text-[clamp(3.4rem,6.9vw,8.25rem)] leading-[0.91] font-normal tracking-[-0.075em]">
            {meta.title}
            <span className="text-accent">.</span>
          </h1>

          <div className="max-w-[33rem] lg:pb-2">
            <p className="font-sans text-base leading-[1.62] font-normal text-[#2b2b2b]/70 md:text-lg">
              {meta.excerpt}
            </p>
            <div className="mt-8 flex items-center justify-between gap-5 border-t border-[#2b2b2b]/25 pt-4 font-sans text-xs font-medium text-[#2b2b2b]/60">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span>{meta.readTime}</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-[clamp(4.5rem,8vw,9rem)] max-w-[64rem]">
          <div
            className="article-lead-art insights-card-visual relative overflow-hidden rounded-[clamp(1rem,1.4vw,1.75rem)]"
            role="img"
            aria-label={`${meta.title} article artwork`}
          >
            <InsightArtwork visual={meta.visual} />
          </div>
        </div>
      </header>

      <section
        className="mx-auto w-full max-w-[120rem] px-5 pb-28 md:px-8 md:pb-36 lg:px-10 lg:pb-44"
        aria-label="Article"
      >
        <div className="mx-auto grid max-w-[88rem] gap-14 border-t border-[#2b2b2b]/25 pt-12 lg:grid-cols-[15rem_minmax(0,48rem)] lg:justify-center lg:gap-24 lg:pt-20 xl:gap-32">
          <aside className="font-sans lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-[#2b2b2b]/45 uppercase">
              Inside this guide
            </p>
            {meta.toc.length > 0 ? (
              <ol className="mt-5 border-t border-[#2b2b2b]/20">
                {meta.toc.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[2rem_1fr] gap-2 border-b border-[#2b2b2b]/20 py-3 text-sm leading-[1.45] text-[#2b2b2b]/68"
                  >
                    <span className="text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            ) : null}

            <div className="mt-10">
              <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-[#2b2b2b]/45 uppercase">
                Written by
              </p>
              <p className="mt-2 font-display text-xl tracking-[-0.045em]">
                Monotone
              </p>
            </div>
          </aside>

          <div className="article-prose min-w-0">
            <MDXRemote source={content} />

            <div className="article-prose__end" aria-label="End of article">
              <span>End of article</span>
              <span>{meta.kicker}</span>
            </div>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 || relatedPosts.length > 0 ? (
        <section
          className="mx-auto w-full max-w-[120rem] px-5 pb-28 md:px-8 md:pb-36 lg:px-10 lg:pb-44"
          aria-labelledby="article-next-heading"
        >
          <div className="border-t border-[#2b2b2b]/25 pt-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="font-sans text-xs font-semibold tracking-[0.14em] uppercase">
                  Continue
                </p>
                <h2
                  id="article-next-heading"
                  className="mt-4 font-display text-[clamp(2.6rem,5vw,6rem)] leading-[0.95] font-normal tracking-[-0.07em]"
                >
                  Keep reading<span className="text-accent">.</span>
                </h2>
              </div>

              {relatedServices[0] ? (
                <a
                  href={routes.service(relatedServices[0].slug)}
                  className="hero-cta hero-cta--secondary inline-flex min-h-14 w-fit items-center justify-center rounded-full border border-[#2b2b2b] px-7 font-sans text-sm font-light"
                >
                  <span className="hero-cta__label">
                    Explore {relatedServices[0].title}
                  </span>
                </a>
              ) : null}
            </div>

            {relatedPosts.length > 0 ? (
              <ul className="mt-14 grid border-t border-[#2b2b2b]/25 md:grid-cols-2">
                {relatedPosts.map((related, index) => (
                  <li
                    key={related.slug}
                    className={index === 0 ? "md:border-r md:pr-10" : "md:pl-10"}
                  >
                    <a
                      href={routes.post(related.slug)}
                      className="group block border-b border-[#2b2b2b]/25 py-8 md:min-h-52"
                    >
                      <span className="font-sans text-[0.65rem] font-semibold tracking-[0.13em] text-[#2b2b2b]/50 uppercase">
                        {related.category} / {related.readTime}
                      </span>
                      <span className="mt-5 flex items-start justify-between gap-8 font-display text-[clamp(1.6rem,2.3vw,2.8rem)] leading-[1.08] font-normal tracking-[-0.055em] transition-colors group-hover:text-accent">
                        {related.title}
                        <span className="shrink-0 text-lg text-accent" aria-hidden="true">
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {meta.faqs.length > 0 ? (
        <FAQShowcase
          sectionId={`article-${meta.slug}-faq`}
          heading={{
            before: "Your ",
            accent: "questions,",
            after: " answered",
          }}
          items={meta.faqs}
        />
      ) : null}
    </article>
  );
}
