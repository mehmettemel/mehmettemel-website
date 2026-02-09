'use client'

import { useState, useEffect } from 'react'

const categoryEmojis = {
  restoran: '🍽️',
  kafe: '☕',
  bar: '🍺',
  muze: '🏛️',
  park: '🌳',
  tarihi: '🏰',
  doga: '🏔️',
  alisveris: '🛍️',
  konaklama: '🏨',
  diger: '📍'
}

export function MekanlarContent({ turkeyData, worldData }) {
  const [selectedCity, setSelectedCity] = useState(null)
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (selectedCity) {
      loadPlaces(selectedCity.city, selectedCity.country)
    }
  }, [selectedCity])

  const loadPlaces = async (city, country) => {
    setLoading(true)
    setIsAnimating(true)
    try {
      const response = await fetch(
        `/api/places?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`
      )
      const data = await response.json()
      setPlaces(data.places || [])
      // Trigger animation after data is loaded
      setTimeout(() => setIsAnimating(false), 50)
    } catch (error) {
      console.error('Failed to load places:', error)
      setPlaces([])
      setIsAnimating(false)
    } finally {
      setLoading(false)
    }
  }

  const handleCityClick = (city, country) => {
    setSelectedCity({ city, country })
  }

  return (
    <div className="flex gap-8">
      {/* Left Sidebar - City List (Sticky) */}
      <aside className="w-48 shrink-0">
        <div className="sticky top-8 space-y-6">
          {/* Turkey Section */}
          {turkeyData.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-medium text-muted-foreground">
                Türkiye
              </h2>
              <div className="space-y-1">
                {turkeyData.map((city) => (
                  <button
                    key={`${city.country}-${city.city}`}
                    onClick={() => handleCityClick(city.city, city.country)}
                    className={`block w-full text-left text-xs font-normal transition-opacity hover:opacity-60 ${
                      selectedCity?.city === city.city && selectedCity?.country === city.country
                        ? 'text-primary'
                        : 'text-foreground'
                    }`}
                  >
                    {city.city} ({city.place_count})
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* World Section */}
          {Object.keys(worldData).length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-medium text-muted-foreground">
                Dünya
              </h2>
              {Object.entries(worldData).map(([country, cities]) => (
                <div key={country} className="space-y-1">
                  <h3 className="text-[10px] text-muted-foreground/60">
                    {country}
                  </h3>
                  <div className="space-y-1">
                    {cities.map((city) => (
                      <button
                        key={`${city.country}-${city.city}`}
                        onClick={() => handleCityClick(city.city, city.country)}
                        className={`block w-full text-left text-xs font-normal transition-opacity hover:opacity-60 ${
                          selectedCity?.city === city.city && selectedCity?.country === city.country
                            ? 'text-primary'
                            : 'text-foreground'
                        }`}
                      >
                        {city.city} ({city.place_count})
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </aside>

      {/* Right Content - Places */}
      <div className="flex-1">
        {!selectedCity ? (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground">
              Sol taraftan bir şehir seçin
            </p>
          </div>
        ) : places.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-xs text-muted-foreground">Mekan bulunamadı.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* City Header */}
            <div className="mb-4">
              <h2 className="text-sm font-medium text-muted-foreground">
                {selectedCity.city}, {selectedCity.country}
              </h2>
            </div>

            {/* Places List */}
            <div className="space-y-3">
              {places.map((place, index) => (
                <div
                  key={place.id}
                  className="text-left transition-all duration-300"
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm">{categoryEmojis[place.category] || '📍'}</span>
                    <div className="flex-1">
                      <p className="text-xs font-normal text-foreground">
                        {place.name}
                      </p>
                      {place.address && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {place.address}
                        </p>
                      )}
                      {place.notes && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {place.notes}
                        </p>
                      )}
                      {place.url && (
                        <a
                          href={place.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 inline-block text-xs text-primary hover:underline"
                        >
                          Detay →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
