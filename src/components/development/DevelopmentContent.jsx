'use client'

import { useMemo, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Search, X, HelpCircle, StickyNote, BookOpen, Code2, Check, Pin, FileText, Trash2 } from 'lucide-react'

const TYPE_META = {
  qa: { label: 'Soru', icon: HelpCircle },
  note: { label: 'Not', icon: StickyNote },
  konu: { label: 'Konu', icon: BookOpen },
}

const TYPE_FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'qa', label: 'Sorular' },
  { key: 'note', label: 'Notlar' },
  { key: 'konu', label: 'Konular' },
]

export function DevelopmentContent({ notes, tags, stats }) {
  const [type, setType] = useState('all')
  const [tag, setTag] = useState(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = notes.filter((n) => {
      if (type !== 'all' && n.type !== type) return false
      if (tag && !n.tags?.includes(tag)) return false
      if (!q) return true
      const codeText = (Array.isArray(n.code) ? n.code : n.code ? [n.code] : [])
        .map((b) => `${b.label || ''} ${b.snippet || ''}`)
        .join(' ')
      return (
        n.title.toLowerCase().includes(q) ||
        (n.summary || '').toLowerCase().includes(q) ||
        (n.body || '').toLowerCase().includes(q) ||
        (n.tags || []).some((t) => t.includes(q)) ||
        codeText.toLowerCase().includes(q)
      )
    })
    // sabitlenenler her görünümde en üstte; kendi aralarındaki sıra korunur
    return [...filtered].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
  }, [notes, type, tag, query])

  return (
    <>
      {/* özet */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Stat value={stats.total} label="not" />
        {stats.qa > 0 && <Stat value={stats.qa} label="soru" />}
        {stats.note > 0 && <Stat value={stats.note} label="kısa not" />}
        {stats.konu > 0 && <Stat value={stats.konu} label="konu" />}
      </div>

      {/* tür filtresi + arama */}
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {TYPE_FILTERS.map(({ key, label }) => {
            const on = type === key
            return (
              <button
                key={key}
                onClick={() => setType(key)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  on
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="relative sm:w-56">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ara..."
            aria-label="Notlarda ara"
            className="w-full rounded-full border border-border bg-card py-1.5 pl-8 pr-3 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40"
          />
        </div>
      </div>

      {/* etiketler */}
      {tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-1.5">
          <button
            onClick={() => setTag(null)}
            className={`rounded-md px-2 py-1 text-[11px] transition-colors ${
              tag === null
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            hepsi
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(tag === t ? null : t)}
              className={`rounded-md px-2 py-1 text-[11px] transition-colors ${
                tag === t
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      {/* kartlar */}
      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">Eşleşen not yok</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((n) => (
            <Card key={n.id} note={n} onOpen={() => setOpen(n)} onTag={setTag} />
          ))}
        </div>
      )}

      {/* detay modalı */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-2xl"
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Kapat"
                className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="absolute right-10 top-3 flex items-center">
                <CopyPinButton id={open.id} pinned={open.pinned} />
                <CopyContentButton note={open} />
                <CopyRemoveButton id={open.id} />
              </span>

              <TypeBadge type={open.type} />

              <h2 className="mb-3 mt-2 pr-24 text-lg font-semibold leading-snug text-foreground">
                {open.title}
              </h2>

              {(open.body || open.summary) && (
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                  {open.body || open.summary}
                </p>
              )}

              <CodeBlocks code={open.code} />

              {open.source && (
                <p className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  Kaynak: {open.source}
                </p>
              )}

              {open.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {open.tags.map((t) => (
                    <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

function Stat({ value, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
      <strong className="font-semibold text-foreground">{value}</strong>
      {label}
    </span>
  )
}

function TypeBadge({ type }) {
  const meta = TYPE_META[type] || TYPE_META.note
  const Icon = meta.icon
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  )
}

/* Sözdizimi renklendirme.
   Tek alternatifli regex, sırayla: yorum > template > string > anahtar kelime >
   sabit > fonksiyon adı > sayı. Tek geçişte eşleştiği için iç içe değiştirme
   sorunu olmaz; anahtar kelimeler fonksiyon adından ÖNCE geldiği için
   `if (` gibi kalıplar yanlışlıkla fonksiyon sayılmaz. */
const TOKEN_RE = new RegExp(
  [
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/, // 1 yorum
    /(`(?:\\[\s\S]|\$\{[^}]*\}|[^`\\])*`)/, // 2 template literal
    /('(?:\\[\s\S]|[^'\\])*'|"(?:\\[\s\S]|[^"\\])*")/, // 3 string
    /\b(const|let|var|function|return|if|else|for|while|do|switch|case|import|export|from|default|async|await|new|typeof|instanceof|class|extends|try|catch|finally|throw|of|in|delete|void|yield)\b/, // 4
    /\b(true|false|null|undefined|this)\b/, // 5 sabit
    /([A-Za-z_$][\w$]*)(?=\s*\()/, // 6 fonksiyon adı
    /\b(\d+(?:\.\d+)?)\b/, // 7 sayı
  ]
    .map((r) => r.source)
    .join('|'),
  'g',
)

// Kod bloğu her iki temada da koyu kalır — renkler böyle canlı ve tutarlı durur.
const C = {
  comment: 'italic text-[#6b7394]',
  string: 'text-[#ffcb6b]',
  keyword: 'text-[#c792ea]',
  constant: 'text-[#c792ea]',
  fn: 'italic text-[#ff79c6]',
  number: 'text-[#f78c6c]',
  interp: 'text-[#e6edf3]',
}

const GROUP_CLASS = [C.comment, null, C.string, C.keyword, C.constant, C.fn, C.number]

/** Template literal içindeki ${...} ifadelerini ayrı renklendir. */
function splitTemplate(text, keyPrefix) {
  return text.split(/(\$\{[^}]*\})/).map((part, i) =>
    part.startsWith('${') ? (
      <span key={`${keyPrefix}-${i}`} className={C.interp}>
        {part}
      </span>
    ) : (
      <span key={`${keyPrefix}-${i}`} className={C.string}>
        {part}
      </span>
    ),
  )
}

function highlight(source) {
  const out = []
  let last = 0
  let m
  let key = 0
  TOKEN_RE.lastIndex = 0

  while ((m = TOKEN_RE.exec(source)) !== null) {
    if (m.index > last) {
      out.push(<span key={key++}>{source.slice(last, m.index)}</span>)
    }
    const gi = [1, 2, 3, 4, 5, 6, 7].findIndex((g) => m[g] !== undefined)
    if (gi === 1) {
      out.push(<span key={key++}>{splitTemplate(m[0], key)}</span>)
    } else {
      out.push(
        <span key={key++} className={GROUP_CLASS[gi]}>
          {m[0]}
        </span>,
      )
    }
    last = m.index + m[0].length
  }
  if (last < source.length) out.push(<span key={key++}>{source.slice(last)}</span>)
  return out
}

function CodeBlock({ block }) {
  const rendered = useMemo(
    () => (block.lang === 'bash' ? block.snippet : highlight(block.snippet)),
    [block.snippet, block.lang],
  )

  return (
    <figure className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0d1017] shadow-lg">
      {(block.label || block.lang) && (
        <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-2.5">
          {block.label && (
            <span className="text-[11px] font-medium text-[#c9d1d9]">{block.label}</span>
          )}
          {block.lang && (
            <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#6b7394]">
              {block.lang}
            </span>
          )}
        </figcaption>
      )}
      <pre className="overflow-x-auto px-5 py-4 text-[13px] leading-[1.85] text-[#e6edf3]">
        <code className="font-mono">{rendered}</code>
      </pre>
    </figure>
  )
}

/** Eski tek-obje formatını da kabul eder. */
function CodeBlocks({ code }) {
  if (!code) return null
  const blocks = Array.isArray(code) ? code : [code]
  return blocks.map((b, i) => <CodeBlock key={i} block={b} />)
}

/** Notun tam içeriğini okunur düz metne çevirir — düzeltme istemek için
    olduğu gibi kopyalanıp Claude'a yapıştırılır. */
function noteToPlainText(note) {
  const typeLabel = TYPE_META[note.type]?.label || 'Not'
  const lines = [`[dev:${note.id}]`, `${typeLabel}: ${note.title}`, '']

  if (note.summary) lines.push('Özet:', note.summary, '')
  if (note.body) lines.push('Bağlam:', note.body, '')

  const blocks = Array.isArray(note.code) ? note.code : note.code ? [note.code] : []
  blocks.forEach((b, i) => {
    lines.push(`--- Kod ${i + 1}: ${b.label || ''} (${b.lang || ''}) ---`, b.snippet, '')
  })

  if (note.source) lines.push(`Kaynak: ${note.source}`, '')
  if (note.tags?.length) lines.push(`Etiketler: ${note.tags.join(', ')}`)

  return lines.join('\n').trim()
}

/** Notun TAM içeriğini panoya kopyalar — düzeltme yazıp geri
    yapıştırmak için. Kart/modal içeriğini birebir taşır. */
function CopyContentButton({ note }) {
  const [copied, setCopied] = useState(false)

  const copy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(noteToPlainText(note))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // pano erişimi yoksa sessiz geç
    }
  }

  return (
    <button
      onClick={copy}
      title="Tüm not içeriğini kopyala"
      aria-label="Tüm not içeriğini kopyala"
      className="rounded-md p-1 text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <FileText className="h-3.5 w-3.5" />}
    </button>
  )
}

/** Kartın silme referansını (/remove dev:<id>) panoya kopyalar.
    Yapıştırıp Claude'a gönderince /remove skill'i notu repodan siler. */
function CopyRemoveButton({ id }) {
  const [copied, setCopied] = useState(false)

  const copy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(`/remove dev:${id}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // pano erişimi yoksa sessiz geç
    }
  }

  return (
    <button
      onClick={copy}
      title={`Silme komutunu kopyala: /remove dev:${id}`}
      aria-label="Silme komutunu kopyala"
      className="rounded-md p-1 text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-destructive"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Trash2 className="h-3.5 w-3.5" />}
    </button>
  )
}

/** Sabitleme komutunu (/pin dev:<id>) panoya kopyalar.
    Skill toggle çalışır: pinli değilse sabitler, pinliyse kaldırır. */
function CopyPinButton({ id, pinned }) {
  const [copied, setCopied] = useState(false)

  const copy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(`/pin dev:${id}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // pano erişimi yoksa sessiz geç
    }
  }

  return (
    <button
      onClick={copy}
      title={
        pinned
          ? `Sabitlemeyi kaldırma komutunu kopyala: /pin dev:${id}`
          : `Sabitleme komutunu kopyala: /pin dev:${id}`
      }
      aria-label={pinned ? 'Sabitlemeyi kaldırma komutunu kopyala' : 'Sabitleme komutunu kopyala'}
      className={`rounded-md p-1 transition-colors hover:bg-secondary ${
        pinned ? 'text-primary' : 'text-muted-foreground/50 hover:text-foreground'
      }`}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-primary" />
      ) : (
        <Pin className={`h-3.5 w-3.5 ${pinned ? 'fill-current' : ''}`} />
      )}
    </button>
  )
}

function Card({ note, onOpen, onTag }) {
  const isQa = note.type === 'qa'
  const codeCount = Array.isArray(note.code) ? note.code.length : note.code ? 1 : 0

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        note.pinned
          ? 'border-primary/40 bg-gradient-to-b from-primary/[0.07] to-card shadow-md ring-1 ring-primary/20 hover:border-primary/60'
          : 'border-border bg-card hover:border-foreground/25'
      }`}
    >
      {note.pinned && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      )}
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <TypeBadge type={note.type} />
          {note.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
              <Pin className="h-3 w-3 fill-current" />
              Sabit
            </span>
          )}
        </span>
        <span className="flex items-center">
          <CopyPinButton id={note.id} pinned={note.pinned} />
          <CopyContentButton note={note} />
          <CopyRemoveButton id={note.id} />
        </span>
      </div>

      <button onClick={onOpen} className="flex-1 text-left">
        <h3
          className={`text-sm font-semibold leading-snug text-foreground ${isQa ? 'line-clamp-3' : 'line-clamp-2'}`}
        >
          {note.title}
        </h3>

        {(note.summary || note.body) && (
          <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted-foreground">
            {isQa && <span className="mr-1 font-medium text-foreground/60">→</span>}
            {note.summary || note.body}
          </p>
        )}

        {codeCount > 0 && (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-secondary/40 px-2 py-1 text-[10px] text-muted-foreground">
            <Code2 className="h-3 w-3" />
            {codeCount} kod örneği · detay için tıkla
          </span>
        )}
      </button>

      {note.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {note.tags.map((t) => (
            <button
              key={t}
              onClick={() => onTag(t)}
              className="rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              #{t}
            </button>
          ))}
        </div>
      )}
    </article>
  )
}
