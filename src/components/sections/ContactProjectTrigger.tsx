"use client";

import { openProjectRequest } from "@/lib/projectRequest";
import { Button } from "@/components/ui/Button";

export function ContactProjectTrigger() {
  return (
    <Button
      type="button"
      variant="primary"
      size="lg"
      aria-haspopup="dialog"
      aria-controls="project-request-dialog"
      onClick={openProjectRequest}
      className="hero-cta hero-cta--primary min-h-14 px-7 font-normal"
    >
      <span className="hero-cta__label">Tell us about your project</span>
    </Button>
  );
}
