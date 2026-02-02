import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata = {
  title: 'Personal',
  description: 'Kişisel sayfalarım',
}

const personalCategories = [
  {
    title: 'Kendime Notlar',
    href: '/listeler/personal/kendime-notlar',
  },
  {
    title: 'Conversation Skills',
    href: '/listeler/personal/conversation-skills',
  },
]

export default async function PersonalPage() {
  // Check authentication
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')

  if (!sessionCookie) {
    redirect('/?login=required')
  }

  const payload = await verifyToken(sessionCookie.value)
  if (!payload) {
    redirect('/?login=expired')
  }

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-xl font-bold tracking-tight text-foreground">
            Personal
          </h1>
        </div>

        <div className="mx-auto w-full max-w-md space-y-3">
          {personalCategories.map((category) => (
            <div key={category.href} className="w-full text-center">
              <Link
                href={category.href}
                className="block w-full text-xs font-normal text-foreground transition-opacity hover:opacity-60"
              >
                {category.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
