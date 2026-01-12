import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Container } from '../../components/Container'

export const metadata = {
  title: 'Signals - Bu Haftanin Kesifleri | Mehmet Temel',
  description:
    'Her hafta internetten buldigum beslenme ve insan biyolojisi hakkinda ilginc kaynaklar ve bilgiler.',
}

async function getSignalsContent() {
  const signalsPath = path.join(process.cwd(), 'content/signals/current.md')

  if (!fs.existsSync(signalsPath)) {
    return null
  }

  const fileContents = fs.readFileSync(signalsPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .process(content)

  const contentHtml = processedContent.toString()

  return {
    content: contentHtml,
    lastUpdated: data.lastUpdated || new Date().toISOString(),
    ...data,
  }
}

export default async function SignalsPage() {
  const signals = await getSignalsContent()

  if (!signals) {
    return (
      <Container>
        <div className="mx-auto max-w-4xl py-12 sm:py-16 lg:py-20">
          <div className="mb-12 sm:mb-16">
            <h1 className="mb-5 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Bu Hafta
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
              Her hafta dikkatimi çeken kaynaklar ve bilgiler.
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-secondary/20 py-20 sm:py-24 text-center">
            <p className="text-lg sm:text-xl text-muted-foreground">
              Bu hafta henüz içerik yok. Pazartesi günü yeni içerik yayınlanacak!
            </p>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="mx-auto max-w-4xl py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <h1 className="mb-5 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Bu Hafta
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mb-4">
            Bu hafta dikkatimi çeken kaynaklar ve bilgiler.
          </p>
          <div className="text-sm sm:text-base text-muted">
            Son güncelleme:{' '}
            <time dateTime={signals.lastUpdated}>
              {format(new Date(signals.lastUpdated), "d MMMM yyyy, EEEE", { locale: tr })}
            </time>
          </div>
        </div>

        {/* Content */}
        <article
          className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: signals.content }}
        />

        {/* Footer */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-border">
          <p className="text-sm sm:text-base text-muted-foreground text-center">
            Her Pazartesi güncellenir.{' '}
            <a
              href="https://twitter.com/mehmettemel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors"
            >
              Kaçırmamak için Twitter'dan takip et
            </a>
            .
          </p>
        </div>
      </div>
    </Container>
  )
}
