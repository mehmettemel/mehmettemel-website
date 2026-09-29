/* ============================================================
   3B not bulutu motoru (three.js)

   Fizik (her karede, 3B):
   - kısa menzilli itme: noktalar birbirine yaklaşınca ayrılır
   - bağlantı yayı: bağlı notlar belli mesafede durur
   - zayıf merkez çekimi + yumuşak elipsoid sınır: sert duvar yok,
     dışarı taşan nokta nazikçe geri çekilir (kenara yapışma olmaz);
     elipsoid ekran oranını izler → geniş ekranda küme yatayda dolar
   - salınım (drift): her noktanın kendine özgü fazı, sürekli süzülür

   Dış API: setActive(id), flyTo(id) — kamerayı noktaya döndürür,
   setFilter(ids) — etiket/arama süzgeci, shuffle(), dispose()

   Render:
   - InstancedMesh → tüm küreler tek draw call
   - LineSegments → bağlantılar, tepe renkleriyle vurgu
   - Etiketler HTML katmanı; kameraya en yakın noktalar ve odaktakiler
     görünür, geri kalanı gizli (üst üste binen yazı yok)
   - Renkler CSS değişkenlerinden okunur, tema değişince güncellenir
   ============================================================ */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const CFG = {
  linkLen: 6, // bağlı noktaların dinlenme mesafesi
  spring: 0.03,
  repulse: 0.9,
  repulseRange: 6.4, // bu mesafenin dışında itme yok → dolu, havadar küme
  center: 0.003,
  bound: 18, // yumuşak sınır yarıçapı (elipsoidin kısa ekseni)
  boundK: 0.03,
  maxStretch: 2.1, // geniş ekranda küme yatayda en fazla bu kadar uzar
  damp: 0.9,
  drift: 0.0045, // düşük: sakin, ağır süzülme
  warmup: 260, // ilk karede yerleşmiş görünsün
  fov: 50,
}

const LABEL_BASE =
  'absolute left-0 top-0 whitespace-nowrap text-[11px] leading-none tracking-tight will-change-transform'

function readHsl(name, fallback) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  const parts = raw.split(/\s+/)
  if (parts.length < 3) return new THREE.Color(fallback)
  const [h, s, l] = parts
  return new THREE.Color().setStyle(`hsl(${h}, ${s}, ${l})`)
}

export class GraphEngine {
  constructor(host, graph, handlers = {}) {
    this.host = host
    this.graph = graph
    this.handlers = handlers
    this.n = graph.nodes.length
    this.index = new Map(graph.nodes.map((n, i) => [n.id, i]))
    this.linkIdx = graph.links.map((l) => [
      this.index.get(l.source),
      this.index.get(l.target),
    ])
    this.neighborIdx = graph.nodes.map(
      (n) =>
        new Set([...graph.neighbors.get(n.id)].map((id) => this.index.get(id))),
    )
    this.reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    this.hover = -1
    this.active = -1
    this.fly = -1 // kameranın önüne getirilecek nokta
    this.filter = null // etiket/arama süzgeci: görünür indeks kümesi
    this.userMoved = false
    this.snapColors = true
    this.disposed = false
    this.t = 0
    this.sx = 1 // elipsoid ölçekleri: ekran oranına göre küme uzar
    this.sy = 1

    this.initPhysics()
    this.initScene() // fitCamera → sx/sy belirlenir
    this.randomize() // elipsoid ölçekleriyle yeniden dağıt
    this.initLabels()
    this.applyTheme()
    this.bind()

    for (let i = 0; i < CFG.warmup; i++) this.step(false)

    this.loop = this.loop.bind(this)
    this.raf = requestAnimationFrame(this.loop)
  }

  /* ---------- fizik ---------- */

  initPhysics() {
    const n = this.n
    this.pos = new Float32Array(n * 3)
    this.vel = new Float32Array(n * 3)
    this.phase = new Float32Array(n * 3)
    this.speed = new Float32Array(n)
    this.boost = new Float32Array(n).fill(1)
    this.colCur = new Float32Array(n * 3)
    this.linkColCur = new Float32Array(this.linkIdx.length * 3)
    for (let i = 0; i < n; i++) {
      this.phase[i * 3] = Math.random() * Math.PI * 2
      this.phase[i * 3 + 1] = Math.random() * Math.PI * 2
      this.phase[i * 3 + 2] = Math.random() * Math.PI * 2
      this.speed[i] = 0.0025 + Math.random() * 0.004
    }
    this.randomize()
  }

