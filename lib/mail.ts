import nodemailer from "nodemailer";
import { site } from "@/content/site";

export type ProjectRequestPayload = {
  name: string;
  email: string;
  details: string;
  services: string[];
  budget: string;
};

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function createMailTransport() {
  const port = Number(requiredEnv("ZOHO_SMTP_PORT"));

  return nodemailer.createTransport({
    host: requiredEnv("ZOHO_SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: requiredEnv("ZOHO_SMTP_USER"),
      pass: requiredEnv("ZOHO_SMTP_PASSWORD"),
    },
  });
}

function buildProjectRequestHtml(payload: ProjectRequestPayload) {
  const servicePills = payload.services
    .map(
      (service) => `
        <span style="display:inline-block;margin:0 8px 8px 0;padding:8px 14px;border:1px solid rgba(43,43,43,0.22);border-radius:999px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1;letter-spacing:-0.02em;color:#2b2b2b;background:#ffffff;">
          ${escapeHtml(service)}
        </span>`,
    )
    .join("");

  const detailsHtml = escapeHtml(payload.details).replaceAll("\n", "<br />");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New project request</title>
  </head>
  <body style="margin:0;padding:0;background:#f2eee9;color:#2b2b2b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f2eee9;margin:0;padding:0;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid rgba(43,43,43,0.08);">
            <tr>
              <td style="height:6px;background:#ff5a1f;font-size:0;line-height:0;">&nbsp;</td>
            </tr>

            <tr>
              <td style="padding:36px 32px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#2b2b2b;">
                      <span style="display:inline-block;width:8px;height:8px;margin-right:10px;border-radius:50%;background:#ff5a1f;vertical-align:middle;"></span>
                      <span style="vertical-align:middle;">Monotone / Project request</span>
                    </td>
                  </tr>
                </table>

                <h1 style="margin:28px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:42px;line-height:0.95;font-weight:400;letter-spacing:-0.06em;color:#2b2b2b;">
                  New project<br />request<span style="color:#ff5a1f;">.</span>
                </h1>

                <p style="margin:18px 0 0;max-width:34em;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:rgba(43,43,43,0.68);">
                  A new enquiry just came through the website. Reply directly to this email to continue the conversation with ${escapeHtml(payload.name)}.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(43,43,43,0.18);">
                  <tr>
                    <td width="50%" valign="top" style="padding:20px 18px 20px 0;border-bottom:1px solid rgba(43,43,43,0.18);">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:rgba(43,43,43,0.48);">
                        Name
                      </div>
                      <div style="margin-top:8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.15;letter-spacing:-0.045em;color:#2b2b2b;">
                        ${escapeHtml(payload.name)}
                      </div>
                    </td>
                    <td width="50%" valign="top" style="padding:20px 0 20px 18px;border-bottom:1px solid rgba(43,43,43,0.18);border-left:1px solid rgba(43,43,43,0.18);">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:rgba(43,43,43,0.48);">
                        Email
                      </div>
                      <div style="margin-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.4;letter-spacing:-0.02em;color:#2b2b2b;">
                        <a href="mailto:${escapeHtml(payload.email)}" style="color:#2b2b2b;text-decoration:underline;text-decoration-color:rgba(43,43,43,0.25);">
                          ${escapeHtml(payload.email)}
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding:20px 0;border-bottom:1px solid rgba(43,43,43,0.18);">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:rgba(43,43,43,0.48);">
                        Budget
                      </div>
                      <div style="margin-top:8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.15;letter-spacing:-0.045em;color:#ff5a1f;">
                        ${escapeHtml(payload.budget)}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 8px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:rgba(43,43,43,0.48);">
                  Services
                </div>
                <div style="margin-top:14px;">
                  ${servicePills}
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px 36px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:rgba(43,43,43,0.48);">
                  Project details
                </div>
                <div style="margin-top:14px;padding:20px 22px;border-radius:18px;background:#f2eee9;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;letter-spacing:-0.015em;color:#2b2b2b;">
                  ${detailsHtml}
                </div>

                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
                  <tr>
                    <td style="border-radius:999px;background:#ff5a1f;">
                      <a href="mailto:${escapeHtml(payload.email)}?subject=${encodeURIComponent(`Re: Your project with ${site.name}`)}" style="display:inline-block;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:400;letter-spacing:-0.02em;color:#ffffff;text-decoration:none;">
                        Reply to ${escapeHtml(payload.name)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:22px 32px;background:#2b2b2b;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:-0.02em;color:rgba(255,255,255,0.72);">
                      Sent from the <span style="color:#ffffff;">${escapeHtml(site.name.toLowerCase())}</span> website
                    </td>
                    <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#ff5a1f;">
                      ${escapeHtml(site.name)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendProjectRequestEmail(payload: ProjectRequestPayload) {
  const to = requiredEnv("CONTACT_EMAIL_TO");
  const from = requiredEnv("CONTACT_EMAIL_FROM");
  const transport = createMailTransport();

  const services = payload.services.join(", ");
  const subject = `New project request from ${payload.name}`;

  const text = [
    "Monotone / Project request",
    "",
    "New project request.",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Services: ${services}`,
    `Budget: ${payload.budget}`,
    "",
    "Details:",
    payload.details,
    "",
    `Sent from the ${site.name} website`,
  ].join("\n");

  await transport.sendMail({
    from: `${site.name} <${from}>`,
    to,
    replyTo: `"${payload.name.replaceAll('"', "")}" <${payload.email}>`,
    subject,
    text,
    html: buildProjectRequestHtml(payload),
  });
}
