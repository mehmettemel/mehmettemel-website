'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export function RandomParagraphButton({ paragraphs }) {
  const [isOpen, setIsOpen] = useState(false)
  const [randomParagraph, setRandomParagraph] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleOpenModal = () => {
    if (!paragraphs || paragraphs.length === 0) return

    const randomIndex = Math.floor(Math.random() * paragraphs.length)
    setRandomParagraph(paragraphs[randomIndex])
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  if (!paragraphs || paragraphs.length === 0) return null

  const modalContent = isOpen && mounted ? (
    createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-2xl rounded-xl border-2 border-foreground/20 bg-white dark:bg-zinc-900 p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Kapat"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🎲</span>
              <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                Rastgele Bilgi
              </h3>
            </div>

            {/* Random Paragraph */}
            <div className="mb-6 max-h-[60vh] overflow-y-auto rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4 text-sm leading-relaxed text-zinc-900 dark:text-zinc-100 sm:p-6 sm:text-base">
              <p>{randomParagraph || 'Paragraf yükleniyor...'}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleOpenModal}
                className="flex-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-95"
              >
                Yeni Bilgi
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary/80 active:scale-95"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>,
      document.body
    )
  ) : null

  return (
    <>
      {/* Random Button */}
      <button
        onClick={handleOpenModal}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent/80 active:scale-95"
        aria-label="Rastgele paragraf göster"
      >
        <span className="text-base">🎲</span>
        <span>Rastgele Bilgi</span>
      </button>

      {/* Modal via Portal */}
      {modalContent}
    </>
  )
}
