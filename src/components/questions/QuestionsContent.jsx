'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Check,
  X,
} from 'lucide-react'

/* ============================================================
   Questions sayfası: masaüstünde sekme + alt-kategori pill'leri
   (DesktopQuestions), mobilde ayrı bir gezinme: kategori kartları
   → arama → tek kategori listesi (MobileQuestions). İki uç noktada
   ihtiyaç farklı: masaüstünde yatay sekmeler sorun değil, mobilde
   soru bulmak ve okumak öncelik — o yüzden ayrı bileşen.
   ============================================================ */

const lower = (s) => s.toLocaleLowerCase('tr')

function itemText(content) {
  return typeof content === 'string' ? content : content.text
}

function itemSubItems(content) {
  return typeof content === 'string' ? null : content.subItems
}

function flattenTab(tab) {
  const items = []
  Object.entries(tab.categories).forEach(([categoryKey, cat]) => {
    cat.items.forEach((content) => {
      items.push({ categoryKey, categoryLabel: cat.label, content })
    })
  })
  return items
}

function matches(content, query) {
  const subs = itemSubItems(content)
  const hay = lower(itemText(content) + ' ' + (subs ? subs.join(' ') : ''))
  return hay.includes(query)
}

/* ============================================================
   Masaüstü: sekme + alt-kategori pill'leri + düz liste (önceki UI)
   ============================================================ */

function SubCategoryPills({ categories, selected, onSelect }) {
  const scrollRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setShowLeft(el.scrollLeft > 0)
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 150, behavior: 'smooth' })
    setTimeout(updateArrows, 300)
  }

  const keys = Object.keys(categories)
  if (keys.length <= 1) return null

  return (
    <div className="relative mb-5">
      {showLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 z-10 flex h-full items-center bg-gradient-to-r from-background to-transparent pr-4"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex gap-2 overflow-x-auto scrollbar-none px-1 py-1"
      >
        <button
          onClick={() => onSelect('all')}
          className={`shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
            selected === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          Tümü
        </button>
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
              selected === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {categories[key].label}
          </button>
        ))}
      </div>
      {showRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-background to-transparent pl-4"
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}

function QuestionItem({ item, checked, onToggle }) {
  const isObject = typeof item !== 'string'
  const text = isObject ? item.text : item
  const subItems = isObject ? item.subItems : null

  return (
    <div className="border-b border-border/50 py-3.5 last:border-0">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-primary"
        />
        <span
          className={`text-sm leading-relaxed transition-colors ${
            checked
              ? 'text-muted-foreground line-through'
              : 'text-foreground'
          }`}
        >
          {text}
        </span>
      </label>
      {subItems?.length > 0 && (
        <div className="ml-7 mt-2 rounded-lg border border-border/40 bg-muted/30 px-3 py-2.5">
          {subItems.map((sub, i) => (
            <p
              key={i}
              className="text-xs leading-relaxed text-muted-foreground"
            >
              {sub}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function QuestionsList({ categories, selectedCategory }) {
  const [checkedItems, setCheckedItems] = useState({})

  const questions = []

  if (selectedCategory === 'all') {
    Object.entries(categories).forEach(([, cat]) => {
      cat.items.forEach((item) => {
        questions.push({ category: cat.label, content: item })
      })
    })
  } else {
    const cat = categories[selectedCategory]
    if (cat) {
      cat.items.forEach((item) => {
        questions.push({ category: cat.label, content: item })
      })
    }
  }

  if (questions.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted-foreground">Bu kategoride soru yok</p>
      </div>
    )
  }

  const toggleItem = (index) => {
    setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {questions.length} soru
        </span>
        <span className="text-xs text-muted-foreground">
          {Object.values(checkedItems).filter(Boolean).length} / {questions.length}
        </span>
      </div>
      {questions.map((q, index) => (
        <div key={index}>
          {selectedCategory === 'all' && (
            <span className="mb-1 inline-block rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {q.category}
            </span>
          )}
          <QuestionItem
            item={q.content}
            checked={!!checkedItems[index]}
            onToggle={() => toggleItem(index)}
          />
        </div>
      ))}
    </div>
  )
}

function TabContent({ categories }) {
  const [selected, setSelected] = useState('all')

  return (
    <div>
      <SubCategoryPills
        categories={categories}
        selected={selected}
        onSelect={setSelected}
      />
      <QuestionsList categories={categories} selectedCategory={selected} />
    </div>
  )
}

function TabBar({ tabs: allTabs, activeTab, onTabChange }) {
  const scrollRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setShowLeft(el.scrollLeft > 0)
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 120, behavior: 'smooth' })
    setTimeout(updateArrows, 300)
  }

  return (
    <div className="relative mb-6">
      {showLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 z-10 flex h-full items-center bg-gradient-to-r from-background via-background/80 to-transparent pr-3"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex gap-1 overflow-x-auto border-b border-border/40 scrollbar-none"
      >
        {allTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`relative shrink-0 px-3 pb-2.5 pt-1.5 text-xs font-medium transition-colors ${
              activeTab === tab.value
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground/70'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </span>
            {activeTab === tab.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-foreground" />
            )}
          </button>
        ))}
      </div>
      {showRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-background via-background/80 to-transparent pl-3"
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}

