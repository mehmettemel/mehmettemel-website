'use client'

import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'

// Group categories into main and sub categories
const categoryGroups = {
  'Temel Sağlık': ['Temel Sağlık Prensipleri', 'Fiziksel Aktivite ve Egzersiz'],
  'Beslenme ve Mutfak': [
    'Beslenme',
    'Pişirme ve Mutfak Teknikleri',
    'Gıda Güvenliği ve Restoranlar',
  ],
  'Gıdalar': [
    'Sebzeler',
    'Meyveler',
    'Et ve Hayvansal Ürünler',
    'Yağlar',
    'Ekmek',
    'Diğer Faydalı Gıdalar',
  ],
  'Cilt ve Saç Bakımı': ['Cilt Bakımı', 'Güneş Kremi', 'Saç Bakımı', 'Egzema'],
  'İç Sağlık': [
    'İç Sağlık ve Hastalıklar',
    'Vitaminler ve Mineraller',
    'Ağız, Diş ve Boğaz Sağlığı',
  ],
  'Sağlık Sistemi': ['Hastane ve Sağlık Sistemi'],
}

export function SaglikContent({ categories, title = 'Sağlık' }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [expandedMainCategories, setExpandedMainCategories] = useState([
    'Temel Sağlık',
  ])
  const [isAnimating, setIsAnimating] = useState(false)

  // Set initial category on mount
  useEffect(() => {
    const categoryKeys = Object.keys(categories)
    if (categoryKeys.length > 0) {
      setSelectedCategory(categoryKeys[0])
    }
  }, [])

  const handleCategoryClick = (categoryKey) => {
    setIsAnimating(true)

    setTimeout(() => {
      setSelectedCategory(categoryKey)
      setIsAnimating(false)
    }, 300)
  }

  const toggleMainCategory = (mainCategory) => {
    setExpandedMainCategories((prev) =>
      prev.includes(mainCategory)
        ? prev.filter((cat) => cat !== mainCategory)
        : [...prev, mainCategory],
    )
  }

  const selectedCategoryData = selectedCategory
    ? categories[selectedCategory]
    : null

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground">
          Sol taraftan bir kategori seçin
        </p>
      </div>

      <div className="flex gap-8">
        {/* Left Sidebar - Category List (Sticky) */}
        <aside className="w-56 shrink-0">
          <div className="sticky top-8 space-y-4">
            <h2 className="mb-3 text-xs font-semibold text-muted-foreground">
              Kategoriler
            </h2>

            {Object.entries(categoryGroups).map(
              ([mainCategory, subCategories]) => (
                <div key={mainCategory} className="space-y-1">
                  {/* Main Category Header */}
                  <button
                    onClick={() => toggleMainCategory(mainCategory)}
                    className="flex w-full items-center justify-between text-left text-xs font-semibold text-foreground transition-opacity hover:opacity-60"
                  >
                    <span>{mainCategory}</span>
                    <ChevronRight
                      className={`h-3 w-3 transition-transform ${
                        expandedMainCategories.includes(mainCategory)
                          ? 'rotate-90'
                          : ''
                      }`}
                    />
                  </button>

                  {/* Sub Categories */}
                  {expandedMainCategories.includes(mainCategory) && (
                    <div className="ml-3 space-y-1 border-l border-border pl-3">
                      {subCategories.map((subCategory) => {
                        // Find the category key in categories object
                        const categoryKey = Object.keys(categories).find(
                          (key) => categories[key].label === subCategory,
                        )

                        if (!categoryKey) return null

                        return (
                          <button
                            key={categoryKey}
                            onClick={() => handleCategoryClick(categoryKey)}
                            className={`block w-full text-left text-xs font-normal transition-all hover:opacity-60 ${
                              selectedCategory === categoryKey
                                ? 'font-medium text-primary'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {subCategory}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </aside>

        {/* Right Content - All Notes from Selected Category */}
        <div className="flex-1">
          {selectedCategoryData ? (
            <div
              className={`transition-opacity duration-300 ${
                isAnimating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="w-full space-y-0">
                {selectedCategoryData.items.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-border py-4 last:border-0"
                  >
                    {typeof item === 'string' ? (
                      <p className="text-xs leading-relaxed font-normal text-foreground">
                        {item}
                      </p>
                    ) : (
                      <div>
                        <p className="text-xs leading-relaxed font-medium text-foreground mb-2">
                          {item.text}
                        </p>
                        {item.subItems && item.subItems.length > 0 && (
                          <ul className="ml-4 space-y-1">
                            {item.subItems.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className="text-xs leading-relaxed font-normal text-muted-foreground"
                              >
                                • {subItem}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-xs text-muted-foreground">
                Bir kategori seçin
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
