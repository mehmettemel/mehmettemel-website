'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Playfair_Display, Old_Standard_TT, UnifrakturCook } from 'next/font/google'
import { gazete } from '@/data/gazete'
import { CurlEngine, rasterizePage } from './curl-engine'
import styles from './gazete.module.css'

/* Fontlar burada tanımlı: değişken sınıfları hem görünür kitaba
   hem rasterize edilen sayfa düğümlerine uygulanır — SVG snapshot
   aynı fontlarla, DOM ile piksel-perfect çizilir. */
const displayFont = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})
const bodyFont = Old_Standard_TT({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
})
const mastheadFont = UnifrakturCook({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-masthead',
  display: 'swap',
})
const fontVars = `${displayFont.variable} ${bodyFont.variable} ${mastheadFont.variable}`

const PAGE_COUNT = 4
// Masaüstü: kapak sağda tek başına, sonra 2-3 spread, sonra arka kapak solda
const SPREADS = [
  [null, 0],
  [1, 2],
  [3, null],
]
// İlk yerleşim boyutu — gerçek boyut ölçülünce düğümler yeniden
// boyutlanıp dokular GERÇEK sayfa ölçüsünde üretilir (DOM ile
// satır kırılımları birebir aynı olsun diye)
const RASTER_W = 550
const RASTER_H = 733

/* ---------- Sayfa içerikleri (tek kaynak: data/gazete.js) ---------- */

