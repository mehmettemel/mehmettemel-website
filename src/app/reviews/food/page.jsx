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
    <Container>
      <div className="mx-auto max-w-5xl py-8 sm:py-12">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {graphTitle}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{graphSubtitle}</p>
        </div>
        <NoteGraph />
      </div>
    </Container>
  )
}
