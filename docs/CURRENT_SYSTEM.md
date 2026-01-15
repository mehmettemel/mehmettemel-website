# 📋 Güncel Sistem Durumu (v2.0.0)

## ✅ Aktif Sistem

### Telegram Entegrasyonu
- **Yöntem:** Direkt Vercel Webhook
- **URL:** `https://mehmettemel.com/api/telegram/webhook`
- **Durum:** ✅ Aktif
- **Google Apps Script:** ❌ Kapatıldı (Artık kullanılmıyor)

### Komutlar

#### Cache Komutları (AI ile)
| Komut | Açıklama | Gider | AI Özelliği |
|-------|----------|-------|-------------|
| `/k [isim]` | Kitap ekle | `/cache/kitap` | Yazar bulur |
| `/f [isim]` | Film/dizi ekle | `/cache/film` | Yönetmen bulur |
| `/u [isim]` | Ürün ekle | `/cache/urun` | Marka bulur |

#### Keşifler Komutları (AI ile)
| Komut | Açıklama | Gider | AI Özelliği |
|-------|----------|-------|-------------|
| `/l [url]` | Link ekle | `/kesifler` | Kategori bulur |
| `/a [metin]` | Alıntı ekle | `/kesifler` | Kategori bulur |
| `/v [metin]` | Video notu | `/kesifler` | Kategori bulur |
| `/b [metin]` | Kitap notu | `/kesifler` | Kategori bulur |

### Legacy Komutlar (Hala Çalışıyor)
- `/link` → `/l`
- `/quote` → `/a`
- `/video` → `/v`
- `/book` → `/b`
- `/cache-kitap` → `/k`
- `/cache-film` → `/f`
- `/cache-urun` → `/u`

---

## 🗄️ Database Schema

### cache_items
```sql
CREATE TABLE cache_items (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  cache_type VARCHAR(20) NOT NULL CHECK (cache_type IN ('kitap', 'film', 'urun')),
  author VARCHAR(200),           -- ✅ YENİ: AI ile bulunur
  is_completed BOOLEAN DEFAULT FALSE,
  is_liked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_liked_requires_completed
    CHECK (is_liked = FALSE OR is_completed = TRUE)
);
```

### notes
```sql
CREATE TABLE notes (
  id BIGSERIAL PRIMARY KEY,
  note_type VARCHAR(20) NOT NULL CHECK (note_type IN ('link', 'quote', 'video', 'book')),
  category VARCHAR(50) NOT NULL,
  title VARCHAR(500),
  text TEXT NOT NULL,
  author VARCHAR(200),
  source VARCHAR(500),
  url TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔧 Environment Variables

### Vercel'de Tanımlı Olmalı
```env
TELEGRAM_BOT_TOKEN=7981023592:AAEDSOotOiyQXA4hLTEhBO7xwqcekYe0QYI
TELEGRAM_ALLOWED_USER_IDS=<YOUR_USER_ID>
GEMINI_API_KEY=<YOUR_GEMINI_KEY>
DATABASE_URL=<NEON_URL>
```

---

## 🎯 Akışlar

### Cache Akışı
```
Telegram: /k Zero to One
    ↓
parseMessage() → type: 'cache-kitap'
    ↓
handleCacheItemWithAI() → Gemini AI çağırır
    ↓
AI Response: {name: "Zero to One", author: "Peter Thiel"}
    ↓
createCacheItem() → cache_items tablosuna INSERT
    ↓
Telegram: "✅ Kitap eklendi! Zero to One | Peter Thiel"
    ↓
Web: /cache/kitap sayfasında görünür
```

### Keşifler Akışı
```
Telegram: /l https://example.com
    ↓
parseMessage() → type: 'link'
    ↓
handleLink() → Gemini AI çağırır
    ↓
AI Response: {title: "...", category: "teknik", ...}
    ↓
createNote() → notes tablosuna INSERT
    ↓
Telegram: "✅ Link eklendi! Kategori: teknik"
    ↓
Web: /kesifler sayfasında görünür
```

---

## 🐛 Bilinen Sorunlar ve Çözümler

### ✅ ÇÖZÜLDÜ: `/k` komutu quote'lara gidiyordu
**Neden:** Google Apps Script hala aktifti
**Çözüm:** Google Apps Script kapatıldı, direkt Vercel webhook kullanılıyor

### ✅ ÇÖZÜLDÜ: Checkbox toggle hatası
**Neden:** Eski Neon SQL syntax kullanımı
**Çözüm:** `sql(field)` yerine conditional queries kullanılıyor

### ✅ ÇÖZÜLDÜ: Author field kaydedilmiyordu
**Neden:** `createCacheItem()` author field'ini eklemiyor
**Çözüm:** INSERT query'e `author` field'i eklendi

---

## 📊 API Endpoints

### GET `/api/telegram/webhook`
Health check ve version kontrolü

**Response:**
```json
{
  "status": "ok",
  "version": "2.0.0-cache-fix",
  "botConfigured": true,
  "userFilterEnabled": true,
  "allowedUsers": 1,
  "commandsParsed": ["/k", "/f", "/u", "/l", "/a", "/v", "/b"]
}
```

### POST `/api/telegram/webhook`
Telegram mesajlarını işler

### PATCH `/api/cache/[id]/toggle`
Checkbox durumunu değiştirir

**Request:**
```json
{
  "field": "is_completed"  // veya "is_liked"
}
```

---

## 🔍 Debug

### Webhook Version Kontrolü
```bash
curl https://mehmettemel.com/api/telegram/webhook
```

Beklenen: `"version": "2.0.0-cache-fix"`

### Telegram Webhook Kontrolü
```bash
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
```

Beklenen: `"url": "https://mehmettemel.com/api/telegram/webhook"`

### Vercel Logs
1. Vercel Dashboard
2. Functions → `/api/telegram/webhook`
3. Logs (real-time)

---

## 📝 Değişiklik Geçmişi

### v2.0.0 (15 Ocak 2026)
- ✅ Kısa komutlar eklendi: /k, /f, /u, /l, /a, /v, /b
- ✅ Google Apps Script kapatıldı
- ✅ Direkt Vercel webhook kullanımı
- ✅ AI ile otomatik author bulma
- ✅ SQL syntax Neon'un yeni API'sine uyarlandı
- ✅ Detaylı debug logları eklendi

### v1.0.0 (Önceki)
- ❌ Uzun komutlar: /cache-kitap, /link, /quote, vb.
- ❌ Google Apps Script kullanımı
- ❌ Manuel author girişi

---

**Son Güncelleme:** 15 Ocak 2026
