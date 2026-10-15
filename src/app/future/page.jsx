import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import { NoteGraph } from '@/components/graph/NoteGraph'
import { graphTitle, graphSubtitle, nodes, links } from '@/data/future-notes'

export const metadata = {
  title: 'Future | Mehmet Temel',
  description: 'Gelecek üzerine notlarım, bağlantılı grafik.',
  robots: { index: false, follow: false },
}

// Giriş gerektirir. Food sayfasıyla aynı sahne: Navbar yüksekliği (61px)
// çıkarılır, grafik kalan ekranı doldurur. Not yokken grafik motoru açılmaz.
export default async function FuturePage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <div className="relative h-[calc(100dvh-61px)] min-h-[560px] w-full overflow-hidden">
      {nodes.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
          <h1 className="text-2xl font-semibold">{graphTitle}</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Henüz not yok. /f ile ilk notu ekle.
          </p>
        </div>
      ) : (
        <NoteGraph
          title={graphTitle}
          subtitle={graphSubtitle}
          nodes={nodes}
          links={links}
        />
      )}
    </div>
  )
}
