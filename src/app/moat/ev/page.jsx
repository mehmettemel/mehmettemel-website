import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { EvContent } from '@/components/ev/EvContent'
import {
  title,
  subtitle,
  targetDate,
  phases,
  buyGroups,
  viewGroups,
  askGroups,
  rentGroups,
  resources,
  notes,
} from '@/data/ev-plan'

// Gizli sayfa: navigasyonda yok, giriş gerektirir, arama motorlarına kapalı.
export const metadata = {
  title: 'Ev Planı | Mehmet Temel',
  robots: { index: false, follow: false },
}

export default async function EvPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-6xl py-8 sm:py-12">
        <EvContent
          data={{
            title,
            subtitle,
            targetDate,
            phases,
            buyGroups,
            viewGroups,
            askGroups,
            rentGroups,
            resources,
            notes,
          }}
        />
      </div>
    </Container>
  )
}
