import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { resources } from '@/data/resources'
import { ResourcesClient } from '@/components/resources/ResourcesClient'

export const metadata = { title: 'Resources | Mehmet Temel' }

export default async function ResourcesPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-3xl py-8 sm:py-12">
        <h1 className="mb-10 text-center text-xl font-bold tracking-tight text-foreground">
          Resources
        </h1>
        <ResourcesClient resources={resources} />
      </div>
    </Container>
  )
}
