import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Link } from "@/components/ui/Link";
import { routes } from "@/lib/links";

type LegalSection = { heading: string; body: string };

type LegalPageProps = {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

/**
 * Shared layout for the three legal pages. Placeholder copy only — replace with
 * reviewed legal text before launch.
 */
export function LegalPage({ title, intro, updated, sections }: LegalPageProps) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} lead={intro} />
      <Section className="pt-0">
        <div className="max-w-3xl">
          <p className="text-sm text-muted">Last updated: {updated}</p>
          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-heading font-semibold text-fg">
                  {section.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-fg/90">{section.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-muted">
            Questions about this policy?{" "}
            <Link href={routes.contact}>Contact us</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
