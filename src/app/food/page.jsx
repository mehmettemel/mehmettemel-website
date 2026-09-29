import { NoteGraph } from '@/components/graph/NoteGraph'
import { graphTitle, graphSubtitle } from '@/data/food-notes'

export const metadata = {
  title: 'Food | Mehmet Temel',
  description: 'Kendi gıda notlarım, bağlantılı grafik.',
  robots: { index: false, follow: false },
}

// Navbar: py-3 + h-9 + 1px kenarlık = 61px. Sahne kalan tüm ekranı alır;
// başlık, süzgeçler ve panel tuvalin üstünde yüzer (NoteGraph içinde).
export default function FoodPage() {
  return (
    <div className="relative h-[calc(100dvh-61px)] min-h-[560px] w-full overflow-hidden">
      <NoteGraph title={graphTitle} subtitle={graphSubtitle} />
    </div>
  )
}
