import { createClient } from '@supabase/supabase-js'
// Public, read-only access (the database rules only allow reading published content).
export const db = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { auth: { persistSession: false } })
