# Google Apps Script + Telegram Bot Entegrasyonu

Bu rehber, mevcut Google Apps Script Telegram bot'unuzun Neon DB sistemine nasıl entegre edileceğini açıklar.

## 📋 Mevcut Sistem

Google Apps Script bot şu anda:
- Telegram webhook'u alıyor
- `https://mehmettemel.com/api/kesifler/add` endpoint'ine POST request gönderiyor
- Response'u Telegram'a iletiyor

## ✅ Yeni Sistem (Değişiklik Gerekmez!)

API endpoint güncellendi ve artık:
- ✅ Gemini AI ile kategorilendirme (aynı) ✓
- ✅ Neon PostgreSQL'e kayıt (YENİ) ✓
- ✅ GitHub'a markdown dosyası oluşturma (YENİ) ✓
- ✅ Aynı response formatı (uyumlu) ✓

**Google Apps Script kodunuzda DEĞİŞİKLİK GEREKMİYOR!** 🎉

## 🔄 Akış

```
Telegram Mesajı
    ↓
Google Apps Script (webhook)
    ↓
https://mehmettemel.com/api/kesifler/add
    ↓
Gemini AI Kategorilendirme
    ↓
Neon DB Kayıt
    ↓
GitHub Markdown File
    ↓
Response → Google Apps Script → Telegram
```

## 📝 API Endpoint Detayları

### Request Format (Aynı)
```json
{
  "text": "https://example.com veya not metni"
}
```

### Response Format (Uyumlu - küçük eklentiler)
```json
{
  "success": true,
  "type": "link",  // veya "note"
  "data": {
    "id": 1234567890,
    "title": "Link Başlığı",
    "text": "Açıklama veya not metni",
    "type": "teknik",  // Backward compatibility için
    "category": "teknik",
    "url": "https://example.com",
    "author": "Yazar Adı veya null",
    "source": "Kaynak veya null",
    "tags": ["tag1", "tag2"],
    "github_path": "notes/linkler/teknik/link-baslik-123.md"  // YENİ
  },
  "message": "Link başarıyla eklendi! (DB + GitHub)"
}
```

### Error Response (Aynı)
```json
{
  "success": false,
  "error": "Hata mesajı"
}
```

## 🔧 Google Apps Script (Mevcut Kod - DEĞİŞİKLİK GEREKMİYOR)

Mevcut kodunuz aynı şekilde çalışmaya devam edecek:

```javascript
const TG_TOKEN = "7981023592:AAEDSOotOiyQXA4hLTEhBO7xwqcekYe0QYI";
const SITE_API_URL = "https://mehmettemel.com/api/kesifler/add";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data.message || !data.message.text) return;

    const chatId = data.message.chat.id;
    const text = data.message.text;

    if (text.startsWith('/')) return;

    sendTelegramMessage(chatId, "⏳ İşleniyor...");

    const result = callNextAPI(text);

    if (result.success) {
      const emoji = result.type === 'link' ? '🔗' : '💭';
      const typeName = result.type === 'link' ? 'Link' : 'Not';

      let message = `✅ ${typeName} başarıyla eklendi!\n\n`;

      if (result.type === 'link') {
        message += `📝 Başlık: ${result.data.title}\n`;
        message += `🏷️ Kategori: ${result.data.type}\n`;
        message += `🔗 URL: ${result.data.url}`;
      } else {
        const textPreview = result.data.text.length > 100
          ? result.data.text.substring(0, 100) + '...'
          : result.data.text;
        message += `📝 Not: ${textPreview}\n`;
        message += `🏷️ Kategori: ${result.data.category}`;
        if (result.data.author) {
          message += `\n✍️ Yazar: ${result.data.author}`;
        }
      }

      sendTelegramMessage(chatId, message);
    } else {
      sendTelegramMessage(chatId, "❌ Hata: " + result.error);
    }
  } catch (err) {
    console.error("❌ Hata:", err);
    sendTelegramMessage(chatId, "❌ Hata oluştu: " + err.toString());
  }
}
```

## 🎯 İsteğe Bağlı: Mesaj Formatını İyileştir

Eğer GitHub path'i de göstermek isterseniz, success mesajınızı şöyle güncelleyebilirsiniz:

```javascript
if (result.success) {
  const emoji = result.type === 'link' ? '🔗' : '💭';
  const typeName = result.type === 'link' ? 'Link' : 'Not';

  let message = `✅ ${typeName} başarıyla eklendi!\n\n`;

  if (result.type === 'link') {
    message += `📝 Başlık: ${result.data.title}\n`;
    message += `🏷️ Kategori: ${result.data.type}\n`;
    message += `🔗 URL: ${result.data.url}\n`;
    // YENİ: GitHub path'i ekle
    if (result.data.github_path) {
      message += `📁 GitHub: ${result.data.github_path}`;
    }
  } else {
    const textPreview = result.data.text.length > 100
      ? result.data.text.substring(0, 100) + '...'
      : result.data.text;
    message += `📝 Not: ${textPreview}\n`;
    message += `🏷️ Kategori: ${result.data.category}`;
    if (result.data.author) {
      message += `\n✍️ Yazar: ${result.data.author}`;
    }
    // YENİ: GitHub path'i ekle
    if (result.data.github_path) {
      message += `\n📁 GitHub: ${result.data.github_path}`;
    }
  }

  sendTelegramMessage(chatId, message);
}
```