  randomize() {
    const r0 = CFG.bound * 0.8
    for (let i = 0; i < this.n; i++) {
      // elipsoid içinde düzgün dağılım
      const u = Math.random() * 2 - 1
      const th = Math.random() * Math.PI * 2
      const s = Math.sqrt(1 - u * u)
      const r = r0 * Math.cbrt(Math.random())
      this.pos[i * 3] = r * s * Math.cos(th) * this.sx
      this.pos[i * 3 + 1] = r * s * Math.sin(th) * this.sy
      this.pos[i * 3 + 2] = r * u
      this.vel[i * 3] = this.vel[i * 3 + 1] = this.vel[i * 3 + 2] = 0
    }
  }

  step(withDrift) {
    const { pos, vel, n } = this
    const rr = CFG.repulseRange
    const rr2 = rr * rr

    // kısa menzilli itme — O(n²), 118 nokta için ~7k çift, ucuz
    for (let i = 0; i < n; i++) {
      const ix = i * 3
      for (let j = i + 1; j < n; j++) {
        const jx = j * 3
        const dx = pos[ix] - pos[jx]
        const dy = pos[ix + 1] - pos[jx + 1]
        const dz = pos[ix + 2] - pos[jx + 2]
        const d2 = dx * dx + dy * dy + dz * dz
        if (d2 > rr2 || d2 < 1e-6) continue
        const d = Math.sqrt(d2)
        const k = 1 - d / rr
        const f = (CFG.repulse * k * k) / d
        vel[ix] += dx * f
        vel[ix + 1] += dy * f
        vel[ix + 2] += dz * f
        vel[jx] -= dx * f
        vel[jx + 1] -= dy * f
        vel[jx + 2] -= dz * f
      }
    }

    // bağlantı yayları
    for (const [a, b] of this.linkIdx) {
      const ax = a * 3
      const bx = b * 3
      const dx = pos[bx] - pos[ax]
      const dy = pos[bx + 1] - pos[ax + 1]
      const dz = pos[bx + 2] - pos[ax + 2]
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-3
      const f = (CFG.spring * (d - CFG.linkLen)) / d
      vel[ax] += dx * f
      vel[ax + 1] += dy * f
      vel[ax + 2] += dz * f
      vel[bx] -= dx * f
      vel[bx + 1] -= dy * f
      vel[bx + 2] -= dz * f
    }

    // merkez çekimi + yumuşak elipsoid sınır + salınım + sönüm + entegrasyon
    // Konum elipsoid uzayına ölçeklenir (x/sx, y/sy, z): kuvvetler orada
    // küresel hesaplanır, geri ölçeklenir → küme ekran oranında uzar.
    this.t += 1
    const drift = withDrift && !this.reduceMotion ? CFG.drift : 0
    const isx = 1 / this.sx
    const isy = 1 / this.sy
    for (let i = 0; i < n; i++) {
      const ix = i * 3
      const px = pos[ix] * isx
      const py = pos[ix + 1] * isy
      const pz = pos[ix + 2]
      const r = Math.sqrt(px * px + py * py + pz * pz) || 1e-3
      let pull = CFG.center
      if (r > CFG.bound) pull += (CFG.boundK * (r - CFG.bound)) / r
      vel[ix] -= px * pull * isx
      vel[ix + 1] -= py * pull * isy
      vel[ix + 2] -= pz * pull

      if (drift) {
        const sp = this.speed[i]
        const ph = i * 3
        vel[ix] += drift * Math.sin(this.t * sp + this.phase[ph])
        vel[ix + 1] += drift * Math.cos(this.t * sp + this.phase[ph + 1])
        vel[ix + 2] += drift * Math.sin(this.t * sp * 0.8 + this.phase[ph + 2])
      }

      vel[ix] *= CFG.damp
      vel[ix + 1] *= CFG.damp
      vel[ix + 2] *= CFG.damp
      pos[ix] += vel[ix]
      pos[ix + 1] += vel[ix + 1]
      pos[ix + 2] += vel[ix + 2]
    }
  }

