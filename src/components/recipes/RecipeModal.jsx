'use client'

import { useEffect } from 'react'

/**
 * RecipeModal Component
 * Displays full recipe details in a modal overlay
 */
export function RecipeModal({ recipe, onClose }) {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!recipe) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky right-4 top-4 z-10 ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-foreground backdrop-blur-sm transition-all hover:bg-secondary hover:scale-110"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 border-b border-border pb-6">
            <div className="mb-3 flex items-start gap-3">
              <span className="text-4xl" role="img" aria-label="recipe">
                🍳
              </span>
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                  {recipe.name}
                </h2>
                {recipe.description && (
                  <p className="text-base text-muted-foreground">
                    {recipe.description}
                  </p>
                )}
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 text-sm">
              {recipe.category && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
                  🏷️ {recipe.category}
                </span>
              )}
              {recipe.prep_time && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-medium text-foreground">
                  ⏱️ {recipe.prep_time}dk hazırlık
                </span>
              )}
              {recipe.cook_time && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-medium text-foreground">
                  🔥 {recipe.cook_time}dk pişirme
                </span>
              )}
              {recipe.servings && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-medium text-foreground">
                  👥 {recipe.servings} kişilik
                </span>
              )}
              {recipe.difficulty && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-medium text-foreground">
                  📊 {recipe.difficulty}
                </span>
              )}
            </div>

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
              🥘 Malzemeler
            </h3>
            <div className="rounded-xl bg-muted/30 p-4">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                {recipe.ingredients}
              </pre>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-foreground">
              👨‍🍳 Yapılışı
            </h3>
            <div className="rounded-xl bg-muted/30 p-4">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                {recipe.instructions}
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <span>ID: {recipe.id}</span>
            {recipe.created_at && (
              <span>
                Eklenme: {new Date(recipe.created_at).toLocaleDateString('tr-TR')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
