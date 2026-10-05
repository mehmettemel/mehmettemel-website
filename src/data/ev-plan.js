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
      { id: 'p6', text: 'Findeks notunu kontrol et ve çekebileceğin kredi üst limitini netleştir (dosya masrafı, ekspertiz, DASK ve sigorta kesintilerini de hesaba kat).' },
      { id: 'p7', text: 'Ses yalıtımını öncelikli kriter olarak yaz: yatak odası yan dairelerle bitişik olmasın, mümkünse son kat, komşu profili sessiz olsun.' },
      { id: 'p8', text: 'Bütçeyi satış fiyatı değil, harç ve komisyon dahil toplam üzerinden kur (Ev Alma sekmesindeki maliyet hesaplayıcı).' },
    ],
  },
  {
    id: 'gezme',
    title: 'Arama ve Gezme',
    hint: 'Ay 1-2',
    todos: [
      { id: 'g0', text: 'Emlakçıyla görüşmeden önce "Emlakçıya Sorular" sekmesini aç, kritik soruları sor.' },
      { id: 'g8', text: 'İlandaki konumu TKGM Parsel Sorgu üzerinden ada/parsel numarasıyla doğrula.' },
      { id: 'g9', text: 'Her adayı gündüz, akşam ve hafta sonu gez: güneşin odalara vuruşunu, hava akımını, komşu ve sokak seslerini böyle anlarsın.' },
      { id: 'g10', text: 'Ses testi yap: pencereler kapalıyken sessiz dur, yan daire, üst kat, asansör ve sokak seslerini dinle, yatak odasının hangi odayla bitişik olduğuna bak.' },
      { id: 'g11', text: 'Aidatı öğren ve benzer dairelerin kirasıyla karşılaştır (bazı sitelerde aidat kirayı geçiyor).' },
      { id: 'g12', text: 'Her aday için Gezme Listesi\'ndeki "Kısa Eleme" maddelerini doldur: biri tutmuyorsa fiyat cazip olsa da ilerleme.' },
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
      { id: 'h7', text: 'İnşaat ruhsat tarihini öğren: bina yaşı değil ruhsat tarihi deprem yönetmeliği için esastır.' },
      { id: 'h8', text: 'Tapudan ıslak imzalı takyidat belgesi iste (ipotek, haciz, ihtiyati tedbir, intifa, aile konutu şerhi, şufa). Fotokopi ve e-Devlet tek başına yetmez.' },
      { id: 'h9', text: 'Belediyeden onaylı mimari projeyi doğrula: dairenin yeri, net m2 ve arsa payı ilanla örtüşmeli.' },
      { id: 'h10', text: 'Deprem kontrolü: yönetmelik yılı (2018\'e yakın tercih), yumuşak kat, bodrum (su, pas), kolon-kiriş çatlağı. Mümkünse bağımsız yapı incelemesi yaptır.' },
      { id: 'h11', text: 'Yönetimden karar defteri, son gider tablosu ve borç listesini iste. Otopark tahsisi yazılı mı, asansör ve jeneratör gideri kimde öğren.' },
      { id: 'h12', text: 'Satıcıyı kontrol et: tek malik mi, hisseli mi, vekâletle mi satılıyor, boşanma/icra/senet var mı.' },
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
      { id: 'a4', text: 'Eski su, elektrik ve doğalgaz borçlarının ilişiğini kes, abonelikleri kendi adına aç.' },
      { id: 'a5', text: 'Taşınmayı hafta içi ve sabah saatine anlaşarak planla.' },
      { id: 'a6', text: 'Kaporadan önce metne kredi/ekspertiz iade şartını ekle, evi görmeden kapora gönderme.' },
      { id: 'a7', text: 'Emlakçı komisyonu, tapu harcı (%4) ve değer artış kazancı vergisini kimin ödeyeceğini pazarlıkta netleştir.' },
      { id: 'a8', text: 'Ödemeyi tapu günü Tapu Takas, Güvenli Ödeme Sistemi veya bloke çekle yap. Tapudan önce satıcıya veya emlakçıya elden nakit verme.' },
      { id: 'a9', text: 'Tapudan sonra aynı yıl içinde emlak vergisi beyanını ver.' },
      { id: 'a10', text: 'İpotekli evde kapatılacak tutarı bankadan yazılı al, parayı satıcıya değil doğrudan bankaya yatır.' },
    ],
  },
]

