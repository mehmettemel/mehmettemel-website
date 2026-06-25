'use client'

import { useState, useEffect, useRef } from 'react'
import { StickyNote, X, Trash2, Plus } from 'lucide-react'

export function QuickNotes() {
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const textareaRef = useRef(null)
  const widgetRef = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('quick-notes')
      if (saved) setNotes(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [open])

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  function save(updated) {
    setNotes(updated)
    localStorage.setItem('quick-notes', JSON.stringify(updated))
  }

  function addNote() {
    const text = input.trim()
    if (!text) return
    save([{ id: Date.now(), text, ts: new Date().toLocaleDateString('tr-TR') }, ...notes])
    setInput('')
    textareaRef.current?.focus()
  }

  function deleteNote(id) {
    save(notes.filter((n) => n.id !== id))
  }

  function clearAll() {
    save([])
  }

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50">
      {/* Panel */}
      <div
        className={`absolute bottom-14 right-0 w-80 rounded-2xl border border-border bg-card shadow-2xl transition-all duration-200 ${
          open ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-2 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-semibold text-foreground">Anlık Notlar</span>
          <div className="flex items-center gap-2">
            {notes.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
                Temizle
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="p-3">
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote()
              }}
              placeholder="Not ekle... (⌘Enter)"
              rows={2}
              className="flex-1 resize-none rounded-xl border border-border bg-secondary/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={addNote}
              disabled={!input.trim()}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center self-end rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-30"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Notes list */}
        {notes.length > 0 ? (
          <div className="max-h-64 overflow-y-auto px-3 pb-3">
            <div className="space-y-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="group flex items-start gap-2 rounded-xl border border-border bg-secondary/30 px-3 py-2"
                >
                  <p className="flex-1 text-xs leading-relaxed text-foreground/90">{note.text}</p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="mt-0.5 flex-shrink-0 rounded p-0.5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="px-4 pb-4 text-center text-xs text-muted-foreground">
            Henüz not yok.
          </p>
        )}
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 ${
          open
            ? 'bg-primary text-primary-foreground'
            : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
        }`}
      >
        <StickyNote className="h-5 w-5" />
        {notes.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            {notes.length > 9 ? '9+' : notes.length}
          </span>
        )}
      </button>
    </div>
  )
}
