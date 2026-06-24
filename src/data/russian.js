/**
 * Russian Language Learning Data
 * Rusça Kelime ve Cümle Listesi — tab yapısı ile organize edilmiş
 */

export const russianTabs = [
  { id: 'tanisma',  label: 'Tanışma',         emoji: '👋' },
  { id: 'kafe',     label: 'Kafe & Restoran',  emoji: '☕' },
  { id: 'seyahat',  label: 'Seyahat',          emoji: '✈️' },
  { id: 'temel',    label: 'Temel İfadeler',   emoji: '💬' },
  { id: 'sayilar',  label: 'Sayılar',          emoji: '🔢' },
  { id: 'renkler',  label: 'Renkler',          emoji: '🎨' },
  { id: 'fiiller',  label: 'Fiiller',          emoji: '🏃' },
]

export const russianPhrases = [

  // ===== TANIŞMA =====
  { id: 110, tab: 'tanisma', russian: 'Доброе утро',               pronunciation: 'Dobraye utra',                     turkish: 'Günaydın',                            english: 'Good morning' },
  { id: 111, tab: 'tanisma', russian: 'Добрый день',               pronunciation: 'Dobrıy den',                       turkish: 'İyi günler',                          english: 'Good afternoon' },
  { id: 112, tab: 'tanisma', russian: 'Добрый вечер',              pronunciation: 'Dobrıy vecher',                    turkish: 'İyi akşamlar',                        english: 'Good evening' },
  { id: 4,   tab: 'tanisma', russian: 'Как дела?',                 pronunciation: 'Kak dilá?',                        turkish: 'Nasılsın?',                           english: 'How are you?' },
  { id: 5,   tab: 'tanisma', russian: 'Хорошо, спасибо',          pronunciation: 'Harasho, spasiba',                 turkish: 'İyiyim, teşekkürler',                 english: 'Good, thank you' },
  { id: 102, tab: 'tanisma', russian: 'Хорошо, спасибо. А у вас?', pronunciation: 'Harasho, spasiba. A u vas?',      turkish: 'İyiyim, teşekkürler. Ya siz?',        english: 'Good, thank you. And you?' },
  { id: 209, tab: 'tanisma', russian: 'Как вас зовут?',           pronunciation: 'Kak vas zavut?',                   turkish: 'Adınız nedir?',                       english: 'What is your name?' },
  { id: 210, tab: 'tanisma', russian: 'Меня зовут Mehmet',        pronunciation: 'Menya zavut Mehmet',               turkish: 'Benim adım Mehmet',                   english: 'My name is Mehmet' },
  { id: 211, tab: 'tanisma', russian: 'Очень приятно',            pronunciation: 'Ochen priyatna',                   turkish: 'Memnun oldum',                        english: 'Nice to meet you' },
  { id: 201, tab: 'tanisma', russian: 'Я турист из Турции',        pronunciation: 'Ya turist iz Turtsii',             turkish: "Türkiye'den gelen bir turistim",       english: 'I am a tourist from Turkey' },
  { id: 12,  tab: 'tanisma', russian: 'Я учу русский язык',        pronunciation: 'Ya uchu ruskiy yazık',             turkish: 'Rusça öğreniyorum',                   english: 'I am learning Russian' },
  { id: 13,  tab: 'tanisma', russian: 'Я немного говорю по-русски', pronunciation: 'Ya nyemnoga gavaryu pa-ruski',    turkish: 'Biraz Rusça konuşuyorum',             english: 'I speak a little Russian' },

  // ===== KAFE & RESTORAN =====
  { id: 7,   tab: 'kafe', russian: 'Меню, пожалуйста',            pronunciation: 'Menyu, pajalusta',                 turkish: 'Menü lütfen',                         english: 'Menu, please' },
  { id: 14,  tab: 'kafe', russian: 'Можно посмотреть меню?',      pronunciation: 'Mojna pasmatryet menyu?',          turkish: 'Menüyü görebilir miyim?',             english: 'Can I see the menu?' },
  { id: 8,   tab: 'kafe', russian: 'Счёт, пожалуйста',           pronunciation: 'Schyot, pajalusta',                turkish: 'Hesap lütfen',                        english: 'Check/Bill, please' },
  { id: 15,  tab: 'kafe', russian: 'Приятного аппетита',          pronunciation: 'Priyatnava appetita',              turkish: 'Afiyet olsun',                        english: 'Bon appetit' },
  { id: 19,  tab: 'kafe', russian: 'Очень вкусно',               pronunciation: 'Ochen vkusna',                     turkish: 'Çok lezzetli',                        english: 'Very delicious' },
  { id: 200, tab: 'kafe', russian: 'Вкусно!',                    pronunciation: 'Vkusna!',                          turkish: 'Lezzetli!',                           english: 'Delicious!' },
  { id: 17,  tab: 'kafe', russian: 'У вас есть вай-фай?',        pronunciation: 'U vas yest vay-fay?',              turkish: 'Wi-Fi var mı?',                       english: 'Do you have Wi-Fi?' },
  { id: 18,  tab: 'kafe', russian: 'Можно заплатить картой?',    pronunciation: 'Mojna zaplatit kartoy?',           turkish: 'Kartla ödeyebilir miyim?',            english: 'Can I pay by card?' },
  { id: 205, tab: 'kafe', russian: 'Я беру',                     pronunciation: 'Ya beru',                          turkish: 'Bunu alıyorum',                       english: "I'll take it" },
  { id: 214, tab: 'kafe', russian: 'Подскажите хорошее кафе поблизости?', pronunciation: 'Padskajite harosheye kafe pablizosti?', turkish: 'Yakınlarda iyi bir kafe önerebilir misiniz?', english: 'Can you suggest a good cafe nearby?' },
  { id: 215, tab: 'kafe', russian: 'Где здесь лучший кофе / десерт?', pronunciation: 'Gde zdes luchshiy kofe / desert?', turkish: 'Burada en iyi kahve/tatlı nerede?', english: 'Where is the best coffee/dessert here?' },
  { id: 41,  tab: 'kafe', russian: 'кофе',                       pronunciation: 'kofe',                             turkish: 'kahve',                               english: 'coffee' },
  { id: 42,  tab: 'kafe', russian: 'чай',                        pronunciation: 'chay',                             turkish: 'çay',                                 english: 'tea' },
  { id: 40,  tab: 'kafe', russian: 'вода',                       pronunciation: 'vadá',                             turkish: 'su',                                  english: 'water' },
  { id: 43,  tab: 'kafe', russian: 'хлеб',                       pronunciation: 'hleb',                             turkish: 'ekmek',                               english: 'bread' },
  { id: 50,  tab: 'kafe', russian: 'завтрак',                    pronunciation: 'zavtrak',                          turkish: 'kahvaltı',                            english: 'breakfast' },
  { id: 51,  tab: 'kafe', russian: 'обед',                       pronunciation: 'abyed',                            turkish: 'öğle yemeği',                         english: 'lunch' },
  { id: 52,  tab: 'kafe', russian: 'ужин',                       pronunciation: 'ujin',                             turkish: 'akşam yemeği',                        english: 'dinner' },

  // ===== SEYAHAT =====
  { id: 6,   tab: 'seyahat', russian: 'Где находится...?',         pronunciation: 'Gde nahoditsya...?',              turkish: '... nerede?',                         english: 'Where is...?' },
  { id: 16,  tab: 'seyahat', russian: 'Как мне туда добраться?',   pronunciation: 'Kak mnye tuda dabratsya?',        turkish: 'Oraya nasıl ulaşabilirim?',           english: 'How can I get there?' },
  { id: 206, tab: 'seyahat', russian: 'Прямо / Налево / Направо', pronunciation: 'Pryama / Naleva / Naprava',       turkish: 'Düz / Sola / Sağa',                  english: 'Straight / Left / Right' },
  { id: 207, tab: 'seyahat', russian: 'Где выход?',               pronunciation: 'Gde vıhad?',                      turkish: 'Çıkış nerede?',                       english: 'Where is the exit?' },
  { id: 212, tab: 'seyahat', russian: 'Расскажите, что здесь стоит посмотреть?', pronunciation: 'Rasskajite, shto zdes stoit pasmatrét?', turkish: 'Burada görülmeye değer neler var?', english: 'What is worth seeing here?' },
  { id: 216, tab: 'seyahat', russian: 'Что здесь обязательно стоит посмотреть?', pronunciation: 'Shto zdes obyazatelna stoit pasmatrét?', turkish: 'Burada mutlaka görülmesi gereken ne var?', english: 'What is a must-see here?' },
  { id: 213, tab: 'seyahat', russian: 'Где посоветуете поесть по-местному?', pronunciation: 'Gde pasavetuyete payest pa-mesnamu?', turkish: 'Yerel olarak nerede yememi önerirsiniz?', english: 'Where do you recommend eating local food?' },
  { id: 208, tab: 'seyahat', russian: 'Россия очень красивая страна', pronunciation: 'Rossiya ochen krasivaya strana', turkish: 'Rusya çok güzel bir ülke',          english: 'Russia is a very beautiful country' },
  { id: 48,  tab: 'seyahat', russian: 'город',                    pronunciation: 'gorad',                           turkish: 'şehir',                               english: 'city' },
  { id: 49,  tab: 'seyahat', russian: 'улица',                    pronunciation: 'ulitsa',                          turkish: 'sokak',                               english: 'street' },
  { id: 44,  tab: 'seyahat', russian: 'дом',                      pronunciation: 'dom',                             turkish: 'ev',                                  english: 'house/home' },
  { id: 45,  tab: 'seyahat', russian: 'машина',                   pronunciation: 'mashina',                         turkish: 'araba',                               english: 'car' },

  // ===== TEMEL İFADELER =====
  { id: 1,   tab: 'temel', russian: 'Вы говорите по-английски?',  pronunciation: 'Vı gavarité pa-angliyski?',       turkish: 'İngilizce konuşuyor musunuz?',        english: 'Do you speak English?' },
  { id: 2,   tab: 'temel', russian: 'Я не понимаю',              pronunciation: 'Ya ni panimáyu',                  turkish: 'Anlamıyorum',                         english: "I don't understand" },
  { id: 3,   tab: 'temel', russian: 'Повторите, пожалуйста',     pronunciation: 'Paftarite, pajalusta',            turkish: 'Lütfen tekrar edin',                  english: 'Please repeat' },
  { id: 9,   tab: 'temel', russian: 'Сколько стоит?',            pronunciation: 'Skolka stoit?',                   turkish: 'Bu ne kadar?',                        english: 'How much does it cost?' },
  { id: 10,  tab: 'temel', russian: 'Помогите!',                 pronunciation: 'Pamagite!',                       turkish: 'İmdat!',                              english: 'Help!' },
  { id: 100, tab: 'temel', russian: 'Вы можете мне помочь?',     pronunciation: 'Vı mojete mnye pamoch?',          turkish: 'Bana yardım edebilir misiniz?',       english: 'Can you help me?' },
  { id: 101, tab: 'temel', russian: 'Что это за место?',         pronunciation: 'Shto eta za myesta?',             turkish: 'Burası neresi?',                      english: 'What is this place?' },
  { id: 103, tab: 'temel', russian: 'Что это?',                  pronunciation: 'Shto eta?',                       turkish: 'Bu ne?',                              english: 'What is this?' },
  { id: 104, tab: 'temel', russian: 'Кто это?',                  pronunciation: 'Kto eta?',                        turkish: 'Bu kim?',                             english: 'Who is this?' },
  { id: 105, tab: 'temel', russian: 'Где?',                      pronunciation: 'Gde?',                            turkish: 'Nerede?',                             english: 'Where?' },
  { id: 106, tab: 'temel', russian: 'Когда?',                    pronunciation: 'Kagda?',                          turkish: 'Ne zaman?',                           english: 'When?' },
  { id: 107, tab: 'temel', russian: 'Почему?',                   pronunciation: 'Pachemu?',                        turkish: 'Neden?',                              english: 'Why?' },
  { id: 108, tab: 'temel', russian: 'Как?',                      pronunciation: 'Kak?',                            turkish: 'Nasıl?',                              english: 'How?' },
  { id: 109, tab: 'temel', russian: 'Сколько?',                  pronunciation: 'Skolka?',                         turkish: 'Ne kadar?',                           english: 'How much/many?' },
  { id: 202, tab: 'temel', russian: 'Можно?',                    pronunciation: 'Mojna?',                          turkish: 'Mümkün mü?',                          english: 'May I?' },
  { id: 203, tab: 'temel', russian: 'Можно посмотреть?',         pronunciation: 'Mojna pasmatrét?',                turkish: 'Bakabilir miyim?',                    english: 'Can I have a look?' },
  { id: 204, tab: 'temel', russian: 'У вас есть … ?',            pronunciation: 'U vas yest ... ?',                turkish: 'Sizde ... var mı?',                   english: 'Do you have...?' },
  { id: 53,  tab: 'temel', russian: 'дорого',                    pronunciation: 'doraga',                          turkish: 'pahalı',                              english: 'expensive' },
  { id: 54,  tab: 'temel', russian: 'дёшево',                    pronunciation: 'dyosheva',                        turkish: 'ucuz',                                english: 'cheap' },

  // ===== SAYILAR =====
  { id: 60,  tab: 'sayilar', russian: 'один',    pronunciation: 'adín',    turkish: 'bir',   english: '1' },
  { id: 61,  tab: 'sayilar', russian: 'два',     pronunciation: 'dva',     turkish: 'iki',   english: '2' },
  { id: 62,  tab: 'sayilar', russian: 'три',     pronunciation: 'tri',     turkish: 'üç',    english: '3' },
  { id: 63,  tab: 'sayilar', russian: 'четыре',  pronunciation: 'chitıre', turkish: 'dört',  english: '4' },
  { id: 64,  tab: 'sayilar', russian: 'пять',    pronunciation: 'pyat',    turkish: 'beş',   english: '5' },
  { id: 65,  tab: 'sayilar', russian: 'шесть',   pronunciation: 'shest',   turkish: 'altı',  english: '6' },
  { id: 66,  tab: 'sayilar', russian: 'семь',    pronunciation: 'syem',    turkish: 'yedi',  english: '7' },
  { id: 67,  tab: 'sayilar', russian: 'восемь',  pronunciation: 'vosem',   turkish: 'sekiz', english: '8' },
  { id: 68,  tab: 'sayilar', russian: 'девять',  pronunciation: 'dyevyat', turkish: 'dokuz', english: '9' },
  { id: 69,  tab: 'sayilar', russian: 'десять',  pronunciation: 'dyesyat', turkish: 'on',    english: '10' },

  // ===== RENKLER =====
  { id: 80,  tab: 'renkler', russian: 'красный',   pronunciation: 'krasnıy',   turkish: 'kırmızı', english: 'red',    color: '#ef4444' },
  { id: 81,  tab: 'renkler', russian: 'синий',     pronunciation: 'siniy',     turkish: 'mavi',    english: 'blue',   color: '#3b82f6' },
  { id: 82,  tab: 'renkler', russian: 'зелёный',   pronunciation: 'zilyonıy',  turkish: 'yeşil',   english: 'green',  color: '#22c55e' },
  { id: 83,  tab: 'renkler', russian: 'жёлтый',    pronunciation: 'joltıy',    turkish: 'sarı',    english: 'yellow', color: '#eab308' },
  { id: 84,  tab: 'renkler', russian: 'чёрный',    pronunciation: 'chornıy',   turkish: 'siyah',   english: 'black',  color: '#171717' },
  { id: 85,  tab: 'renkler', russian: 'белый',     pronunciation: 'byelıy',    turkish: 'beyaz',   english: 'white',  color: '#f5f5f5' },
  { id: 86,  tab: 'renkler', russian: 'оранжевый', pronunciation: 'aranjivıy', turkish: 'turuncu', english: 'orange', color: '#f97316' },
  { id: 87,  tab: 'renkler', russian: 'розовый',   pronunciation: 'rozovıy',   turkish: 'pembe',   english: 'pink',   color: '#ec4899' },

  // ===== FİİLLER =====
  { id: 20,  tab: 'fiiller', russian: 'говорить',  pronunciation: 'gavarit',   turkish: 'konuşmak',              english: 'to speak',          example: 'Я *говорю* по-русски',          exampleTranslation: 'I speak Russian' },
  { id: 21,  tab: 'fiiller', russian: 'понимать',  pronunciation: 'panimat',   turkish: 'anlamak',               english: 'to understand',     example: 'Я *понимаю* тебя',              exampleTranslation: 'I understand you' },
  { id: 22,  tab: 'fiiller', russian: 'хотеть',    pronunciation: 'hatyét',    turkish: 'istemek',               english: 'to want',           example: 'Я *хочу* кофе',                exampleTranslation: 'I want coffee' },
  { id: 23,  tab: 'fiiller', russian: 'есть',      pronunciation: 'yest',      turkish: 'yemek',                 english: 'to eat',            example: 'Я *ем* завтрак',               exampleTranslation: 'I am eating breakfast' },
  { id: 24,  tab: 'fiiller', russian: 'пить',      pronunciation: 'pit',       turkish: 'içmek',                 english: 'to drink',          example: 'Я *пью* воду',                 exampleTranslation: 'I am drinking water' },
  { id: 25,  tab: 'fiiller', russian: 'идти',      pronunciation: 'idti',      turkish: 'gitmek (yürüyerek)',    english: 'to go (on foot)',   example: 'Я *иду* домой',                exampleTranslation: 'I am going home' },
  { id: 26,  tab: 'fiiller', russian: 'любить',    pronunciation: 'lyubit',    turkish: 'sevmek',                english: 'to love/like',      example: 'Я *люблю* музыку',             exampleTranslation: 'I love music' },
  { id: 27,  tab: 'fiiller', russian: 'знать',     pronunciation: 'znat',      turkish: 'bilmek',                english: 'to know',           example: 'Я *знаю* это',                 exampleTranslation: 'I know this' },
  { id: 28,  tab: 'fiiller', russian: 'читать',    pronunciation: 'chitat',    turkish: 'okumak',                english: 'to read',           example: 'Я *читаю* книгу',              exampleTranslation: 'I am reading a book' },
  { id: 29,  tab: 'fiiller', russian: 'писать',    pronunciation: 'pisat',     turkish: 'yazmak',                english: 'to write',          example: 'Я *пишу* письмо',              exampleTranslation: 'I am writing a letter' },
  { id: 30,  tab: 'fiiller', russian: 'работать',  pronunciation: 'rabotat',   turkish: 'çalışmak',              english: 'to work',           example: 'Я *работаю* дома',             exampleTranslation: 'I work from home' },
  { id: 31,  tab: 'fiiller', russian: 'жить',      pronunciation: 'zhit',      turkish: 'yaşamak',               english: 'to live',           example: 'Я *живу* в Москве',            exampleTranslation: 'I live in Moscow' },
  { id: 32,  tab: 'fiiller', russian: 'делать',    pronunciation: 'delat',     turkish: 'yapmak',                english: 'to do/make',        example: 'Что ты *делаешь*?',            exampleTranslation: 'What are you doing?' },
  { id: 33,  tab: 'fiiller', russian: 'видеть',    pronunciation: 'videt',     turkish: 'görmek',                english: 'to see',            example: 'Я *вижу* тебя',                exampleTranslation: 'I see you' },
  { id: 34,  tab: 'fiiller', russian: 'слышать',   pronunciation: 'slıshat',   turkish: 'duymak',                english: 'to hear',           example: 'Я *слышу* музыку',             exampleTranslation: 'I hear music' },
  { id: 35,  tab: 'fiiller', russian: 'думать',    pronunciation: 'dumat',     turkish: 'düşünmek',              english: 'to think',          example: 'Я *думаю* о тебе',             exampleTranslation: 'I am thinking about you' },
  { id: 36,  tab: 'fiiller', russian: 'спать',     pronunciation: 'spat',      turkish: 'uyumak',                english: 'to sleep',          example: 'Я хочу *спать*',               exampleTranslation: 'I want to sleep' },
  { id: 37,  tab: 'fiiller', russian: 'помогать',  pronunciation: 'pamagat',   turkish: 'yardım etmek',          english: 'to help',           example: '*Помоги* мне, пожалуйста',      exampleTranslation: 'Help me, please' },
  { id: 38,  tab: 'fiiller', russian: 'учить',     pronunciation: 'uchit',     turkish: 'öğrenmek/öğretmek',    english: 'to learn/teach',    example: 'Я *учу* русский язык',          exampleTranslation: 'I am learning Russian' },
  { id: 39,  tab: 'fiiller', russian: 'покупать',  pronunciation: 'pakupat',   turkish: 'satın almak',           english: 'to buy',            example: 'Я *покупаю* хлеб',             exampleTranslation: 'I am buying bread' },
  { id: 300, tab: 'fiiller', russian: 'продавать', pronunciation: 'pradavat',  turkish: 'satmak',                english: 'to sell',           example: 'Он *продаёт* машину',          exampleTranslation: 'He is selling a car' },
  { id: 301, tab: 'fiiller', russian: 'ехать',     pronunciation: 'yehat',     turkish: 'gitmek (araçla)',       english: 'to go (by transport)', example: 'Я *еду* на работу',          exampleTranslation: 'I am going to work' },
  { id: 302, tab: 'fiiller', russian: 'ждать',     pronunciation: 'zhdat',     turkish: 'beklemek',              english: 'to wait',           example: 'Я *жду* тебя',                 exampleTranslation: 'I am waiting for you' },
  { id: 304, tab: 'fiiller', russian: 'смотреть',  pronunciation: 'smatryet',  turkish: 'izlemek/bakmak',        english: 'to watch/look',     example: 'Я *смотрю* фильм',             exampleTranslation: 'I am watching a movie' },
  { id: 305, tab: 'fiiller', russian: 'слушать',   pronunciation: 'slushat',   turkish: 'dinlemek',              english: 'to listen',         example: 'Я *слушаю* музыку',            exampleTranslation: 'I am listening to music' },
  { id: 306, tab: 'fiiller', russian: 'готовить',  pronunciation: 'gatovit',   turkish: 'yemek yapmak',          english: 'to cook',           example: 'Она *готовит* ужин',           exampleTranslation: 'She is cooking dinner' },
  { id: 309, tab: 'fiiller', russian: 'брать',     pronunciation: 'brat',      turkish: 'almak',                 english: 'to take',           example: 'Я *беру* это',                 exampleTranslation: 'I am taking this' },
  { id: 310, tab: 'fiiller', russian: 'давать',    pronunciation: 'davat',     turkish: 'vermek',                english: 'to give',           example: '*Дайте* мне воду',             exampleTranslation: 'Give me water' },
  { id: 311, tab: 'fiiller', russian: 'находить',  pronunciation: 'nahadit',   turkish: 'bulmak',                english: 'to find',           example: 'Я не могу *найти* ключи',       exampleTranslation: 'I cannot find my keys' },
  { id: 312, tab: 'fiiller', russian: 'мочь',      pronunciation: 'moch',      turkish: 'yapabilmek',            english: 'to be able/can',    example: 'Я *могу* помочь',              exampleTranslation: 'I can help' },
]

export function getRussianByTab(tabId) {
  return russianPhrases.filter((p) => p.tab === tabId)
}
