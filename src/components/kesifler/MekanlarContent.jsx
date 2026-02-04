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

  useEffect(() => {
    if (selectedCity) {
      loadPlaces(selectedCity.city, selectedCity.country)
    }
  }, [selectedCity])

  const loadPlaces = async (city, country) => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/places?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`
      )
      const data = await response.json()
      setPlaces(data.places || [])
    } catch (error) {
      console.error('Failed to load places:', error)
      setPlaces([])
    } finally {
      setLoading(false)
    }
  }

  const handleCityClick = (city, country) => {
    if (selectedCity?.city === city && selectedCity?.country === country) {
      // Toggle: close if same city clicked
      setSelectedCity(null)
      setPlaces([])
    } else {
      setSelectedCity({ city, country })
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8">
      {/* Turkey Section */}
      {turkeyData.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-center text-sm font-medium text-muted-foreground">
            Türkiye
          </h2>
          <div className="space-y-3">
            {turkeyData.map((city) => (
              <div key={`${city.country}-${city.city}`} className="w-full text-center">
                <button
                  onClick={() => handleCityClick(city.city, city.country)}
                  className={`block w-full text-xs font-normal transition-opacity hover:opacity-60 ${
                    selectedCity?.city === city.city && selectedCity?.country === city.country
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {city.city} ({city.place_count})
                </button>

                {/* Show places if this city is selected */}
                {selectedCity?.city === city.city && selectedCity?.country === city.country && (
                  <div className="mt-3 space-y-2 rounded-lg border border-border bg-card/50 p-3">
                    {loading ? (
                      <p className="text-xs text-muted-foreground">Yükleniyor...</p>
                    ) : places.length === 0 ? (
                      <p className="text-xs text-muted-foreground">Mekan bulunamadı.</p>
                    ) : (
                      <div className="space-y-2">
                        {places.map((place) => (
                          <div
                            key={place.id}
                            className="text-left text-xs"
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-sm">{categoryEmojis[place.category] || '📍'}</span>
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{place.name}</p>
                                {place.address && (
                                  <p className="text-muted-foreground">{place.address}</p>
                                )}
                                {place.notes && (
                                  <p className="mt-1 text-foreground/80">{place.notes}</p>
                                )}
                                {place.url && (
                                  <a
                                    href={place.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-block text-primary hover:underline"
                                  >
                                    Detay →
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* World Section */}
      {Object.keys(worldData).length > 0 && (
        <section className="space-y-3">
          <h2 className="text-center text-sm font-medium text-muted-foreground">
            Dünya
          </h2>
          {Object.entries(worldData).map(([country, cities]) => (
            <div key={country} className="space-y-3">
              <h3 className="text-center text-xs text-muted-foreground/80">
                {country}
              </h3>
              <div className="space-y-3">
                {cities.map((city) => (
                  <div key={`${city.country}-${city.city}`} className="w-full text-center">
                    <button
                      onClick={() => handleCityClick(city.city, city.country)}
                      className={`block w-full text-xs font-normal transition-opacity hover:opacity-60 ${
                        selectedCity?.city === city.city && selectedCity?.country === city.country
                          ? 'text-primary'
                          : 'text-foreground'
                      }`}
                    >
                      {city.city} ({city.place_count})
                    </button>

                    {/* Show places if this city is selected */}
                    {selectedCity?.city === city.city && selectedCity?.country === city.country && (
                      <div className="mt-3 space-y-2 rounded-lg border border-border bg-card/50 p-3">
                        {loading ? (
                          <p className="text-xs text-muted-foreground">Yükleniyor...</p>
                        ) : places.length === 0 ? (
                          <p className="text-xs text-muted-foreground">Mekan bulunamadı.</p>
                        ) : (
                          <div className="space-y-2">
                            {places.map((place) => (
                              <div
                                key={place.id}
                                className="text-left text-xs"
                              >
                                <div className="flex items-start gap-2">
                                  <span className="text-sm">{categoryEmojis[place.category] || '📍'}</span>
                                  <div className="flex-1">
                                    <p className="font-medium text-foreground">{place.name}</p>
                                    {place.address && (
                                      <p className="text-muted-foreground">{place.address}</p>
                                    )}
                                    {place.notes && (
                                      <p className="mt-1 text-foreground/80">{place.notes}</p>
                                    )}
                                    {place.url && (
                                      <a
                                        href={place.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 inline-block text-primary hover:underline"
                                      >
                                        Detay →
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
