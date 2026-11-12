import { notFound } from 'next/navigation'
import { db } from '@/lib/supabase'
import { ArticleCard, ProductCard, Disclosure, Empty } from '@/components/ui'
export const dynamic = 'force-dynamic'
export default async function Category({ params }) {
  const s = db()
  const { data: c } = await s.from('categories').select('*').eq('slug', params.slug).maybeSingle()
  if (!c) notFound()
  const [a, p] = await Promise.all([s.from('articles').select('*').eq('category_id', c.id).order('created_at', { ascending: false }), s.from('products').select('*').eq('category_id', c.id).order('created_at', { ascending: false })])
  const arts = a.data || [], prods = p.data || []
  return <>
    <section className="hero small"><h1>{c.name}</h1><p>{c.description}</p></section>
    <section><h2>Articles</h2>{arts.length ? <div className="grid">{arts.map((x, i) => <ArticleCard key={x.id} a={x} big={i === 0} />)}</div> : <Empty t="No articles here yet." />}</section>
    {prods.length > 0 && <section><h2>Products</h2>{prods.some(x => x.affiliate_url) && <Disclosure />}<div className="grid">{prods.map(x => <ProductCard key={x.id} p={x} />)}</div></section>}
  </>
}
export async function generateMetadata({ params }) { const { data } = await db().from('categories').select('name,description').eq('slug', params.slug).maybeSingle(); return data ? { title: data.name, description: data.description } : {} }
