'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Plus, Trash2, X, AlertCircle } from 'lucide-react'

const STORAGE_KEY = 'tansiyon-olcumler'
const OLCUM_ZAMANI = ['Sabah', 'Akşam', 'Atak Anı']

function getBPCategory(sis, dia) {
  if (sis > 180 || dia > 120)
    return { label: 'Kriz', cls: 'bg-red-600 text-white' }
  if (sis >= 140 || dia >= 90)
    return { label: 'Evre 2', cls: 'bg-red-500 text-white' }
  if (sis >= 130 || dia >= 80)
    return { label: 'Evre 1', cls: 'bg-orange-500 text-white' }
  if (sis >= 120 && dia < 80)
    return { label: 'Yüksek Normal', cls: 'bg-yellow-500 text-black' }
  return { label: 'Normal', cls: 'bg-green-500 text-white' }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function OlcumModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    zaman: 'Sabah',
    sistolik: '',
    diastolik: '',
    nabiz: '',
    not: '',
  })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      id: Date.now().toString(),
      tarih: new Date().toISOString(),
      zaman: form.zaman,
      sistolik: parseInt(form.sistolik),
      diastolik: parseInt(form.diastolik),
      nabiz: form.nabiz ? parseInt(form.nabiz) : null,
      not: form.not,
    })
    onClose()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl border border-border bg-background shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Ölçüm Ekle</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Ölçüm Zamanı
            </label>
            <div className="flex gap-2">
              {OLCUM_ZAMANI.map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => set('zaman', z)}
                  className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                    form.zaman === z
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { key: 'sistolik', label: 'Sistolik', placeholder: '120', required: true },
              { key: 'diastolik', label: 'Diastolik', placeholder: '80', required: true },
              { key: 'nabiz', label: 'Nabız', placeholder: '72', required: false },
            ].map(({ key, label, placeholder, required }) => (
              <div key={key}>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  {label}
                </label>
                <input
                  type="number"
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={placeholder}
                  required={required}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Not (opsiyonel)
            </label>
            <input
              type="text"
              value={form.not}
              onChange={(e) => set('not', e.target.value)}
              placeholder="İlaç aldım, egzersiz sonrası..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Kaydet
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}

function FloatingNote() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground shadow-lg transition-colors hover:text-foreground"
        >
          <AlertCircle className="h-3.5 w-3.5" />
          Ne zaman ölç?
        </button>
      ) : (
        <div className="w-72 rounded-xl border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">Ne zaman ölç?</span>
            <button
              onClick={() => setCollapsed(true)}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <ul className="space-y-2.5 text-xs text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">Sabah: </span>
              Yataktan kalkınca, tuvalet sonrası, aç karnına, ilaç/çay/kahve öncesi.
            </li>
            <li>
              <span className="font-semibold text-foreground">Akşam: </span>
              Akşam yemeğinden hemen önce (açken) VEYA yemekten en az 2 saat sonra.
            </li>
            <li>
              <span className="font-semibold text-foreground">Atak Anı: </span>
              Sersemlik, kulakta basınç veya antrenman sonrası baş ağrısı başladığı anda.
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export function TansiyonContent() {
  const [olcumler, setOlcumler] = useState([])
  const [modalAcik, setModalAcik] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setOlcumler(JSON.parse(stored))
    } catch {}
  }, [])

  const kaydet = (olcum) => {
    const yeni = [olcum, ...olcumler]
    setOlcumler(yeni)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(yeni))
  }

  const sil = (id) => {
    const yeni = olcumler.filter((o) => o.id !== id)
    setOlcumler(yeni)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(yeni))
  }

  if (!mounted) return null

  return (
    <>
      <div className="mx-auto max-w-4xl pb-24">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Tansiyon Takip
          </h1>
          <button
            onClick={() => setModalAcik(true)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" />
            Ölçüm Ekle
          </button>
        </div>

        {olcumler.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-muted-foreground">
              Henüz ölçüm yok. İlk ölçümünü ekle.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  {['Tarih', 'Saat', 'Zaman', 'Sis / Dia', 'Nabız', 'Kategori', 'Not', ''].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-medium text-muted-foreground first:pl-5 last:pr-5"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {olcumler.map((o, i) => {
                  const cat = getBPCategory(o.sistolik, o.diastolik)
                  return (
                    <tr
                      key={o.id}
                      className={`border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/10 ${
                        i % 2 !== 0 ? 'bg-secondary/5' : ''
                      }`}
                    >
                      <td className="px-4 py-3 pl-5 text-foreground">{formatDate(o.tarih)}</td>
                      <td className="px-4 py-3 tabular-nums text-muted-foreground">
                        {formatTime(o.tarih)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            o.zaman === 'Sabah'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                              : o.zaman === 'Akşam'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                          }`}
                        >
                          {o.zaman}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-foreground">
                        {o.sistolik} / {o.diastolik}
                      </td>
                      <td className="px-4 py-3 tabular-nums text-muted-foreground">
                        {o.nabiz ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.cls}`}
                        >
                          {cat.label}
                        </span>
                      </td>
                      <td className="max-w-[140px] truncate px-4 py-3 text-xs text-muted-foreground">
                        {o.not || '—'}
                      </td>
                      <td className="pr-5">
                        <button
                          onClick={() => sil(o.id)}
                          className="text-muted-foreground/30 transition-colors hover:text-red-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalAcik && <OlcumModal onClose={() => setModalAcik(false)} onSave={kaydet} />}
      <FloatingNote />
    </>
  )
}
