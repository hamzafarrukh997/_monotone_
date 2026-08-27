import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ContactCTA } from "@/components/ContactCTA";
import { portfolio, routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from Monotone — real projects, real outcomes across design, web, and growth.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Selected case studies"
        lead="A look at how we've helped clients design, build, and grow."
      />

      <Section aria-label="All case studies" className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
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
