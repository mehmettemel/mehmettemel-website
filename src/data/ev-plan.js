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
      { id: 'p5', text: 'Daire kriterlerini yaz: giriş ve 1. kat hariç, 5-10 yaş arası bina.' },
    ],
  },
  {
    id: 'gezme',
    title: 'Arama ve Gezme',
    hint: 'Ay 1-2',
    todos: [
      { id: 'g0', text: 'Emlakçıyla görüşmeden önce "Emlakçıya Sorular" sekmesini aç, kritik soruları sor.' },
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
    id: 'hukuki',
    title: 'Hukuki Durum ve Resmi Belgeler',
    icon: 'scale',
    items: [
      { id: 'v-hukuki-1', text: 'Kat Mülkiyeti (İskan): Tapuda doğrudan "Kat Mülkiyeti" yazması en temiz durumdur (iskan alınmış, yasal süreç bitmiştir). Tapu "Kat İrtifakı" ise binanın iskanının (yapı kullanma izin belgesi) alınıp alınmadığını belediyeden sorgula. İskansız binalarda şantiye elektriği/suyu kullanılır (yüksek fatura) ve yasal riskler sürer.' },
      { id: 'v-hukuki-2', text: 'Sığınak ve Ortak Alan Kontrolü: İskan alamayan veya sonradan sorun yaşayan binalarda en sık sebep sığınaktır. Bodruma inip sığınağın projeye uygun olup olmadığını, daireye veya dükkana çevrilip çevrilmediğini mutlaka gözünle gör.' },
      { id: 'v-hukuki-3', text: 'Borç/İpotek Durumu: Tapu üzerinde haciz/ipotek ve geçmiş dönem aidat veya emlak vergisi borcu olup olmadığını kontrol et.' },
    ],
  },
  {
    id: 'cephe',
    title: 'Mersin İklimine Göre Cephe ve Havalandırma',
    icon: 'sun',
    items: [
      { id: 'v-cephe-1', text: 'Çapraz Rüzgar (Cereyan): Mersin sıcağında tek cepheli (örneğin sadece güneye veya sadece kuzeye bakan) evler havasız kalır. İdeal olan kuzey-güney veya doğu-batı çift cepheli olup hava akımı yapabilmesidir.' },
      { id: 'v-cephe-2', text: 'Güneş ve Isı Yükü: Güney cephe kışın avantajlıdır ve deniz meltemi alır; ancak doğrudan batıya bakan odalar yaz öğleden sonraları aşırı ısınır ve klima faturasını katlar.' },
      { id: 'v-cephe-3', text: 'Önünün Kapanma Riski: Önü açık görünen cephelerde yan boş arsaların imar planını (kaç kata izin verildiğini) öğren; deniz veya rüzgar esintisi ileride yeni bir blokla kesilmesin.' },
    ],
  },
  {
    id: 'rutubet',
    title: 'Rutubet ve Su',
    icon: 'droplets',
    items: [
      { id: 'v-rutubet-1', text: 'Odalardaki duvarların üst kısımlarına değil süpürgelikle birleşen noktalarına bakın. Küçük kabarmalar rutubetin habercisidir. Rutubetli evlerden vaz geçin.' },
      { id: 'v-rutubet-2', text: 'Banyonun tavan köşelerine bakın. Boya yeniyse sıkıntı, makyajdır. Yok tozlu ve sade bir rengi varsa temiz. Üst kattan bir şey gelmiyor demektir.' },
      { id: 'v-rutubet-3', text: 'Banyo ve tuvaletlerinin zeminine dikkat edin. Eğer zemin iyi yalıtılmamışsa alt komşunuza sorun olabilir.' },
      { id: 'v-rutubet-4', text: 'Kapalı kalmış ev kokusu diye bir şey yoktur. Emlakçı "uzun süredir kapalı kaldığından kokmuş, havalandırdık mı hemen geçer" dedi, camı açtı. Bu rutubet kokusudur, ev su almıştır. Rutubet boyayla kapatılamaz. Alçının tamamen kazınıp küflü yerlerin çamaşır suyuyla dezenfekte edilip tamamen kuruduktan sonra tekrar uygulanması gerekir.' },
      { id: 'v-rutubet-5', text: 'Pencere ve Denizlik Dipleri: Pencere pervazlarının altına ve denizlik diplerine dikkatle bak. Sıva kabarması, koyuluk veya küf izi varsa o daire yoğun yağmurda su alıyordur.' },
      { id: 'v-rutubet-6', text: 'Balkon ve Banyo Tavanları: Üst katın balkon veya banyo gideri hizasındaki tavan ve köşe duvarları incele. Su akıntısı veya sararma izi var mı bak.' },
      { id: 'v-rutubet-7', text: 'Zemin ve Rutubet: Parkelerin süpürgelik diplerine bak; tabandan nem almış parkeler şişer veya basıldığında esneme/gıcırdama yapar.' },
    ],
  },
  {
    id: 'malzeme',
    title: 'Daire İçi Malzeme ve İmalat Kalitesi',
    icon: 'hammer',
    items: [
      { id: 'v-malzeme-1', text: 'Mutfak Dolapları: Gövdenin neme dayanıksız suntalam değil, MDF olmasına dikkat et (Mersin neminde suntalam hızla şişer). Kapaklarda lake veya akrilik tercih edilir.' },
      { id: 'v-malzeme-2', text: 'Krom Parçalar ve Bataryalar: Banyo ve mutfaktaki armatürlerin bilindik markalar (ECA, Artema vb.) olmasına bak. Kalitesiz armatürler deniz havasında kısa sürede kararır ve kireçlenir.' },
      { id: 'v-malzeme-3', text: 'Zemin Kaplamaları: Islak hacimlerde ve koridorda büyük ebatlı (60x120 vb.) granit/seramik kullanılmış olması kalite göstergesidir.' },
      { id: 'v-malzeme-4', text: 'Kapılar: Çelik kapının ağırlığı ve kilit sistemi (Kale, Sur vb.) ile iç oda kapılarının tipi (en ucuzu Amerikan panel; daha kalitelisi melamin veya lakedir) incelenmelidir.' },
    ],
  },
  {
    id: 'tesisat',
    title: 'Bina ve Tesisat Donanımları',
    icon: 'building',
    items: [
      { id: 'v-tesisat-1', text: 'Jeneratör: Mersin’de yazın yoğun klima kullanımı sebebiyle şebeke yüklenir. Binada en azından asansör, hidrofor ve ortak alanları (tercihen daire içlerini) besleyen bir jeneratör olması büyük konfordur.' },
      { id: 'v-tesisat-2', text: 'Asansör Yeşil Etiketi: Asansörün yıllık periyodik bakımının yapıldığını gösteren yeşil etiket kabin içinde var mı kontrol et (kırmızı veya sarı etiket güvenlik eksikliğini gösterir).' },
      { id: 'v-tesisat-3', text: 'Çevre Analizi: Daireyi görmeye gittiğinde civardaki berber veya esnafa bina profili, su/elektrik kesintisi sıklığı ve çevre güvenliği hakkında birkaç soru sor.' },
    ],
  },
  {
    id: 'plan',
    title: 'Daire Planı ve Alanlar',
    icon: 'home',
    items: [
      { id: 'v-plan-1', text: 'salon 3 lü-2 li koltuk ve tek berjer + yemek masası koyabilecek m2 de olmalı. bunun karşılığı da minimum 22-23 m2 dir. üstü opsiyon.' },
      { id: 'v-plan-2', text: 'yatak odasında gardolap ve yatakbaşı önemli. bekar evi olmadığını kabul edersek 2 komodin koymak makul. o genişlikte sağır duvar olmalı odada.' },
      { id: 'v-plan-3', text: 'mutfak dolap sayısı yeterli olmalı. ve bir adet küçük masa sandalye koymak için alan olmalı. mutfaktaki bence en önemli nüans; ocağın pencere ya da balkona yakın olması. değilse yayılan koku dışarı yerine eve dolar.' },
      { id: 'v-plan-4', text: 'daire kapısı girişi makul miktarda ferah olmalı. geleni karşılarken-gideni uğurlarken 3-4 kişinin 1-2 dk kapı muhabbeti yapabileceği seviyede geniş olmalı.' },
      { id: 'v-plan-5', text: 'banyoda yeterince dolap+çamaşır makinesi yeri olmalıdır. lavabo geniş olmalıdır. 10 m2 banyo yapmış ama lavabo 40 cm lik. bu olmaz. duş genişliği dar olmamalı, klozet gömme rezervuar olmalıdır. ( opsiyonel ). tek banyo ise kesinlikle azıcık geniş olmalıdır. tercih banyo+misafir wc sidir ama bazen olmayabiliyor.' },
    ],
  },
  {
    id: 'ses',
    title: 'Ses ve Komşular',
    icon: 'volume',
    items: [
      { id: 'v-ses-1', text: 'yan daire ile senin daire hangi odalarda yanyana? örnek; yatak odanızın duvarı yan dairenin yatak odası-salonu-mutfağı ile bitişik olmamalı. 13,5 cm tuğla duvar + sıva ses yalıtımı sağlamaz. sen uyumak istedin gece 11:00 de ama yan dairenin salonu senin yatak odanla bitişik ve onlar hala uyumadıysa tv son ses açık eziyetle geçer günün. yine aynı şekilde yan dairenin yatak odası ile senin yatak odan bitişik olmamalı. onlar sevişir sen dinlersin ya da tam tersi. mümkünse yatak odası bağımsız olmalı. en kötü kendi odalarınla-banyonla bitişik olmalı.' },
      { id: 'v-ses-2', text: 'ses takıntısı varsa kesinlikle son kat tercih edilmeli. (yalıtım var kabul diyorum). en kötü yazın +2 derece sıcak olur onu da hürriyetin için kabullen. üst komşu= kaderin olmamalı.' },
      { id: 'v-ses-3', text: 'kesinlikle alt ve yan komşularını analiz et. mümkünse 60 lı yaşlarda emekli olsunlar. sıfır ses ve senin göstereceğin saygı-ikili ilişki ile nazın geçer. haftada en kötü torunlar gelse bile sen bunu zaten dert etmezsin. bu sorun da halloldu.' },
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
      { id: 'v-yapi-4', text: 'genel olarak yanılgı lüks malzeme = kaliteli ev dir. uygun malzeme ile de olsa işçilik = ev kalitesidir bana göre. malzeme ile her zaman yükseltilebilir bu çıta.' },
    ],
  },
  {
    id: 'bina',
    title: 'Bina Yaşı ve Değerleme',
    icon: 'building',
    items: [
      { id: 'v-bina-1', text: 'Son dönemde yapılan sıfır binalar maliyet artışından dolayı kalitesiz oluyor. Eğer ev alınacaksa 5-10 yaş aralığında bir ev alınmalı. Satılan bina-sitede kira ne ise onu 180 ay ile çarpıp ona göre fiyat değerlemesi yapın. Evi alırken yapıldığı tarihte ülke ekonomisi nasıl bir inceleyin, o dönemde ekonomi iyiyse daha kaliteli malzeme kullanma ihtimalleri daha yüksek.' },
    ],
  },
]

