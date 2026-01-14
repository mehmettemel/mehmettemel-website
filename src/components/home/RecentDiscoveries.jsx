'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'

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
  video: {
    icon: '🎬',
    label: 'Video',
    href: '/kesifler/videolar',
  },
  book: {
    icon: '📖',
    label: 'Kitap',
    href: '/kesifler/kitaplar',
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
  // Video categories
  youtube: 'YouTube',
  documentary: 'Belgesel',
  course: 'Kurs',
  podcast: 'Podcast',
  // Book categories
  science: 'Bilim',
  selfhelp: 'Kişisel Gelişim',
  biography: 'Biyografi',
  fiction: 'Kurgu',
  health: 'Sağlık',
}

function getDisplayText(note) {
  if (note.note_type === 'link') {
    return note.title || note.text
  }
  if (note.note_type === 'book' || note.note_type === 'video') {
    const source = note.source || note.author
    if (source) {
      return `${note.text?.substring(0, 40)}... - ${source}`
    }
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
          Son Gelişmeler
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
                    <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {displayText}
                    </p>
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
