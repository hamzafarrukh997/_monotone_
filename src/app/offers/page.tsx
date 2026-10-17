import type { Metadata } from "next";
import { OffersHero } from "@/components/sections/OffersHero";
import { OffersPackagesSection } from "@/components/sections/OffersPackagesSection";
import { OffersNotSure } from "@/components/sections/OffersNotSure";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website Design & Support Packages",
  description:
    "Compare Monotone's Starter, Complete, and Support packages for a new website, a full digital presence, or ongoing website care.",
  path: "/offers",
});

export default function OffersPage() {
  return (
    <>
      <OffersHero />
      <OffersPackagesSection />
      <OffersNotSure />
    </>
  );
}
