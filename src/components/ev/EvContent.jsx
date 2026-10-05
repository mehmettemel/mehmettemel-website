'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building2,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardList,
  Coins,
  Droplets,
  ExternalLink,
  FileText,
  Hammer,
  Home,
  KeyRound,
  ListChecks,
  MessageCircleQuestion,
  RotateCcw,
  Scale,
  Search,
  StickyNote,
  Sun,
  TrendingUp,
  Truck,
  VolumeX,
  X,
} from 'lucide-react'

/* ============================================================
   Ev Planı: gizli, giriş gerektiren plan sayfası.
   Sekmeler: Plan (yapılacaklar), Ev Alma (referans notlar +
   hesaplayıcı), Gezme Listesi (ev gezerken işaretlenen kontrol),
   Kiralama, Notlar. İşaret durumu localStorage'da tutulur
   (cihaza özel, sunucuya gitmez). Veri: src/data/ev-plan.js
   ============================================================ */

const ICONS = {
  scale: Scale,
  trend: TrendingUp,
  building: Building2,
  coins: Coins,
  droplets: Droplets,
  hammer: Hammer,
  home: Home,
  search: Search,
  file: FileText,
  truck: Truck,
  volume: VolumeX,
  sun: Sun,
}

const lower = (s) => s.toLocaleLowerCase('tr')
const fmt = new Intl.NumberFormat('tr-TR')

/* ---------- küçük yardımcılar ---------- */

// localStorage destekli işaret kutuları. Okuma mount sonrası yapılır
// (SSR ile uyumsuzluk olmasın); okunana kadar `ready` false.
function useChecklist(key) {
  const [checked, setChecked] = useState({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw) setChecked(JSON.parse(raw))
    } catch {
      // tarayıcı depolaması kapalı olabilir: boş başla
    }
    setReady(true)
  }, [key])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(key, JSON.stringify(checked))
    } catch {
      // yazılamazsa sessizce geç
    }
  }, [checked, ready, key])

  const toggle = useCallback((id) => {
    setChecked((prev) => {
      const next = { ...prev }
      if (next[id]) delete next[id]
      else next[id] = true
      return next
    })
  }, [])

  const reset = useCallback((ids) => {
    setChecked((prev) => {
      const next = { ...prev }
      ids.forEach((id) => delete next[id])
      return next
    })
  }, [])

  return { checked, toggle, reset, ready }
}

// Metindeki https:// adreslerini tıklanabilir bağlantıya çevirir.
function Linkify({ text }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g)
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noreferrer"
        className="break-all text-primary underline underline-offset-2 hover:opacity-80"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

// Uzun notlar listede 3 satıra kısalır, istenirse açılır.
function ClampText({ text, className = '' }) {
  const [open, setOpen] = useState(false)
  const long = text.length > 220
  return (
    <div className="min-w-0">
      <p
        className={`whitespace-pre-line text-[15px] leading-relaxed ${
          long && !open ? 'line-clamp-3' : ''
        } ${className}`}
      >
        <Linkify text={text} />
      </p>
      {long && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary/80 hover:text-primary"
        >
          {open ? 'Daha az göster' : 'Devamını göster'}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  )
}

function ProgressBar({ done, total, ready = true }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
      role="progressbar"
      aria-valuenow={ready ? pct : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {ready ? (
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      ) : (
        <div className="h-full w-1/3 animate-pulse rounded-full bg-muted-foreground/20" />
      )}
    </div>
  )
}

function CheckButton({ checked, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={checked}
      aria-label={label}
      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        checked
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border text-transparent hover:border-primary/60'
      }`}
    >
      <Check className="h-3.5 w-3.5" />
    </button>
  )
}

function GroupCard({ icon, title, count, children, aside, accent = false }) {
  const Icon = ICONS[icon] ?? Home
  return (
    <section
      className={`overflow-hidden rounded-2xl border bg-card ${
        accent ? 'border-primary/40 ring-1 ring-primary/20' : 'border-border/60'
      }`}
    >
      <header className="flex items-center gap-3 border-b border-border/50 px-4 py-3.5 sm:px-5">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            accent ? 'bg-primary/25 text-foreground' : 'bg-secondary/60 text-muted-foreground'
          }`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
          {title}
        </h3>
        {aside ?? (
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {count}
          </span>
        )}
      </header>
      {children}
    </section>
  )
}

