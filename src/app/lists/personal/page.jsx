import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PersonalTabs } from '@/components/personal/PersonalTabs'
import { tabs, title } from '@/data/personal'

export const metadata = {
  title: 'Personal',
  description: 'Kişisel notlarım ve koleksiyonlarım',
}

export default async function PersonalPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <PersonalTabs tabs={tabs} title={title} />
      </div>
    </Container>
  )
}
