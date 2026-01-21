'use client'

import { useState, useId } from 'react'
import { Pagination } from '../Pagination'
import { UnifiedCard } from './UnifiedCard'

const ITEMS_PER_PAGE = 12

export function LinksList({ links }) {
  const [currentPage, setCurrentPage] = useState(1)
  const listId = useId()

  if (!links || links.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl">📚</div>
        <p className="text-base text-muted-foreground">
          Henüz link eklenmedi. Yakında faydalı kaynaklar eklenecek!
        </p>
      </div>
    )
  }

  // No category filtering - show all links
  const totalPages = Math.ceil(links.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentLinks = links.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Stats */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground sm:text-sm">
          <span className="font-semibold text-foreground">
            {links.length}
          </span>{' '}
          kaynak
        </p>
        {totalPages > 1 && (
          <p className="text-xs text-muted-foreground">
            Sayfa {currentPage} / {totalPages}
          </p>
        )}
      </div>

      {/* Links List */}
      <div
        key={`${listId}-${currentPage}`}
        className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3"
      >
        {currentLinks.map((gem, index) => (
          <UnifiedCard
            key={gem.id}
            title={gem.title}
            description={gem.description}
            icon="🔗"
            author={gem.author}
            url={gem.url}
            isExternal={true}
            showFavicon={true}
            index={index}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
