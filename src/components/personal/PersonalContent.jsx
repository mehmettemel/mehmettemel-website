'use client'

import { useState, useEffect, useRef } from 'react'
import { Shuffle, Grid3x3, ChevronLeft, ChevronRight } from 'lucide-react'

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
        <div className="flex items-center gap-3">
          <button
            onClick={getNewRandom}
            className={`flex items-center gap-1.5 text-xs transition-all hover:text-foreground hover:gap-2 ${
              showRandom ? 'font-medium text-foreground underline decoration-2 underline-offset-4' : 'text-muted-foreground'
            }`}
          >
            <Shuffle className="h-3 w-3" />
            <span>Rastgele</span>
          </button>
          <button
            onClick={switchToAll}
            className={`flex items-center gap-1.5 text-xs transition-all hover:text-foreground hover:gap-2 ${
              !showRandom ? 'font-medium text-foreground underline decoration-2 underline-offset-4' : 'text-muted-foreground'
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
          /* All notes view */
          <div className="mx-auto w-full max-w-md space-y-0">
            {filteredNotes.map((note, index) => (
              <div
                key={index}
                className="border-b border-border py-4 last:border-0"
              >
                {selectedCategory === 'all' && (
                  <div className="mb-1 text-xs font-semibold text-muted-foreground">
                    {note.category}
                  </div>
                )}
                {typeof note.content === 'string' ? (
                  <p className="text-xs font-normal text-foreground leading-relaxed">
                    {note.content}
                  </p>
                ) : (
                  <div>
                    <p className="text-xs font-normal text-foreground leading-relaxed">
                      {note.content.text}
                    </p>
                    {note.content.subItems?.length > 0 && (
                      <ul className="mt-1 ml-4 space-y-0.5">
                        {note.content.subItems.map((sub, i) => (
                          <li key={i} className="text-xs text-muted-foreground">• {sub}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
            {filteredNotes.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-xs text-muted-foreground">Bu kategoride not yok</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
