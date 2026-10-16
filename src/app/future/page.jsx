import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import { Container } from '@/components/Container'
import { PersonalContent } from '@/components/personal/PersonalContent'
import { graphTitle, nodes, links } from '@/data/future-notes'

export const metadata = {
  title: 'Future | Mehmet Temel',
  description: 'Gelecek, iş, pazarlama ve kariyer notlarım.',
  robots: { index: false, follow: false },
}

// Kategori sırası: fırsat önde, sonra not sayısına göre. Etiket yazımı
// (ai gibi kısaltmalar) için özel adlar; geri kalanı baş harfi büyütülür.
const LABELS = { ai: 'AI' }
const FIRST = 'fırsat'
const labelOf = (tag) =>
  LABELS[tag] ?? tag.charAt(0).toLocaleUpperCase('tr') + tag.slice(1)

// Veri grafik biçiminde (nodes + links) tutulur; sayfa notları etikete göre
// kartlara böler, bağları modalda "Bağlantılı" olarak gösterir.
function buildCategories() {
  const byId = new Map(nodes.map((n) => [n.id, n]))
  const related = new Map(nodes.map((n) => [n.id, []]))
  for (const l of links) {
    if (!byId.has(l.source) || !byId.has(l.target)) continue
    related.get(l.source).push(l.target)
    related.get(l.target).push(l.source)
  }
  const groups = new Map()
  for (const n of nodes) {
    const tag = n.tags?.[0] ?? 'diğer'
    if (!groups.has(tag)) groups.set(tag, [])
    groups.get(tag).push({
      id: n.id,
      title: n.title,
      text: n.body,
      subItems: [],
      related: related.get(n.id).map((id) => ({ id, title: byId.get(id).title })),
    })
  }
  const order = [...groups.keys()].sort((a, b) =>
    a === FIRST ? -1 : b === FIRST ? 1 : groups.get(b).length - groups.get(a).length,
  )
  return Object.fromEntries(
    order.map((tag) => [tag, { label: labelOf(tag), items: groups.get(tag) }]),
  )
}

export default async function FuturePage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  if (!sessionCookie) redirect('/?login=required')
  const payload = await verifyToken(sessionCookie.value)
  if (!payload) redirect('/?login=expired')

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <PersonalContent
          categories={buildCategories()}
          title={graphTitle}
          defaultView="all"
          searchable
        />
      </div>
    </Container>
  )
}
