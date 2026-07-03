// Kaynak: ~/Desktop/gida-arastirma/output/konserve-balik/ (claims.json türevleri)
// /analiz skill'i tarafından üretilen blok tabanlı analiz yazısı.
// confidence: strong | moderate | weak | speculative
// weak/speculative bloklar görsel olarak "kesik çizgili" işaretlenir.

export const review = {
  slug: 'konserve-balik',
  title: 'Konserve Balık',
  subtitle:
    'Kutunun içinde ne oluyor? Omega-3, cıva, kılçık ve yağda/suda ikilemi — 27 iddialık kanıt taramasının analizi.',
  emoji: '🐟',
  date: '2026-07-03',
  category: 'gida',
  tags: ['konserve balık', 'omega-3', 'cıva', 'gıda güvenliği', 'beslenme'],
  readingHint: '27 iddia · 5 infografik · kanıt dereceli',

  heroStats: [
    { value: '2-5', unit: 'yıl', label: 'Açılmamış kutu raf ömrü', confidence: 'moderate' },
    { value: '10×', unit: '', label: 'Aynı türde mevsimsel omega-3 farkı', confidence: 'weak' },
    { value: '%80', unit: '', label: 'Süzüp durulamayla atılan eklenmiş sodyum', confidence: 'moderate' },
    { value: '5-6×', unit: '', label: 'Yağda paketlide D vitamini avantajı', confidence: 'moderate' },
  ],

  blocks: [
    {
      type: 'prose',
      title: 'Özet',
      body: [
        'Konserve balık, özellikle **uskumru, ringa ve sardalya** gibi yağlı türlerde yüksek ve iyi biyoyararlanımlı omega-3 (EPA+DHA) sunar. Konserve **ton balığı ise bu grupta sayılmaz** — omega-3 açısından belirgin şekilde daha zayıftır.',
        'Kemikleriyle yenen konserve somon ve sardalyadaki kalsiyum, kalsiyum karbonat takviyesine yakın oranda emilir. En sağlam güvenlik uyarıları **cıva** (özellikle albacore ton ve gebelik) ve **histamin/skombroid zehirlenmesi** etrafında toplanıyor; sodyum ve BPA riskleri de var ama kanıt tabanı daha zayıf.',
      ],
    },

    {
      type: 'processStrip',
      title: 'Kutunun içinde ne oluyor?',
      subtitle: 'Avdan rafa: her adımda besin profili değişiyor',
      steps: [
        {
          step: 'Av / hasat',
          detail: 'Omega-3 içeriği türe ve av mevsimine göre büyük farklılık gösterir — ringa Nisan\'da ~0,08g iken Eylül\'de ~1,39g EPA+DHA/200g.',
        },
        {
          step: 'Fabrikaya hızlı ulaştırma',
          detail: 'Balık genelde avdan kısa süre sonra işlenir; günlerce bekleyebilen "taze" balığa kıyasla tazelik avantajı sağlayabilir.',
        },
        {
          step: 'Doldurma: tuz + yağ veya su',
          detail: 'Yağda mı suda mı paketlendiği, hangi besinlerin üründe kalacağını belirler.',
        },
        {
          step: 'Sterilizasyon (115-121°C)',
          detail: 'Balık kutunun İÇİNDE pişer, kılçıklar yumuşar, C. botulinum dahil mikroorganizmalar ölür — ama ısıya duyarlı B vitaminleri (tiamin, riboflavin, niasin) kısmen kaybolur.',
        },
        {
          step: 'Su kaybı → konsantrasyon',
          detail: 'Doku %5-13 su kaybeder; protein/yağ/mineraller ağırlıkça yoğunlaşır — konservenin bazı besinlerde tazeye eşit hatta üstün çıkmasının nedeni.',
        },
        {
          step: 'Soğutma + sızdırmaz kapak',
          detail: 'Kutu bütünlüğü bozulmadıkça içerik pratik olarak steril kalır: 2-5 yıl.',
        },
      ],
    },

    {
      type: 'compareBars',
      title: 'Yağda mı, suda mı?',
      subtitle: '100g süzülmüş ürün — USDA verisi',
      labels: { a: 'Yağda paketli', b: 'Suda paketli' },
      items: [
        {
          metric: 'D vitamini',
          unit: 'mcg',
          a: 6.7,
          b: 1.2,
          verdict: 'Yağda paketli ~5-6 kat zengin: D vitamini yağda çözünür, balığın yağıyla üründe kalır.',
          confidence: 'moderate',
        },
        {
          metric: 'Selenyum',
          unit: 'mcg',
          a: 60,
          b: 71,
          verdict: 'Mit çürütme: popüler "yağda daha zengin" iddiası yanlış — selenyum kas proteinine bağlıdır, suda paketli hafif önde.',
          confidence: 'weak',
          mythBusting: true,
        },
        {
          metric: 'Kalori',
          unit: 'kcal',
          a: 198,
          b: 86,
          verdict: 'Suda paketli yarıdan az kalori.',
          confidence: 'moderate',
        },
        {
          metric: 'Yağ',
          unit: 'g',
          a: 8.2,
          b: 0.96,
          verdict: 'Suda paketli belirgin şekilde düşük.',
          confidence: 'moderate',
        },
      ],
      footnote:
        'Omega-3 için kural sıvıya bağlı: suyu dökeceksen suda paketli seç (omega-3 balıkta kalır); yağını kullanacaksan yağda paketli seç — hem omega-3 hem D vitamini yağla birlikte korunur.',
    },

    {
      type: 'portionGuide',
      title: 'Ne kadar yiyebilirim?',
      subtitle: 'Haftalık güvenli porsiyon — düşük cıvalı "en iyi seçim" türleri',
      groups: [
        { id: 'adult-light', label: 'Yetişkin · light ton', amount: '2-3 porsiyon', detail: '~113g/porsiyon', grams: 340, confidence: 'strong' },
        { id: 'adult-alba', label: 'Yetişkin · albacore', amount: '≤1 porsiyon', detail: '~170g', grams: 170, confidence: 'strong' },
        { id: 'preg-light', label: 'Gebe/emziren · light ton', amount: '≤340g (FDA) / ≤170g (ACOG)', detail: 'kurumlar arası görüş ayrılığı', grams: 255, confidence: 'moderate', conflict: true },
        { id: 'preg-alba', label: 'Gebe/emziren · albacore', amount: '≤113g', detail: '', grams: 113, confidence: 'moderate' },
        { id: 'child-1-3', label: 'Çocuk 1-3 yaş', amount: '2 × ~28g', detail: '', grams: 56, confidence: 'strong' },
        { id: 'child-4-7', label: 'Çocuk 4-7 yaş', amount: '2 × ~57g', detail: '', grams: 114, confidence: 'strong' },
        { id: 'child-8-10', label: 'Çocuk 8-10 yaş', amount: '2 × ~85g', detail: '', grams: 170, confidence: 'strong' },
        { id: 'child-11', label: 'Çocuk 11+ yaş', amount: '2 × ~113g', detail: 'yetişkin porsiyonu', grams: 226, confidence: 'strong' },
      ],
      maxGrams: 340,
      whyNote:
        'Albacore ve büyük balıklarda sınır daha düşük çünkü metil-cıva besin zincirinde birikir (biyomagnifikasyon); çocuklarda vücut ağırlığı düşük olduğundan aynı miktar orantısız yüksek doza denk gelir.',
    },

    {
      type: 'mythCards',
      title: 'Sanıyorduk ki… / Aslında…',
      cards: [
        {
          myth: 'Konserve ton balığı da diğer yağlı balıklar gibi omega-3 deposu.',
          fact: 'Ton "yağlı balık" sınıfına girmez; sardalya/uskumru/somona göre belirgin daha az omega-3 içerir.',
          confidence: 'moderate',
        },
        {
          myth: 'Konserve balık, tazeden besince geri kalır.',
          fact: 'Protein/omega-3/mineral açısından genelde geri kalmaz, bazen üstündür; ama B vitaminleri ısıl işlemde kısmen kaybolur.',
          confidence: 'moderate',
        },
        {
          myth: 'Kılçıklar atılmalı, yenmez.',
          fact: 'Isı/basınç kılçığı yumuşatır; atmak, öğündeki kalsiyumun büyük kısmını da atmak demektir.',
          confidence: 'weak',
        },
        {
          myth: 'Yağda paketli ton hem D vitamini hem selenyum açısından zengindir.',
          fact: 'D vitamini kısmı doğru, selenyum kısmı yanlış — USDA verisiyle suda paketli hafif önde.',
          confidence: 'weak',
        },
        {
          myth: 'Konserve balığı yemeden önce mutlaka ısıtmak gerekir.',
          fact: 'Kutunun içinde zaten tam pişmiştir; ısıtma güvenlik değil, tat/doku tercihidir.',
          confidence: 'moderate',
        },
      ],
    },

    {
      type: 'prose',
      title: 'Tüketim güvenliği',
      body: [
        'FDA balıkta cıva için **1 ppm** sınırı uygular; light (açık) ton genelde albacore\'dan daha düşük cıva içerir. Gebelikte kurumlar ayrışıyor: FDA haftada ≤340g light ton derken ACOG ≤170g diyor; bazı tüketici kuruluşları marka değişkenliği nedeniyle tam kaçınmayı savunuyor.',
        'Scombridae ailesinde (ton, uskumru) **histamin ısıl işlemle yok edilmez** — görünüşte normal bir konservede bile skombroid zehirlenmesi (yüz kızarması, çarpıntı, baş ağrısı; 10-60 dk içinde) görülebilir. Bölgesel bir taramada sardalyada ortalama ~49,7 mg/kg histamin ölçüldü; FDA\'nın 35 ppm eşiğinin üzerinde — ancak tek bölgesel çalışma.',
        'Kutu kaplamasından **BPA geçişi** yaygın saptanmış (bir taramada 52/52 örnek, ort. ~28 ng/g); endüstri kutuların ~%95\'inin BPA içermeyen kaplamaya geçtiğini bildiriyor. **Sodyum** üründe büyük fark gösterir: suda ton ~280-360mg iken tütsülenmiş ringa 100g\'da 1000mg\'a çıkabilir — süzüp durulamak eklenen sodyumun ~%80\'ini azaltır.',
      ],
    },

    {
      type: 'flowChecklist',
      title: 'Kutu güvenlik kontrolü',
      subtitle: 'Buzdolabı kapağına asılık versiyon',
      sections: [
        {
          title: 'Açmadan önce',
          items: [
            { check: 'Kutu şişmiş (bombeleşmiş) mi?', result: 'AÇMA, at — botulizm riski', danger: true },
            { check: 'Dikişi etkileyen derin ezik / paslanma?', result: 'At; yüzeysel kozmetik ezik güvenlidir', danger: true },
          ],
        },
        {
          title: 'Açtıktan sonra',
          items: [
            { check: 'Ton / sardalya', result: '3-4 gün · buzdolabı · cam/plastik kap' },
            { check: 'Ançüez', result: '~7 gün · buzdolabı' },
            { check: 'Ekşi koku, donuk gri renk, sümüksü doku?', result: 'Tatmadan at', danger: true },
          ],
        },
      ],
    },

    {
      type: 'dataTable',
      title: 'Etkileşimler',
      subtitle: 'Gıda-gıda ve gıda-ilaç',
      columns: ['Kombinasyon', 'Yön', 'Kanıt'],
      rows: [
        {
          cells: ['Standart omega-3 (1-2g/gün) + warfarin', 'Etki yok — n=573 kohortta anlamlı fark bulunmadı', 'moderate'],
        },
        {
          cells: ['Yüksek doz balık yağı (>3g/gün) + warfarin', 'Risk — olası artmış kanama', 'moderate'],
          danger: true,
        },
        {
          cells: ['Yüksek histaminli konserve + MAO inhibitörleri', 'Risk — hipertansif kriz (vaka raporu düzeyi)', 'weak'],
          danger: true,
        },
        {
          cells: ['Kemikli konserve (Ca+D) + bitkisel kalsiyum', 'Teorik destek — doğrudan insan çalışması yok', 'speculative'],
        },
      ],
    },

    {
      type: 'callout',
      tone: 'tip',
      title: 'Pratik özet',
      body: [
        'Omega-3 istiyorsan sardalya/uskumru/somon seç, ton değil.',
        'Kılçıkları atma — kalsiyumun büyük kısmı orada.',
        'Suyu dökeceksen suda paketli, yağını kullanacaksan yağda paketli al.',
        'Sodyuma dikkat ediyorsan süzüp durula (~%80 azalır).',
        'Şişmiş/ezik/paslı kutuyu açmadan at.',
      ],
    },

    {
      type: 'evidenceMap',
      title: 'Kanıt haritası',
      subtitle: '27 iddia · claims.json · 2026-07-03 — şeffaflık: her sayı bir kanıt derecesine bağlı',
      byConfidence: { strong: 2, moderate: 14, weak: 9, speculative: 2 },
      byCategory: {
        'Biyoyararlanım': 11,
        'Güvenlik': 11,
        'Gıda-ilaç': 2,
        'Saklama': 2,
        'Gıda-gıda': 1,
      },
      note: 'Zayıf/spekülatif etiketli değerler bu sayfada kesik çizgili çerçeveyle işaretlendi ve güçlü kanıtla aynı görsel ağırlıkta sunulmadı. USDA FSIS birincil kaynağına erişim engellendiği (403) için saklama süreleri ikincil kaynaklardan derlendi.',
    },
  ],
}
