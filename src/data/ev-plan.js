// Ev: 3 ay içinde ev alımı için gizli plan sayfası (/moat/ev).
//
// Düzenleme rehberi:
// - phases: yapılacaklar. Her maddenin id'si benzersiz ve sabit olmalı;
//   işaret durumu tarayıcıda (localStorage) bu id ile saklanır.
// - buyGroups / rentGroups: referans notlar (life-tips Ev sekmesinden alındı,
//   burada bağımsız bir kopya olarak düzenlenebilir).
// - viewGroups: ev gezerken işaretlenen kontrol listesi (id sabit kalmalı).
// - resources: faydalı linkler. notes: serbest not kartları.

export const title = 'Ev Planı'
export const subtitle = '3 ay içinde ev alımı: yapılacaklar, kontrol listeleri, notlar.'

// Hedef tarih (ISO). Sayfa üstündeki geri sayımı besler.
export const targetDate = '2027-01-04'

export const phases = [
  {
    id: 'hazirlik',
    title: 'Hazırlık',
    hint: 'Ay 1',
    todos: [
      { id: 'p1', text: 'Bütçeyi, peşinatı ve kredi koşullarını netleştir.' },
      { id: 'p2', text: 'Fiyat trendine ve faiz/enflasyon farkına bak (fiyatlar durgun, faiz enflasyonla yan yana ise alım zamanı).' },
      { id: 'p3', text: 'Parsel Sorgu\'da hedef mahalle ve ilçelerin alım satım yoğunluğuna (küme haritası) bak.' },
      { id: 'p4', text: 'Ulaşım kriterini yaz: metro veya durağa en fazla 15 dakika yürüme.' },
      { id: 'p5', text: 'Daire kriterlerini yaz: giriş ve 1. kat hariç, 5-10 yaş arası bina, mümkünse hazır ve oturulabilir ev.' },
    ],
  },
  {
    id: 'gezme',
    title: 'Arama ve Gezme',
    hint: 'Ay 1-2',
    todos: [
      { id: 'g1', text: 'Aday evleri gez, her gezide "Gezme Listesi" sekmesini kullan.' },
      { id: 'g2', text: 'Her aday için kira x 180 ay değer kontrolünü yap (Ev Alma sekmesindeki hesaplayıcı).' },
      { id: 'g3', text: 'Balkon demirleri, zemin birleşimi (çift temel), banyo tavanı ve duvar diplerini kontrol et.' },
      { id: 'g4', text: 'Zemin kat, kömürlük ve otoparka inip binanın genel durumunu ve sakinlerini tanı.' },
      { id: 'g5', text: 'Alt ve üst komşularla konuş.' },
      { id: 'g6', text: 'Pencere yönünü ve güneş alma durumunu (güneş yolu diyagramı) kontrol et.' },
      { id: 'g7', text: 'Su hattı malzemesini öğren (demir ise plastik boruyla değiştirmeyi hesaba kat).' },
    ],
  },
  {
    id: 'hukuki',
    title: 'Hukuki Kontrol',
    hint: 'Ay 2-3',
    todos: [
      { id: 'h1', text: 'Belediye imar bölümünden ada/parsel sorgusu yaptır, imar işlem dosyasını arşivden çektir.' },
      { id: 'h2', text: 'Dosyada yapı tatil tutanağı ve imar kanunu 32. ve 42. madde ceza/yıkım kararı var mı kontrol et.' },
      { id: 'h3', text: 'Yapı kullanım izin belgesi (iskan) var mı bak.' },
      { id: 'h4', text: 'Kat irtifakı projesinde kapı numarasına göre bağımsız bölüm kontrolünü yap.' },
      { id: 'h5', text: 'Yönetim planını oku (evcil hayvan, kullanım kuralları dahil).' },
      { id: 'h6', text: 'Zorunlu deprem sigortasını (DASK) yaptır, tapu işlemlerinden önce hazır olsun.' },
    ],
  },
  {
    id: 'alim',
    title: 'Satın Alma ve Taşınma',
    hint: 'Ay 3',
    todos: [
      { id: 'a1', text: 'Tapu devri öncesi son kez imar işlem dosyasını ve borç durumunu kontrol et.' },
      { id: 'a2', text: 'Su hattı değişecekse eve girmeden önce yaptır.' },
      { id: 'a3', text: 'Beyaz eşya, yatak ve gardrobu yerini ölçerek erkenden sipariş ver (teslimat 15 günü bulabiliyor).' },
      { id: 'a4', text: 'Elektrik, su ve doğalgaz aboneliklerini aç.' },
      { id: 'a5', text: 'Taşınmayı hafta içi ve sabah saatine anlaşarak planla.' },
    ],
  },
]

