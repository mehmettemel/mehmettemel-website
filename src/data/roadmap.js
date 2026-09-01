/**
 * Roadmap — checkbox'lı, iç içe geçebilen yol haritası.
 *
 * Her düğüm:
 *   id       : benzersiz, SABİT kalmalı (localStorage bu id ile tutuyor — değiştirirsen işaret kaybolur)
 *   label    : görünen metin
 *   info     : opsiyonel, (i) ikonuyla açılan açıklama
 *   children : opsiyonel, alt maddeler — istenilen derinlikte iç içe
 *
 * En üstteki düğümler kart olarak görünür. Bir maddeyi işaretlemek altındaki
 * her şeyi işaretler; bazıları işaretliyse üst madde "yarım" (—) görünür.
 */

export const title = 'Roadmap'
export const subtitle =
  'AI Interface Engineer · ~12 ay · AI ürünlerinin insanla temas eden katmanının uzmanı'

export const roadmap = [
  {
    id: 'asama0',
    label: 'Aşama 0 — Zemin: Yargılama Katmanları (Ay 1-3)',
    info: 'Niş: AI ürünlerinin insanla temas eden katmanının uzmanı — etkileşim, güven, kontrol. Uygulama sahası: Wellness / davranış değişimi ürünleri. Kuzey yıldızı: "AI özelliği ekleyen her ekibin danışmak isteyeceği kişi" olmak.\n\nKullanım: Sıralı ilerle. Bir aşamayı bitirmeden sonrakine geçme — derinlik, sıçramayla değil katmanla oluşur.\n\nNişin üstüne oturacağı çekirdek. Burada hedef "her şeyi bilmek" değil — nişin doğrudan kullandığı katmanlarda DERİN, gerisinde YETERLİ olmak.',
    children: [
      {
        id: 'asama0-derin',
        label: 'Derin katmanlar (nişin çekirdeği)',
        children: [
          {
            id: 'asama0-derin-1',
            label: 'JS Çalışma Zamanı: Event loop, micro/macrotask, closure, async akış kontrolü',
            info: 'Streaming UI\'ların tamamı buna dayanır.',
          },
          {
            id: 'asama0-derin-2',
            label: 'React Render Mekaniği: Render → reconciliation → commit, batching, concurrent özellikler (useTransition, useDeferredValue)',
            info: 'Token akarken arayüzü akıcı tutmanın temeli.',
          },
          {
            id: 'asama0-derin-3',
            label: 'Server/Client State Mimarisi: Cache, invalidation, optimistic update, race condition',
            info: 'AI yanıtları "bayatlayabilen veri"nin en uç örneği.',
          },
          {
            id: 'asama0-derin-4',
            label: 'LLM Mekaniği: Token, context window, temperature, halüsinasyonun yapısal sebebi, function calling, yapılandırılmış çıktı',
            info: 'Yargılayacağın sistemin iç işleyişi.',
          },
          { id: 'asama0-derin-5', label: 'Streaming & Realtime Desenler: SSE vs WebSocket, backpressure, kısmi veri render\'ı, iptal (abort) mekaniği' },
        ],
      },
      {
        id: 'asama0-yeterli',
        label: 'Yeterli katmanlar (bilinç seviyesi — 1\'er hafta)',
        children: [
          {
            id: 'asama0-yeterli-1',
            label: 'Network temelleri: HTTP yaşam döngüsü, caching, CORS',
            info: 'AI API\'leriyle her gün karşılaşacaksın.',
          },
          { id: 'asama0-yeterli-2', label: 'Güvenlik: XSS, prompt injection\'ın UI\'a yansımaları, API key yönetimi' },
          { id: 'asama0-yeterli-3', label: 'Performans ölçümü: DevTools Performance + React Profiler okuyabilmek' },
        ],
      },
      {
        id: 'asama0-cikis',
        label: 'Çıkış Kriteri',
        children: [
          { id: 'asama0-cikis-1', label: 'AI\'ın yazdığı bir streaming chat bileşenini satır satır analiz edip 5+ somut sorun bulabiliyorum (yazılı olarak kanıtla — bu ilk blog yazın olsun)' },
        ],
      },
    ],
  },

  {
    id: 'asama1',
    label: 'Aşama 1 — Niş Yetkinlikler: AI Etkileşim Desenleri (Ay 3-6)',
    info: 'Nişin asıl gövdesi. Her deseni ÖĞREN + KÜÇÜK BİR DEMO ile İNŞA ET. Demolar birikip "desen kütüphanen" olacak — nişteki en güçlü varlığın.',
    children: [
      {
        id: 'asama1-1',
        label: '1. Akış ve gecikme tasarımı',
        children: [
          { id: 'asama1-1-1', label: 'Token-by-token render: karakter mi, kelime mi, cümle mi? Okunabilirlik vs hız dengesi' },
          { id: 'asama1-1-2', label: 'Akıllı iskelet durumları: "AI düşünüyor" anını anlamlı kılmak (adım gösterimi, tahmini süre)' },
          { id: 'asama1-1-3', label: 'Kesintiye dayanıklılık: durdur, devam et, yeniden üret akışları' },
          { id: 'asama1-1-4', label: 'Demo: Üç farklı streaming stratejisini yan yana gösteren karşılaştırma sayfası' },
        ],
      },
      {
        id: 'asama1-2',
        label: '2. Güven ve belirsizlik gösterimi',
        children: [
          { id: 'asama1-2-1', label: 'Kaynak şeffaflığı: alıntı/citation UI desenleri, "nereden biliyorsun" cevabı' },
          { id: 'asama1-2-2', label: 'Belirsizlik iletişimi: AI emin değilken arayüz bunu nasıl söyler? (dil, görsel, davranış)' },
          { id: 'asama1-2-3', label: 'Halüsinasyon sınırlama UI\'ları: doğrulanabilir alanları ayırma, kullanıcıya kontrol noktaları verme' },
          { id: 'asama1-2-4', label: 'Psikoloji bağlantısı: güven kalibrasyonu literatürünü oku (aşırı güven de az güven kadar zararlı)' },
          { id: 'asama1-2-5', label: 'Demo: Aynı AI cevabını "güven tasarımlı" ve "tasarımsız" gösteren before/after' },
        ],
      },
      {
        id: 'asama1-3',
        label: '3. Human-in-the-loop akışları',
        children: [
          { id: 'asama1-3-1', label: 'Onay desenleri: AI önerdi → insan düzenledi → sistem uyguladı akışının UI\'ı' },
          { id: 'asama1-3-2', label: 'Düzenlenebilir AI çıktısı: inline edit, kısmi kabul, versiyon karşılaştırma' },
          { id: 'asama1-3-3', label: 'Geri alma ve düzeltme: kullanıcı AI\'ın hatasını nasıl zahmetsizce düzeltir?' },
          { id: 'asama1-3-4', label: 'Demo: AI destekli bir form/doküman akışında tam HITL döngüsü' },
        ],
      },
      {
        id: 'asama1-4',
        label: '4. Agent gözlemlenebilirliği',
        children: [
          { id: 'asama1-4-1', label: 'Çok adımlı AI işlemlerini izlenebilir kılmak: adım listesi, canlı durum, ara çıktılar' },
          { id: 'asama1-4-2', label: 'Kontrol hissi: duraklat, yönlendir, iptal et — kullanıcı direksiyonu bırakmadan' },
          { id: 'asama1-4-3', label: 'Hata anları: agent takıldığında arayüz ne yapar? (sessiz çökme = güven ölümü)' },
          { id: 'asama1-4-4', label: 'Demo: Sahte bir çok-adımlı agent\'ın çalışmasını gösteren izleme paneli' },
        ],
      },
      {
        id: 'asama1-5',
        label: '5. Konuşma-dışı AI etkileşimi',
        children: [
          { id: 'asama1-5-1', label: 'Chat her şeyin cevabı değil: buton, slider, kanvas, öneri çipleri ile AI etkileşimi' },
          { id: 'asama1-5-2', label: 'Proaktif AI: sistem ne zaman kendiliğinden konuşmalı, ne zaman susmalı? (dikkat psikolojisi)' },
          { id: 'asama1-5-3', label: 'Kademeli açığa çıkarma: AI gücünü yeni kullanıcıyı boğmadan sunmak' },
          { id: 'asama1-5-4', label: 'Demo: Aynı görevi chat\'le ve chat\'siz çözen iki arayüz karşılaştırması' },
        ],
      },
      {
        id: 'asama1-6',
        label: '6. Davranış psikolojisi köprüsü (senin ayrıştırıcın)',
        children: [
          { id: 'asama1-6-1', label: 'Bilişsel yük teorisi → AI arayüzlerinde bilgi dozajı' },
          {
            id: 'asama1-6-2',
            label: 'Otomasyon önyargısı (automation bias): insanlar AI\'a ne zaman körü körüne güvenir, arayüz bunu nasıl dengeler?',
          },
          { id: 'asama1-6-3', label: 'Alışkanlık döngüleri → etik engagement: bağımlılık yaratmadan devamlılık tasarımı' },
          { id: 'asama1-6-4', label: 'Her okuduğun psikoloji kavramını 1 somut UI desenine çevir ve not et ("kavram → desen" defteri)' },
        ],
      },
      {
        id: 'asama1-cikis',
        label: 'Çıkış Kriteri',
        children: [
          { id: 'asama1-cikis-1', label: '6 desen alanının her birinde 1 çalışan demo + kısa yazılı analiz yayında (desen kütüphanesi sitede)' },
        ],
      },
    ],
  },

  {
    id: 'asama2',
    label: 'Aşama 2 — Uygulama Sahası: Wellness Ürünü (Ay 6-9)',
    info: 'Desenleri gerçek bir üründe, gerçek kullanıcılarla sınama zamanı. Ürün amacın kendisi değil — nişinin KANITI.',
    children: [
      {
        id: 'asama2-adimlar',
        label: 'Ürün ve kanıt',
        children: [
          {
            id: 'asama2-adim-1',
            label: 'Ürünü tanımla: wellness/davranış değişimi alanında, en az 3 niş desenini kullanan TEK ürün',
            info: 'Örnek: AI destekli reflection aracı — streaming + güven tasarımı + HITL bir arada.',
          },
          { id: 'asama2-adim-2', label: 'Etik sınır dokümanı: "Bu ürün ne değildir" + kriz yönlendirme akışı (mental sağlık teması varsa şart)' },
          { id: 'asama2-adim-3', label: 'MVP\'yi 6 haftada yayınla — kapsam dondur' },
          { id: 'asama2-adim-4', label: '20+ gerçek kullanıcıdan etkileşim verisi ve geri bildirim topla' },
          { id: 'asama2-adim-5', label: 'Kullanıcıların AI\'a güven davranışını GÖZLEMLE ve belgele (bu gözlemler altın değerinde içerik)' },
          { id: 'asama2-adim-6', label: 'Büyük case study yaz: "Bir wellness ürününde AI güven tasarımı — kararlar, ölçümler, öğrenilenler"' },
        ],
      },
      {
        id: 'asama2-cikis',
        label: 'Çıkış Kriteri',
        children: [
          { id: 'asama2-cikis-1', label: 'Yayında bir ürün + kullanıcı verisine dayalı bir case study — artık "teorik" değil "uygulamış" uzmansın' },
        ],
      },
    ],
  },

  {
    id: 'asama3',
    label: 'Aşama 3 — Otorite ve Gelir (Ay 9-12)',
    children: [
      {
        id: 'asama3-otorite',
        label: 'Otorite inşası',
        children: [
          { id: 'asama3-otorite-1', label: 'Ayda 2 yazı — tek tema: AI etkileşim tasarımı (desen kütüphanen + ürün gözlemlerin hazır malzeme)' },
          { id: 'asama3-otorite-2', label: 'En iyi 2 yazıyı İngilizce yayınla (nişin küresel sohbeti İngilizce dönüyor)' },
          { id: 'asama3-otorite-3', label: 'Nişteki 20 kişiyi belirle (AI UX yazarları, design engineer\'lar) ve düzenli etkileşim kur' },
          { id: 'asama3-otorite-4', label: '1 konuşma/podcast: "AI arayüzlerinde güven tasarımı" — Türkçe topluluklar başlangıç için ideal' },
        ],
      },
      {
        id: 'asama3-gelir',
        label: 'Gelir — iki yol, tek hazırlık',
        info: '10. ayda odak seç. İkisi de kapanmaz, sadece ağırlık değişir.',
        children: [
          {
            id: 'asama3-gelir-a',
            label: 'Yol A · Şirket',
            children: [
              { id: 'asama3-gelir-a-1', label: 'Hedef liste: AI-first ürün şirketleri + AI özelliği ekleyen wellness/sağlık şirketleri (15-20)' },
              { id: 'asama3-gelir-a-2', label: 'Başvuru merkezi: desen kütüphanesi + case study (CV değil, kanıt konuşur)' },
              { id: 'asama3-gelir-a-3', label: 'Haftada 2 İngilizce mock interview + AI ürün tasarımı vaka çalışması' },
            ],
          },
          {
            id: 'asama3-gelir-b',
            label: 'Yol B · Bağımsız',
            children: [
              { id: 'asama3-gelir-b-1', label: 'Ürünü gelire bağla: ilk ödeme yapan kullanıcı' },
              {
                id: 'asama3-gelir-b-2',
                label: 'Danışmanlık teklifi hazırla: "AI özelliğinizin etkileşim denetimi" — desen kütüphanen satış aracın',
              },
              { id: 'asama3-gelir-b-3', label: 'Build in public: metrikleri şeffaf paylaşarak görünürlüğü büyüt' },
            ],
          },
        ],
      },
      {
        id: 'asama3-cikis',
        label: 'Çıkış Kriteri',
        children: [
          { id: 'asama3-cikis-1', label: 'Nişinden gelen ilk gelir (maaş, danışmanlık veya ürün geliri — hangisi olduğu fark etmez)' },
        ],
      },
    ],
  },

  {
    id: 'katman-3',
    label: 'Katman 3 — JavaScript Motoru ve Çalışma Zamanı',
    info: 'Öncelik 1 (çekirdek — günlük işinin %80\'i: 3 → 2 → 5 → 6 sırayla). JS\'te yazılmış her şeyin neden öyle davrandığının cevabı burada.',
    children: [
      { id: 'katman-3-1', label: 'Event loop (micro/macrotask)' },
      { id: 'katman-3-2', label: 'Call stack' },
      { id: 'katman-3-3', label: 'Closure ve scope' },
      { id: 'katman-3-4', label: 'Prototype zinciri ve this' },
      { id: 'katman-3-5', label: 'Bellek yönetimi ve garbage collection' },
      { id: 'katman-3-6', label: 'Modül sistemleri: ESM/CJS farkı ve neden hâlâ sorun çıkardığı' },
    ],
  },

  {
    id: 'katman-2',
    label: 'Katman 2 — Tarayıcının İç Yapısı',
    info: 'Öncelik 1 (çekirdek). Senin asıl "makinen". AI\'ın yazdığı bir animasyonun neden kasacağını ancak bu katmanla öngörebilirsin.',
    children: [
      { id: 'katman-2-1', label: 'HTML/CSS parsing' },
      { id: 'katman-2-2', label: 'DOM ve CSSOM inşası' },
      { id: 'katman-2-3', label: 'Render pipeline: style → layout → paint → composite' },
      { id: 'katman-2-4', label: 'Reflow ile repaint farkı' },
      { id: 'katman-2-5', label: 'Hangi CSS özelliğinin hangi aşamayı tetiklediği' },
      { id: 'katman-2-6', label: 'GPU compositing' },
      { id: 'katman-2-7', label: 'Critical rendering path' },
    ],
  },

  {
    id: 'katman-5',
    label: 'Katman 5 — Framework Mekaniği',
    info: 'Öncelik 1 (çekirdek). React\'i kullanmak değil, anlamak.',
    children: [
      { id: 'katman-5-1', label: 'Render → reconciliation → commit döngüsü' },
      { id: 'katman-5-2', label: 'Fiber mimarisinin ne çözdüğü' },
      { id: 'katman-5-3', label: 'key\'lerin gerçek rolü' },
      { id: 'katman-5-4', label: 'Batching' },
      { id: 'katman-5-5', label: 'Concurrent özellikler' },
      {
        id: 'katman-5-6',
        label: 'Render stratejileri: CSR, SSR, SSG, ISR, Server Components',
        info: 'Her birinin ödünleşimi (trade-off) farklı — hangisini ne zaman seçtiğini gerekçelendirebilmek gerek.',
      },
      { id: 'katman-5-7', label: 'Hydration nedir, neden pahalıdır' },
    ],
  },

  {
    id: 'katman-6',
    label: 'Katman 6 — Veri ve State Mimarisi',
    info: 'Öncelik 1 (çekirdek). AI kod yazarken en çok mimari hatayı bu katmanda yapar — yargılayacak göz burada çok değerli.',
    children: [
      { id: 'katman-6-1', label: 'Server / client / derived state ayrımı' },
      { id: 'katman-6-2', label: 'Cache invalidation' },
      { id: 'katman-6-3', label: 'Optimistic update' },
      { id: 'katman-6-4', label: 'Race condition\'lar' },
      { id: 'katman-6-5', label: 'Normalizasyon' },
      { id: 'katman-6-6', label: 'Realtime verinin cache modeline entegrasyonu' },
    ],
  },

  {
    id: 'katman-1',
    label: 'Katman 1 — Ağ ve Web Platformu',
    info: 'Öncelik 2 (senior\'u ayıran katmanlardan: 1 → 7 → 8). Her şey burada başlar. Bunu bilmeyen "site yavaş" dendiğinde nereye bakacağını bilemez; bilen waterfall\'a bakıp sorunu 30 saniyede daraltır.',
    children: [
      { id: 'katman-1-1', label: 'DNS çözümleme' },
      { id: 'katman-1-2', label: 'TCP/TLS el sıkışması' },
      { id: 'katman-1-3', label: 'HTTP\'nin evrimi: 1.1 → 2 → 3 farkları ve neden önemli' },
      { id: 'katman-1-4', label: 'İstek/yanıt yaşam döngüsü' },
      { id: 'katman-1-5', label: 'Caching mekaniği: Cache-Control, ETag, CDN\'lerin rolü' },
      { id: 'katman-1-6', label: 'Cookie\'ler ve SameSite' },
      { id: 'katman-1-7', label: 'CORS' },
    ],
  },

  {
    id: 'katman-7',
    label: 'Katman 7 — Güvenlik',
    info: 'Öncelik 2 (senior\'u ayıran katmanlardan). "Bu kod güvenli mi?" sorusunun cevabı tamamen bu katman.',
    children: [
      {
        id: 'katman-7-1',
        label: 'XSS türleri ve React\'in nereden koruyup nereden korumadığı',
        info: 'dangerouslySetInnerHTML, href injection gibi React\'in seni KORUMADIĞI noktalar özellikle önemli.',
      },
      { id: 'katman-7-2', label: 'CSRF' },
      { id: 'katman-7-3', label: 'CSP' },
      { id: 'katman-7-4', label: 'Auth desenleri: session vs JWT, OAuth akışı' },
      { id: 'katman-7-5', label: 'Dependency / supply-chain riskleri' },
    ],
  },

  {
    id: 'katman-8',
    label: 'Katman 8 — Performans ve Ölçüm',
    info: 'Öncelik 2 (senior\'u ayıran katmanlardan). Ölçemeyen, yargılayamaz.',
    children: [
      { id: 'katman-8-1', label: 'Core Web Vitals\'ın her birinin ne ölçtüğü' },
      { id: 'katman-8-2', label: 'Bundle analizi' },
      { id: 'katman-8-3', label: 'Code splitting' },
      { id: 'katman-8-4', label: 'Lazy loading' },
      {
        id: 'katman-8-5',
        label: 'Profiling araçlarını okuyabilmek',
        info: 'DevTools Performance sekmesi ve React Profiler — en önemlisi bu.',
      },
    ],
  },

  {
    id: 'katman-4',
    label: 'Katman 4 — Tip Sistemi',
    info: 'Öncelik 3 (paralel serpiştirilebilir: 4 → 9 → 10). TypeScript\'i araç değil dil olarak bilmek — AI\'ın ürettiği tiplerdeki "any kaçağını" veya yanlış daraltmayı yakalamak için.',
    children: [
      { id: 'katman-4-1', label: 'Structural typing mantığı' },
      { id: 'katman-4-2', label: 'Union / narrowing' },
      { id: 'katman-4-3', label: 'Generics' },
      { id: 'katman-4-4', label: 'Tip çıkarımının nasıl çalıştığı' },
    ],
  },

  {
    id: 'katman-9',
    label: 'Katman 9 — Tooling\'in İçi',
    info: 'Öncelik 3 (paralel serpiştirilebilir). "Sihirli görünen" araçları şeffaflaştıran katman.',
    children: [
      { id: 'katman-9-1', label: 'Bundler\'ların gerçekte ne yaptığı: AST, transpile, tree shaking, minification' },
      { id: 'katman-9-2', label: 'Vite\'ın neden hızlı olduğu' },
      { id: 'katman-9-3', label: 'Source map\'ler' },
    ],
  },

  {
    id: 'katman-10',
    label: 'Katman 10 — LLM\'lerin Çalışma Mantığı',
    info: 'Öncelik 3 (paralel serpiştirilebilir, yeni zorunlu katman). AI\'ın çıktısını yargılamak için AI\'ın nasıl ürettiğini bilmen gerekiyor — bu artık sistemin bir parçası.',
    children: [
      { id: 'katman-10-1', label: 'Token, context window, temperature' },
      { id: 'katman-10-2', label: 'Halüsinasyonun neden yapısal olduğu' },
      { id: 'katman-10-3', label: 'Modelin neyi "bilip" neyi uyduramayacağı' },
    ],
  },

  {
    id: 'ilkeler',
    label: 'Değişmeyen Kurallar',
    children: [
      { id: 'ilkeler-1', label: 'Önce ben, sonra AI: Her deseni önce kendin tasarla, sonra AI ile karşılaştır — yargılama kası böyle çalışır' },
      { id: 'ilkeler-2', label: 'Her öğrenilen desen = 1 demo + 1 kısa yazı: Üretilmeyen bilgi buharlaşır' },
      { id: 'ilkeler-3', label: 'Tek niş, tek tema: Parlak yeni alan fikirleri not defterine, rotaya değil' },
      { id: 'ilkeler-4', label: 'Psikoloji okumaları haftada 2 saat: Ayrıştırıcın körelmesin — ama her okuma UI desenine bağlanmalı' },
      { id: 'ilkeler-5', label: '3 ayda bir pazar testi: Yazılarına/demolarına tepki ölç; sinyal yoksa açıyı düzelt, nişi terk etme' },
    ],
  },

  {
    id: 'hedefler',
    label: '12. Ay Sonu Tablosu',
    info: 'Niş, seçildiği gün değil; birileri seni o işle çağırdığı gün senin olur.',
    children: [
      { id: 'hedefler-desen', label: 'Desen kütüphanesi: 6 alanda çalışan demolar + analizler' },
      { id: 'hedefler-urun', label: 'Ürün: Yayında, gerçek kullanıcılı, 3+ niş deseni içeren' },
      { id: 'hedefler-case-study', label: 'Case study: Kullanıcı verisine dayalı 1 derin inceleme' },
      { id: 'hedefler-icerik', label: 'İçerik: 12+ yazı (2+ İngilizce), 1 konuşma' },
      { id: 'hedefler-gelir', label: 'Gelir: Nişten gelen ilk gelir' },
      { id: 'hedefler-kimlik', label: 'Kimlik: "AI Interface Engineer" — kanıtlarıyla' },
    ],
  },
]
