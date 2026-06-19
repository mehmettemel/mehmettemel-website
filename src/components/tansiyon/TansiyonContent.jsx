'use client'

import { useState } from 'react'
import { X, AlertCircle } from 'lucide-react'

function getBPCategory(sis, dia) {
  if (sis > 180 || dia > 120) return { label: 'Kriz', cls: 'bg-red-600 text-white' }
  if (sis >= 140 || dia >= 90) return { label: 'Evre 2', cls: 'bg-red-500 text-white' }
  if (sis >= 130 || dia >= 80) return { label: 'Evre 1', cls: 'bg-orange-500 text-white' }
  if (sis >= 120 && dia < 80) return { label: 'Yüksek Normal', cls: 'bg-yellow-500 text-black' }
  return { label: 'Normal', cls: 'bg-green-500 text-white' }
}

function formatDate(d) {
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatTime(d) {
  return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
}

const ZAMAN_CLS = {
  Sabah: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  Akşam: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
}
const ZAMAN_CLS_DEFAULT = 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'

function FloatingNote() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="w-72 rounded-xl border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">Ne zaman ölç?</span>
            <button
              onClick={() => setIsOpen(false)}
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
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground shadow-lg transition-colors hover:text-foreground"
        >
          <AlertCircle className="h-3.5 w-3.5" />
          Ne zaman ölç?
        </button>
      )}
    </div>
  )
}

export function TansiyonContent({ olcumler }) {
  return (
    <>
      <div className="mx-auto max-w-4xl pb-24">
        <h1 className="mb-6 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Tansiyon Takip
        </h1>

        {olcumler.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-muted-foreground">Henüz ölçüm yok.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  {['Tarih', 'Saat', 'Zaman', 'Sis / Dia', 'Nabız', 'Kategori', 'Not'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground first:pl-5 last:pr-5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {olcumler.map((o, i) => {
                  const d = new Date(o.tarih)
                  const cat = getBPCategory(o.sistolik, o.diastolik)
                  return (
                    <tr
                      key={o.id}
                      className={`border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/10 ${
                        i % 2 === 0 ? '' : 'bg-secondary/5'
                      }`}
                    >
                      <td className="px-4 py-3 pl-5 text-foreground">{formatDate(d)}</td>
                      <td className="px-4 py-3 tabular-nums text-muted-foreground">
                        {formatTime(d)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${ZAMAN_CLS[o.zaman] ?? ZAMAN_CLS_DEFAULT}`}
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
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.cls}`}>
                          {cat.label}
                        </span>
                      </td>
                      <td className="max-w-[160px] truncate px-4 py-3 pr-5 text-xs text-muted-foreground">
                        {o.not || '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FloatingNote />
    </>
  )
}
