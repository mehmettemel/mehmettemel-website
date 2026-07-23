'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Shuffle, Grid3x3, ChevronLeft, ChevronRight, X } from 'lucide-react'

function getItemText(item) {
  return typeof item === 'string' ? item : item.text
}

export function PersonalContent({ categories, title, hideHeading = false }) {
  const [showRandom, setShowRandom] = useState(true)
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

  const filteredNotes = getFilteredNotes()

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
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] transition-all ${
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
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] transition-all ${
              !showRandom
                ? 'border-foreground/20 bg-secondary/60 font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Grid3x3 className="h-3 w-3" />
            <span>Tümü</span>
          </button>
        </div>
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
          /* All notes view - fluid grid */
          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredNotes.map((note, index) => {
              const text = getItemText(note.content)
              const subItems = typeof note.content === 'string' ? [] : note.content.subItems || []
              return (
                <button
                  key={index}
                  onClick={() => setModalNote(note)}
                  className="group relative rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-foreground/20"
                >
                  {selectedCategory === 'all' && (
                    <div className="mb-1 truncate text-[10px] font-semibold text-muted-foreground">
                      {note.category}
                    </div>
                  )}
                  <p className="line-clamp-4 text-xs font-normal leading-relaxed text-foreground">
                    {text}
                  </p>
                  {subItems.length > 0 && (
                    <div className="mt-1 text-[10px] text-muted-foreground">
                      +{subItems.length} alt not
                    </div>
                  )}
                  {/* Hover preview - full text */}
                  <div className="pointer-events-none invisible absolute inset-x-0 top-0 z-20 max-h-80 overflow-hidden rounded-lg border border-border bg-card p-3 opacity-0 shadow-xl transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                    {selectedCategory === 'all' && (
                      <div className="mb-1 text-[10px] font-semibold text-muted-foreground">
                        {note.category}
                      </div>
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
                </button>
              )
            })}
            {filteredNotes.length === 0 && (
              <div className="col-span-full py-12 text-center">
                <p className="text-xs text-muted-foreground">Bu kategoride not yok</p>
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
            <div className="mb-3 pr-6 text-xs font-semibold text-muted-foreground">
              {modalNote.category}
            </div>
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
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
