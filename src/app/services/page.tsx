import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ContactCTA } from "@/components/ContactCTA";
import { services, routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design, web development, growth marketing, and maintenance & support — the four ways Monotone helps you build and grow.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Four ways we help you build and grow"
        lead="Each category pairs strategy with hands-on delivery. Explore a category to see what's inside."
      />

      <Section aria-label="Service categories" className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
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

      <ContactCTA />
    </>
  );
}
