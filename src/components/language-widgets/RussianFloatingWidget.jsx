'use client'

import { useState } from 'react'
import { useRussianPhrases } from '@/hooks/useRussianPhrases'

export function RussianFloatingWidget() {
  const { currentPhrase } = useRussianPhrases()
  const [isExpanded, setIsExpanded] = useState(false)

  if (!currentPhrase) {
    return null
  }

  return (
    <div
      className="group fixed bottom-6 right-6 z-40"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Compact view */}
      <div
        className={`
          relative overflow-hidden rounded-2xl border-2 shadow-lg backdrop-blur-sm transition-all duration-500 ease-out
          border-rose-200/60 bg-white/95
          dark:border-red-500/30 dark:bg-gradient-to-br dark:from-red-950/90 dark:to-slate-900/90
          ${isExpanded ? 'w-80 sm:w-96' : 'w-48'}
        `}
      >
        {/* Header - always visible */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇷🇺</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-rose-700 dark:text-red-400">
                {currentPhrase.russian}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {currentPhrase.turkish}
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
          <div className="border-t border-rose-100 bg-rose-50/80 p-4 dark:border-red-800 dark:bg-red-950/30">
            {/* Pronunciation */}
            <div className="mb-3">
              <p className="mb-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                Okunuş
              </p>
              <p className="font-mono text-sm text-rose-700 dark:text-red-400">
                [{currentPhrase.pronunciation}]
              </p>
            </div>

            {/* Translations */}
            <div className="space-y-2">
              <div>
                <p className="mb-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                  🇬🇧 İngilizce
                </p>
                <p className="text-sm text-slate-800 dark:text-slate-200">
                  {currentPhrase.english}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                  🇹🇷 Türkçe
                </p>
                <p className="text-sm text-slate-800 dark:text-slate-200">
                  {currentPhrase.turkish}
                </p>
              </div>
            </div>

            {/* Example for verbs */}
            {currentPhrase.example && (
              <div className="mt-3 border-t border-rose-100 pt-3 dark:border-red-800">
                <p className="mb-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                  Örnek
                </p>
                <p className="mb-1 text-sm text-slate-800 dark:text-slate-200">
                  {currentPhrase.example}
                </p>
                {currentPhrase.exampleTranslation && (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    → {currentPhrase.exampleTranslation}
                  </p>
                )}
              </div>
            )}

            {/* Color swatch for colors */}
            {currentPhrase.type === 'renk' && currentPhrase.color && (
              <div className="mt-3 flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-full border-2 border-slate-300 shadow-md dark:border-slate-600"
                  style={{ backgroundColor: currentPhrase.color }}
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">Renk</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover indicator */}
        <div
          className={`
            absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 to-pink-500 transition-opacity duration-300
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>
    </div>
  )
}
