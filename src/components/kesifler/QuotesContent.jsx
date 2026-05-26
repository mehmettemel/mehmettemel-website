'use client'

import { useState, useEffect } from 'react'
import { Shuffle, Grid3x3 } from 'lucide-react'

const ITEMS_PER_PAGE = 10

export function QuotesContent({ quotes }) {
  const [showRandom, setShowRandom] = useState(true)
  const [randomQuote, setRandomQuote] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(quotes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedQuotes = quotes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  useEffect(() => {
    if (quotes.length > 0) {
      setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }
  }, [])

  const getNewRandomQuote = () => {
    if (quotes.length === 0) return
    setIsAnimating(true)
    setTimeout(() => {
      setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)])
      setShowRandom(true)
      setIsAnimating(false)
    }, 300)
  }

  const showAllQuotes = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowRandom(false)
      setCurrentPage(1)
      setIsAnimating(false)
    }, 300)
  }

  const goToPage = (page) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsAnimating(false)
    }, 300)
  }

  const formatQuoteText = (text) => {
    if (!text) return ''
    const hasQuotes = text.startsWith('"') || text.includes('\n')
    return hasQuotes ? text : `"${text}"`
  }

  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💭</span>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Sevdiğim Sözler
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={getNewRandomQuote}
            className={`flex items-center gap-1.5 text-xs transition-all hover:text-foreground hover:gap-2 ${
              showRandom ? 'font-medium text-foreground underline decoration-2 underline-offset-4' : 'text-muted-foreground'
            }`}
          >
            <Shuffle className="h-3 w-3" />
            <span>Rastgele</span>
          </button>
          <button
            onClick={showAllQuotes}
            className={`flex items-center gap-1.5 text-xs transition-all hover:text-foreground hover:gap-2 ${
              !showRandom ? 'font-medium text-foreground underline decoration-2 underline-offset-4' : 'text-muted-foreground'
            }`}
          >
            <Grid3x3 className="h-3 w-3" />
            <span>Tümü</span>
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md">
        {showRandom ? (
          <div
            className={`transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {randomQuote && (
              <div
                onClick={getNewRandomQuote}
                className="cursor-pointer rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20"
              >
                <blockquote className="mb-4 text-sm font-normal text-foreground leading-relaxed whitespace-pre-line">
                  {formatQuoteText(randomQuote.text)}
                </blockquote>
              </div>
            )}
          </div>
        ) : (
          <>
            <div
              className={`space-y-4 transition-opacity duration-300 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {paginatedQuotes.map((quote, index) => (
                <div
                  key={quote.id || index}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <blockquote className="text-xs font-normal text-foreground leading-relaxed whitespace-pre-line">
                    {formatQuoteText(quote.text)}
                  </blockquote>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Önceki
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`h-7 w-7 text-xs transition-all ${
                        currentPage === page
                          ? 'font-medium text-foreground bg-accent rounded'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Sonraki →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
