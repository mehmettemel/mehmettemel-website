// Kaynak: ~/Desktop/gida-arastirma/output/konserve-balik/ (claims.json türevleri)
// Yazı dili: doğal-dil persona (kaynak/kurum gösterme yok, hüküm cümleleri,
// düz paragraflar). Kanıt dereceleri YALNIZCA görsel bloklarda taşınır.
// confidence: strong | moderate | weak | speculative

export const review = {
  slug: 'konserve-balik',
  title: 'Konserve Balık',
  subtitle:
    'Millet konserveyi son çare sanıyor. Kutunun içinde olan biteni öğrenince fikir değişiyor.',
  emoji: '🐟',
  date: '2026-07-03',
  category: 'gida',
  tags: ['konserve balık', 'omega-3', 'cıva', 'gıda güvenliği', 'beslenme'],

  heroStats: [
    { value: '2-5', unit: 'yıl', label: 'Açılmamış kutu rafta durur', confidence: 'moderate' },
    { value: '10×', unit: '', label: 'Aynı balıkta mevsime göre omega-3 farkı', confidence: 'weak' },
    { value: '%80', unit: '', label: 'Süzüp durulayınca giden eklenmiş tuz', confidence: 'moderate' },
    { value: '5×', unit: '', label: 'Yağda paketlide D vitamini farkı', confidence: 'moderate' },
  ],

  blocks: [
    {
      type: 'prose',
      body: [
        'Konserve balık deyince herkesin aklına ton balığı geliyor, omega-3 deyince de yine ton balığı. İkisi de yanlış. Ton aslında yağlı balık bile sayılmaz; sardalyanın, uskumrunun yanında omega-3 açısından cılız kalır. Yani spor salonundan çıkıp protein niyetine ton açan adam yanlış iş yapmıyor da, omega-3 için açan adam boşa kürek çekiyor.',
        'Kutunun kendisine gelelim. Konserve balık kutunun içinde pişer. Fabrikada balık kutuya konur, kapak kapanır, sonra yüz yirmi dereceye kadar basınçla ısıtılır. O yüzden konserveyi açıp direkt yiyebilirsin, ısıtmak güvenlik meselesi değil damak meselesi. Aynı ısı kılçıkları da yumuşatır. Kılçığını ayıklayıp atan adam aslında o öğünün kalsiyumunu çöpe atıyor, farkında değil.',
        'Bir de şu var: taze balık her zaman konserveden iyi sanılır. Değil. Konservelik balık avdan kısa süre sonra işlenir; tezgahta iki gün bekleyen "taze" balıktan daha taze olduğu çok olur. Isıl işlemde doku su kaybettiği için protein ve mineraller gram başına yoğunlaşır bile. Kaybeden taraf B vitaminleri, onların bir kısmı o sıcaklıkta gidiyor. Gerisi yerinde duruyor.',
      ],
    },

    {
      type: 'processStrip',
      title: 'Kutunun içinde ne oluyor?',
      subtitle: 'Avdan rafa altı adım',
      steps: [
        {
          icon: '🎣',
          step: 'Av',
          detail: 'Omega-3 daha teknede belli olur: aynı balık ilkbaharda cılız, sonbaharda yağlı. Fark on kata çıkabilir.',
        },
        {
          icon: '🏭',
          step: 'Fabrikaya hızlı giriş',
          detail: 'Balık avdan kısa süre sonra işlenir. Tezgahta günlerce bekleyen balığın aksine burada saat sayılır.',
        },
        {
          icon: '🫗',
          step: 'Kutuya doldurma',
          detail: 'Tuz + yağ veya su. Bu tercih, hangi besinin üründe kalacağını baştan belirler.',
        },
        {
          icon: '🔥',
          step: 'Basınçlı pişirme (~120°C)',
          detail: 'Balık kutunun içinde tam pişer. Kılçık yumuşar, mikrop kalmaz. Fatura B vitaminlerine kesilir.',
        },
        {
          icon: '💧',
          step: 'Su kaybı',
          detail: 'Doku suyunun bir kısmını bırakır; protein, yağ ve mineraller gram başına yoğunlaşır.',
        },
        {
          icon: '🥫',
          step: 'Kapak + raf',
          detail: 'Kutu sağlam kaldıkça içerik steril. Serin bir dolapta iki ila beş yıl kalitesini korur.',
        },
      ],
    },

    {
      type: 'compareBars',
      title: 'Yağda mı, suda mı?',
      subtitle: '100 gram süzülmüş ürün üzerinden',
      labels: { a: 'Yağda paketli', b: 'Suda paketli' },
      items: [
        {
          metric: 'D vitamini',
          unit: 'mcg',
          a: 6.7,
          b: 1.2,
          verdict: 'D vitamini yağda çözünür, balığın yağıyla birlikte kutuda kalır. Fark beş kattan fazla.',
          confidence: 'moderate',
        },
        {
          metric: 'Selenyum',
          unit: 'mcg',
          a: 60,
          b: 71,
          verdict: 'Herkes yağda paketliyi zengin sanır. Selenyum yağda değil ette durur; suda paketli hafif önde.',
          confidence: 'weak',
          mythBusting: true,
        },
        {
          metric: 'Kalori',
          unit: 'kcal',
          a: 198,
          b: 86,
          verdict: 'Suda paketli yarıdan az. Diyet yapan için karar burada biter.',
          confidence: 'moderate',
        },
        {
          metric: 'Yağ',
          unit: 'g',
          a: 8.2,
          b: 0.96,
          verdict: 'Sekiz kata yakın fark. Yağını dökmeyeceksen sorun değil, dökeceksen boşa para.',
          confidence: 'moderate',
        },
      ],
      footnote:
        'Kural basit: suyunu dökeceksen suda paketli al, omega-3 balığın içinde kalır. Yağını ekmeğe banacaksan yağda paketli al, D vitamini de omega-3 de o yağın içinde.',
    },

    {
      type: 'prose',
      body: [
        'Cıva meselesi konservenin en gerçek riski. Büyük balık küçük balığı yer, cıva zincirde yukarı doğru birikir. O yüzden iri gövdeli beyaz ton, ufak tefek açık renkli tondan daha cıvalıdır ve gebelikte sınırlar ciddi düşer. Resmi öneriler bile kendi aralarında anlaşamamış durumda; biri haftada üç kutuya kadar der, öbürü yarısında keser. Çocuklarda hesap daha da sıkı çünkü aynı miktar cıva ufak bedende orantısız yüke dönüşüyor.',
        'İkinci risk histamin. Ton ve uskumru ailesinde balık bozulmaya yüz tutunca histamin oluşur ve bu şey pişirmeyle yok olmaz. Kutu normal görünür, koku normal, yersin ve yarım saat içinde yüz kızarması, çarpıntı, baş ağrısı. Zehirlenme değil alerji sanırsın, olay o yüzden çoğu zaman yanlış teşhis edilir. Açtığın konserveyi kutusunda bekletmemenin asıl sebebi bu.',
        'Tuza da bak. Suda paketli sade bir kutu makul seviyededir de, tütsülenmiş ringa gibi ürünler tansiyon hastasına fişek gibi gelir. Süzüp durulamak eklenen tuzun beşte dördünü götürüyor, otuz saniyelik iş. Kutu kaplamasındaki plastik kimyasalı hikayesi ise eskisi kadar korkutucu değil; sektör kaplamaların neredeyse tamamını değiştirdi, ama eski stok hâlâ piyasada dönüyor (kutunun üstünde yazmaz tabii).',
      ],
    },

    {
      type: 'portionGuide',
      title: 'Ne kadar yiyebilirim?',
      subtitle: 'Haftalık güvenli miktar — düşük cıvalı türler için',
      groups: [
        { id: 'adult-light', label: 'Yetişkin · açık ton', amount: '2-3 porsiyon', detail: 'porsiyon ~113g', grams: 340, confidence: 'strong' },
        { id: 'adult-alba', label: 'Yetişkin · beyaz ton', amount: 'en fazla 1 porsiyon', detail: '~170g', grams: 170, confidence: 'strong' },
        { id: 'preg-light', label: 'Gebe/emziren · açık ton', amount: '170-340g arası', detail: 'öneriler ikiye bölünmüş durumda', grams: 255, confidence: 'moderate', conflict: true },
        { id: 'preg-alba', label: 'Gebe/emziren · beyaz ton', amount: 'en fazla ~113g', detail: '', grams: 113, confidence: 'moderate' },
        { id: 'child-1-3', label: 'Çocuk 1-3 yaş', amount: '2 × ~28g', detail: '', grams: 56, confidence: 'strong' },
        { id: 'child-4-7', label: 'Çocuk 4-7 yaş', amount: '2 × ~57g', detail: '', grams: 114, confidence: 'strong' },
        { id: 'child-8-10', label: 'Çocuk 8-10 yaş', amount: '2 × ~85g', detail: '', grams: 170, confidence: 'strong' },
        { id: 'child-11', label: 'Çocuk 11+ yaş', amount: '2 × ~113g', detail: 'yetişkinle aynı', grams: 226, confidence: 'strong' },
      ],
      maxGrams: 340,
      whyNote:
        'Beyaz tonda sınırın düşük olmasının sebebi boyu: büyük balık küçük balığı yiye yiye cıva biriktirir. Çocukta sınırın düşük olmasının sebebi de kilo: aynı cıva, küçük bedende büyük doz.',
    },

    {
      type: 'mythCards',
      title: 'Sanıyorduk ki… / Aslında…',
      cards: [
        {
          myth: 'Konserve ton, omega-3 deposu.',
          fact: 'Ton yağlı balık değil. Omega-3 istiyorsan sardalya, uskumru, somon.',
          confidence: 'moderate',
        },
        {
          myth: 'Taze balık her zaman konserveden üstün.',
          fact: 'Protein ve minerallerde fark yok, bazen konserve önde. Kaybeden sadece B vitaminleri.',
          confidence: 'moderate',
        },
        {
          myth: 'Kılçıklar ayıklanıp atılır.',
          fact: 'Basınçlı pişirme kılçığı yumuşatmış zaten. Atarsan öğünün kalsiyumunu atmış olursun.',
          confidence: 'weak',
        },
        {
          myth: 'Yağda paketli her mineralde daha zengin.',
          fact: 'D vitamininde evet, selenyumda hayır. Selenyum ette durur, yağda değil.',
          confidence: 'weak',
        },
        {
          myth: 'Konserve yemeden önce ısıtılmalı.',
          fact: 'Kutuda zaten pişmiş. Isıtmak damak zevki, güvenlikle ilgisi yok.',
          confidence: 'moderate',
        },
      ],
    },

    {
      type: 'flowChecklist',
      title: 'Kutu kontrolü',
      subtitle: 'Buzdolabı kapağına asılık',
      sections: [
        {
          title: 'Açmadan önce',
          items: [
            { check: 'Kutu şişmiş mi?', result: 'Açma, direkt çöpe — botulizm şakası olmaz', danger: true },
            { check: 'Dikişte derin ezik, pas var mı?', result: 'At. Yüzeysel ezik sorun değil', danger: true },
          ],
        },
        {
          title: 'Açtıktan sonra',
          items: [
            { check: 'Ton / sardalya', result: '3-4 gün · buzdolabı · cam veya plastik kapta' },
            { check: 'Ançüez', result: 'bir haftaya kadar idare eder' },
            { check: 'Ekşi koku, gri renk, sümüksü doku?', result: 'Tatmadan at', danger: true },
          ],
        },
      ],
    },

    {
      type: 'dataTable',
      title: 'İlaçla arası nasıl?',
      subtitle: 'Bilinen etkileşimler',
      columns: ['Kombinasyon', 'Durum', 'Kanıt'],
      rows: [
        {
          cells: ['Normal porsiyon balık + kan sulandırıcı', 'Sorun çıkarmıyor', 'moderate'],
        },
        {
          cells: ['Yüksek doz balık yağı hapı + kan sulandırıcı', 'Kanama riski artabilir', 'moderate'],
          danger: true,
        },
        {
          cells: ['Bekletilmiş/bozulmaya yakın konserve + MAOI antidepresan', 'Tansiyon krizi riski', 'weak'],
          danger: true,
        },
        {
          cells: ['Kılçıklı konserve + brokoli/lahana', 'Kalsiyum emilimine teorik destek', 'speculative'],
        },
      ],
    },

    {
      type: 'callout',
      tone: 'tip',
      title: 'Aklında kalacaklar',
      body: [
        'Omega-3 istiyorsan sardalya veya uskumru al, ton değil.',
        'Kılçığı atma, kalsiyum orada.',
        'Suyunu dökeceksen suda paketli, yağını kullanacaksan yağda paketli.',
        'Tuzuna dikkat ediyorsan süz ve durula.',
        'Şişmiş kutuyu açmadan at. Pazarlığı yok.',
      ],
    },

    {
      type: 'evidenceMap',
      title: 'Bu sayfa neye dayanıyor?',
      subtitle: '27 iddia tek tek tarandı, her biri kanıt gücüne göre etiketlendi',
      byConfidence: { strong: 2, moderate: 14, weak: 9, speculative: 2 },
      byCategory: {
        'Besin/emilim': 11,
        'Güvenlik': 11,
        'Gıda-ilaç': 2,
        'Saklama': 2,
        'Gıda-gıda': 1,
      },
      note: 'Zayıf ve spekülatif etiketli sayılar bu sayfada kesik çizgili çerçeveyle işaretli; güçlü kanıtla aynı ağırlıkta sunulmadı.',
    },
  ],
}
