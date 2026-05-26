---
name: not
description: Kısa not, alıntı veya bilgi eklemek için kullanılır. /not komutu ile tetiklenir. Notları analiz edip src/data/personal/ altındaki doğru dosya ve kategoriye yerleştirir.
---

# Not Ekle

Kullanıcı bir not, alıntı veya bilgi verdiğinde içeriği analiz edip `src/data/personal/` altındaki doğru JS dosyasına ve kategoriye ekler.

## Tetikleme

- Kullanıcı `/not` komutu kullandığında

## Kategori İpucu Tespiti (Öncelikli)

Kullanıcı notla birlikte bir kategori ipucu vermişse (üst veya alt kategori adı), o ipucunu kullanarak hedefi belirle. İpucu örnekleri:

- `/not money: dropshipping'de en önemli şey ürün seçimi` → money.js → E-Commerce
- `/not marketing sosyal medyada organik büyüme...` → money.js → Marketing
- `/not sağlık vitamin D eksikliği...` → saglik.js → Takviyeler
- `/not beslenme aç karnına su içmek...` → saglik.js → Beslenme
- `/not finance borsa yatırımı...` → money.js → Finance
- `/not ilişkiler networking etkinlikleri...` → iliskiler.js → Networking
- `/not mindset cesaret olmadan...` → kisisel-gelisim.js → Mindset

İpucu tespiti kuralları:
1. Notun başında veya içinde dosya/kategori adı geçiyorsa (money, marketing, finance, sağlık, beslenme vb.) → o hedefi kullan
2. İpucu üst kategori ise (money, sağlık, ilişkiler) → içeriğe göre alt kategoriyi belirle
3. İpucu alt kategori ise (marketing, finance, beslenme, takviyeler) → hangi üst kategoriye ait olduğunu bul
4. İpucu bulunamazsa → içerik analizine geç (aşağıdaki harita)

## Dosya ve Kategori Haritası

Notun içeriğine göre **önce dosyayı**, sonra **alt kategoriyi** belirle:

### `src/data/personal/saglik.js` → Sağlık
- **Temel Sağlık**: Uyku, nefes, stres, genel sağlık prensipleri, fiziksel aktivite, egzersiz, spor
- **Beslenme**: Yeme-içme alışkanlıkları, besin değerleri, gıda kalitesi, sebze-meyve-et-yağ bilgileri, tarım ilaçları
- **Mutfak**: Pişirme teknikleri, gıda güvenliği, restoran tavsiyeleri
- **Takviyeler**: Vitamin, mineral, supplement, kreatin, magnezyum, omega-3
- **Bakım**: Cilt, saç, diş, güneş kremi, egzema
- **Hastalıklar**: İç sağlık, hastalıklar, hastane sistemi, insülin direnci

### `src/data/personal/kisisel-gelisim.js` → Kişisel Gelişim
- **İş & Kariyer**: İş, girişimcilik, startup, kariyer, maaş, verimlilik, liderlik
- **Mindset**: Kişisel gelişim, motivasyon, cesaret, alışkanlıklar, özgüven, iletişim becerileri, retorik
- **Hayat Felsefesi**: Hayat dersleri, yaşam prensipleri, aile, ebeveynlik, ilişki tavsiyeleri (genel)

### `src/data/personal/iliskiler.js` → İlişkiler
- **Kadınlar**: Kadın-erkek ilişkileri, flört, evlilik
- **İletişim**: İkna, müzakere, beden dili, konuşma teknikleri, güven oluşturma, çatışma yönetimi
- **Networking**: Sosyal ağ kurma, ilişki yönetimi, networking stratejileri

### `src/data/personal/toplum.js` → Toplum & Dünya
- **Toplum & Dünya**: Tarih, politika, felsefe, ekonomi, toplum, medeniyet, güç dinamikleri

### `src/data/personal/money.js` → Money
- **E-Commerce**: E-ticaret, online satış, dropshipping, marketplace, ürün satışı, Shopify, Amazon
- **Marketing**: Pazarlama, reklam, sosyal medya stratejisi, growth hacking, SEO, içerik pazarlama, marka
- **Finance**: Yatırım, borsa, kripto, bütçe, tasarruf, finansal okuryazarlık, gelir-gider
- **Ideas**: İş fikirleri, girişim fırsatları, yan gelir, niş alanlar, SaaS, ürün fikirleri

### `src/data/personal/quotes.js` → Quotes
- **Quotes**: Kısa, ilham verici sözler ve alıntılar (1-2 cümle, özlü)

### `src/data/personal/ai.js` → AI
- **AI Agents & Workflow**, **Prompting & Kullanım**, **Modeller & Teknoloji**, **Araçlar & Ürünler**, **Sektör & Trendler**

## Ekleme Formatı

### saglik.js için (subItems destekler):
```js
{ text: 'Not metni burada', subItems: [] },
```
İlgili kategori objesinin `items` dizisinin **sonuna** ekle.

### Diğer tüm dosyalar için (flat string):
```js
'Not metni burada',
```
İlgili kategori objesinin `items` dizisinin **sonuna** ekle.

## Ekleme Adımları

1. Kategori ipucu var mı kontrol et (üst/alt kategori adı geçiyor mu)
2. İpucu varsa → hedefi belirle, ipucu metnini nottan çıkar
3. İpucu yoksa → içerik analiziyle dosya ve alt kategori belirle
4. Hedef dosyayı oku
5. İlgili kategorinin `items` dizisinin sonuna notu ekle
6. Kullanıcıya kısa onay ver: "Eklendi: [dosya] → [kategori]"

## Metin Temizleme

- Gereksiz prefix'leri kaldır (`>not`, `/not`, kategori ipuçları vb.)
- Gereksiz boşlukları temizle
- Metin olduğu gibi korunsun, yeniden yazma veya özetleme
- Single quote'ları escape et (`'` → `\'`)

## Yazar/Kaynak Tespiti

- Metnin sonunda "- İsim" veya "(İsim)" varsa → yazarı metnin sonuna " — Yazar" olarak ekle (quotes.js için)
- saglik.js'de author field yok, yazar bilgisini metnin içinde bırak

## Kısa Söz mü Uzun Not mu?

- 1-2 cümlelik, ilham verici, özlü bir söz → `quotes.js`
- Pratik bilgi, tavsiye, detaylı açıklama → ilgili konu dosyası

## Birden Fazla Not

Her notu ayrı ayrı doğru dosya ve kategoriye ekle.

## Örnekler

**Kategori ipucu ile:**
Kullanıcı: `/not marketing Organik büyüme için tutarlı içerik üretmek şart`
→ `src/data/personal/money.js` → **Marketing**
```js
'Organik büyüme için tutarlı içerik üretmek şart',
```
Yanıt: "Eklendi: money.js → Marketing"

**İçerik analiziyle:**
Kullanıcı: `/not Sabah güneşine 10 dk çıkmak sirkadyen ritmi düzenler - Huberman`
→ `src/data/personal/saglik.js` → **Temel Sağlık**
```js
{ text: 'Sabah güneşine 10 dk çıkmak sirkadyen ritmi düzenler. (Huberman)', subItems: [] },
```
Yanıt: "Eklendi: saglik.js → Temel Sağlık"

**Üst kategori ipucu ile:**
Kullanıcı: `/not money Amazon FBA'da private label en kârlı model`
→ `src/data/personal/money.js` → **E-Commerce**
```js
'Amazon FBA\'da private label en kârlı model',
```
Yanıt: "Eklendi: money.js → E-Commerce"
