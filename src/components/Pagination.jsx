export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = []
  const showEllipsis = totalPages > 7

  if (showEllipsis) {
    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }
  } else {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-1">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-background"
        aria-label="Previous page"
      >
        ←
      </button>

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground"
            >
              ...
            </span>
          )
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors ${
              currentPage === page
                ? 'bg-foreground text-background font-medium'
                : 'border border-border bg-background hover:bg-secondary'
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-background"
        aria-label="Next page"
      >
        →
      </button>
    </div>
  )
}
