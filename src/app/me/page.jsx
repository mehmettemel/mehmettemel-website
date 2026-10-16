import { Container } from '@/components/Container'
import { meTitle, meSubtitle, paragraphs, closing } from '@/data/me'

export const metadata = {
  title: 'Me | Mehmet Temel',
  description: 'Beni tanımlayan not.',
}

export default function MePage() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl py-8 sm:py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {meTitle}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{meSubtitle}</p>
        </div>

        <div className="space-y-6 border-t border-border pt-8">
          {paragraphs.map((text, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground/90">
              {text}
            </p>
          ))}
        </div>

        <p className="mt-10 border-t border-border pt-6 text-base font-medium italic text-foreground">
          {closing}
        </p>
      </div>
    </Container>
  )
}
