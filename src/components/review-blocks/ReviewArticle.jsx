'use client'

/* ============================================================
   Blok tabanlı zengin analiz yazısı renderer'ı.
   - Grafikler: Recharts
   - Animasyon: framer-motion (scroll-reveal, kart flip, gauge)
   - Kanıt kuralı: weak/speculative bloklar kesik çizgili
     çerçeveyle işaretlenir, güçlü kanıtla aynı ağırlıkta sunulmaz.
   ============================================================ */

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts'

/* ---------- palet ---------- */

const CONF = {
  strong: { label: 'güçlü kanıt', color: '#10b981', dashed: false },
  moderate: { label: 'orta kanıt', color: '#3b82f6', dashed: false },
  weak: { label: 'zayıf kanıt', color: '#f59e0b', dashed: true },
  speculative: { label: 'spekülatif', color: '#f43f5e', dashed: true },
}
const COLOR_A = '#0d9488' // teal
const COLOR_B = '#f59e0b' // amber

/* ---------- ortak parçalar ---------- */

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
}

function ConfidenceBadge({ level }) {
  const c = CONF[level]
  if (!c) return null
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
      style={{ color: c.color, border: `1px ${c.dashed ? 'dashed' : 'solid'} ${c.color}55`, background: `${c.color}14` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
      {c.label}
    </span>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

/* **kalın** işaretli düz metin */
function RichText({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">
            {p}
          </strong>
        ) : (
          p
        ),
      )}
    </>
  )
}

/* ---------- bloklar ---------- */

function Prose({ block }) {
  return (
    <motion.section {...reveal}>
      {block.title && <SectionTitle title={block.title} />}
      <div className="space-y-4">
        {block.body.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
            <RichText text={p} />
          </p>
        ))}
      </div>
    </motion.section>
  )
}

