import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { ContactCTA } from "@/components/ContactCTA";
import { portfolio, offers, routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Monotone works: a clear, repeatable path from first call to measurable results — discover, design, build, grow.",
};

const steps = [
  {
    title: "Discover",
    body: "We dig into your goals, users, and constraints so we're solving the right problem.",
  },
  {
    title: "Design",
    body: "We shape the experience and brand, validating direction before a line of code is written.",
  },
  {
    title: "Build",
    body: "We develop in fast, reviewable increments on a modern, maintainable stack.",
  },
  {
    title: "Grow",
    body: "We measure, iterate, and compound results with content, SEO, and experiments.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="A clear path from first call to results"
        lead="No mystery, no bloat — four stages that keep momentum and remove surprises."
      >
        <Button href={routes.contact}>Book a call</Button>
      </PageHeader>

      <Section aria-label="The stages" className="pt-0">
        <ol className="grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Card eyebrow={`Step ${i + 1}`} title={step.title}>
                {step.body}
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* Cross-links: Offers */}
      <Section aria-label="Offers" className="border-t border-border">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-title font-semibold text-fg">Ready-made ways to start</h2>
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

      {/* Cross-links: Portfolio */}
      <Section aria-label="Work" className="border-t border-border">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-title font-semibold text-fg">The process in action</h2>
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

      <ContactCTA />
    </>
  );
}
