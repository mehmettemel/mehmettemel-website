'use client'

import { BentoCard } from './BentoCard'

export function BentoGrid({ gems }) {
  return (
    <div className="grid auto-rows-[240px] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {gems.map((gem, index) => (
        <BentoCard key={gem.id || index} gem={gem} index={index} />
      ))}
    </div>
  )
}
