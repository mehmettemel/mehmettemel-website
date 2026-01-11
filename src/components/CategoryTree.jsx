'use client'
import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
const TREE_STRUCTURE = [
  { id: 'all', label: 'Tumu', children: null },
  { id: 'gidalar', label: 'Gidalar', children: [] },
  { id: 'besinler', label: 'Besinler', children: [] },
  { id: 'mekanizmalar', label: 'Mekanizmalar', children: [] },
]
function TreeNode({ node, activeId, onSelect, level = 0, postCounts }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const isActive = activeId === node.id
  const count = postCounts[node.id] || 0
  return (
    <div className="select-none">
      <button onClick={() => { if (hasChildren) { setIsExpanded(!isExpanded) } onSelect(node.id) }} className={'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary ' + (isActive ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground')}>
        {hasChildren && (<span className="flex-shrink-0">{isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</span>)}
        {!hasChildren && <span className="w-4" />}
        <span className="flex-shrink-0 text-base">{node.id.charAt(0).toUpperCase()}</span>
        <span className="flex-1 text-left truncate">{node.label}</span>
        <span className="flex-shrink-0 text-xs opacity-60">({count})</span>
      </button>
      {hasChildren && isExpanded && node.children.length > 0 && (
        <div className="ml-4 mt-1 space-y-1">{node.children.map((child) => (<TreeNode key={child.id} node={child} activeId={activeId} onSelect={onSelect} level={level + 1} postCounts={postCounts} />))}</div>
      )}
    </div>
  )
}
export function CategoryTree({ activeCategory, onCategoryChange, posts }) {
  const postCounts = {
    all: posts.length,
    gidalar: posts.filter((p) => p.category === 'gidalar').length,
    besinler: posts.filter((p) => p.category === 'besinler').length,
    mekanizmalar: posts.filter((p) => p.category === 'mekanizmalar').length,
  }
  return (
    <div className="space-y-1">{TREE_STRUCTURE.map((node) => (<TreeNode key={node.id} node={node} activeId={activeCategory} onSelect={onCategoryChange} postCounts={postCounts} />))}</div>
  )
}
