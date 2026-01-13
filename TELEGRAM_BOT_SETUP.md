# Telegram Bot + Neon DB Kurulum Rehberi

Bu rehber, Telegram bot entegrasyonu ve Neon DB sistemini kurmak için gereken adımları içerir.

## ✅ Tamamlanan İşlemler

- ✅ Tüm gerekli paketler kuruldu (@neondatabase/serverless, slugify, @octokit/rest)
- ✅ Database şeması oluşturuldu (scripts/init-db.sql)
- ✅ Database client hazır (src/lib/db.js)
- ✅ GitHub entegrasyonu hazır (src/lib/github.js)
- ✅ Gemini AI fonksiyonları hazır (src/lib/gemini.js)
- ✅ API endpoint'leri oluşturuldu
- ✅ Frontend async Server Component'e dönüştürüldü
- ✅ Migration script'i hazır

## 🚀 Kurulum Adımları

### 1. Neon Database Kurulumu

#### 1.1. Neon Hesabı Oluştur
- https://neon.tech adresine git
- Ücretsiz hesap oluştur
- Yeni bir project oluştur

#### 1.2. Database Oluştur
- Neon dashboard'da "Create Database" butonuna tıkla
- Database adı: `kesifler` (veya istediğin bir isim)
- Region: US East (Ohio) veya en yakın region

#### 1.3. Connection String'i Al
- Database detaylarından "Connection String" bölümünü bul
- PostgreSQL connection string'i kopyala
- Şu formatta olacak:
  ```
  postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
  ```

#### 1.4. Database Şemasını Oluştur
- Neon Console'da SQL Editor'ü aç
- `scripts/init-db.sql` dosyasının içeriğini kopyala ve çalıştır
- Veya terminalden:
  ```bash
  psql "postgresql://..." -f scripts/init-db.sql
  ```

### 2. Telegram Bot Kurulumu

#### 2.1. Bot Oluştur
1. Telegram'da @BotFather'ı bul ve başlat
2. `/newbot` komutunu gönder
3. Bot adı ver (örn: "Keşifler Bot")
4. Bot username ver (örn: "mehmettemel_kesifler_bot")
5. BotFather sana bir token verecek:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

#### 2.2. Bot Ayarları
```bash
# Bot komutlarını ayarla
/setcommands

# Ardından şunu gönder:
link - Link ekle
quote - Alıntı/not ekle
video - Video notu ekle
book - Kitap notu ekle
stats - İstatistikler
help - Yardım
```

#### 2.3. Telegram User ID'ni Bul
- Telegram'da @userinfobot'u başlat
- Bot sana user ID'ni verecek (örn: 123456789)

### 3. Environment Variables Ekle

`.env.local` dosyanıza şu değişkenleri ekleyin:

```bash
# Mevcut değişkenler (zaten var)
GEMINI_API_KEY=your_existing_gemini_key
GITHUB_TOKEN=your_existing_github_token
GITHUB_REPO=mehmettemel/mehmettemel-blog
GITHUB_BRANCH=main

# YENİ - Telegram Bot
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_ALLOWED_USER_IDS=123456789,987654321  # Virgülle ayırarak birden fazla ekleyebilirsiniz

# YENİ - Neon Database
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

### 4. Test Etme (Local)

#### 4.1. Development Server'ı Başlat
```bash
npm run dev
```

#### 4.2. Database Bağlantısını Test Et
Tarayıcıda: http://localhost:3000/api/notes/list?type=link

Boş array dönmesi normal:
```json
{
  "notes": [],
  "total": 0,
  "page": 1,
  "limit": 12,
  "totalPages": 0
}
```

### 5. Migration Çalıştır

Mevcut kesifler.js'deki verileri DB'ye taşı:

```bash
# Önce backup al
cp src/data/kesifler.js src/data/kesifler.backup.js

# Migration'ı çalıştır
node scripts/migrate-kesifler.js
```

Output şöyle olmalı:
```
🚀 Starting migration from kesifler.js to Neon DB + GitHub...
📂 Loading data from kesifler.js...
📊 Data summary:
   Links: 2
   Quotes: 4
   Videos: 0
   Books: 0
   Total: 6

📎 Migrating 2 links...
  ✓ Created note #123: UI Skills
    → GitHub: notes/linkler/teknik/ui-skills-123.md
  ...

