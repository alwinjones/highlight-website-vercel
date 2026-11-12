'use client'
import { useEffect, useState } from 'react'
import { sb } from '@/lib/browser'
const slugify = s => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export default function Manager({ table, title, nameKey, fields }) {
  const [rows, setRows] = useState([]), [cats, setCats] = useState([]), [f, setF] = useState(null), [msg, setMsg] = useState('')
  const c = sb()
  const load = async () => { setRows((await c.from(table).select('*').order('created_at', { ascending: false })).data || []); setCats((await c.from('categories').select('id,name')).data || []) }
  useEffect(() => { load() }, [])
  const set = (k, v) => setF({ ...f, [k]: v })
  const blank = () => setF(Object.fromEntries(fields.map(x => [x.k, x.t === 'status' ? 'draft' : x.t === 'check' ? false : ''])))
  const save = async (e) => { e.preventDefault(); const row = { ...f }
    if (!row.slug) row.slug = slugify(row[nameKey])
    for (const k in row) if (row[k] === '') row[k] = null
    fields.filter(x => x.t === 'num').forEach(x => { if (row[x.k] != null) row[x.k] = Number(row[x.k]) })
    const { error } = row.id ? await c.from(table).update(row).eq('id', row.id) : await c.from(table).insert(row)
    if (error) setMsg('Could not save: ' + (error.message.includes('duplicate') ? 'that URL ending is already used. Change it.' : error.message)); else { setMsg('Saved. It is now live on the website (if published).'); setF(null); load() } }
  const del = async (r) => { if (confirm('Delete "' + r[nameKey] + '"? This cannot be undone.')) { await c.from(table).delete().eq('id', r.id); setMsg('Deleted.'); load() } }
  const up = async (k, file) => { const p = Date.now() + '-' + file.name.replace(/[^\w.]/g, '_'); const { error } = await c.storage.from('images').upload(p, file)
    if (error) setMsg('Upload failed: ' + error.message); else set(k, c.storage.from('images').getPublicUrl(p).data.publicUrl) }
  if (f) return <form onSubmit={save} className="aform"><h1>{f.id ? 'Edit' : 'New'} {title.toLowerCase()}</h1>
    {fields.map(x => <label key={x.k}>{x.l}{x.h && <small>{x.h}</small>}
      {x.t === 'area' ? <textarea rows={x.r || 3} value={f[x.k] || ''} onChange={e => set(x.k, e.target.value)} />
        : x.t === 'check' ? <input type="checkbox" checked={!!f[x.k]} onChange={e => set(x.k, e.target.checked)} />
        : x.t === 'status' ? <select value={f[x.k]} onChange={e => set(x.k, e.target.value)}><option value="draft">Draft (hidden from the public)</option><option value="published">Published (visible)</option></select>
        : x.t === 'cat' ? <select value={f[x.k] || ''} onChange={e => set(x.k, e.target.value)}><option value="">No category</option>{cats.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}</select>
        : x.t === 'image' ? <>{f[x.k] && <img className="thumb" src={f[x.k]} alt="" />}<input type="file" accept="image/*" onChange={e => e.target.files[0] && up(x.k, e.target.files[0])} /></>
        : <input type={x.t === 'num' ? 'number' : 'text'} value={f[x.k] ?? ''} onChange={e => set(x.k, e.target.value)} />}</label>)}
    {msg && <p className="err">{msg}</p>}<button className="btn">Save changes</button> <button type="button" className="btn ghost" onClick={() => { setF(null); setMsg('') }}>Cancel</button></form>
  return <><h1>{title}</h1><button className="btn" onClick={() => { blank(); setMsg('') }}>Add new</button>{msg && <p className="ok">{msg}</p>}
    <div className="rows">{rows.map(r => <div key={r.id}><span>{r[nameKey]}{r.status && <em> ({r.status})</em>}{r.featured && <em> (on homepage)</em>}</span>
      <button className="btn ghost" onClick={() => { setF(r); setMsg('') }}>Edit</button><button className="btn ghost" onClick={() => del(r)}>Delete</button></div>)}
      {!rows.length && <p>Nothing here yet. Press Add new.</p>}</div></>
}
