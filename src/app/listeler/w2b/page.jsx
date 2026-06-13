import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { W2BContent } from '@/components/w2b/W2BContent'
import { categories, title, subtitle } from '@/data/w2b'

export const metadata = { title: 'W2B | Mehmet Temel' }

export default async function W2BPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <W2BContent categories={categories} title={title} subtitle={subtitle} />
      </div>
    </Container>
  )
}
