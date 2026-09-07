import type { Metadata } from "next";
import { FAQShowcase } from "@/components/sections/FAQShowcase";
import { Hero } from "@/components/sections/Hero";
import { InsightsShowcase } from "@/components/sections/InsightsShowcase";
import { OffersShowcase } from "@/components/sections/OffersShowcase";
import { ProcessShowcase } from "@/components/sections/ProcessShowcase";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { TestimonialsShowcase } from "@/components/sections/TestimonialsShowcase";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { site } from "@/content/site";

export const metadata: Metadata = {
  description: site.description,
};

export default function HomePage() {
  return (
    <div className="home-section-stack">
      {/* Designed homepage sections */}
      <Hero />

      <ServicesShowcase />

      <OffersShowcase />

      <ProcessShowcase />

      <WorkShowcase />

      <InsightsShowcase />

      <TestimonialsShowcase />

      <FAQShowcase />
    </div>
  );
}
