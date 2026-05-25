/**
 * One-time migration script to move saglik & gida notes from static data to database.
 *
 * Usage:  node scripts/migrate-notes-to-db.mjs
 *
 * Notes that changed category during review:
 * - "If you have a daughter, start ballet..." (saglik → kisisel) — moved to static kisisel array
 * - "Dates is the best pre workout..."       (saglik → gida)    — inserted as gida below
 */
import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Create .env or .env.local with DATABASE_URL.')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)

const notes = [
  // ── SAGLIK ──
  { ts: 1712144686508, cat: 'saglik', text: 'Bağışıklık sistemi hastalıklarından (solunum yolu) ve bağırsak sağlığı sorunlarından korunmak için Glutamin alın. Bağırsak hücreleri ve bağışıklık hücreleri enerjileri için glutamine bayılır.' },
  { ts: 1712143998454, cat: 'saglik', text: "Smoothie blender'larının plastik hazneleri, hızlı sürtünme nedeniyle inanılmaz miktarda mikroplastiği içeceğinize karıştırır. Paslanmaz çelik hazneli blender kullanın." },
  { ts: 1708775062272, cat: 'saglik', text: 'Mükemmel beslenseniz ve spor yapsanız dahi, yönetemediğiniz stres veya sorunlu ilişkiler tüm doğruları silip süpürür.' },
  { ts: 1708775034469, cat: 'saglik', text: 'Suyu bir anda, lıkır lıkır, hızlı bir şekilde içmeyin. Suyu tek seferde hızlıca içerseniz, mideden hızla ince bağırsağa ve kana geçer. Kanda aniden sıvı artışı olunca damarlardaki basınç reseptörleri "kan basıncı artıyor" uyarısı verir. Vücut suyu hücrelere ulaştırmadan böbrekler yoluyla hızla dışarı atar.\nSuyu yudum yudum, zamana yayarak için.' },
  { ts: 1708098336843, cat: 'saglik', text: 'Sinaptik Budama (Synaptic Pruning): Beyin gelişiminin "uzun otlarla dolu bir tarla" gibi olması; kullanılan yollar (kültürel alışkanlıklar) belirginleşirken diğerlerinin kapanması.' },
  { ts: 1707557244481, cat: 'saglik', text: 'Sol tarafınıza yatın. Sağ tarafa yatmak organların mideye baskı yapmasına ve reflüye (GERD) neden olabilir.' },
  { ts: 1707557233945, cat: 'saglik', text: 'Haftanın 7 günü aynı saatte uyanın. Yatış saati değil, uyanış saati melatonini düzenler.' },
  { ts: 1707479292651, cat: 'saglik', text: 'Kansere karşı en etkili gıdalar:\n- Zerdeçalla birlikte karabiber\n- Yeşil Çay' },
  { ts: 1707464675896, cat: 'saglik', text: "Akşamları kırmızı ışık kullanın ve mavi ışığı (ekranları) 20:00'den sonra kesin." },
  { ts: 1707464591052, cat: 'saglik', text: 'Her saat başı 10 adet "air squat" yapın. Saatlik squatlar, uzun süre oturmanın (sedanter yaşam) neden olduğu lipoprotein lipaz enziminin kapanmasını engeller.' },
  { ts: 1706968694841, cat: 'saglik', text: 'Antibiyotik alırken dikkat edilecekler:\nAntibiyotik öncesi, sırası ve sonrasında yüksek lifli, bitki bazlı beslenin. Bağırsak liften yoksun bırakıldığında, antibiyotik hasarı daha şiddetli olur ve iyileşme gecikir. Eklenmiş şeker, ultra işlenmiş gıdalar ve aşırı doymuş yağlardan uzak durun. Sabahları güneş ışığına çıkın ve hafif egzersiz yapın.' },
  // id:1706968640797 ballet note → moved to static kisisel array (NOT here)
  { ts: 1706271975952, cat: 'saglik', text: 'Yemek bittikten sonraki ilk 90 dakika içinde hareket etmeye başlayın; çünkü glikoz bu sürede zirve yapar. Yemekten sonra 10 dakikalık kısa bir yürüyüş, kan şekerini düşürmek için yeterlidir.' },
  // id:1706082544534 dates note → recategorized as gida (below)
  { ts: 1706005964471, cat: 'saglik', text: 'A 20 minute walk after meals is one of the most overlooked health tools.' },
  { ts: 1706005963525, cat: 'saglik', text: "Your leg strength predicts how long you'll live. Not your weight." },
  { ts: 1705950600399, cat: 'saglik', text: 'Joe Rogan: Sauna 4x per week for 20 minutes at 175 degrees = 40% decrease in all cause mortality. Great for inflammation and red blood cells.' },
  { ts: 1705776972683, cat: 'saglik', text: 'Yatak odanızı bir "mağara" yapın: Tamamen karanlık, sessiz ve soğuk.\n\nIşığı tamamen kesmek için karartma perdeleri veya göz maskesi kullanın.\n\nİdeal uyku sıcaklığı 16-20°C (60-67°F) arasındadır.\n\nYatmadan hemen önce sıcak duş almayın. Vücut ısısının düşmesi uykuyu başlatır; duşu yatmadan 1.5-2 saat önce alın.\n\nYatak sadece uyku ve seks içindir; bilgisayar veya telefonla yatakta vakit geçirmek beynin orayı "uyanıklık" ile eşleştirmesine neden olur.' },
  { ts: 1705679648309, cat: 'saglik', text: 'Dopamin seviyenizi artırmak için yenilik (novelty), risk alma (fiziksel, sosyal veya entelektüel), öngörülemezlik ve karmaşıklığa maruz kalın.' },
  { ts: 1705654496909, cat: 'saglik', text: 'Güç (strength), kas kütlesinden (muscle mass) daha kritiktir. Kas kütlesi genellikle gücün bir göstergesi (proxy) olarak kullanılır ama asıl önemli olan metrik güçtür.\n\nGücü ölçmek için sadece squat/deadlift ağırlıklarına bakmayın; kavrama gücü (grip strength), asılı kalma (dead hang) ve hava squatı gibi temel testleri kullanın.' },
  { ts: 1705654001780, cat: 'saglik', text: 'Odaklanma gerektiren zihinsel işlerinizi, egzersizden sonraki 1-3 saatlik dilime planlayın.\n\nGünde 1-4 porsiyon düşük şekerli fermente gıda tüketin (Kimchi, lahana turşusu, kefir, kaliteli yoğurt).\n\nOda sıcaklığında satılan turşular değil, soğuk zincirde (fermente) olan canlı kültürlü turşuları tercih edin.\n\nKoruyuculu ve pastörize (raf ömrü uzun) turşulardan canlı kültür bekleme.' },
  { ts: 1705604153466, cat: 'saglik', text: 'Stresli anlarda "derin nefes al" demek yerine "yavaş ve uzun nefes ver" (expiration) denmelidir. Nefes vermek Vagus sinirini uyarır ve kalp hızını yavaşlatır.\n\nUzun süre nefes verdiğinizde beyin şaşırır: "Stresli olsaydı hızlı nefes alırdı, yavaş verdiğine göre güvendeyiz" diyerek sempatik sistemi kapatır.' },
  { ts: 1705609152756, cat: 'saglik', text: 'Balık yağınızı mutlaka buzdolabında saklayın. Omega-3 çoklu doymamış bir yağ olduğu için oksidasyona karşı son derece hassastır.' },
  { ts: 1705348234734, cat: 'saglik', text: 'Huberman kreatin protokolü: 1 hafta boyunca günde 30-40g "yükleme", ardından günde 10g devam dozu. Her 16 haftada bir, vücudu dinlendirmek ve gücünüzü test etmek için 1 hafta kreatin kullanımını tamamen durdurun.\n\nMagnezyum Threonate veya Bisglycinate formlarını tercih edin; bunlar kan-beyin bariyerini daha kolay geçer. Magnezyum takviyesini uykudan 30-60 dakika önce alın. Modern tarım nedeniyle topraktaki magnezyum tükendiğinden, günümüzdeki sebzelerden (kale vb.) yeterli magnezyum almak zordur.' },
  { ts: 1705175520931, cat: 'saglik', text: 'Box Breathing (4-4-4-4) ile hızlıca vagus sinirini resetleyip sinir sistemini sakinleştir: burundan 4 sn al, tut, ver, tut.' },
  { ts: 1768243881702, cat: 'saglik', text: 'Bağışıklık takviyesinde 1 numaraya D vitaminini koyun.', author: 'Osman Müftüoğlu' },
  { ts: 1768243962225, cat: 'saglik', text: 'Narı kabuğundaki beyaz liflerle birlikte tüketin veya suyunu öyle sıkın. En değerli polifenoller (elajotaninler) o beyaz liflerde ve çekirdektedir.', author: 'Osman Müftüoğlu' },
  { ts: 1747136800000, cat: 'saglik', text: 'Yemek sonrası oluşan ağır yorgunluk ve uyku halini (postprandiyal somnolans) önlemek için yemekten 30 dakika önce 1 taze limonun suyunu sıkıp, eşit miktarda suyla (1:1 oranında) karıştırarak içmek.' },
  { ts: 1747136800001, cat: 'saglik', text: 'Düzenli kan testi yaptırmayı, özellikle testosteron seviyelerini kontrol etmeyi tavsiye ediyor. Çünkü birçok "zihinsel" sorun (öfke, irritasyon, depresyon gibi) aslında hormonal dengesizlikler, enflamasyon veya besin eksikliklerinden kaynaklanabiliyor. Bunları erken tespit etmek, gereksiz terapi veya ilaç yerine kök nedeni çözmeyi sağlar.' },
  { ts: 1747308000000, cat: 'saglik', text: 'Hastalanmamak için yapılması gerekenler:\n- Telefonunuzu her gün dezenfekte edin. Telefon inanılmaz miktarda mikrop taşır.\n- Küçük çocuklardan uzak durun. Çocuklar (özellikle kreş ve okul çağındakiler) sürekli yeni virüsler getirir.\n- Elleri sık sık yıkayın.\n- Elleri, özellikle yıkanmamışken gözlere, burna veya ağza götürmeyin.\n- Sauna kullanın ama testisleri soğuk tutun. Kalabalık alanlarda N95 maske takın.\n- Bağışıklık güçlendirici karışım: sarımsak, zencefil, bal ve zerdeçal.' },
  { ts: 1747310700000, cat: 'saglik', text: "Society was built to make money. Indifferent to your health and sanity.\n\nFor example, we did not evolve to:\n- Sit 10 hours a day\n- Have our attention fractured 300 times daily\n- Compare ourselves to millions of others\n- Travel 9 time zones in 13 hours\n- Tolerate sounds above 85 dB causing hearing loss\n- Outsmart algorithms hijacking our reward system\n- Breathe fine particulate air pollution\n- Live under 16+ hrs of artificial light a day\n- Have 3 courses of antibiotics before age 2\n- Eat ultra-processed foods for 60% of daily calories\n- Consume 17 teaspoons of added sugar a day\n\nSo if you're feeling down in the dumps, maybe fatigued, a little or a lot depressed, anxious, that's why.", author: 'Bryan Johnson' },
  { ts: 1747310800000, cat: 'saglik', text: 'Yatak odası kapısını gece açık bırakıp diğer odadan bir pencere açarak uyuduğun odadaki CO2 seviyesini büyük ölçüde düşürebilirsin.' },
  { ts: 1747504900000, cat: 'saglik', text: "Friends, stop drinking alcohol. Not cut back. Eliminate.\n\nAlcohol increases cortisol, disrupts REM sleep, accelerates epigenetic aging, shrinks hippocampal volume, elevates resting heart rate, raises inflammatory markers, impairs glucose metabolism for 16 hrs.\n\nOne drink does that.", author: 'Bryan Johnson' },

  // ── GIDA ──
  { ts: 1712143969086, cat: 'gida', text: 'Acı, baharatlı veya asidik yiyecekleri (acı sos, ketçap) asla plastikte saklamayın. Asit, kimyasalların gıdaya geçişini (leaching) olağanüstü hızlandırır.' },
  { ts: 1706401416903, cat: 'gida', text: 'Her gün 3 öğün aynı saatte yemek yemek mekaniktir ve vücudu hantallaştırır. Bazen çok yiyin, bazen aç kalın (oruç/fasting). Vücut besin yoksunluğu stresiyle (Hormesis) antikırılganlaşır.' },
  { ts: 1705950454643, cat: 'gida', text: 'I am Italian and not all pastas are the same. The yellowish pasta is the worst quality with high glycemic index because it has been dried out using high temperatures in just few hours.\nGood quality pasta has off white color and is dried slowly. Eat healthy and stay safe!' },
  { ts: 1705764588451, cat: 'gida', text: 'Meyve ve sebzeler %80-95 sudur; lif ihtiyacını tam karşılamak için kuru baklagiller ve tam tahıllar şarttır.' },
  { ts: 1705764760650, cat: 'gida', text: 'Sarımsağı kullanmadan 10 dakika önce doğrayın; bu yararlı besin maddelerini 3 katına çıkarır.' },
  { ts: 1705764706142, cat: 'gida', text: 'Etiketinde mutfağınızda bulunmayan isimler (kimyasallar) olan gıdalardan kaçının.' },
  { ts: 1706940187938, cat: 'gida', text: 'Karaciğerin en büyük dostu sülfür zengini gıdalardır: Lahana, turp, brokoli, karnabahar. Karaciğerdeki yağı yakmak için en az 7500 adım atmalısınız.' },
  { ts: 1747136900000, cat: 'gida', text: "Balık pişirmeden önce içindeki Omega-3'ü korumak için limon, soğan ve karabiber ile marine edin." },
  { ts: 1747136900001, cat: 'gida', text: "Balığı fırında hazırlarken küçük balıklarda 150-160 dereceyi, büyük balıklarda ise en fazla 180 dereceyi geçmeyin. Yüksek sıcaklık omega-3'ü yok eder." },
  { ts: 1747136900002, cat: 'gida', text: "Mevsiminde olmayan hiçbir sebze ve meyveyi almayın. Yaz güneşinde yetişen domates ile kışın serada yetişen domates arasında, içerdiği likopen ve polifenol (koruyucu maddeler) açısından en az %25-%30'luk ciddi bir azalma farkı vardır." },
  { ts: 1747136900003, cat: 'gida', text: 'Sebzelerdeki tarım ilaçlarını biraz arındırmak için; 10-15 dk tuzlu suda bekletin, ardından 1 litre suya 1 yemek kaşığı karbonat oranlı suda 15-20 dakika daha bekletin.' },
  { ts: 1747136900004, cat: 'gida', text: 'Sebzeleri pişirmek veya turşulamak (fermente etmek) üzerlerindeki tarım ilaçlarını büyük oranda inaktive eder (yok eder). Bu yüzden asıl özen çiğ yenilen salatalık malzemelere gösterilmelidir.' },
  { ts: 1747136900005, cat: 'gida', text: 'Evinizdeki boş saksılarda çiçek yerine maydanoz yetiştirin. Her gün güvendiğiniz topraktan çıkan 3 yaprak maydanoz yemek bile hücreleri harika besler.' },
  { ts: 1747136900006, cat: 'gida', text: "Marketten alınan sebze meyveler koptuktan 5 gün sonra size ulaşır ve bu 5 gün içinde vitamin/mineral değerlerinin %30'u yok olur. Bu yüzden haftalık pazar alışverişi yerine, azar azar alıp taze tüketmeye çalışın." },
  { ts: 1747505200000, cat: 'gida', text: 'Domates ve avokadoyu beraber yemek likopen emilimini 4,4 kat (yaklaşık %400) artırıyor. En iyi emilim için domatesin pişmiş veya sos halinde olması daha avantajlı. Bu ikiliye kırmızı soğan eklemek emilimi zirveye çıkarıyor.\nLikopen, domateste bulunan ve yağda çözünen, kanserle de savaşan bir antioksidan; tek başına yenirse vücut tarafından az emiliyor. Avokadoda ise oleik asit (omega-9) gibi tekli doymamış sağlıklı yağ asitleri var. Bu yağlar, likopen gibi maddelerin bağırsaklardan emilimini ciddi şekilde artırıyor.\nBu birliktelik β-karoten emilimini de 2,6 kat artırıyor.', source: 'https://pubmed.ncbi.nlm.nih.gov/15735074/' },
  // Moved from saglik → gida (food item, not health advice)
  { ts: 1706082544534, cat: 'gida', text: 'Dates is the best pre workout. Pure rocket fuel. Eat with empty stomach.' },
]

async function migrate() {
  // Check if already migrated
  const existing = await sql`SELECT COUNT(*) as count FROM notes WHERE is_migrated = true`
  const existingCount = parseInt(existing[0].count)
  if (existingCount > 0) {
    console.log(`Already migrated (${existingCount} notes found). Skipping.`)
    return
  }

  console.log(`Inserting ${notes.length} notes...`)
  let count = 0
  for (const n of notes) {
    await sql`
      INSERT INTO notes (note_type, category, text, author, source, is_migrated, created_at)
      VALUES ('quote', ${n.cat}, ${n.text}, ${n.author || null}, ${n.source || null}, true, ${new Date(n.ts).toISOString()})
    `
    count++
    if (count % 10 === 0) console.log(`  ${count}/${notes.length}`)
  }
  console.log(`Done! Inserted ${count} notes.`)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
