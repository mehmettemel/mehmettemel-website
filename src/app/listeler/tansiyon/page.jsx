import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { TansiyonContent } from '@/components/tansiyon/TansiyonContent'

export const metadata = { title: 'Tansiyon Takip | Mehmet Temel' }

export default async function TansiyonPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <TansiyonContent />
      </div>
    </Container>
  )
}
