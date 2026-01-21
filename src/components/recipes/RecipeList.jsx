'use client'

import { useState, useMemo } from 'react'
import { RecipeCard } from './RecipeCard'
import { RecipeModal } from './RecipeModal'

/**
 * RecipeList Component
 * Displays a grid of recipe cards with filtering and modal view
 */
export function RecipeList({ recipes: initialRecipes = [] }) {
  const [recipes] = useState(initialRecipes)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      recipes.map((r) => r.category).filter(Boolean),
    )
    return ['all', ...Array.from(uniqueCategories)]
  }, [recipes])

  // Filter recipes by category
  const filteredRecipes = useMemo(() => {
    if (selectedCategory === 'all') {
      return recipes
    }
    return recipes.filter((r) => r.category === selectedCategory)
  }, [recipes, selectedCategory])

  // Group by category
  const recipesByCategory = useMemo(() => {
    return filteredRecipes.reduce((acc, recipe) => {
      const cat = recipe.category || 'Diğer'
      if (!acc[cat]) {
        acc[cat] = []
      }
      acc[cat].push(recipe)
      return acc
    }, {})
  }, [filteredRecipes])

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
        <div className="mb-4 rounded-full bg-muted/50 p-6 dark:bg-muted/30">
          <span className="text-4xl">🍳</span>
        </div>
        <p className="mb-2 text-base font-medium text-foreground sm:text-lg dark:text-foreground">
          Henüz hiçbir tarif eklenmemiş
        </p>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base dark:text-muted-foreground/80">
          Telegram botundan "/tarif" komutu ile tarif ekleyebilirsiniz
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {/* Stats & Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Stats */}
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary transition-colors dark:bg-primary/20">
              📊 Toplam: {recipes.length}
            </span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1.5 font-medium text-foreground transition-colors dark:bg-secondary/50">
                🏷️ {selectedCategory}: {filteredRecipes.length}
              </span>
            )}
          </div>

          {/* Category Filter */}
          {categories.length > 2 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                    selectedCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat === 'all' ? 'Tümü' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Recipes Grid */}
        {selectedCategory === 'all' ? (
          // Show by category when viewing all
          <div className="space-y-6">
            {Object.entries(recipesByCategory).map(([category, categoryRecipes]) => (
              <section key={category} className="space-y-3 sm:space-y-4">
                <h3 className="border-b border-border/40 pb-2 text-base font-semibold text-foreground sm:text-lg dark:border-border/30 dark:text-foreground">
                  {category}
                  <span className="ml-2 text-sm text-muted-foreground dark:text-muted-foreground/70">
                    ({categoryRecipes.length})
                  </span>
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={setSelectedRecipe}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          // Simple grid when filtered
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={setSelectedRecipe}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  )
}
