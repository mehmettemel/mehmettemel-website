'use client'

import { useState, useEffect } from 'react'
import { Shuffle, Grid3x3 } from 'lucide-react'

export function ResearchContent({ sections, title, author }) {
  const [showRandom, setShowRandom] = useState(true)
  const [randomNote, setRandomNote] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const getAllParagraphs = () => {
    const allParagraphs = []
    sections.forEach(section => {
      section.paragraphs.forEach(paragraph => {
        allParagraphs.push({
          section: section.heading,
          content: paragraph
        })
      })
    })
    return allParagraphs
  }

  // Set initial random paragraph on mount
  useEffect(() => {
    const allParagraphs = getAllParagraphs()
    if (allParagraphs.length > 0) {
      const random = allParagraphs[Math.floor(Math.random() * allParagraphs.length)]
      setRandomNote(random)
    }
  }, [])

  const getNewRandomNote = () => {
    setIsAnimating(true)

    setTimeout(() => {
      const allParagraphs = getAllParagraphs()
      const random = allParagraphs[Math.floor(Math.random() * allParagraphs.length)]
      setRandomNote(random)
      setIsAnimating(false)
    }, 300)
  }

  const showAllNotes = () => {
    setIsAnimating(true)

    setTimeout(() => {
      setShowRandom(false)
      setIsAnimating(false)
    }, 300)
  }

  const showRandomMode = () => {
    setIsAnimating(true)

    setTimeout(() => {
      const allParagraphs = getAllParagraphs()
      const random = allParagraphs[Math.floor(Math.random() * allParagraphs.length)]
      setRandomNote(random)
      setShowRandom(true)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <>
      {/* Header with Buttons */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {author && (
          <p className="text-xs text-muted-foreground">{author}</p>
        )}
        <div className="flex items-center gap-3">
          {showRandom ? (
            <>
              <button
                onClick={getNewRandomNote}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-foreground hover:gap-2"
              >
                <Shuffle className="h-3 w-3" />
                <span>Rastgele</span>
              </button>
              <button
                onClick={showAllNotes}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-foreground hover:gap-2"
              >
                <Grid3x3 className="h-3 w-3" />
                <span>Tümünü Göster</span>
              </button>
            </>
          ) : (
            <button
              onClick={showRandomMode}
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-foreground hover:gap-2"
            >
              <Shuffle className="h-3 w-3" />
              <span>Rastgele</span>
            </button>
          )}
        </div>
      </div>

      <div className="relative flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {showRandom ? (
            // Random Note View
            <div
              className={`mx-auto w-full max-w-md transition-opacity duration-300 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {randomNote?.section}
                  </span>
                </div>
                <p className="text-sm font-normal text-foreground leading-relaxed">
                  {randomNote?.content}
                </p>
              </div>
            </div>
          ) : (
            // All Notes View
            <div
              className={`space-y-12 transition-opacity duration-300 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-foreground">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="mx-auto w-full max-w-md space-y-0">
                    {section.paragraphs.map((paragraph, index) => (
                      <div
                        key={index}
                        className="border-b border-border py-4 last:border-0"
                      >
                        <p className="text-xs font-normal text-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Table of Contents - Only show when not in random mode */}
        {!showRandom && sections.length > 0 && (
          <aside
            className={`hidden lg:block w-48 shrink-0 transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="sticky top-24">
              <div className="text-xs font-semibold text-muted-foreground mb-3">
                İçerikler
              </div>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </>
  )
}
