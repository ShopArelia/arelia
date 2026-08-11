import "server-only";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

/**
 * Read-only client for public catalog data (products, NGOs, blogs — all of which
 * have `Public read` RLS policies).
 *
 * Deliberately does NOT touch `cookies()`. Reading cookies opts a route out of
 * static rendering and is not allowed inside a `use cache` scope, so the
 * cookie-aware client in ./server.ts must stay confined to /admin and auth.
 */
export const publicClient = createClient<Database>(supabaseUrl!, supabaseKey!, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