function PageContent({ index }) {
  const { masthead, manset, kose, kisaKisa, laboratuvar, alinti, abone, kitapliktan } = gazete

  if (index === 0) {
    return (
      <div className={styles.pageInner}>
        <header className={styles.masthead}>
          <div className={styles.mastheadRuleTop} />
          <h1 className={styles.mastheadName}>{masthead.name}</h1>
          <div className={styles.mastheadRuleUnder} />
          <div className={styles.mastheadMeta}>
            <span>{masthead.issue}</span>
            <span>{masthead.date}</span>
            <span>{masthead.frequency}</span>
          </div>
          <div className={styles.oxfordRule} />
        </header>
        <article>
          <p className={styles.kicker}>{manset.kicker}</p>
          <h2 className={styles.headline}>{manset.title}</h2>
          <p className={styles.subhead}>{manset.subtitle}</p>
          <div className={styles.subheadRule} />
          <div className={`${styles.body} ${styles.dropcap} ${styles.twoCol}`}>
            {manset.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
        <div className={styles.pageNo}>— 1 —</div>
      </div>
    )
  }

  if (index === 1) {
    return (
      <div className={styles.pageInner}>
        <div className={styles.runningHead}>
          <span>{masthead.name}</span>
          <span>{masthead.issue}</span>
        </div>
        <aside>
          <h3 className={styles.sectionLabel}>{kose.label}</h3>
          <h4 className={styles.koseTitle}>{kose.title}</h4>
          <p className={styles.koseLead}>{kose.lead}</p>
          <div className={`${styles.body} ${styles.dropcap}`}>
            {kose.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className={styles.koseAuthor}>{kose.author}</p>
        </aside>
        <div className={styles.ornament} aria-hidden="true">
          ❦
        </div>
        <section>
          <h3 className={styles.sectionLabel}>{kisaKisa.label}</h3>
          {kisaKisa.items.map((item, i) => (
            <article key={i} className={styles.briefItem}>
              <h4 className={styles.briefTitle}>{item.title}</h4>
              <p className={styles.briefText}>{item.text}</p>
            </article>
          ))}
        </section>
        <div className={styles.pageNo}>— 2 —</div>
      </div>
    )
  }

  if (index === 2) {
    return (
      <div className={styles.pageInner}>
        <div className={styles.runningHead}>
          <span>{masthead.name}</span>
          <span>{masthead.date}</span>
        </div>
        <div className={styles.labBox}>
          <h3 className={styles.labLabel}>{laboratuvar.label}</h3>
          <h4 className={styles.labTitle}>{laboratuvar.title}</h4>
          <div className={styles.labBody}>
            {laboratuvar.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className={styles.labVerdict}>{laboratuvar.verdict}</p>
        </div>
        <div className={styles.ornament} aria-hidden="true">
          ◆
        </div>
        <figure className={styles.quote}>
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>
          <blockquote className={styles.quoteText}>{alinti.text}</blockquote>
          <figcaption className={styles.quoteSource}>{alinti.source}</figcaption>
        </figure>
        <div className={styles.pageNo}>— 3 —</div>
      </div>
    )
  }

  return (
    <div className={styles.pageInner}>
      <div className={styles.runningHead}>
        <span>{masthead.name}</span>
        <span>{masthead.frequency}</span>
      </div>
      <section>
        <h3 className={styles.sectionLabel}>{kitapliktan.label}</h3>
        <h4 className={styles.libraryTitle}>{kitapliktan.title}</h4>
        <p className={styles.libraryRef}>{kitapliktan.bookRef}</p>
        <div className={`${styles.body} ${styles.dropcap}`}>
          {kitapliktan.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
      <div className={styles.ornament} aria-hidden="true">
        ❦
      </div>
      <div className={styles.adBox}>
        <h3 className={styles.adTitle}>{abone.title}</h3>
        <p className={styles.adText}>{abone.text}</p>
        <input
          type="email"
          className={styles.adInput}
          placeholder={abone.placeholder}
          aria-label={abone.placeholder}
        />
        <button type="button" className={styles.adButton}>
          {abone.button}
        </button>
      </div>
      <div className={styles.pageNo}>— 4 —</div>
    </div>
  )
}

/* ---------- Ana bileşen ---------- */

export function GazeteBook() {
  const bookRef = useRef(null)
  const hostRef = useRef(null)
  const rasterRef = useRef(null)
  const engineRef = useRef(null)

  const [pos, setPos] = useState(0)
  const [turn, setTurn] = useState(null)
  const [portrait, setPortrait] = useState(false)
  const [texturesReady, setTexturesReady] = useState(false)

  const posRef = useRef(0)
  const turnRef = useRef(null)
  const portraitRef = useRef(false)
  const pRef = useRef(0)
  const velRef = useRef(0)
  const rafRef = useRef(0)
  const dragRef = useRef(null)
  const busyRef = useRef(false)
  const tiltRef = useRef(-0.55)
  const visualRef = useRef(false)

  posRef.current = pos
  turnRef.current = turn
  portraitRef.current = portrait

  const maxPos = portrait ? PAGE_COUNT - 1 : SPREADS.length - 1

  const setP = useCallback((v) => {
    pRef.current = v
    bookRef.current?.style.setProperty('--p', String(v))
    engineRef.current?.setProgress(v, tiltRef.current)
  }, [])

  const finishTurn = useCallback((target) => {
    const t = turnRef.current?.t
    busyRef.current = false
    // canvas burada GİZLENMEZ — yeni spread DOM'a boyandıktan sonra
    // (layout effect) gizlenir; yoksa bitişte bir karelik titreme olur
    if (t == null) {
      engineRef.current?.endTurn()
      return
    }
    const newPos = target === 1 ? t + 1 : t
    posRef.current = newPos
    turnRef.current = null
    setPos(newPos)
    setTurn(null)
    velRef.current = 0
  }, [])

  const springTo = useCallback(
    (target, finalize) => {
      cancelAnimationFrame(rafRef.current)
      // Görsel motor yoksa ya da hareket azaltılmışsa: anlık geçiş
      if (
        finalize &&
        (!visualRef.current ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      ) {
        setP(target)
        finishTurn(target)
        return
      }
      busyRef.current = finalize
      let last = performance.now()
      const step = (now) => {
        if (!turnRef.current) {
          busyRef.current = false
          return
        }
        const dt = Math.min((now - last) / 1000, 1 / 30)
        last = now
        const k = 150
        const c = 23
        const x = pRef.current
        const v = velRef.current
        let nv = v + (k * (target - x) - c * v) * dt
        let nx = x + nv * dt
        if (nx > 1) {
          nx = 1
          nv = Math.min(nv, 0)
        } else if (nx < 0) {
          nx = 0
          nv = Math.max(nv, 0)
        }
        velRef.current = nv
        if (Math.abs(target - nx) < 0.0025 && Math.abs(nv) < 0.02) {
          setP(target)
          velRef.current = 0
          if (finalize) finishTurn(target)
          return
        }
        setP(nx)
        rafRef.current = requestAnimationFrame(step)
      }
      rafRef.current = requestAnimationFrame(step)
    },
    [setP, finishTurn],
  )

  /* side: 0 = ileri dönüş (yaprak sağda düz başlar),
     1 = geri dönüş (yaprak solda düz başlar). İlk kare her zaman
     alttaki DOM'u TAM örten uçta çizilir — slot değişimi görünmez. */
  const startTurn = useCallback(
    (t, side) => {
      if (turnRef.current?.t === t) return
      cancelAnimationFrame(rafRef.current)
      velRef.current = 0
      const isP = portraitRef.current
      const front = isP ? t : SPREADS[t][1]
      const back = isP ? null : SPREADS[t + 1][0]
      visualRef.current = engineRef.current?.beginTurn(front, back, side) ?? false
      turnRef.current = { t }
      setTurn({ t })
      setP(side)
    },
    [setP],
  )

  const flipNext = useCallback(() => {
    if (busyRef.current || posRef.current >= (portraitRef.current ? PAGE_COUNT - 1 : SPREADS.length - 1))
      return
    if (!turnRef.current) {
      tiltRef.current = -0.55
      startTurn(posRef.current, 0)
    }
    springTo(1, true)
  }, [startTurn, springTo])

  const flipPrev = useCallback(() => {
    if (busyRef.current || posRef.current <= 0) return
    if (!turnRef.current) {
      tiltRef.current = -0.55
      startTurn(posRef.current - 1, 1)
    }
    springTo(0, true)
  }, [startTurn, springTo])

  /* Kenar kancası: fareyle gelince köşe hafifçe kalkar */
  const peek = useCallback(
    (enter) => {
      if (dragRef.current || busyRef.current || !engineRef.current?.texturesReady) return
      if (enter) {
        if (posRef.current >= (portraitRef.current ? PAGE_COUNT - 1 : SPREADS.length - 1)) return
        if (!turnRef.current) {
          tiltRef.current = -0.7
          startTurn(posRef.current, 0)
        }
        springTo(0.06, false)
      } else if (turnRef.current && !busyRef.current) {
        springTo(0, true)
      }
    },
    [startTurn, springTo],
  )

  /* Bölge sınırında enter/leave titreşimini yut: çıkış 140ms
     gecikmeli işlenir, tekrar girilirse iptal edilir */
  const peekLeaveTimerRef = useRef(0)
  const peekEnter = useCallback(() => {
    clearTimeout(peekLeaveTimerRef.current)
    peek(true)
  }, [peek])
  const peekLeave = useCallback(() => {
    clearTimeout(peekLeaveTimerRef.current)
    peekLeaveTimerRef.current = setTimeout(() => peek(false), 140)
  }, [peek])

  /* ---------- Sürükleme ---------- */

  const pointerDown = useCallback(
    (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return
      if (e.target.closest('input, button, a')) return
      if (!engineRef.current?.texturesReady) return
      const rect = bookRef.current.getBoundingClientRect()
      if (!rect.width) return
      const isPortrait = portraitRef.current
      const spineX = isPortrait ? rect.left : rect.left + rect.width / 2
      const pageW = isPortrait ? rect.width : rect.width / 2
      const span = isPortrait ? pageW : 2 * pageW
      const dx = e.clientX - spineX
      const p = posRef.current
      const max = isPortrait ? PAGE_COUNT - 1 : SPREADS.length - 1

      let t = null
      if (isPortrait) {
        if (dx > pageW * 0.6 && p < max) t = p
        else if (dx < pageW * 0.25 && p > 0) t = p - 1
      } else {
        if (dx > 0 && p < max) t = p
        else if (dx < 0 && p > 0) t = p - 1
      }
      if (t == null) return

      cancelAnimationFrame(rafRef.current)
      busyRef.current = false
      // Tutulan köşe → kıvrım ekseninin eğimi (üst köşe +, alt köşe −)
      const cy = rect.top + rect.height / 2
      tiltRef.current = Math.max(-1, Math.min(1, -((e.clientY - cy) / (rect.height / 2)))) * 0.8
      const initP = Math.min(Math.max((pageW - dx) / span, 0), 1)
      if (turnRef.current?.t !== t) startTurn(t, initP > 0.5 ? 1 : 0)
      else setP(initP)
      dragRef.current = { spineX, span, pageW, lastX: e.clientX, lastT: performance.now() }
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {}
    },
    [startTurn, setP],
  )

  const pointerMove = useCallback(
    (e) => {
      const d = dragRef.current
      if (!d) return
      const dx = e.clientX - d.spineX
      const p = Math.min(Math.max((d.pageW - dx) / d.span, 0), 1)
      const now = performance.now()
      const dt = Math.max(now - d.lastT, 8) / 1000
      const rawVel = ((d.lastX - e.clientX) / d.span) / dt
      velRef.current = Math.max(-5, Math.min(5, rawVel))
      d.lastX = e.clientX
      d.lastT = now
      setP(p)
    },
    [setP],
  )

  const pointerUp = useCallback(() => {
    const d = dragRef.current
    if (!d) return
    dragRef.current = null
    const v = velRef.current
    const p = pRef.current
    const target = v > 1.4 ? 1 : v < -1.4 ? 0 : p > 0.5 ? 1 : 0
    springTo(target, true)
  }, [springTo])

  /* ---------- Motor ---------- */

  useEffect(() => {
    const engine = new CurlEngine(hostRef.current)
    engineRef.current = engine
    if (process.env.NODE_ENV !== 'production' || window.location.search.includes('gazete-debug'))
      window.__gazeteEngine = engine
    return () => {
      engineRef.current = null
      engine.dispose()
    }
  }, [])

  /* ---------- Doku üretimi: GERÇEK sayfa boyutunda ----------
     Doku, ölçülen sayfa genişliğinde dizilip rasterize edilir;
     böylece justify/heceleme satır kırılımları DOM ile birebir
     aynı olur — yaprak sayfayı örttüğünde metin "kaymaz". */

  const rasterSizeRef = useRef({ w: 0, h: 0 })
  const rebuildTokenRef = useRef(0)
  const rebuildTimerRef = useRef(0)

  const rebuildTextures = useCallback(async (w, h) => {
    const engine = engineRef.current
    const bin = rasterRef.current
    if (!engine?.ok || !bin) return
    // dönüş sürerken doku değiştirme — bitince tekrar dene
    if (turnRef.current) {
      clearTimeout(rebuildTimerRef.current)
      rebuildTimerRef.current = setTimeout(() => rebuildTextures(w, h), 400)
      return
    }
    const token = ++rebuildTokenRef.current
    const nodes = bin.querySelectorAll('[data-raster]')
    nodes.forEach((n) => {
      n.style.width = `${w}px`
      n.style.height = `${h}px`
    })
    try {
      for (let i = 0; i < nodes.length; i++) {
        const canvas = await rasterizePage(nodes[i], w, h, 2)
        if (rebuildTokenRef.current !== token || engineRef.current !== engine) return
        // bu arada dönüş başladıysa: swap'i erteleyip baştan dene
        if (turnRef.current) {
          clearTimeout(rebuildTimerRef.current)
          rebuildTimerRef.current = setTimeout(() => rebuildTextures(w, h), 400)
          return
        }
        engine.setTextureFromCanvas(i, canvas)
      }
      rasterSizeRef.current = { w, h }
      setTexturesReady(true)
    } catch (err) {
      console.warn('gazete: sayfa dokuları üretilemedi — animasyonsuz mod', err)
    }
  }, [])

  /* Dönüş bitti → canvas'ı DOM güncellendikten sonra, aynı boyama
     karesinde gizle (bitişte tek karelik titremeyi önler) */
  useLayoutEffect(() => {
    if (turn === null) engineRef.current?.endTurn()
  }, [turn])

  /* Kitap geometrisi → motor sahnesi (yeniden boyutlanınca da).
     Sayfa boyutu değiştiyse dokular gerçek boyutta yeniden üretilir. */
  useEffect(() => {
    const book = bookRef.current
    const host = hostRef.current
    const apply = () => {
      const rect = book.getBoundingClientRect()
      if (!rect.width) return
      const isP = portraitRef.current
      const W = isP ? rect.width : rect.width / 2
      const H = rect.height
      const mL = W * 1.15
      const mR = W * 0.18
      const mY = H * 0.09
      const spineX = isP ? 0 : rect.width / 2
      host.style.left = `${spineX - mL}px`
      host.style.top = `${-mY}px`
      host.style.width = `${mL + W + mR}px`
      host.style.height = `${H + 2 * mY}px`
      engineRef.current?.resize(W, H, mL, mR, mY)

      // boyut değişti → dokuları gerçek ölçüde tazele (debounce)
      const cur = rasterSizeRef.current
      if (Math.abs(cur.w - W) > 0.5 || Math.abs(cur.h - H) > 0.5) {
        clearTimeout(rebuildTimerRef.current)
        rebuildTimerRef.current = setTimeout(() => rebuildTextures(W, H), 300)
      }
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(book)
    return () => {
      ro.disconnect()
      clearTimeout(rebuildTimerRef.current)
    }
  }, [portrait, rebuildTextures])

  /* ---------- Klavye + responsive ---------- */

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') flipNext()
      if (e.key === 'ArrowLeft') flipPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipNext, flipPrev])

  useEffect(() => {
    const apply = () => {
      const isP = window.innerWidth < 640
      setPortrait((prev) => {
        if (prev === isP) return prev
        // spread ↔ sayfa indeksi eşlemesi; süren dönüş iptal edilir
        turnRef.current = null
        busyRef.current = false
        engineRef.current?.endTurn()
        setTurn(null)
        setP(0)
        setPos((cur) => {
          const next = isP
            ? cur === 0
              ? 0
              : cur === 1
                ? 1
                : 3
            : cur === 0
              ? 0
              : cur < 3
                ? 1
                : 2
          posRef.current = next
          return next
        })
        return isP
      })
    }
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(apply, 200)
    }
    apply()
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [setP])

  /* ---------- Görünüm ---------- */

  let leftPage, rightPage
  if (portrait) {
    leftPage = null
    rightPage = turn ? Math.min(turn.t + 1, PAGE_COUNT - 1) : pos
  } else if (turn) {
    leftPage = SPREADS[turn.t][0]
    rightPage = SPREADS[turn.t + 1][1]
  } else {
    leftPage = SPREADS[pos][0]
    rightPage = SPREADS[pos][1]
  }

  const indicator = portrait
    ? `${pos + 1}`
    : pos === 0
      ? '1'
      : pos === maxPos
        ? `${PAGE_COUNT}`
        : `${pos * 2}–${pos * 2 + 1}`

  return (
    <div className={`${styles.bookArea} ${fontVars}`}>
      <div
        ref={bookRef}
        className={`${styles.book} ${portrait ? styles.bookPortrait : ''}`}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
      >
        {/* Duran sol sayfa */}
        {!portrait && (
          <div className={styles.slotLeft}>
            {leftPage != null && (
              <div className={styles.page} lang="tr">
                <PageContent index={leftPage} />
                <div className={styles.spineShadeL} />
              </div>
            )}
          </div>
        )}

        {/* Duran sağ sayfa */}
        <div className={portrait ? styles.slotFull : styles.slotRight}>
          {rightPage != null && (
            <div className={styles.page} lang="tr">
              <PageContent index={rightPage} />
              {!portrait && <div className={styles.spineShadeR} />}
            </div>
          )}
        </div>

        {/* WebGL kıvrım tuvali (yalnız dönüş sırasında görünür) */}
        <div ref={hostRef} className={styles.curlHost} />

        {/* Kenar kancası (hover peek + cursor) */}
        <div
          className={styles.edgeZoneR}
          onMouseEnter={peekEnter}
          onMouseLeave={peekLeave}
        />
      </div>

      {/* Doku kaynağı: ekran dışında, gerçek CSS ile dizilmiş 4 sayfa */}
      <div ref={rasterRef} className={styles.rasterBin} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            data-raster
            lang="tr"
            className={`${styles.page} ${fontVars}`}
            style={{ width: RASTER_W, height: RASTER_H }}
          >
            <PageContent index={i} />
          </div>
        ))}
      </div>

      {/* Kontroller */}
      <nav className={styles.controls} aria-label="Sayfa kontrolleri">
        <button
          type="button"
          className={styles.controlBtn}
          onClick={flipPrev}
          disabled={pos === 0}
          aria-label="Evvelki sahife"
        >
          ‹ Evvelki
        </button>
        <span className={styles.pageIndicator}>
          Sahife {indicator} / {PAGE_COUNT}
        </span>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={flipNext}
          disabled={pos === maxPos}
          aria-label="Sonraki sahife"
        >
          Sonraki ›
        </button>
      </nav>

      <p className={styles.hint}>
        {texturesReady
          ? 'Sayfayı köşesinden tutup sürükleyin — ok tuşları da iş görür'
          : 'Sayfalar hazırlanıyor…'}
      </p>
    </div>
  )
}
