'use client'

export function ResearchCategorySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="mb-8">
      {/* Minimal horizontal category links */}
      <div className="flex flex-wrap justify-center gap-3 text-xs">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id
          const hasCount = category.count > 0

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              disabled={!hasCount && category.id !== 'all'}
              className={`transition-colors ${
                isSelected
                  ? 'font-medium text-foreground underline decoration-2 underline-offset-4'
                  : hasCount
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'text-muted-foreground/30 cursor-not-allowed'
              }`}
              aria-label={`Filter by ${category.name}`}
              aria-pressed={isSelected}
            >
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
