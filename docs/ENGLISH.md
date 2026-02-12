# İngilizce Dil Öğrenme Sistemi

## Genel Bakış

Bu modül, İngilizce kelimeleri Türkçe karşılıkları ve örnek cümlelerle birlikte sunan interaktif bir öğrenme aracıdır. Telegram bot ile dinamik olarak kelime ekleme özelliği vardır.

## Dosya Yapısı

```
src/
├── data/
│   └── english.js             # Helper fonksiyonlar
├── app/
│   └── listeler/
│       └── ingilizce/
│           ├── page.jsx              # İngilizce sayfası (server component)
│           └── EnglishPageClient.jsx # Client component
├── components/
│   └── english/
│       └── EnglishCard.jsx    # Kelime kartı komponenti
└── lib/
    ├── db.js                  # Database fonksiyonları
    └── gemini.js              # AI entegrasyonu

scripts/
└── create-english-words-table.sql  # Database şeması
```

## Veri Yapısı

### Database Şeması (`english_words`)

```sql
CREATE TABLE english_words (
  id SERIAL PRIMARY KEY,
  english VARCHAR(200) NOT NULL,           -- İngilizce kelime
  turkish VARCHAR(200) NOT NULL,           -- Türkçe karşılığı
  example TEXT NOT NULL,                   -- İngilizcede örnek cümle
  example_turkish TEXT,                    -- Örnek cümlenin Türkçe çevirisi
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
```

### Kelime Objesi

```javascript
{
  id: 1,
  english: 'serendipity',
  turkish: 'mutlu tesadüf, beklenmedik keşif',
  example: 'Meeting my best friend was pure serendipity.',
  example_turkish: 'En iyi arkadaşımla tanışmam tam bir mutlu tesadüftü.',
  created_at: '2026-02-12T...',
  updated_at: '2026-02-12T...'
}
```

## Telegram Bot Entegrasyonu

### Komut

`.i [kelime]` - İngilizce kelime ekle

**Örnekler:**

```bash
.i serendipity
.i resilient
.i ambiguous
.i procrastinate
```

### AI İşleme

Gemini AI otomatik olarak şunları bulur:

1. **Türkçe karşılık** - Kelimenin Türkçe anlamı
2. **Örnek cümle** - İngilizce örnek kullanım cümlesi (kelime vurgulanır)
3. **Örnek çeviri** - Örnek cümlenin Türkçe çevirisi (opsiyonel)

### AI Prompt Yapısı

```javascript
handleEnglishWord(word)
→ Gemini AI prompt:
  - English word: "serendipity"
  - Find Turkish translation
  - Create practical example sentence
  - Provide Turkish translation of example
→ Returns:
  {
    english: "serendipity",
    turkish: "mutlu tesadüf, beklenmedik keşif",
    example: "Meeting my best friend was pure serendipity.",
    example_turkish: "En iyi arkadaşımla tanışmam tam bir mutlu tesadüftü."
  }
```

## Sayfa Özellikleri

### `/listeler/ingilizce`

**ISR:** 60 saniye cache (`export const revalidate = 60`)

**Özellikler:**

1. **Rastgele Kelime Gösterme:** Veritabanından rastgele kelime seçer
2. **Kelime Kartı:**
   - İngilizce kelime (büyük font)
   - Türkçe karşılık
   - Örnek cümle (kelime highlight edilir)
   - Örnek cümlenin Türkçe çevirisi
3. **Info Tooltip:** Hover/click ile detaylı bilgi
4. **Responsive Design:** Mobil ve desktop uyumlu

## ✨ Floating Widget Sistemi (YENİ!)

### Genel Bakış

Tüm sayfalarda otomatik olarak görünen dil öğrenme widget'ları:

- **🇬🇧 İngilizce Widget** - Sol alt köşe
- **🇷🇺 Rusça Widget** - Sağ alt köşe

### Özellikler

**Otomatik Rotasyon:**
- Her 20 saniyede bir yeni kelime/cümle
- Rastgele seçim
- Kesintisiz çalışma

**İki Görünüm Modu:**

1. **Compact (Normal):**
   - Width: 192px (48 rem)
   - Sadece kelime + Türkçe karşılık
   - Minimal, sade görünüm

