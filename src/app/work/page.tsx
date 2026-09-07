import type { Metadata } from "next";
import { WorkIndex } from "@/components/sections/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected Monotone projects across brand, websites, content, and growth.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <WorkIndex />;
}
