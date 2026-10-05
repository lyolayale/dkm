// Debug: reports which server env vars are present (values never exposed).
// Visit /api/leads/debug in production to verify Vercel env config.
// n8n is the single writer to Supabase — this API only needs the webhook.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    hasWebhook: Boolean(
      process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
    ),
    nodeEnv: process.env.NODE_ENV || null,
  });
}
