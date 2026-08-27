import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Monotone by email or WhatsApp, or book a call to talk through your project.",
};

export default function ContactPage() {
  const { contact } = site;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your project"
        lead="Tell us what you're working on. We'll get back to you quickly with next steps."
      />

      <Section aria-label="Contact details" className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card title="Email">
            <a className="hover:text-fg" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </Card>
          <Card title="WhatsApp">
            <a
              className="hover:text-fg"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.whatsapp}
            </a>
          </Card>
          <Card title="Location">{contact.location}</Card>
          <Card title="Availability">{contact.availability}</Card>
        </div>
      </Section>
    </>
  );
}
