import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import { Container } from '@/components/Container'
import { meTitle, paragraphs, closing } from '@/data/me'

export const metadata = {
  title: 'Me | Mehmet Temel',
  description: 'Beni tanımlayan not.',
  robots: { index: false, follow: false },
}

export default async function MePage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-2xl py-8 sm:py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {meTitle}
          </h1>
        </div>

        <div className="space-y-6 border-t border-border pt-8">
          {paragraphs.map((text, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground/90">
              {text}
            </p>
          ))}
        </div>

        <p className="mt-10 border-t border-border pt-6 text-base font-medium italic text-foreground">
          {closing}
        </p>
      </div>
    </Container>
  )
}
