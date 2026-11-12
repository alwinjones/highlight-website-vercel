import Link from 'next/link'
export const Disclosure = () => <p className="disc">Some links on this page are affiliate links. If you buy through them, HIGHLIGHT may earn a commission at no extra cost to you. <Link href="/disclosure">Learn more</Link>.</p>
export const Img = ({ src, alt }) => <div className="img">{src ? <img src={src} alt={alt || ''} /> : <span>Image coming soon</span>}</div>
export const ArticleCard = ({ a, big }) => <Link href={'/articles/' + a.slug} className={'acard' + (big ? ' big' : '')}><Img src={a.image_url} alt={a.title} /><h3>{a.title}</h3><p>{a.excerpt}</p></Link>
export const ProductCard = ({ p }) => <div className="pcard"><Img src={p.image_url} alt={p.name} /><h3>{p.name}</h3><p>{p.description}</p>
  {p.specs && <ul>{p.specs.split('\n').filter(Boolean).map((l, i) => <li key={i}>{l}</li>)}</ul>}
  <p className="price">{p.price || 'Check current price'}</p>
  {p.affiliate_url && <a className="btn" href={p.affiliate_url} target="_blank" rel="sponsored nofollow noopener">View product</a>}</div>
export const Empty = ({ t }) => <p className="empty">{t}</p>
