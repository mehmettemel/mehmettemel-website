import { Container } from '../../components/Container'
import { ResearchesList } from '../../components/ResearchesList'
import { getAllPosts } from '../../lib/blog'
import { PageHeader } from '../../components/PageHeader'

export const metadata = {
  title: 'Reviews | Mehmet Temel',
  description:
    'In-depth research and reviews on nutrition, food and human biology. Detailed analysis and personal commentary.',
}

export default function ResearchesIndex() {
  const posts = getAllPosts()

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <PageHeader
          title="Araştırmalar"
          description="ilgimi çeken konular hakkında yaptığım araştırmalar"
        />

        {/* Client Component for Filtering */}
        <ResearchesList posts={posts} />
      </div>
    </Container>
  )
}
