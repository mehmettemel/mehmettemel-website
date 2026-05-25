import { getAllNotes, noteCategories } from '@/data/notes'
import { getDbQuotes } from '@/lib/db'
import RastgeleClient from './client'

function formatDbNote(n) {
  return { id: n.id, text: n.text, author: n.author || undefined, source: n.source || undefined, category: n.category }
}

export default async function RastgelePage() {
  const staticNotes = getAllNotes()
  const dbNotes = (await getDbQuotes('all')).map(formatDbNote)
  const allNotes = [...dbNotes, ...staticNotes]

  return <RastgeleClient allNotes={allNotes} noteCategories={noteCategories} />
}
