import RussianQuiz from '@/components/kesifler/RussianQuiz'

export const metadata = {
  title: 'Rusça Test | Mehmet Temel',
  description:
    '96 Rusça kelime ve cümle ile bilginizi test edin. Cümleler, fiiller, isimler, sayılar ve renkler.',
  openGraph: {
    title: 'Rusça Test - 10 Soruluk Quiz',
    description: 'Rusça bilginizi test edin! 4 seçenekli 10 soruluk interaktif test.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rusça Test - 10 Soruluk Quiz',
    description: 'Rusça bilginizi test edin!',
  },
}

export const revalidate = 3600 // 1 saat

export default function RussianTestPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">🇷🇺 Rusça Test</h1>
        <p className="text-muted-foreground">
          10 soruluk 4 seçenekli test ile Rusça bilginizi ölçün
        </p>
      </div>

      <RussianQuiz />
    </div>
  )
}