export const buyGroups = [
  {
    id: 'hukuki',
    title: 'Tapu, İmar ve Hukuki Kontrol',
    icon: 'scale',
    tips: [
      'Tapunun üzerinize devrini almadan önce ilgili belediyeye başvurun ve söz konusu yerin imar işlem dosyasını arşivden çektirin. Özellikle yapı tatil tutanağı (zabıt) olup olmadığı ve imar yasasının 42. ve 32. maddelerine göre alınmış para ve yıkım cezası kararlarının bulunup bulunmadığı kontrol edilmelidir.',
      'Kat mülkiyeti kanununu bilin. Bu kanunu küçümsemeyin. Paranızı iade edip sizi kendi evinizden kovmaları mümkündür.',
      'Yönetim planını okuyun. Evcil hayvan besleme gibi konular bile yönetim planında ele alınmaktadır.',
      'Bitmiş ev alıyorsanız en önemlisi yapı kullanım izin belgesi (iskan-oturma ruhsatı) olup olmaması. Bu belge alınmamış ev almak büyük risk. Yapı denetim firmasına projede bir dümen olup olmadığını sorun.',
      'Kapı numarasına bakarak yerleştiğiniz dairenizde 3 sene oturduktan sonra olumsuz ekspertiz raporu nedeniyle bu daireyi satamama durumuna düşmemek için evinizi almadan önce kat irtifakı projesinden bağımsız bölüm kontrolünü mutlaka yapın.',
      'Eviniz kat mülkiyetine geçmişse zorunlu deprem sigortanızı yaptırmadan işlemlere başlayamayacağınızı aklınızda bulundurun.',
      'Belediye imar bölümünü arayın. Ada parsel verip sorgulattırın. Nesi var nesi yok söylüyorlar.',
    ],
  },
  {
    id: 'piyasa',
    title: 'Piyasa ve Zamanlama',
    icon: 'trend',
    tips: [
      'Ev alırken çoğu kişinin bakmadığı ama sizin mutlaka bakmanız gereken bir veri var: Bir mahallede, sokakta hatta bölgede geçen yıl kaç tane daire alınıp satıldığını görebiliyorsunuz. Parsel Sorgu uygulamasına (https://parselsorgu.tkgm.gov.tr/) giriyorsunuz: Analiz → Alım Satım Yoğunluğu → 2025 → İl → İlçe → Küme Haritası seçimlerini yapıyorsunuz. Harita üzerinde bölgelerdeki alım-satım yoğunluklarını gösteren rakamlar çıkıyor. Yani bir ev almadan önce: O bölgede ne kadar satış olmuş? Hangi bölgelerde hareketlilik daha fazla? Yatırım yaptığınız bölge gerçekten talep görüyor mu? gibi sorulara veriyle cevap bulabilirsiniz. Gayrimenkul alırken sadece fiyatı değil, bölgenin hareketini de inceleyin.',
      'Fiyatlar durgun, kredi faizlerinin gerçek enflasyonla yan yana geldiği mesela yüzde 9 enflasyon yüzde 9 faiz var. Bu zamanlarda ev alınır. Başını sokacak bir ev ise direkt al.',
    ],
  },
  {
    id: 'bina',
    title: 'Bina, Konum ve Komşular',
    icon: 'building',
    tips: [
      'Evin içindeki su hattını öğrenin. Demir ise değiştirebilirsiniz. Beyaz plastik borularla tekrar döşetin. Eve girdikten sonra en zor iş su hattını değiştirmek oluyor.',
      'Evin geçmişini ve apartman sakinlerinin yaşantısından küçük çıkarımlar yapmak için zemin kata, kömürlüğe, oto park gibi yerlere inin. Bu kısımlar daha az ilgi gördüğü için apartmanın geneli hakkında bilgi sahibi olabilirsiniz.',
      'Komşularınızı iyi tanımaya çalışın. Bugün iyi bir alt-üst komşusu olmadığı için evini değiştiren binlerce kişi var.',
      'Ev kiralamak veya almak istediğinizde o şehrin güneş yolu diyagramını (sun path diagram) inceleyin. Pencerelerin hangi yöne baktığına dikkat edin. Kuzey yarım kürede pencereleriniz kuzeye bakıyorsa yaz dönemi hariç güneşi çok fazla göremeyeceksiniz. Güneye bakıyorsa kışın dahi güneş görmeye devam edeceksiniz.',
      '1+0 daire epey dar. Metroya, otobüs durağına 15 dakika yürümek cehennem. Giriş ve 1. katı bırakın. Çöpü kapıcının alması en iyisi.',
    ],
  },
  {
    id: 'yatirim',
    title: 'Yatırım ve Kiraya Verme',
    icon: 'coins',
    tips: [
      'Kiraya vermek amaçlı 1+1 daire almak isteyenlere: Tamamı 1+1 dairelerden oluşan apartman/site yerine, 2+1/3+1 dairelerin çoğunluk olduğu apartman/sitelerden 1+1 daire almak çok daha doğru bir yatırım olur.',
      '1+1 dairelerden oluşan bir binada ev alan herkes yatırım amaçlı aldığı için tüm daireler ya satılık ya kiralık. Ev sahibi oturan yok. Apartman yönetimi kurulamamış, ortak elektrik aboneliğini kimse almıyor. Asansör kapalı, bina içi temizlik yapılmıyor.',
      'Bu apartman profilinde kiracı profili sıkıntılı tipler olur. Açık otoparkı 30 araç alır mı şüpheli. Gelecekteki park kavgaları, gürültü problemleri vs, aklı başında insanlar böyle yerlerde yaşamaz.',
      'Kiraya verme amaçlı alınacak konutta, olası kiracı profiliniz en önemli kriter.',
    ],
  },
]

