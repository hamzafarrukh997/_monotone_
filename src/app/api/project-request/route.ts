import { NextResponse } from "next/server";
import {
  sendProjectRequestEmail,
  type ProjectRequestPayload,
} from "@/lib/mail";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_DETAILS = 5000;
const MAX_BUDGET = 80;
const MAX_SERVICE = 80;
const MAX_SERVICES = 12;

type ParsedBody = {
  name?: unknown;
  email?: unknown;
  details?: unknown;
  services?: unknown;
  budget?: unknown;
};

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePayload(body: ParsedBody): ProjectRequestPayload | null {
  const name = asTrimmedString(body.name).slice(0, MAX_NAME);
  const email = asTrimmedString(body.email).slice(0, MAX_EMAIL);
  const details = asTrimmedString(body.details).slice(0, MAX_DETAILS);
  const budget = asTrimmedString(body.budget).slice(0, MAX_BUDGET);

  const services = Array.isArray(body.services)
    ? body.services
        .filter((service): service is string => typeof service === "string")
        .map((service) => service.trim().slice(0, MAX_SERVICE))
        .filter(Boolean)
        .slice(0, MAX_SERVICES)
    : [];

  if (!name || !email || !details || !budget || services.length === 0) {
    return null;
  }

  if (!EMAIL_PATTERN.test(email)) {
    return null;
  }

  return { name, email, details, services, budget };
}

export async function POST(request: Request) {
  let body: ParsedBody;

  try {
    body = (await request.json()) as ParsedBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  try {
    await sendProjectRequestEmail(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send project request email:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong sending your request. Please try again or email us directly.",
      },
      { status: 500 },
    );
  }
}
