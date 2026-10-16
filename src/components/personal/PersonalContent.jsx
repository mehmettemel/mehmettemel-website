'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Shuffle, Grid3x3, ChevronLeft, ChevronRight, X, Search, Link2, Check } from 'lucide-react'

function getItemText(item) {
  return typeof item === 'string' ? item : item.text
}

const trLower = (s) => s.toLocaleLowerCase('tr')

/* Kategorili not listesi: rastgele kart ya da "Tümü" kart ızgarası.
   Öğe biçimi: 'metin' ya da { text, subItems, title?, id?, related? }.
   Opsiyonel:
   - defaultView="all": ızgara görünümüyle açılır
   - searchable: arama kutusu + not sayısı
   - id olan notlar: modalda "Bağlantı" düğmesi (<sayfa>?n=<id>), bağlantıyla
     gelinirse not doğrudan açılır; related varsa modalda bağlantılı notlar */
export function PersonalContent({
  categories,
  title,
  hideHeading = false,
  defaultView = 'random',
  searchable = false,
}) {
  const [showRandom, setShowRandom] = useState(defaultView !== 'all')
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const [randomNote, setRandomNote] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [modalNote, setModalNote] = useState(null)
  const scrollRef = useRef(null)

  const categoryKeys = Object.keys(categories)

  const getAllNotes = () => {
    const allNotes = []
    Object.entries(categories).forEach(([key, category]) => {
      category.items.forEach((item) => {
        allNotes.push({ category: category.label, content: item })
      })
    })
    return allNotes
  }

  const getFilteredNotes = () => {
    if (selectedCategory === 'all') return getAllNotes()
    const cat = categories[selectedCategory]
    if (!cat) return []
    return cat.items.map((item) => ({ category: cat.label, content: item }))
  }

  useEffect(() => {
    const allNotes = getAllNotes()
    if (allNotes.length > 0) {
      setRandomNote(allNotes[Math.floor(Math.random() * allNotes.length)])
    }
  }, [])

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setShowLeftArrow(el.scrollLeft > 0)
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [showRandom])

  useEffect(() => {
    if (!modalNote) return
    const onKey = (e) => e.key === 'Escape' && setModalNote(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modalNote])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 150, behavior: 'smooth' })
    setTimeout(updateArrows, 300)
  }

  const getNewRandom = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const notes = getFilteredNotes()
      if (notes.length > 0) {
        setRandomNote(notes[Math.floor(Math.random() * notes.length)])
      }
      setShowRandom(true)
      setIsAnimating(false)
    }, 300)
  }

  const switchToAll = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowRandom(false)
      setIsAnimating(false)
    }, 300)
  }

  const handleCategorySelect = (key) => {
    setSelectedCategory(key)
    if (showRandom) {
      setIsAnimating(true)
      setTimeout(() => {
        const cat = key === 'all' ? getAllNotes() : (categories[key]?.items || []).map((item) => ({ category: categories[key].label, content: item }))
        if (cat.length > 0) {
          setRandomNote(cat[Math.floor(Math.random() * cat.length)])
        }
        setIsAnimating(false)
      }, 300)
    }
  }

  const q = trLower(query.trim())
  const filteredNotes = getFilteredNotes().filter((n) => {
    if (!q) return true
    const c = n.content
    const hay = typeof c === 'string' ? c : `${c.title ?? ''} ${c.text} ${(c.subItems ?? []).join(' ')}`
    return trLower(`${hay} ${n.category}`).includes(q)
  })

  // derin bağlantı: ?n=<id> ile gelinen not modalda açılır
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('n')
    if (!wanted) return
    const found = getAllNotes().find((n) => n.content?.id === wanted)
    if (found) {
      setShowRandom(false)
      setModalNote(found)
    }
    // yalnız ilk yüklemede
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const copyLink = async (id) => {
    const url = `${window.location.origin}${window.location.pathname}?n=${encodeURIComponent(id)}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
  }

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(t)
  }, [copied])

  useEffect(() => setCopied(false), [modalNote])

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col items-center gap-3">
        {!hideHeading && (
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
        )}
        <div className="flex items-center gap-1.5">
          <button
            onClick={getNewRandom}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-all ${
              showRandom
                ? 'border-foreground/20 bg-secondary/60 font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Shuffle className="h-3 w-3" />
            <span>Rastgele</span>
          </button>
          <button
            onClick={switchToAll}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-all ${
              !showRandom
                ? 'border-foreground/20 bg-secondary/60 font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Grid3x3 className="h-3 w-3" />
            <span>Tümü</span>
          </button>
        </div>
        {searchable && !showRandom && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-64 max-w-full items-center gap-2 rounded-full border border-border bg-card/80 pl-3 pr-2 transition-colors focus-within:border-foreground/30">
              <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Notlarda ara…"
                aria-label="Notlarda ara"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Aramayı temizle"
                  className="rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {filteredNotes.length} not
            </span>
          </div>
        )}
      </div>

      {/* Category tabs - horizontal scrollable */}
      {categoryKeys.length > 1 && (
        <div className="relative mb-6">
          {showLeftArrow && (
            <button
              onClick={() => scroll(-1)}
              className="absolute left-0 top-0 z-10 flex h-full items-center bg-gradient-to-r from-background to-transparent pr-4"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          <div
            ref={scrollRef}
            onScroll={updateArrows}
            className="flex gap-2 overflow-x-auto scrollbar-none px-1 py-1"
          >
            <button
              onClick={() => handleCategorySelect('all')}
              className={`shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              Tümü
            </button>
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
                  selectedCategory === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {categories[key].label}
              </button>
            ))}
          </div>
          {showRightArrow && (
            <button
              onClick={() => scroll(1)}
              className="absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-background to-transparent pl-4"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {showRandom ? (
          /* Random view */
          <div className="mx-auto w-full max-w-md">
            {randomNote ? (
              <div
                onClick={getNewRandom}
                className="cursor-pointer rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20"
              >
                <div className="mb-3 text-xs font-semibold text-muted-foreground">
                  {randomNote.category}
                </div>
                {randomNote.content.title && (
                  <h3 className="mb-2 text-base font-semibold leading-snug text-foreground">
                    {randomNote.content.title}
                  </h3>
                )}
                <div className="text-sm font-normal text-foreground leading-relaxed">
                  {typeof randomNote.content === 'string' ? (
                    <p>{randomNote.content}</p>
                  ) : (
                    <>
                      <p>{randomNote.content.text}</p>
                      {randomNote.content.subItems?.length > 0 && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {randomNote.content.subItems.map((sub, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {sub}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border">
                <p className="text-sm text-muted-foreground">Yükleniyor...</p>
              </div>
            )}
          </div>
        ) : (
          /* All notes view - fluid grid; hovering a card dims/blurs siblings */
          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5 [&:has(.note-card:hover)_.note-card:not(:hover)]:opacity-30 [&:has(.note-card:hover)_.note-card:not(:hover)]:blur-[1.5px]">
            {filteredNotes.map((note, index) => {
              const text = getItemText(note.content)
              const subItems = typeof note.content === 'string' ? [] : note.content.subItems || []
              const isLong = text.length > 400 || subItems.length > 3
              return (
                <button
                  key={index}
                  onClick={() => setModalNote(note)}
                  className="note-card group relative rounded-lg border border-border bg-card p-3 text-left transition-all duration-200 hover:z-30 hover:border-foreground/20"
                >
                  {selectedCategory === 'all' && (
                    <div className="mb-1 truncate text-xs font-semibold text-muted-foreground">
                      {note.category}
                    </div>
                  )}
                  {note.content.title && (
                    <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                      {note.content.title}
                    </h3>
                  )}
                  <p className="line-clamp-4 text-xs font-normal leading-relaxed text-foreground">
                    {text}
                  </p>
                  {subItems.length > 0 && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      +{subItems.length} alt not
                    </div>
                  )}
                  {/* Hover preview - full text, animated pop-over */}
                  <div className="pointer-events-none invisible absolute inset-x-0 top-0 z-20 max-h-80 min-h-full origin-top scale-95 overflow-hidden rounded-lg border border-foreground/15 bg-card opacity-0 shadow-2xl ring-1 ring-black/20 transition-all duration-200 ease-out group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                    <div className="max-h-80 overflow-hidden p-3">
                      {selectedCategory === 'all' && (
                        <div className="mb-1 text-xs font-semibold text-muted-foreground">
                          {note.category}
                        </div>
                      )}
                      {note.content.title && (
                        <h3 className="mb-1 text-sm font-semibold leading-snug text-foreground">
                          {note.content.title}
                        </h3>
                      )}
                      <p className="text-xs font-normal leading-relaxed text-foreground">
                        {text}
                      </p>
                      {subItems.length > 0 && (
                        <ul className="mt-1 ml-3 space-y-0.5">
                          {subItems.map((sub, i) => (
                            <li key={i} className="text-xs text-muted-foreground">• {sub}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {isLong && (
                      <div className="absolute inset-x-0 bottom-0 flex h-14 items-end justify-center bg-gradient-to-t from-card via-card/80 to-transparent pb-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Tamamı için tıkla
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
            {filteredNotes.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <p className="text-xs text-muted-foreground">
                  {q ? 'Aramayla eşleşen not yok' : 'Bu kategoride not yok'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full text modal - portal to body to escape transformed ancestors */}
      {modalNote && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setModalNote(null)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-2xl"
          >
            <button
              onClick={() => setModalNote(null)}
              className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-3 flex items-center justify-between gap-3 pr-6">
              <span className="text-xs font-semibold text-muted-foreground">
                {modalNote.category}
              </span>
              {modalNote.content.id && (
                <button
                  onClick={() => copyLink(modalNote.content.id)}
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  title="Bağlantıyı kopyala"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
                  <span aria-live="polite">{copied ? 'Kopyalandı' : 'Bağlantı'}</span>
                </button>
              )}
            </div>
            {modalNote.content.title && (
              <h2 className="mb-2 text-lg font-semibold leading-snug text-foreground">
                {modalNote.content.title}
              </h2>
            )}
            <p className="whitespace-pre-line text-sm font-normal leading-relaxed text-foreground">
              {getItemText(modalNote.content)}
            </p>
            {typeof modalNote.content !== 'string' && modalNote.content.subItems?.length > 0 && (
              <ul className="mt-3 ml-4 space-y-1">
                {modalNote.content.subItems.map((sub, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {sub}</li>
                ))}
              </ul>
            )}
            {modalNote.content.related?.length > 0 && (
              <div className="mt-5 border-t border-border/60 pt-4">
                <div className="mb-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Bağlantılı · {modalNote.content.related.length}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {modalNote.content.related.map((r) => {
                    const target = getAllNotes().find((n) => n.content?.id === r.id)
                    return (
                      <button
                        key={r.id}
                        disabled={!target}
                        onClick={() => target && setModalNote(target)}
                        title={r.title}
                        className="max-w-full truncate rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:border-foreground/25 hover:bg-secondary"
                      >
                        {r.title}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