function ProcessStrip({ block }) {
  return (
    <motion.section {...reveal}>
      <SectionTitle title={block.title} subtitle={block.subtitle} />
      <div className="relative">
        <div className="absolute bottom-0 left-[15px] top-0 w-px bg-border sm:left-1/2" />
        <div className="space-y-6">
          {block.steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={`relative flex gap-4 sm:w-1/2 ${i % 2 ? 'sm:ml-auto sm:pl-8' : 'sm:flex-row-reverse sm:pr-8 sm:text-right'} pl-10 sm:pl-0`}
            >
              <div
                className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-xs font-bold text-primary sm:left-auto"
                style={{ [typeof window !== 'undefined' ? 'inset' : 'left']: undefined }}
              />
              <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-xs font-bold text-primary sm:left-1/2 sm:-translate-x-1/2 sm:[position:absolute] sm:[left:calc(50%)]" />
              <span className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-xs font-bold text-primary sm:hidden">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  <span className="mr-2 hidden text-primary sm:inline">{i + 1}.</span>
                  {s.step}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{s.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function CompareBars({ block }) {
  return (
    <motion.section {...reveal}>
      <SectionTitle title={block.title} subtitle={block.subtitle} />
      <div className="mb-4 flex items-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLOR_A }} /> {block.labels.a}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLOR_B }} /> {block.labels.b}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {block.items.map((item, i) => {
          const conf = CONF[item.confidence]
          const data = [
            { name: block.labels.a, value: item.a, fill: COLOR_A },
            { name: block.labels.b, value: item.b, fill: COLOR_B },
          ]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl bg-card p-4"
              style={{ border: `1px ${conf?.dashed ? 'dashed' : 'solid'} var(--border, rgba(128,128,128,0.3))` }}
            >
              <div className="mb-1 flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {item.metric} <span className="font-normal text-muted-foreground">({item.unit})</span>
                </h3>
                {item.mythBusting && (
                  <span className="shrink-0 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-500">
                    ❌ popüler ama yanlış
                  </span>
                )}
              </div>
              <div className="h-[76px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} layout="vertical" margin={{ top: 4, right: 44, bottom: 0, left: 0 }}>
                    <XAxis type="number" hide domain={[0, 'dataMax']} />
                    <YAxis type="category" dataKey="name" width={1} tick={false} axisLine={false} tickLine={false} />
                    <Bar dataKey="value" radius={[3, 3, 3, 3]} barSize={18} isAnimationActive animationDuration={900}>
                      {data.map((d, j) => (
                        <Cell key={j} fill={d.fill} />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="right"
                        formatter={(v) => v}
                        style={{ fontSize: 12, fill: 'currentColor', fontWeight: 600 }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.verdict}</p>
              <div className="mt-2">
                <ConfidenceBadge level={item.confidence} />
              </div>
            </motion.div>
          )
        })}
      </div>
      {block.footnote && (
        <p className="mt-4 rounded-lg bg-secondary/50 p-3 text-xs leading-relaxed text-muted-foreground">
          💡 <RichText text={block.footnote} />
        </p>
      )}
    </motion.section>
  )
}

function PortionGuide({ block }) {
  const [active, setActive] = useState(block.groups[0])
  const pct = Math.round((active.grams / block.maxGrams) * 100)
  const conf = CONF[active.confidence]

  return (
    <motion.section {...reveal}>
      <SectionTitle title={block.title} subtitle={block.subtitle} />
      <div className="grid gap-6 rounded-xl border border-border bg-card p-5 sm:grid-cols-[1fr_220px]">
        <div className="flex flex-wrap content-start gap-2">
          {block.groups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active.id === g.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {g.label}
            </button>
          ))}
          <p className="mt-3 w-full text-xs leading-relaxed text-muted-foreground">{block.whyNote}</p>
        </div>
        <div className="mx-auto flex flex-col items-center">
          <div className="relative h-[170px] w-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="70%"
                innerRadius={70}
                outerRadius={92}
                startAngle={180}
                endAngle={0}
                data={[{ value: pct, fill: conf?.color || COLOR_A }]}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'rgba(128,128,128,0.12)' }} isAnimationActive animationDuration={700} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-x-0 bottom-6 text-center">
              <div className="text-xl font-bold text-foreground">{active.grams}g</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">haftalık</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-foreground">{active.amount}</div>
            {active.detail && <div className="text-xs text-muted-foreground">{active.detail}</div>}
            <div className="mt-2 flex justify-center gap-2">
              <ConfidenceBadge level={active.confidence} />
              {active.conflict && (
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-500">
                  ⚠ çelişkili öneriler
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function MythCard({ card, index }) {
  const [flipped, setFlipped] = useState(false)
  const conf = CONF[card.confidence]
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={() => setFlipped((f) => !f)}
      className="group relative h-52 text-left [perspective:1000px]"
      aria-pressed={flipped}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.3, 0.1, 0.3, 1] }}
      >
        {/* ön: mit */}
        <div className="absolute inset-0 flex flex-col rounded-xl border border-border bg-card p-4 [backface-visibility:hidden]">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-rose-500">Sanıyorduk ki…</span>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground">{card.myth}</p>
          <span className="text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
            çevirmek için dokun ↻
          </span>
        </div>
        {/* arka: gerçek */}
        <div
          className="absolute inset-0 flex flex-col rounded-xl bg-card p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ border: `1px ${conf?.dashed ? 'dashed' : 'solid'} ${conf?.color || 'var(--border)'}66` }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500">Aslında…</span>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground">{card.fact}</p>
          <ConfidenceBadge level={card.confidence} />
        </div>
      </motion.div>
    </motion.button>
  )
}

