import { getNotes } from '@/lib/db'
import { Container } from '@/components/Container'
import { VideoNotesList } from '@/components/kesifler/VideoNotesList'

export const revalidate = 60

export const metadata = {
  title: 'Videolar - Keşifler | Mehmet Temel',
  description: 'Video notları ve öğrendiklerim.',
}

export default async function VideosPage({ searchParams }) {
  const params = await searchParams
  const category = params?.category || 'all'

  const videosData = await getNotes({
    type: 'video',
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
            <span className="text-3xl">🎬</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Videolar
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Video notları ve öğrendiklerim.
              </p>
            </div>
          </div>
        </div>

        <VideoNotesList notes={videosData.notes} />
      </div>
    </Container>
  )
}
