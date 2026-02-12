import { Container } from '@/components/Container'
import { EnglishPageClient } from './EnglishPageClient'
import { getEnglishWords } from '@/lib/db'

// ISR: Revalidate every 60 seconds
export const revalidate = 60

export const metadata = {
  title: 'İngilizce - Mehmet Temel',
  description: 'İngilizce kelime öğrenme sistemi - Günlük kullanılan kelimeler',
}

export default async function EnglishPage() {
  // Fetch all words from database
  const words = await getEnglishWords()

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

        {/* Info Card */}
        <div className="mt-12 rounded-xl border border-border bg-secondary/20 p-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            💡 Telegram Bot ile Kelime Ekle
          </h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Telegram bot üzerinden <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary">.i</code> komutu ile yeni kelimeler ekleyebilirsiniz:
          </p>
          <div className="rounded-lg bg-background p-4 font-mono text-sm">
            <p className="text-muted-foreground">.i serendipity</p>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            AI otomatik olarak Türkçe karşılığını ve örnek cümle bulacak.
          </p>
        </div>
      </div>
    </Container>
  )
}