function MythCards({ block }) {
  return (
    <motion.section {...reveal}>
      <SectionTitle title={block.title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {block.cards.map((c, i) => (
          <MythCard key={i} card={c} index={i} />
        ))}
      </div>
    </motion.section>
  )
}

function FlowChecklist({ block }) {
  return (
    <motion.section {...reveal}>
      <SectionTitle title={block.title} subtitle={block.subtitle} />
      <div className="grid gap-4 sm:grid-cols-2">
        {block.sections.map((sec, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{sec.title}</h3>
            <ul className="space-y-2.5">
              {sec.items.map((it, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: j * 0.06 }}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <span className={`mt-0.5 ${it.danger ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {it.danger ? '✕' : '✓'}
                  </span>
                  <span className="min-w-0">
                    <span className="text-foreground">{it.check}</span>
                    <span className={`block text-xs ${it.danger ? 'font-medium text-rose-500' : 'text-muted-foreground'}`}>
                      {it.result}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

function DataTable({ block }) {
  return (
    <motion.section {...reveal}>
      <SectionTitle title={block.title} subtitle={block.subtitle} />
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left">
              {block.columns.map((c, i) => (
                <th key={i} className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((r, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0">
                {r.cells.map((cell, j) =>
                  j === r.cells.length - 1 && CONF[cell] ? (
                    <td key={j} className="px-4 py-3">
                      <ConfidenceBadge level={cell} />
                    </td>
                  ) : (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? 'text-foreground' : r.danger ? 'text-rose-500' : 'text-muted-foreground'}`}>
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.note && <p className="mt-2 text-xs text-muted-foreground">{block.note}</p>}
    </motion.section>
  )
}

function Callout({ block }) {
  return (
    <motion.section {...reveal}>
      <div className="rounded-xl border border-primary/25 bg-primary/5 p-5">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">{block.title}</h3>
        <ul className="space-y-2">
          {block.body.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <RichText text={b} />
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  )
}

function EvidenceMap({ block }) {
  const confData = Object.entries(block.byConfidence).map(([k, v]) => ({
    name: CONF[k]?.label || k,
    value: v,
    fill: CONF[k]?.color || '#888',
  }))
  const catData = Object.entries(block.byCategory).map(([k, v]) => ({ name: k, value: v }))
  const total = confData.reduce((s, d) => s + d.value, 0)

  return (
    <motion.section {...reveal}>
      <SectionTitle title={block.title} subtitle={block.subtitle} />
      <div className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
        <div className="relative h-[210px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={confData}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={84}
                paddingAngle={3}
                strokeWidth={0}
                isAnimationActive
                animationDuration={900}
              >
                {confData.map((d, i) => (
                  <Cell key={i} fill={d.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{total}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">iddia</span>
          </div>
          <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1">
            {confData.map((d, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: d.fill }} />
                {d.name} · {d.value}
              </span>
            ))}
          </div>
        </div>
        <div className="h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={catData} layout="vertical" margin={{ top: 8, right: 34, bottom: 0, left: 8 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={104}
                tick={{ fontSize: 11, fill: 'currentColor' }}
                axisLine={false}
                tickLine={false}
              />
              <Bar dataKey="value" fill={COLOR_A} radius={[3, 3, 3, 3]} barSize={16} isAnimationActive animationDuration={900}>
                <LabelList dataKey="value" position="right" style={{ fontSize: 11, fill: 'currentColor' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {block.note && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{block.note}</p>}
    </motion.section>
  )
}

const BLOCKS = {
  prose: Prose,
  processStrip: ProcessStrip,
  compareBars: CompareBars,
  portionGuide: PortionGuide,
  mythCards: MythCards,
  flowChecklist: FlowChecklist,
  dataTable: DataTable,
  callout: Callout,
  evidenceMap: EvidenceMap,
}

/* ---------- makale ---------- */

export function ReviewArticle({ review }) {
  return (
    <article className="mx-auto max-w-3xl">
      {/* Başlık */}
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <div className="mb-3 text-4xl">{review.emoji}</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{review.title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{review.subtitle}</p>
        <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
          {new Date(review.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          {review.readingHint && <> · {review.readingHint}</>}
        </div>
      </motion.header>

      {/* Hero istatistikleri */}
      {review.heroStats?.length > 0 && (
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {review.heroStats.map((s, i) => {
            const conf = CONF[s.confidence]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className="rounded-xl bg-card p-4 text-center"
                style={{ border: `1px ${conf?.dashed ? 'dashed' : 'solid'} var(--border, rgba(128,128,128,0.3))` }}
              >
                <div className="text-2xl font-bold text-foreground">
                  {s.value}
                  {s.unit && <span className="ml-0.5 text-sm font-medium text-muted-foreground">{s.unit}</span>}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{s.label}</div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Bloklar */}
      <div className="space-y-14">
        {review.blocks.map((block, i) => {
          const Cmp = BLOCKS[block.type]
          if (!Cmp) return null
          return <Cmp key={i} block={block} />
        })}
      </div>
    </article>
  )
}
