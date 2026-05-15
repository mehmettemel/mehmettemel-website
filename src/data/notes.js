/**
 * Notes Data
 * All quotes and notes organized by category
 * Categories: saglik, gida, kisisel, genel
 *
 * To add a new note:
 * 1. Find the correct category array below
 * 2. Add a new object with: { id, text, author (optional), source (optional) }
 * 3. Use Date.now() or a unique timestamp for the id
 */

export const noteCategories = [
  { id: 'all', name: 'Tümü', icon: '📚' },
  { id: 'gida', name: 'Gıda', icon: '🍎' },
  { id: 'saglik', name: 'Sağlık', icon: '🏥' },
  { id: 'kisisel', name: 'Kişisel', icon: '💭' },
  { id: 'genel', name: 'Genel', icon: '📝' },
]

const saglik = [
  {
    id: 1712144686508,
    text: 'Bağışıklık sistemi hastalıklarından (solunum yolu) ve bağırsak sağlığı sorunlarından korunmak için Glutamin alın. Bağırsak hücreleri ve bağışıklık hücreleri enerjileri için glutamine bayılır.',
  },
  {
    id: 1712143998454,
    text: "Smoothie blender'larının plastik hazneleri, hızlı sürtünme nedeniyle inanılmaz miktarda mikroplastiği içeceğinize karıştırır. Paslanmaz çelik hazneli blender kullanın.",
  },
  {
    id: 1708775062272,
    text: 'Mükemmel beslenseniz ve spor yapsanız dahi, yönetemediğiniz stres veya sorunlu ilişkiler tüm doğruları silip süpürür.',
  },
  {
    id: 1708775034469,
    text: "Suyu bir anda, lıkır lıkır, hızlı bir şekilde içmeyin. Suyu tek seferde hızlıca içerseniz, mideden hızla ince bağırsağa ve kana geçer. Kanda aniden sıvı artışı olunca damarlardaki basınç reseptörleri \"kan basıncı artıyor\" uyarısı verir. Vücut suyu hücrelere ulaştırmadan böbrekler yoluyla hızla dışarı atar.\nSuyu yudum yudum, zamana yayarak için.",
  },
  {
    id: 1708098336843,
    text: 'Sinaptik Budama (Synaptic Pruning): Beyin gelişiminin "uzun otlarla dolu bir tarla" gibi olması; kullanılan yollar (kültürel alışkanlıklar) belirginleşirken diğerlerinin kapanması.',
  },
  {
    id: 1707557244481,
    text: 'Sol tarafınıza yatın. Sağ tarafa yatmak organların mideye baskı yapmasına ve reflüye (GERD) neden olabilir.',
  },
  {
    id: 1707557233945,
    text: 'Haftanın 7 günü aynı saatte uyanın. Yatış saati değil, uyanış saati melatonini düzenler.',
  },
  {
    id: 1707479292651,
    text: 'Kansere karşı en etkili gıdalar:\n- Zerdeçalla birlikte karabiber\n- Yeşil Çay',
  },
  {
    id: 1707464675896,
    text: "Akşamları kırmızı ışık kullanın ve mavi ışığı (ekranları) 20:00'den sonra kesin.",
  },
  {
    id: 1707464591052,
    text: 'Her saat başı 10 adet "air squat" yapın. Saatlik squatlar, uzun süre oturmanın (sedanter yaşam) neden olduğu lipoprotein lipaz enziminin kapanmasını engeller.',
  },
  {
    id: 1706968694841,
    text: 'Antibiyotik alırken dikkat edilecekler:\nAntibiyotik öncesi, sırası ve sonrasında yüksek lifli, bitki bazlı beslenin. Bağırsak liften yoksun bırakıldığında, antibiyotik hasarı daha şiddetli olur ve iyileşme gecikir. Eklenmiş şeker, ultra işlenmiş gıdalar ve aşırı doymuş yağlardan uzak durun. Sabahları güneş ışığına çıkın ve hafif egzersiz yapın.',
  },
  {
    id: 1706968640797,
    text: "If you have a daughter, start ballet lessons around age 4/5.\n\nBenefits:\n- Posture\n- Discipline\n- Focus & coordination\n- Teamwork/social skills\n- Strength & muscle tone\n- Feminine movement\n- Classical music",
  },
  {
    id: 1706271975952,
    text: 'Yemek bittikten sonraki ilk 90 dakika içinde hareket etmeye başlayın; çünkü glikoz bu sürede zirve yapar. Yemekten sonra 10 dakikalık kısa bir yürüyüş, kan şekerini düşürmek için yeterlidir.',
  },
  {
    id: 1706082544534,
    text: 'Dates is the best pre workout. Pure rocket fuel. Eat with empty stomach.',
  },
  {
    id: 1706005964471,
    text: "A 20 minute walk after meals is one of the most overlooked health tools.",
  },
  {
    id: 1706005963525,
    text: "Your leg strength predicts how long you'll live. Not your weight.",
  },
  {
    id: 1705950600399,
    text: 'Joe Rogan: Sauna 4x per week for 20 minutes at 175 degrees = 40% decrease in all cause mortality. Great for inflammation and red blood cells.',
  },
  {
    id: 1705776972683,
    text: 'Yatak odanızı bir "mağara" yapın: Tamamen karanlık, sessiz ve soğuk.\n\nIşığı tamamen kesmek için karartma perdeleri veya göz maskesi kullanın.\n\nİdeal uyku sıcaklığı 16-20°C (60-67°F) arasındadır.\n\nYatmadan hemen önce sıcak duş almayın. Vücut ısısının düşmesi uykuyu başlatır; duşu yatmadan 1.5-2 saat önce alın.\n\nYatak sadece uyku ve seks içindir; bilgisayar veya telefonla yatakta vakit geçirmek beynin orayı "uyanıklık" ile eşleştirmesine neden olur.',
  },
  {
    id: 1705679648309,
    text: 'Dopamin seviyenizi artırmak için yenilik (novelty), risk alma (fiziksel, sosyal veya entelektüel), öngörülemezlik ve karmaşıklığa maruz kalın.',
  },
  {
    id: 1705654496909,
    text: 'Güç (strength), kas kütlesinden (muscle mass) daha kritiktir. Kas kütlesi genellikle gücün bir göstergesi (proxy) olarak kullanılır ama asıl önemli olan metrik güçtür.\n\nGücü ölçmek için sadece squat/deadlift ağırlıklarına bakmayın; kavrama gücü (grip strength), asılı kalma (dead hang) ve hava squatı gibi temel testleri kullanın.',
  },
  {
    id: 1705654001780,
    text: 'Odaklanma gerektiren zihinsel işlerinizi, egzersizden sonraki 1-3 saatlik dilime planlayın.\n\nGünde 1-4 porsiyon düşük şekerli fermente gıda tüketin (Kimchi, lahana turşusu, kefir, kaliteli yoğurt).\n\nOda sıcaklığında satılan turşular değil, soğuk zincirde (fermente) olan canlı kültürlü turşuları tercih edin.\n\nKoruyuculu ve pastörize (raf ömrü uzun) turşulardan canlı kültür bekleme.',
  },
  {
    id: 1705604153466,
    text: 'Stresli anlarda "derin nefes al" demek yerine "yavaş ve uzun nefes ver" (expiration) denmelidir. Nefes vermek Vagus sinirini uyarır ve kalp hızını yavaşlatır.\n\nUzun süre nefes verdiğinizde beyin şaşırır: "Stresli olsaydı hızlı nefes alırdı, yavaş verdiğine göre güvendeyiz" diyerek sempatik sistemi kapatır.',
  },
  {
    id: 1705609152756,
    text: 'Balık yağınızı mutlaka buzdolabında saklayın. Omega-3 çoklu doymamış bir yağ olduğu için oksidasyona karşı son derece hassastır.',
  },
  {
    id: 1705348234734,
    text: 'Huberman kreatin protokolü: 1 hafta boyunca günde 30-40g "yükleme", ardından günde 10g devam dozu. Her 16 haftada bir, vücudu dinlendirmek ve gücünüzü test etmek için 1 hafta kreatin kullanımını tamamen durdurun.\n\nMagnezyum Threonate veya Bisglycinate formlarını tercih edin; bunlar kan-beyin bariyerini daha kolay geçer. Magnezyum takviyesini uykudan 30-60 dakika önce alın. Modern tarım nedeniyle topraktaki magnezyum tükendiğinden, günümüzdeki sebzelerden (kale vb.) yeterli magnezyum almak zordur.',
  },
  {
    id: 1705175520931,
    text: 'Box Breathing (4-4-4-4) ile hızlıca vagus sinirini resetleyip sinir sistemini sakinleştir: burundan 4 sn al, tut, ver, tut.',
  },
  {
    id: 1768243881702,
    text: 'Bağışıklık takviyesinde 1 numaraya D vitaminini koyun.',
    author: 'Osman Müftüoğlu',
  },
  {
    id: 1768243962225,
    text: 'Narı kabuğundaki beyaz liflerle birlikte tüketin veya suyunu öyle sıkın. En değerli polifenoller (elajotaninler) o beyaz liflerde ve çekirdektedir.',
    author: 'Osman Müftüoğlu',
  },
  {
    id: 1747136800000,
    text: 'Yemek sonrası oluşan ağır yorgunluk ve uyku halini (postprandiyal somnolans) önlemek için yemekten 30 dakika önce 1 taze limonun suyunu sıkıp, eşit miktarda suyla (1:1 oranında) karıştırarak içmek.',
  },
  {
    id: 1747136800001,
    text: 'Düzenli kan testi yaptırmayı, özellikle testosteron seviyelerini kontrol etmeyi tavsiye ediyor. Çünkü birçok "zihinsel" sorun (öfke, irritasyon, depresyon gibi) aslında hormonal dengesizlikler, enflamasyon veya besin eksikliklerinden kaynaklanabiliyor. Bunları erken tespit etmek, gereksiz terapi veya ilaç yerine kök nedeni çözmeyi sağlar.',
  },
  {
    id: 1747308000000,
    text: 'Hastalanmamak için yapılması gerekenler:\n- Telefonunuzu her gün dezenfekte edin. Telefon inanılmaz miktarda mikrop taşır.\n- Küçük çocuklardan uzak durun. Çocuklar (özellikle kreş ve okul çağındakiler) sürekli yeni virüsler getirir.\n- Elleri sık sık yıkayın.\n- Elleri, özellikle yıkanmamışken gözlere, burna veya ağza götürmeyin.\n- Sauna kullanın ama testisleri soğuk tutun. Kalabalık alanlarda N95 maske takın.\n- Bağışıklık güçlendirici karışım: sarımsak, zencefil, bal ve zerdeçal.',
  },
]

