import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PersonalContent } from '@/components/personal/PersonalContent'
import { categories } from '@/data/personal/iliskiler'

export const metadata = { title: 'Kadınlar | Mehmet Temel' }

export default async function IliskilerPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <PersonalContent categories={categories} title="Kadınlar" />
      </div>
    </Container>
  )
}
