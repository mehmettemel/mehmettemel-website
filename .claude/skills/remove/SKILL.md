---
name: remove
description: Sitedeki herhangi bir içeriği (not, kart, kayıt, madde) veri dosyasından kaldırmak için kullanılır. /remove komutu ile tetiklenir. "dev:<id>" gibi bir referans ya da serbest metin alır, doğru veri dosyasını bulur, kaydı siler ve doğrular.
---

# İçerik Kaldır

Kullanıcı `/remove` ile bir referans ya da metin verdiğinde, site verisinden
ilgili kaydı bulur ve SİLER. Bileşenlere dokunmaz, yalnızca `src/data/` altını
düzenler.

## Adım 1: Referans Çözümleme

İki giriş biçimi var:

**a) Prefix'li referans** — kesin hedef, arama gerekmez:

| Prefix | Dosya | Kayıt |
|---|---|---|
| `dev:<id>` | `src/data/development.js` | `notes` içinde `id` eşleşen obje |
| `food:<id>` | `src/data/food-notes.js` | `nodes` içinde `id` eşleşen obje + o id'ye dokunan TÜM `links` |
| `roadmap:<id>` | `src/data/roadmap.js` | ağaçta `id` eşleşen düğüm (alt düğümleriyle birlikte) |
| `watchlist:<başlık>` | `src/data/watchlist.js` | `entries` içinde `title` eşleşen obje |

**b) Serbest metin** — kullanıcı bir başlık, cümle parçası ya da konu verir.
`src/data/` altında ara (grep), eşleşen kaydı bul. Aday dosyalar:

- `development.js`, `food-notes.js`, `roadmap.js`, `watchlist.js`, `books.js`
- `recipes.js`, `russian.js`, `english-words.js`, `life-tips.js`
- `girisimcilik.js`, `w2b.json`, `daily-routines.js`
- `personal/` altındakiler: `saglik.js`, `quotes.js`, `trivia.js`, `toplum.js`,
  `kisisel-gelisim.js`, `iliskiler.js`, `money.js`
- `travel/` altındakiler: `countries.js`, `informations.js`

## Adım 2: Eşleşme Kuralları

- **Tek eşleşme** → direkt sil, onay sorma.
- **Birden fazla eşleşme** → listele, hangisi olduğunu sor. Tahminle silme.
- **Eşleşme yok** → "bulunamadı" de, en yakın 2-3 adayı göster.

Serbest metin ararken: önce tam ifade, bulunamazsa anahtar kelimelerle ara.
Türkçe karakter varyasyonlarını dene (kullanıcı "cors" yazar, kayıtta "CORS").

## Adım 3: Silme

Dosya formatına göre kaydı KOMPLE kaldır:

- **Obje dizisi** (development, recipes, watchlist, food nodes): objeyi
  virgülüyle birlikte sil. Kalan dizi geçerli JS olmalı.
- **String dizisi** (quotes, trivia, life-tips items): satırı sil.
- **food-notes**: node silinince `links` içinde `source` YA DA `target` olarak
  o id'yi taşıyan tüm satırları da sil — sarkan referans bırakma.
- **roadmap**: düğüm alt ağacıyla gider. Kullanıcıya localStorage notu düş:
  silinen id'lerin işaretleri tarayıcıda öksüz kalır, zararsızdır.
- **w2b.json**: JSON geçerliliğini koru; kategori boş kalırsa kategoriyi de
  silmeyi ÖNER ama sorma, sadece bildir ve bırak.

## Adım 4: Doğrulama

Her silme sonrası zorunlu:

```bash
node --check <dosya>          # .js dosyaları
python3 -m json.tool <dosya>  # .json dosyaları
```

food-notes silmesinde ek olarak: kalan `links` içinde silinen id geçmediğini
grep ile doğrula.

## Sınırlar

- Bileşen, sayfa, skill dosyası SİLME — bu skill yalnızca veri kayıtları için.
  Kullanıcı sayfa/bileşen kaldırmak istiyorsa bunu normal iş olarak yap, skill
  kapsamı dışında olduğunu söylemene gerek yok.
- Bir seferde birden çok referans gelebilir (`/remove dev:a dev:b`) — hepsini
  tek geçişte sil.
- Silinen içeriği kısaca göster (başlık + ilk cümle) ki kullanıcı yanlış
  silmeyi commit'ten önce fark edebilsin. Commit ATMA — kullanıcı "pushla"
  deyince zaten toplu gider.

## Onay Formatı

```
Silindi: [dosya] → [başlık/id]
```

Birden çoksa her biri ayrı satır. Bağlantı temizliği olduysa
(`food-notes`): "n bağlantı da kaldırıldı" ekle.
