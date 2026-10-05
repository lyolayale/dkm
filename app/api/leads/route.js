// Server-side lead intake: forwards to n8n, which owns the DB insert + email.
// n8n is the single writer to `public.leads` (prevents duplicate rows).
// Uses server-only env vars — never expose keys to the browser:
//   N8N_WEBHOOK_URL           (or NEXT_PUBLIC_N8N_WEBHOOK_URL)
//
// NOTE: env vars are read inside the handler (not at module top level) so
// Vercel runtime env is always picked up, even if the bundle was built
// before the vars were added.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function getConfig() {
  const webhook =
    process.env.N8N_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
    "";
  return { webhook };
}

export async function POST(req) {
  const { webhook } = getConfig();
  let body = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const budget = String(body.budget || "not sure").trim() || "not sure";
  const message = String(body.message || "").trim();
  const source = String(body.source || "contact-form").trim();
  const estimate = body.estimate ?? null;

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return Response.json(
      { error: "Please provide a name, valid email, and a message (10+ chars)." },
      { status: 400 },
    );
  }

  // n8n is the single writer: forward everything it needs for the
  // Supabase insert + email in one payload. Include the needs[] mapping
  // (budget, source, estimate add-on ids) so the workflow can store them
  // the same way the API used to.
  const needs = [budget, source];
  if (estimate) {
    if (estimate.mode) needs.push(`mode:${estimate.mode}`);
    if (estimate.total != null) needs.push(`total:${estimate.total}`);
    needs.push(
      ...(estimate.web?.addonIds ?? []),
      ...(estimate.consulting?.addonIds ?? []),
    );
  }
  const estimateMessage = estimate?.summary?.length
    ? `${message}\n\n--- Estimate (${estimate.modeLabel}, $${estimate.total}) ---\n${estimate.summary.join("\n")}`
    : message;

  if (!webhook) {
    console.error("[api/leads] Missing N8N_WEBHOOK_URL — cannot forward lead.");
    return Response.json(
      {
        error: "Lead could not be saved.",
        details: { n8n: "not configured" },
      },
      { status: 502 },
    );
  }

  try {
    const payload = {
      name,
      email,
      company: body.company ? String(body.company) : null,
      budget,
      message,
      // Pre-mapped row for the n8n Supabase node — insert as-is.
      leadRow: {
        name,
        email,
        company: body.company ? String(body.company) : null,
        message: estimateMessage,
        needs,
        status: "New",
      },
      sentAt: new Date().toISOString(),
      source,
      ...(estimate ? { estimate } : {}),
    };
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Webhook returned " + res.status);
    return Response.json({ ok: true, n8n: "sent" }, { status: 200 });
  } catch (err) {
    console.error("[api/leads] n8n webhook failed:", err);
    return Response.json(
      {
        error: "Lead could not be saved.",
        details: { n8n: err instanceof Error ? err.message : "webhook failed" },
      },
      { status: 502 },
    );
  }
}