const gida = [
  {
    id: 1712143969086,
    text: 'Acı, baharatlı veya asidik yiyecekleri (acı sos, ketçap) asla plastikte saklamayın. Asit, kimyasalların gıdaya geçişini (leaching) olağanüstü hızlandırır.',
  },
  {
    id: 1706401416903,
    text: 'Her gün 3 öğün aynı saatte yemek yemek mekaniktir ve vücudu hantallaştırır. Bazen çok yiyin, bazen aç kalın (oruç/fasting). Vücut besin yoksunluğu stresiyle (Hormesis) antikırılganlaşır.',
  },
  {
    id: 1705950454643,
    text: "I am Italian and not all pastas are the same. The yellowish pasta is the worst quality with high glycemic index because it has been dried out using high temperatures in just few hours.\nGood quality pasta has off white color and is dried slowly. Eat healthy and stay safe!",
  },
  {
    id: 1705764588451,
    text: 'Meyve ve sebzeler %80-95 sudur; lif ihtiyacını tam karşılamak için kuru baklagiller ve tam tahıllar şarttır.',
  },
  {
    id: 1705764760650,
    text: 'Sarımsağı kullanmadan 10 dakika önce doğrayın; bu yararlı besin maddelerini 3 katına çıkarır.',
  },
  {
    id: 1705764706142,
    text: 'Etiketinde mutfağınızda bulunmayan isimler (kimyasallar) olan gıdalardan kaçının.',
  },
  {
    id: 1706940187938,
    text: 'Karaciğerin en büyük dostu sülfür zengini gıdalardır: Lahana, turp, brokoli, karnabahar. Karaciğerdeki yağı yakmak için en az 7500 adım atmalısınız.',
  },
  {
    id: 1747136900000,
    text: "Balık pişirmeden önce içindeki Omega-3'ü korumak için limon, soğan ve karabiber ile marine edin.",
  },
  {
    id: 1747136900001,
    text: "Balığı fırında hazırlarken küçük balıklarda 150-160 dereceyi, büyük balıklarda ise en fazla 180 dereceyi geçmeyin. Yüksek sıcaklık omega-3'ü yok eder.",
  },
  {
    id: 1747136900002,
    text: 'Mevsiminde olmayan hiçbir sebze ve meyveyi almayın. Yaz güneşinde yetişen domates ile kışın serada yetişen domates arasında, içerdiği likopen ve polifenol (koruyucu maddeler) açısından en az %25-%30\'luk ciddi bir azalma farkı vardır.',
  },
  {
    id: 1747136900003,
    text: 'Sebzelerdeki tarım ilaçlarını biraz arındırmak için; 10-15 dk tuzlu suda bekletin, ardından 1 litre suya 1 yemek kaşığı karbonat oranlı suda 15-20 dakika daha bekletin.',
  },
  {
    id: 1747136900004,
    text: 'Sebzeleri pişirmek veya turşulamak (fermente etmek) üzerlerindeki tarım ilaçlarını büyük oranda inaktive eder (yok eder). Bu yüzden asıl özen çiğ yenilen salatalık malzemelere gösterilmelidir.',
  },
  {
    id: 1747136900005,
    text: 'Evinizdeki boş saksılarda çiçek yerine maydanoz yetiştirin. Her gün güvendiğiniz topraktan çıkan 3 yaprak maydanoz yemek bile hücreleri harika besler.',
  },
  {
    id: 1747136900006,
    text: "Marketten alınan sebze meyveler koptuktan 5 gün sonra size ulaşır ve bu 5 gün içinde vitamin/mineral değerlerinin %30'u yok olur. Bu yüzden haftalık pazar alışverişi yerine, azar azar alıp taze tüketmeye çalışın.",
  },
]

