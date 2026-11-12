import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
// Blocks every /admin page unless you are logged in.
export async function middleware(req) {
  const res = NextResponse.next({ request: req })
  const s = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: { getAll: () => req.cookies.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => res.cookies.set(name, value, options)) } })
  const { data: { user } } = await s.auth.getUser()
  if (!user && !req.nextUrl.pathname.startsWith('/admin/login')) return NextResponse.redirect(new URL('/admin/login', req.url))
  return res
}
export const config = { matcher: ['/admin/:path*'] }
