# 🚀 Telegram Bot - Hızlı Başlangıç

## ⚡ Kısa Komutlar (Yeni!)

### 📚 CACHE (Okuma/İzleme/Alışveriş Listesi)
AI otomatik yazar/yönetmen/marka bulur:

```bash
/k [isim]   # Kitap ekle (AI yazar bulur)
/f [isim]   # Film/dizi ekle (AI yönetmen bulur)
/u [isim]   # Ürün ekle (AI marka bulur)
```

**Örnekler:**
```
/k zero to one
→ ✅ Kitap: Zero to One | Yazar: Peter Thiel

/f inception
→ ✅ Film: Inception | Yönetmen: Christopher Nolan

/u iphone 15 pro
→ ✅ Ürün: iPhone 15 Pro | Marka: Apple
```

---

### 📝 KEŞİFLER (Notlar/İçerik)
AI ile kategorize edilir:

```bash
/l [url]     # Link ekle
/a [metin]   # Alıntı ekle
/v [metin]   # Video notu ekle
/b [metin]   # Kitap notu ekle
```

**Örnekler:**
```
/l https://waitbutwhy.com
→ ✅ Link eklendi | Kategori: teknik

/a Tutarlılık başarının anahtarıdır
→ ✅ Alıntı eklendi | Kategori: kisisel

/v Huberman Lab: 10-30 min morning sunlight
→ ✅ Video notu eklendi | Kategori: youtube

/b Focus is the ultimate skill
→ ✅ Kitap notu eklendi | Kategori: selfhelp
```

---

## 📊 Diğer Komutlar

```bash
/stats  # İstatistikler
/help   # Yardım menüsü
```

---

## 🎯 Nereye Gider?

### Cache Komutları → `/cache/` sayfaları
- `/k` → `/cache/kitap`
- `/f` → `/cache/film`
- `/u` → `/cache/urun`

Web'de checkbox'larla durumunu takip et:
- ☐ Tamamlandı
- ❤️ Beğendim (sadece tamamlananlarda aktif)

### Keşifler Komutları → `/kesifler` sayfası
- `/l`, `/a`, `/v`, `/b` → `/kesifler`

AI ile kategorilendirilerek not sistemi sayfasında görünür.

---

## 🔥 En Çok Kullanılan

```bash
# Hızlı kitap ekleme
/k sapiens
/k atomic habits
/k deep work

# Hızlı film ekleme
/f breaking bad
/f the office
/f dark

# Hızlı link ekleme
/l https://paulgraham.com/articles.html

# Hızlı alıntı
/a Bu harika bir fikir
```

---

## 💡 İpuçları

1. **AI otomatik çalışır** - Sadece isim yaz, yazar/yönetmen/marka AI bulur
2. **Boşluk önemli** - `/k Zero` ✅ `/kZero` ❌
3. **URL otomatik** - Direkt URL gönder, otomatik link olur
4. **Küçük harf OK** - `/k zero to one` da çalışır

---

## 🐛 Çalışmıyorsa

1. **Webhook kontrolü:**
   ```bash
   curl https://mehmettemel.com/api/telegram/webhook
   ```
   `"version": "2.0.0-cache-fix"` görmeli

2. **Vercel logs:**
   - Vercel Dashboard → Functions → `/api/telegram/webhook` → Logs
   - Mesaj gönderince logları kontrol et

3. **Bot token kontrolü:**
   - Vercel env vars: `TELEGRAM_BOT_TOKEN` var mı?

---

## 📱 Telegram'da /help

Telegram'da `/help` yazarak tüm komutları görebilirsin.

---

**Son Güncelleme:** 15 Ocak 2026 | v2.0.0
