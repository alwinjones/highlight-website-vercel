'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sb } from '@/lib/browser'
export default function Dash() {
  const [n, setN] = useState({}), [recent, setR] = useState([])
  useEffect(() => { (async () => { const c = sb(), o = {}
    for (const t of ['articles', 'products', 'categories']) o[t] = (await c.from(t).select('*', { count: 'exact', head: true })).count
    o.drafts = (await c.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'draft')).count
    setN(o); setR((await c.from('articles').select('id,title,status,created_at').order('created_at', { ascending: false }).limit(5)).data || []) })() }, [])
  return <><h1>Dashboard</h1><div className="stats">
    {[['Articles', n.articles], ['Draft articles', n.drafts], ['Products', n.products], ['Categories', n.categories]].map(([k, v]) => <div key={k}><b>{v ?? '...'}</b><span>{k}</span></div>)}</div>
    <p><Link className="btn" href="/admin/articles">Write an article</Link> <Link className="btn" href="/admin/products">Add a product</Link></p>
    <h2>Recent activity</h2>{recent.map(a => <p key={a.id}>{a.title} <em>({a.status})</em></p>)}</>
}