  /* ---------- sahne ---------- */

  initScene() {
    const w = this.host.clientWidth || 1
    const h = this.host.clientHeight || 1

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(w, h)
    renderer.domElement.className = 'block h-full w-full select-none'
    this.host.appendChild(renderer.domElement)
    this.renderer = renderer

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0x000000, 30, 60)

    this.camera = new THREE.PerspectiveCamera(CFG.fov, w / h, 1, 200)
    this.camera.position.set(0, 0, 40)
    this.scene.add(this.camera)

    // ışıklar kameraya bağlı → döndürünce gölgelenme tutarlı kalır
    const key = new THREE.DirectionalLight(0xffffff, 2.3)
    key.position.set(6, 9, 5)
    this.camera.add(key)
    const fill = new THREE.DirectionalLight(0xffffff, 0.7)
    fill.position.set(-7, -4, 3)
    this.camera.add(fill)
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    const controls = new OrbitControls(this.camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.enablePan = false
    controls.minDistance = 16
    controls.maxDistance = 140
    controls.rotateSpeed = 0.6
    controls.autoRotate = !this.reduceMotion
    controls.autoRotateSpeed = 0.28
    controls.addEventListener('start', () => {
      this.userMoved = true
    })
    this.controls = controls

    // küreler
    const geo = new THREE.SphereGeometry(1, 28, 20)
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.62,
      metalness: 0.02,
    })
    const mesh = new THREE.InstancedMesh(geo, mat, this.n)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false
    const white = new THREE.Color(0xffffff)
    for (let i = 0; i < this.n; i++) mesh.setColorAt(i, white)
    mesh.instanceColor.setUsage(THREE.DynamicDrawUsage)
    this.scene.add(mesh)
    this.mesh = mesh

    // bağlantılar
    const m = this.linkIdx.length
    const lgeo = new THREE.BufferGeometry()
    this.linkPos = new Float32Array(m * 2 * 3)
    this.linkCol = new Float32Array(m * 2 * 3)
    lgeo.setAttribute(
      'position',
      new THREE.BufferAttribute(this.linkPos, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    )
    lgeo.setAttribute(
      'color',
      new THREE.BufferAttribute(this.linkCol, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    )
    const lmat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
    })
    const lines = new THREE.LineSegments(lgeo, lmat)
    lines.frustumCulled = false
    this.scene.add(lines)
    this.lines = lines

    this.dummy = new THREE.Object3D()
    this.ray = new THREE.Raycaster()
    this.pointer = new THREE.Vector2(10, 10) // başta tuval dışında
    this.needPick = false
    this.v3 = new THREE.Vector3()
    this.sphere = new THREE.Sphere()
    this.hitV = new THREE.Vector3()

    this.fitCamera()
  }

  fitCamera() {
    const aspect = this.camera.aspect
    // küme ekran oranını izler: yatay ekranda genişler, dikeyde uzar
    if (aspect >= 1) {
      this.sx = THREE.MathUtils.clamp(aspect * 0.9, 1, CFG.maxStretch)
      this.sy = 1
    } else {
      this.sx = 1
      this.sy = THREE.MathUtils.clamp((1 / aspect) * 0.8, 1, 1.8)
    }

    const vfov = THREE.MathUtils.degToRad(CFG.fov)
    const tanV = Math.tan(vfov / 2)
    const tanH = tanV * aspect
    // her iki eksende de küme sığsın; öne yakın noktalar için derinlik payı.
    // Küme sınıra kadar dolmaz (itme menzili kısa), o yüzden fit < 1.
    const fit = aspect < 0.8 ? 0.72 : 0.86
    const need = Math.max(
      (CFG.bound * this.sy * fit) / tanV,
      (CFG.bound * this.sx * fit) / tanH,
    )
    const dist = THREE.MathUtils.clamp(need + CFG.bound * 0.3, 22, 120)
    if (!this.userMoved) this.camera.position.setLength(dist)
    this.scene.fog.near = dist - 6
    this.scene.fog.far = dist + CFG.bound * 1.6
  }

  /* ---------- etiketler ---------- */

  initLabels() {
    const layer = document.createElement('div')
    layer.className = 'pointer-events-none absolute inset-0 overflow-hidden'
    this.labelEls = this.graph.nodes.map((n) => {
      const el = document.createElement('span')
      el.className = `${LABEL_BASE} text-muted-foreground`
      el.textContent = n.title
      el.style.opacity = '0'
      layer.appendChild(el)
      return el
    })
    this.labelOp = new Float32Array(this.n)
    this.labelShown = new Uint8Array(this.n)
    this.labelFocus = new Uint8Array(this.n)
    this.host.appendChild(layer)
    this.labelLayer = layer
  }

  /* ---------- tema ---------- */

  applyTheme() {
    const fg = readHsl('--foreground', 0x2d302d)
    const bg = readHsl('--background', 0xf4f1ea)
    const primary = readHsl('--primary', 0xa3b18a)
    this.colFg = fg
    this.colPrimary = primary
    this.colDim = fg.clone().lerp(bg, 0.72)
    this.colGhost = fg.clone().lerp(bg, 0.86) // süzgeç dışı kalanlar
    this.colLink = bg.clone().lerp(fg, 0.4)
    this.colLinkDim = bg.clone().lerp(fg, 0.14)
    this.scene.fog.color.copy(bg)
    this.snapColors = true
  }

  /* ---------- olaylar ---------- */

  bind() {
    const el = this.renderer.domElement
    this.onMove = (e) => {
      const r = el.getBoundingClientRect()
      this.pointer.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1,
      )
      this.needPick = true
    }
    this.onDown = (e) => {
      this.downAt = { x: e.clientX, y: e.clientY }
    }
    this.onUp = (e) => {
      const d = this.downAt
      this.downAt = null
      if (!d) return
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) return // sürükleme
      this.onMove(e)
      this.pick()
      const id = this.hover >= 0 ? this.graph.nodes[this.hover].id : null
      this.handlers.onClick?.(id)
    }
    this.onLeave = () => {
      this.pointer.set(10, 10)
      this.needPick = true
    }
    el.addEventListener('pointermove', this.onMove)
    el.addEventListener('pointerdown', this.onDown)
    el.addEventListener('pointerup', this.onUp)
    el.addEventListener('pointerleave', this.onLeave)

    this.ro = new ResizeObserver(() => this.resize())
    this.ro.observe(this.host)

    this.mo = new MutationObserver(() => this.applyTheme())
    this.mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  resize() {
    const w = this.host.clientWidth
    const h = this.host.clientHeight
    if (!w || !h) return
    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.fitCamera()
  }

  // ışın–küre kesişimi: 118 küre için doğrudan test, mesh raycast'tan ucuz
  pick() {
    this.needPick = false
    this.ray.setFromCamera(this.pointer, this.camera)
    let best = -1
    let bestD = Infinity
    for (let i = 0; i < this.n; i++) {
      const ix = i * 3
      this.sphere.center.set(this.pos[ix], this.pos[ix + 1], this.pos[ix + 2])
      this.sphere.radius = this.graph.nodes[i].r * this.boost[i] * 1.25
      if (this.ray.ray.intersectSphere(this.sphere, this.hitV)) {
        const d = this.hitV.distanceToSquared(this.ray.ray.origin)
        if (d < bestD) {
          bestD = d
          best = i
        }
      }
    }
    if (best !== this.hover) {
      this.hover = best
      this.host.style.cursor = best >= 0 ? 'pointer' : 'grab'
      this.handlers.onHover?.(best >= 0 ? this.graph.nodes[best].id : null)
    }
  }

  /* ---------- dış API ---------- */

  setActive(id) {
    this.active = id != null ? (this.index.get(id) ?? -1) : -1
  }

  // Kamerayı yumuşakça döndürüp noktayı önüne getirir (mesafe korunur)
  flyTo(id) {
    const i = this.index.get(id)
    this.fly = i == null ? -1 : i
  }

  // ids: null → süzgeç yok; dizi → yalnız bu notlar belirgin
  setFilter(ids) {
    if (!ids) {
      this.filter = null
      return
    }
    this.filter = new Set(ids.map((id) => this.index.get(id)).filter((i) => i != null))
  }

  shuffle() {
    this.randomize()
    this.hover = -1
    this.active = -1
    this.fly = -1
    for (let i = 0; i < 12; i++) this.step(false)
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    const el = this.renderer.domElement
    el.removeEventListener('pointermove', this.onMove)
    el.removeEventListener('pointerdown', this.onDown)
    el.removeEventListener('pointerup', this.onUp)
    el.removeEventListener('pointerleave', this.onLeave)
    this.ro.disconnect()
    this.mo.disconnect()
    this.controls.dispose()
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
    this.lines.geometry.dispose()
    this.lines.material.dispose()
    this.renderer.dispose()
    el.remove()
    this.labelLayer.remove()
    this.host.style.cursor = ''
  }

  /* ---------- kare döngüsü ---------- */

  loop() {
    if (this.disposed) return
    this.step(true)
    if (this.needPick) this.pick()

    const focus = this.hover >= 0 ? this.hover : this.active
    const near = focus >= 0 ? this.neighborIdx[focus] : null
    const lerp = this.snapColors ? 1 : 0.15

    this.updateSpheres(focus, near, lerp)
    this.updateLinks(focus, near, lerp)
    this.updateLabels(focus, near)
    this.snapColors = false

    this.updateFly()
    this.controls.autoRotate =
      !this.reduceMotion && this.hover < 0 && this.active < 0 && this.fly < 0
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.raf = requestAnimationFrame(this.loop)
  }

  // kamera konumunu, mesafeyi koruyarak hedef noktanın doğrultusuna çeker
  updateFly() {
    if (this.fly < 0) return
    const ix = this.fly * 3
    const cam = this.camera.position
    const dist = cam.length()
    this.v3.set(this.pos[ix], this.pos[ix + 1], this.pos[ix + 2])
    if (this.v3.lengthSq() < 1e-4) {
      this.fly = -1
      return
    }
    this.v3.setLength(dist)
    cam.lerp(this.v3, 0.07)
    cam.setLength(dist)
    if (cam.distanceToSquared(this.v3) < 0.05) this.fly = -1
  }

  updateSpheres(focus, near, lerp) {
    const { pos, boost, mesh, dummy, filter } = this
    const colors = mesh.instanceColor.array
    for (let i = 0; i < this.n; i++) {
      const ix = i * 3
      const isFocus = i === focus
      const isNear = near ? near.has(i) : false
      const ghost = filter ? !filter.has(i) && !isFocus && !isNear : false
      const target = isFocus ? 1.45 : isNear ? 1.15 : ghost ? 0.72 : 1
      boost[i] += (target - boost[i]) * 0.18

      const col = isFocus
        ? this.colPrimary
        : ghost
          ? this.colGhost
          : near
            ? isNear
              ? this.colFg
              : this.colDim
            : this.colFg
      colors[ix] += (col.r - colors[ix]) * lerp
      colors[ix + 1] += (col.g - colors[ix + 1]) * lerp
      colors[ix + 2] += (col.b - colors[ix + 2]) * lerp

      const s = this.graph.nodes[i].r * boost[i]
      dummy.position.set(pos[ix], pos[ix + 1], pos[ix + 2])
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
    mesh.instanceColor.needsUpdate = true
  }

  updateLinks(focus, near, lerp) {
    const { pos, linkPos, linkCol } = this
    this.linkIdx.forEach(([a, b], k) => {
      const o = k * 6
      linkPos[o] = pos[a * 3]
      linkPos[o + 1] = pos[a * 3 + 1]
      linkPos[o + 2] = pos[a * 3 + 2]
      linkPos[o + 3] = pos[b * 3]
      linkPos[o + 4] = pos[b * 3 + 1]
      linkPos[o + 5] = pos[b * 3 + 2]

      const touches = focus >= 0 && (a === focus || b === focus)
      const ghost = this.filter && !(this.filter.has(a) && this.filter.has(b))
      const col = touches
        ? this.colPrimary
        : near || ghost
          ? this.colLinkDim
          : this.colLink
      for (let v = 0; v < 6; v += 3) {
        linkCol[o + v] += (col.r - linkCol[o + v]) * lerp
        linkCol[o + v + 1] += (col.g - linkCol[o + v + 1]) * lerp
        linkCol[o + v + 2] += (col.b - linkCol[o + v + 2]) * lerp
      }
    })
    const g = this.lines.geometry
    g.attributes.position.needsUpdate = true
    g.attributes.color.needsUpdate = true
  }

  updateLabels(focus, near) {
    const { pos, camera, v3, labelEls, labelOp } = this
    const w = this.host.clientWidth
    const h = this.host.clientHeight
    if (!w || !h) return
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(CFG.fov) / 2)

    // her nokta için ekran konumu + kameraya uzaklık
    if (!this.proj) {
      this.proj = new Float32Array(this.n * 3) // sx, sy, dist
      this.rank = new Float32Array(this.n)
      this.target = new Float32Array(this.n)
      this.order = Array.from({ length: this.n }, (_, i) => i)
    }
    const { proj, rank, target } = this
    for (let i = 0; i < this.n; i++) {
      const ix = i * 3
      v3.set(pos[ix], pos[ix + 1], pos[ix + 2])
      const dist = v3.distanceTo(camera.position)
      v3.project(camera)
      proj[ix] = ((v3.x + 1) / 2) * w
      proj[ix + 1] = ((1 - v3.y) / 2) * h
      proj[ix + 2] = v3.z > 1 ? Infinity : dist // kamera arkası → gizle
      // görünen etiket sıralamada avantajlı → küme her karede değişmez
      rank[i] = proj[ix + 2] - (labelOp[i] > 0.3 ? 5 : 0)
    }

    // hedef görünürlük
    target.fill(0)
    if (focus >= 0) {
      for (let i = 0; i < this.n; i++) {
        target[i] = i === focus || near.has(i) ? 1 : 0
      }
    } else {
      // kameraya en yakınlar; ekranda çakışanlar atlanır (üst üste yazı yok)
      // büyük ekranda daha çok etiket, süzgeç varsa yalnız süzülenler
      const count = THREE.MathUtils.clamp(Math.round((w * h) / 42000), 4, 28)
      this.order.sort((a, b) => rank[a] - rank[b])
      const placed = []
      let shown = 0
      for (const i of this.order) {
        if (shown >= count) break
        if (proj[i * 3 + 2] === Infinity) break
        if (this.filter && !this.filter.has(i)) continue
        const sx = proj[i * 3]
        const sy = proj[i * 3 + 1]
        const clash = placed.some(
          ([px, py]) => Math.abs(px - sx) < 130 && Math.abs(py - sy) < 28,
        )
        if (clash) continue
        placed.push([sx, sy])
        target[i] = 0.9 - (shown / count) * 0.4 // en yakın en belirgin
        shown += 1
      }
    }

    for (let i = 0; i < this.n; i++) {
      const ix = i * 3
      const tgt = proj[ix + 2] === Infinity ? 0 : target[i]
      labelOp[i] += (tgt - labelOp[i]) * (tgt > labelOp[i] ? 0.1 : 0.16)
      const op = labelOp[i]
      const el = labelEls[i]

      if (op < 0.02 && tgt === 0) {
        if (this.labelShown[i]) {
          el.style.opacity = '0'
          this.labelShown[i] = 0
        }
        continue
      }
      this.labelShown[i] = 1

      const isFocus = focus >= 0 && (i === focus || near.has(i))
      if (isFocus !== !!this.labelFocus[i]) {
        this.labelFocus[i] = isFocus ? 1 : 0
        el.className = `${LABEL_BASE} ${
          isFocus ? 'font-medium text-foreground' : 'text-muted-foreground'
        }`
      }

      // kürenin ekran yarıçapı kadar altına yaz
      const dist = proj[ix + 2]
      const pr =
        ((this.graph.nodes[i].r * this.boost[i]) / (dist * tanHalf)) * (h / 2)
      el.style.transform = `translate3d(${proj[ix].toFixed(1)}px, ${(
        proj[ix + 1] + pr + 5
      ).toFixed(1)}px, 0) translateX(-50%)`
      el.style.opacity = op.toFixed(3)
    }
  }
}
