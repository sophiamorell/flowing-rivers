import { Resend } from "resend";
import { contactPayloadSchema } from "@/lib/contact-schema";
import { site } from "@/content/site";

export const runtime = "nodejs";

/* Spam controls: a form filled in under this many ms is not a person. */
const MIN_ELAPSED_MS = 3000;

/* Rate limit: 5 submissions per IP per hour. In-memory is fine at this scale;
   it resets whenever the serverless function cold-starts. */
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "invalid", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;

  /* Honeypot filled or submitted too fast: pretend it worked, send nothing. */
  if (data.website || data.elapsedMs < MIN_ELAPSED_MS) {
    return Response.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from =
    process.env.CONTACT_FROM || `${site.name} <onboarding@resend.dev>`;

  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_EMAIL is not set");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "(not given)"}`,
    `Preferred format: ${data.format || "(not given)"}`,
    "",
    "What brings you here?",
    data.message,
    "",
    `Sent from the ${site.name} website contact form.`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New message from ${data.name} via ${site.name}`,
      text,
    });
    if (error) {
      console.error("[contact] Resend error", error);
      /* Resend's error *name* (e.g. validation_error) is safe to return and
         makes misconfiguration diagnosable from the browser. The full message
         stays in the function log. */
      return Response.json(
        { ok: false, error: "send_failed", detail: error.name },
        { status: 502 },
      );
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
