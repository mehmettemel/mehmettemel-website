'use client'

import { useState } from 'react'
import { RabbitHoleCard } from './RabbitHoleCard'
import { CategoryTree } from './CategoryTree'

const CATEGORY_NAMES = {
  all: 'Tümü',
  gidalar: 'Gıdalar',
  besinler: 'Besinler',
  mekanizmalar: 'Mekanizmalar',
}

export function DecodedList({ posts }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === activeCategory)

  return (
    <div className="flex items-start gap-8">
      {/* Sidebar - Tree View (Sticky Left) */}
      <aside className="w-64 flex-shrink-0 sticky top-20 self-start hidden lg:block -ml-6 sm:-ml-8">
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Kategoriler
          </h2>
          <CategoryTree
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            posts={posts}
          />
        </div>
      </aside>

      {/* Main Content (Centered with flex-1) */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-[620px]">
        {/* Mobile Category Filter */}
        <div className="lg:hidden mb-6">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-2 text-sm"
          >
            <option value="all">📚 Tümü ({posts.length})</option>
            <option value="gidalar">
              🍎 Gıdalar ({posts.filter((p) => p.category === 'gidalar').length}
              )
            </option>
            <option value="besinler">
              💊 Besinler (
              {posts.filter((p) => p.category === 'besinler').length})
            </option>
            <option value="mekanizmalar">
              🧬 Mekanizmalar (
              {posts.filter((p) => p.category === 'mekanizmalar').length})
            </option>
          </select>
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-base text-muted-foreground">
              {activeCategory === 'all'
                ? 'Henüz yazı yok. Yakında ilk araştırmalar yayınlanacak!'
                : `${CATEGORY_NAMES[activeCategory]} kategorisinde henüz yazı yok.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post, index) => (
              <RabbitHoleCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
