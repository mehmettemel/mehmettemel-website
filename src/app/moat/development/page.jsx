import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DevelopmentContent } from '@/components/development/DevelopmentContent'
import { notes, getAllTags, getStats, title, subtitle } from '@/data/development'

export const metadata = { title: 'Development | Mehmet Temel' }

export default async function DevelopmentPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <DevelopmentContent notes={notes} tags={getAllTags()} stats={getStats()} />
      </div>
    </Container>
  )
}