✨ Migration complete!
```

### 6. Production'a Deploy

#### 6.1. Vercel'e Environment Variables Ekle
1. Vercel Dashboard'a git
2. Project Settings → Environment Variables
3. Tüm yeni environment variable'ları ekle:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_ALLOWED_USER_IDS`
   - `DATABASE_URL`

#### 6.2. Deploy Et
```bash
git add .
git commit -m "feat: add Telegram bot + Neon DB integration"
git push origin main
```

#### 6.3. Telegram Webhook'u Ayarla

Deploy tamamlandıktan sonra:

```bash
# Production URL ile webhook'u set et
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourdomain.com/api/telegram/webhook"}'
```

Başarılı response:
```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```

#### 6.4. Webhook'u Kontrol Et

```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

### 7. Telegram Bot'u Test Et

1. Telegram'da botunu bul ve başlat
2. `/help` komutunu gönder - kullanım kılavuzunu görmeli
3. `/stats` komutunu gönder - istatistikleri görmeli
4. Test mesajları gönder:
   ```
   /link https://www.example.com

   /quote Test alıntısı
   Yazar: Test

   /video Harika bir video
   ```

5. Her mesajdan sonra:
   - "⏳ Not işleniyor..." mesajı
   - Ardından "✅ Not eklendi!" başarı mesajı
   - GitHub'da markdown dosyası oluşmalı
   - Neon DB'de kayıt olmalı
   - Website'te görünmeli (60 saniye sonra ISR ile)

## 📁 Oluşturulan Dosyalar

### Core Libraries
- `src/lib/db.js` - Neon DB client ve CRUD fonksiyonları
- `src/lib/github.js` - GitHub markdown file creation
- `src/lib/gemini.js` - Gemini AI kategorilendirme

### API Endpoints
- `src/app/api/notes/list/route.js` - Not listeleme API
- `src/app/api/telegram/webhook/route.js` - Telegram webhook handler

### Frontend
- `src/app/kesifler/page.jsx` - Async Server Component (ISR enabled)
- `src/components/kesifler/KesiflerClient.jsx` - Client-side UI wrapper

### Scripts
- `scripts/init-db.sql` - Database initialization
- `scripts/migrate-kesifler.js` - Data migration script

## 🧪 Test Checklist

- [ ] Neon DB bağlantısı çalışıyor
- [ ] Database şeması oluşturuldu (tables + indexes)
- [ ] Migration başarılı (6 veri taşındı)
- [ ] GitHub'da markdown dosyaları oluştu
- [ ] `/api/notes/list?type=link` endpoint çalışıyor
- [ ] Frontend sayfası yükleniyor
- [ ] Telegram bot token doğru
- [ ] Webhook ayarlandı
- [ ] Telegram'dan mesaj gönderildi ve işlendi
- [ ] Yeni not DB'ye kaydedildi
- [ ] GitHub'a commit atıldı
- [ ] Website'te yeni not görünüyor

## 🐛 Sorun Giderme

### Database Bağlantı Hatası
```
Failed to create note: password authentication failed
```
**Çözüm:** DATABASE_URL'i kontrol et, doğru mu?

### GitHub API Hatası
```
Failed to create markdown file: Bad credentials
```
**Çözüm:** GITHUB_TOKEN'ı kontrol et, repo erişimi var mı?

### Telegram Webhook Hatası
```
Webhook was deleted
```
**Çözüm:** Webhook URL'i kontrol et, HTTPS mi? Production URL doğru mu?

### Gemini API Hatası
```
GEMINI_API_KEY is not defined
```
**Çözüm:** .env.local'de GEMINI_API_KEY var mı? Vercel'de de eklendi mi?

## 📚 Kaynaklar

- [Neon Documentation](https://neon.tech/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Google Gemini API](https://ai.google.dev/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Vercel Deployment](https://vercel.com/docs)

## 🎉 Başarılı!

Sistem çalışıyorsa:
- Telegram'dan not gönderebilirsiniz
- Otomatik olarak kategorilendirilir (Gemini AI)
- Neon DB'ye kaydedilir
- GitHub'a markdown file olarak push edilir
- Website'te görünür (60 saniye ISR ile)

İyi kullanımlar! 🚀
