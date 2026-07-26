// Food — kendi gıda notlarım, Obsidian-tarzı bağlantılı grafik.
// Her not bir "dot"; links ile birbirine bağlanır.
// Not eklemek /food skill'i ile yapılır: skill notu analiz eder,
// nodes'a { id, title, tags, body } ekler ve mevcut notlarla
// anlamsal ilişki kurup links'e { source, target } koyar.

export const graphTitle = 'Food'
export const graphSubtitle = 'Kendi gıda notlarım. Bir noktaya dokun, açılsın.'

export const nodes = [
  {
    id: 'ultra-islenmis-ekmek',
    title: 'Ultra-işlenmiş Ekmek',
    tags: ['ekmek', 'market', 'ultra-işlenmiş'],
    body: 'Marketten paketli ve ultra-işlenmiş olmayan bir ekmek almak isterseniz tek seçenek Wasa gevrek ekmek. Zincir marketlerde satılan standart paketli ekmeklerin neredeyse tamamı, raf ömrünü uzatmak ve hacim kazandırmak için kullanılan kalsiyum propiyonat, emülgatörler, endüstriyel mayalar ve asitlik düzenleyiciler nedeniyle "ultra-işlenmiş" kategorisine girer.',
  },
  {
    id: 'yag-karisimlari',
    title: 'Yağ Karışımları',
    tags: ['yağ', 'ultra-işlenmiş', 'katkı maddesi'],
    body: 'İşlenmiş gıdalarda neden tek bir yağ yerine birden fazla yağın karışımı genellikle kullanılır? Tek bir yağ kullanmak yerine sıvı ve katı yağları paçallamak ürünün rafta oksidasyon (acılaşma) yaşamadan çok daha uzun süre dayanmasını sağlıyor. Viskozite (akışkanlık) ve çıtırlık ayarını iyi veriyor. Eskiden trans yağlar kullanılırken dayanaklılığı arttırmak için artık bu karışımlarla bu sorunu çözüyorlar. Etikete "ve/veya" yazarak o ay borsada hangi yağ ucuzsa onu kullanıyorlar, böylece hem maliyeti düşürüp hem de her fiyat değişiminde ambalaj yenilemekten kurtuluyorlar.',
  },
  {
    id: 'tavugu-kendin-parcala',
    title: 'Tavuğu Kendin Parçala',
    tags: ['tavuk', 'bütçe', 'et'],
    body: 'Bütçe yapmak istiyorsanız tavuk göğüs ya da baget falan almak yerine tüm tavuk alıp youtubedan birkaç video izleyip kendiniz parçalayın. Çok daha karlı oluyor.',
  },
  {
    id: 'bamya-salgi-onleme',
    title: 'Bamyanın Salgısı',
    tags: ['bamya', 'limon', 'sebze'],
    body: 'Bamya pişirirken salgı istemiyorsan başlangıçta limon suyu eklemelisin. Bamya ısındıkça, hücre duvarlarındaki pektinler parçalanır ve suyla birleşerek kolayca çözünür. Bu da yemeğin suyuna o koyu, lifli ve uzayan kıvamı verir. Limon suyundaki sitrik asit, ortamın pH seviyesini düşürür. Asidik ortamda pektin molekülleri birbirine daha sıkı bağlanır ve suda çözünme kabiliyetlerini kaybederler. Hücre yapısı bütünlüğünü koruduğu için pektin suya salınmaz ve o jelimsi salgı oluşmaz.',
  },
  {
    id: 'japon-restoran-uzmanlasma',
    title: 'Japon Restoran Uzmanlaşması',
    tags: ['japon', 'restoran', 'kültür'],
    body: 'Japon yemek kültüründe restoranlar tek bir alanda uzmanlaşma eğilimindedir. En iyi suşiyi yemek için sadece suşi yapan yere, en iyi rameni yemek için sadece ramen yapan yere gitmeniz lazım.',
  },
  {
    id: 'tavuk-butu-derisiyle',
    title: 'Tavuk Butu Derisiyle',
    tags: ['tavuk', 'glisin', 'et'],
    body: 'Tavuk butunu derisiyle ye. Deri iyi bir glisin kaynağı; but zaten göğse göre daha lezzetli ve besleyici.',
  },
  {
    id: 'kaliteli-bicak',
    title: 'Kaliteli Bıçak',
    tags: ['ekipman', 'bıçak'],
    body: 'Bıçak seti almak yerine 1-2 adet kaliteli bıçağa yatırım yapın.',
  },
  {
    id: 'mutfak-makasi',
    title: 'Mutfak Makası',
    tags: ['ekipman'],
    body: 'Mutfak makasına yatırım yapın; tahmin edilenden çok daha kullanışlıdır.',
  },
  {
    id: 'speed-peeler',
    title: 'Hızlı Soyacak',
    tags: ['ekipman'],
    body: 'Küçük soyacaklar yerine geniş/hızlı soyacaklar (speed peeler) kullanın.',
  },
  {
    id: 'tezgah-kaziyici',
    title: 'Tezgah Kazıyıcı',
    tags: ['ekipman', 'bıçak'],
    body: 'Tezgah Kazıyıcı (Bench Scraper): Doğranmış malzemeleri taşımak için hamur/tezgah kazıyıcı kullanın; bu hem daha hızlıdır hem de bıçağınızın keskinliğini korur.',
  },
  {
    id: 'microplane-rende',
    title: 'İnce Rende (Microplane)',
    tags: ['ekipman', 'sarımsak'],
    body: 'Sarımsak veya zencefili ince doğramak yerine ince rende (microplane) kullanın; yarı yarıya zaman kazandırır.',
  },
  {
    id: 'yaga-tuz-serp',
    title: 'Dökülen Yağa Tuz',
    tags: ['temizlik', 'mutfak'],
    body: 'Yere yağ dökülürse üzerine hemen tuz serpin; yağı emer ve temizlemeyi çok kolaylaştırır.',
  },
  {
    id: 'sebze-haslama-kurali',
    title: 'Sebze Haşlama Kuralı',
    tags: ['sebze', 'haşlama'],
    body: 'Toprak üstünde yetişen sebzeleri kaynar tuzlu suya; toprak altında yetişenleri ise soğuk suya koyup suyla birlikte kaynatın.',
  },
  {
    id: 'yesil-sebze-buz-soku',
    title: 'Yeşil Sebzeye Buz Şoku',
    tags: ['sebze', 'haşlama'],
    body: 'Yeşil sebzelerin canlı rengini korumak için haşladıktan hemen sonra buzlu suya atın.',
  },
  {
    id: 'sarimsak-kesim-lezzet',
    title: 'Sarımsak Kesimi ve Lezzet',
    tags: ['sarımsak', 'teknik'],
    body: 'Sarımsağın ezilme/kesilme biçimi lezzetini etkiler; ne kadar ince doğranır veya rendelenirse tadı o kadar keskin olur.',
  },
  {
    id: 'sogan-kisik-ates',
    title: 'Soğanı Kısık Ateşte Sotele',
    tags: ['soğan', 'teknik'],
    body: 'Soğanları kısık ateşte yavaşça soteleyin; yüksek ateş acılaştırabilir.',
  },
  {
    id: 'ot-ekleme-zamani',
    title: 'Otların Ekleme Zamanı',
    tags: ['baharat', 'teknik'],
    body: 'Biberiye, kekik ve defne yaprağı gibi sert otları pişirmenin başında; maydanoz ve fesleğen gibi taze yumuşak otları ise en son ekleyin.',
  },
  {
    id: 'karabiber-sona-dogru',
    title: 'Karabiberi Sona Doğru Ekle',
    tags: ['baharat', 'teknik'],
    body: 'Karabiberi pişirmenin sonlarına doğru ekleyin; yüksek ısıda uzun süre kalırsa acılaşabilir.',
  },
]

export const links = [
  { source: 'yag-karisimlari', target: 'ultra-islenmis-ekmek' },
  { source: 'tavuk-butu-derisiyle', target: 'tavugu-kendin-parcala' },
  { source: 'mutfak-makasi', target: 'kaliteli-bicak' },
  { source: 'speed-peeler', target: 'kaliteli-bicak' },
  { source: 'tezgah-kaziyici', target: 'kaliteli-bicak' },
  { source: 'microplane-rende', target: 'sarimsak-kesim-lezzet' },
  { source: 'yesil-sebze-buz-soku', target: 'sebze-haslama-kurali' },
  { source: 'karabiber-sona-dogru', target: 'ot-ekleme-zamani' },
]