export const viewGroups = [
  {
    id: 'rutubet',
    title: 'Rutubet ve Su',
    icon: 'droplets',
    items: [
      { id: 'v-rutubet-1', text: 'Odalardaki duvarların üst kısımlarına değil süpürgelikle birleşen noktalarına bakın. Küçük kabarmalar rutubetin habercisidir. Rutubetli evlerden vaz geçin.' },
      { id: 'v-rutubet-2', text: 'Banyonun tavan köşelerine bakın. Boya yeniyse sıkıntı, makyajdır. Yok tozlu ve sade bir rengi varsa temiz. Üst kattan bir şey gelmiyor demektir.' },
      { id: 'v-rutubet-3', text: 'Banyo ve tuvaletlerinin zeminine dikkat edin. Eğer zemin iyi yalıtılmamışsa alt komşunuza sorun olabilir.' },
      { id: 'v-rutubet-4', text: 'Kapalı kalmış ev kokusu diye bir şey yoktur. Emlakçı "uzun süredir kapalı kaldığından kokmuş, havalandırdık mı hemen geçer" dedi, camı açtı. Bu rutubet kokusudur, ev su almıştır. Rutubet boyayla kapatılamaz. Alçının tamamen kazınıp küflü yerlerin çamaşır suyuyla dezenfekte edilip tamamen kuruduktan sonra tekrar uygulanması gerekir.' },
    ],
  },
  {
    id: 'yapi',
    title: 'Yapı Kalitesi',
    icon: 'hammer',
    items: [
      { id: 'v-yapi-1', text: 'Bakacağınız ilk yer evin balkonu olmalı. Balkon demirleri müteahhitler için saçma bir gider kalemi olarak görülür. Balkon demirleri ne kadar sık ve kalınsa müteahhit masraftan o kadar kaçınmamış demektir.' },
      { id: 'v-yapi-2', text: 'Evin zeminle birleştiği yere bakın. Eğer zeminle birleşmeden önce 20-25 cm kadar bir tabaka üstünde ise ev bingo! Eviniz çift temellidir.' },
      { id: 'v-yapi-3', text: 'Dış cephe yalıtımı olsa bile duvarların kalınlığına dikkat edin. Sonra yan apartmanınızdaki kişi 100 lira doğalgaz faturası öderken siz 400 lira ödemek zorunda kalabilirsiniz.' },
    ],
  },
  {
    id: 'bina',
    title: 'Bina ve Teslim Durumu',
    icon: 'building',
    items: [
      { id: 'v-bina-1', text: 'Son dönemde yapılan sıfır binalar maliyet artışından dolayı kalitesiz oluyor. Eğer ev alınacaksa 5-10 yaş aralığında bir ev alınmalı. Satılan bina-sitede kira ne ise onu 180 ay ile çarpıp ona göre fiyat değerlemesi yapın. Evi alırken yapıldığı tarihte ülke ekonomisi nasıl bir inceleyin, o dönemde ekonomi iyiyse daha kaliteli malzeme kullanma ihtimalleri daha yüksek.' },
      { id: 'v-bina-2', text: 'Giriş yada bodrum kattan asla daire almayın. Apartmanın giriş ve 1. katını satın almayın. Mutfak dolabı, duşakabin, klozet gibi ürünler ilk kattan yapılmaya başlanır, inşaata giren herkes bunları kullanmaya başlar. Alçı, boya, elektrik aksamı işler en üst kattan başlanır, ustalar alt katlara doğru savsaklamaya başlar. 1. kattaki dairelerden birinde inşaat bekçisi kalır ve o daireyi hor kullanabilir.' },
      { id: 'v-bina-3', text: 'En kral ev her şeyiyle hazır evdir, satın aldığınızda ertesi gün elektriği, suyu, doğalgazı açtırabileceğiniz evdir. İnşaat bitmesine rağmen uzun süredir boş olan ya da çok az oturum olan yerleşimlerde kesin bir bokluk vardır.' },
    ],
  },
]

