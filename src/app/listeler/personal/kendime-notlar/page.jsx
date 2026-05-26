import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { KendimeNotlarContent } from '@/components/personal/KendimeNotlarContent'
import { categories } from '@/data/personal/kendime-notlar'

export const metadata = {
  title: 'Kendime Notlar',
  description: 'Kişisel notlarım ve hatırlatmalarım',
}

export default async function KendimeNotlarPage() {
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
        {Object.keys(categories).length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-xs text-muted-foreground">
              Henüz not eklenmedi
            </p>
          </div>
        ) : (
          <KendimeNotlarContent categories={categories} />
        )}
      </div>
    </Container>
  )
}
