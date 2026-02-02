'use client'

import { useState, useEffect } from 'react'
import { Shuffle, Grid3x3 } from 'lucide-react'
import { quoteCategories } from '../../data/kesifler'

const ITEMS_PER_PAGE = 10

export function QuotesContent({ quotes }) {
  const [showRandom, setShowRandom] = useState(true)
  const [randomQuote, setRandomQuote] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter quotes by category
  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory)

  // Pagination
  const totalPages = Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedQuotes = filteredQuotes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Set initial random quote on mount
  useEffect(() => {
    if (filteredQuotes.length > 0) {
      const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]
      setRandomQuote(random)
    }
    setCurrentPage(1) // Reset to first page when category changes
  }, [selectedCategory])

  const getNewRandomQuote = () => {
    if (filteredQuotes.length === 0) return

    setIsAnimating(true)

    setTimeout(() => {
      const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]
      setRandomQuote(random)
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

  const showRandomMode = () => {
    setIsAnimating(true)

    setTimeout(() => {
      const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]
      setRandomQuote(random)
      setShowRandom(true)
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

  // Format quote text with quotes if needed
  const formatQuoteText = (text) => {
    if (!text) return ''
    const hasQuotes = text.startsWith('"') || text.includes('\n')
    return hasQuotes ? text : `"${text}"`
  }

  return (
    <>
      {/* Header with Buttons */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💭</span>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Alıntılar
          </h1>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {quoteCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`text-xs transition-all ${
                selectedCategory === category.id
                  ? 'font-medium text-foreground underline decoration-2 underline-offset-4'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={showRandomMode}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-foreground hover:gap-2"
          >
            <Shuffle className="h-3 w-3" />
            <span>Rastgele</span>
          </button>
          <button
            onClick={showAllQuotes}
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-foreground hover:gap-2"
          >
            <Grid3x3 className="h-3 w-3" />
            <span>Tümü</span>
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md">
        {showRandom ? (
          // Random Quote View
          <div
            className={`transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {randomQuote && (
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {randomQuote.category || 'Alıntı'}
                  </span>
                </div>
                <blockquote className="mb-4 text-sm font-normal text-foreground leading-relaxed whitespace-pre-line">
                  {formatQuoteText(randomQuote.text)}
                </blockquote>
                {randomQuote.author && (
                  <p className="text-xs text-muted-foreground">
                    — {randomQuote.author}
                  </p>
                )}
                {randomQuote.source && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {randomQuote.source}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          // All Quotes View with Pagination
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
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {quote.category || 'Alıntı'}
                    </span>
                  </div>
                  <blockquote className="mb-3 text-xs font-normal text-foreground leading-relaxed whitespace-pre-line">
                    {formatQuoteText(quote.text)}
                  </blockquote>
                  {quote.author && (
                    <p className="text-xs text-muted-foreground">
                      — {quote.author}
                    </p>
                  )}
                  {quote.source && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {quote.source}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
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
