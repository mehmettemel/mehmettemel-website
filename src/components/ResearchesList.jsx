'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { RabbitHoleCard } from './RabbitHoleCard'
export function ResearchesList({ posts }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const filteredPosts = activeCategory === 'all' ? posts : posts.filter((post) => post.category === activeCategory)
  const categories = [
    { id: 'all', label: 'Tumu', count: posts.length },
    { id: 'gidalar', label: 'Gidalar', count: posts.filter((p) => p.category === 'gidalar').length },
    { id: 'besinler', label: 'Besinler', count: posts.filter((p) => p.category === 'besinler').length },
    { id: 'mekanizmalar', label: 'Mekanizmalar', count: posts.filter((p) => p.category === 'mekanizmalar').length },
  ]
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button key={category.id} onClick={() => setActiveCategory(category.id)} className={'px-4 py-2 text-sm font-medium rounded-lg transition-all ' + (activeCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-secondary/80')}>{category.label} ({category.count})</button>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center"><p className="text-base text-muted-foreground">{activeCategory === 'all' ? 'Henuz yazi yok.' : 'Bu kategoride yazi yok.'}</p></div>
        ) : (
          <div className="space-y-3">{filteredPosts.map((post, index) => (<RabbitHoleCard key={post.slug} post={post} index={index} />))}</div>
        )}
      </motion.div>
    </>
  )
}
