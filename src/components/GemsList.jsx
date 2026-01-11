'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
function GemCard({ gem, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
      <Link href={gem.url} target="_blank" rel="noopener noreferrer" className="group block rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-secondary/20">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 text-xs font-semibold flex-shrink-0">{gem.type}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition line-clamp-2">{gem.title}</h3>
              <svg className="w-5 h-5 text-muted-foreground opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{gem.description}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-primary/10 text-primary">{gem.type}</span>
              {gem.author && <span className="text-xs text-muted-foreground">{gem.author}</span>}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
export function GemsList({ gems }) {
  const [activeType, setActiveType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const types = [
    { id: 'all', label: 'Tumu', count: gems.length },
    { id: 'article', label: 'Makaleler', count: gems.filter((g) => g.type === 'article').length },
    { id: 'book', label: 'Kitaplar', count: gems.filter((g) => g.type === 'book').length },
    { id: 'video', label: 'Videolar', count: gems.filter((g) => g.type === 'video').length },
  ]
  const filteredGems = gems.filter((gem) => {
    const matchesType = activeType === 'all' || gem.type === activeType
    const matchesSearch = searchQuery === '' || gem.title.toLowerCase().includes(searchQuery.toLowerCase()) || gem.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-6">
        <input type="text" placeholder="Ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-8">
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button key={type.id} onClick={() => setActiveType(type.id)} className={'px-4 py-2 text-sm font-medium rounded-lg transition-all ' + (activeType === type.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary/80')}>{type.label} ({type.count})</button>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        {filteredGems.length === 0 ? (
          <div className="py-12 text-center"><p className="text-base text-muted-foreground">{searchQuery ? 'Kaynak bulunamadi.' : 'Henuz kaynak yok.'}</p></div>
        ) : (
          <div className="space-y-3">{filteredGems.map((gem, index) => (<GemCard key={gem.id} gem={gem} index={index} />))}</div>
        )}
      </motion.div>
    </>
  )
}