## 🧪 Test Etme

### 1. Local Test (Development)
```bash
npm run dev

# Başka bir terminalde:
curl -X POST http://localhost:3000/api/kesifler/add \
  -H "Content-Type: application/json" \
  -d '{"text":"https://www.example.com"}'

# Response:
# {
#   "success": true,
#   "type": "link",
#   "data": {...},
#   "message": "Link başarıyla eklendi! (DB + GitHub)"
# }
```

### 2. Production Test (Google Apps Script)
Google Apps Script'inizden test mesajı gönderin:
1. Telegram bot'a mesaj gönderin
2. Mesaj işlenmeli
3. Response Telegram'a dönmeli
4. Neon DB'de veri görünmeli
5. GitHub'da markdown dosyası oluşmalı

### 3. Database Kontrol
Neon Console'da:
```sql
SELECT * FROM notes ORDER BY created_at DESC LIMIT 5;
```

### 4. GitHub Kontrol
Repository'nizde `notes/` klasörünü kontrol edin:
```
notes/
├── linkler/
│   ├── teknik/
│   │   └── example-link-123.md
│   └── diger/
└── alintilar/
    └── saglik/
```

## 🔐 Gerekli Environment Variables

Production'da (Vercel) bu değişkenlerin tanımlı olması gerekiyor:

```bash
# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# GitHub
GITHUB_TOKEN=your_github_token
GITHUB_REPO=mehmettemel/mehmettemel-blog
GITHUB_BRANCH=main

# Neon Database
DATABASE_URL=postgresql://user:password@ep-xxx.aws.neon.tech/dbname
```

## 📊 Veri Akışı Karşılaştırması

### Eski Sistem:
```
Telegram → Google Apps Script → API → Gemini → kesifler.js (GitHub)
```

### Yeni Sistem:
```
Telegram → Google Apps Script → API → Gemini → Neon DB + Markdown Files (GitHub)
```

## ⚠️ Önemli Notlar

1. **Backward Compatibility:** API response'u `data.type` alanını backward compatibility için hala döndürüyor (Google Apps Script kodunuz aynı çalışsın diye)

2. **GitHub Commits:** Her not için 2 işlem yapılıyor:
   - Neon DB'ye kayıt
   - GitHub'a ayrı markdown file (notes/ klasöründe)

3. **kesifler.js:** Artık kullanılmıyor ama yedek olarak duruyor. Silmeyin, migration için gerekli olabilir.

4. **Rate Limiting:** Gemini API'nin rate limit'i var. Google Apps Script bot'unuzda spam koruması olmalı.

## 🚀 Deploy Sonrası

1. ✅ Vercel'e environment variables eklenmiş olmalı
2. ✅ `npm run dev` local'de çalışmalı
3. ✅ Push yapın, Vercel otomatik deploy edecek
4. ✅ Production URL'de test edin:
   ```bash
   curl -X POST https://mehmettemel.com/api/kesifler/add \
     -H "Content-Type: application/json" \
     -d '{"text":"test mesajı"}'
   ```
5. ✅ Google Apps Script'ten test mesajı gönderin
6. ✅ DB ve GitHub'ı kontrol edin

## ✅ Tamamlanmış!

Artık sisteminiz:
- ✅ Google Apps Script bot ile çalışıyor
- ✅ Neon PostgreSQL'e kayıt yapıyor
- ✅ GitHub'a markdown dosyaları oluşturuyor
- ✅ Frontend'de görünüyor (ISR ile 60 sn cache)
- ✅ Aynı API response format'ı kullanıyor

**Hiçbir değişiklik yapmadan mevcut bot'unuz çalışmaya devam edecek!** 🎉

## 📚 İlgili Dökümanlar

- [TELEGRAM_BOT_SETUP.md](./TELEGRAM_BOT_SETUP.md) - Yeni Telegram webhook kurulumu için
- [scripts/migrate-kesifler.js](./scripts/migrate-kesifler.js) - Mevcut verileri taşımak için

## 🆘 Sorun Giderme

### API 500 Hatası
- Environment variables kontrol edin
- Vercel logs'u kontrol edin: `vercel logs`
- Database bağlantısı çalışıyor mu?

### GitHub Commit Hatası
- GITHUB_TOKEN geçerli mi?
- Repository erişimi var mı?

### Gemini API Hatası
- GEMINI_API_KEY tanımlı mı?
- Rate limit aşıldı mı?

### Bot Yanıt Vermiyor
- Google Apps Script logs'u kontrol edin
- SITE_API_URL doğru mu? (https://mehmettemel.com/api/kesifler/add)
- Webhook hala aktif mi?
