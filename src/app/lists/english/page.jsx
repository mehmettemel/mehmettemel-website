import { Container } from '@/components/Container'
import { EnglishPageClient } from './EnglishPageClient'
import { getAllEnglishWords } from '@/data/english-words'

export const metadata = {
  title: 'İngilizce - Mehmet Temel',
  description: 'İngilizce kelime öğrenme sistemi - Günlük kullanılan kelimeler',
}

export default function EnglishPage() {
  const words = getAllEnglishWords()

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="text-4xl" role="img" aria-label="English">
              🇬🇧
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              İngilizce
            </h1>
          </div>
          <p className="text-base text-muted-foreground">
            Günlük hayatta kullanılabilecek İngilizce kelimeler ve örnekler
          </p>
          {words.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              Toplam {words.length} kelime
            </p>
          )}
        </div>

        {/* Client component for interactive functionality */}
        <EnglishPageClient words={words} />
      </div>
    </Container>
  )
}
