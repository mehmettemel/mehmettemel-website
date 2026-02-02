import Link from 'next/link'

function getDisplayText(note) {
  if (note.note_type === 'link') {
    return note.title || note.text
  }
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

  const typeConfig = {
    link: { href: '/kesifler/linkler' },
    quote: { href: '/kesifler/alintilar' },
  }

  return (
    <section>
      <div className="mb-6 text-center">
        <h2 className="text-xs font-normal text-muted-foreground">
          Son Keşifler
        </h2>
      </div>

      <div className="mx-auto w-full max-w-md space-y-3">
        {notes.slice(0, 5).map((note) => {
          const config = typeConfig[note.note_type] || typeConfig.quote
          const displayText = getDisplayText(note)

          return (
            <div key={note.id} className="w-full text-center">
              <Link
                href={note.url || config.href}
                target={note.url ? '_blank' : undefined}
                rel={note.url ? 'noopener noreferrer' : undefined}
                className="block w-full text-xs font-normal text-foreground transition-opacity hover:opacity-60"
              >
                {displayText}
              </Link>
            </div>
          )
        })}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/kesifler"
          className="text-xs text-muted-foreground transition-opacity hover:opacity-60"
        >
          Tümünü Gör →
        </Link>
      </div>
    </section>
  )
}
