import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { TravelInformationsContent } from '@/components/travel/TravelInformationsContent'
import { tabs, todoList, packingList, visaList, title } from '@/data/travel/informations'

export const metadata = { title: 'Travel Informations | Mehmet Temel' }

export default async function TravelInformationsPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <TravelInformationsContent tabs={tabs} todoList={todoList} packingList={packingList} visaList={visaList} title={title} />
      </div>
    </Container>
  )
}