2. **Expanded (Hover):**
   - Width: 320-384px (80-96 rem)
   - Tam bilgi:
     - İngilizce: Örnek cümle + Türkçe çeviri (kelime vurgulanır)
     - Rusça: Okunuş + İngilizce + Türkçe + örnek cümle + renk önizleme (renkler için)
   - Smooth animasyon (500ms)

**Tasarım:**
- Light mode: Temiz beyaz background, iyi kontrast
- Dark mode: Gradient background, backdrop blur
- Border & shadow effects
- Hover indicator (alt çizgi)
- Responsive (mobil uyumlu)

### Teknik Detaylar

**İngilizce Widget:**
```
Position: fixed bottom-6 left-6
Border: blue-200/60 (light) | blue-500/30 (dark)
Background: white/95 (light) | gradient blue-950→slate-900 (dark)
Highlight: blue-700 (light) | blue-400 (dark)
```

**Rusça Widget:**
```
Position: fixed bottom-6 right-6
Border: rose-200/60 (light) | red-500/30 (dark)
Background: white/95 (light) | gradient red-950→slate-900 (dark)
Highlight: rose-700 (light) | red-400 (dark)
```

### API Endpoint

**`GET /api/english-words`**
- Client-side'da widget için kullanılır
- Tüm İngilizce kelimeleri döner
- Cache: None (her seferinde fresh data)

### Custom Hooks

**`useEnglishWords()`**
- İngilizce kelime yönetimi
- 20 saniyede bir otomatik güncelleme
- Returns: `{ currentWord, loading }`

**`useRussianPhrases()`**
- Rusça cümle yönetimi
- 20 saniyede bir otomatik güncelleme
- Returns: `{ currentPhrase }`

### Bileşenler

**`EnglishFloatingWidget.jsx`**
- Sol alt köşe widget
- Mavi tema
- Kelime + örnek + çeviri

**`RussianFloatingWidget.jsx`**
- Sağ alt köşe widget
- Kırmızı tema
- Cümle + okunuş + çeviriler + örnek

### Global Entegrasyon

Widget'lar `src/components/Layout.jsx` içinde global olarak eklendi:
```jsx
<Layout>
  {children}
  <EnglishFloatingWidget />
  <RussianFloatingWidget />
</Layout>
```

Bu sayede her sayfada otomatik görünürler.

## Database Fonksiyonları

### createEnglishWord(data)

```javascript
await createEnglishWord({
  english: 'serendipity',
  turkish: 'mutlu tesadüf',
  example: 'Meeting my best friend was pure serendipity.',
  example_turkish: 'En iyi arkadaşımla tanışmam tam bir mutlu tesadüftü.',
})
```

### getEnglishWords()

```javascript
// Tüm kelimeleri getir (en yeni önce)
const words = await getEnglishWords()
```

### searchEnglishWord(word)

```javascript
// Belirli bir kelimeyi ara (case insensitive)
const word = await searchEnglishWord('serendipity')
```

### getEnglishWordById(id)

```javascript
// ID ile kelime getir
const word = await getEnglishWordById(123)
```

### getEnglishWordStats()

```javascript
// İstatistik
const stats = await getEnglishWordStats()
// { total: 50 }
```

## Helper Fonksiyonlar (`src/data/english.js`)

### getRandomEnglishWord(words)

```javascript
// Array'den rastgele kelime seç
const randomWord = getRandomEnglishWord(words)
```

### formatExampleWithHighlight(example, word)

```javascript
// Örnek cümledeki kelimeyi vurgula
const formatted = formatExampleWithHighlight(
  'Meeting my best friend was pure serendipity.',
  'serendipity',
)
// Returns:
// {
//   parts: [
//     { text: 'Meeting my best friend was pure ', highlighted: false },
//     { text: 'serendipity', highlighted: true },
//     { text: '.', highlighted: false }
//   ]
// }
```

## UI Bileşenleri

### EnglishCard

Kelime kartı komponenti. Tooltip ile detaylı bilgi gösterir.

**Props:**

```javascript
<EnglishCard word={wordObject} />
```

**Özellikler:**

- Hover/click ile info icon görünür
- Tooltip'te tam bilgi
- Örnek cümlede kelime bold + primary color ile vurgulanır
- Responsive tasarım

## Kullanım Örnekleri

### Telegram Bot ile Kelime Ekleme

