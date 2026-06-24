'use client'

import * as Tooltip from '@radix-ui/react-tooltip'
import { Info } from 'lucide-react'

/**
 * RussianCard Component
 * Displays a Russian word/phrase card with tooltip for details
 */
export function RussianCard({ phrase }) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/20 hover:shadow-lg">
        {/* Color swatch for colors */}
        {phrase.color && (
          <div
            className="mx-auto mb-4 h-12 w-12 rounded-full border-2 border-border shadow-md"
            style={{ backgroundColor: phrase.color }}
          />
        )}

        {/* Russian Text - Main display */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-foreground sm:text-3xl">{phrase.russian}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">[{phrase.pronunciation}]</p>
            <p className="mt-1 text-sm text-foreground/80">{phrase.turkish}</p>
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
                  {/* Pronunciation */}
                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      Okunuş
                    </p>
                    <p className="font-mono text-primary">
                      [{phrase.pronunciation}]
                    </p>
                  </div>

                  {/* English Translation */}
                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      🇬🇧 İngilizce
                    </p>
                    <p className="text-foreground">{phrase.english}</p>
                  </div>

                  {/* Turkish Translation */}
                  <div>
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                      🇹🇷 Türkçe
                    </p>
                    <p className="text-foreground">{phrase.turkish}</p>
                  </div>

                  {/* Example for verbs */}
                  {phrase.example && (
                    <div className="border-t border-border pt-2">
                      <p className="mb-1 text-xs font-medium text-muted-foreground">
                        Örnek
                      </p>
                      <p className="text-foreground">{phrase.example}</p>
                      {phrase.exampleTranslation && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          → {phrase.exampleTranslation}
                        </p>
                      )}
                    </div>
                  )}
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