const kisisel = [
  {
    id: 1712230574433,
    text: 'Odak noktanızı "Verimlilikten" (bir şeyi olabildiğince ucuza ve çok sayıda üretip kar etmek), "Dayanıklılığa" (krizleri atlatabilmeye ve hayatta kalmaya) kaydırın.',
  },
  {
    id: 1708768173224,
    text: 'Liderler sadece kendi takımlarının onlara göstermek istediği dünya versiyonunu yaşarlar. İyi bir CEO bu filtreyi kırmalıdır.\nFiltreleri aşmak için rastgele, direkt kanallar açın. Şirketteki otoriteyi umursamayan, kod ile yaşayan 4 alt kademedeki mühendislerle (veya 24 yaşındaki genç yeteneklerle) düzenli görüşün, size acı gerçekleri onlar söyleyecektir.',
  },
  {
    id: 1708767641669,
    text: 'Her zaman insanlara bahis yapın. İyi veya kötü şirketler gelir geçer, ancak harika insanlar her zaman harika işler çıkarır.\n"Harika İnsan" (Great Person) profili: Başarılı, onurlu, sadık, ne yapacağını söyleyen ve sonuç iyi de olsa kötü de olsa verdiği sözün arkasında duran, çok çalışan kişi.',
  },
  {
    id: 1708761779827,
    text: 'Gerçekten başarılı olan insanlar hedeflere değil; sürece, öğrenmeye, risk almaya ve kendilerini ilginç şeyler bilen insanlarla çevrelemeye bağlıdırlar. Bu, onları hayat boyu canlı tutar.\n\nBiri bana asıl hedefin canlı kalmak ve öğrenmek olduğunu söyleseydi, parayı çok daha az önemser, gençliğimde aldığımdan çok daha fazla risk alırdım.\n\nKendinizi sürekli sizden daha genç insanlarla çevreleyin. Genç insanların dünyaya bakış açıları, önyargıları ve karar alma çerçeveleri tamamen farklıdır. Onlar, sizin için geleceğe dair bir "erken uyarı sistemi" işlevi görürler.',
  },
  {
    id: 1708414741781,
    text: 'Ekonominin amacı üretimi artırmak değil, insanların değer verdikleri bir hayatı seçip yaşayabilmeleri için kapasitelerini (sağlıklı olmak, yaratıcı olmak vb.) genişletmektir.',
  },
  {
    id: 1708338557868,
    text: 'Be humble, your salary is someone\'s perfume.',
  },
  {
    id: 1708248971114,
    text: 'Once a man loses his mother he will never experience that kind of unconditional love on earth ever again.',
  },
  {
    id: 1707915174733,
    text: "Sigmund Freud believed a father must be a \"threat,\" not a friend, or the son never fully becomes a man.\n\nA boy is born into the world of the mother, warmth, forgiveness, safety. But maturity begins only when the father introduces limits, hierarchy, and resistance.\n\nFreud called this the \"Law of the Father\". not violence, but authority that doesn't collapse under emotion.\n\nWhen a father becomes a buddy too early, the boy never exits childhood. Historically, initiation meant separation from the mother, fear, discipline, even pain. The father was the guide into danger, responsibility, and competition.\n\nToday that role is diluted into reassurance and endless empathy. The result is visible everywhere: grown men addicted to comfort, terrified of criticism, avoiding risk, seeking approval.\n\nFriendship with father is possible, but only after strength is proven, not before. Until then, firmness is not cruelty. It is preparation. The world will not negotiate. A father existed to make sure his son could survive that fact.",
  },
  {
    id: 1707728618977,
    text: "Our biggest downfall as men, is that after you finally win, we sit down to eat with women who never starved with us.",
  },
  {
    id: 1707557296824,
    text: 'Ekonomik krizlerde doğan şirketler (Airbnb, Uber, Tesla, Palantir) kısıtlamaları avantaja çevirerek büyük başarı yakaladı. Bireysel yatırımcılar için kaynak azlığı dezavantaj değil, özgün stratejiler geliştirme fırsatıdır; büyük fonları taklit etmek yerine farklı düşünmek gerekir.',
  },
  {
    id: 1707308015657,
    text: "you pity the moth confusing a lamp for the moon, yet here you are confusing a screen for the world",
  },
  {
    id: 1707307252506,
    text: "the final stage of being smart is acting dumb",
  },
  {
    id: 1707131456412,
    text: "Your salary is based on how hard you are to replace, not how hard you work.",
  },
  {
    id: 1706595828520,
    text: '"Ekran süresini" (screen time) "insan süresiyle" (people time) değiştirin.',
  },
  {
    id: 1706595533754,
    text: "Forget rich versus poor, white-collar versus blue. It's now leveraged versus un-leveraged.",
  },
  {
    id: 1706521428377,
    text: "I own a small bakery. Business has been slow. Rent is up. I was thinking about closing.\n\nLast Friday, a teenager came in. He looked nervous. He counted out change for a cookie. He was short 50 cents.\n\n\"It's okay,\" I said. \"Take it.\"\n\nHe ate it at a table, looking at his math homework. He looked stuck.\n\nI used to be a math tutor.\n\nI walked over. \"Quadratic equations?\"\n\nHe nodded. \"I don't get it.\"\n\nI sat down and helped him for 20 minutes. He got it. He left smiling.\n\nThe next day, he came back with two friends. They bought cookies.\n\nThe day after that, five kids came.\n\nApparently, he told the school, \"The lady at the bakery helps with homework.\"\n\nNow, my bakery is the after-school hang-out spot. It's loud. It's messy. There are backpacks everywhere.\n\nYesterday, I found a note in the tip jar. It was wrapped around a $20 bill.\n\n\"Thanks for helping my son pass math. A Mom.\"\n\nI'm not closing the bakery.\n\nI think I finally found my purpose.\n\nIt's not cookies. It's community.",
  },
  {
    id: 1706833834680,
    text: "If you can't decide, the answer is No.",
  },
  {
    id: 1706401658301,
    text: "the smartest people are the ones who notice patterns",
  },
  {
    id: 1706167742417,
    text: "If I look at the last 15 years of knowing people in startups, and then seeing who became successful and who didn't, I'm starting to see some general patterns.\n\nThe people I know who became successful (and very rich) regularly asked for help and feedback, and then applied that feedback very quickly (think minutes) and shipped fast while maintaining their own vision.\n\nThe people who didn't become successful are the ones who worked on stuff for months/years without asking for help or feedback, or when they did took weeks/months to apply it.\n\nSo I think the feedback -> implement loop and speed of it is possibly very important.",
  },
  {
    id: 1706167910906,
    text: 'Yeni birisiyle tanıştığınızda, ilk bir yıl dolmadan eve taşınmayın, nişanlanmayın veya çocuk yapmayın. İnsanların gerçek "yüksek çatışmalı" doğasının ortaya çıkması genellikle bir yıl sürer.\n\nBeyninizi genç tutmak için her gün sevmediğiniz veya yapmaktan çekindiğiniz en az bir zorlu görev seçin.',
  },
  {
    id: 1705175360297,
    text: 'Hafızalarımız duygularımızdır; duygusal değeri olmayan deneyimler beyin tarafından elenir ve kimliğimizin bir parçası olmaz.',
  },
  {
    id: 1705349715134,
    text: 'İnsanlar reformcu veya vizyoner olmanızı değil, onların "oyununa" uymanızı isterler. Adalet ısrarı, ayrıcalıklı sınıfları (paydaşları) kızdırır.\n\nEğer bir şeyi değiştirmek istiyorsanız, sıfırdan "Tanrıcılık" oynayıp kural koyamazsınız. Mevcut kesişim noktasını bulup, onu yavaşça ve kısmi olarak kaydırmanız gerekir.\n\nBir sistemi analiz ederken "söylenen amaçlara" değil, "oyuncuların çıkarlarına" bak.',
  },
  {
    id: 1705348888764,
    text: "We buy things we don't need… with money we don't have to impress people we don't even like.",
  },
  {
    id: 1705262876112,
    text: 'Uyum Sağlama: Kim olduğumu değiştireyim ki beni kabul etsinler. (Bağ kurmayı engeller).\nAit Olma: Kim olduğumla kabul ediliyorum. (Gerçek bağ budur).',
  },
  {
    id: 1705262739438,
    text: 'Sınırlar, seni sevmem ve aynı zamanda kendimi korumam için çizdiğim çizgilerdir.',
  },
  {
    id: 1705262269544,
    text: '"Hiç pişmanlığım yok" diyenler, aslında sorumluluktan kaçan veya kendiyle yüzleşemeyen kişilerdir.',
  },
  {
    id: 1705262070086,
    text: 'Belirsizliğe tahammül edemeyenler, karmaşıklığı aşırı basitleştirerek hata yaparlar.',
  },
  {
    id: 1705261883234,
    text: 'Kıyaslama, yaratıcılığın katilidir. Aynı anda hem uyum sağla (fit in) hem de öne çık (stand out) paradoksu insanı ezer.',
  },
  {
    id: 1708409128331,
    text: 'Zamanın neden yaşlandıkça hızlandığını biliyor musun? Çünkü beynin yeni deneyim almayı bıraktığında günleri birbirinden ayırt edemiyor. Pazartesi ile Cuma aynı hissettiriyor. Ocak ile Haziran arasında fark kalmıyor. Bir bakıyorsun 3 yıl geçmiş ama aklında kalan tek bir an bile yok.\n\nBen bunu bu sene fark ettim. Rutin ile geçen ayları yaşıyordum. Ev, okul, spor, ev. Takvime baktığımda aylar uçmuş gitmiş ama hafızamda hiçbir şey yok. Sanki o zaman hiç yaşanmamış gibi. Sonra 10 günlüğüne bir yurtdışı tatili yaptım ve o 10 gün hafızamda 6 aydan daha uzun yer kaplıyor. Neden? Çünkü beynim yeni uyaranlarla karşılaştı. Yeni sokaklar, yeni insanlar, yeni tatlar, yeni kokular. Her yeni deneyim beynin için bir zaman işareti oluşturuyor ve geçmişe baktığında o dönem daha uzun hissettiriyor.\n\nSeyahat etmek lüks değil, zamanı yavaşlatmanın en güçlü aracı. Bunu söylerken illa Baliye git, Maldivlere uç demiyorum. Hiç gitmediğin bir ilçeye git, orada bir lokantada yemek ye, insanlarla konuş. Bu bile yeterli ama evde boş boş oturup aynı rutinde ömrü çürütme. Önemli olan yenilik. Beynin rutin dışı bir şeyle karşılaştığında bütün duyular açılıyor, dikkat seviyesi tavan yapıyor ve o anı hafızana kazıyorsun.\n\nŞimdi düşün. 80 yaşına geldiğinde geriye baktığında ne görmek istersin? Her gün aynı odada aynı ekrana bakarak geçirdiğin binlerce günü mü yoksa farklı yerlerde farklı insanlarla yaşadığın yüzlerce hikayeyi mi? İkisinin toplam süresi aynı olabilir ama birinde yaşamış hissedersin diğerinde sadece var olmuş.\n\nYeni deneyimler sadece zamanı yavaşlatmıyor. Ruh halini düzeltiyor, yaratıcılığı artırıyor, insanlarla bağ kurmayı kolaylaştırıyor. Sürekli aynı ortamda aynı şeyleri yapan biri bir süre sonra robotlaşıyor. Ama her ay en azından bir tane yeni deneyim yaşayan biri canlı kalıyor.\n\nBunun için zengin olmana gerek yok. Yapman gereken tek şey konfor alanından çıkmak. Hiç gitmediğin bir semtte yürü, hiç denemediğin bir yemek ye, hiç konuşmadığın bir insanla sohbet aç. Hepsi bedava ve hepsi beynin için yepyeni bir uyaran.\n\nHayatını dolu yaşamak istiyorsan yeni şeyler denemeyi bırakma. Rutin seni öldürüyor, yenilik seni yaşatıyor. Geriye baktığında pişman olacağın şey yanlış yere gitmiş olmak değil hiçbir yere gitmemiş olmak olacak.',
  },
  {
    id: 1706765703754,
    text: 'Güçlü insanların en büyük eksiği "Zaman"dır; onlara zaman kazandıracak tekliflerle gidin.',
  },
  {
    id: 1747136500000,
    text: 'The things you are drawn to naturally matter a lot. They are clues. Your job is to figure out why.',
  },
  {
    id: 1747136500001,
    text: 'Sadece "daha çok çalışarak" ilerlerseniz, tüm enerjinizi tüketip kesinlikle tükenmişlik (burnout) yaşarsınız. Bu da sarkaç etkisi yaratarak "hiçbir şey yapmak istemiyorum, sadece asalak olmak istiyorum" aşamasına geçmenize neden olur.\n\nÇabalarınızda yapacağınız ufak bir kaydırma/yön değişimi, harcadığınız enerjiden alacağınız verimi (yield) büyük ölçüde değiştirecektir. Çok oyunculu rekabetçi oyunlarda (Dota 2, LoL, Valorant vb.) üst rütbelere çıkmanın yolu sadece çok oynamak değildir. 1-2 yeni mekaniği "anlamak", saatlerce efor sarf etmekten çok daha fazla rütbe kazandırır.',
  },
  {
    id: 1747136500002,
    text: 'Kıskançlık da sınıfsaldır. Kimse milyarderlerin yatlarını, zenginlerin huzurlu hayatlarını kolay kolay kıskanmaz; çünkü onlar buna "layıktır." Ama komşu Ali işinde ufak bir terfi alsın, sınıf arkadaşı Ayşe kendi kişisel gelişimi ve özgürlüğü için özgür bir karar alsın, hemen dillerine dolarlar.\n\nBu yüzden biri sizi kıskanıyorsa, kendince sizi kendiyle aynı seviyede sanıyordur. Size "bunu yakıştıramadığı" için böyle davranıyordur. Kıskançlık bir tür sınıfsal şiddettir ve muhatapları "sadece" kişinin kendisine eşit sandığı kişilerdir.',
  },
  {
    id: 1747136600000,
    text: 'Enjoy being while becoming.',
  },
  {
    id: 1747136600001,
    text: 'Erkek acizleştikçe kadın zalimleşir.',
  },
  {
    id: 1747136600002,
    text: 'Kasten "Hayır" cevabı alacağınız eylemlere girişin; yeteneksiz olduğunuz işlere başvurun, sizden daha havalı insanlara arkadaşlık/çıkma teklif edin. Sürtünmesiz dijital dünya direnci yok ediyor; sıfırdan başarılı olan tüm girişimcilerin tek ortak özelliği reddedilmeyi sindirip devam edebilmeleridir.\n\nÇocuk yetiştirmek, bir hayır kurumuna adanmak gibi, verdiğiniz emeğin ve sevginin matematiksel olarak size geri dönmesinin imkansız olduğu alanlara yönelin. Kapitalist işlem mantığının bittiği yerde gerçek varoluşsal amaç başlar.',
    author: 'Scott Galloway',
  },
  {
    id: 1747136600003,
    text: 'Poor men trust words. Smart men trust patterns. Patterns never lie.',
  },
  {
    id: 1747136700000,
    text: 'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love.',
    author: 'Marcus Aurelius',
  },
  {
    id: 1747308100000,
    text: 'Çoğu kişi ilişkilerin "tükenebilir" olduğunu sanır (birinden iyilik istersen kredin biter sanırlar). Ferrazzi ise tam tersini söyler: İlişkiler kas gibidir; ne kadar çok çalıştırırsan o kadar güçlenir ve büyür.\n\nSadece yakın arkadaşların sana yeni bilgi getiremez çünkü onlar da senin bildiklerini biliyor. Sana asıl fırsatları "zayıf bağlar" yani çok sık görüşmediğin ama farklı dünyalardan olan insanlar (fringe) getirir.\n\nSosyal medyayı sadece ne yediğini paylaşmak için kullanma. Alanında bir "uzman" gibi içerik üret. Eğer içerik üretirsen, insanlar seni bulmaya başlar; sen onları kovalamazsın.\n\nİnsanları doğum günlerinde değil, "aklıma geldin" diyerek sebepsizce ara/yaz. Ama en etkili pinging doğum günleridir; çünkü herkes unutulduğunu sandığı o gün hatırlanmak ister.\n\nBirisi bir probleminden mi bahsetti? Hemen rehberini aç ve o problemi çözebilecek diğer arkadaşını ara. Onları tanıştır ve aradan çekil.\n\nBir insanın kalbine girmek istiyorsan bu üçünden birine dokun. Çocuğuna staj ayarlamak veya bir sağlık sorunu için doktor önermek, ömür boyu sürecek bir sadakat yaratır.',
    author: 'Keith Ferrazzi',
  },
  {
    id: 1747308200000,
    text: 'Antithesis (Karşıtlık) - Beyin İkilikleri Sever: İnsan beyni zıtlıklarla çalışır. Her şeyi siyah-beyaz görmek isteriz. Eğer bir şeyi tanımlamak istiyorsan, ne olmadığını da söyle. Teknik: "X, Y\'dir" demek yerine; "X, Y\'dir; Z değildir" formatını kullan. Örnek: Neil Armstrong\'un "Benim için küçük, insanlık için büyük bir adım" sözü. Zıtlık (küçük adım vs büyük adım) cümleyi ölümsüzleştirir.\n\nPeriodic Sentences (Periyodik Cümleler) - Tansiyon Yaratmak: Cümlenin ana fiilini veya ana fikrini en sona saklamak. Okuyucu veya dinleyici, cümlenin nereye gideceğini bilmediği için nefesini tutup sonunu bekler. Örnek: "Her ne kadar yorgun olsam da, hava berbat olsa da, cebimde beş kuruş kalmasa da... geliyorum." Eğer ana fikri başta verirsen etkisi sıfırlanır. Heyecan yaratmak istiyorsan ana fiili sona at.\n\nHendiadys - Şiirsel Sis: Bir sıfat tamlamasını ("kızgın köpek") alıp, iki isme dönüştürmek ("köpek ve kızgınlık"). Bu teknik cümleye mantıksız ama çok şiirsel, hafif bulanık bir hava katar. Shakespeare "Furious sound" (Öfkeli ses) demek yerine "Sound and fury" (Ses ve öfke) demiştir. Sıfatlar netleştirir, Hendiadys ise bulanıklaştırır ve derinlik katar.\n\nTricolon - Üçlemenin Gücü: Her şey üçlü olmalıdır. İki eksiktir, dört fazladır. Örnek: "Geldim, gördüm, yendim." (Sezar). Mizah için de kullanılır: İki normal şey söyle, üçüncüde şaşırtmacayı patlat.\n\nLitotes - "Fena Değil" Sanatı: Bir şeyi övmek istediğinde, onu doğrudan övmek yerine, zıttını inkar et. "Çok güzel" deme, "Çirkin sayılmaz" de. Doğrudan övgü bazen samimiyetsiz durabilir. Litotes kullandığında hem kendine güvenen bir hava yaratırsın hem de karşı tarafın zekasına mesaj verirsin.\n\nEpistrophe - Sonun Gücü: Cümlenin sonundaki tekrar. Anaphora\'dan çok daha güçlüdür çünkü insanlar en son duydukları şeyi hatırlar. Örnek (Lincoln): "...government of the people, by the people, for the people." Vurgulamak istediğin anahtar kelimeyi her kısmın sonuna koy.\n\nIsocolon - Ritmik Denge: Cümlenin iki parçasının aynı uzunlukta, aynı yapıda ve aynı ritimde olması. Örnek: "Buy one, get one." Bir sloganın akılda kalmasını istiyorsan hece sayılarını eşitle. Denge, cümleye kesinlik havası katar.\n\nProlepsis - İtirazı Çürütme: Dinleyicinin yapacağı itirazı, o daha ağzını açmadan senin söyleyip çürütmen. Örnek: "Şimdi bana diyeceksiniz ki, \'Bu çok pahalı\'. Evet, pahalı ama..." İtirazı sen dile getirdiğin an, karşı tarafın elindeki kozu almış olursun. Sana dürüst ve açık sözlü bir hava katar.\n\nAporia - Sahte Şüphe: Konuşmacının sanki ne diyeceğini bilmiyormuş gibi numara yapması. Örnek: "Sana ne desem bilemiyorum... Dahi mi, yoksa sadece şanslı mı?" Aslında ne diyeceğini çok iyi biliyorsundur ama bu kararsızlık anı dinleyiciyle samimi bir bağ kurar.\n\nHyperbole - Abartma Sanatı: Bir şeyi öyle bir abartmalısın ki kimse onu gerçek sanmasın ama hissi tam olarak alsın. "Seni 3 saattir bekliyorum" dersen şikayettir. "Seni bin yıldır bekliyorum" dersen edebiyattır. Abartı ne kadar imkansızsa etkisi o kadar güçlüdür.',
  },
]

