import { createClient } from "@supabase/supabase-js";

// Minimal browser client for public lead inserts.
// Requires:
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY  (anon/public key — NOT the service_role secret)
// The `public.leads` table must have RLS enabled + an INSERT policy for anon,
// e.g. the "Allow public inserts" policy you already created.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Warn once in dev so a missing env doesn't fail silently.
  // ContactForm checks `isSupabaseConfigured` before attempting an insert.
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY — lead inserts will be skipped.",
    );
  }
}

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;
