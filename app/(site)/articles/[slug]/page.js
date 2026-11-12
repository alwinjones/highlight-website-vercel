import { notFound } from 'next/navigation'
import { db } from '@/lib/supabase'
import { Img, Disclosure } from '@/components/ui'
export const dynamic = 'force-dynamic'
const get = async (slug) => (await db().from('articles').select('*').eq('slug', slug).maybeSingle()).data
export async function generateMetadata({ params }) { const a = await get(params.slug); return a ? { title: a.seo_title || a.title, description: a.seo_description || a.excerpt } : {} }
export default async function Article({ params }) {
  const a = await get(params.slug)
  if (!a) notFound()
  return <article className="read"><h1>{a.title}</h1><Img src={a.image_url} alt={a.title} /><Disclosure />
    {(a.body || '').split(/\n\s*\n/).map((t, i) => <p key={i}>{t}</p>)}</article>
}
