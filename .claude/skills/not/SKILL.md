---
name: not
description: Kısa not, alıntı veya bilgi eklemek için kullanılır. /not komutu ile tetiklenir. Notları analiz edip src/data/personal/ altındaki doğru dosya ve kategoriye yerleştirir.
---

# Not Ekle

Kullanıcı bir not, alıntı veya bilgi verdiğinde içeriği analiz edip `src/data/personal/` altındaki doğru JS dosyasına ve kategoriye ekler.

## Tetikleme

- Kullanıcı `/not` komutu kullandığında

## Dosya ve Kategori Belirleme

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

1. Hedef dosyayı oku
2. İçerikten dosya ve alt kategori belirle
3. İlgili kategorinin `items` dizisinin sonuna notu ekle
4. Kullanıcıya kısa onay ver: "Eklendi: [dosya] → [kategori]"

## Metin Temizleme

- Gereksiz prefix'leri kaldır (`>not`, `/not` vb.)
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

## Örnek

Kullanıcı: `/not Sabah güneşine 10 dk çıkmak sirkadyen ritmi düzenler - Huberman`

→ `src/data/personal/saglik.js` → **Temel Sağlık** kategorisine ekle:
```js
{ text: 'Sabah güneşine 10 dk çıkmak sirkadyen ritmi düzenler. (Huberman)', subItems: [] },
```

Yanıt: "Eklendi: saglik.js → Temel Sağlık"
