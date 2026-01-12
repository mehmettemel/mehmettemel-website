'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = []
  const maxVisiblePages = 5

  // Calculate page numbers to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-background"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* First page */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium transition hover:bg-secondary"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="flex h-9 w-9 items-center justify-center text-muted-foreground">
              ...
            </span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition ${
            page === currentPage
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background hover:bg-secondary'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="flex h-9 w-9 items-center justify-center text-muted-foreground">
              ...
            </span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium transition hover:bg-secondary"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-background"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
