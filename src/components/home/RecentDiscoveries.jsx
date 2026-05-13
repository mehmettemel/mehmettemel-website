import Link from 'next/link'

function getDisplayText(note) {
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
    <section>
      <div className="mb-6 text-center">
        <h2 className="text-xs font-normal text-muted-foreground">
          Son Keşifler
        </h2>
      </div>

      <div className="mx-auto w-full max-w-md space-y-3">
        {notes.slice(0, 5).map((note) => (
          <div key={note.id} className="w-full text-center">
            <Link
              href="/kesifler/alintilar"
              className="block w-full text-xs font-normal text-foreground transition-opacity hover:opacity-60"
            >
              {getDisplayText(note)}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/kesifler/alintilar"
          className="text-xs text-muted-foreground transition-opacity hover:opacity-60"
        >
          Tümünü Gör →
        </Link>
      </div>
    </section>
  )
}
