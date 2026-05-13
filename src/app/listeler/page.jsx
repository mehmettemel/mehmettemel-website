import Link from 'next/link'
import { Container } from '@/components/Container'
import { getRecipeStats } from '@/data/recipes'
import { listCategories } from '@/data/list'

export const revalidate = 60

export const metadata = {
  title: 'Listeler - Takip Listelerim | Mehmet Temel',
  description:
    'Tarifler, dil öğrenimi ve kişisel takip listelerim.',
  alternates: {
    canonical: 'https://mehmettemel.com/listeler',
  },
  openGraph: {
    title: 'Listeler - Takip Listelerim | Mehmet Temel',
    description:
      'Tarifler, dil öğrenimi ve kişisel takip listelerim.',
    url: 'https://mehmettemel.com/listeler',
    type: 'website',
  },
}

export default function ListelerPage() {
  const stats = {}
  const recipeStats = getRecipeStats()

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            📋 Listeler
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Tarifler, dil öğrenimi ve kişisel notlarım
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listCategories.map((category) => {
            // Russian uses static data
            const isStatic = category.isStatic
            // Recipe stats come from separate table
            const isRecipe = category.id === 'tarif'
            const categoryStats = isStatic
              ? { total: 41, completed: 0, liked: 0 } // Russian has 41 phrases
              : isRecipe
                ? { total: recipeStats?.total || 0, completed: 0, liked: 0 }
                : stats[category.id] || { total: 0, completed: 0, liked: 0 }

            return (
              <Link
                key={category.id}
                href={`/listeler/${category.id}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/20 hover:shadow-lg"
              >
                {/* Icon & Name */}
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="text-3xl"
                    role="img"
                    aria-label={category.name}
                  >
                    {category.emoji}
                  </span>
                  <h2 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {category.name}
                  </h2>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm text-muted-foreground">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="mt-auto flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {categoryStats.total} {isStatic ? 'kelime' : isRecipe ? 'tarif' : 'item'}
                  </span>
                  {categoryStats.completed > 0 && (
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                      ✓ {categoryStats.completed}
                    </span>
                  )}
                  {categoryStats.liked > 0 && (
                    <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-600 dark:bg-red-950 dark:text-red-400">
                      ❤️ {categoryStats.liked}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
