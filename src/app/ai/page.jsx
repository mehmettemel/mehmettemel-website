import { NoteGraph } from '@/components/graph/NoteGraph'
import { graphTitle, graphSubtitle, nodes, links } from '@/data/ai-notes'

export const metadata = {
  title: 'AI | Mehmet Temel',
  description: 'Yapay zeka üzerine notlarım, bağlantılı grafik.',
  robots: { index: false, follow: false },
}

// Food sayfasıyla aynı sahne: Navbar yüksekliği (61px) çıkarılır, grafik
// kalan ekranı doldurur. Not yokken grafik motoru açılmaz, boş durum gösterilir.
export default function AiPage() {
  return (
    <div className="relative h-[calc(100dvh-61px)] min-h-[560px] w-full overflow-hidden">
      {nodes.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
          <h1 className="text-2xl font-semibold">{graphTitle}</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Henüz not yok. /ai ile ilk notu ekle.
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
