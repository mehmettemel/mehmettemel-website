import Link from 'next/link'

export function HomeResearches({ posts }) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section>
      <div className="mb-6 text-center">
        <h2 className="text-xs font-normal text-muted-foreground">
          Son İncelemeler
        </h2>
      </div>

      <div className="mx-auto w-full max-w-md space-y-3">
        {posts.map((post) => (
          <div key={post.slug} className="w-full text-center">
            <Link
              href={`/incelemeler/${post.slug}`}
              className="block w-full text-xs font-normal transition-opacity hover:opacity-60"
            >
              <span className="text-foreground">{post.title}</span>
              {post.author && (
                <>
                  <span className="text-muted-foreground"> - </span>
                  <span className="text-muted-foreground">
                    {post.author}
                  </span>
                </>
              )}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/incelemeler"
          className="text-xs text-muted-foreground transition-opacity hover:opacity-60"
        >
          Tümünü Gör →
        </Link>
      </div>
    </section>
  )
}
