import { db } from '@/lib/supabase'
import { ProductCard, Disclosure, Empty } from '@/components/ui'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Product Recommendations' }
export default async function Products() {
  const { data } = await db().from('products').select('*').order('created_at', { ascending: false })
  const p = data || []
  return <><section className="hero small"><h1>Product Recommendations</h1></section>
    <section><Disclosure />{p.length ? <div className="grid">{p.map(x => <ProductCard key={x.id} p={x} />)}</div> : <Empty t="Products you publish in the admin dashboard appear here." />}</section></>
}
