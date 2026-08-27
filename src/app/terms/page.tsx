import type { Metadata } from "next";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Monotone website and services.",
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p>Last updated: 28 August 2026</p>
      <p>Placeholder. Replace with reviewed legal text before launch.</p>

      <h2>Use of the site</h2>
      <p>Placeholder.</p>

      <h2>Engagements</h2>
      <p>Placeholder.</p>

      <h2>Liability</h2>
      <p>Placeholder.</p>

      <p>
        Questions? <a href={routes.contact}>Contact us</a>.
      </p>
    </>
  );
}
