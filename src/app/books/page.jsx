import { Container } from '@/components/Container'
import { books, booksTitle, booksSubtitle } from '@/data/books'

export const metadata = {
  title: 'Books | Mehmet Temel',
  description: 'Favori kitaplarım.',
}

export default function BooksPage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl py-8 sm:py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {booksTitle}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{booksSubtitle}</p>
        </div>

        <ol className="border-t border-border">
          {books.map((book, i) => (
            <li
              key={book.id}
              className="group flex gap-4 border-b border-border py-5 transition-colors hover:bg-secondary/30"
            >
              <span className="mt-0.5 w-7 shrink-0 font-mono text-xs text-muted-foreground/60">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-base font-semibold text-foreground">
                    {book.title}
                  </h2>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {book.author}
                    {book.year ? ` · ${book.year}` : ''}
                  </span>
                </div>

                {book.subtitle && (
                  <p className="mt-0.5 text-sm italic text-muted-foreground">
                    {book.subtitle}
                  </p>
                )}

                {book.note && (
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {book.note}
                  </p>
                )}

                {book.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {book.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  )
}
