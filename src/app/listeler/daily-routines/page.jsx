import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DailyRoutinesContent } from '@/components/DailyRoutinesContent'
import { TryThisList } from '@/components/TryThisList'
import { routineList, title } from '@/data/daily-routines'
import tryThis from '@/data/try-this.json'

export const metadata = { title: 'Daily Routines | Mehmet Temel' }

export default async function DailyRoutinesPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <DailyRoutinesContent routineList={routineList} title={title} />
        <TryThisList
          items={tryThis.items}
          editable={process.env.NODE_ENV !== 'production'}
        />
      </div>
    </Container>
  )
}
