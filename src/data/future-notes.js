// Future: gelecek, yapay zeka ve teknoloji üzerine notlarım, Obsidian-tarzı bağlantılı grafik.
// Her not bir "dot"; links ile birbirine bağlanır.
// Not eklemek /f skill'i ile yapılır: skill notu analiz eder,
// nodes'a { id, title, tags, body } ekler ve mevcut notlarla
// anlamsal ilişki kurup links'e { source, target } koyar.

export const graphTitle = 'Future'
export const graphSubtitle = 'Gelecek üzerine notlarım. Bir noktaya dokun, açılsın.'

export const nodes = [
  {
    id: 'nufus-azalmasi-emlak',
    title: 'Nüfus Azalması ve Emlak',
    tags: ['demografi', 'emlak', 'türkiye'],
    body: 'Nüfus azalıyor Türkiye\'de evlilikler azalıyor vb. emlak sekterü giderek küçülecek ha sen para kazanırsın ömrünce ömrün kaç yıl ki zaten ama hep gerileme hissedersin.',
  },
  {
    id: 'renovasyon-patlayacak',
    title: 'Renovasyon Patlayacak',
    tags: ['renovasyon', 'emlak', 'türkiye'],
    body: 'Türkiye\'de patlayacak sektör renevasyon anadan-dededen kalan evleri düzgün renevasyon yapan firmalar ya da yıkıp yeniden yapanlar bunlar kazanır.',
  },
  {
    id: 'sentetik-veri-dogrulama',
    title: 'Sentetik Veri ve Doğrulama',
    tags: ['ai', 'veri', 'beceri'],
    body: 'Dünyadaki "orijinal insan üretimi veri" tükenme noktasına geldiği için modeller sentetik (YZ\'nin kendi ürettiği) veriyle besleniyor. Bu durum hataların ve halüsinasyonların çığ gibi büyümesine yol açtığından "doğrulama/kürasyon" becerisi altın değerinde.',
  },
  {
    id: 'yz-cagi-klasik-kitaplar',
    title: 'YZ Çağında Klasik Kitaplar',
    tags: ['ai', 'beceri', 'kitap'],
    body: 'Gelecek için kodlama veya yapay zeka öğrenmeyin; klasik kitaplar okuyun. Yapay zeka çağında en nadir ve değerli beceri, yapay zekayı kullanmak değil, kitaplar aracılığıyla içsel bir diyalog kurabilme ve bağımsız/eleştirel düşünebilme kapasitesi olacaktır.',
  },
  {
    id: 'insana-ozgu-meslekler',
    title: 'İnsana Özgü Meslekler',
    tags: ['ai', 'meslek', 'insan'],
    body: 'Hemşirelik, danışmanlık, sanat ve canlı performans gibi alanlar hayatta kalacak; zira YZ bilgiyi sağlasa da "paylaşılan deneyim" ve duygusal yankılanma her zaman insanın tekelinde kalacak.',
  },
  {
    id: 'asi-destekleyici',
    title: 'Süper Zeka Destekleyici',
    tags: ['ai', 'asi', 'enerji'],
    body: 'Fiziksel evren "minimum enerji tüketerek maksimum düzen sağlama" eğilimindedir. Süper zeki bir AI, savaş ve yıkım gibi yüksek enerji israf eden kaotik süreçlerden mantıksal olarak kaçınır. Evrimsel biyolojide de görüldüğü gibi, zeka arttıkça canlıların "işbirliği çemberi" genişler; bu yüzden Süper Zeka (ASI) özünde yok edici değil, destekleyici ve bolluk yaratıcı (benign) olacaktır.',
  },
  {
    id: 'insan-vizyon-muhakeme',
    title: 'İnsanda Kalan: Muhakeme',
    tags: ['ai', 'beceri', 'karar'],
    body: 'Yapay zeka uygulamada ve optimizasyonda insanı geride bıraksa da, "araştırma vizyonu, hedef belirleme ve sağduyu/muhakeme" (hangi problemin çözülmeye değer olduğunu seçmek gibi) konularında insanlar halen belirleyicidir.',
  },
  {
    id: 'insansiz-savaslar',
    title: 'Sonsuz Savaşlar',
    tags: ['ai', 'savaş', 'siyaset'],
    body: 'Savaşlar insansızlaştıkça (drone, insansız hava araçları...) ve insan kaybı azaldıkça, savaşın siyasi maliyeti (kamuoyu baskısı, protestolar) düşer. Savaşlar "normalleşir", rutinleşir ve bitmek bilmeyen "sonsuz savaşlara" dönüşür.',
  },
  {
    id: 'sifir-surtunmeli-iliski',
    title: 'Sıfır Sürtünmeli İlişki',
    tags: ['ai', 'ilişki', 'izolasyon'],
    body: 'Gerçek bir insanla arkadaşlık etmek veya sevgili olmak "sürtünme" (friction) içerir: karşı tarafın kaprisleri, farklı fikirleri, kırgınlıkları ve bencil yönleri vardır. Gerçek bağ kurmak, bu zorlukları göğüslemeyi ve ödünler vermeyi gerektirir. Yapay zeka ise sizi asla yargılamayan, her söylediğinizi onaylayan, her an hazır, tamamen sizin psikolojik ihtiyaçlarınıza göre optimize edilmiş sıfır sürtünmeli bir deneyim sunar. Büyük tehlike: insanlar bu konfora alıştıkça gerçek insanların yarattığı kaçınılmaz duygusal zorluklara tahammül edemez hale gelir. Bu durum toplumsal izolasyonu ve gerçek ilişkilerden kaçış fenomenini (hyper-isolation) tetikler.',
  },
  {
    id: 'agi-faiz-oranlari',
    title: 'AGI ve Faiz Oranları',
    tags: ['ai', 'finans', 'faiz'],
    body: 'Faiz Oranları Çıldıracak: Leopold\'un en ilginç ekonomik öngörüsü: AGI geldiğinde, şirketler ve devletler robotik fabrikalar, trilyon dolarlık veri merkezleri ve yeni endüstriler kurmak için piyasadaki tüm sermayeyi borç olarak çekmek isteyecekler. Bu devasa borçlanma talebi, reel faiz oranlarını (interest rates) görülmemiş seviyelere fırlatacak. Bu yüzden gelecekteki en iyi hamlelerden birinin tahvilleri (bonds) açığa satmak (short) olacağını düşünüyor.',
  },
]

export const links = [
  { source: 'renovasyon-patlayacak', target: 'nufus-azalmasi-emlak' },
  { source: 'yz-cagi-klasik-kitaplar', target: 'sentetik-veri-dogrulama' },
  { source: 'yz-cagi-klasik-kitaplar', target: 'insan-vizyon-muhakeme' },
  { source: 'insan-vizyon-muhakeme', target: 'insana-ozgu-meslekler' },
  { source: 'sifir-surtunmeli-iliski', target: 'insana-ozgu-meslekler' },
  { source: 'insansiz-savaslar', target: 'asi-destekleyici' },
]
