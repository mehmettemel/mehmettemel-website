import { Container } from '@/components/Container'
import { PersonalContent } from '@/components/personal/PersonalContent'
import { categories } from '@/data/personal/ai'

export const metadata = {
  title: 'Artificial Intelligence | Mehmet Temel',
  description: 'Yapay zeka ile ilgili notlar, araçlar ve stratejiler.',
}

export default function AIPage() {
  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <PersonalContent categories={categories} title="Artificial Intelligence" />
      </div>
    </Container>
  )
}
