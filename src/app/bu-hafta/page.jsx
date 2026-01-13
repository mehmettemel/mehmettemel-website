import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Container } from '../../components/Container'
import { PageHeader } from '../../components/PageHeader'

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
        <div className="mx-auto max-w-7xl py-8 sm:py-12">
          <PageHeader
            title="Bu Hafta"
            description="Her hafta dikkatimi çeken kaynaklar ve bilgiler."
          />
          <div className="rounded-xl border border-dashed border-border bg-secondary/20 py-16 text-center sm:py-20">
            <p className="text-sm text-muted-foreground sm:text-base">
              Bu hafta henüz içerik yok. Pazartesi günü yeni içerik yayınlanacak!
            </p>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <PageHeader
          title="Bu Hafta"
          description="Bu hafta dikkatimi çeken kaynaklar ve bilgiler."
        />
        <div className="mb-6 text-center text-xs text-muted sm:text-sm">
          Son güncelleme:{' '}
          <time dateTime={signals.lastUpdated}>
            {format(new Date(signals.lastUpdated), "d MMMM yyyy, EEEE", { locale: tr })}
          </time>
        </div>

        {/* Content */}
        <article
          className="prose prose-sm sm:prose-base max-w-none dark:prose-invert
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 sm:prose-h2:text-xl
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: signals.content }}
        />

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
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
