'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sb } from '@/lib/browser'
export default function Login() {
  const [e, setE] = useState(''), [p, setP] = useState(''), [m, setM] = useState(''), r = useRouter()
  const go = async (ev) => { ev.preventDefault(); const { error } = await sb().auth.signInWithPassword({ email: e, password: p }); if (error) setM('Wrong email or password.'); else { r.push('/admin'); r.refresh() } }
  return <form className="login" onSubmit={go}><img src="/logo.png" alt="HIGHLIGHT" /><h1>Admin sign in</h1>
    <label>Email<input type="email" value={e} onChange={x => setE(x.target.value)} required /></label>
    <label>Password<input type="password" value={p} onChange={x => setP(x.target.value)} required /></label>
    {m && <p className="err">{m}</p>}<button className="btn">Sign in</button></form>
}
