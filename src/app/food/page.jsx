import { Container } from '@/components/Container'
import { NoteGraph } from '@/components/graph/NoteGraph'
import { graphTitle, graphSubtitle } from '@/data/food-notes'

export const metadata = {
  title: 'Food | Mehmet Temel',
  description: 'Kendi gıda notlarım, bağlantılı grafik.',
  robots: { index: false, follow: false },
}

export default function FoodPage() {
  return (
    <>
      <Container>
        <div className="mx-auto max-w-5xl pt-8 sm:pt-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {graphTitle}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{graphSubtitle}</p>
          </div>
        </div>
      </Container>
      {/* grafik kenardan kenara: küme nefes alsın */}
      <div className="w-full pb-8">
        <NoteGraph heightClass="h-[78vh]" />
      </div>
    </>
  )
}
