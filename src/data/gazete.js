// Gazete içeriği — her sayı bu dosyadan beslenir.
// Yeni sayı çıkarmak için sadece bu dosyayı güncelle.

export const gazete = {
  masthead: {
    name: 'PLACEHOLDER GAZETE ADI',
    issue: 'Sayı No. 1',
    date: '2 Temmuz 2026, Perşembe',
    frequency: 'Haftalık Yayın',
  },

  manset: {
    kicker: 'BU HAFTANIN MESELESİ',
    title: 'Uykunun Hükümranlığı',
    subtitle:
      'Gece vardiyası, mavi ışık ve modern insanın bitmeyen yorgunluğu üzerine bir tahkikat',
    body: [
      'Şehir uyumuyor; uyuyamıyor. Elektriğin icadından bu yana geceyi gündüze çeviren insanoğlu, yüz yıl içinde ortalama uyku süresinden koca bir buçuk saati sessiz sedasız feda etti. Bu satırların muharriri, geçtiğimiz hafta boyunca şehrin muhtelif semtlerinde gece yarısından sonra ışığı yanan pencereleri saydı ve vardığı netice, tahminlerinin dahi fevkinde çıktı.',
      'Mesele yalnızca vakit meselesi değildir. Fen adamları, gece geç saatte gözümüze dolan mavi ışığın, dimağımızdaki saat hücrelerini şaşırttığını, vücudun "gece oldu" nidasını bastırdığını söylüyor. Telefon dedikleri cep aynası, yatak odasına giren en sinsi misafir olmuştur.',
      'Peki çare nedir? Eski usul, her zamanki gibi imdada yetişiyor: Güneş batınca ışıkları loşlaştırmak, yatmadan evvel okunacak birkaç sayfa kitap ve sabahın ilk ışığında yapılacak kısa bir yürüyüş. Büyükannelerimizin sofra düzeni gibi, uyku düzeni de bir terbiye meselesidir.',
      'Gelecek sayıda, uykunun hazım ve iştah üzerindeki tesirlerini, laboratuvar köşemizde bizzat denediğimiz usullerle birlikte ele alacağız. Şimdilik tavsiyemiz odur ki: Karanlığı, kaybettiğimiz bir dost bilip yeniden kucaklayalım.',
    ],
  },

  kose: {
    label: 'KÖŞE',
    title: 'Kahvenin Müdafaası',
    author: 'M. T.',
    lead: 'Sabahın köründe, daha gözler açılmadan cezveye uzanan eli kim yargılayabilir?',
    body: [
      'Kahve aleyhtarları her devirde mevcut olmuştur. Kimi çarpıntıdan dem vurur, kimi uykusuzluktan. Halbuki mesele kahvede değil, kadehin adedindedir. Günde iki fincan, dimağı açar, kalbi ferahlatır; sekiz fincan ise adamı duvara tırmandırır.',
      'İlmî neşriyat da bu kanaati destekler görünüyor: İtidal üzere içilen kahvenin, uzun ömre refakat ettiği yazılıp çiziliyor. Şu kadarını söyleyelim: Öğleden sonra saat üçten sonra içilen kahve, gecenin uykusundan çalınmış bir borçtur ve faiziyle geri ödenir.',
    ],
  },

  kisaKisa: {
    label: 'KISA KISA',
    items: [
      {
        title: 'Zeytinyağında Sahtecilik',
        text: 'Piyasadaki şişelerin mühim bir kısmının tağşişe uğradığı rivayet olunuyor. Erbabı, hasat tarihi okunmayan şişeye itibar edilmemesini salık veriyor.',
      },
      {
        title: 'Bağırsak: İkinci Dimağ',
        text: 'Fen âlemi, karnımızdaki âlemin sinir sistemiyle muhaberede olduğunu keşfediyor. Turşu ve yoğurt gibi mayalı gıdaların itibarı iade ediliyor.',
      },
      {
        title: 'Ekşi Maya Rağbette',
        text: 'Mahalle fırınlarında ekşi maya ekmeğine talep artmakta. Sabırla mayalanan hamurun hazmının kolay olduğu söyleniyor.',
      },
      {
        title: 'Yürüyüşün Fazileti',
        text: 'Yemek sonrası çeyrek saatlik yürüyüşün kan şekerini teskin ettiği, muhtelif tetkiklerle bir kez daha teyit edildi.',
      },
      {
        title: 'Sabah Güneşi Reçetesi',
        text: 'Uyandıktan sonraki ilk saat içinde açık havada geçirilecek on dakikanın, gece uykusuna yatırım olduğu beyan ediliyor.',
      },
    ],
  },

  laboratuvar: {
    label: 'LABORATUVAR',
    title: 'Bu Hafta Denedik: Sabah Soğuk Duşu',
    body: [
      'Yedi gün boyunca, her sabah musluğun en insafsız ayarında otuz saniye durduk. İlk iki gün feryat figan; üçüncü günden itibaren garip bir zindelik. Kahvaltı öncesi dimağ berraklığı, kahveninkine benzer fakat çarpıntısız.',
      'Uyku üzerine menfi tesir görülmedi. Akşam duşlarında ise aksine, sıcak su tavsiye olunur.',
    ],
    verdict: 'Hüküm: Devam edilecek. Cesaret isteyen fakat bedeli ödenen bir usul.',
  },

  alinti: {
    text: 'Bahçen ve kitaplığın varsa, hiçbir şeyin eksik değildir.',
    source: 'Cicero',
  },

  abone: {
    title: 'ABONE OLUN',
    text: 'Haftalık sayı e-postanıza gelsin',
    placeholder: 'E-posta adresiniz',
    button: 'Kaydol',
  },

  kitapliktan: {
    label: 'KİTAPLIKTAN',
    title: 'Kırılganlığın Tersi Sağlamlık Değildir',
    bookRef: 'Antifragile — Nassim Nicholas Taleb',
    body: [
      'Bir kadeh, sarsıntıda kırılır; bir taş, sarsıntıya aldırmaz. Taleb ise üçüncü bir sınıfın varlığına işaret eder: Sarsıntıdan istifade eden, örselendikçe güçlenen şeyler. Buna "antikırılgan" diyor. Kas, ağırlık altında yorulup güçlenir; bağışıklık, mikropla tanışıp pekişir; zanaatkâr, hatasından ustalaşır.',
      'Fikrin cazibesi, hayatın her sahasına tatbik edilebilmesindedir. Evladını her sarsıntıdan esirgeyen ebeveyn, ona taş değil kadeh muamelesi yapmaktadır. Küçük zorluklar, küçük dozlarda aşıdır; onları ortadan kaldırmak, bünyeyi büyük fırtınaya hazırlıksız bırakmaktır.',
      'Muharririn üslubu yer yer kavgacıdır, fakat kavgasının ardında sağlam bir sual yatar: Belirsizlikten kaçmak mı, yoksa ondan beslenmeyi öğrenmek mi? Kitaplığınızda bir raf, bu suale ayrılmayı hak ediyor.',
    ],
  },

  pageNumber: '— 1 —',
}