export const buyGroups = [
  {
    id: 'kazik',
    title: 'Kazıklanmamak İçin Vazgeçilmezler',
    icon: 'scale',
    tier: 'kazik',
    tips: [
      'Parayı tapudan önce vermeyin. Kapora dahil, satıcıya veya emlakçıya elden nakit yok. Devir anında bloke çek, Tapu Takas veya Güvenli Ödeme kullanın. 1 Ekim 2026’dan itibaren güvenli ödeme zorunlu. İpotekli evde kapatılacak tutarı bankadan yazılı alın, parayı satıcıya değil bankaya yatırın. Tapu size geçmeden borç kapanmış sayılmaz.',
      'Takyidatı kendiniz görün. Satıcının “temiz” dediği çıktı yetmez. Tapudan ıslak imzalı takyidat belgesi isteyin. İpotek, haciz, ihtiyati tedbir, intifa, aile konutu şerhi ve şufa burada durur. e-Devlet tek başına gizli kaydı göstermeyebilir.',
      'Tapu türü konut olmalı. Kat mülkiyeti (iskan alınmış) isteyin. Kat irtifakı “bitmemiş” demektir. Mavi tapu veya arsa payı, üzerinde daire olsa da hukuken konut değildir; kredi çıkmaz, yıkım riski vardır. Tapudaki adres, kapı numarası ve m² fiili daireyle aynı olmalı.',
      'İskan ve onaylı proje şart. Belediyeden yapı kullanma iznini ve onaylı mimari projeyi siz doğrulayın. İskansız dairede fatura şantiye tarifesine yakın gelir, banka zorlar, ileride satış kilitlenir.',
      'Bedeli tapuda tam gösterin. Düşük göstermek “herkes yapıyor” diye normalleşmiş bir tuzaktır. İhtilafta konuşan rakam tapudaki rakamdır; vergi cezası da ayrıdır. Harcı tek başınıza üstlenmeyin. Toplam harç satış bedelinin %4’üdür, normalde yarı yarıya paylaşılır.',
      'Satıcının kendi derdi size geçmesin. Boşanma, icra, senet, mal kaçırma ihtimalini sorun. Birden fazla malik varsa hepsinin satışı kabul ettiğini görün. Vekâletle satışta vekâletin güncel ve satış yetkisi açık olsun; şüphede notere sorun.',
    ],
  },
  {
    id: 'apartman',
    title: 'İyi Bir Apartman Dairesi İçin Kritikler',
    icon: 'building',
    tier: 'apartman',
    tips: [
      'Taşıyıcı sistem, boyadan önemli. 2018 deprem yönetmeliğine yakın yapılar öncelikli. Zemin kat dükkân veya tamamen açık otoparksa (yumuşak kat) ve kolonlara sonradan müdahale edilmişse uzak durun. Bodrumda su ve pas, kolon-kirişte çatlak kırmızı bayraktır. Yeni boya rutubeti gizler. Mümkünse bağımsız yapı incelemesi yaptırın. DASK tapu için zorunlu; teminatı yeniden yapım maliyetinin altındaysa konut poliçesiyle farkı kapatın.',
      'Aidat, ikinci kira olabilir. Karar defteri, son gider tablosu ve borç listesini isteyin. Ortak alan borcu yeni malike kalır. Bazı sitelerde aidat kirayı geçiyor; satın alma fiyatı değil, aylık gerçek yük bütçeyi belirler. Yönetim içeriden mi, şirket mi, asansör ve jeneratör kimde, otopark tahsisi yazılı mı bakın.',
      'Komşu ve ses, ilanda yazmaz. Evi akşam ve hafta sonu görün. Alt-üst-yan ses geçiyorsa yalıtım zayıftır, sonradan çözülmez. Giriş, kapı önü ve aidat borcu listesi binanın disiplinini gösterir. Alt, üst ve karşı komşuyu sorun.',
      'Değiştiremeyeceğinizi satın alın. Kat yüksekliği, cephe, asansör, otopark, ısı yalıtımı (mantolama) ve güneş sizde kalır. Mutfak ve boya değişir. Önü açık görünen dairenin imar planında yarın yüksek yapı payı olup olmadığına belediyeden bakın.',
    ],
  },
  {
    id: 'arastirma',
    title: 'Ön Araştırma ve Konum Kontrolü',
    icon: 'search',
    tier: 'diger',
    tips: [
      'Parsel ve Adres Teyidi: İlandaki konumu TKGM Parsel Sorgu üzerinden ada/parsel numarasıyla doğrulayın. (Bazen ilan Mezitli/Yenişehir sınırında daha değerli bir mahalle olarak girilip tapuda farklı çıkabiliyor).',
      'Fiyat & Amortisman Hesabı: Evin fiyatını bölgedeki rayiç kira getirisine bölün. Mersin’de yazlık/kiralık talebi yüksek bölgelerde amortisman süresi 13-15 yıl bandında ise kelepir, 16-18 yıl bandı normal kabul edilir.',
      'Gündüz Gözüyle İnceleme: Daireye mutlaka gün ışığında gidin. Mersin’in sert güneşinin hangi saatte hangi odaya vurduğunu ve doğal hava akımını (rüzgar koridorunu) sadece gündüz net anlarsınız.',
      'Deprem Yönetmeliği Tuzağı: Bina yaşı tek başına yeterli değildir; ruhsatın alındığı tarih esastır. Örneğin bina 2008 teslimi olsa bile inşaat ruhsatı 2006’da alındıysa 1998 yönetmeliğine göre yapılmış olabilir.',
    ],
  },
  {
    id: 'piyasa',
    title: 'Piyasa ve Zamanlama',
    icon: 'trend',
    tier: 'diger',
    tips: [
      'Ev alırken çoğu kişinin bakmadığı ama sizin mutlaka bakmanız gereken bir veri var: Bir mahallede, sokakta hatta bölgede geçen yıl kaç tane daire alınıp satıldığını görebiliyorsunuz. Parsel Sorgu uygulamasına (https://parselsorgu.tkgm.gov.tr/) giriyorsunuz: Analiz → Alım Satım Yoğunluğu → 2025 → İl → İlçe → Küme Haritası seçimlerini yapıyorsunuz. Harita üzerinde bölgelerdeki alım-satım yoğunluklarını gösteren rakamlar çıkıyor. Yani bir ev almadan önce: O bölgede ne kadar satış olmuş? Hangi bölgelerde hareketlilik daha fazla? Yatırım yaptığınız bölge gerçekten talep görüyor mu? gibi sorulara veriyle cevap bulabilirsiniz. Gayrimenkul alırken sadece fiyatı değil, bölgenin hareketini de inceleyin.',
      'Fiyatlar durgun, kredi faizlerinin gerçek enflasyonla yan yana geldiği mesela yüzde 9 enflasyon yüzde 9 faiz var. Bu zamanlarda ev alınır. Başını sokacak bir ev ise direkt al.',
    ],
  },
  {
    id: 'hukuki',
    title: 'Tapu, İmar ve Hukuki Kontrol',
    icon: 'scale',
    tier: 'diger',
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
    id: 'bina',
    title: 'Bina, Konum ve Komşular',
    icon: 'building',
    tier: 'diger',
    tips: [
      'Evin içindeki su hattını öğrenin. Demir ise değiştirebilirsiniz. Beyaz plastik borularla tekrar döşetin. Eve girdikten sonra en zor iş su hattını değiştirmek oluyor.',
      'Evin geçmişini ve apartman sakinlerinin yaşantısından küçük çıkarımlar yapmak için zemin kata, kömürlüğe, oto park gibi yerlere inin. Bu kısımlar daha az ilgi gördüğü için apartmanın geneli hakkında bilgi sahibi olabilirsiniz.',
      'Komşularınızı iyi tanımaya çalışın. Bugün iyi bir alt-üst komşusu olmadığı için evini değiştiren binlerce kişi var.',
      '1+0 daire epey dar. Metroya, otobüs durağına 15 dakika yürümek cehennem. Giriş ve 1. katı bırakın. Çöpü kapıcının alması en iyisi.',
    ],
  },
  {
    id: 'kapora',
    title: 'Kapora ve Ön Sözleşme',
    icon: 'file',
    tier: 'diger',
    tips: [
      'Evi Görmeden Asla Para Göndermeyin: "Ev kaçacak", "başka talipli var" baskısıyla sözleşmesiz kapora atmayın.',
      'Kaporaya Kredi/Cayma Şartı: Noter veya emlakçı aracılığıyla imzalanacak kapora metnine şu maddeyi mutlaka ekletin: "Alıcının bankadan talep ettiği kredi miktarı (örneğin X TL) çıkmazsa veya ekspertiz değerinden ötürü kredi onaylanmazsa kapora kesintisiz iade edilir."',
      'Emlakçı Komisyonu: Yasal sınır alıcıdan %2 + KDV’dir. Pazarlıkta satıcının kendi payını (%2) size yükleyip yüklemediğini baştan netleştirin.',
    ],
  },
  {
    id: 'kredi',
    title: 'Kredi, Banka ve Ekspertiz',
    icon: 'coins',
    tier: 'diger',
    tips: [
      'Kredi Notu ve Ön Onay: Ev bakarken Findeks notunuzu kontrol edin ve çekebileceğiniz üst limiti önceden netleştirin.',
      'Maliyet Kesintileri: Onaylanan kredi tutarının tamamı elinize geçmez; dosya masrafı, ekspertiz, DASK, hayat sigortası ve konut sigortası gibi kalemler için kredi tutarından kesinti yapılacağını hesaba katın.',
      'Satıcının Kredi/İpotek Borcu: Satıcının üzerinde halen kapatılmamış konut kredisi varsa süreç uzayabilir; iki banka arasında resmi ipotek yazışmaları yapılması gerekir.',
      'Bloke Hesap Güvencesi: Banka kredili satışta para doğrudan elden verilmez; banka bloke koyar, tapu devri gerçekleştikten ve resmi bildirim sisteme düştükten (genelde birkaç saat içinde) sonra para satıcının hesabına aktarılır.',
    ],
  },
  {
    id: 'maliyet',
    title: 'Gizli Maliyet',
    icon: 'coins',
    tier: 'diger',
    tips: [
      '5 milyon TL’lik örnekte dolaşan kalemler: tapu harcı yaklaşık 200 bin TL (toplam harç oranı satış bedelinin %4’ü, alıcı-satıcı genelde yarı yarıya), emlakçı payı yaklaşık 240 bin TL (%2+KDV taraflarca), DASK ve döner sermaye yaklaşık 10 bin TL. Toplam ekstra kabaca 450 bin TL. Bütçeyi satış fiyatı değil, bu toplam üzerinden kurun. Harcı tek başınıza ödemeyi kabul etmeyin; teklifi buna göre verin.',
    ],
  },
  {
    id: 'tapu',
    title: 'Tapu ve Satış Günü Riskleri',
    icon: 'scale',
    tier: 'diger',
    tips: [
      'Bedeli Düşük Gösterme Riski: Tapu harcı az çıksın diye satış bedelini belediye rayicinden gösterme tekliflerine dikkat edin. Vergi denetimleri banka transferleri ve ekspertiz değerleri üzerinden tespit edip gecikme faizi ve ceza çıkarabiliyor.',
      'Değer Artış Kazancı: Satıcı 5 yıllık süreyi doldurmadıysa çıkacak Değer Artış Kazancı vergisini alıcıya yıkmaya çalışabilir; bunu baştan konuşun.',
      'Tapu Masrafı Paylaşımı: Yasal olarak %4 harç yarı yarıya (%2 alıcı - %2 satıcı) paylaşılır. Ancak bölgedeki yerel piyasada tamamını alıcıya ödetme eğilimi olabilir, pazarlık aşamasında bunu net karara bağlayın.',
      'Ödeme Zamanlaması: Kredisiz peşin alıyorsanız, paranızı asla tapudan bir gün önce göndermeyin. Ya tapu memurunun huzurundayken anlık EFT yapın ya da en güvenlisi Tapu Takas sistemini kullanın.',
    ],
  },
  {
    id: 'sonrasi',
    title: 'Satış Sonrası Resmi İşlemler',
    icon: 'file',
    tier: 'diger',
    tips: [
      'Emlak Beyanı: Tapuyu aldıktan sonra aynı takvim yılı içinde evin bulunduğu ilçe belediyesine gidip (veya e-Devlet üzerinden) emlak vergisi bildiriminde bulunun.',
      'Abonelikler: Dairenin önceki su, elektrik ve doğalgaz borçlarının ilişiğinin kesildiğinden emin olun; ardından kendi adınıza sıfırdan abonelik açtırın.',
    ],
  },
  {
    id: 'yatirim',
    title: 'Yatırım ve Kiraya Verme',
    icon: 'coins',
    tier: 'diger',
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
    id: 'eleme',
    title: 'Kısa Eleme',
    icon: 'scale',
    tier: 'eleme',
    items: [
      { id: 'v-eleme-1', text: 'Takyidat temiz.' },
      { id: 'v-eleme-2', text: 'Kat mülkiyeti ve iskan var.' },
      { id: 'v-eleme-3', text: 'Para tapuyla birlikte el değiştiriyor.' },
      { id: 'v-eleme-4', text: 'Yumuşak kat yok.' },
      { id: 'v-eleme-5', text: 'Aidat sürdürülebilir.' },
      { id: 'v-eleme-6', text: 'Akşam sesi kabul edilebilir.' },
    ],
  },
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
    id: 'ses',
    title: 'Ses Yalıtımı ve Komşular',
    icon: 'volume',
    items: [
      { id: 'v-ses-1', text: 'yan daire ile senin daire hangi odalarda yanyana? örnek; yatak odanızın duvarı yan dairenin yatak odası-salonu-mutfağı ile bitişik olmamalı. 13,5 cm tuğla duvar + sıva ses yalıtımı sağlamaz. sen uyumak istedin gece 11:00 de ama yan dairenin salonu senin yatak odanla bitişik ve onlar hala uyumadıysa tv son ses açık eziyetle geçer günün. yine aynı şekilde yan dairenin yatak odası ile senin yatak odan bitişik olmamalı. onlar sevişir sen dinlersin ya da tam tersi. mümkünse yatak odası bağımsız olmalı. en kötü kendi odalarınla-banyonla bitişik olmalı.' },
      { id: 'v-ses-2', text: 'ses takıntısı varsa kesinlikle son kat tercih edilmeli. (yalıtım var kabul diyorum). en kötü yazın +2 derece sıcak olur onu da hürriyetin için kabullen. üst komşu= kaderin olmamalı.' },
      { id: 'v-ses-3', text: 'kesinlikle alt ve yan komşularını analiz et. mümkünse 60 lı yaşlarda emekli olsunlar. sıfır ses ve senin göstereceğin saygı-ikili ilişki ile nazın geçer. haftada en kötü torunlar gelse bile sen bunu zaten dert etmezsin. bu sorun da halloldu.' },
      { id: 'v-ses-4', text: 'Ses testi: Pencereler kapalıyken sessizce durup dinle. Yan daire, üst kat, kapı ve koridor, asansör ve sokak sesleri geliyor mu? Daireyi bir de akşam saatinde gör, komşular ve sokak en çok o saatte duyulur.' },
      { id: 'v-ses-5', text: 'Yan dairelerle ortak duvarlara bak ve vurup dinle, kalınlığına dikkat et (13,5 cm tuğla + sıva ses yalıtımı sağlamaz). Yatak odası duvarı yan dairenin hangi odasıyla bitişik, asansör kuyusu veya tesisat şaftı yatak odasına komşu mu?' },
      { id: 'v-ses-6', text: 'Pencere ve kapıları kapatıp aç, dış gürültünün ne kadar kesildiğini karşılaştır. Çift cam dış seslerin yalıtımında artıdır.' },
      { id: 'v-ses-7', text: 'Üst kattan adım ve eşya sürükleme sesi geliyor mu, alt dairenin sesi yükseliyor mu? Mümkünse üst ve alt komşuyla kısaca konuş.' },
    ],
  },
  {
    id: 'deprem',
    title: 'Deprem ve Taşıyıcı Sistem',
    icon: 'building',
    items: [
      { id: 'v-deprem-1', text: 'Yumuşak kat kontrolü: Zemin kat dükkân veya tamamen açık otoparksa ve kolonlara sonradan müdahale edilmişse uzak dur.' },
      { id: 'v-deprem-2', text: 'Bodrumda su ve pas, kolon-kirişte çatlak kırmızı bayraktır. Yeni boya rutubeti ve çatlağı gizler, bodruma inip kendin gör.' },
      { id: 'v-deprem-3', text: 'Hangi deprem yönetmeliğine göre yapılmış? 2018 deprem yönetmeliğine yakın yapılar öncelikli.' },
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
      { id: 'v-tesisat-4', text: 'Giriş, kapı önü ve ortak alanlar binanın disiplinini gösterir. Aidat borcu listesini sor.' },
      { id: 'v-tesisat-5', text: 'Muslukları ve tesisatı aç, prizleri tek tek dene.' },
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

// Emlakçıya sorular. tier: 'kazik' (kazıklanmamak için vazgeçilmezler), 'apartman'
// (iyi bir apartman dairesi için kritikler), 'ekstra' (zaman olursa). Id'ler sabit kalmalı,
// işaret durumu bu id ile saklanır.
export const askGroups = [
  {
    id: 'belge',
    title: 'Belge ve Tapu',
    icon: 'scale',
    tier: 'kazik',
    items: [
      { id: 'q-belge-1', text: 'Tapu türü ne: Kat Mülkiyeti mi, Kat İrtifakı mı? Mavi tapu veya arsa payı tapulu mu?' },
      { id: 'q-belge-2', text: 'Binanın iskanı (yapı kullanma izin belgesi) var mı? Belgeyi görebilir miyim?' },
      { id: 'q-belge-3', text: 'Tapudan ıslak imzalı güncel takyidat belgesi alabilir miyim? İpotek, haciz, ihtiyati tedbir, intifa, aile konutu şerhi veya şufa var mı?' },
      { id: 'q-belge-4', text: 'Onaylı mimari projeyi görebilir miyim? Dairenin yeri, net m2 ve arsa payı ilanla örtüşüyor mu?' },
      { id: 'q-belge-5', text: 'Tapudaki adres, kapı numarası, kat ve m2 bu daireyle aynı mı?' },
      { id: 'q-belge-6', text: 'Ada ve parsel numarası nedir? İlandaki konumu TKGM Parsel Sorgu üzerinden doğrulayacağım.' },
      { id: 'q-belge-7', text: 'Geçmiş aidat, emlak vergisi ve fatura borcu var mı? Borcu olmadığını gösteren belgeyi alabilir miyim?' },
      { id: 'q-belge-8', text: 'Dairede veya binada kaçak eklenti (kapalı balkon, çatı katı vb.) var mı? İmar dosyasında yapı tatil tutanağı veya ceza kararı çıktı mı?' },
      { id: 'q-belge-9', text: 'Bodrumdaki sığınak projesine uygun mu, dükkana veya daireye çevrilmiş mi?' },
    ],
  },
  {
    id: 'para',
    title: 'Para ve Ödeme',
    icon: 'coins',
    tier: 'kazik',
    items: [
      { id: 'q-para-1', text: 'Kapora dahil hiçbir parayı tapudan önce elden vermeyeceğim. Ödemeyi Tapu Takas, Güvenli Ödeme Sistemi veya bloke çekle yapabilir miyiz?' },
      { id: 'q-para-2', text: 'Satıcının ipoteği varsa kapatılacak tutarı bankadan yazılı alabilir miyiz? Parayı satıcıya değil bankaya yatırabilir miyiz?' },
      { id: 'q-para-3', text: 'Tapuda satış bedeli gerçek bedel olarak mı gösterilecek?' },
      { id: 'q-para-4', text: 'Tapu harcının (toplam %4) yarısını satıcı ödeyecek mi? Diğer masraflar nasıl paylaşılacak?' },
      { id: 'q-para-5', text: 'Kapora ne kadar, kime ödeniyor? Kredi çıkmazsa veya ekspertiz düşük kalırsa kesintisiz iade şartını yazabilir miyiz?' },
      { id: 'q-para-6', text: 'Emlakçı komisyonu alıcıdan ne kadar? Satıcının payı bana yansıtılıyor mu?' },
      { id: 'q-para-7', text: 'Satıcı 5 yıllık süreyi doldurdu mu? Değer artış kazancı vergisi çıkacaksa kim ödeyecek?' },
      { id: 'q-para-8', text: 'Son fiyat nedir, pazarlık payı var mı?' },
      { id: 'q-para-9', text: 'Aynı binada veya sokakta son bir yılda satılan daire var mı, kaça gitti?' },
      { id: 'q-para-10', text: 'Bölgede benzer dairelerin kirası ne kadar? Fiyat kira x 180 ay ile uyumlu mu?' },
      { id: 'q-para-11', text: 'Taşınmaz ticareti yetki belgeniz var mı, görebilir miyim?' },
    ],
  },
  {
    id: 'satici',
    title: 'Satıcı Riski',
    icon: 'file',
    tier: 'kazik',
    items: [
      { id: 'q-satici-1', text: 'Tapuda tek malik mi var, hisseli mi? Birden fazla malik varsa hepsi satışı kabul ediyor mu, hepsini görebilir miyim?' },
      { id: 'q-satici-2', text: 'Vekâletle mi satılıyor? Vekâlet güncel mi, satış yetkisi açıkça yazıyor mu? (Şüphede notere sor.)' },
      { id: 'q-satici-3', text: 'Satıcı neden satıyor? Boşanma, icra, senet veya mal kaçırma gibi bir durum var mı?' },
      { id: 'q-satici-4', text: 'Tapuda aile konutu şerhi var mı, eşin onayı alınacak mı?' },
      { id: 'q-satici-5', text: 'Evde kiracı var mı? Varsa ne zaman ve hangi şartla tahliye edilecek, daire boş mu teslim edilecek?' },
      { id: 'q-satici-6', text: 'Satıcıyla tapudan önce yüz yüze görüşebilir miyim?' },
    ],
  },
  {
    id: 'deprem',
    title: 'Taşıyıcı Sistem ve Deprem',
    icon: 'building',
    tier: 'apartman',
    items: [
      { id: 'q-deprem-1', text: 'İnşaat ruhsatı hangi yıl alınmış, hangi deprem yönetmeliğine göre yapılmış? (2018 yönetmeliğine yakın yapılar öncelikli.)' },
      { id: 'q-deprem-2', text: 'Zemin katta dükkân veya tamamen açık otopark var mı (yumuşak kat)? Kolonlara sonradan müdahale edildi mi?' },
      { id: 'q-deprem-3', text: 'Bodrumda su, pas veya kolon-kirişte çatlak var mı? Bodruma inip bakabilir miyim?' },
      { id: 'q-deprem-4', text: 'Zemin etüdü raporu var mı? Bağımsız yapı incelemesi veya performans analizi yaptırabilir miyim?' },
      { id: 'q-deprem-5', text: 'DASK poliçesi var mı? Teminat yeniden yapım maliyetinin altındaysa farkı konut poliçesiyle kapatmayı planlıyorum.' },
      { id: 'q-deprem-6', text: 'Binada ciddi bir hasar, güçlendirme veya devam eden dava var mı?' },
    ],
  },
  {
    id: 'aidat',
    title: 'Aidat ve Yönetim',
    icon: 'coins',
    tier: 'apartman',
    items: [
      { id: 'q-aidat-1', text: 'Aylık aidat ne kadar, neleri kapsıyor? (Bazı sitelerde aidat kirayı geçiyor, bütçeyi aylık gerçek yük belirler.)' },
      { id: 'q-aidat-2', text: 'Yönetimden karar defterini, son gider tablosunu ve borç listesini görebilir miyim?' },
      { id: 'q-aidat-3', text: 'Ortak alan borcu var mı? (Ortak alan borcu yeni malike kalır.) Aidat ödemeyen daire var mı?' },
      { id: 'q-aidat-4', text: 'Yönetim içeriden mi, profesyonel şirket mi?' },
      { id: 'q-aidat-5', text: 'Asansör ve jeneratör giderini kim ödüyor?' },
      { id: 'q-aidat-6', text: 'Otopark tahsisi yazılı mı? Elektrikli araç şarjı var mı?' },
      { id: 'q-aidat-7', text: 'Kasada birikmiş para var mı, planlanan büyük bir iş (mantolama, asansör yenileme) var mı?' },
    ],
  },
  {
    id: 'ses',
    title: 'Ses Yalıtımı ve Komşu',
    icon: 'volume',
    tier: 'apartman',
    items: [
      { id: 'q-ses-1', text: 'Yan daireyle ortak duvar kaç cm kalınlığında, hangi malzemeden (tuğla, gazbeton, briket)? Ses yalıtımı yapılmış mı?' },
      { id: 'q-ses-2', text: 'Yatak odamın duvarı yan dairenin hangi odasıyla (salon, yatak odası, mutfak, banyo) bitişik?' },
      { id: 'q-ses-3', text: 'Yan, alt ve üst dairelerde kimler oturuyor (ev sahibi mi kiracı mı, yaşları, çocuk var mı)? Üst kattan adım veya eşya sürükleme sesi geliyor mu?' },
      { id: 'q-ses-4', text: 'Katlar arası döşemede (şap altı) ses yalıtımı yapılmış mı?' },
      { id: 'q-ses-5', text: 'Pencereler çift cam mı? Cadde veya sokak gürültüsü yatak odasına geliyor mu?' },
      { id: 'q-ses-6', text: 'Asansör, hidrofor ve tesisat şaftı yatak odasına yakın mı, geceleri ses yapıyor mu?' },
      { id: 'q-ses-7', text: 'Çevrede gürültü kaynağı var mı (ana cadde, cami, okul, eğlence mekanı, inşaat)?' },
      { id: 'q-ses-8', text: 'Evi akşam ve hafta sonu da görebilir miyim? Giriş ve kapı önü genelde nasıl, komşularla kısaca konuşabilir miyim?' },
    ],
  },
  {
    id: 'degismez',
    title: 'Değiştiremeyeceğin Şeyler',
    icon: 'home',
    tier: 'apartman',
    items: [
      { id: 'q-degismez-1', text: 'Daire kaçıncı kat, hangi cepheye bakıyor, güneşi ve rüzgarı nasıl alıyor?' },
      { id: 'q-degismez-2', text: 'Yan veya karşıdaki boş arsaların imar durumu ne, kaç kata izin var? Yarın önüme yüksek bina yapılabilir mi? (Belediyeden de bakacağım.)' },
      { id: 'q-degismez-3', text: 'Asansör var mı, yıllık bakımı yapılıyor mu, kabinde yeşil etiket var mı?' },
      { id: 'q-degismez-4', text: 'Otopark durumu ne: kapalı otopark, tahsisli yer, depo var mı?' },
      { id: 'q-degismez-5', text: 'Dış cephede mantolama ve ısı yalıtımı var mı, ne zaman yapıldı?' },
    ],
  },
  {
    id: 'gizli',
    title: 'Gizli Kusurlar',
    icon: 'hammer',
    tier: 'apartman',
    items: [
      { id: 'q-gizli-1', text: 'Hiç su sızıntısı, rutubet veya üst komşudan akıntı yaşandı mı? Ne zaman, nasıl giderildi?' },
      { id: 'q-gizli-2', text: 'Son iki yılda dairede boya, tadilat veya yenileme yapıldı mı? Neden? (Yeni boya rutubeti gizler.)' },
    ],
  },
  {
    id: 'bina',
    title: 'Bina ve Ortak Alanlar',
    icon: 'building',
    tier: 'ekstra',
    items: [
      { id: 'q-bina-1', text: 'Bina kaç yaşında, yapan müteahhit veya firma kim?' },
      { id: 'q-bina-2', text: 'Bina kaç daireli, kaç katlı?' },
      { id: 'q-bina-3', text: 'Binada jeneratör var mı? Asansör, hidrofor ve ortak alanları besliyor mu?' },
      { id: 'q-bina-4', text: 'Yönetim planını görebilir miyim? (Evcil hayvan ve kullanım kuralları dahil.)' },
      { id: 'q-bina-5', text: 'Su hattı hangi malzemeden, plastik mi demir mi?' },
      { id: 'q-bina-6', text: 'Çatı ve teras yalıtımı yapıldı mı, çatıdan su alma geçmişi var mı?' },
      { id: 'q-bina-7', text: 'Kapıcı veya güvenlik var mı? Ortak alan temizliği düzenli mi?' },
    ],
  },
  {
    id: 'daire',
    title: 'Daire',
    icon: 'home',
    tier: 'ekstra',
    items: [
      { id: 'q-daire-1', text: 'Daire net ve brüt kaç m2?' },
      { id: 'q-daire-2', text: 'Salon yaklaşık kaç m2, üçlü ve ikili koltuk ile yemek masası sığar mı?' },
      { id: 'q-daire-3', text: 'Çapraz hava akımı var mı, batıya bakan oda hangisi?' },
      { id: 'q-daire-4', text: 'Elektrik ve su tesisatı yenilendi mi, ne zaman?' },
      { id: 'q-daire-5', text: 'Isıtma ve soğutma nasıl: kombi kaç yaşında, klima tesisatı ve dış ünite yeri hazır mı?' },
      { id: 'q-daire-6', text: 'Hangi eşyalar devrediliyor (klima, mutfak dolabı, perde vb.)?' },
      { id: 'q-daire-7', text: 'Elektrik, su ve doğalgaz abonelikleri açık mı, kimin üzerinde?' },
      { id: 'q-daire-8', text: 'Mutfak dolabı gövdesi MDF mi? Armatürler hangi marka?' },
      { id: 'q-daire-9', text: 'Ocak pencereye veya balkona yakın mı, mutfakta havalandırma var mı?' },
      { id: 'q-daire-10', text: 'Pencereler PVC mi, ne zaman takıldı?' },
      { id: 'q-daire-11', text: 'Çelik kapı ve kilit sistemi hangi marka?' },
      { id: 'q-daire-12', text: 'Balkon kaç m2, cam balkon yapılmış mı, ruhsatlı mı?' },
    ],
  },
  {
    id: 'cevre',
    title: 'Çevre ve Konum',
    icon: 'search',
    tier: 'ekstra',
    items: [
      { id: 'q-cevre-1', text: 'Mahallede su veya elektrik kesintisi sık olur mu?' },
      { id: 'q-cevre-2', text: 'Toplu taşımaya (durak) yürüme mesafesi ne kadar?' },
      { id: 'q-cevre-3', text: 'Yağmurda sokakta veya bodrumda su baskını olur mu?' },
      { id: 'q-cevre-4', text: 'Çevre güvenliği nasıl, geceleri sokak aydınlık ve sakin mi?' },
      { id: 'q-cevre-5', text: 'Market, eczane, okul ve hastaneye mesafe ne kadar?' },
      { id: 'q-cevre-6', text: 'Mahallede sokak otoparkı sorunu var mı?' },
      { id: 'q-cevre-7', text: 'Denize ve sahile uzaklık ne kadar, esinti alıyor mu?' },
      { id: 'q-cevre-8', text: 'Mahalle sakinleri kimler (aileler mi, öğrenci veya kiracı yoğunluğu mu)?' },
    ],
  },
  {
    id: 'surec',
    title: 'Satış Süreci ve Teslim',
    icon: 'file',
    tier: 'ekstra',
    items: [
      { id: 'q-surec-1', text: 'Daire ne kadar zamandır satışta? Daha önce teklif veren oldu mu, neden olmadı?' },
      { id: 'q-surec-2', text: 'Satıcının üzerinde konut kredisi varsa hangi bankada? İpotek kaldırma süreci nasıl işleyecek?' },
      { id: 'q-surec-3', text: 'Ödeme planı ne: peşin mi, kredili mi? Kredili ise hangi bankalarla çalıştınız?' },
      { id: 'q-surec-4', text: 'Tapu randevusu ne zaman alınabilir, eve ne zaman girebilirim?' },
      { id: 'q-surec-5', text: 'Daire boş mu teslim edilecek, eşyalar ve demirbaşlar ne olacak?' },
      { id: 'q-surec-6', text: 'Evrakların (tapu, iskan, imar durumu) fotokopisini alabilir miyim?' },
      { id: 'q-surec-7', text: 'Sözleşmeyi noterde mi yapacağız? Satış vaadi sözleşmesi imzalanacak mı?' },
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
