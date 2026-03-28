import "server-only"
import { createClient } from "@supabase/supabase-js"

// Service role client — bypasses Row Level Security
// NEVER expose this client or the key to the browser
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (no NEXT_PUBLIC_ prefix)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // Falls back to a placeholder so builds succeed without the env var set;
  // any admin API call will return a 401 if the real key isn't provided at runtime.
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder-set-SUPABASE_SERVICE_ROLE_KEY-in-env",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