const genel = [
  {
    id: 1708767776462,
    text: 'Harika fırsatları asla "ucuza" alamazsınız. Pazarın o anki fiyatlamasına göre fazla para ödersiniz ancak şirket eksponansiyel büyüdüğünde o fiyat çok ucuz kalır.',
  },
  {
    id: 1708324616048,
    text: 'Paranın "değerli" olduğu illüzyonunu korumak için yapay bir sefalet ve yoksulluk yaratılması şarttır. Eğer etrafınızda acı çeken fakir insanlar olmasaydı, zengin olmak için motive olmazdınız.\n\nEkonomik krizlerin ve borsa çöküşlerinin (ekonomi derslerinde öğretilmeyen) asıl amacı, sistemdeki "parayı yok etmektir". Piyasada çok fazla para birikirse insanlar çalışmayı bırakır; bu yüzden paranın periyodik olarak yok edilip kıtlığının hissettirilmesi gerekir.',
  },
  {
    id: 1708098540934,
    text: 'İnsan zihni, aldığı veriler arasında bağlantılar kurmak ve onlara bir anlam yüklemek için evrimleşmiş "desenleme" motoruyla çalışıyor. Tarih boyunca farklı kültürlerin dünyayı farklı algılamasının nedeni, bu içgüdünün her toplumda farklı "kök metaforlar" etrafında kümelenmiş olması.\n\nBir kültürün en temel seviyesinde yer alan "Doğa bir annedir", "Doğa bir makinedir" veya "Her şey birbiriyle bağlantılıdır" gibi kök metaforlar, o toplumun değerlerini, teknolojisini ve tarihin akışını belirliyor. Tarih sadece coğrafya veya genlerle değil, bu zihinsel çerçevelerle yazılıyor.\n\nBatı medeniyeti, Antik Yunan ve Hristiyanlık etkisiyle dünyayı ikiye bölen bir metafor geliştirdi: Ruh vs. Beden ve İnsan vs. Doğa. Bu "Bölünmüş Kozmos" anlayışı, insanın kendini doğanın bir parçası değil, onun dışında ve üstünde bir varlık olarak görmesine yol açtı.\n\n17.yüzyıl Bilimsel Devrimi ile birlikte doğa, "yaşayan bir organizma" metaforundan "cansız bir makine" metaforuna dönüştürüldü. Bacon ve Descartes gibi düşünürler, doğayı parçalara ayrılıp manipüle edilebilecek bir saat mekanizması gibi gördüler.\n\nBatı\'nın aksine, geleneksel Çin düşüncesi evreni "Uyumlu bir Yaşam Ağı" olarak gördü. Onlar için evren dışarıdan bir Tanrı tarafından değil, kendi içsel ilkeleri (Li) ile kendi kendini organize eden bütünsel bir sistemdir.\n\nİnsanlar sadece çevrelerine uyum sağlamazlar; kültür, dil ve semboller aracılığıyla kendileri için "bilişsel bir niş" inşa ederler. Bu niş içine doğan her birey, dünyayı o kültürün "gözlükleriyle" görür. Yani biyolojimiz kadar, içine doğduğumuz zihinsel desenler de kim olduğumuzu belirliyor.\n\nBugün yaşadığımız iklim krizi ve ekolojik çöküş, rastlantısal değil; Batı\'nın "doğaya hükmetme" ve "sonsuz büyüme" metaforlarının doğrudan bir sonucudur. Eğer dünyayı cansız bir hammadde deposu olarak görürseniz, onu yok etmekte ahlaki bir engel görmezsiniz.\n\nModern kuantum fiziği, sistem biyolojisi ve ekoloji, aslında kadim Doğu bilgeliğiyle örtüşen bir gerçeği yeniden keşfediyor: Bağlantılılık. Hiçbir şey tek başına var olmaz; her şey bir sistemin parçasıdır. Bu, "Makine Doğa" metaforunun çöküşüdür.\n\nİnsan doğası bencil değildir. İnsanın evrimsel başarısının temelinde rekabet değil, karmaşık işbirliği ve empati yeteneği yatar. Bizler "bağlantı kurmak" üzere tasarlanmış sosyal varlıklarız.\n\nİnsanlığın hayatta kalması için bir zihinsel devrime ihtiyacı var: Doğayı fethetme metaforundan, yaşamla bütünleşme metaforuna geçiş. Bu, teknolojiyi reddetmek değil, onu yaşamın tüm ağını destekleyecek şekilde yeniden desenlemek anlamına geliyor.',
  },
  {
    id: 1707818617717,
    text: 'People who don\'t organize into tribes get wiped out by people who do.',
  },
  {
    id: 1706940632163,
    text: 'kapitalizmin önündeki asıl engeller komünizm değil; monarşi, din (teokrasi), milliyetçilik ve gerçek demokrasidir. Komünizm ise bu dört unsuru yok etmek için mükemmel bir araçtır.\n\nMonarşi: Komünizm kralları devirerek gücü bir "parti" (oligarşi) eline verir ki bu yapı kapitalist sisteme daha uygundur.\n\nDin: Marx\'ın "din halkın afyonudur" sözüyle dinin tasfiye edilmesi, geriye sadece paranın (maddeci dünyanın) kalmasını sağlar.\n\nMilliyetçilik: Komünizmin enternasyonalist yapısı, sermayenin sınır tanımadan akmasını isteyen kapitalizmin işine gelir.',
  },
  {
    id: 1706430913429,
    text: 'New books are not worth reading because everyone alive today has the same perspective, and none of us have experienced a wide breadth of anything.',
  },
  {
    id: 1705883548543,
    text: 'Herkesi üniversiteye gönderip, onlara uygun yüksek statülü iş yaratamazsanız, bu kitle radikalleşir.',
  },
  {
    id: 1705920058289,
    text: 'Schopenhauer\'a göre kültür ve görgü düzeyi yükseldikçe, insanın dış uyaranlara karşı algısı incelir; gürültü, yalnızca bir ses değil, zihinsel akışı bozan bir müdahale olarak hissedilir. Basit bir gürültü bile yüksek bilinçli bireyde, düşünce akışını kesen bir yarık gibi etki eder.\n\nBöyle bireyler, sessizliği yalnızca bir "gürültü yokluğu" olarak değil, düşüncenin derinleştiği, hayal gücünün çalıştığı, zihnin kendi kendini duyabildiği bir alan olarak görürler. Gürültü ise bu alanı gasp eden, içsel diyaloğu bastıran bir işgalci gibidir. Bu yüzden yüksek bilinçli kişilerde sessizlik, neredeyse etik bir değer kazanır; gürültü ise sadece hoşnutsuzluk değil, bir tür saygısızlık olarak algılanır.\n\nMedeni toplumların gürültüye karşı katı kurallar koyması da tesadüf değildir. Trafik, inşaat veya gece yaşamı gibi alanlarda desibel sınırları, belirli saatlerde sessizlik zorunluluğu, bu hassasiyetin kurumsallaşmış biçimleridir. Gürültüye karşı tahammülsüzlük burada "kültürel züppeleşme" değil, ortak yaşamın kalitesini koruma çabasıdır. Toplum ilerledikçe, yalnızca yüksek ses değil, "gereksiz" ses de sorun olarak görülür; zira modern insan, zihinsel üretkenliğin sessizlikle beslendiğini bilir.\n\nDolayısıyla Schopenhauer\'ın gözlemi, yalnızca bireysel psikolojiye değil, uygarlık teorisine de dokunur: Gürültü, medeniyetin ölçüsünü gösteren bir turnusol kâğıdıdır; sessizlik ise, hem bireysel hem toplumsal olgunluğun sesini susturan değil, sesi derinleştiren bir göstergesidir.',
  },
  {
    id: 1705920027764,
    text: 'Çocuklarınıza "belirli bir kariyer" yerine temel hayat becerilerini (yaratıcılık, iletişim, kaynak bulma) öğretin. Çünkü 20 yıl sonra hangi mesleğin kalacağı belli değil.',
  },
  {
    id: 1705877488509,
    text: 'Batı, 1991\'de Sovyetler\'in çöküşünden sonra odak noktasını ve amacını kaybetti. Rakipsiz kalmak, tehlike algısını yok etti ve rehavete yol açtı. Avrupa, dünya nüfusunun %12\'sine sahip ancak küresel refah harcamalarının %60\'ını yapıyor. Bu durum, kıtanın tehlikeli bir dünyada yaşadığını unutup fazla konforlu hale geldiğinin göstergesidir.',
  },
  {
    id: 1705830272459,
    text: 'Modern uluslararası yardım kuruluşları ve BM, Afrika gibi bölgelerden doğal bir lider çıkmasını engellemek için tasarlanmıştır.',
  },
  {
    id: 1705830258303,
    text: 'Geleceğin büyük imparatorluklarını arıyorsanız, geçmişte büyük yenilgi ve aşağılanma yaşayan toplumlara bakın. Örnekler: Almanya, Japonya ve İsrail.',
  },
  {
    id: 1705765865985,
    text: 'Modern dünya her şeyi "insansızlaştırdı"; müşteriyle gerçek, insani bağ kuran şirketler öne çıkacak.',
  },
  {
    id: 1705654836912,
    text: "I started buying glasses at a restaurant supply store. They're nearly indestructible, and we can replace them with like ones basically forever.",
  },
  {
    id: 1705348688764,
    text: "Consumerism is the best way to keep people distracted and believing they're free — while quietly shaping their desires to serve the system.",
  },
  {
    id: 1747136400000,
    text: 'All profits are privatized. All losses are socialized.',
    author: 'Professor Jiang',
  },
  {
    id: 1747136600004,
    text: 'Güç, insanların dikkatini ve odaklanmasını yönlendirme kapasitesidir. Gerçek servet (wealth) para değil, bizim dikkatimiz ve bilincimizdir. Para sadece bu serveti depolayan bir araçtır.\n\nPara ve sermaye, insan bilincini ve odaklanmış dikkatini emip depolayan ve bunu "zenginliğe" dönüştüren mekanizmalardır. İçinde yaşadığımız gerçeklik, elitler (oyun kurucular) için bizim bilincimizden zenginlik çıkarmak üzere yapılandırılmıştır.',
  },
  {
    id: 1706591277060,
    text: 'Erkekler milyonlarca yıl boyunca avlanma odaklı olduğu için analitik, mantıksal, kural bazlı (matematik, mühendislik, müzik yapısı) sistemlerde gelişti. Kadınlar bebeği yüzünün önünde tutup eğittiği için linguistik becerilerde, beden dilini okumada, uzun vadeli vizyonda ve empati/güvende gelişti.',
  },
  {
    id: 1747136700002,
    text: 'The difference between animals and humans is that animals would never allow the dumbest member of the herd to lead them.',
  },
  {
    id: 1706591277060,
    text: 'toplumların başarısının sistemlerinden (demokrasi, komünizm vb.) ziyade, o sistemin "ne kadar açık" olduğuyla ilgili olmasıdır. Bir toplum yükselirken liyakat, eleştiri ve rıza ile beslenir; ancak olgunlaştıkça kaçınılmaz bir bürokratik hantallığa gömülür. Bu aşamada yönetim, sistemi iyileştirmek yerine kendi koltuğunu korumaya odaklandığı için "aldatma" mekanizmasını devreye sokar. Bu, aslında sonun başlangıcıdır; çünkü eleştirinin bastırıldığı bir sistem, hatalarını göremez hale gelir.\n\nAsıl can alıcı nokta ise çöküşün hızıdır. Toplumlar yavaş yavaş geriler ama aniden çökerler. Prof. Jiang\'ın "Mükemmel Fırtına" dediği bu durum; savaş, kıtlık ve salgın gibi dış şokların aynı anda sistemi vurmasıyla gerçekleşir. Otoriterleşen ve eleştiriyi "ihanet" sayan bir yönetim, bu çoklu krizlere esnek bir cevap veremez. Sonuç olarak güç sahipleri, halkın kendilerine isyan etmesini (devrimi) önlemek için dikkat dağıtıcı, anlamsız dış savaşlara yönelirler.\n\nKısacası; önümüzdeki 20 yıl için çizilen tablo, ahlaki bir "doğru-yanlış" meselesi değil, gücün hayatta kalma içgüdüsüdür. Batı dünyasında demokrasinin zayıflaması ve ekonomik krizlerin artması, sistemin rızadan zorlamaya (coercion) geçişinin bir işaretidir. Profesöre göre dünya artık mantık veya ahlakla değil, çıplak güç dinamikleriyle yönetilen bir evreye girmektedir.',
  },
]

/**
 * Get all notes as a flat array with category field
 */
export function getAllNotes() {
  return [
    ...saglik.map((n) => ({ ...n, category: 'saglik' })),
    ...gida.map((n) => ({ ...n, category: 'gida' })),
    ...kisisel.map((n) => ({ ...n, category: 'kisisel' })),
    ...genel.map((n) => ({ ...n, category: 'genel' })),
  ]
}

/**
 * Get notes filtered by category
 */
export function getNotesByCategory(category) {
  if (!category || category === 'all') return getAllNotes()
  const categoryMap = { saglik, gida, kisisel, genel }
  const notes = categoryMap[category] || []
  return notes.map((n) => ({ ...n, category }))
}

/**
 * Get notes count per category
 */
export function getNotesStats() {
  return {
    total: saglik.length + gida.length + kisisel.length + genel.length,
    saglik: saglik.length,
    gida: gida.length,
    kisisel: kisisel.length,
    genel: genel.length,
  }
}
