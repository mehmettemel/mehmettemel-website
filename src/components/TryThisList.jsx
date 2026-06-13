'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { ConfirmModal } from '@/components/ConfirmModal'

export function TryThisList({ items: initial, editable = false }) {
  const [items, setItems] = useState(initial)
  const [pending, setPending] = useState(null)

  const confirmDelete = async () => {
    const target = pending
    setPending(null)
    const prev = items
    setItems((list) => list.filter((it) => it.id !== target.id))
    try {
      const res = await fetch('/api/try-this/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: target.id }),
      })
      if (!res.ok) throw new Error()
    } catch {
      setItems(prev)
      window.alert('Silme başarısız oldu.')
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-2xl">
      <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Try This
      </h2>

      {items.length === 0 ? (
        <p className="py-6 text-center text-xs text-muted-foreground">Henüz bir şey yok</p>
      ) : (
        <div className="rounded-xl border border-border/50 bg-card">
          {items.map((it) => (
            <div
              key={it.id}
              className="group flex items-center gap-2 border-b border-border/30 px-4 py-3 last:border-0"
            >
              <span className="flex-1 text-sm leading-relaxed text-foreground">{it.text}</span>
              {editable && (
                <button
                  onClick={() => setPending(it)}
                  aria-label="Sil"
                  className="shrink-0 rounded p-1 text-muted-foreground/50 transition-colors hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!pending}
        title="Are you sure?"
        message={pending ? `"${pending.text}" silinecek.` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setPending(null)}
      />
    </div>
  )
}
