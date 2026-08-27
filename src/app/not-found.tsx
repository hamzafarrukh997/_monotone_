import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section aria-label="Page not found">
      <p className="text-sm font-medium uppercase tracking-wide text-muted">
        404
      </p>
      <h1 className="mt-3 text-title font-semibold text-fg sm:text-display">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        The link may be broken or the page may have moved. Here are some good
        places to pick things back up.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={routes.home}>Back home</Button>
        <Button href={routes.work} variant="secondary">
          View work
        </Button>
        <Button href={routes.services} variant="secondary">
          Services
        </Button>
      </div>
      <p className="mt-6 text-muted">
        Or <Link href={routes.contact}>get in touch</Link> and we&apos;ll point
        you in the right direction.
      </p>
    </Section>
  );
}
