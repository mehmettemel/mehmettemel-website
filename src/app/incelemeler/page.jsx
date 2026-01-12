import { Container } from '../../components/Container'
import { ResearchesList } from '../../components/ResearchesList'
import { getAllPosts } from '../../lib/blog'

export const metadata = {
  title: 'Araştırmalar | Mehmet Temel',
  description:
    'Beslenme, gıda ve insan biyolojisi üzerine derinlemesine araştırmalarım. Her konuda detaylı analiz ve kişisel yorumlar.',
}

export default function ResearchesIndex() {
  const posts = getAllPosts()

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <h1 className="mb-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Araştırmalar
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Beslenme, gıda ve insan biyolojisi üzerine araştırmalarım. Her bir
            konuda derinlemesine analiz, bilimsel kaynaklar ve kişisel
            yorumlarımı bulabilirsiniz.
          </p>
        </div>

        {/* Client Component for Filtering */}
        <ResearchesList posts={posts} />
      </div>
    </Container>
  )
}
