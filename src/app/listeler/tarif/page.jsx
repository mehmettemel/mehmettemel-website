import { Container } from '@/components/Container'
import { getAllRecipes } from '@/data/recipes'
import { RecipeList } from '@/components/recipes/RecipeList'
import { getListCategory } from '@/data/list'

export const metadata = {
  title: 'Tarifler - Listeler | Mehmet Temel',
  description: 'Yemek tarifleri ve mutfak notları.',
  alternates: {
    canonical: 'https://mehmettemel.com/listeler/tarif',
  },
  openGraph: {
    title: 'Tarifler - Listeler | Mehmet Temel',
    description: 'Yemek tarifleri ve mutfak notları',
    url: 'https://mehmettemel.com/listeler/tarif',
    type: 'website',
  },
}

export default function TariflerPage() {
  const category = getListCategory('tarif')
  const recipes = getAllRecipes()

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={category?.name}>
              {category?.emoji}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {category?.name || 'Tarifler'}
            </h1>
          </div>
          <p className="text-base text-muted-foreground">
            {category?.description}
          </p>
        </div>

        {/* Recipe List */}
        <RecipeList recipes={recipes} />
      </div>
    </Container>
  )
}
