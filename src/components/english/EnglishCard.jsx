'use client'

import * as Tooltip from '@radix-ui/react-tooltip'
import { Info } from 'lucide-react'
import { formatExampleWithHighlight } from '@/data/english'

/**
 * EnglishCard Component
 * Displays an English word card with Turkish translation and example
 */
export function EnglishCard({ word }) {
  if (!word) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
        Henüz kelime eklenmedi. Telegram bot ile .i komutu ile kelime
        ekleyebilirsiniz.
      </div>
    )
  }

  const exampleParts = formatExampleWithHighlight(word.example, word.english)

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/20 hover:shadow-lg">
        {/* English Word - Main display */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <p className="text-center text-3xl font-bold text-foreground sm:text-4xl">
              {word.english}
            </p>

            {/* Turkish Translation */}
            <p className="text-center text-lg text-muted-foreground">
              {word.turkish}
            </p>

            {/* Example Sentence */}
            {word.example && (
              <div className="mt-4 rounded-lg bg-secondary/30 p-4">
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Örnek Kullanım
                </p>
                <p className="text-base text-foreground">
                  {exampleParts.parts.map((part, index) => (
                    <span
                      key={index}
                      className={
                        part.highlighted
                          ? 'font-bold text-primary'
                          : undefined
                      }
                    >
                      {part.text}
                    </span>
                  ))}
                </p>
                {word.example_turkish && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    → {word.example_turkish}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Info Icon with Tooltip */}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 transition-all hover:bg-primary/20 group-hover:opacity-100"
                aria-label="Show details"
              >
                <Info className="h-3.5 w-3.5" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="z-50 max-w-xs rounded-lg border border-border bg-background p-4 shadow-xl animate-in fade-in-0 zoom-in-95"
                sideOffset={5}
              >
                <div className="space-y-2 text-sm">
                  {/* English Word */}
                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      🇬🇧 İngilizce
                    </p>
                    <p className="font-semibold text-foreground">
                      {word.english}
                    </p>
                  </div>

                  {/* Turkish Translation */}
                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      🇹🇷 Türkçe
                    </p>
                    <p className="text-foreground">{word.turkish}</p>
                  </div>

                  {/* Example */}
                  {word.example && (
                    <div className="border-t border-border pt-2">
                      <p className="mb-1 text-xs font-medium text-muted-foreground">
                        Örnek Cümle
                      </p>
                      <p className="text-foreground">{word.example}</p>
                      {word.example_turkish && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          → {word.example_turkish}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Added date */}
                  <div className="border-t border-border pt-2">
                    <p className="text-xs text-muted-foreground">
                      Eklenme:{' '}
                      {new Date(word.created_at).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <Tooltip.Arrow className="fill-border" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>
      </div>
    </Tooltip.Provider>
  )
}
