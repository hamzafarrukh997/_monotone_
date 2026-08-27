import type { Metadata } from "next";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Monotone uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <h1>Cookie Policy</h1>
      <p>Last updated: 28 August 2026</p>
      <p>Placeholder. Replace with reviewed legal text before launch.</p>

      <h2>What cookies are</h2>
      <p>Placeholder.</p>

      <h2>How we use cookies</h2>
      <p>Placeholder.</p>

      <h2>Managing cookies</h2>
      <p>Placeholder.</p>

      <p>
        Questions? <a href={routes.contact}>Contact us</a>.
      </p>
    </>
  );
}
