'use client'

import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import { Pagination } from '../Pagination'
import { bookCategories } from '../../data/kesifler'
import { CategorySidebar } from './CategorySidebar'
import { UnifiedCard } from './UnifiedCard'

const ITEMS_PER_PAGE = 12

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
}

export function BookNotesList({ notes }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const listId = useId()

  if (!notes || notes.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl">📖</div>
        <p className="text-base text-muted-foreground">
          Henüz kitap notu eklenmedi. Yakında kitap notları eklenecek!
        </p>
      </div>
    )
  }

  // Filter notes by category
  const filteredNotes =
    selectedCategory === 'all'
      ? notes
      : notes.filter((note) => note.category === selectedCategory)

  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentNotes = filteredNotes.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  // Get count for each category
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return notes.length
    return notes.filter((n) => n.category === categoryId).length
  }

  // Prepare categories with counts
  const categoriesWithCounts = bookCategories.map((cat) => ({
    ...cat,
    count: getCategoryCount(cat.id),
  }))

  return (
    <div>
      {/* Category Chips */}
      <CategorySidebar
        categories={categoriesWithCounts}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Stats */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground sm:text-sm">
          <span className="font-semibold text-foreground">
            {filteredNotes.length}
          </span>{' '}
          kitap notu
        </p>
        {totalPages > 1 && (
          <p className="text-xs text-muted-foreground">
            Sayfa {currentPage} / {totalPages}
          </p>
        )}
      </div>

      {/* Notes List */}
      {filteredNotes.length > 0 ? (
        <>
          <motion.div
            key={`${listId}-${selectedCategory}-${currentPage}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3"
          >
            {currentNotes.map((note, index) => {
              const hasQuotes =
                note.text.startsWith('"') || note.text.includes('\n')
              const displayText = hasQuotes ? note.text : `"${note.text}"`

              return (
                <UnifiedCard
                  key={note.id}
                  description={displayText}
                  author={note.author}
                  source={note.source}
                  url={note.url}
                  isExternal={false}
                  enableModal={true}
                  index={index}
                />
              )
            })}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-secondary/20 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Bu kategoride henüz kitap notu yok.
          </p>
        </div>
      )}
    </div>
  )
}