// Emlakçıya sorular: en kritik (eleme) sorular en üstte. Id'ler sabit kalmalı.
export const askGroups = [
  {
    id: 'kritik',
    title: 'Önce Bunları Sor (Eleme)',
    icon: 'scale',
    items: [
      { id: 'q-kritik-1', text: 'Tapu türü ne: Kat Mülkiyeti mi, Kat İrtifakı mı?' },
      { id: 'q-kritik-2', text: 'Binanın iskanı (yapı kullanma izin belgesi) var mı? Belgeyi görebilir miyim?' },
      { id: 'q-kritik-3', text: 'Tapuda ipotek, haciz veya şerh var mı?' },
      { id: 'q-kritik-4', text: 'Daireye veya binaya ait geçmiş aidat, emlak vergisi ya da fatura borcu var mı?' },
      { id: 'q-kritik-5', text: 'Bodrumdaki sığınak projesine uygun mu, dükkana veya daireye çevrilmiş mi?' },
      { id: 'q-kritik-6', text: 'Satıcı neden satıyor, daire ne kadar zamandır satışta?' },
    ],
  },
  {
    id: 'bina',
    title: 'Bina ve Ortak Alanlar',
    icon: 'building',
    items: [
      { id: 'q-bina-1', text: 'Bina kaç yaşında, yapan müteahhit kim?' },
      { id: 'q-bina-2', text: 'Binada jeneratör var mı? Asansör, hidrofor ve ortak alanları besliyor mu?' },
      { id: 'q-bina-3', text: 'Asansörün yıllık bakımı yapılıyor mu, kabinde yeşil etiket var mı?' },
      { id: 'q-bina-4', text: 'Aidat ne kadar, neleri kapsıyor, kasada birikmiş para var mı?' },
      { id: 'q-bina-5', text: 'Binada devam eden veya planlanan büyük bir iş var mı (mantolama, tadilat, dava)?' },
      { id: 'q-bina-6', text: 'Yönetim planını görebilir miyim?' },
      { id: 'q-bina-7', text: 'DASK (zorunlu deprem sigortası) poliçesi var mı?' },
      { id: 'q-bina-8', text: 'Su hattı hangi malzemeden, plastik mi demir mi?' },
    ],
  },
  {
    id: 'daire',
    title: 'Daire',
    icon: 'home',
    items: [
      { id: 'q-daire-1', text: 'Daire net ve brüt kaç m2, tapudaki ile aynı mı?' },
      { id: 'q-daire-2', text: 'Hangi cephelere bakıyor, çapraz hava akımı var mı, batıya bakan oda hangisi?' },
      { id: 'q-daire-3', text: 'Hiç su sızıntısı, rutubet veya üst komşudan akıntı yaşandı mı? Ne zaman, nasıl giderildi?' },
      { id: 'q-daire-4', text: 'Tadilat veya yenileme yapıldı mı? Elektrik ve su tesisatı yenilendi mi, ne zaman?' },
      { id: 'q-daire-5', text: 'Yan, alt ve üst dairelerde kimler oturuyor (ev sahibi mi kiracı mı, yaşları)? Yatak odamla bitişik oda hangisi?' },
      { id: 'q-daire-6', text: 'Evde kiracı var mı? Varsa ne zaman tahliye edilir?' },
      { id: 'q-daire-7', text: 'Elektrik, su ve doğalgaz abonelikleri açık mı, kimin üzerinde?' },
    ],
  },
  {
    id: 'cevre',
    title: 'Çevre ve Konum',
    icon: 'search',
    items: [
      { id: 'q-cevre-1', text: 'Yan veya karşıdaki boş arsaların imar durumu ne, kaç kata izin var, önüm kapanır mı?' },
      { id: 'q-cevre-2', text: 'Mahallede su veya elektrik kesintisi sık olur mu?' },
      { id: 'q-cevre-3', text: 'Toplu taşımaya (durak) yürüme mesafesi ne kadar?' },
    ],
  },
  {
    id: 'surec',
    title: 'Fiyat ve Süreç',
    icon: 'coins',
    items: [
      { id: 'q-surec-1', text: 'Son fiyat nedir, pazarlık payı var mı?' },
      { id: 'q-surec-2', text: 'Aynı binada veya sokakta son bir yılda satılan daire var mı, kaça gitti?' },
      { id: 'q-surec-3', text: 'Banka kredisi çekilebilir durumda mı, ekspertizde sorun çıkar mı?' },
      { id: 'q-surec-4', text: 'Tapu harcı ve diğer masraflar nasıl paylaşılacak, emlakçı komisyonu kimden ve ne kadar?' },
    ],
  },
]

export const rentGroups = [
  {
    id: 'mekan',
    title: 'Mekan ve Donanım',
    icon: 'home',
    tips: [
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
