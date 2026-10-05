// Server-side lead intake: Supabase insert (service_role) + n8n email notify.
// Supabase (via this API) is the single writer to `public.leads` — the n8n
// workflow must NOT contain a Supabase insert node (it only sends the email).
// Uses server-only env vars — never expose SERVICE_ROLE to the browser:
//   NEXT_PUBLIC_SUPABASE_URL  (or SUPABASE_URL)
//   SUPABASE_SERVICE_ROLE_KEY
//   N8N_WEBHOOK_URL           (or NEXT_PUBLIC_N8N_WEBHOOK_URL)
//
// NOTE: env vars are read inside the handler (not at module top level) so
// Vercel runtime env is always picked up, even if the bundle was built
// before the vars were added.
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function getConfig() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const webhook =
    process.env.N8N_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
    "";
  return { supabaseUrl, serviceKey, webhook };
}

function supabaseAdmin(supabaseUrl, serviceKey) {
  if (!supabaseUrl || !serviceKey) return null;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}

export async function POST(req) {
  const { supabaseUrl, serviceKey, webhook } = getConfig();
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

  // Supabase is the single writer: insert here with the service_role key.
  // n8n only sends the email notification (no Supabase node in workflow).
  const needs = [budget, source];
  if (estimate) {
    if (estimate.mode) needs.push(`mode:${estimate.mode}`);
    if (estimate.total != null) needs.push(`total:${estimate.total}`);
    needs.push(
      ...(estimate.web?.addonIds ?? []),
      ...(estimate.consulting?.addonIds ?? []),
    );
  }
  const leadRow = {
    name,
    email,
    company: body.company ? String(body.company) : null,
    message: estimate?.summary?.length
      ? `${message}\n\n--- Estimate (${estimate.modeLabel}, $${estimate.total}) ---\n${estimate.summary.join("\n")}`
      : message,
    needs,
    status: "New",
  };

  const errors = {};
  let supabaseId = null;

  const admin = supabaseAdmin(supabaseUrl, serviceKey);
  if (admin) {
    const { data, error } = await admin
      .from("leads")
      .insert(leadRow)
      .select("id")
      .single();
    if (error) {
      console.error("[api/leads] Supabase insert failed:", error.message);
      errors.supabase = error.message;
    } else {
      supabaseId = data?.id ?? null;
    }
  } else {
    console.warn(
      "[api/leads] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — skipping DB insert.",
    );
    errors.supabase = "not configured";
  }

  // Notify n8n (email only — no DB write on that side).
  let n8n = "skipped";
  if (webhook) {
    try {
      const payload = {
        name,
        email,
        budget,
        message,
        sentAt: new Date().toISOString(),
        source,
        ...(estimate ? { estimate } : {}),
        ...(supabaseId ? { supabaseId } : {}),
      };
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Webhook returned " + res.status);
      n8n = "sent";
    } catch (err) {
      console.error("[api/leads] n8n webhook failed:", err);
      errors.n8n = err instanceof Error ? err.message : "webhook failed";
    }
  }

  // Succeed if at least one sink worked — but always surface per-sink
  // status so the browser console shows n8n failures even when Supabase
  // succeeded (otherwise the form looks "successful" with no email sent).
  if (!supabaseId && n8n !== "sent") {
    return Response.json(
      { error: "Lead could not be saved.", details: errors },
      { status: 502 },
    );
  }

  return Response.json(
    {
      ok: true,
      supabaseId,
      n8n,
      ...(Object.keys(errors).length ? { details: errors } : {}),
    },
    { status: 200 },
  );
}
