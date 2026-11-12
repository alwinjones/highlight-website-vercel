import './globals.css'
import { Poppins, Playfair_Display } from 'next/font/google'
const body = Poppins({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--b' })
const head = Playfair_Display({ subsets: ['latin'], variable: '--h' })
export const metadata = { title: { default: 'HIGHLIGHT', template: '%s | HIGHLIGHT' }, description: 'Discover. Inspire. Explore.' }
export default function Root({ children }) {
  return <html lang="en"><body className={body.variable + ' ' + head.variable}>{children}</body></html>
}
