import { MAX_LEAD_BYTES, leadSchema, type LeadResponse } from "@/lib/leads";

const reply = (body: LeadResponse, status: number) => Response.json(body, { status });

/**
 * Receives every form on the site (Health Check sign-up, demo requests, stack
 * requests, "email me the link"), validated against `leadSchema`.
 *
 * Concept build: nothing is stored or forwarded. Before going live, send
 * `parsed.data` to the HubSpot Forms API (or the CRM of record) here, and put
 * rate limiting and a bot check in front of this route.
 */
export async function POST(request: Request) {
  // JSON only: this keeps the route out of reach of cross-site "simple" form posts.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return reply({ ok: false, error: "Send the form as JSON." }, 415);
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_LEAD_BYTES) {
    return reply({ ok: false, error: "That request is too large." }, 413);
  }

  const raw = await request.text();
  if (raw.length > MAX_LEAD_BYTES) return reply({ ok: false, error: "That request is too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply({ ok: false, error: "Something went wrong. Please try again." }, 400);
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    // One message per field, so a form can show every problem at once. Only field-level
    // messages are written for people; validator internals are never echoed back.
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && key !== "type" && !fields[key]) fields[key] = issue.message;
    }
    const first = Object.values(fields)[0];
    return reply({ ok: false, error: first ?? "Something went wrong. Please try again.", fields }, 422);
  }

  return reply({ ok: true, reference: `AA-${crypto.randomUUID().slice(0, 8).toUpperCase()}` }, 201);
}