export const rentGroups = [
  {
    id: 'mekan',
    title: 'Mekan ve Donanım',
    icon: 'home',
    tips: [
      'Yerler taş veya mermer olmamalı. Kışın ısınmaz. En güzeli parke.',
      'Camlar çift cam olmalı yoksa enerji kaybı yüksek. Dışarıdan gelen seslerin yalıtımı da artısı.',
      'Evde elektrikli boiler olmasın. Anlık duş almak tarihe karışır. Aç iki saat bekle ki su ısınsın.',
      'Her odada priz olması şart.',
      'Son kat veya teras kat daire akıl işi değildir.',
      'Banyo ve mutfaktaki tezgahlar için çamaşır makinesi ve bulaşık makinesi yerinin yüksekliğini kesin ölçün. Standart yükseklik 84.5cm, tezgah yüksekliği 84cm ise sığmaz.',
    ],
  },
  {
    id: 'kontrol',
    title: 'Gezerken Kontrol',
    icon: 'search',
    tips: [
      'Mutfak tezgahının altına ve banyonun dip köşe taraflarına bak.',
      'Bilumum su tesisatı ve elektrik priz, duy çalışır mı bakın.',
      'Duvarlara dokunun, arkadan aşırı soğuk geliyorsa rutubetten vay halinize.',
    ],
  },
  {
    id: 'sozlesme',
    title: 'Sözleşme ve Çıkış',
    icon: 'file',
    tips: [
      'Kontratı mümkün olduğunca uzun yaptırmaya çalışın (en az 1 yıl). Kira kontratında artışın yasalara göre olmasını sağlayın. Ev sahipleri bu maddeyi "enflasyona göre" diye değiştirebiliyorlar kontratta.',
      'Kontratta yazan demirbaşlara dikkat edin. Sineklik, duşakabin ve en önemlisi kombi. Sorunsuz denilip kiraladığımız evin kombisinin sorunları 2 haftadan fazla zamanımızı aldı. Ev sahibi sorunsuz diyorsa muhakkak çalıştığından emin olun.',
      'Çıkarken mutlaka tüm aboneliklerinizin iptal edildiğinden emin olun ve kurumlardan son endeksler yazılı şekilde borcu yoktur belgesi alın.',
    ],
  },
  {
    id: 'tasinma',
    title: 'Taşınma',
    icon: 'truck',
    tips: [
      'Mümkünse hafta içi taşının. Hafta sonu için verilen fiyatlar genelde 1.5-2 kat pahalı olacaktır. Semt pazarını dikkate alın.',
      'Sabah için anlaşın! Gün içindeki diğer saatleri seçerseniz, gelecek ekibin önceki taşınmalarda geç kalacağı garantidir.',
    ],
  },
]

export const resources = [
  {
    id: 'parsel-sorgu',
    label: 'Parsel Sorgu (TKGM)',
    href: 'https://parselsorgu.tkgm.gov.tr/',
    desc: 'Analiz → Alım Satım Yoğunluğu → yıl → il → ilçe → Küme Haritası: mahalledeki satış yoğunluğunu gör.',
  },
]

// { id, title, body, tag? } biçiminde serbest notlar.
export const notes = []
