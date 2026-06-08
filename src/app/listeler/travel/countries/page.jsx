import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { TravelCountriesContent } from '@/components/travel/TravelCountriesContent'
import { tabs, title } from '@/data/travel/countries'

export const metadata = { title: 'Countries | Mehmet Temel' }

export default async function TravelCountriesPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <TravelCountriesContent tabs={tabs} title={title} />
      </div>
    </Container>
  )
}
