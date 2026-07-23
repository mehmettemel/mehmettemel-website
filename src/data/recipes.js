/**
 * Recipes Data
 * Yemek tarifleri - statik veri
 *
 * To add a new recipe:
 * 1. Add a new object to the recipes array
 * 2. Use a unique id (Date.now() or incremental)
 * 3. Fields: id, name, ingredients, instructions
 */

export const recipes = [
  {
    id: 1,
    name: 'Hardallı Havuç Salatası',
    ingredients: '2 adet havuç\n2 yemek kaşığı zeytinyağı\n2 yemek kaşığı tam tahıllı hardal\n1 yemek kaşığı limon suyu\n1 yemek kaşığı allulose (isteğe bağlı)',
    instructions: '1. Havuçları ince ince dilimleyin.\n2. Dilimlenmiş havuçların üzerine tüm sos malzemelerini (zeytinyağı, tam tahıllı hardal, limon suyu ve isteğe bağlı allulose) ekleyin.\n3. Tüm malzemeler iyice karışana kadar karıştırın ve hemen servis yapın.',
  },
  {
    id: 2,
    name: 'Brokolili Patates Salatası',
    ingredients: '1 baş brokoli\n7 adet baby patates\n2 adet kapya biber\n1 adet büyük havuç\n1 adet büyük mor soğan\n3 adet salatalık turşusu\n4 yemek kaşığı yoğurt\n1 yemek kaşığı tohumlu hardal\n2 diş sarımsak ezmesi\n1 tutam dereotu\nTuz\nKarabiber\nZerdeçal\nKekik\nZeytinyağı',
    instructions: '1. Brokoli Hazırlığı:\n   a. Brokoliyi ayıklayın.\n   b. 1 litre suya 3 yemek kaşığı sirke veya 1 tatlı kaşığı karbonat ekleyin.\n   c. Ayıklanmış brokoliyi bu sirkeli/karbonatlı suda 10-15 dakika bekletin.\n   d. Beklettikten sonra brokoliyi teker teker yıkayın.\n   e. Brokoliyi bıçak veya elle olabildiğince küçük parçalara ayırın (miyrosinaz enziminin artması için ne kadar küçük doğranırsa o kadar etkilidir).\n   f. Doğranmış brokoliyi sülforafan oluşumu için minimum 20 dakika bekletin (ne kadar uzun bekletilirse o kadar etkili olur).\n   g. Bekletilen brokoliyi buharda yumuşayana kadar haşlayın.\n2. Patates Hazırlığı:\n   a. 7 adet baby patatesi küp doğrayın.\n   b. Doğranmış patatesleri tuz, kekik ve karabiber ile harmanlayın.\n   c. Patatesleri 200 derece önceden ısıtılmış fırında kızarana kadar pişirin.\n3. Diğer Sebzelerin Hazırlığı:\n   a. 1 adet büyük havucu rendeleyin.\n   b. 1 adet büyük mor soğanı halka şeklinde doğrayın.\n   c. 2 adet kapya biberi jülyen (ince uzun) doğrayın.\n   d. Rendelenmiş havuç, halka doğranmış mor soğan ve jülyen doğranmış kapya biberi bir miktar zeytinyağında hafifçe çevirin (soteleyin).\n   e. 3 adet salatalık turşusunu küp doğrayın.\n4. Sos Hazırlığı:\n   a. Ayrı bir kapta 4 yemek kaşığı yoğurt, 1 yemek kaşığı tohumlu hardal, 2 diş ezilmiş sarımsak, bir tutam ince kıyılmış dereotu, damak zevkinize göre tuz, karabiber ve zerdeçalı iyice karıştırarak sosu hazırlayın.\n5. Salatayı Birleştirme:\n   a. Geniş bir karıştırma kabına haşlanmış brokoliyi, fırınlanmış patatesleri, sotelenmiş havuç, mor soğan ve kapya biberleri, doğranmış salatalık turşularını ve hazırladığınız sosu alın.\n   b. Tüm malzemeyi nazikçe ve homojen bir şekilde karıştırın.\n   c. İsteğe bağlı olarak, brokoliyi çok pişirdiyseniz ve sülforafan etkisini artırmak isterseniz hardal tohumu tozu ekleyebilirsiniz.',
  },
  {
    id: 3,
    name: 'Kuskuslu Hellim ve Sebze Salatası',
    ingredients: '1 su bardağı Pastavilla Kuskus\n2 adet kabak\n2 adet patlıcan\n2 yk zeytinyağı (sebzeler için)\nTuz\nKarabiber\n1 su bardağı haşlanmış yeşil mercimek\n225 g hellim peyniri\n1/2 demet dereotu\nZeytinyağı (sos için)\n1 limon suyu\n1 silme tk bal',
    instructions: '1. Kuskusu haşlayın. Haşlandıktan sonra veya suyunu çekmeye yakın biraz zeytinyağı gezdirerek yapışmasını önleyin ve soğumaya bırakın.\n2. Kabak ve patlıcanı küp küp doğrayın. Patlıcanı tuzlu suda bekletmeyi unutmayın.\n3. Doğranmış kabak ve patlıcanı 2 yemek kaşığı zeytinyağı, tuz ve karabiber ile harmanlayıp fırına gönderin ve pişirin.\n4. Hellim peynirini küp küp doğrayın. Kızgın bir tavada, birbirine değmeyecek şekilde pişirin. Büyük bir tava kullanabilirsiniz.\n5. Geniş bir kapta haşlanmış kuskus, haşlanmış yeşil mercimek, fırınlanmış sebzeler (kabak ve patlıcan), pişmiş hellim peyniri ve ince doğranmış dereotunu birleştirin.\n6. Ayrı bir yerde sosu için zeytinyağı, limon suyu, 1 silme tatlı kaşığı bal, tuz ve karabiberi karıştırın.\n7. Hazırladığınız sosu salatanın üzerine gezdirin ve tüm malzemeleri güzelce karıştırın.',
  },
  {
    id: 4,
    name: 'Nohutlu Fırın Sebze',
    ingredients: '1 adet küçük brokoli\n1 adet küçük karnabahar\n1 adet küçük butternut kabak\n1 adet pancar\n1 adet mor soğan\n400 g haşlanmış nohut\nZeytinyağı\nTuz\nKarabiber\nPaprika\nZerdeçal\nZencefil\nKekik\n3 yk yoğurt\n1 yk süzme yoğurt\n2 diş sarımsak ezmesi\n1 yk tahin\n1 yk tohumlu hardal\nTuz (sos için)',
    instructions: '1. Fırını 200 dereceye ısıtın.\n2. Brokoli ve karnabaharı küçük parçalara ayırın. Brokolinin içerisindeki sülforafanın ortaya çıkması için parçalara ayırdıktan sonra minimum 15 dakika hava ile temas etmesini sağlayın.\n3. Butternut kabak, pancar ve mor soğanı küp küp doğrayın.\n4. Doğradığınız tüm sebzeleri ve haşlanmış nohutu geniş bir kaba alın.\n5. Üzerine zeytinyağı, tuz, karabiber, paprika, zerdeçal, zencefil ve kekiği ekleyip tüm malzemeyi iyice karıştırın.\n6. Hazırladığınız sebzeleri fırın tepsisine yayın ve önceden ısıtılmış 200 derecelik fırında 20 dakika pişirin.\n7. Sebzeler fırında pişerken yoğurt sosunu hazırlayın: Bir kapta 3 yemek kaşığı yoğurt, 1 yemek kaşığı süzme yoğurt, 2 diş sarımsak ezmesi, 1 yemek kaşığı tahin, 1 yemek kaşığı tohumlu hardal ve sos için gerekli tuzu birleştirin.\n8. Sosu güzelce çırparak homojen bir kıvam almasını sağlayın.\n9. Servis tabağının dibine hazırladığınız yoğurt sosundan bir miktar koyun.\n10. Üzerine fırından çıkan sıcak sebzeleri ekleyerek servis yapın.',
  },
  {
    id: 5,
    name: 'Mini Muzlu Pankek',
    ingredients: '1 yumurta\n2 yemek kaşığı şeker\nBir tutam tuz\n1 su bardağı süt (200ml)\n5 yemek kaşığı sıvıyağ\n2 su bardağı un (200gr)\nVanilya\nKabartma tozu\n3 adet muz',
    instructions: '1. Yumurtayı şeker ve tuzla çırpın.\n2. Süt ve sıvıyağı ekleyip çırpın.\n3. Kuru malzemeleri de ekleyip pürüzsüz olana kadar çırpmaya devam edin.\n4. Dilimlediğimiz muzları karışıma ekleyin.\n5. Yapışmaz tavada yağsız orta ateşte tek tek tavaya dizin.\n6. Üzerine kapak kapatın.\n7. Altı kızardıktan sonra diğer tarafını çevirip pişirin.\n8. Üzerine meyve ve çikolata sos ekleyip servis edin.',
  },
  {
    id: 6,
    name: 'Karamelize Soğanlı Patates Salatası',
    ingredients: '1,5 su bardağı süzme yoğurt\nYarım su bardağı mayonez\n2 yemek kaşığı bal\n1,5 yemek kaşığı hardal\n1 tatlı kaşığı tuz\n1 çay kaşığı karabiber\nArzu edenler sarımsak veya sarımsak tozu\n¼ demet maydanoz\nBir tutam taze nane\nBir tutam dereotu\n2 adet büyük boy soğan\n2 yemek kaşığı sıvı yağ\n5 adet orta boy patates\n3-4 yemek kaşığı zeytinyağı',
    instructions: '1. Patatesleri soyup küp küp doğrayın. Yağlı kağıt serilmiş tepsiye alıp zeytinyağı ile harmanlayın ve 180°C fırında 20-25 dakika pişirin.\n2. Patatesler pişerken karamelize soğanı hazırlayın. Soğanları piyazlık doğrayın, sıvı yağ eklediğiniz tavada orta ateşte yavaş yavaş kavurun.\n3. Sosu için yeşillikleri ince kıyım doğrayın ve tüm malzemeleri geniş bir karıştırma kabında birleştirin.\n4. Son aşamada patatesleri, karamelize soğanı ve sosu buluşturup güzelce karıştırın.',
  },
  {
    id: 7,
    name: 'Karides Ceviche',
    ingredients: 'Roma domates\nKırmızı soğan\nKişniş\nSalatalık\nTaze soğan (sadece beyaz kısmı)\nSerrano biber\nKarides (pişmiş; çiğ kullanılıp misket limonunda pişirilebilir)\nMisket limonu (damak zevkine göre)\nTuz (damak zevkine göre)\nAçık sos (Pico Pica gibi, damak zevkine göre)',
    instructions: '1. Tüm sebzeleri (Roma domates, kırmızı soğan, kişniş, salatalık, taze soğanın beyaz kısmı ve serrano biber) ince ince doğrayın.\n2. Eğer çiğ karides kullanıyorsanız, karidesleri soyun, bağırsaklarını temizleyin ve lokmalık parçalar halinde kesin. Bir kaseye koyun ve tamamen taze misket limonu suyu ile kaplayın. Opak ve pembe olana kadar buzdolabında marine edin (boyutuna göre en az 30-60 dakika).\n3. Eğer pişmiş karides kullanıyorsanız, karidesleri soyun, bağırsaklarını temizleyin ve lokmalık parçalar halinde kesin.\n4. Geniş bir kapta doğranmış sebzeleri ve hazırladığınız karidesi birleştirin.\n5. Damak zevkinize göre ek misket limonu suyu, tuz ve acı sos ekleyin.\n6. Tüm malzemeleri nazikçe karıştırın.\n7. Üzerini kapatın ve lezzetlerin bütünleşmesi için en az 15-30 dakika buzdolabında dinlendirin.\n8. Soğuk olarak tostada, tortilla cipsi ile veya bir garnitür olarak servis yapın.',
  },
  {
    id: 8,
    name: 'Çikolatalı Kurabiye',
    ingredients: '125 gr Tereyağı (Eritilmiş ve oda sıcaklığına gelene kadar soğutulmuş)\n170 gr Toz Şeker (Yaklaşık bir parmak boşluk kalacak şekilde klasik su bardağı)\n1 adet Büyük Boy Yumurta (Oda sıcaklığında)\n2 yemek kaşığı Üzüm Pekmezi\n210 gr Un (Yaklaşık 2 su bardağı)\n1 yemek kaşığı Mısır Nişastası (Silme)\nYarım çay kaşığı Karbonat\nYarım çay kaşığı Tuz\n1 paket Vanilya\n120 gr Çikolata (40 gr bitter, 80 gr sütlü çikolata)',
    instructions: '1. Tereyağını eritin ve parmağınızı batırabileceğiniz ısıya gelene kadar bekletin.\n2. Soğuyan tereyağını ve toz şekeri bir kapta karıştırın. Üzerine yumurtayı ekleyip rengi hafif açılana kadar (yaklaşık 1 dakika) çırpın.\n3. 2 yemek kaşığı üzüm pekmezini ilave edip karıştırmaya devam edin.\n4. Unu, nişastayı, karbonatı, tuzu ve vanilyayı karışıma ekleyin. Spatula veya kaşık yardımıyla malzemeler birleşene kadar karıştırın.\n5. Doğranmış çikolataları hamura ekleyip son kez karıştırın.\n6. Hamuru buzdolabında en az 30-40 dakika dinlendirin.\n7. Dinlenen hamurdan üç parmak çapında yuvarlaklar yapın. Tepsiye aralıklı dizin.\n8. Önceden ısıtılmış 175-180 derece alt-üst ayarlı fırında pişirin. Kenarlar hafif altın rengi olmalı ancak orta kısmı hala yumuşak kalmalıdır.\n9. Kurabiyeler tepside tamamen soğuyana kadar bekletin.',
  },
  {
    id: 9,
    name: 'Patates Salatası',
    ingredients: '3 adet büyük boy patates\n300g pachino domates veya çeri domates\n1 adet büyük boy kırmızı soğan\n3 yemek kaşığı kırmızı şarap sirkesi\n20g taze fesleğen\n2 çay kaşığı kuru kekik\n70g yeşil zeytin\n2 silme dolu çay kaşığı kapari\nİnce deniz tuzu\nTaze çekilmiş karabiber\nSızma zeytinyağı',
    instructions: '1. Patatesleri haşlayın. Haşlandıktan sonra soyun ve küp küp doğrayın.\n2. Pachino veya çeri domatesleri ikiye bölün. Kırmızı soğanı ince ince doğrayın. Taze fesleğeni kıyın. Yeşil zeytinleri dilimleyin.\n3. Geniş bir kapta patatesleri, domatesleri, kırmızı soğanı, fesleğeni ve zeytinleri birleştirin.\n4. Ayrı bir kapta kırmızı şarap sirkesini, zeytinyağını, kuru kekik, kapari, tuz ve karabiberi karıştırarak sosu hazırlayın.\n5. Sosu salatanın üzerine dökün ve tüm malzemeler eşit şekilde kaplanana kadar nazikçe karıştırın.\n6. İsteğe bağlı olarak közlenmiş biber veya ton balığı ekleyerek servis yapın.',
  },
  {
    id: 10,
    name: 'Laktofermente Turşu',
    ingredients: '1 litre içme suyu\n20-25 gram (%2-2.5) kaya tuzu veya deniz tuzu (İyotlu tuz değil)\nBeyaz lahana\nPancar\nHavuç\nKarnabahar',
    instructions: '1. Salamurayı hazırlayın: 1 litre içme suyuna 20-25 gram kaya tuzu veya deniz tuzu ekleyerek karıştırın.\n2. Sebzeleri cam kavanoza sıkıca yerleştirin.\n3. Salamurayı sebzelerin üzerini tamamen kaplayacak şekilde ekleyin. Sebzelerin sıvının üstünde kalmamasına dikkat edin.\n4. Kavanoz ağzını çok sıkı kapatmayın; gaz çıkışına izin verin.\n5. Direkt güneş almayan oda sıcaklığında 7-20 gün bekletin. İdeal probiyotik yoğunluğu için 14-21 gün beklemek önerilir.\n6. Fermantasyon tamamlandıktan sonra buzdolabına alın.',
  },
  {
    id: 11,
    name: 'Balkan Köfte',
    ingredients: '250 gram dana kaburga\n250 gram dana kol kıyma\n1 yemek kaşığı kaymak\n7 gram tuz\n5 diş sarımsak ve 1 su bardağı su\n1 çay kaşığı karbonat (yarısını içine, yarısı en son şekil verirken)',
    instructions: '1. Su ve sarımsağı 10 dakika kaynatıp soğutun.\n2. Kıymaya tuzunu ve kaymağını koyun.\n3. Azar azar suyun yarısını ekleyip en az 15-20 dakika vura vura yoğurun.\n4. Minimum 3 saat ama tercihen bir gece dolapta dinlendirin.\n5. Pişirmeden önce karbonatlı, tuzlu su ile elinizi ıslatarak şekil verip pişirin.',
  },
  {
    id: 12,
    name: 'Sardalya Ezmesi',
    ingredients: '1 can of sardines in olive oil\nHalf red onion, finely chopped\n1 small carrot, grated\nA few olives, chopped\n1 tablespoon dill, finely chopped\nLemon zest\n1 tablespoon lemon juice\n1 teaspoon Dijon mustard\nSalt and pepper to taste',
    instructions: '1. Whisk the sardine oil, lemon zest, lemon juice, mustard, salt and pepper until it emulsifies slightly. Add in the sardines and mash them with a fork (keep some texture, don\'t puree completely).\n2. Mix in the onions, carrots, olives and dill. Spread on sourdough bread. Enjoy!',
  },
  {
    id: 13,
    name: 'Kış Pilavı',
    ingredients: '1,5 su bardağı basmati pirinç\n500 gr pırasa\n2 orta boy havuç\n1 çay bardağı mercimek\n1 tatlı kaşığı tuz\nKarabiber\n1/2 tatlı kaşığı kimyon\n1 çay kaşığı toz şeker\n1 limon kabuğu rendesi\n1/2 limon suyu\n1/2 demet dereotu\n3-4 yemek kaşığı zeytinyağı\n1,5 bardak sıcak su',
    instructions: '1. Basmati pirinçleri 7-8 defa, akan suda berraklaşana kadar yıkayın ve süzün.\n2. Mercimeği 2 saat suda ıslatın ve haşlayıp süzün.\n3. Pırasaları incecik doğrayın. Havuçları da ince uzun kesin.\n4. Tencereye zeytinyağını alın, pırasaları hafif yumuşayana kadar soteleyin, havuçları da ekleyip hacimleri kaybolana kadar sotelemeye devam edin.\n5. Üzerine mercimeği ve pirinci ilave edip karıştırın.\n6. Tuz, karabiber, şeker ve kimyonu ekleyin.\n7. Limon kabuğu ve suyunu ilave edip, suyu ekleyin.\n8. Kapağı kapalı kısık ateşte suyu çekene kadar pişirin.\n9. Üzerine kağıt havlu örterek 20 dk demlenmeye bırakın.\n10. Dereotunu ince kıyın ve karıştırın.\n11. Servis ederken üzerine bir miktar daha zeytinyağı gezdirin.',
  },
  {
    id: 14,
    name: 'Esmer Pirinç-Bulgur Pilavı',
    ingredients: '0.8 su bardağı esmer pirinç\n0.8 su bardağı kalın bulgur\n0.5 su bardağı yeşil mercimek\n1 soğan, ince doğranmış\n2 yemek kaşığı zeytinyağı\n3 su bardağı sıcak su veya sebze/kemik suyu\n1 tatlı kaşığı tuz\n2 yemek kaşığı kabak çekirdeği veya ay çekirdeği\n1 yemek kaşığı keten tohumu (isteğe bağlı)\n3 yemek kaşığı taze maydanoz veya dereotu, kıyılmış',
    instructions: '1. Baklagili ön haşla: 0.5 su bardağı yeşil mercimeği bol suda yarı yumuşayana kadar (yaklaşık 12-15 dk) haşla ve süzgece al.\n2. Esmer pirinci ıslat: 0.8 su bardağı esmer pirinci 20-30 dk ılık suda beklet, sonra durulayıp süz.\n3. Soğanı kavur: Tencerede 2 yemek kaşığı zeytinyağını ısıt, 1 ince doğranmış soğanı pembeleşene kadar orta ateşte kavur.\n4. Önce pirinci pişir: Süzülmüş esmer pirinci tencereye ekle, 1-2 dk çevir. Üzerine sıcak suyun yaklaşık 2 bardağını ve 1 tatlı kaşığı tuzu ekle. Kaynayınca ateşi kıs, kapağı kapat ve 15 dk pişir — çünkü esmer pirinç bulgurdan daha uzun sürede pişer.\n5. Bulgur ve baklagili ekle: 15 dakika sonra 0.8 su bardağı bulguru ve ön haşlanmış mercimeği ekle. Kalan 1 bardak sıcak suyu ilave et, karıştır. Kapağı kapatıp kısık ateşte 12-15 dk daha, su çekilene kadar pişir.\n6. Demlendir: Ocağı kapat, kapağın altına temiz bir bez koyup 10 dk demlenmeye bırak.\n7. Servis et: Pilavı havalandırarak karıştır. Üzerine 2 yemek kaşığı çekirdekleri, 1 yemek kaşığı keten tohumunu ve 3 yemek kaşığı taze yeşillikleri serperek servis et.',
  },
  {
    id: 16,
    name: 'Hainan Tavuklu Pilav',
    ingredients: 'Tavuk:\n4-6 adet tavuk budu (kemikli, derili)\n5-6 dilim taze zencefil\n4-5 diş sarımsak (dilimlenmiş)\n3-4 dal yeşil soğan\nBir miktar pirinç şarabı (veya beyaz şarap)\nSu (tavukları kaplayacak kadar)\nBuz (soğutma için)\n\nPilav:\nPirinç (pirinç pişiriciye göre ölçü)\nTavuk suyu (pirinci pişirmek için su yerine)\n\nSos:\nKoyu soya sosu veya istiridye sosu (kıvamlı, koyu renkli)\n1 adet lime suyu (taze sıkılmış)\n1 tatlı kaşığı şeker\n2-3 adet kırmızı acı biber (ince doğranmış)\nTaze zencefil (rendelenmiş)\nBir tutam MSG (Ajinomoto)\n2-3 yemek kaşığı sıcak yağ\n\nGarnitür:\n2 adet salatalık (ince rendelenmiş)\n1 demet kişniş (doğranmış)\n2-3 dal yeşil soğan (ince doğranmış)',
    instructions: '1. Tavuğu Haşlama:\n   a. Tavuk butlarını geniş bir tencereye yerleştirin.\n   b. Üzerine dilimlenmiş zencefil, sarımsak ve yeşil soğanları ekleyin.\n   c. Bir miktar pirinç şarabı gezdirin — bu tavuğa derinlik ve hafif tatlılık katar.\n   d. Tavukları kaplayacak kadar su ekleyin.\n   e. Kapağı kapatıp kaynayana kadar pişirin, sonra kısık ateşte tavuk tamamen pişene kadar haşlayın.\n2. Buzlu Su Şoku:\n   a. Pişen tavuk butlarını hemen buzlu suya aktarın.\n   b. Bu adım çok önemli: derinin jelimsi ve ipeksi kalmasını, etin sulu ve yumuşak olmasını sağlar. Atlamamanız gereken bir lezzet sırrıdır.\n3. Pilavı Pişirme:\n   a. Tavuğun haşlandığı sudan bir miktar alın — bu aromatik tavuk suyu pilavın tüm lezzetini belirler.\n   b. Pirinç pişiriciye pirinci koyun ve su yerine tavuk suyunu ekleyin.\n   c. Kapağı kapatıp pişirin. Pirinç tavuk yağı ve aromasını emerek muhteşem bir lezzet kazanır.\n4. Sosu Hazırlama:\n   a. Bir kaseye koyu soya sosu veya istiridye sosu koyun.\n   b. Taze sıkılmış lime suyu ekleyin — asidite sosu dengeler.\n   c. Şeker ekleyip karıştırın.\n   d. Kırmızı acı biberleri ince ince doğrayıp sosa ekleyin.\n   e. Taze zencefili microplane ile direkt sosa rendeleyerek taze, keskin bir aroma katın.\n   f. Bir tutam MSG ekleyin — umami derinliği verir.\n   g. Son olarak üzerine kızgın sıcak yağ gezdirin: yağ biberlerin ve zencefilin aromatik yağlarını açığa çıkarır, sosa canlı bir koku ve parlaklık katar. Karıştırın.\n5. Garnitürü Hazırlama:\n   a. Salatalıkları rende ile ince ince dilimleyin.\n   b. Kişniş ve yeşil soğanları ince doğrayın.\n   c. Hepsini bir kasede birleştirin — tazelik ve çıtırlık katar.\n6. Tavuğu Dilimleme:\n   a. Buzlu sudan çıkan tavuğu kesme tahtasına alın.\n   b. Kemik boyunca düzgün dilimler halinde kesin.\n7. Servis:\n   a. Pişmiş pirinci küçük bir kaseye sıkıştırarak şekil verin.\n   b. Tabağa ters çevirip kubbe şeklinde yerleştirin.\n   c. Dilimlenmiş tavuğu pirincin yanına dikkatlice dizin.\n   d. Salatalık-kişniş garnitürünü tabağa ekleyin.\n   e. Hazırladığınız sosu tavuğun ve garnitürün üzerine cömertçe gezdirin.',
  },
  {
    id: 17,
    name: 'Salçalı Kıymalı Yumurtalı Pilav',
    ingredients: '1.5 su bardağı baldo pirinç\n150g dana kıyma\n1 adet orta boy soğan (ince doğranmış)\n1 adet havuç (küçük küp doğranmış)\n2 diş sarımsak (ince doğranmış)\n1 yemek kaşığı domates salçası\n1 yemek kaşığı biber salçası\n2 yemek kaşığı tereyağı\n2 adet yumurta\n2.5 su bardağı sıcak et suyu (veya su + 1 et suyu tableti)\n1 çay kaşığı kimyon\n1 çay kaşığı pul biber\nTuz\nKarabiber\nTaze maydanoz (servis için)',
    instructions: '1. Pirinci birkaç kez yıkayıp 15 dakika ılık suda bekletin, süzün.\n2. Tavada tereyağını eritin. Soğanı pembeleşene kadar kavurun — acele etmeyin, karamelize olması lezzeti derinleştirir.\n3. Kıymayı ekleyip suyunu salana ve çekene kadar kavurun. Sarımsağı ekleyip 1 dakika daha kavurun.\n4. Domates salçası ve biber salçasını ekleyin, salçaların kokusu açılana kadar (yaklaşık 2 dakika) kavurun — bu adım pilavın rengini ve lezzetini belirler.\n5. Doğranmış havucu ekleyip 1-2 dakika çevirin.\n6. Süzülmüş pirinci pilav pişiriciye koyun. Tavadaki kıymalı karışımı üzerine aktarın.\n7. Kimyon, pul biber, tuz ve karabiberi ekleyin.\n8. Sıcak et suyunu dökün, hafifçe karıştırın. Pilav pişiriciyi normal pilav modunda çalıştırın.\n9. Pirinç piştikten sonra 2 yumurtayı çırpıp pilavın üzerine gezdirin. Kapağı kapatıp 15-20 dakika sıcak tutma modunda dinlendirin — yumurta buharla hafifçe pişerek pilavı kremamsı bir dokuya kavuşturur.\n10. Pilavı alttan üste karıştırın, taze maydanoz serpip servis edin. Yanına yoğurt çok iyi gider.',
  },
  {
    id: 18,
    name: 'Zencefil Konsantresi (Ev Yapımı Ginger Ale)',
    ingredients: '400-500 gr taze zencefil\n200-250 gr kahverengi (esmer) şeker\n1-2 adet limon kabuğu rendesi\nAynı limonun suyu\n1 tutam taze nane (ince doğranmış)\n1-2 şişe soda (karışım için)\nServis için: soğuk soda (1\'e 5 oranında)\n\nİnce dokunuşlar (isteğe bağlı):\n1 tutam tuz (lezzetleri dengeler, zencefili öne çıkarır)\n1 küçük çubuk tarçın + 2-3 kakule veya birkaç tane karabiber (klasik ginger beer derinliği)\n1 adet misket limonu (lime) suyu (limonun yanına, ferahlık katar)\n1-2 yemek kaşığı bal (daha yuvarlak bir tatlılık için)',
    instructions: '1. Zencefilleri soyup rendenin küçük dişlerinde rendeleyin.\n2. Üzerine 200-250 gr kahverengi şekeri ekleyip karıştırın ve öyle bekletin — şeker zencefilin suyunu çeker, bu maserasyon ne kadar uzun olursa o kadar çok aromatik öz çıkar (15-20 dk idealdir).\n3. 1-2 limonun kabuğunu rendeleyip ekleyin, aynı limonun suyunu da sıkın. (İnce dokunuş: yanına 1 lime suyu sıkarsanız turunç notası belirginleşir.)\n4. Bir miktar naneyi iyice doğrayıp ekleyin.\n5. İsteğe bağlı: 1 tutam tuz ekleyin (tatları dengeler). Daha katmanlı bir aroma için tarçın, kakule veya birkaç karabiberi de bu aşamada ekleyebilirsiniz.\n6. Karışıma 1-2 şişe soğuk soda ekleyin. Avucunuzla eze eze iyice karıştırın — ezmek zencefilin ve nanenin yağlarını açığa çıkarır.\n7. 20-30 dakika bu şekilde dinlensin.\n8. Bulamacı bir tülbentle parça parça, elinizle sıka sıka süzün. Süzülen konsantreyi şişeye doldurun.\n9. Servis: Bu bir konsantredir. 1\'e 5 oranında soğuk soda ile karıştırarak için. En iyi oran 1\'e 5\'tir ama azar azar artırıp azaltarak kendi mükemmel oranınızı bulabilirsiniz.\n10. Hem zencefil konsantresi hem de soda servis öncesi soğuk olsun.\n11. Şişeden dökmeden önce iyice çalkalayın — dibinde tortu birikir.\n\nNot: Bazı yerlerde hazırlarken içine yeşil ice tea karıştırıyorlar; istenirse denenebilir ama sade hâli de gayet iyidir.',
  },
  {
    id: 19,
    name: 'Akdeniz Yaz Dip Sosu',
    ingredients: 'Zeytinyağı (bol)\nBalsamik sirke\nTuz\nKarabiber\nSarımsak (bol — 2-3 diş)\n1 limon (suyu)\nGüneşte kurutulmuş domates (kavanozdan, doğranmış)\nTaze fesleğen (kıyılmış)\nParmesan (rendelenmiş — bol)\nÇam fıstığı (üzeri için)\nEkmek (servis için)',
    instructions: '1. Kaseye bol zeytinyağı dök.\n2. Üzerine balsamik sirke gezdır.\n3. Tuz ve karabiber ekle.\n4. Sarımsağı ince rende ile rendele, kaseye ekle.\n5. Limonun suyunu sık.\n6. Güneşte kurutulmuş domatesleri doğrayıp ekle.\n7. Kıyılmış taze fesleğeni ekle.\n8. Bol parmesan rendele, çatalla tüm malzemeleri karıştır.\n9. Üzerine çam fıstığı ve biraz daha parmesan rendele.\n10. Ekmekle servis et.\n\nNot: İsteğe göre zeytin veya farklı taze otlar da eklenebilir.',
  },
  {
    id: 20,
    name: 'Antrenman Öncesi Enerji Küpleri',
    ingredients: 'Taze zencefil (bol)\n2 adet pancar\nBol bal\n2 limon (suyu)',
    instructions: '1. Taze zencefil, pancar, bol bal ve limon suyunu blendere koy.\n2. Pürüzsüz kıvama gelene kadar blend et.\n3. Karışımı 2 inçlik (5 cm) buz kalıplarına dök.\n4. Dondurucuya koy ve tamamen donmasını bekle.\n5. Kullanmak istediğinde bir veya iki küpü bir bardak sıcak suya at, eriyene kadar karıştır ve antremandan önce iç.',
  },
  {
    id: 15,
    name: 'Air Fryer Patates',
    ingredients: '~450g patates, eşit boyutlarda doğranmış\nAvokado yağı spreyi\nTuz\nKarabiber',
    instructions: '1. Air fryer\'ı 200°C\'ye (400°F) ön ısıtmaya alın.\n2. Patatesleri yıkayın ve eşit boyutlarda parçalara doğrayın (eşit pişmesi için yaklaşık 2.5 cm parçalar).\n3. Patatesleri geniş bir kaseye alın. Hafifçe avokado yağı spreyi sıkın, tuz ve karabiber ekleyin. Tüm parçalar eşit kaplanana kadar iyice karıştırın.\n4. Patatesleri air fryer sepetine tek katman halinde yerleştirin (üst üste koymayın).\n5. 200°C\'de toplam 20 dakika pişirin.\n6. Yarısında (10. dakikada) sepeti sallayın veya patatesleri çevirin, böylece eşit kızarır.\n7. Dışı altın rengi ve çıtır, içi yumuşak olunca çıkarın.',
  },
  {
    id: 21,
    name: 'Zeytinyağlı Bal Limonatası (1 Litre)',
    ingredients: '1 tane tam limon (mumsuz olsun)\n1 litre soğuk su\n1 çay kaşığı zeytinyağı\n4 çorba kaşığı bal (damak zevkine göre 4-6 kaşık arası ayarlanabilir)\nBuz (servis için)',
    instructions: '1. Limonu çok iyi yıkayın. Mumsuz olup olmadığını kontrol etmek için tırnağınızı kabuğuna sürtün. Beyaz mum çıkıyorsa kullanmayın.\n2. Mutfak robotunun / blenderın haznesine hepsini birden koyun: bütün limon (dilimlemeden, olduğu gibi), 1 litre soğuk su, 1 çay kaşığı zeytinyağı, 4 çorba kaşığı bal.\n3. 1-2 dakika blenderdan geçirin. Limon tamamen parçalanacak, kabuk aroması + suyu + her şey bir arada karışacak.\n4. Hazır olan limonatayı süzgeçten süzerek buz dolu bir sürahiye boşaltın.\n5. Buz gibi için.\n\nNot: Renk boğuk sarı / mat sarımsı olur (normal, blenderdan geçtiği için). Asla acı tadı gelmiyor. Zeytinyağı acı vermiyor, tam tersine yumuşaklık ve lezzet katıyor. Peynir suyu, yoğurt suyu vs. eklemeye gerek yok, orijinal tarif bu şekilde. Çok ferah, sağlıklı ve 1 dakikada hazır oluyor.',
  },
]

/**
 * Get all recipes
 */
export function getAllRecipes() {
  return recipes
}

/**
 * Get recipe by id
 */
export function getRecipeById(id) {
  return recipes.find((r) => r.id === id) || null
}

/**
 * Get recipe stats
 */
export function getRecipeStats() {
  return { total: recipes.length }
}
