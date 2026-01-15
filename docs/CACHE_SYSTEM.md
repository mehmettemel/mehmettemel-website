# Cache Sistemi - Detaylı Dokümantasyon

## İçindekiler
1. [Genel Bakış](#genel-bakış)
2. [Sistem Mimarisi](#sistem-mimarisi)
3. [Veritabanı Yapısı](#veritabanı-yapısı)
4. [Sayfa Yapısı](#sayfa-yapısı)
5. [Veri Ekleme](#veri-ekleme)
6. [Checkbox İşlemleri](#checkbox-i̇şlemleri)
7. [API Kullanımı](#api-kullanımı)
8. [Kullanım Örnekleri](#kullanım-örnekleri)

---

## Genel Bakış

Cache sistemi, izlemek, okumak veya satın almak istediğiniz öğeleri takip etmenizi sağlayan bir ToDo listesi benzeri sistemdir.

### Özellikler
- ✅ **Üç Kategori**: Kitap, Film & Dizi, Ürünler
- ✅ **Durum Takibi**: "Tamamlandı" ve "Beğendim" checkbox'ları
- ✅ **Telegram Entegrasyonu**: Telegram üzerinden hızlı ekleme
- ✅ **Gerçek Zamanlı Güncelleme**: PATCH API ile anlık güncelleme
- ✅ **Akıllı Mantık**: Bir öğeyi beğenmek için önce tamamlanmış olmalı
- ✅ **ISR Desteği**: 60 saniye Incremental Static Regeneration

---

## Sistem Mimarisi

```
┌─────────────────────────────────────────────────────────┐
│                    Cache Sistemi                         │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   Kitap      │   │  Film & Dizi │   │   Ürünler    │
│   /cache/    │   │   /cache/    │   │   /cache/    │
│   kitap      │   │   film       │   │   urun       │
└──────────────┘   └──────────────┘   └──────────────┘
```

### Veri Akışı

#### Telegram ile Ekleme:
```
Telegram Bot → /cache-kitap Atomic Habits
      ↓
Webhook (/api/telegram/webhook)
      ↓
handleCacheItem() çağrısı
      ↓
createCacheItem() - Veritabanına kayıt
      ↓
Telegram'a başarı mesajı
      ↓
Web Sayfası (ISR ile 60s içinde güncellenir)
```

#### Web'de Checkbox Değiştirme:
```
Kullanıcı checkbox'ı tıklar
      ↓
PATCH /api/cache/[id]/toggle
      ↓
toggleCacheCheckbox() - DB güncelleme
      ↓
Frontend state güncellenir
      ↓
UI anında güncellenir
```

---

## Veritabanı Yapısı

### Tablo: `cache_items`

```sql
CREATE TABLE cache_items (
  id BIGSERIAL PRIMARY KEY,

  -- Temel Alanlar
  name VARCHAR(500) NOT NULL,              -- Öğe ismi
  cache_type VARCHAR(20) NOT NULL          -- 'kitap', 'film', veya 'urun'
    CHECK (cache_type IN ('kitap', 'film', 'urun')),

  -- Durum Alanları
  is_completed BOOLEAN DEFAULT FALSE,      -- Tamamlandı mı?
  is_liked BOOLEAN DEFAULT FALSE,          -- Beğenildi mi?

  -- Zaman Damgaları
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- İş Mantığı Kısıtlaması
  CONSTRAINT check_liked_requires_completed
    CHECK (is_liked = FALSE OR is_completed = TRUE)
);

-- İndeksler
CREATE INDEX idx_cache_items_type ON cache_items(cache_type);
CREATE INDEX idx_cache_items_completed ON cache_items(is_completed);
CREATE INDEX idx_cache_items_created ON cache_items(created_at DESC);
```

### İş Mantığı Kısıtlamaları

**Kurallar:**
1. Bir öğe beğenilmek için önce tamamlanmış olmalıdır
2. Tamamlanmış durumu kaldırıldığında, beğenilmiş durumu da otomatik olarak kaldırılır
3. Her cache_type değeri sadece: 'kitap', 'film', veya 'urun' olabilir

**Database Trigger:**
```sql
CREATE OR REPLACE FUNCTION update_cache_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_cache_items_updated_at
  BEFORE UPDATE ON cache_items
  FOR EACH ROW
  EXECUTE FUNCTION update_cache_items_updated_at();
```

### Örnek Veriler

```sql
INSERT INTO cache_items (name, cache_type, is_completed, is_liked) VALUES
  ('Atomic Habits - James Clear', 'kitap', true, true),
  ('Sapiens - Yuval Noah Harari', 'kitap', true, false),
  ('The Power of Now', 'kitap', false, false),
  ('Inception', 'film', true, true),
  ('Breaking Bad', 'film', false, false),
  ('Sony WH-1000XM5', 'urun', true, true),
  ('Kindle Paperwhite', 'urun', false, false);
```

---

## Sayfa Yapısı

### 1. Ana Cache Sayfası (`/cache`)

**Dosya:** `/src/app/cache/page.jsx`

```javascript
export default async function CachePage() {
  const stats = await getCacheStats()

  return (
    <div>
      {/* İstatistikler gösterimi */}
      <CategoryCard
        category="kitap"
        total={stats.kitap.total}
        completed={stats.kitap.completed}
        liked={stats.kitap.liked}
      />
      {/* Film ve Ürün kartları... */}
    </div>
  )
}

export const revalidate = 60 // 60 saniye ISR
```

**Fonksiyonlar:**
- `getCacheStats()`: Her kategori için istatistik çeker
  ```javascript
  {
    kitap: { total: 10, completed: 5, liked: 3 },
    film: { total: 8, completed: 4, liked: 2 },
    urun: { total: 6, completed: 3, liked: 1 }
  }
  ```

**Görsel Bileşenler:**
- 3 kategori kartı
- Her kartta: İkon, isim, açıklama
- İstatistikler: Toplam, Tamamlanan, Beğenilen
- Hover efekti ve tıklanabilir kart

### 2. Alt Sayfalar

#### Kitap Sayfası (`/cache/kitap`)
**Dosya:** `/src/app/cache/kitap/page.jsx`

```javascript
export default async function KitapCachePage() {
  const items = await getCacheItems('kitap')

  return (
    <CachePageLayout
      title="Kitap"
      items={items}
      type="kitap"
      emoji="📚"
    />
  )
}

export const revalidate = 60
```

#### Film Sayfası (`/cache/film`)
**Dosya:** `/src/app/cache/film/page.jsx`

```javascript
export default async function FilmCachePage() {
  const items = await getCacheItems('film')

  return (
    <CachePageLayout
      title="Film & Dizi"
      items={items}
      type="film"
      emoji="🎬"
    />
  )
}

export const revalidate = 60
```

#### Ürün Sayfası (`/cache/urun`)
**Dosya:** `/src/app/cache/urun/page.jsx`

```javascript
export default async function UrunCachePage() {
  const items = await getCacheItems('urun')

  return (
    <CachePageLayout
      title="Ürünler"
      items={items}
      type="urun"
      emoji="🛍️"
    />
  )
}

export const revalidate = 60
```

---

## Veri Ekleme

### 1. Telegram ile Ekleme

#### Komutlar:
```bash
/cache-kitap [isim]      # Kitap ekle
/cache-film [isim]       # Film/dizi ekle
/cache-urun [isim]       # Ürün ekle
```

#### Örnekler:
```
/cache-kitap Atomic Habits
/cache-film Inception
/cache-urun Sony WH-1000XM5
```

#### Akış:
```javascript
// 1. Telegram mesajı gelir
{
  message: {
    text: "/cache-kitap Atomic Habits",
    from: { id: 123456789 }
  }
}

// 2. parseMessage() komutu algılar
{
  command: 'cache-kitap',
  text: 'Atomic Habits',
  isCacheCommand: true,
  cacheType: 'kitap'
}

// 3. handleCacheItem() çağrılır
const data = await handleCacheItem('kitap', 'Atomic Habits')
// Dönen: { name: 'Atomic Habits', type: 'kitap' }

// 4. createCacheItem() ile kayıt
const item = await createCacheItem({
  name: 'Atomic Habits',
  cache_type: 'kitap'
})

// 5. Telegram'a yanıt
"✅ Kitap eklendi: Atomic Habits"
```

### 2. Doğrudan API ile Ekleme

**Endpoint:** POST `/api/cache/create` (şu an sadece Telegram webhook üzerinden)

```bash
curl -X POST https://mehmettemel.com/api/cache/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Atomic Habits",
    "cache_type": "kitap"
  }'
```

**Yanıt:**
```json
{
  "success": true,
  "item": {
    "id": 1,
    "name": "Atomic Habits",
    "cache_type": "kitap",
    "is_completed": false,
    "is_liked": false,
    "created_at": "2026-01-15T10:00:00Z",
    "updated_at": "2026-01-15T10:00:00Z"
  }
}
```

---

## Checkbox İşlemleri

### Frontend Bileşenleri

#### 1. CacheList Komponenti
**Dosya:** `/src/components/cache/CacheList.jsx`

```javascript
export function CacheList({ items = [] }) {
  const { pending, completed } = useMemo(() => {
    const pending = items.filter((item) => !item.is_completed)
    const completed = items.filter((item) => item.is_completed)
    return { pending, completed }
  }, [items])

  const likedCount = items.filter((item) => item.is_liked).length

  return (
    <div>
      {/* İstatistikler */}
      <div>
        <span>{items.length} toplam</span>
        <span>{pending.length} bekleyen</span>
        <span>{completed.length} tamamlanan</span>
        <span>{likedCount} beğenilen</span>
      </div>

      {/* Bekleyen öğeler */}
      <section>
        <h2>Bekleyenler ({pending.length})</h2>
        {pending.map(item => (
          <CacheItem key={item.id} item={item} />
        ))}
      </section>

      {/* Tamamlanan öğeler */}
      <section>
        <h2>Tamamlananlar ({completed.length})</h2>
        {completed.map(item => (
          <CacheItem key={item.id} item={item} />
        ))}
      </section>
    </div>
  )
}
```

#### 2. CacheItem Komponenti
**Dosya:** `/src/components/cache/CacheItem.jsx`

```javascript
export function CacheItem({ item }) {
  const [isCompleted, setIsCompleted] = useState(item.is_completed)
  const [isLiked, setIsLiked] = useState(item.is_liked)
  const [isUpdating, setIsUpdating] = useState(false)

  const toggleCheckbox = async (field, currentValue) => {
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/cache/${item.id}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field })
      })

      if (!response.ok) throw new Error('Update failed')

      const data = await response.json()

      // State güncelleme
      if (field === 'is_completed') {
        setIsCompleted(data.item.is_completed)
        // Tamamlanmadı olarak işaretlenirse, beğenildi de otomatik kapanır
        if (!data.item.is_completed) {
          setIsLiked(false)
        }
      } else if (field === 'is_liked') {
        setIsLiked(data.item.is_liked)
      }

    } catch (error) {
      console.error('Error toggling checkbox:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCompletedChange = (checked) => {
    toggleCheckbox('is_completed', isCompleted)
  }

  const handleLikedChange = (checked) => {
    toggleCheckbox('is_liked', isLiked)
  }

  return (
    <div className={isCompleted ? 'opacity-70' : ''}>
      <Checkbox
        checked={isCompleted}
        onCheckedChange={handleCompletedChange}
        disabled={isUpdating}
      />

      <span className={isCompleted ? 'line-through' : ''}>
        {item.name}
      </span>

      <button
        onClick={handleLikedChange}
        disabled={!isCompleted || isUpdating}
        className={isLiked ? 'text-red-500' : 'text-gray-400'}
      >
        {isLiked ? '❤️' : '🤍'}
      </button>
    </div>
  )
}
```

### Checkbox Mantığı

**Tamamlandı Checkbox'ı:**
- ✅ Her zaman tıklanabilir
- ✅ Açıldığında: Öğe tamamlananlar bölümüne taşınır
- ✅ Kapatıldığında: Öğe bekleyenler bölümüne geri döner
- ⚠️ Kapatıldığında: Beğenilmiş durumu varsa otomatik olarak kaldırılır

**Beğenildi Heart Button:**
- ✅ Sadece tamamlanan öğelerde aktif
- ❌ Tamamlanmamış öğelerde disabled (gri)
- ✅ Açıldığında: Kalp kırmızı dolu görünür
- ✅ Kapatıldığında: Kalp beyaz boş görünür

### UI Davranışları

```javascript
// Başlangıç durumu: Tamamlanmamış, Beğenilmemiş
Item: "Atomic Habits"
[☐] Tamamlandı    [🤍] (disabled)

// 1. Tamamlandı checkbox'ını işaretle
[☑] Tamamlandı    [🤍] (enabled) ← Artık tıklanabilir

// 2. Heart'ı tıkla
[☑] Tamamlandı    [❤️]

// 3. Tamamlandı checkbox'ını kaldır
[☐] Tamamlandı    [🤍] (disabled) ← Otomatik kapandı
```

---

## API Kullanımı

### 1. GET - Cache Öğelerini Getir

**Fonksiyon:** `getCacheItems(type, status)`

```javascript
// Tüm kitapları getir
const books = await getCacheItems('kitap')

// Sadece tamamlanan filmleri getir
const completedMovies = await getCacheItems('film', 'completed')

// Sadece bekleyen ürünleri getir
const pendingProducts = await getCacheItems('urun', 'pending')
```

**SQL Query:**
```sql
SELECT * FROM cache_items
WHERE cache_type = $1
  AND ($2::text IS NULL OR
       ($2 = 'completed' AND is_completed = true) OR
       ($2 = 'pending' AND is_completed = false))
ORDER BY created_at DESC
```

### 2. GET - Cache İstatistiklerini Getir

**Fonksiyon:** `getCacheStats()`

```javascript
const stats = await getCacheStats()
console.log(stats)
// {
//   kitap: { total: 10, completed: 5, liked: 3 },
//   film: { total: 8, completed: 4, liked: 2 },
//   urun: { total: 6, completed: 3, liked: 1 }
// }
```

**SQL Query:**
```sql
SELECT
  cache_type,
  COUNT(*) as total,
  SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN is_liked THEN 1 ELSE 0 END) as liked
FROM cache_items
GROUP BY cache_type
```

### 3. POST - Yeni Cache Öğesi Oluştur

**Fonksiyon:** `createCacheItem(data)`

```javascript
const item = await createCacheItem({
  name: 'Atomic Habits',
  cache_type: 'kitap'
})
```

**SQL Query:**
```sql
INSERT INTO cache_items (name, cache_type)
VALUES ($1, $2)
RETURNING *
```

### 4. PATCH - Checkbox Değiştir

**Endpoint:** PATCH `/api/cache/[id]/toggle`

**Request:**
```json
{
  "field": "is_completed"
}
```

**Response:**
```json
{
  "success": true,
  "item": {
    "id": 1,
    "name": "Atomic Habits",
    "cache_type": "kitap",
    "is_completed": true,
    "is_liked": false,
    "created_at": "2026-01-15T10:00:00Z",
    "updated_at": "2026-01-15T11:00:00Z"
  }
}
```

**İmplementasyon:**
```javascript
export async function PATCH(request, { params }) {
  const { id } = await params
  const body = await request.json()
  const { field } = body

  // Validasyon
  if (!['is_completed', 'is_liked'].includes(field)) {
    return NextResponse.json(
      { success: false, error: 'Invalid field' },
      { status: 400 }
    )
  }

  const updatedItem = await toggleCacheCheckbox(parseInt(id), field)

  return NextResponse.json({ success: true, item: updatedItem })
}
```

**toggleCacheCheckbox() Fonksiyonu:**
```javascript
export async function toggleCacheCheckbox(id, field) {
  // 1. Mevcut öğeyi al
  const currentItem = await sql`
    SELECT * FROM cache_items WHERE id = ${id}
  `

  // 2. Yeni değeri hesapla (toggle)
  const currentValue = currentItem[0][field]
  const newValue = !currentValue

  // 3. Özel mantık: is_liked için is_completed kontrolü
  if (field === 'is_liked' && newValue && !currentItem[0].is_completed) {
    throw new Error('Cannot like an incomplete item')
  }

  // 4. Güncelleme
  if (field === 'is_completed' && !newValue) {
    // Tamamlanmadı olarak işaretlenirse, beğenilmiş de kapat
    return await sql`
      UPDATE cache_items
      SET is_completed = false, is_liked = false, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
  } else {
    return await sql`
      UPDATE cache_items
      SET ${sql(field)} = ${newValue}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
  }
}
```

---

## Kullanım Örnekleri

### Örnek 1: Telegram ile Kitap Ekleme ve İşaretleme

```bash
# 1. Telegram'da kitap ekle
/cache-kitap Atomic Habits
# Bot yanıtı: "✅ Kitap eklendi: Atomic Habits"

# 2. Web sitesinde /cache/kitap sayfasına git
# "Bekleyenler" bölümünde göreceksin

# 3. Kitabı okuduktan sonra "Tamamlandı" checkbox'ını işaretle
[☑] Atomic Habits [🤍]

# 4. Kitabı çok beğendiysen heart'a tıkla
[☑] Atomic Habits [❤️]
```

### Örnek 2: Toplu Ekleme

```bash
# Birden fazla kitap ekle
/cache-kitap Sapiens - Yuval Noah Harari
/cache-kitap The Power of Now - Eckhart Tolle
/cache-kitap Atomic Habits - James Clear

# Film ekle
/cache-film Inception
/cache-film Interstellar
/cache-film The Dark Knight

# Ürün ekle
/cache-urun Sony WH-1000XM5 Kulaklık
/cache-urun Kindle Paperwhite
/cache-urun MacBook Pro M3
```

### Örnek 3: İstatistikleri Görüntüleme

Ana cache sayfasında (`/cache`) her kategori için:
```
📚 Kitap
Okumak istediğim veya okuduğum kitaplar
📊 15 öğe • 8 tamamlandı • 5 beğenildi
```

### Örnek 4: Filtreleme

```javascript
// Backend'de filtreleme
const completedBooks = await getCacheItems('kitap', 'completed')
const pendingMovies = await getCacheItems('film', 'pending')

// Frontend'de filtreleme
const likedItems = items.filter(item => item.is_liked)
const uncompletedItems = items.filter(item => !item.is_completed)
```

---

## Troubleshooting

### Sorun 1: Beğenildi butonu aktif olmuyor
**Çözüm:** Önce "Tamamlandı" checkbox'ını işaretlemelisiniz.

### Sorun 2: Tamamlandı'yı kaldırdığımda beğenildi de kalkıyor
**Beklenen davranış:** Bu özellikle tasarlandı. Sadece tamamlanan öğeler beğenilebilir.

### Sorun 3: Telegram'dan eklenen öğe web'de görünmüyor
**Çözüm:** ISR 60 saniye sonra güncellenir. Sayfayı yenileyin veya 1 dakika bekleyin.

### Sorun 4: Database constraint hatası
```
ERROR: new row violates check constraint "check_liked_requires_completed"
```
**Çözüm:** Bir öğeyi beğenilmiş olarak işaretlemek için önce tamamlanmış olmalı.

---

## Gelecek Geliştirmeler

### Planlanan Özellikler:
- [ ] Notlar ekleme (her öğe için)
- [ ] Etiketler/kategoriler
- [ ] Sıralama ve filtreleme UI
- [ ] Arama fonksiyonu
- [ ] Dışa aktarma (CSV, JSON)
- [ ] Öğe silme
- [ ] Öğe düzenleme
- [ ] Tarih takibi (ne zaman tamamlandı)
- [ ] Puan verme sistemi (1-5 yıldız)
- [ ] Öneriler (AI ile benzer öğeler)

---

## İlgili Dosyalar

### Sayfa Bileşenleri:
- `/src/app/cache/page.jsx` - Ana cache sayfası
- `/src/app/cache/kitap/page.jsx` - Kitap alt sayfası
- `/src/app/cache/film/page.jsx` - Film alt sayfası
- `/src/app/cache/urun/page.jsx` - Ürün alt sayfası

### React Bileşenleri:
- `/src/components/cache/CacheList.jsx` - Liste görünümü
- `/src/components/cache/CacheItem.jsx` - Tekil öğe

### API Routes:
- `/src/app/api/cache/[id]/toggle/route.js` - Checkbox toggle endpoint

### Database:
- `/src/lib/db.js` - Tüm cache veritabanı fonksiyonları
- `/scripts/create-cache-table.sql` - Cache tablosu SQL

### Data:
- `/src/data/cache.js` - Kategori konfigürasyonu

---

**Son Güncelleme:** 15 Ocak 2026
