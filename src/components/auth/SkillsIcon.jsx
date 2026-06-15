'use client'

import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const skills = [
  { cmd: '/not', desc: 'Not / alıntı ekle' },
  { cmd: '/e', desc: 'Entrepreneur notu' },
  { cmd: '/en', desc: 'İngilizce kelime' },
  { cmd: '/w2b', desc: "W2B'ye ekle" },
  { cmd: '/life-tips', desc: 'Life Tips ipucu' },
  { cmd: '/video', desc: 'Video analizi' },
]

export function SkillsIcon({ className }) {
  return (
    <TooltipProvider delayDuration={80}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              'inline-flex h-9 items-center justify-center rounded-md px-3 py-1.5 transition-colors',
              'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
              className,
            )}
            aria-label="Skills"
          >
            <Zap className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="end"
          className="p-0 shadow-lg"
          sideOffset={6}
        >
          <div className="min-w-[200px] py-2">
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Skills
            </p>
            {skills.map((s) => (
              <div
                key={s.cmd}
                className="flex items-center gap-3 px-3 py-1.5"
              >
                <code className="w-20 shrink-0 text-xs font-mono text-primary">
                  {s.cmd}
                </code>
                <span className="text-xs text-muted-foreground">{s.desc}</span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
