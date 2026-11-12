'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { sb } from '@/lib/browser'
export default function Admin({ children }) {
  const path = usePathname(), r = useRouter()
  if (path.startsWith('/admin/login')) return children
  const out = async () => { await sb().auth.signOut(); r.push('/admin/login'); r.refresh() }
  return <div className="admin"><nav className="anav"><b>HIGHLIGHT admin</b>
    {[['Dashboard', '/admin'], ['Articles', '/admin/articles'], ['Products', '/admin/products'], ['Categories', '/admin/categories']].map(([n, h]) => <Link key={h} href={h} className={path === h ? 'on' : ''}>{n}</Link>)}
    <Link href="/" target="_blank">View website</Link><button onClick={out}>Sign out</button></nav><div className="apage">{children}</div></div>
}
