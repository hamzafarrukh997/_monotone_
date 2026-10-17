import type { Metadata } from "next";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Monotone collects, uses, and protects your personal data.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>Last updated: 28 August 2026</p>
      <p>Placeholder. Replace with reviewed legal text before launch.</p>

      <h2>Information we collect</h2>
      <p>Placeholder.</p>

      <h2>How we use information</h2>
      <p>Placeholder.</p>

      <h2>Your rights</h2>
      <p>Placeholder.</p>

      <p>
        Questions? <a href={routes.contact}>Contact us</a>.
      </p>
    </>
  );
}