```
Kullanıcı: .i serendipity

Bot: ⏳ Not işleniyor...

Bot: ✅ 🇬🇧 İngilizce kelime eklendi!

📝 serendipity
🇹🇷 mutlu tesadüf, beklenmedik keşif

💬 Örnek:
Meeting my best friend was pure serendipity.
🇹🇷 En iyi arkadaşımla tanışmam tam bir mutlu tesadüftü.

ID: 1

🔗 Kelimeye buradan ulaşabilirsiniz:
mehmettemel.com/listeler/ingilizce
```

### Web Sayfasında Görüntüleme

1. Kullanıcı `/listeler/ingilizce` sayfasına gider
2. Rastgele kelime otomatik gösterilir
3. "🔄" butonuna basarak yeni rastgele kelime getirir
4. Kartın üzerinde hover ile info icon görünür
5. Info icon'a tıklayarak tooltip ile detaylı bilgi görür

## Database Migration

### İlk Kurulum

```bash
# Database tablosunu oluştur
psql $DATABASE_URL -f scripts/create-english-words-table.sql
```

### Vercel'e Deploy Sonrası

```bash
# Webhook'u test et
curl https://mehmettemel.com/api/telegram/webhook

# Telegram'da test et
.i serendipity
```

## Özellikler

### ✅ Tamamlananlar

- ✅ Database şeması (`english_words` tablosu)
- ✅ Telegram bot entegrasyonu (`.i` komutu)
- ✅ Gemini AI ile otomatik çeviri ve örnek cümle
- ✅ Web sayfası (`/listeler/ingilizce`)
- ✅ Rastgele kelime gösterme
- ✅ Responsive UI
- ✅ Navbar entegrasyonu
- ✅ Info tooltip
- ✅ **Floating Widget Sistemi** (12 Şubat 2026)
  - ✅ Tüm sayfalarda otomatik gösterim
  - ✅ 20 saniyede bir otomatik rotasyon
  - ✅ Hover ile genişleme
  - ✅ Light/Dark mode desteği
  - ✅ İngilizce (sol alt) + Rusça (sağ alt)
  - ✅ Smooth animasyonlar
  - ✅ Mobil uyumlu

### 🚧 Gelecek Özellikler (Potansiyel)

- ⏳ Kategori sistemi (İsim, fiil, sıfat, vs.)
- ⏳ Zorluk seviyesi (A1, A2, B1, B2, C1, C2)
- ⏳ Favorilere ekleme
- ⏳ Kelime sınavı/test modu
- ⏳ Progress tracking
- ⏳ Audio pronunciation (TTS)
- ⏳ Widget'ları kapatma/açma toggle
- ⏳ Widget pozisyon özelleştirme

## Karşılaştırma: Rusça vs İngilizce Sistemi

| Özellik            | Rusça Sistemi                      | İngilizce Sistemi                    |
| ------------------ | ---------------------------------- | ------------------------------------ |
| Veri Kaynağı       | Static data (src/data/russian.js)  | Database (PostgreSQL)                |
| Veri Ekleme        | Manuel (kod ile)                   | Telegram bot (`.i` komutu)           |
| AI Entegrasyonu    | ❌ Yok                              | ✅ Gemini AI (çeviri + örnek)        |
| Kategoriler        | 5 kategori (cümle, fiil, isim, vs.)| Yok (gelecekte eklenebilir)          |
| Örnek Cümleler     | Manuel yazılmış                    | AI tarafından oluşturulan            |
| Highlight Özelliği | Fiiller için * işareti ile         | AI örneğinde kelime vurgulanır       |
| Update Frequency   | Manuel (deploy gerekli)            | Dinamik (Telegram ile anlık)         |
| ISR                | Client-side (static)               | Server-side (60s cache)              |

## Navigasyon

- **URL:** `/listeler/ingilizce`
- **Navbar:** Listeler → İngilizce 🇬🇧
- **Sitemap:** Dahil edildi

## Sistem Gereksinimleri

- **Database:** PostgreSQL (Neon)
- **AI:** Gemini API
- **Telegram:** Bot token ve user ID
- **Next.js:** 14+ (App Router, ISR)

## Environment Variables

```env
DATABASE_URL=...
GEMINI_API_KEY=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_ALLOWED_USER_IDS=...
```

---

**Versiyon:** v1.0.0 - İngilizce Öğrenme Sistemi
**Oluşturulma:** 12 Şubat 2026
**Son Güncelleme:** 12 Şubat 2026
