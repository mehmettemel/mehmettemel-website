import { getCitiesWithRecentPlaces } from '@/lib/db'
import { Container } from '@/components/Container'
import { MekanlarContent } from '@/components/kesifler/MekanlarContent'

export const revalidate = 60

export const metadata = {
  title: 'Mekanlar - Keşifler | Mehmet Temel',
  description: 'Keşfettiğim mekanlar, restoranlar, kafeler ve müzeler.',
}

export default async function MekanlarPage() {
  const allCities = await getCitiesWithRecentPlaces(null, 100).catch(() => [])

  // Group cities by country
  const cityGroups = allCities.reduce((acc, city) => {
    if (!acc[city.country]) {
      acc[city.country] = []
    }
    acc[city.country].push(city)
    return acc
  }, {})

  // Separate Turkey from rest
  const turkeyData = cityGroups['Türkiye'] || []
  delete cityGroups['Türkiye']
  const worldData = cityGroups

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-xl font-bold tracking-tight text-foreground">
            Mekanlar
          </h1>
        </div>

        {allCities.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-base text-muted-foreground">
              Henüz mekan eklenmedi.
            </p>
          </div>
        ) : (
          <MekanlarContent turkeyData={turkeyData} worldData={worldData} />
        )}
      </div>
    </Container>
  )
}
