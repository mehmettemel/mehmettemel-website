import { Container } from '@/components/Container'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { SaglikContent } from '@/components/personal/SaglikContent'

export const metadata = {
  title: 'Sağlık',
  description: 'Sağlık notları ve öneriler',
}

function parsePersonalNotes(content) {
  // Split by H2 headers (##)
  const sections = content.split(/^## /m).filter(Boolean)

  const categories = {}

  sections.forEach(section => {
    const lines = section.trim().split('\n')
    const categoryName = lines[0].trim()
    const items = []

    let currentItem = null

    lines.slice(1).forEach(line => {
      const trimmedLine = line.trim()

      // Main item (starts with "- " at the beginning)
      if (trimmedLine.startsWith('-') && !line.startsWith(' ')) {
        if (currentItem) {
          items.push(currentItem)
        }
        currentItem = {
          text: trimmedLine.replace(/^-\s*/, ''),
          subItems: []
        }
      }
      // Sub item (starts with "  - " - has indentation)
      else if (trimmedLine.startsWith('-') && line.startsWith('  ')) {
        if (currentItem) {
          currentItem.subItems.push(trimmedLine.replace(/^-\s*/, ''))
        }
      }
    })

    // Don't forget the last item
    if (currentItem) {
      items.push(currentItem)
    }

    if (items.length > 0) {
      categories[categoryName] = {
        label: categoryName,
        items: items
      }
    }
  })

  return categories
}

export default async function SaglikPage() {
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

  // Read markdown file
  const filePath = join(process.cwd(), 'data', 'personal', 'saglik.md')
  const fileContent = readFileSync(filePath, 'utf-8')
  const { content } = matter(fileContent)

  // Parse categories
  const categories = parsePersonalNotes(content)

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
          <SaglikContent categories={categories} title="Sağlık" />
        )}
      </div>
    </Container>
  )
}
