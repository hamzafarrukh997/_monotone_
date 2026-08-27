import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Monotone collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This placeholder describes how we handle your data. Replace with reviewed legal text before launch."
      updated="28 August 2026"
      sections={[
        {
          heading: "Information we collect",
          body: "Placeholder: details of the personal information collected via forms, analytics, and communications.",
        },
        {
          heading: "How we use information",
          body: "Placeholder: how collected information is used to provide and improve our services.",
        },
        {
          heading: "Your rights",
          body: "Placeholder: the rights you have over your data and how to exercise them.",
        },
      ]}
    />
  );
}
