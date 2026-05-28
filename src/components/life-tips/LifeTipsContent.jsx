'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PersonalContent } from '@/components/personal/PersonalContent'

export function LifeTipsContent({ tabs, title }) {
  const tabKeys = Object.keys(tabs)
  const [activeTab, setActiveTab] = useState(tabKeys[0])

  return (
    <div>
      <h1 className="mb-6 text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex w-full justify-start gap-1 overflow-x-auto bg-muted/50 p-1 scrollbar-none">
          {tabKeys.map((key) => (
            <TabsTrigger key={key} value={key} className="shrink-0 gap-1.5">
              <span>{tabs[key].emoji}</span>
              <span>{tabs[key].label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabKeys.map((key) => (
          <TabsContent key={key} value={key}>
            <PersonalContent
              categories={tabs[key].categories}
              title={tabs[key].label}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
