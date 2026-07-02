/* ============================================================
   WebGL sayfa kıvırma motoru (three.js)

   Gerçek "peel" fiziği: dönen yaprak bir 3B kağıt mesh'idir.
   Sayfa, konumu cilt yönünde ilerleyen sanal bir silindirin
   etrafına sarılarak soyulur — köşe önce kalkar, temas çizgisi
   cilde doğru yürür, kağıt karşı tarafa yuvarlanarak iner.
   Yarıçap sona doğru küçülür; sayfa dümdüz oturur.

   Sayfa dokuları SVG foreignObject ile rasterize edilir:
   gerçek CSS motoru çizer → drop cap, tire, container query
   dahil DOM ile piksel-perfect eşleşir.
   ============================================================ */

import * as THREE from 'three'

const COLS = 64
const ROWS = 12

/* ---------- CSS + font toplama (rasterizasyon için) ---------- */

let cssPromise = null

async function collectCss() {
  if (cssPromise) return cssPromise
  cssPromise = (async () => {
    let css = ''
    for (const sheet of document.styleSheets) {
      let sheetCss = ''
      try {
        for (const rule of sheet.cssRules) sheetCss += rule.cssText + '\n'
      } catch {
        continue /* cross-origin stylesheet — atla */
      }
      // Göreli url(...) referanslarını sheet'in kendi adresine göre mutlaklaştır
      const base = sheet.href || location.href
      sheetCss = sheetCss.replace(/url\((["']?)([^)"']+)\1\)/g, (m, q, u) => {
        if (u.startsWith('data:')) return m
        try {
          return `url("${new URL(u, base).href}")`
        } catch {
          return m
        }
      })
      css += sheetCss
    }
    // Font kaynaklarını data URI'ye göm (SVG <img> içinde dış istek yasak)
    const urls = [
      ...new Set(
        [...css.matchAll(/url\("([^"]+\.woff2?)"\)/g)]
          .map((m) => m[1])
          .filter((u) => u.startsWith(location.origin)),
      ),
    ]
    await Promise.all(
      urls.map(async (u) => {
        try {
          const res = await fetch(u)
          const buf = await res.arrayBuffer()
          let bin = ''
          const bytes = new Uint8Array(buf)
          for (let i = 0; i < bytes.length; i += 8192)
            bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192))
          const b64 = btoa(bin)
          css = css.split(u).join(`data:font/woff2;base64,${b64}`)
        } catch {
          /* font gömülemedi — sistem serif'e düşer */
        }
      }),
    )
    return css
  })()
  return cssPromise
}

/* Bir sayfa düğümünü canvas'a rasterize et (gerçek CSS motoru çizer) */
export async function rasterizePage(node, w, h, scale = 2) {
  await document.fonts.ready
  const css = await collectCss()
  const xhtml = new XMLSerializer().serializeToString(node)
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
    `<foreignObject width="100%" height="100%"><style><![CDATA[${css}]]></style>${xhtml}</foreignObject></svg>`
  const img = new Image()
  img.decoding = 'sync'
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = () => reject(new Error('svg rasterize failed'))
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
  })
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(w * scale)
  canvas.height = Math.round(h * scale)
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)
  ctx.drawImage(img, 0, 0, w, h)
  return canvas
}

/* ---------- Kıvrım gölgesi (temas çizgisini izleyen yumuşak bant) ---------- */

/* ---------- Yaprak yüzü shader'ı ----------
   Deterministik ışık modeli: DÜZ sayfada renk = doku (birebir),
   normal saptıkça fark kadar gölge/parlama + kıvrım sırtında
   ince spek bandı. Işık birimi tahmini yok. */

const leafVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const leafFrag = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform float uMirror;
  uniform float uNSign; // ön yüz +1, arka yüz -1 (three BackSide'da
                        // winding'i çevirdiğinden gl_FrontFacing güvenilmez)
  uniform vec3 uPaper;
  void main() {
    vec3 n = normalize(vNormal) * uNSign;
    vec2 uv = vec2(mix(vUv.x, 1.0 - vUv.x, uMirror), vUv.y);
    vec3 base = uHasMap > 0.5 ? texture2D(uMap, uv).rgb : uPaper;
    vec3 l = normalize(vec3(-0.32, 0.27, 0.91));
    float flat0 = 0.906; // düz sayfanın dot(n,l) değeri → shade 0
    float shade = 0.55 * (dot(n, l) - flat0);
    // spek: düz sayfa taban değeri (~0.51) çıkarılır → düz halde
    // katkı SIFIR, DOM ↔ WebGL geçişinde parlaklık zıplamaz
    float specRaw = pow(max(dot(n, normalize(l + vec3(0.0, 0.0, 1.0))), 0.0), 28.0);
    float spec = max(specRaw - 0.51, 0.0) * 0.22;
    gl_FragColor = vec4(base * (1.0 + shade) + spec, 1.0);
  }
