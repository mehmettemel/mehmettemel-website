import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { resources } from '@/data/resources'
import { ExternalLink } from 'lucide-react'

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

        {resources.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">No resources yet.</p>
        )}

        <div className="space-y-10">
          {resources.map((group) => (
            <section key={group.category}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group.emoji} {group.category}
              </h2>
              <ul className="space-y-1">
                {group.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary/50"
                    >
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                      <span className="flex-1">
                        <span className="font-medium text-foreground">{item.title}</span>
                        {item.note && (
                          <span className="ml-2 text-xs text-muted-foreground">{item.note}</span>
                        )}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Container>
  )
}
