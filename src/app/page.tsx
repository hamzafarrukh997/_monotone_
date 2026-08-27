import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { ContactCTA } from "@/components/ContactCTA";
import { site } from "@/content/site";
import { services, offers, portfolio, routes } from "@/lib/links";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  description: site.description,
};

const faqs = [
  {
    q: "How do we get started?",
    a: "Book a call and we'll scope the work, agree a plan, and get moving — usually within a week.",
  },
  {
    q: "Do you work with our existing team?",
    a: "Yes. We slot in alongside in-house teams or run the whole engagement end to end.",
  },
  {
    q: "What does it cost?",
    a: "Most work is fixed-scope or a monthly retainer. Reach out and we'll give you a clear number.",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Section aria-label="Introduction">
        <p className="text-sm font-medium uppercase tracking-wide text-muted">
          {site.shortDescription}
        </p>
        <h1 className="mt-4 max-w-3xl text-title font-semibold text-fg sm:text-display">
          Design, web, and growth under one calm, monochrome roof.
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-muted">{site.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={site.cta.href}>{site.cta.label}</Button>
          <Button href={routes.work} variant="secondary">
            View our work
          </Button>
        </div>
      </Section>

      {/* Services */}
      <Section aria-label="Services" className="border-t border-border">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-title font-semibold text-fg">What we do</h2>
          <Link href={routes.services}>All services →</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <Card
              key={service.slug}
              href={routes.service(service.slug)}
              title={service.title}
            >
              {service.excerpt}
            </Card>
          ))}
        </div>
      </Section>

      {/* Offers */}
      <Section aria-label="Offers" className="border-t border-border">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-title font-semibold text-fg">Ways to work with us</h2>
          <Link href={routes.offers}>All offers →</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {offers.map((offer) => (
            <Card
              key={offer.slug}
              href={routes.offer(offer.slug)}
              title={offer.title}
            >
              {offer.summary}
            </Card>
          ))}
        </div>
      </Section>

      {/* Portfolio */}
      <Section aria-label="Selected work" className="border-t border-border">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-title font-semibold text-fg">Selected work</h2>
          <Link href={routes.work}>All work →</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {portfolio.map((item) => (
            <Card
              key={item.slug}
              href={routes.workItem(item.slug)}
              title={item.title}
            >
              {item.summary}
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section aria-label="Process" className="border-t border-border">
        <h2 className="text-title font-semibold text-fg">A simple, repeatable process</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Discover, design, build, grow — a clear path from first call to
          measurable results, with no surprises along the way.
        </p>
        <div className="mt-6">
          <Button href={routes.process} variant="secondary">
            See how we work
          </Button>
        </div>
      </Section>

      {/* Insights */}
      <Section aria-label="Insights" className="border-t border-border">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-title font-semibold text-fg">Insights</h2>
          <Link href={routes.blog}>All insights →</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.slug}
              href={routes.post(post.slug)}
              eyebrow={new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              title={post.title}
            >
              {post.excerpt}
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ (section only — links to Contact) */}
      <Section aria-label="Frequently asked questions" className="border-t border-border">
        <h2 className="text-title font-semibold text-fg">Frequently asked</h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <dt className="font-medium text-fg">{faq.q}</dt>
              <dd className="mt-2 text-muted">{faq.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-muted">
          Still have a question?{" "}
          <Link href={routes.contact}>Get in touch</Link> and we&apos;ll answer it.
        </p>
      </Section>

      {/* Final CTA */}
      <ContactCTA />
    </>
  );
}
