'use client'

import { useState } from 'react'

/**
 * RecipeCard Component
 * Displays a recipe card with preview info
 */
export function RecipeCard({ recipe, onClick }) {
  return (
    <div
      onClick={() => onClick(recipe)}
      className="group cursor-pointer rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:bg-secondary/20 hover:shadow-lg sm:p-5"
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
            {recipe.name}
          </h3>
          {recipe.category && (
            <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {recipe.category}
            </span>
          )}
        </div>
        <span className="text-2xl" role="img" aria-label="recipe">
          🍳
        </span>
      </div>

      {/* Description */}
      {recipe.description && (
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {recipe.description}
        </p>
      )}

      {/* Meta Info */}
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        {recipe.prep_time && (
          <span className="flex items-center gap-1">
            ⏱️ {recipe.prep_time}dk hazırlık
          </span>
        )}
        {recipe.cook_time && (
          <span className="flex items-center gap-1">
            🔥 {recipe.cook_time}dk pişirme
          </span>
        )}
        {recipe.servings && (
          <span className="flex items-center gap-1">
            👥 {recipe.servings} kişilik
          </span>
        )}
        {recipe.difficulty && (
          <span className="flex items-center gap-1">
            📊 {recipe.difficulty}
          </span>
        )}
      </div>

      {/* Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-secondary px-2 py-0.5 text-xs text-foreground"
            >
              #{tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
