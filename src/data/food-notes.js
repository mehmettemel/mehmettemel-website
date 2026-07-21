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
]

export const links = [
  { source: 'yag-karisimlari', target: 'ultra-islenmis-ekmek' },
]
