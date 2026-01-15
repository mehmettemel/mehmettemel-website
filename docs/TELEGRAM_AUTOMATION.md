# Telegram Otomasyonu - Detaylı Dokümantasyon

## İçindekiler
1. [Genel Bakış](#genel-bakış)
2. [Sistem Mimarisi](#sistem-mimarisi)
3. [Telegram Bot Kurulumu](#telegram-bot-kurulumu)
4. [Komutlar ve Kullanım](#komutlar-ve-kullanım)
5. [AI Kategorilendirme](#ai-kategorilendirme)
6. [Veritabanı İşlemleri](#veritabanı-i̇şlemleri)
7. [İki Entegrasyon Yöntemi](#i̇ki-entegrasyon-yöntemi)
8. [Hata Yönetimi](#hata-yönetimi)
9. [Güvenlik](#güvenlik)

---

## Genel Bakış

Telegram otomasyonu, blog içeriği ve cache öğelerini Telegram üzerinden hızlı bir şekilde eklemenizi sağlar. Her mesaj otomatik olarak AI ile kategorilendirilerek doğru yere kaydedilir.

### Özellikler
- ✅ **13 Komut Desteği**: /link, /quote, /video, /kitap, /cache-* vb.
- ✅ **AI Kategorilendirme**: Gemini AI ile otomatik kategori tespiti
- ✅ **Çoklu Not Desteği**: Video ve kitap notları için toplu ekleme
- ✅ **Otomatik URL Algılama**: Mesajdaki URL'leri otomatik olarak link olarak algılar
- ✅ **User Filtreleme**: Sadece yetkili kullanıcılar komut gönderebilir
- ✅ **Hata Yönetimi**: Detaylı hata mesajları ve fallback mekanizması
- ✅ **İstatistikler**: /stats komutu ile özet bilgi

---

## Sistem Mimarisi

```
┌──────────────────────────────────────────────────────────┐
│              TELEGRAM OTOMASYON AKIŞI                     │
└──────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
    ┌─────────────────────┐  ┌─────────────────────┐
    │  Option 1: Direct   │  │ Option 2: Google    │
    │  Next.js Webhook    │  │   Apps Script       │
    └──────────┬──────────┘  └──────────┬──────────┘
               │                        │
               ▼                        ▼
    ┌─────────────────────────────────────────────┐
    │  /api/telegram/webhook (518 satır)          │
    │  - parseMessage()                           │
    │  - handleCommand()                          │
    │  - sendTelegramMessage()                    │
    └──────────────────┬──────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
    ┌────────┐   ┌─────────┐   ┌─────────┐
    │ Notes  │   │  Cache  │   │  Stats  │
    │ (AI)   │   │ (Basit) │   │  (DB)   │
    └────┬───┘   └────┬────┘   └────┬────┘
         │            │             │
         ▼            ▼             ▼
    ┌─────────────────────────────────────┐
    │      Neon PostgreSQL Database       │
    │  - notes (AI kategorili)            │
    │  - cache_items (basit)              │
    └─────────────────────────────────────┘
                       │
                       ▼
            Website (ISR 60s)
```

---

## Telegram Bot Kurulumu

### Adım 1: Bot Oluşturma

1. **Telegram'da @BotFather'ı aç**
   - Telegram'da @BotFather'ı ara
   - `/newbot` komutunu gönder

2. **Bot bilgilerini gir**
   ```
   /newbot

   Alright, a new bot. How are we going to call it?
   > Mehmet Blog Bot

   Good. Now let's choose a username for your bot.
   > mehmetblog_bot

   Done! Congratulations on your new bot.
   ```

3. **Bot Token'ı kaydet**
   ```
   Use this token to access the HTTP API:
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz123456789
   ```

### Adım 2: User ID Öğrenme

1. **@userinfobot'u aç**
   - Telegram'da @userinfobot'u ara
   - Herhangi bir mesaj gönder

2. **User ID'ni kaydet**
   ```
   Your user ID: 123456789
   ```

### Adım 3: Environment Variables

`.env.local` dosyasına ekle:
```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz123456789
TELEGRAM_ALLOWED_USER_IDS=123456789,987654321  # Virgülle ayır
```

### Adım 4: Webhook Ayarlama

#### Yerel Geliştirme (ngrok ile):
```bash
# 1. ngrok başlat
ngrok http 3000

# 2. Webhook ayarla
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://YOUR_NGROK_URL.ngrok.io/api/telegram/webhook"

# 3. Webhook'u kontrol et
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

#### Production (Vercel/Domain ile):
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://mehmettemel.com/api/telegram/webhook"
```

#### Webhook'u Kaldırma:
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/deleteWebhook"
```

---

## Komutlar ve Kullanım

### 1. Link Ekleme

**Komut:** `/link [URL]`

**Örnek:**
```
/link https://waitbutwhy.com/2015/01/artificial-intelligence.html
```

**İşlem Akışı:**
```javascript
// 1. Telegram webhook alır
{
  message: {
    text: "/link https://waitbutwhy.com/...",
    from: { id: 123456789 }
  }
}

// 2. parseMessage() komutu ayıklar
{
  command: 'link',
  text: 'https://waitbutwhy.com/...',
  isLinkCommand: true
}

// 3. handleLink() Gemini AI'yi çağırır
const categorizedData = await handleLink(url)
// {
//   title: "The AI Revolution: Road to Superintelligence",
//   description: "Deep dive into artificial intelligence...",
//   category: "teknik",
//   url: "https://waitbutwhy.com/..."
// }

// 4. createNote() ile veritabanına kayıt
const note = await createNote({
  note_type: 'link',
  category: categorizedData.category,
  title: categorizedData.title,
  text: categorizedData.description,
  url: categorizedData.url
})

// 5. Telegram'a başarı mesajı
"✅ Link eklendi
🏷️ Kategori: Teknik
📝 Başlık: The AI Revolution..."
```

**AI Kategorileri:**
- `teknik` - Yazılım, teknoloji, programlama
- `icelik` - Sağlık, beslenme, içerik
- `diger` - Diğer konular

### 2. Alıntı/Quote Ekleme

**Komutlar:** `/quote [metin]` veya `/alinti [metin]`

**Örnekler:**
```
/quote The dose makes the poison - Paracelsus

/alinti Akıllı insan konuşacağı zamanı bilir, bilge insan ise susacağı zamanı bilir.
```

**İşlem Akışı:**
```javascript
// 1. parseMessage()
{
  command: 'quote',
  text: 'The dose makes the poison - Paracelsus',
  isNoteCommand: true
}

// 2. handleNote() Gemini AI'yi çağırır
const categorizedData = await handleNote(text)
// {
//   text: "The dose makes the poison",
//   author: "Paracelsus",
//   category: "saglik",
//   source: null
// }

// 3. Veritabanına kayıt
const note = await createNote({
  note_type: 'quote',
  category: 'saglik',
  text: categorizedData.text,
  author: categorizedData.author
})

// 4. Yanıt
"✅ Alıntı eklendi
🏷️ Kategori: Sağlık
✍️ Yazar: Paracelsus"
```

**AI Kategorileri:**
- `kisisel` - Kişisel gelişim, motivasyon
- `saglik` - Sağlık, tıp, fitness
- `gida` - Yemek, beslenme
- `seyahat` - Seyahat, keşif
- `genel` - Diğer

### 3. Video Notları (Çoklu Destek)

**Komut:** `/video [metin]`

**Tek Not Örneği:**
```
/video Tim Urban: The mind of a procrastinator - Procrastination is driven by instant gratification
```

**Çoklu Not Örneği:**
```
/video
1. Huberman Lab: Sleep Toolkit - 10-30 minutes of morning sunlight
2. Veritasium: The Science of Thinking - Cognitive biases affect decision making
3. Lex Fridman: AI Podcast - GPT models use transformer architecture
```

**İşlem Akışı:**
```javascript
// 1. handleVideo() çoklu notları ayıklar
const categorizedData = await handleVideo(text)
// [
//   {
//     text: "10-30 minutes of morning sunlight",
//     source: "Huberman Lab: Sleep Toolkit",
//     category: "youtube"
//   },
//   {
//     text: "Cognitive biases affect decision making",
//     source: "Veritasium: The Science of Thinking",
//     category: "documentary"
//   },
//   ...
// ]

// 2. Her notu ayrı ayrı kaydet
for (const noteData of categorizedData) {
  await createNote({
    note_type: 'video',
    category: noteData.category,
    text: noteData.text,
    source: noteData.source
  })
}

// 3. Yanıt
"✅ 3 video notu eklendi
🏷️ Kategoriler: youtube, documentary, youtube
📝 İlk not: 10-30 minutes of..."
```

**AI Kategorileri:**
- `youtube` - YouTube videoları
- `documentary` - Belgeseller
- `course` - Kurslar, eğitimler
- `podcast` - Podcast'ler

### 4. Kitap Notları (Çoklu Destek)

**Komut:** `/kitap [metin]`

**Tek Not Örneği:**
```
/kitap Atomic Habits by James Clear - Habit stacking: pair new habit with existing one
```

**Çoklu Not Örneği:**
```
/kitap
1. Atomic Habits - James Clear - 1% better every day compounds over time
2. Deep Work - Cal Newport - Shallow work prevents deep thinking
3. The Power of Now - Eckhart Tolle - Present moment is all we have
```

**İşlem Akışı:**
```javascript
// handleBook() benzer şekilde çoklu destek
const categorizedData = await handleBook(text)
// [
//   {
//     text: "1% better every day compounds over time",
//     author: "James Clear",
//     source: "Atomic Habits",
//     category: "selfhelp"
//   },
//   ...
// ]
```

**AI Kategorileri:**
- `science` - Bilim, araştırma
- `selfhelp` - Kişisel gelişim
- `biography` - Biyografi
- `fiction` - Kurgu
- `health` - Sağlık, fitness

### 5. Cache Komutları

**Komutlar:**
- `/cache-kitap [isim]` - Kitap ekle
- `/cache-film [isim]` - Film/dizi ekle
- `/cache-urun [isim]` - Ürün ekle

**Örnekler:**
```
/cache-kitap Atomic Habits
/cache-film Inception
/cache-urun Sony WH-1000XM5 Kulaklık
```

**İşlem Akışı:**
```javascript
// Cache için AI kullanılmaz, direkt kayıt
const data = await handleCacheItem(type, text)
// { name: 'Atomic Habits', type: 'kitap' }

const item = await createCacheItem({
  name: data.name,
  cache_type: data.type
})

// Yanıt
"✅ Kitap eklendi: Atomic Habits"
```

### 6. Yardım Komutu

**Komut:** `/help`

**Yanıt:**
```
🤖 Blog Bot Komutları

📝 Not Komutları:
/link [url] - Link ekle
/quote [metin] - Alıntı ekle
/alinti [metin] - Türkçe alıntı
/video [metin] - Video notu (çoklu)
/kitap [metin] - Kitap notu (çoklu)

📚 Cache Komutları:
/cache-kitap [isim] - Kitap ekle
/cache-film [isim] - Film ekle
/cache-urun [isim] - Ürün ekle

📊 Diğer:
/stats - İstatistikler
/help - Bu mesaj

💡 İpucu: Video ve kitap notları için
çoklu ekleme yapabilirsiniz.
```

### 7. İstatistikler Komutu

**Komut:** `/stats`

**Yanıt:**
```
📊 İstatistikler

📝 Notlar:
• Link: 45
• Alıntı: 32
• Video: 28
• Kitap: 19
━━━━━━━━━━━
Toplam: 124

📚 Cache:
• Kitap: 12 (5 tamamlandı)
• Film: 8 (3 tamamlandı)
• Ürün: 6 (2 tamamlandı)
━━━━━━━━━━━
Toplam: 26 (10 tamamlandı)
```

---

## AI Kategorilendirme

### Gemini AI Entegrasyonu

**Dosya:** `/src/lib/gemini.js` (440 satır)

### 1. handleLink(url)

**Amaç:** URL'den başlık, açıklama ve kategori çıkar

**Prompt:**
```javascript
const prompt = `
Analyze this URL and categorize it:
${url}

Categories:
- teknik: Software, tech, programming
- icelik: Health, nutrition, science
- diger: Other topics

Return JSON:
{
  "title": "extracted title",
  "description": "brief description",
  "category": "teknik|icelik|diger",
  "url": "${url}"
}
`
```

**Örnek Yanıt:**
```json
{
  "title": "The AI Revolution: Road to Superintelligence",
  "description": "Comprehensive exploration of artificial intelligence development",
  "category": "teknik",
  "url": "https://waitbutwhy.com/..."
}
```

### 2. handleNote(text)

**Amaç:** Alıntı/not metnini kategorize et, yazar/kaynak ayıkla

**Prompt:**
```javascript
const prompt = `
Analyze this note/quote:
"${text}"

Categories:
- kisisel: Personal development
- saglik: Health, medicine
- gida: Food, nutrition
- seyahat: Travel
- genel: General

Extract author if mentioned (e.g., "- Einstein", "by Newton")

Return JSON:
{
  "text": "cleaned quote text",
  "author": "author name or null",
  "source": "source if mentioned or null",
  "category": "category"
}
`
```

**Örnek Yanıt:**
```json
{
  "text": "The dose makes the poison",
  "author": "Paracelsus",
  "source": null,
  "category": "saglik"
}
```

### 3. handleVideo(text)

**Amaç:** Çoklu video notlarını ayıkla ve kategorize et

**Çoklu Not Desteği:** ✅

**Prompt:**
```javascript
const prompt = `
Parse video notes from this text:
"${text}"

Supports multiple notes in formats:
1. Video Title - Note
2. Another Video - Another Note

Categories:
- youtube: YouTube videos
- documentary: Documentaries
- course: Courses
- podcast: Podcasts

Return JSON array:
[
  {
    "text": "note text",
    "source": "video title/source",
    "category": "category"
  },
  ...
]
`
```

**Örnek Yanıt:**
```json
[
  {
    "text": "10-30 minutes of morning sunlight improves sleep",
    "source": "Huberman Lab: Sleep Toolkit",
    "category": "youtube"
  },
  {
    "text": "Cognitive biases affect decision making",
    "source": "Veritasium: The Science of Thinking",
    "category": "documentary"
  }
]
```

### 4. handleBook(text)

**Amaç:** Çoklu kitap notlarını ayıkla ve kategorize et

**Çoklu Not Desteği:** ✅

**Kategoriler:**
- `science` - Bilim
- `selfhelp` - Kişisel gelişim
- `biography` - Biyografi
- `fiction` - Kurgu
- `health` - Sağlık

### 5. Retry Logic

**Hata Durumları:**
- `503` - Service temporarily overloaded
- `429` - Resource exhausted
- Network errors

**Retry Stratejisi:**
```javascript
export async function callGemini(prompt, retries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      })

      if (response.ok) {
        return await response.json()
      }

      // Retry koşulları
      if (response.status === 503 || response.status === 429) {
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt))
          continue
        }
      }

      throw new Error(`Gemini API error: ${response.status}`)

    } catch (error) {
      if (attempt === retries) throw error
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }
}
```

**Backoff:**
- 1. deneme: 2 saniye bekle
- 2. deneme: 4 saniye bekle
- 3. deneme: 6 saniye bekle

---

## Veritabanı İşlemleri

### createNote(data)

```javascript
export async function createNote(noteData) {
  const {
    note_type,    // 'link', 'quote', 'video', 'book'
    category,     // AI'dan gelen kategori
    title,        // Sadece link için
    text,         // Not metni
    author,       // Yazar (varsa)
    source,       // Kaynak (varsa)
    url,          // URL (link için)
    tags          // Etiketler (opsiyonel)
  } = noteData

  const result = await sql`
    INSERT INTO notes (
      note_type, category, title, text,
      author, source, url, tags,
      created_at, updated_at
    )
    VALUES (
      ${note_type}, ${category}, ${title || null}, ${text},
      ${author || null}, ${source || null}, ${url || null}, ${tags || []},
      NOW(), NOW()
    )
    RETURNING *
  `

  return result[0]
}
```

### createCacheItem(data)

```javascript
export async function createCacheItem(data) {
  const { name, cache_type } = data

  const result = await sql`
    INSERT INTO cache_items (name, cache_type, created_at, updated_at)
    VALUES (${name}, ${cache_type}, NOW(), NOW())
    RETURNING *
  `

  return result[0]
}
```

### getStats()

```javascript
export async function getStats() {
  // Not istatistikleri
  const noteStats = await sql`
    SELECT note_type, COUNT(*) as count
    FROM notes
    GROUP BY note_type
  `

  // Cache istatistikleri
  const cacheStats = await sql`
    SELECT
      cache_type,
      COUNT(*) as total,
      SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) as completed
    FROM cache_items
    GROUP BY cache_type
  `

  return {
    notes: noteStats,
    cache: cacheStats
  }
}
```

---

## İki Entegrasyon Yöntemi

### Option 1: Next.js Direct Webhook (Önerilen)

**Dosya:** `/src/app/api/telegram/webhook/route.js`

**Avantajlar:**
- ✅ Direkt entegrasyon (aracı yok)
- ✅ Tek codebase
- ✅ Kolay debug
- ✅ Hızlı yanıt

**Dezavantajlar:**
- ❌ Deployment gerekli (ngrok ile geliştirme)
- ❌ Webhook URL değişirse güncelleme gerekli

**Kullanım:**
```bash
# 1. Environment variables ayarla
TELEGRAM_BOT_TOKEN=...
TELEGRAM_ALLOWED_USER_IDS=...

# 2. Deploy et (Vercel)
vercel --prod

# 3. Webhook ayarla
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://yourdomain.com/api/telegram/webhook"
```

### Option 2: Google Apps Script (Alternatif)

**Dosya:** `/scripts/telegram-bot-updated.gs`

**Avantajlar:**
- ✅ Deploy gerektirmez
- ✅ Free hosting (Google)
- ✅ Kolay test

**Dezavantajlar:**
- ❌ Ayrı kod tabanı
- ❌ Debug zor
- ❌ Quota limitleri

**Kurulum:**

1. **Google Apps Script'e git**
   - [script.google.com](https://script.google.com)

2. **Yeni proje oluştur**
   - "New Project" > "telegram-bot"

3. **Kodu kopyala**
   ```javascript
   // scripts/telegram-bot-updated.gs dosyasından kopyala
   ```

4. **Script Properties ayarla**
   - Project Settings > Script Properties
   ```
   TELEGRAM_BOT_TOKEN=...
   API_URL=https://mehmettemel.com/api/kesifler/add
   GEMINI_API_KEY=...
   ```

5. **Deploy et**
   - Deploy > New Deployment
   - Type: Web App
   - Execute as: Me
   - Who has access: Anyone

6. **Webhook ayarla**
   ```bash
   curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook?url=<APPS_SCRIPT_URL>"
   ```

---

## Hata Yönetimi

### 1. User Authorization Hatası

```javascript
// Yetkisiz kullanıcı
if (!ALLOWED_USER_IDS.includes(userId)) {
  return new Response(JSON.stringify({
    ok: true,
    message: 'Unauthorized user'
  }), {
    status: 200,  // Telegram için 200 döndür
    headers: { 'Content-Type': 'application/json' }
  })
}
```

**Telegram'a mesaj gönderilmez** (sessizce reddedilir)

### 2. AI Hatası

```javascript
try {
  const categorizedData = await handleLink(url)
} catch (aiError) {
  // Fallback: Kategori yok, basic bilgi
  const fallbackData = {
    title: 'Link',
    description: url,
    category: 'diger',
    url: url
  }

  // Log hata
  console.error('AI categorization failed:', aiError)

  // Devam et
  await createNote({
    note_type: 'link',
    ...fallbackData
  })
}
```

### 3. Database Hatası

```javascript
try {
  await createNote(data)
} catch (dbError) {
  // Telegram'a hata mesajı gönder
  await sendTelegramMessage(
    chatId,
    `❌ Veritabanı hatası: ${dbError.message}`
  )

  // 200 döndür (Telegram için)
  return new Response(JSON.stringify({ ok: true }), {
    status: 200
  })
}
```

### 4. Fallback Mesajlaşma

```javascript
async function sendTelegramMessageWithFallback(chatId, message, parseMode = 'Markdown') {
  try {
    // İlk dene: Markdown ile
    return await sendTelegramMessage(chatId, message, parseMode)
  } catch (error) {
    // Markdown hatası varsa, plain text dene
    console.warn('Markdown failed, trying plain text')
    return await sendTelegramMessage(chatId, message, null)
  }
}
```

### 5. Komut Hatası

```javascript
// Bilinmeyen komut
if (!validCommands.includes(command)) {
  await sendTelegramMessage(
    chatId,
    `❌ Geçersiz komut: /${command}\n\n` +
    `Yardım için /help yazın.`
  )
  return
}
```

### 6. Format Hatası

```javascript
// URL eksik
if (command === 'link' && !isValidURL(text)) {
  await sendTelegramMessage(
    chatId,
    `❌ Geçerli bir URL giriniz.\n\n` +
    `Örnek: /link https://example.com`
  )
  return
}
```

---

## Güvenlik

### 1. User ID Filtreleme

```javascript
const ALLOWED_USER_IDS = process.env.TELEGRAM_ALLOWED_USER_IDS
  .split(',')
  .map(id => parseInt(id.trim()))

// Her mesajda kontrol
if (!ALLOWED_USER_IDS.includes(message.from.id)) {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200  // Telegram'a başarılı dön (sessizce reddet)
  })
}
```

### 2. Environment Variables

```env
# ASLA commit etme!
TELEGRAM_BOT_TOKEN=...        # Gizli
GEMINI_API_KEY=...            # Gizli
DATABASE_URL=...              # Gizli
```

### 3. SQL Injection Koruması

```javascript
// ✅ Güvenli (parametrize)
await sql`
  INSERT INTO notes (note_type, text)
  VALUES (${noteType}, ${text})
`

// ❌ Güvensiz (KULLANMA!)
await sql.unsafe(`
  INSERT INTO notes (note_type, text)
  VALUES ('${noteType}', '${text}')
`)
```

### 4. Rate Limiting (Planlandı)

```javascript
// TODO: Implement rate limiting
// Örnek: Max 10 komut/dakika per user
```

### 5. Webhook Validation (Planlandı)

```javascript
// TODO: Telegram webhook secret validation
// X-Telegram-Bot-Api-Secret-Token header'ı kontrol et
```

---

## Monitoring ve Logging

### 1. Console Logging

```javascript
// Başarılı işlemler
console.log(`[Telegram] User ${userId} sent /${command}`)
console.log(`[AI] Categorized as: ${category}`)
console.log(`[DB] Note created: ID ${note.id}`)

// Hatalar
console.error(`[Error] AI categorization failed:`, error)
console.error(`[Error] Database error:`, dbError)
```

### 2. Database Logging (Opsiyonel)

```sql
CREATE TABLE telegram_messages_log (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  username VARCHAR(100),
  command VARCHAR(50),
  text TEXT,
  success BOOLEAN,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

```javascript
// Her mesajı logla
await sql`
  INSERT INTO telegram_messages_log
    (user_id, username, command, text, success, error_message)
  VALUES
    (${userId}, ${username}, ${command}, ${text}, ${success}, ${error})
`
```

---

## Troubleshooting

### Sorun 1: Bot yanıt vermiyor
**Çözümler:**
1. Webhook doğru ayarlandı mı kontrol et:
   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
   ```
2. User ID yetkili mi kontrol et
3. Server loglarına bak
4. ngrok çalışıyor mu (dev mode)

### Sorun 2: AI kategorilendirme hatası
**Çözümler:**
1. Gemini API key'i doğru mu?
2. API quota doldu mu?
3. Fallback mekanizması çalıştı mı?

### Sorun 3: Database hatası
**Çözümler:**
1. DATABASE_URL doğru mu?
2. Tablo şemaları oluşturuldu mu?
3. Connection pooling problemi var mı?

### Sorun 4: Çoklu not eklenmiyor
**Çözümler:**
1. Format doğru mu? (numaralı liste)
2. AI array döndürdü mü? (log kontrol et)
3. Loop içinde hata oluştu mu?

---

## İlgili Dosyalar

### Ana Dosyalar:
- `/src/app/api/telegram/webhook/route.js` - Ana webhook (518 satır)
- `/src/lib/gemini.js` - AI kategorilendirme (440 satır)
- `/src/lib/db.js` - Database fonksiyonları (369 satır)

### Scripts:
- `/scripts/telegram-bot-updated.gs` - Google Apps Script alternatif

### Database:
- `/scripts/init-db.sql` - Notes tablo şeması
- `/scripts/create-cache-table.sql` - Cache tablo şeması

---

## Gelecek Geliştirmeler

### Planlanan Özellikler:
- [ ] Webhook secret validation
- [ ] Rate limiting (10 komut/dakika)
- [ ] Mesaj logging (database)
- [ ] Inline keyboard desteği
- [ ] Öğe düzenleme/silme komutları
- [ ] /search komutu
- [ ] /recent komutu (son eklenenler)
- [ ] Batch import (CSV, JSON)
- [ ] Foto desteği (OCR ile metin çıkarma)

---

**Son Güncelleme:** 15 Ocak 2026
