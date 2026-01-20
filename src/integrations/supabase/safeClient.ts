import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Safe Supabase client.
 *
 * In some preview/build environments `import.meta.env.VITE_SUPABASE_URL` may not be injected,
 * which crashes `createClient()` with: "supabaseUrl is required".
 *
 * These fallback values are PUBLIC (anon/publishable) and only used when env vars are missing.
 */
const FALLBACK_SUPABASE_URL = "https://xwduwxvywpkulumpvalr.supabase.co";
const FALLBACK_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZHV3eHZ5d3BrdWx1bXB2YWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjA0MzMsImV4cCI6MjA4MTYzNjQzM30.JtrFa4zuIc0SY6eOT2cLlD9S7kqESDp-J3aJzUT9PYA";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
