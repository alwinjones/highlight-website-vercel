import Link from 'next/link'
import { db } from '@/lib/supabase'
import { ArticleCard, ProductCard, Disclosure, Empty } from '@/components/ui'
export const dynamic = 'force-dynamic'
export default async function Home() {
  const s = db()
  const [a, p, c] = await Promise.all([
    s.from('articles').select('*').eq('featured', true).order('created_at', { ascending: false }).limit(6),
    s.from('products').select('*').eq('featured', true).order('created_at', { ascending: false }).limit(4),
    s.from('categories').select('*').order('position')])
  const arts = a.data || [], prods = p.data || [], cats = c.data || []
  return <>
    <section className="hero"><h1>Discover. Inspire. Explore.</h1><p>Grooming, skincare, tech, anime and lifestyle, chosen with care.</p></section>
    <section className="cats">{cats.map(k => <Link key={k.id} href={'/' + k.slug}><h3>{k.name}</h3><p>{k.description}</p></Link>)}</section>
    <section><h2>Featured articles</h2>{arts.length ? <div className="grid">{arts.map((x, i) => <ArticleCard key={x.id} a={x} big={i === 0} />)}</div> : <Empty t="Articles you feature in the admin dashboard appear here." />}</section>
    {prods.length > 0 && <section><h2>Featured products</h2><Disclosure /><div className="grid">{prods.map(x => <ProductCard key={x.id} p={x} />)}</div></section>}
  </>
}