function DesktopQuestions({ tabs, title }) {
  const tabKeys = Object.keys(tabs)
  const [activeTab, setActiveTab] = useState(tabKeys[0])

  const allTabs = tabKeys.map((key) => ({
    value: key,
    label: tabs[key].label,
    emoji: tabs[key].emoji,
  }))

  return (
    <div>
      <h1 className="mb-6 text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h1>

      <TabBar tabs={allTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {tabKeys.map((key) =>
        activeTab === key ? (
          <TabContent key={key} categories={tabs[key].categories} />
        ) : null,
      )}
    </div>
  )
}

/* ============================================================
   Mobil: kategori kartları → arama → tek kategori listesi.
   Amaç: soru bulmak (arama, kısa kart listesi) ve okumak
   (geniş satır aralığı, tek soru = tek kart) masaüstündeki yatay
   sekme + yoğun liste düzeninden daha kolay olsun.
   ============================================================ */

function MobileSearchBar({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-3.5 py-2.5">
      <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Aramayı temizle"
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

function MobileQuestionCard({ text, subItems, categoryLabel, showCategory, checked, onToggle }) {
  const [showExample, setShowExample] = useState(false)

  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        checked ? 'border-border/40 bg-secondary/10' : 'border-border/60 bg-card'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={onToggle}
          aria-label={checked ? 'Soruldu işaretini kaldır' : 'Soruldu olarak işaretle'}
          aria-pressed={checked}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            checked
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-transparent'
          }`}
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <div className="min-w-0 flex-1">
          {showCategory && (
            <span className="mb-1.5 inline-block rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {categoryLabel}
            </span>
          )}
          <p
            className={`text-[15px] leading-relaxed transition-colors ${
              checked ? 'text-muted-foreground line-through' : 'text-foreground'
            }`}
          >
            {text}
          </p>
          {subItems?.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setShowExample((v) => !v)}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary/80"
              >
                {showExample ? 'Örneği gizle' : 'Örnek diyaloğu göster'}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${showExample ? 'rotate-180' : ''}`}
                />
              </button>
              {showExample && (
                <div className="mt-2 space-y-1.5 rounded-lg border border-border/40 bg-muted/30 px-3 py-2.5">
                  {subItems.map((sub, i) => (
                    <p key={i} className="text-xs leading-relaxed text-muted-foreground">
                      {sub}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function MobileTabView({ tab, onBack }) {
  const [query, setQuery] = useState('')
  const [checked, setChecked] = useState({})

  const items = useMemo(
    () => flattenTab(tab).map((it, id) => ({ ...it, id })),
    [tab],
  )
  const categoryCount = Object.keys(tab.categories).length

  const filtered = useMemo(() => {
    const q = lower(query.trim())
    if (!q) return items
    return items.filter((it) => matches(it.content, q))
  }, [items, query])

  const answeredCount = Object.values(checked).filter(Boolean).length

  return (
    <div>
      {/* top-[61px]: navbar yüksekliği (py-3 + h-9 + 1px kenarlık) — food/page.jsx'teki değerle aynı */}
      <div className="sticky top-[61px] z-30 -mt-1 bg-background/95 pb-3 pt-3 backdrop-blur">
        <div className="mb-3 flex items-center gap-2">
          <button
            onClick={onBack}
            aria-label="Kategorilere dön"
            className="-ml-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:bg-secondary/80"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="min-w-0 flex-1 truncate text-base font-semibold text-foreground">
            <span className="mr-1.5">{tab.emoji}</span>
            {tab.label}
          </h2>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {answeredCount} / {items.length}
          </span>
        </div>
        <MobileSearchBar value={query} onChange={setQuery} placeholder="Bu kategoride ara…" />
      </div>

      <div className="flex flex-col gap-2.5 pt-4">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">
              {items.length === 0 ? 'Bu kategoride soru yok' : 'Sonuç bulunamadı'}
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <MobileQuestionCard
              key={item.id}
              text={itemText(item.content)}
              subItems={itemSubItems(item.content)}
              categoryLabel={item.categoryLabel}
              showCategory={categoryCount > 1}
              checked={!!checked[item.id]}
              onToggle={() => setChecked((p) => ({ ...p, [item.id]: !p[item.id] }))}
            />
          ))
        )}
      </div>
    </div>
  )
}

function MobileHome({ tabs, tabKeys, title, onOpenTab }) {
  const [query, setQuery] = useState('')

  const allItems = useMemo(() => {
    const out = []
    tabKeys.forEach((tabKey) => {
      flattenTab(tabs[tabKey]).forEach((it) => {
        out.push({
          ...it,
          tabKey,
          tabLabel: tabs[tabKey].label,
          tabEmoji: tabs[tabKey].emoji,
        })
      })
    })
    return out
  }, [tabs, tabKeys])

  const results = useMemo(() => {
    const q = lower(query.trim())
    if (q.length < 2) return null
    return allItems.filter((it) => matches(it.content, q))
  }, [allItems, query])

  return (
    <div>
      <h1 className="mb-1 text-center text-xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mb-4 text-center text-xs text-muted-foreground">
        {allItems.length} soru · {tabKeys.length} kategori
      </p>

      <div className="mb-5">
        <MobileSearchBar value={query} onChange={setQuery} placeholder="Tüm sorularda ara…" />
      </div>

      {results ? (
        <div>
          <p className="mb-3 text-xs text-muted-foreground">{results.length} sonuç</p>
          {results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-muted-foreground">Sonuç bulunamadı</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {results.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => onOpenTab(item.tabKey)}
                    className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{item.tabEmoji}</span> {item.tabLabel}
                  </button>
                  <div className="rounded-xl border border-border/60 bg-card p-4">
                    <p className="text-[15px] leading-relaxed text-foreground">
                      {itemText(item.content)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {tabKeys.map((tabKey) => {
            const tab = tabs[tabKey]
            const count = flattenTab(tab).length
            return (
              <button
                key={tabKey}
                onClick={() => onOpenTab(tabKey)}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 text-left transition-colors active:bg-secondary/30"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/50 text-xl">
                  {tab.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {tab.label}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {count} soru
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function MobileQuestions({ tabs, title }) {
  const tabKeys = Object.keys(tabs)
  const [activeTabKey, setActiveTabKey] = useState(null)

  if (activeTabKey) {
    return (
      <MobileTabView tab={tabs[activeTabKey]} onBack={() => setActiveTabKey(null)} />
    )
  }

  return (
    <MobileHome tabs={tabs} tabKeys={tabKeys} title={title} onOpenTab={setActiveTabKey} />
  )
}

/* ============================================================ */

export function QuestionsContent({ tabs, title }) {
  return (
    <>
      <div className="hidden md:block">
        <DesktopQuestions tabs={tabs} title={title} />
      </div>
      <div className="md:hidden">
        <MobileQuestions tabs={tabs} title={title} />
      </div>
    </>
  )
}
