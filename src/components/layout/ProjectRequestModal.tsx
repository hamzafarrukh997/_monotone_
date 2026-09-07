"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { site } from "@/content/site";

type ProjectRequestModalProps = {
  open: boolean;
  onClose: () => void;
};

type FieldErrors = {
  budget: boolean;
  details: boolean;
  email: boolean;
  name: boolean;
  services: boolean;
};

type SubmitState = "idle" | "sending" | "sent" | "error";
type ErrorKind = "validation" | "server";

const emptyErrors: FieldErrors = {
  budget: false,
  details: false,
  email: false,
  name: false,
  services: false,
};

function revealDelay(index: number) {
  return { "--request-delay": `${index * 0.07}s` } as CSSProperties;
}

function AnimatedWords({ text }: { text: string }) {
  const words = text.split(" ");

  return words.map((word, index) => (
    <span className="project-request__word-clip" key={`${word}-${index}`}>
      <span
        className="project-request__word"
        style={{ "--word-delay": `${index * 0.055}s` } as CSSProperties}
      >
        {word}
        {index < words.length - 1 ? "\u00a0" : null}
      </span>
    </span>
  ));
}

export function ProjectRequestModal({ open, onClose }: ProjectRequestModalProps) {
  const { projectRequest } = site;
  const dialogRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const openRef = useRef(open);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>(emptyErrors);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind>("validation");

  useEffect(() => {
    openRef.current = open;
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 650);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (confirmOpen) setConfirmOpen(false);
        else setConfirmOpen(true);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("inert") && element.offsetParent !== null);

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [confirmOpen, open]);

  const resetForm = () => {
    formRef.current?.reset();
    setSelectedServices([]);
    setSelectedBudget("");
    setErrors(emptyErrors);
    setErrorKind("validation");
  };

  const closeAnyway = () => {
    setConfirmOpen(false);
    setSubmitState("idle");
    resetForm();
    onClose();
  };

  const closeFromPanel = () => {
    setConfirmOpen(false);
    onClose();
  };

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
    setErrors((current) => ({ ...current, services: false }));
    if (submitState === "error") setSubmitState("idle");
  };

  const selectBudget = (budget: string) => {
    setSelectedBudget(budget);
    setErrors((current) => ({ ...current, budget: false }));
    if (submitState === "error") setSubmitState("idle");
  };

  const clearError = (field: keyof FieldErrors) => {
    setErrors((current) => ({ ...current, [field]: false }));
    if (submitState === "error") setSubmitState("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "sending" || submitState === "sent") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const name = String(formData.get("name") ?? "").trim();
    const details = String(formData.get("details") ?? "").trim();
    const nextErrors: FieldErrors = {
      services: selectedServices.length === 0,
      budget: !selectedBudget,
      name: !name,
      email: !email.validity.valid || !email.value.trim(),
      details: !details,
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setErrorKind("validation");
      setSubmitState("error");
      const firstInvalid = form.querySelector<HTMLElement>(
        '[data-error="true"] button, [data-error="true"] input, [data-error="true"] textarea, input:invalid, textarea:invalid',
      );
      firstInvalid?.focus();
      return;
    }

    setSubmitState("sending");

    try {
      const response = await fetch("/api/project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email.value.trim(),
          details,
          services: selectedServices,
          budget: selectedBudget,
        }),
      });

      if (!openRef.current) return;

      if (!response.ok) {
        setErrorKind("server");
        setSubmitState("error");
        return;
      }

      setSubmitState("sent");
      resetForm();

      window.setTimeout(() => {
        if (openRef.current) setSubmitState("idle");
      }, 6000);
    } catch {
      if (!openRef.current) return;
      setErrorKind("server");
      setSubmitState("error");
    }
  };

  return (
    <div
      id="project-request-dialog"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-request-title"
      aria-hidden={!open}
      data-open={open}
      data-lenis-prevent
      className="project-request"
      inert={!open}
      tabIndex={-1}
    >
      <button
        type="button"
        className="project-request__backdrop"
        aria-label="Review closing the project request form"
        onClick={() => setConfirmOpen(true)}
      />

      <div className="project-request__panel-wrap">
        <form
          ref={formRef}
          className="project-request__form"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={submitState === "sending"}
          inert={confirmOpen}
        >
          <div
            className="project-request__content"
            data-submitting={submitState === "sending"}
          >
            <header className="project-request__header">
              <h2 id="project-request-title" className="project-request__title">
                <AnimatedWords text={projectRequest.title} />
              </h2>

              <button
                type="button"
                className="project-request__mobile-close"
                aria-label="Close project request form"
                onClick={closeFromPanel}
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="project-request__fields">
              <fieldset
                className="project-request__group project-request__reveal"
                style={revealDelay(0)}
                data-error={errors.services}
              >
                <legend>{projectRequest.servicePrompt}</legend>
                <div className="project-request__options">
                  {projectRequest.serviceOptions.map((service) => {
                    const selected = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        aria-pressed={selected}
                        className="project-request__option"
                        data-selected={selected}
                        onClick={() => toggleService(service)}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="services" value={selectedServices.join(", ")} />
              </fieldset>

              <fieldset
                className="project-request__group project-request__reveal"
                style={revealDelay(1)}
                data-error={errors.budget}
              >
                <legend>{projectRequest.budgetPrompt}</legend>
                <div className="project-request__options">
                  {projectRequest.budgetOptions.map((budget) => (
                    <button
                      type="button"
                      key={budget}
                      aria-pressed={selectedBudget === budget}
                      className="project-request__option"
                      data-selected={selectedBudget === budget}
                      onClick={() => selectBudget(budget)}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="budget" value={selectedBudget} />
              </fieldset>

              <fieldset
                className="project-request__group project-request__reveal"
                style={revealDelay(2)}
              >
                <legend>{projectRequest.detailsPrompt}</legend>
                <div className="project-request__identity-row">
                  <label className="project-request__input-wrap" data-error={errors.name}>
                    <span className="sr-only">Name</span>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder={projectRequest.namePlaceholder}
                      onInput={() => clearError("name")}
                    />
                  </label>

                  <label className="project-request__input-wrap" data-error={errors.email}>
                    <span className="sr-only">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={projectRequest.emailPlaceholder}
                      onInput={() => clearError("email")}
                    />
                  </label>
                </div>

                <label
                  className="project-request__textarea-wrap"
                  data-error={errors.details}
                >
                  <span className="sr-only">Project details</span>
                  <textarea
                    name="details"
                    required
                    placeholder={projectRequest.detailsPlaceholder}
                    onInput={() => clearError("details")}
                  />
                </label>
              </fieldset>
            </div>
          </div>

          <div
            className="project-request__loader"
            aria-hidden={submitState !== "sending"}
            data-visible={submitState === "sending"}
          >
            <span />
            <span />
            <span />
          </div>

          <div className="project-request__submit-row project-request__reveal" style={revealDelay(3)}>
            <p
              className="project-request__message"
              data-state={submitState}
              aria-live="polite"
            >
              {submitState === "error"
                ? errorKind === "server"
                  ? projectRequest.sendErrorMessage
                  : projectRequest.errorMessage
                : submitState === "sent"
                  ? projectRequest.successMessage
                  : ""}
            </p>

            <button
              type="submit"
              className="project-request__submit"
              data-state={submitState}
              aria-label={
                submitState === "sent"
                  ? projectRequest.sentLabel
                  : projectRequest.submitLabel
              }
              disabled={submitState === "sending" || submitState === "sent"}
            >
              <span className="project-request__submit-label" aria-hidden="true">
                <span>
                  <span>{projectRequest.submitLabel}</span>
                  <span>{projectRequest.sentLabel}</span>
                </span>
              </span>
              <span className="project-request__submit-icon" aria-hidden="true">
                <span className="project-request__submit-arrow">←</span>
                <span className="project-request__submit-check">✓</span>
              </span>
            </button>
          </div>
        </form>
      </div>

      <div className="project-request__confirm-zone" aria-hidden={!confirmOpen}>
        <section
          className="project-request__confirm"
          data-open={confirmOpen}
          inert={!confirmOpen}
          aria-labelledby="project-request-confirm-title"
        >
          <h3 id="project-request-confirm-title">Leave this project request?</h3>
          <div className="project-request__confirm-actions">
            <button type="button" onClick={() => setConfirmOpen(false)}>
              Back to form
            </button>
            <button type="button" onClick={closeAnyway}>
              Close anyway
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
