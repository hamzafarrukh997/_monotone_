import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Monotone uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      intro="This placeholder explains how we use cookies and similar technologies. Replace with reviewed legal text before launch."
      updated="28 August 2026"
      sections={[
        {
          heading: "What cookies are",
          body: "Placeholder: a short explanation of cookies and similar technologies.",
        },
        {
          heading: "How we use cookies",
          body: "Placeholder: the categories of cookies used and their purposes.",
        },
        {
          heading: "Managing cookies",
          body: "Placeholder: how visitors can control or disable cookies.",
        },
      ]}
    />
  );
}
