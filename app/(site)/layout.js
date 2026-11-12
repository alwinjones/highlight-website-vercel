import Link from 'next/link'
const nav = [['Home', '/'], ["Men's Grooming", '/mens-grooming'], ['Skincare', '/skincare'], ['Electronics & Gadgets', '/electronics-gadgets'], ['Anime', '/anime'], ['Lifestyle', '/lifestyle'], ['Product Recommendations', '/products'], ['About', '/about']]
export default function Site({ children }) {
  return <>
    <header className="top"><Link href="/"><img src="/logo.png" alt="HIGHLIGHT" className="logo" /></Link>
      <nav>{nav.map(([n, h]) => <Link key={h} href={h}>{n}</Link>)}</nav></header>
    <main>{children}</main>
    <footer><p>HIGHLIGHT. Discover, inspire, explore.</p>
      <p>Some links on this site are affiliate links. <Link href="/disclosure">Read our affiliate disclosure</Link>.</p></footer>
  </>
}
