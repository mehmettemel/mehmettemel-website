import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LifeTipsContent } from '@/components/life-tips/LifeTipsContent'
import { tabs, title } from '@/data/life-tips'

export const metadata = { title: 'Life Tips | Mehmet Temel' }

export default async function LifeTipsPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <LifeTipsContent tabs={tabs} title={title} />
      </div>
    </Container>
  )
}
