/**
 * Form submission service layer.
 *
 * All forms in the app call these functions; no component knows how the
 * submission is delivered. Today the handlers simulate a successful
 * submission (and log the payload). To connect a real backend later, swap the
 * body of each handler for:
 *
 *   - WordPress REST:  POST `{REST_BASE}/wp-json/contact-form-7/v1/contact-forms/{id}/feedback`
 *   - HubSpot:         POST `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formId}`
 *   - Fluent/Gravity:  their REST endpoints
 *
 * No component changes are required.
 */

export interface FormResult {
  ok: boolean;
  message: string;
  /** Present when a backend returns a reference (e.g. form entry id). */
  reference?: string;
}

export interface EnquiryValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface RequestInfoValues {
  name: string;
  email: string;
  phone?: string;
  programmeOfInterest?: string;
  studyLevel?: string;
  message?: string;
}

export interface NewsletterValues {
  email: string;
  name?: string;
}

export interface ProgrammeEnquiryValues {
  name: string;
  email: string;
  programmeTitle: string;
  message?: string;
}

export interface CampusVisitValues {
  name: string;
  email: string;
  preferredDate: string;
  partySize: string;
  message?: string;
}

function simulate(kind: string, payload: unknown): Promise<FormResult> {
  // PLACEHOLDER: replace with a real endpoint call.
  console.info(`[forms] ${kind} submission (simulated):`, payload);
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          ok: true,
          message: "Thank you — your submission has been received (placeholder).",
          reference: `SIM-${Date.now().toString(36)}`,
        }),
      600,
    ),
  );
}

export function submitGeneralEnquiry(values: EnquiryValues): Promise<FormResult> {
  return simulate("general-enquiry", values);
}

export function submitRequestInformation(
  values: RequestInfoValues,
): Promise<FormResult> {
  return simulate("request-information", values);
}

export function submitNewsletter(values: NewsletterValues): Promise<FormResult> {
  return simulate("newsletter", values);
}

export function submitProgrammeEnquiry(
  values: ProgrammeEnquiryValues,
): Promise<FormResult> {
  return simulate("programme-enquiry", values);
}

export function submitCampusVisit(values: CampusVisitValues): Promise<FormResult> {
  return simulate("campus-visit", values);
}