function EmptyState({ title, hint }) {
  return (
    <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
      <p className="text-sm font-medium text-foreground">{title}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

/* ---------- sekmeler ---------- */

function PlanTab({ phases, list }) {
  const all = phases.flatMap((p) => p.todos)
  const done = all.filter((t) => list.checked[t.id]).length

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 className="text-sm font-semibold text-foreground">Genel ilerleme</h2>
          <span className="text-xs tabular-nums text-muted-foreground">
            {list.ready ? `${done} / ${all.length}` : ''}
          </span>
        </div>
        <ProgressBar done={done} total={all.length} ready={list.ready} />
      </div>

      {phases.length === 0 && (
        <EmptyState title="Henüz yapılacak yok" hint="src/data/ev-plan.js içindeki phases dizisine ekle." />
      )}

      {phases.map((phase, idx) => {
        const phaseDone = phase.todos.filter((t) => list.checked[t.id]).length
        const complete = list.ready && phase.todos.length > 0 && phaseDone === phase.todos.length
        return (
          <section
            key={phase.id}
            className="overflow-hidden rounded-2xl border border-border/60 bg-card"
          >
            <header className="flex items-center gap-3 border-b border-border/50 px-4 py-3.5 sm:px-5">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums ${
                  complete
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {complete ? <Check className="h-3.5 w-3.5" /> : idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-foreground">
                  {phase.title}
                </h3>
                {phase.hint && (
                  <p className="truncate text-xs text-muted-foreground">{phase.hint}</p>
                )}
              </div>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {list.ready ? `${phaseDone} / ${phase.todos.length}` : ''}
              </span>
            </header>
            {phase.todos.length === 0 ? (
              <p className="px-5 py-6 text-center text-xs text-muted-foreground">
                Bu aşamada madde yok
              </p>
            ) : (
              <ul className="divide-y divide-border/40">
                {phase.todos.map((todo) => {
                  const isDone = !!list.checked[todo.id]
                  return (
                    <li key={todo.id} className="flex items-start gap-3 px-4 py-3 sm:px-5">
                      <CheckButton
                        checked={isDone}
                        onClick={() => list.toggle(todo.id)}
                        label={isDone ? 'Tamamlandı işaretini kaldır' : 'Tamamlandı olarak işaretle'}
                      />
                      <p
                        className={`min-w-0 flex-1 text-[15px] leading-relaxed transition-colors ${
                          isDone ? 'text-muted-foreground line-through' : 'text-foreground'
                        }`}
                      >
                        {todo.text}
                      </p>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )
      })}
    </div>
  )
}

// TL girişi: yalnızca rakam alır, binlik ayırıcıyla gösterir.
function MoneyInput({ label, digits, onChange, ariaLabel }) {
  return (
    <label className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-secondary/30 px-3.5 py-2.5 focus-within:border-foreground/30">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        inputMode="numeric"
        value={digits ? fmt.format(Number(digits)) : ''}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
        placeholder="0"
        aria-label={ariaLabel}
        className="min-w-0 flex-1 bg-transparent text-right text-sm tabular-nums text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
      />
      <span className="text-xs text-muted-foreground">TL</span>
    </label>
  )
}

function CalcCard({ title, hint, children }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/60 text-muted-foreground">
          <Coins className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

// Kira x 180 ay: Ev İçi Bilgiler notundaki değerleme kuralı.
function RentCalculator() {
  const [digits, setDigits] = useState('')
  const rent = digits ? Number(digits) : 0

  return (
    <CalcCard
      title="Değer kontrolü: kira x 180 ay"
      hint="Binadaki veya sitedeki benzer dairenin aylık kirasını yaz."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <MoneyInput label="Aylık kira" digits={digits} onChange={setDigits} ariaLabel="Aylık kira (TL)" />
        <div className="flex items-baseline justify-between gap-2 rounded-xl bg-secondary/40 px-4 py-2.5 sm:min-w-[15rem] sm:justify-end">
          <span className="text-xs text-muted-foreground">Makul fiyat</span>
          <span className="text-base font-semibold tabular-nums text-foreground">
            {rent ? `${fmt.format(rent * 180)} TL` : 'n/a'}
          </span>
        </div>
      </div>
    </CalcCard>
  )
}

// Gizli maliyet: toplam harç %4 (alıcı ve satıcı genelde yarı yarıya), emlakçı her taraftan
// %2 + KDV (%2,4). Oranlar Ev Alma notlarındaki 5 milyon TL'lik örnekten alındı
// (200 bin + 240 bin TL). DASK ve döner sermaye ayrıca eklenir.
const HARC_TOPLAM = 0.04
const KOMISYON_TARAF = 0.024

function CostCalculator() {
  const [digits, setDigits] = useState('')
  const price = digits ? Number(digits) : 0
  const rows = [
    {
      key: 'shared',
      label: 'Yarı yarıya paylaşılırsa',
      sub: 'harcın yarısı + komisyon alıcı payı',
      extra: price * (HARC_TOPLAM / 2 + KOMISYON_TARAF),
    },
    {
      key: 'worst',
      label: 'En kötü durum',
      sub: 'harç ve komisyonun hepsi alıcıda',
      extra: price * (HARC_TOPLAM + KOMISYON_TARAF * 2),
    },
  ]

  return (
    <CalcCard
      title="Gizli maliyet: toplam bütçe"
      hint="Bütçeyi satış fiyatı değil, ek masraflar dahil toplam üzerinden kur."
    >
      <MoneyInput label="Satış fiyatı" digits={digits} onChange={setDigits} ariaLabel="Satış fiyatı (TL)" />
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li
            key={r.key}
            className="flex items-center justify-between gap-3 rounded-xl bg-secondary/40 px-4 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{r.label}</p>
              <p className="truncate text-xs text-muted-foreground">{r.sub}</p>
            </div>
            <div className="shrink-0 text-right tabular-nums">
              <p className="text-base font-semibold text-foreground">
                {price ? `${fmt.format(Math.round(price + r.extra))} TL` : 'n/a'}
              </p>
              <p className="text-xs text-muted-foreground">
                {price ? `+${fmt.format(Math.round(r.extra))} TL` : ''}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        DASK ve döner sermaye ayrıca eklenir (5 milyon TL örnekte yaklaşık 10 bin TL).
      </p>
    </CalcCard>
  )
}

function TipList({ tips }) {
  return (
    <ol className="divide-y divide-border/40">
      {tips.map((tip, i) => (
        <li key={i} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
          <span className="mt-[3px] w-5 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground/70">
            {i + 1}
          </span>
          <ClampText text={tip} className="text-foreground" />
        </li>
      ))}
    </ol>
  )
}

// Kademeler: kritiklik sırasına göre. Grupların `tier` alanı buradaki key ile eşleşir.
const BUY_TIERS = [
  {
    key: 'kazik',
    heading: 'Kazıklanmamak için vazgeçilmezler',
    note: 'Bunlardan biri tutmuyorsa fiyat cazip olsa da ilerleme.',
    accent: true,
  },
  {
    key: 'apartman',
    heading: 'İyi bir apartman dairesi için kritikler',
    note: 'Belge temizse sıra binanın seni her ay yormamasına gelir.',
    accent: true,
  },
  {
    key: 'diger',
    heading: 'Diğer notlar',
    note: 'Süreç sırasına göre ayrıntılar.',
    collapsible: true,
  },
]

function BuyTab({ groups }) {
  const [closed, setClosed] = useState({})
  const sections = BUY_TIERS.map((t) => ({
    ...t,
    groups: groups.filter((g) => (g.tier ?? 'diger') === t.key),
  })).filter((t) => t.groups.length > 0)

  return (
    <div className="space-y-4">
      <RentCalculator />
      <CostCalculator />
      {groups.length === 0 && <EmptyState title="Henüz not yok" />}
      {sections.map((sec) => {
        const count = sec.groups.reduce((n, g) => n + g.tips.length, 0)
        const open = !sec.collapsible || !closed[sec.key]
        return (
          <div key={sec.key} className="space-y-4">
            <TierHeading
              heading={sec.heading}
              note={sec.note}
              meta={String(count)}
              accent={sec.accent}
              collapsible={sec.collapsible}
              open={open}
              onToggle={() => setClosed((c) => ({ ...c, [sec.key]: !c[sec.key] }))}
            />
            {open &&
              sec.groups.map((g) => (
                <GroupCard
                  key={g.id}
                  icon={g.icon}
                  title={g.title}
                  count={g.tips.length}
                  accent={sec.accent}
                >
                  <TipList tips={g.tips} />
                </GroupCard>
              ))}
          </div>
        )
      })}
    </div>
  )
}

// Bölüm başlığı (kademe): isteğe bağlı vurgu ve katlanma.
function TierHeading({ heading, note, done, total, ready, meta, accent, collapsible, open, onToggle }) {
  const Tag = collapsible ? 'button' : 'div'
  return (
    <Tag
      {...(collapsible ? { onClick: onToggle, 'aria-expanded': open } : {})}
      className={`flex w-full items-start gap-3 px-1 pt-2 text-left ${collapsible ? 'cursor-pointer' : ''}`}
    >
      <div className="min-w-0 flex-1">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          {accent && (
            <span className="shrink-0 rounded-full bg-primary/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
              Öncelik
            </span>
          )}
          <span className="min-w-0">{heading}</span>
        </h2>
        {note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}
      </div>
      <span className="mt-0.5 shrink-0 text-xs tabular-nums text-muted-foreground">
        {meta ?? (ready ? `${done} / ${total}` : '')}
      </span>
      {collapsible && (
        <ChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      )}
    </Tag>
  )
}

// Gezme listesi ve emlakçı soruları aynı kalıbı kullanır: gruplu, işaretlenebilir,
// "Sıfırla" ile yeni ev için baştan başlanır. sections: [{ key, heading?, note?,
// accent?, collapsible?, groups }]
function ChecklistTab({ sections, list, title, hint, checkLabel, uncheckLabel }) {
  const allGroups = sections.flatMap((sec) => sec.groups)
  const ids = allGroups.flatMap((g) => g.items.map((i) => i.id))
  const done = ids.filter((id) => list.checked[id]).length
  const [closed, setClosed] = useState({})

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-foreground">{title}</h2>
            <p className="text-xs text-muted-foreground">{hint}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-xs tabular-nums text-muted-foreground">
              {list.ready ? `${done} / ${ids.length}` : ''}
            </span>
            <button
              onClick={() => list.reset(ids)}
              disabled={!done}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Sıfırla
            </button>
          </div>
        </div>
        <ProgressBar done={done} total={ids.length} ready={list.ready} />
      </div>

      {allGroups.length === 0 && <EmptyState title="Henüz madde yok" />}

      {sections.map((sec) => {
        const secIds = sec.groups.flatMap((g) => g.items.map((i) => i.id))
        const secDone = secIds.filter((id) => list.checked[id]).length
        const open = !sec.collapsible || !closed[sec.key]
        return (
          <div key={sec.key} className="space-y-4">
            {sec.heading && (
              <TierHeading
                heading={sec.heading}
                note={sec.note}
                done={secDone}
                total={secIds.length}
                ready={list.ready}
                accent={sec.accent}
                collapsible={sec.collapsible}
                open={open}
                onToggle={() => setClosed((c) => ({ ...c, [sec.key]: !c[sec.key] }))}
              />
            )}
            {open &&
              sec.groups.map((g) => {
                const gDone = g.items.filter((i) => list.checked[i.id]).length
                return (
                  <GroupCard
                    key={g.id}
                    icon={g.icon}
                    title={g.title}
                    accent={sec.accent}
                    aside={
                      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                        {list.ready ? `${gDone} / ${g.items.length}` : ''}
                      </span>
                    }
                  >
                    <ul className="divide-y divide-border/40">
                      {g.items.map((item) => {
                        const isDone = !!list.checked[item.id]
                        return (
                          <li key={item.id} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
                            <CheckButton
                              checked={isDone}
                              onClick={() => list.toggle(item.id)}
                              label={isDone ? uncheckLabel : checkLabel}
                            />
                            <ClampText
                              text={item.text}
                              className={isDone ? 'text-muted-foreground' : 'text-foreground'}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </GroupCard>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

function RentTab({ groups }) {
  return (
    <div className="space-y-4">
      {groups.length === 0 && <EmptyState title="Henüz not yok" />}
      {groups.map((g) => (
        <GroupCard key={g.id} icon={g.icon} title={g.title} count={g.tips.length}>
          <TipList tips={g.tips} />
        </GroupCard>
      ))}
    </div>
  )
}

function NotesTab({ notes, resources }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2.5 px-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Linkler
        </h2>
        {resources.length === 0 ? (
          <EmptyState title="Henüz link yok" />
        ) : (
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {resources.map((r) => (
              <li key={r.id}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-foreground/25"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {r.label}
                    </p>
                    {r.desc && (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {r.desc}
                      </p>
                    )}
                  </div>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="mb-2.5 px-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Notlar
        </h2>
        {notes.length === 0 ? (
          <EmptyState
            title="Henüz not yok"
            hint="Ek bilgileri buraya ekleyebilirsin: src/data/ev-plan.js, notes dizisi."
          />
        ) : (
          <ul className="space-y-2.5">
            {notes.map((n) => (
              <li
                key={n.id}
                className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5"
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
                    {n.title}
                  </h3>
                  {n.tag && (
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {n.tag}
                    </span>
                  )}
                </div>
                <ClampText text={n.body} className="text-foreground/85" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ---------- arama ---------- */

function SearchResults({ query, index, onJump }) {
  const results = useMemo(() => {
    const q = lower(query.trim())
    return index.filter((e) => lower(e.text).includes(q)).slice(0, 30)
  }, [query, index])

  return (
    <div>
      <p className="mb-3 text-xs text-muted-foreground">{results.length} sonuç</p>
      {results.length === 0 ? (
        <EmptyState title="Sonuç bulunamadı" hint="Başka bir kelime dene." />
      ) : (
        <ul className="space-y-2.5">
          {results.map((r, i) => (
            <li key={i} className="rounded-2xl border border-border/60 bg-card p-4">
              <button
                onClick={() => onJump(r.section)}
                className="mb-2 inline-flex max-w-full items-center gap-1 rounded-full bg-secondary/60 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="truncate">
                  {r.sectionLabel}
                  {r.group ? ` · ${r.group}` : ''}
                </span>
              </button>
              <ClampText text={r.text} className="text-foreground" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ---------- ana bileşen ---------- */

export function EvContent({ data }) {
  const { title, subtitle, targetDate, phases, buyGroups, viewGroups, askGroups, rentGroups, resources, notes } = data

  const plan = useChecklist('ev-plan:todos')
  const view = useChecklist('ev-plan:viewing')
  const ask = useChecklist('ev-plan:askq')

  const [tab, setTab] = useState('plan')
  const [query, setQuery] = useState('')
  const [daysLeft, setDaysLeft] = useState(null)
  const searchRef = useRef(null)

  // Geri sayım yalnızca istemcide hesaplanır (SSR'da saat farkı olmasın).
  useEffect(() => {
    if (!targetDate) return
    const ms = new Date(`${targetDate}T00:00:00`).getTime() - Date.now()
    setDaysLeft(Math.ceil(ms / 86400000))
  }, [targetDate])

  const targetLabel = useMemo(() => {
    if (!targetDate) return ''
    return new Date(`${targetDate}T00:00:00`).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }, [targetDate])

  const viewSections = useMemo(
    () =>
      [
        {
          key: 'eleme',
          heading: 'Kısa eleme',
          note: 'Bu altı maddeden biri tutmuyorsa ucuzluk genelde sonradan çıkar.',
          accent: true,
          groups: viewGroups.filter((g) => g.tier === 'eleme'),
        },
        {
          key: 'detay',
          heading: 'Detaylı kontrol',
          groups: viewGroups.filter((g) => g.tier !== 'eleme'),
        },
      ].filter((sec) => sec.groups.length > 0),
    [viewGroups],
  )
  const askSections = useMemo(
    () =>
      [
        {
          key: 'kazik',
          heading: 'Kazıklanmamak için vazgeçilmezler',
          note: 'Biri tutmuyorsa fiyat cazip olsa da ilerleme. Kapora vermeden önce net cevap al.',
          accent: true,
        },
        {
          key: 'apartman',
          heading: 'İyi bir apartman dairesi için kritikler',
          note: 'Belge temizse sıra binanın seni her ay yormamasına gelir.',
          accent: true,
        },
        {
          key: 'ekstra',
          heading: 'Ekstra sorular',
          note: 'Zaman olursa veya görüşme ilerledikçe sor.',
          collapsible: true,
        },
      ]
        .map((t) => ({ ...t, groups: askGroups.filter((g) => g.tier === t.key) }))
        .filter((sec) => sec.groups.length > 0),
    [askGroups],
  )
  const planAll = useMemo(() => phases.flatMap((p) => p.todos), [phases])
  const viewIds = useMemo(
    () => viewGroups.flatMap((g) => g.items.map((i) => i.id)),
    [viewGroups],
  )
  const askIds = useMemo(
    () => askGroups.flatMap((g) => g.items.map((i) => i.id)),
    [askGroups],
  )
  const planDone = planAll.filter((t) => plan.checked[t.id]).length
  const viewDone = viewIds.filter((id) => view.checked[id]).length
  const askDone = askIds.filter((id) => ask.checked[id]).length
  const buyCount = buyGroups.reduce((n, g) => n + g.tips.length, 0)
  const rentCount = rentGroups.reduce((n, g) => n + g.tips.length, 0)

  const sections = [
    { id: 'plan', label: 'Plan', icon: ListChecks, meta: plan.ready ? `${planDone}/${planAll.length}` : '' },
    { id: 'buy', label: 'Ev Alma', icon: Home, meta: String(buyCount) },
    { id: 'view', label: 'Gezme Listesi', icon: ClipboardList, meta: view.ready ? `${viewDone}/${viewIds.length}` : '' },
    { id: 'ask', label: 'Emlakçıya Sorular', icon: MessageCircleQuestion, meta: ask.ready ? `${askDone}/${askIds.length}` : '' },
    { id: 'rent', label: 'Kiralama', icon: KeyRound, meta: String(rentCount) },
    { id: 'notes', label: 'Notlar', icon: StickyNote, meta: String(notes.length + resources.length) },
  ]

  // Arama dizini: her not, bulunduğu bölüm etiketiyle.
  const index = useMemo(() => {
    const out = []
    phases.forEach((p) =>
      p.todos.forEach((t) => out.push({ section: 'plan', sectionLabel: 'Plan', group: p.title, text: t.text })),
    )
    buyGroups.forEach((g) =>
      g.tips.forEach((t) => out.push({ section: 'buy', sectionLabel: 'Ev Alma', group: g.title, text: t })),
    )
    viewGroups.forEach((g) =>
      g.items.forEach((t) => out.push({ section: 'view', sectionLabel: 'Gezme Listesi', group: g.title, text: t.text })),
    )
    askGroups.forEach((g) =>
      g.items.forEach((t) => out.push({ section: 'ask', sectionLabel: 'Emlakçıya Sorular', group: g.title, text: t.text })),
    )
    rentGroups.forEach((g) =>
      g.tips.forEach((t) => out.push({ section: 'rent', sectionLabel: 'Kiralama', group: g.title, text: t })),
    )
    notes.forEach((n) =>
      out.push({ section: 'notes', sectionLabel: 'Notlar', group: n.title, text: `${n.title}. ${n.body}` }),
    )
    resources.forEach((r) =>
      out.push({ section: 'notes', sectionLabel: 'Notlar', group: 'Link', text: `${r.label}. ${r.desc ?? ''} ${r.href}` }),
    )
    return out
  }, [phases, buyGroups, viewGroups, askGroups, rentGroups, notes, resources])

  const searching = query.trim().length >= 2

  const jump = (id) => {
    setTab(id)
    setQuery('')
  }

  return (
    <div>
      {/* üst blok */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Gizli sayfa
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {targetDate && (
          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3">
            <CalendarClock className="h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-lg font-semibold leading-none tabular-nums text-foreground">
                {daysLeft === null
                  ? 'n/a'
                  : daysLeft >= 0
                    ? `${daysLeft} gün`
                    : 'Süre doldu'}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                Hedef: {targetLabel}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* arama */}
      <div className="mb-6 flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-4 py-2.5 focus-within:border-foreground/30">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          ref={searchRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tüm notlarda ara…"
          aria-label="Tüm notlarda ara"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              searchRef.current?.focus()
            }}
            aria-label="Aramayı temizle"
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
        {/* sekmeler: mobilde yatay kaydırmalı çubuk, masaüstünde sol sütun */}
        {/* top-[61px]: navbar yüksekliği (py-3 + h-9 + 1px kenarlık), food/page.jsx ile aynı değer */}
        <nav
          aria-label="Bölümler"
          className="sticky top-[61px] z-30 -mt-1 bg-background/95 py-2 backdrop-blur md:top-24 md:z-10 md:mt-0 md:w-56 md:shrink-0 md:bg-transparent md:py-0 md:backdrop-blur-none"
        >
          <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] md:flex-col md:gap-1 md:overflow-visible [&::-webkit-scrollbar]:hidden">
            {sections.map((s) => {
              const Icon = s.icon
              const active = !searching && tab === s.id
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    onClick={() => jump(s.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                      active
                        ? 'bg-secondary font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap md:flex-1 md:text-left">{s.label}</span>
                    {s.meta && (
                      <span className="text-[11px] tabular-nums text-muted-foreground">
                        {s.meta}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <main className="min-w-0 flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={searching ? 'search' : tab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {searching ? (
                <SearchResults query={query} index={index} onJump={jump} />
              ) : tab === 'plan' ? (
                <PlanTab phases={phases} list={plan} />
              ) : tab === 'buy' ? (
                <BuyTab groups={buyGroups} />
              ) : tab === 'view' ? (
                <ChecklistTab
                  sections={viewSections}
                  list={view}
                  title="Bu evde kontrol edilenler"
                  hint="Her ev gezisinde işaretle, yeni evde sıfırla."
                  checkLabel="Kontrol edildi olarak işaretle"
                  uncheckLabel="Kontrol edildi işaretini kaldır"
                />
              ) : tab === 'ask' ? (
                <ChecklistTab
                  sections={askSections}
                  list={ask}
                  title="Emlakçıya sorulanlar"
                  hint="Önce kritik sorular. Cevap aldıkça işaretle, yeni evde sıfırla."
                  checkLabel="Soruldu olarak işaretle"
                  uncheckLabel="Soruldu işaretini kaldır"
                />
              ) : tab === 'rent' ? (
                <RentTab groups={rentGroups} />
              ) : (
                <NotesTab notes={notes} resources={resources} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
