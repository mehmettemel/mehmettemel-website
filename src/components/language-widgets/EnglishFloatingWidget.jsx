'use client'

import { useState } from 'react'
import { useEnglishWords } from '@/hooks/useEnglishWords'
import { formatExampleWithHighlight } from '@/data/english'

export function EnglishFloatingWidget() {
  const { currentWord, loading } = useEnglishWords()
  const [isExpanded, setIsExpanded] = useState(false)

  if (loading || !currentWord) {
    return null
  }

  const exampleParts = formatExampleWithHighlight(
    currentWord.example,
    currentWord.english,
  )

  return (
    <div
      className="group fixed bottom-6 left-6 z-40"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Compact view */}
      <div
        className={`
          relative overflow-hidden rounded-2xl border-2 shadow-lg backdrop-blur-sm transition-all duration-500 ease-out
          border-blue-200/60 bg-white/95
          dark:border-blue-500/30 dark:bg-gradient-to-br dark:from-blue-950/90 dark:to-slate-900/90
          ${isExpanded ? 'w-80 sm:w-96' : 'w-48'}
        `}
      >
        {/* Header - always visible */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇬🇧</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                {currentWord.english}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {currentWord.turkish}
              </p>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-out
            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="border-t border-blue-100 bg-blue-50/80 p-4 dark:border-blue-800 dark:bg-blue-950/30">
            <p className="mb-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              Örnek Kullanım
            </p>
            <p className="mb-2 text-sm text-slate-800 dark:text-slate-200">
              {exampleParts.parts.map((part, index) => (
                <span
                  key={index}
                  className={
                    part.highlighted ? 'font-bold text-blue-700 dark:text-blue-400' : undefined
                  }
                >
                  {part.text}
                </span>
              ))}
            </p>
            {currentWord.example_turkish && (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                → {currentWord.example_turkish}
              </p>
            )}
          </div>
        </div>

        {/* Hover indicator */}
        <div
          className={`
            absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transition-opacity duration-300
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>
    </div>
  )
}
