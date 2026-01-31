'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const typeConfig = {
  link: {
    icon: '🔗',
    label: 'Link',
    href: '/kesifler/linkler',
  },
  quote: {
    icon: '💭',
    label: 'Alıntı',
    href: '/kesifler/alintilar',
  },
}

const categoryLabels = {
  // Link categories
  teknik: 'Teknik',
  icerik: 'İçerik',
  diger: 'Diğer',
  // Quote categories
  kisisel: 'Kişisel',
  saglik: 'Sağlık',
  gida: 'Gıda',
  seyahat: 'Seyahat',
  genel: 'Genel',
}

function getDisplayText(note) {
  if (note.note_type === 'link') {
    return note.title || note.text
  }
  // Quote or fallback
  if (note.text) {
    const truncated =
      note.text.length > 60 ? note.text.substring(0, 60) + '...' : note.text
    return `"${truncated}"`
  }
  return 'Not'
}

export function RecentDiscoveries({ notes }) {
  if (!notes || notes.length === 0) {
    return null
  }

  return (
    <section className="fade-in">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Son Eklemeler
        </h2>
        <Link
          href="/kesifler"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Tümünü Gör →
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm">
        <ul className="divide-y divide-border">
          {notes.map((note, index) => {
            const config = typeConfig[note.note_type] || typeConfig.quote
            const categoryLabel = categoryLabels[note.category] || note.category
            const displayText = getDisplayText(note)
            const fullText = note.text || note.title || ''
            const relativeTime = formatDistanceToNow(
              new Date(note.created_at),
              {
                addSuffix: true,
                locale: tr,
              },
            )

            return (
              <li key={note.id}>
                <Link
                  href={note.url || config.href}
                  target={note.url ? '_blank' : undefined}
                  rel={note.url ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-accent/50 dark:hover:bg-accent/30"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Type Icon */}
                  <span
                    className="shrink-0 text-lg transition-transform group-hover:scale-110"
                    role="img"
                    aria-label={config.label}
                  >
                    {config.icon}
                  </span>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <TooltipProvider>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                            {displayText}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          align="start"
                          className="z-[100] max-h-64 max-w-sm overflow-auto"
                        >
                          <p className="text-xs leading-relaxed whitespace-pre-line">
                            {fullText}
                          </p>
                          {(note.author || note.source) && (
                            <div className="mt-2 border-t border-border/50 pt-2 text-[10px] text-muted-foreground">
                              {note.author && <div>👤 {note.author}</div>}
                              {note.source && <div>📚 {note.source}</div>}
                            </div>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="mt-0.5 text-xs text-muted-foreground transition-colors group-hover:text-foreground/70">
                      {categoryLabel}
                    </p>
                  </div>

                  {/* Time */}
                  <span className="shrink-0 text-xs text-muted-foreground transition-colors group-hover:text-foreground/70">
                    {relativeTime}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
