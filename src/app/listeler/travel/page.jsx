import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata = { title: 'Travel | Mehmet Temel' }

const travelPages = [
  {
    href: '/listeler/travel/informations',
    label: 'Informations',
    emoji: '📖',
    description: 'Travel tips, tricks and useful information',
  },
  {
    href: '/listeler/travel/countries',
    label: 'Countries',
    emoji: '🌍',
    description: 'Country notes, tips and must-see places',
  },
]

export default async function TravelPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <h1 className="mb-8 text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          ✈️ Travel
        </h1>

        <div className="mx-auto grid max-w-2xl gap-3">
          {travelPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 transition-colors hover:bg-secondary/50"
            >
              <span className="text-2xl">{page.emoji}</span>
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {page.label}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {page.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
}
