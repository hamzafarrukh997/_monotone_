import type { Metadata } from "next";
import { OffersHero } from "@/components/sections/OffersHero";
import { OffersPackagesSection } from "@/components/sections/OffersPackagesSection";
import { OffersNotSure } from "@/components/sections/OffersNotSure";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Starter, Complete, and Support — three guaranteed ways to work with Monotone.",
};

export default function OffersPage() {
  return (
    <>
      <OffersHero />
      <OffersPackagesSection />
      <OffersNotSure />
    </>
  );
}
