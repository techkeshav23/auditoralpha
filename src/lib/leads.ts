import { z } from "zod";
import { DEMO_BANDS } from "./plans";
import { PRIMARY_STACK, STACK_OPTIONS } from "./integrations";

/** Requests larger than this are rejected before parsing. */
export const MAX_LEAD_BYTES = 10_000;

const email = z.email({ error: "Enter a valid work email." }).max(254, "That email address is too long.");

const text = (label: string, max: number) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} is too long.`);

/** Every form on the site posts one of these to `/api/leads`. */
export const leadSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("health-check"), email, company: text("Company", 200) }),
  z.object({ type: z.literal("send-link"), email }),
  z.object({
    type: z.literal("statement"),
    email,
    revenue: z
      .number({ error: "Enter your annual revenue." })
      .positive("Enter your annual revenue.")
      .max(1_000_000_000, "Enter your annual revenue."),
    rate: z
      .number({ error: "Enter a leakage rate." })
      .positive("Enter a leakage rate.")
      .max(0.05, "Leakage rate must be 5% or less."),
  }),
  z.object({
    type: z.literal("stack-request"),
    email,
    stack: z.enum(STACK_OPTIONS, { error: "Choose your stack." }),
  }),
  z.object({
    type: z.literal("demo"),
    name: text("Your name", 100),
    email,
    company: text("Company", 200),
    revenueBand: z.enum(DEMO_BANDS, { error: "Choose your annual revenue." }),
    stack: z.enum([PRIMARY_STACK, ...STACK_OPTIONS], { error: "Choose your stack." }),
    message: z.string().trim().max(2000, "Keep it under 2,000 characters.").optional(),
  }),
]);

export type Lead = z.infer<typeof leadSchema>;
export type LeadResponse =
  { ok: true; reference: string } | { ok: false; error: string; fields?: Record<string, string> };
