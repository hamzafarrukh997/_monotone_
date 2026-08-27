import { site } from "@/content/site";
import { routes } from "@/lib/links";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

type ContactCTAProps = {
  heading?: string;
  body?: string;
};

/**
 * Reusable "Book a call" CTA block. Dropped at the foot of every detail page
 * (services, work, offers, blog, process) so no page is a dead end. Content
 * comes from content/site.ts.
 */
export function ContactCTA({
  heading = "Have a project in mind?",
  body = "Tell us what you're working on and we'll map out the fastest path to results.",
}: ContactCTAProps) {
  return (
    <Section
      aria-label="Contact call to action"
      className="border-t border-border bg-surface-muted"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-title font-semibold text-fg">{heading}</h2>
          <p className="mt-2 text-muted">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={site.cta.href}>{site.cta.label}</Button>
          <Button href={routes.contact} variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </Section>
  );
}
