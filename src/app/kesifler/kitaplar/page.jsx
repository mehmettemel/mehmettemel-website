import { getNotes } from '@/lib/db'
import { Container } from '@/components/Container'
import { BookNotesList } from '@/components/kesifler/BookNotesList'

export const revalidate = 60

export const metadata = {
  title: 'Kitaplar - Keşifler | Mehmet Temel',
  description: 'Kitaplardan aldığım notlar.',
}

export default async function BooksPage({ searchParams }) {
  const params = await searchParams
  const category = params?.category || 'all'

  const booksData = await getNotes({
    type: 'book',
    category: category !== 'all' ? category : undefined,
    limit: 1000,
  }).catch(() => ({
    notes: [],
    total: 0,
  }))

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📖</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Kitaplar
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Kitaplardan aldığım notlar.
              </p>
            </div>
          </div>
        </div>

        <BookNotesList notes={booksData.notes} />
      </div>
    </Container>
  )
}
