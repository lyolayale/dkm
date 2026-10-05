// Debug: reports which server env vars are present (values never exposed).
// Visit /api/leads/debug in production to verify Vercel env config.
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    hasSupabaseUrl: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
    ),
    hasServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasWebhook: Boolean(
      process.env.N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
    ),
    nodeEnv: process.env.NODE_ENV || null,
  });
}
