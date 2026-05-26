'use client'

import { Container } from '@/components/Container'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { categories as quotesData } from '@/data/personal/quotes'
import { categories as kisiselGelisimData } from '@/data/personal/kisisel-gelisim'
import { categories as iliskilerData } from '@/data/personal/iliskiler'
import { categories as toplumData } from '@/data/personal/toplum'
import { categories as saglikData } from '@/data/personal/saglik'
import { categories as aiData } from '@/data/personal/ai'
import { categories as triviaData } from '@/data/personal/trivia'
import { categories as moneyData } from '@/data/personal/money'

function getAllPersonalItems() {
  const items = []
  const addItems = (data, source) => {
    for (const [cat, val] of Object.entries(data)) {
      val.items.forEach((item) => {
        if (typeof item === 'string') {
          items.push({ text: item, subItems: null, source, category: cat })
        } else {
          items.push({ text: item.text, subItems: item.subItems, source, category: cat })
        }
      })
    }
  }
  addItems(saglikData, 'Sağlık')
  addItems(kisiselGelisimData, 'Kişisel Gelişim')
  addItems(iliskilerData, 'İlişkiler')
  addItems(toplumData, 'Toplum')
  addItems(quotesData, 'Quotes')
  addItems(aiData, 'AI')
  addItems(moneyData, 'Money')
  addItems(triviaData, 'Trivia')
  return items
}

export default function RastgelePage() {
  const allItems = useMemo(() => getAllPersonalItems(), [])
  const [current, setCurrent] = useState(null)

  const getRandom = () => {
    const idx = Math.floor(Math.random() * allItems.length)
    setCurrent(allItems[idx])
  }

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-xl font-bold tracking-tight text-foreground">
            Rastgele
          </h1>
          <p className="text-xs text-muted-foreground">
            Tüm personal notlardan rastgele
          </p>
        </div>

        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-lg border border-border bg-card p-6 min-h-[200px]">
            {current ? (
              <>
                <div className="mb-3 text-xs text-muted-foreground">
                  {current.source} — {current.category}
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  {current.text}
                </p>
                {current.subItems?.length > 0 && (
                  <ul className="mt-2 ml-4 space-y-1">
                    {current.subItems.map((sub, i) => (
                      <li key={i} className="text-xs leading-relaxed text-muted-foreground">• {sub}</li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <div className="flex h-40 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Butona bas, rastgele bir not gelsin
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={getRandom}
              className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-80"
            >
              Rastgele
            </button>
            <Link
              href="/listeler/personal"
              className="rounded-md border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-opacity hover:opacity-70"
            >
              Geri Dön
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
