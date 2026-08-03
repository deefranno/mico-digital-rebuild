"use node";

import { createVlyIntegrations } from "@vly-ai/integrations";
import { action } from "./_generated/server";
import { v } from "convex/values";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function confirmationHtml(args: {
  firstName: string;
  programme: string;
  intake: string;
  refNumber: string;
}) {
  const firstName = escapeHtml(args.firstName);
  const programme = escapeHtml(args.programme);
  const intake = escapeHtml(args.intake);
  const refNumber = escapeHtml(args.refNumber);
  return `
<div style="background:#f4f4f4;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 auto;max-width:600px;">
    <tr>
      <td style="background:#000000;padding:28px 32px;">
        <div style="color:#ffffff;font-size:20px;font-weight:bold;line-height:1.3;">THE MICO UNIVERSITY COLLEGE</div>
        <div style="color:#f2a900;font-size:11px;letter-spacing:2px;margin-top:6px;text-transform:uppercase;">Application received</div>
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;border:1px solid #e5e5e5;border-top:none;padding:32px;">
        <p style="margin:0 0 14px;color:#222222;font-size:15px;line-height:1.6;">Dear ${firstName},</p>
        <p style="margin:0 0 14px;color:#222222;font-size:15px;line-height:1.6;">
          Thank you for applying to The Mico University College. Your application for
          <strong>${programme}</strong> (<span style="color:#555555;">${intake}</span>)
          has been received by the Admissions Office.
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="border:2px solid #f2a900;margin:22px 0;">
          <tr>
            <td style="padding:14px 26px;">
              <div style="font-size:11px;color:#666666;letter-spacing:1px;text-transform:uppercase;">Your application reference</div>
              <div style="font-size:22px;font-weight:bold;color:#000000;margin-top:4px;">${refNumber}</div>
            </td>
          </tr>
        </table>
        <p style="margin:0 0 10px;color:#222222;font-size:15px;line-height:1.6;"><strong>What happens next</strong></p>
        <ul style="margin:0 0 18px;padding-left:20px;color:#444444;font-size:14px;line-height:1.7;">
          <li>We will review your application and supporting documents.</li>
          <li>You may be invited to an interview or aptitude assessment.</li>
          <li>Offers are issued after review — keep an eye on your inbox.</li>
        </ul>
        <p style="margin:0;color:#444444;font-size:14px;line-height:1.7;">
          If you have any questions, contact the Admissions Office at
          <a href="mailto:admissions@mico.edu.jm" style="color:#b98400;">admissions@mico.edu.jm</a>
          or +1 (876) 929-5226, and quote your application reference.
        </p>
      </td>
    </tr>
    <tr>
      <td style="background:#f4f4f4;border:1px solid #e5e5e5;border-top:none;padding:18px 32px;color:#777777;font-size:11px;line-height:1.6;">
        The Mico University College, Marescaux Road, Kingston 5, Jamaica
      </td>
    </tr>
  </table>
</div>`;
}

function confirmationText(args: {
  firstName: string;
  programme: string;
  intake: string;
  refNumber: string;
}) {
  return [
    "THE MICO UNIVERSITY COLLEGE",
    "Application received",
    "",
    `Dear ${args.firstName},`,
    "",
    `Thank you for applying to The Mico University College. Your application for ${args.programme} (${args.intake}) has been received by the Admissions Office.`,
    "",
    `Your application reference: ${args.refNumber}`,
    "",
    "What happens next:",
    "- We will review your application and supporting documents.",
    "- You may be invited to an interview or aptitude assessment.",
    "- Offers are issued after review — keep an eye on your inbox.",
    "",
    "Questions? Contact the Admissions Office at admissions@mico.edu.jm or +1 (876) 929-5226, and quote your application reference.",
  ].join("\n");
}

/**
 * Sends the admission confirmation email to the applicant. Fire-and-forget:
 * the application is already stored by the time this runs, so a missing key
 * or a delivery failure is logged rather than surfaced to the applicant.
 */
export const sendAdmissionConfirmation = action({
  args: {
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    refNumber: v.string(),
    programme: v.string(),
    intake: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.VLY_INTEGRATION_KEY;
    if (!apiKey) {
      console.error(
        "[emails] VLY_INTEGRATION_KEY not set — confirmation email skipped.",
      );
      return { ok: true, sent: false, reason: "missing-key" };
    }

    const vly = createVlyIntegrations({ deploymentToken: apiKey });
    const subject = `Your Mico application (${args.refNumber}) has been received`;

    try {
      const result = await vly.email.send({
        to: args.email,
        subject,
        html: confirmationHtml(args),
        text: confirmationText(args),
      });
      if (result.success) {
        console.log(
          `[emails] Confirmation sent to ${args.email} (ref ${args.refNumber}).`,
        );
        return { ok: true, sent: true };
      }
      console.error(
        `[emails] Send failed for ${args.email}: ${result.error ?? "unknown error"}`,
      );
      return { ok: true, sent: false, reason: result.error ?? "send-failed" };
    } catch (err) {
      console.error("[emails] Exception while sending confirmation:", err);
      return { ok: true, sent: false, reason: "exception" };
    }
  },
});
