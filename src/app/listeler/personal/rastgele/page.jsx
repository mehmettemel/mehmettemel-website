'use client'

import { Container } from '@/components/Container'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function formatItemDisplay(item) {
  if (!item) return null

  switch (item.type) {
    case 'inceleme_note':
      const categoryNames = {
        gidalar: 'Gıdalar',
        besinler: 'Besinler',
        mekanizmalar: 'Mekanizmalar',
        kitaplar: 'Kitaplar',
        kisiler: 'Kişiler'
      }
      return {
        title: item.noteTitle,
        subtitle: `${item.bookTitle} (${categoryNames[item.category] || item.category})`,
        content: item.noteContent,
        meta: item.author,
        link: `/incelemeler/${item.slug}`
      }

    case 'personal_note':
      // Select random item from the items array
      const randomItem = item.items[Math.floor(Math.random() * item.items.length)]
      return {
        title: item.category,
        subtitle: item.source === 'kendime-notlar' ? 'Kendime Notlar' : 'Conversation Skills',
        content: randomItem
      }

    default:
      return null
  }
}

export default function RastgelePage() {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  const fetchRandomItem = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/listeler/random')

      if (response.status === 401) {
        router.push('/?login=required')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch random item')
      }

      const data = await response.json()
      setItem(data.item)
    } catch (err) {
      console.error('Error fetching random item:', err)
      setError('Rastgele öğe yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomItem()
  }, [])

  const displayData = item ? formatItemDisplay(item) : null

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-xl font-bold tracking-tight text-foreground">
            Rastgele
          </h1>
          <p className="text-xs text-muted-foreground">
            Tüm listelerden ve incelemelerden rastgele bir öğe
          </p>
        </div>

        {/* Content */}
        <div className="mx-auto w-full max-w-2xl">
          {error && (
            <div className="py-12 text-center">
              <p className="text-xs text-red-500">{error}</p>
            </div>
          )}

          {!error && (loading || displayData) && (
            <div className="space-y-6">
              {/* Item Card */}
              <div className="rounded-lg border border-border bg-card p-6 min-h-[200px]">
                {loading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                ) : displayData ? (
                  <>
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-1 text-xs text-muted-foreground">
                          {displayData.subtitle}
                        </div>
                        {displayData.link ? (
                          <Link
                            href={displayData.link}
                            className="text-base font-semibold text-foreground hover:opacity-70"
                          >
                            {displayData.title}
                          </Link>
                        ) : (
                          <h2 className="text-base font-semibold text-foreground">
                            {displayData.title}
                          </h2>
                        )}
                      </div>

                      {displayData.badges && displayData.badges.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {displayData.badges.map((badge, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {displayData.meta && (
                      <div className="mb-3 text-xs text-muted-foreground">
                        {displayData.meta}
                      </div>
                    )}

                    {displayData.content && (
                      <div className="text-sm text-muted-foreground">
                        {displayData.content}
                      </div>
                    )}
                  </>
                ) : null}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={fetchRandomItem}
                  disabled={loading}
                  className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  Yeni Rastgele
                </button>

                <Link
                  href="/listeler/personal"
                  className="rounded-md border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-opacity hover:opacity-70"
                >
                  Geri Dön
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
