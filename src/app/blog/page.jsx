import { Container } from '../../components/Container'
import { RabbitHoleCard } from '../../components/RabbitHoleCard'
import { getAllPosts } from '../../lib/blog'

export const metadata = {
  title: 'Rabbit Holes - Notes from Books, Videos & Articles | Mehmet Temel',
  description:
    'Deep dives into interesting books, videos, and articles. My personal notes and takeaways from exploring ideas worth sharing.',
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <Container>
      <div className="mx-auto max-w-[620px] pt-12 pb-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
            Rabbit Holes
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Notes and insights from books, videos, and articles I've explored.
            Each entry is a journey down a fascinating rabbit hole worth
            sharing.
          </p>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-base text-muted-foreground">
              No rabbit holes explored yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post, index) => (
              <RabbitHoleCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}
