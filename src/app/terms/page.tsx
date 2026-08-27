import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Monotone website and services.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="This placeholder sets out the terms for using our website and services. Replace with reviewed legal text before launch."
      updated="28 August 2026"
      sections={[
        {
          heading: "Use of the site",
          body: "Placeholder: acceptable use of the website and its content.",
        },
        {
          heading: "Engagements",
          body: "Placeholder: how project engagements, scope, and payment are governed.",
        },
        {
          heading: "Liability",
          body: "Placeholder: limitations of liability and disclaimers.",
        },
      ]}
    />
  );
}
