'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function ConversationCard({ conversation }) {
  const [expanded, setExpanded] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)

  const visibleLines = expanded ? conversation.lines : conversation.lines.slice(0, 3)

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">{conversation.title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{conversation.subtitle}</p>
        </div>
        <button
          onClick={() => setShowTranslation((v) => !v)}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
            showTranslation
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          TR
        </button>
      </div>

      {/* Lines */}
      <div className="px-4 pb-2 space-y-3">
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className={`flex gap-3 ${line.speaker === 'B' ? 'flex-row-reverse' : ''}`}
          >
            {/* Speaker bubble */}
            <div
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                line.speaker === 'A'
                  ? 'bg-primary/15 text-primary'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {line.speaker}
            </div>

            {/* Message */}
            <div
              className={`flex-1 rounded-xl px-3 py-2 ${
                line.speaker === 'A'
                  ? 'bg-primary/8 rounded-tl-sm'
                  : 'bg-secondary/60 rounded-tr-sm'
              }`}
            >
              <p className="text-sm font-medium text-foreground leading-snug">{line.russian}</p>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">[{line.pronunciation}]</p>
              {showTranslation && (
                <p className="mt-1 text-xs text-foreground/70 italic">{line.turkish}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expand / Collapse */}
      {conversation.lines.length > 3 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-center gap-1 border-t border-border py-2.5 text-xs text-muted-foreground transition-colors hover:bg-secondary/30 hover:text-foreground"
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
          {expanded ? 'Daha az göster' : `${conversation.lines.length - 3} satır daha`}
        </button>
      )}
    </div>
  )
}