`

const shadowVert = /* glsl */ `
  varying vec2 vXY;
  void main() {
    vXY = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const shadowFrag = /* glsl */ `
  varying vec2 vXY;
  uniform float uD;      // temas çizgisi (dünya x)
  uniform float uR;      // anlık silindir yarıçapı
  uniform float uAmp;    // 0..1 şiddet
  void main() {
    float lead = smoothstep(uD - uR * 0.4, uD + uR * 1.1, vXY.x);
    float tail = 1.0 - smoothstep(uD + uR * 1.2, uD + uR * 3.2, vXY.x);
    float a = lead * tail * uAmp * 0.34;
    gl_FragColor = vec4(0.04, 0.03, 0.02, a);
  }
`

export class CurlEngine {
  constructor(host) {
    this.host = host
    this.ok = false
    this.turning = false
    this.textures = []
    try {
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.domElement.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;display:block'
    host.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(16, 1, 10, 100000)

    // Yaprak geometrisi: (u,v) taban ızgarası her karede deforme edilir
    this.geo = new THREE.PlaneGeometry(1, 1, COLS, ROWS)
    this.base = Float32Array.from(this.geo.attributes.position.array)

    const makeLeafMat = (side, nSign) =>
      new THREE.ShaderMaterial({
        vertexShader: leafVert,
        fragmentShader: leafFrag,
        side,
        uniforms: {
          uMap: { value: null },
          uHasMap: { value: 0 },
          uMirror: { value: 0 },
          uNSign: { value: nSign },
          uPaper: { value: new THREE.Color(0xf0e7d0) },
        },
      })
    this.matF = makeLeafMat(THREE.FrontSide, 1)
    this.matB = makeLeafMat(THREE.BackSide, -1)
    this.matB.uniforms.uMirror.value = 1
    this.meshF = new THREE.Mesh(this.geo, this.matF)
    this.meshB = new THREE.Mesh(this.geo, this.matB)
    this.meshF.renderOrder = 2
    this.meshB.renderOrder = 2
    this.scene.add(this.meshF, this.meshB)

    this.shadowUniforms = {
      uD: { value: 0 },
      uR: { value: 1 },
      uAmp: { value: 0 },
    }
    const shadowMat = new THREE.ShaderMaterial({
      vertexShader: shadowVert,
      fragmentShader: shadowFrag,
      uniforms: this.shadowUniforms,
      transparent: true,
      depthWrite: false,
    })
    this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shadowMat)
    this.shadow.renderOrder = 1
    this.scene.add(this.shadow)

    this.ok = true
  }

  /* Sahneyi kitap piksel geometrisine eşle. spine = dünya x 0. */
  resize(pageW, pageH, marginL, marginR, marginY) {
    if (!this.ok) return
    this.pageW = pageW
    this.pageH = pageH
    const viewW = marginL + pageW + marginR
    const viewH = pageH + marginY * 2
    this.viewW = viewW
    this.viewH = viewH
    // canvas host: sol kenarı spine - marginL
    this.centerX = -marginL + viewW / 2
    this.renderer.setSize(viewW, viewH, false)
    this.camera.aspect = viewW / viewH
    const dist = viewH / 2 / Math.tan((this.camera.fov * Math.PI) / 360)
    this.camera.position.set(this.centerX, 0, dist)
    this.camera.lookAt(this.centerX, 0, 0)
    this.camera.updateProjectionMatrix()
    this.shadow.scale.set(viewW, viewH, 1)
    this.shadow.position.set(this.centerX, 0, 0.5)
    // setSize canvas'ı temizler — süren dönüş varsa son kareyi geri çiz
    if (this.turning && this.lastP != null) this.setProgress(this.lastP, this.lastTilt)
  }

  setTextureFromCanvas(i, canvas) {
    const tex = new THREE.CanvasTexture(canvas)
    // Renk uzayı dönüşümü yok: doku baytları ekrana birebir gider
    tex.colorSpace = THREE.NoColorSpace
    tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy()
    this.textures[i]?.dispose()
    this.textures[i] = tex
  }

  get texturesReady() {
    return this.textures.filter(Boolean).length > 0
  }

  /* front: sayfa dokusu indeksi; back: indeks ya da null (kağıt arkası).
     side: ilk karenin çizileceği uç (0 = sağda düz, 1 = solda düz) —
     yaprak alttaki DOM'u tam örtmüş halde başlar, sızıntı karesi olmaz. */
  beginTurn(front, back, side = 0) {
    if (!this.ok || !this.textures[front]) return false
    this.matF.uniforms.uMap.value = this.textures[front]
    this.matF.uniforms.uHasMap.value = 1
    if (back != null && this.textures[back]) {
      this.matB.uniforms.uMap.value = this.textures[back]
      this.matB.uniforms.uHasMap.value = 1
    } else {
      this.matB.uniforms.uMap.value = null
      this.matB.uniforms.uHasMap.value = 0
    }
    this.turning = true
    this.host.style.opacity = '1'
    this.setProgress(side, -0.55)
    return true
  }

  endTurn() {
    this.turning = false
    if (this.host) this.host.style.opacity = '0'
  }

  /* p: 0..1, tilt: -1..1 (tutulan köşe; + üst, - alt) */
  setProgress(p, tilt = -0.55) {
    if (!this.ok || !this.turning || !this.pageW) return
    this.lastP = p
    this.lastTilt = tilt
    const W = this.pageW
    const H = this.pageH

    // Uçlarda TAM düz çiz: p≈0'da kenar kıvrığı, p≈1'de mikro
    // silindir kalıntısı olmasın — DOM sayfayla piksel piksel çakışır
    const pos0 = this.geo.attributes.position
    if (p < 0.003 || p > 0.997) {
      const flip = p > 0.5 ? -1 : 1
      const arr0 = pos0.array
      const b = this.base
      for (let i = 0; i < arr0.length; i += 3) {
        arr0[i] = flip * (b[i] + 0.5) * W
        arr0[i + 1] = b[i + 1] * H
        arr0[i + 2] = 0
      }
      pos0.needsUpdate = true
      this.geo.computeVertexNormals()
      this.shadowUniforms.uAmp.value = 0
      this.renderer.render(this.scene, this.camera)
      return
    }

    // Temas çizgisi cilde yürür — eğri erken-hızlı: küçük p'de köşe
    // hemen kalkar (hover peek + sürükleme tutuşu hissedilir),
    // sona doğru yavaşlayıp yumuşak iner. Yarıçap sona doğru erir.
    const travel = 1 - Math.pow(1 - p, 1.55)
    const r0 = W * 0.21
    const r = Math.max(r0 * (1 - Math.pow(Math.max(p - 0.45, 0) / 0.55, 1.25)), 0.001)
    const d = W * 0.995 * (1 - travel) - r * 0.35 * travel
    // Eğik eksen: köşeden soyma; inişe doğru düzleşir
    const alpha = 0.42 * tilt * Math.pow(1 - p, 1.7)
    const cosA = Math.cos(alpha)
    const sinA = Math.sin(alpha)
    const yPiv = (tilt > 0 ? 1 : -1) * H * 0.5

    const pos = this.geo.attributes.position
    const arr = pos.array
    const base = this.base
    const PI = Math.PI
    for (let i = 0; i < arr.length; i += 3) {
      // taban ızgara (plane 1×1, merkezli) → sayfa koordinatı
      const bx = (base[i] + 0.5) * W // 0..W (0 = cilt)
      const by = base[i + 1] * H // -H/2..H/2
      const u = bx * cosA + (by - yPiv) * sinA
      let u2, z
      if (u <= d) {
        u2 = u
        z = 0
      } else {
        const s = u - d
        const phi = s / r
        if (phi < PI) {
          u2 = d + Math.sin(phi) * r
          z = (1 - Math.cos(phi)) * r
        } else {
          u2 = d - (s - PI * r)
          z = 2 * r
        }
      }
      const du = u2 - u
      arr[i] = bx + du * cosA
      arr[i + 1] = by + du * sinA
      arr[i + 2] = z
    }
    pos.needsUpdate = true
    this.geo.computeVertexNormals()

    // gölge bandı temas çizgisini izler
    this.shadowUniforms.uD.value = d
    this.shadowUniforms.uR.value = Math.max(r, W * 0.03)
    this.shadowUniforms.uAmp.value = Math.sin(Math.min(p * 1.15, 1) * PI)

    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    if (!this.ok) return
    this.textures.forEach((t) => t?.dispose())
    this.geo.dispose()
    this.matF.dispose()
    this.matB.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
