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
