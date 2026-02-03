import Link from 'next/link'
import { Container } from '@/components/Container'

export const revalidate = 60

export const metadata = {
  title: 'Keşifler | Mehmet Temel',
  description: 'İnternette bulduğum faydalı kaynaklar ve alıntılar.',
}

const discoveryTypes = [
  {
    title: 'Linkler',
    href: '/kesifler/linkler',
  },
  {
    title: 'Alıntılar',
    href: '/kesifler/alintilar',
  },
]

export default async function Kesifler() {
  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-xl font-bold tracking-tight text-foreground">
            Keşifler
          </h1>
        </div>

        <div className="mx-auto w-full max-w-md space-y-3">
          {discoveryTypes.map((item) => (
            <div key={item.href} className="w-full text-center">
              <Link
                href={item.href}
                className="block w-full text-xs font-normal text-foreground transition-opacity hover:opacity-60"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
