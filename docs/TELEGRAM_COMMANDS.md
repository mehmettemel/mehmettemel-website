# Telegram Bot Komutları

## 🎯 Komut Yapısı

### 📚 CACHE (Okuma/İzleme/Alışveriş Listesi)
AI otomatik olarak yazar/yönetmen/marka bulur ve ekler.

| Komut | Açıklama | Örnek | AI Bulacağı |
|-------|----------|-------|-------------|
| `/k [isim]` | Kitap ekle | `/k zero to one` | Yazar: Peter Thiel |
| `/f [isim]` | Film/dizi ekle | `/f inception` | Yönetmen: Christopher Nolan |
| `/u [isim]` | Ürün ekle | `/u iphone 15 pro` | Marka: Apple |

**Gider:** `cache_items` tablosu → `/cache/kitap`, `/cache/film`, `/cache/urun` sayfaları

---

### 📝 KEŞİFLER (Notlar/İçerik)
AI ile kategorize edilir ve notes tablosuna eklenir.

| Komut | Açıklama | Örnek | Kategori |
|-------|----------|-------|----------|
| `/l [url]` | Link ekle | `/l https://example.com` | teknik/icelik/diger |
| `/a [metin]` | Alıntı ekle | `/a Tutarlılık başarının anahtarı` | kisisel/saglik/gida/... |
| `/v [metin]` | Video notu ekle | `/v Huberman Lab: Sleep tips` | youtube/documentary/... |
| `/b [metin]` | Kitap notu ekle | `/b Focus is everything` | science/selfhelp/... |

**Gider:** `notes` tablosu → `/kesifler` sayfası

---

## 📊 Test Senaryoları

### ✅ Test 1: Cache Kitap
```
/k Zero to One
```
**Beklenen:**
- ✅ `cache_items` tablosuna eklenir
- ✅ AI ile "Peter Thiel" bulunur
- ✅ `/cache/kitap` sayfasında görünür
- ❌ `/kesifler` sayfasında GÖRÜNMEZ

**Log:**
```
[parseMessage] Input text: /k Zero to One
[parseMessage] Matched: /k → cache-kitap
[Telegram] Parsed result: { type: 'cache-kitap', content: 'Zero to One' }
[AI Cache] Enriched cache item: { name: 'Zero to One', author: 'Peter Thiel' }
```

---

### ✅ Test 2: Cache Film
```
/f Inception
```
**Beklenen:**
- ✅ `cache_items` tablosuna eklenir
- ✅ AI ile "Christopher Nolan" bulunur
- ✅ `/cache/film` sayfasında görünür

---

### ✅ Test 3: Keşifler Link
```
/l https://waitbutwhy.com
```
**Beklenen:**
- ✅ `notes` tablosuna eklenir (note_type: 'link')
- ✅ AI ile kategori bulunur
- ✅ `/kesifler` sayfasında görünür
- ❌ Cache sayfalarında GÖRÜNMEZ

---

### ✅ Test 4: Keşifler Alıntı
```
/a Tutarlılık başarının anahtarıdır
```
**Beklenen:**
- ✅ `notes` tablosuna eklenir (note_type: 'quote')
- ✅ AI ile kategori bulunur
- ✅ `/kesifler` sayfasında görünür

---

### ✅ Test 5: Keşifler Video
```
/v Huberman Lab: 10-30 minutes morning sunlight improves sleep
```
**Beklenen:**
- ✅ `notes` tablosuna eklenir (note_type: 'video')
- ✅ Çoklu not desteği varsa array olarak parse edilir

---

### ✅ Test 6: Keşifler Kitap Notu
```
/b Consistency is the key to success - James Clear
```
**Beklenen:**
- ✅ `notes` tablosuna eklenir (note_type: 'book')
- ✅ Yazar: James Clear
- ✅ `/kesifler` sayfasında görünür

---

## 🔍 Debug Log Formatı

Her komut için göreceğiniz loglar:

```
[parseMessage] Input text: <komut + içerik>
[parseMessage] Matched: <komut> → <type>
[Telegram] Parsed result: { type: '<type>', content: '<içerik>' }
```

**Cache için:**
```
[AI Cache] Enriched cache item: { name: '...', author: '...', cache_type: '...' }
```

**Keşifler için:**
```
[AI] Categorized: { category: '...', ... }
```

---

## ⚠️ Yaygın Hatalar

### Hata 1: Cache komutu alıntılara gidiyor
**Neden:** `/k` yanlış parse ediliyor
**Çözüm:** Log'larda `[parseMessage] Matched: /k → cache-kitap` görmeli
**Eğer görmüyorsan:** parseMessage fonksiyonu doğru çalışmıyor

### Hata 2: AI yazar bulmuyor
**Neden:** Gemini API hatası veya quota dolmuş
**Çözüm:** Fallback çalışır, yazar null olarak eklenir

### Hata 3: Komut tanınmıyor
**Neden:** Boşluk eksik (örn: `/kZero` yerine `/k Zero`)
**Çözüm:** Komut ve içerik arasında boşluk olmalı

---

## 🔄 Legacy Komutlar (Backward Compatibility)

Eski komutlar hala çalışır:
- `/link` → `/l`
- `/quote` → `/a`
- `/alinti` → `/a`
- `/video` → `/v`
- `/book` → `/b`
- `/cache-kitap` → `/k`
- `/cache-film` → `/f`
- `/cache-urun` → `/u`

---

## 📈 Database Schema

### cache_items (Cache Sistemi)
```sql
id | name | cache_type | author | is_completed | is_liked | created_at
1  | Zero to One | kitap | Peter Thiel | false | false | 2026-01-15
```

### notes (Keşifler Sistemi)
```sql
id | note_type | category | title | text | author | source | created_at
1  | link | teknik | AI Revolution | ... | null | null | 2026-01-15
2  | quote | kisisel | Consistency... | ... | James Clear | null | 2026-01-15
```

---

**Son Güncelleme:** 15 Ocak 2026
