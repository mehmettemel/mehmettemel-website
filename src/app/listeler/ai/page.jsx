import { Container } from '@/components/Container'
import { KendimeNotlarContent } from '@/components/personal/KendimeNotlarContent'
import { categories } from '@/data/personal/ai'

export const metadata = {
  title: 'Artificial Intelligence | Mehmet Temel',
  description: 'Yapay zeka ile ilgili notlar, araçlar ve stratejiler.',
}

export default function AIPage() {
  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {Object.keys(categories).length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-xs text-muted-foreground">
              Henüz not eklenmedi
            </p>
          </div>
        ) : (
          <KendimeNotlarContent categories={categories} title="Artificial Intelligence" />
        )}
      </div>
    </Container>
  )
}
