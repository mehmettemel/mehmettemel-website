import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { KendimeNotlarContent } from '@/components/personal/KendimeNotlarContent'
import { categories } from '@/data/personal/iliskiler'

export const metadata = {
  title: 'İlişkiler | Mehmet Temel',
  description: 'Kadınlar, iletişim ve networking üzerine notlar',
}

export default async function IliskilerPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <KendimeNotlarContent categories={categories} title="İlişkiler" />
      </div>
    </Container>
  )
}
