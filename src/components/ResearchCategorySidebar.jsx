'use client'

export function ResearchCategorySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="mb-6">
      {/* Horizontal category chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id
          const hasCount = category.count > 0

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              disabled={!hasCount && category.id !== 'all'}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${
                isSelected
                  ? 'bg-foreground text-background shadow-sm'
                  : hasCount
                    ? 'bg-secondary text-foreground hover:bg-secondary/80'
                    : 'bg-secondary/40 text-muted-foreground/40 cursor-not-allowed'
              }`}
              aria-label={`Filter by ${category.name}`}
              aria-pressed={isSelected}
            >
              <span className="text-sm sm:text-base">{category.icon}</span>
              <span>{category.name}</span>
              {category.count > 0 && (
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${
                    isSelected
                      ? 'bg-background/20 text-background'
                      : 'bg-foreground/10 text-foreground'
                  }`}
                >
                  {category.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
