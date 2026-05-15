import { Container } from '@/components/Container'
import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { KendimeNotlarContent } from '@/components/personal/KendimeNotlarContent'

export const metadata = {
  title: 'Artificial Intelligence | Mehmet Temel',
  description: 'Yapay zeka ile ilgili notlar, araçlar ve stratejiler.',
}

function parsePersonalNotes(content) {
  const sections = content.split(/^## /m).filter(Boolean)
  const categories = {}

  sections.forEach(section => {
    const lines = section.trim().split('\n')
    const categoryName = lines[0].trim()
    const items = lines.slice(1)
      .map(line => line.trim())
      .filter(line => line && line.startsWith('-'))
      .map(line => line.replace(/^-\s*/, ''))

    if (items.length > 0) {
      categories[categoryName] = {
        label: categoryName,
        items: items
      }
    }
  })

  return categories
}

export default function AIPage() {
  const filePath = join(process.cwd(), 'data', 'personal', 'ai.md')
  const fileContent = readFileSync(filePath, 'utf-8')
  const { content } = matter(fileContent)
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
          <KendimeNotlarContent categories={categories} title="Artificial Intelligence" />
        )}
      </div>
    </Container>
  )
}
