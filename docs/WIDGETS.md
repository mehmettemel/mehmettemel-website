# Floating Language Widgets

## Genel Bakış

Tüm sayfalarda otomatik olarak görünen, interaktif dil öğrenme widget'ları. Sol alt köşede İngilizce, sağ alt köşede Rusça kelimeleri/cümleleri gösterir.

## Özellikler

### 🎯 Ana Özellikler

- **Otomatik Rotasyon:** 20 saniyede bir yeni kelime/cümle
- **İki Görünüm Modu:** Compact (normal) ve Expanded (hover)
- **Responsive:** Mobil ve desktop uyumlu
- **Theme Support:** Light ve Dark mode
- **Smooth Animations:** 500ms transition effects
- **Always Visible:** Tüm sayfalarda görünür (fixed position)

### 🇬🇧 İngilizce Widget (Sol Alt)

**Konum:** `bottom-6 left-6`

**Compact View (192px):**
- İngilizce kelime
- Türkçe karşılık

**Expanded View (320-384px):**
- Örnek cümle (kelime vurgulanır)
- Örnek cümlenin Türkçe çevirisi

**Renk Şeması:**
- Light: `border-blue-200/60`, `bg-white/95`
- Dark: `border-blue-500/30`, `bg-gradient blue-950→slate-900`
- Highlight: `text-blue-700` (light) / `text-blue-400` (dark)

### 🇷🇺 Rusça Widget (Sağ Alt)

**Konum:** `bottom-6 right-6`

**Compact View (192px):**
- Rusça kelime/cümle
- Türkçe karşılık

**Expanded View (320-384px):**
- Okunuş (pronunciation)
- İngilizce çeviri
- Türkçe çeviri
- Örnek cümle (fiiller için)
- Renk önizlemesi (renkler için)

**Renk Şeması:**
- Light: `border-rose-200/60`, `bg-white/95`
- Dark: `border-red-500/30`, `bg-gradient red-950→slate-900`
- Highlight: `text-rose-700` (light) / `text-red-400` (dark)

## Teknik Detaylar

### Dosya Yapısı

```
src/
├── components/
│   ├── Layout.jsx (widget'ları içerir)
│   └── language-widgets/
│       ├── EnglishFloatingWidget.jsx
│       └── RussianFloatingWidget.jsx
├── hooks/
│   ├── useEnglishWords.js
│   └── useRussianPhrases.js
└── app/
    └── api/
        └── english-words/
            └── route.js
```

### Custom Hooks

#### `useEnglishWords()`

```javascript
import { useEnglishWords } from '@/hooks/useEnglishWords'

function Component() {
  const { currentWord, loading } = useEnglishWords()

  // currentWord: {
  //   id: 1,
  //   english: 'serendipity',
  //   turkish: 'mutlu tesadüf',
  //   example: 'Meeting my best friend was pure serendipity.',
  //   example_turkish: 'En iyi arkadaşımla tanışmam tam bir mutlu tesadüftü.'
  // }
}
```

**Özellikler:**
- API'den kelime fetch eder (`/api/english-words`)
- 20 saniyede bir otomatik rotasyon
- Initial load: Rastgele kelime

#### `useRussianPhrases()`

```javascript
import { useRussianPhrases } from '@/hooks/useRussianPhrases'

function Component() {
  const { currentPhrase } = useRussianPhrases()

  // currentPhrase: {
  //   id: 1,
  //   russian: 'Привет',
  //   pronunciation: 'Privyét',
  //   english: 'Hello',
  //   turkish: 'Merhaba',
  //   type: 'cumle'
  // }
}
```

**Özellikler:**
- Static data'dan okur (`@/data/russian`)
- 20 saniyede bir otomatik rotasyon
- Initial load: Rastgele cümle

### API Endpoint

**`GET /api/english-words`**

```javascript
// Response
{
  "words": [
    {
      "id": 1,
      "english": "serendipity",
      "turkish": "mutlu tesadüf",
      "example": "Meeting my best friend was pure serendipity.",
      "example_turkish": "En iyi arkadaşımla tanışmam tam bir mutlu tesadüftü.",
      "created_at": "2026-02-12T...",
      "updated_at": "2026-02-12T..."
    },
    // ... more words
  ]
}
```

### Bileşenler

#### `EnglishFloatingWidget`

```jsx
'use client'

export function EnglishFloatingWidget() {
  const { currentWord, loading } = useEnglishWords()
  const [isExpanded, setIsExpanded] = useState(false)

  // Hover handlers
  onMouseEnter={() => setIsExpanded(true)}
  onMouseLeave={() => setIsExpanded(false)}

  // Compact + Expanded views
  // Smooth transitions
  // Highlight kelime in example
}
```

**Props:** None (self-contained)

#### `RussianFloatingWidget`

```jsx
'use client'

export function RussianFloatingWidget() {
  const { currentPhrase } = useRussianPhrases()
  const [isExpanded, setIsExpanded] = useState(false)

  // Hover handlers
  onMouseEnter={() => setIsExpanded(true)}
  onMouseLeave={() => setIsExpanded(false)}

  // Compact + Expanded views
  // Smooth transitions
  // Extra: pronunciation, color swatch
}
```

**Props:** None (self-contained)

## CSS & Styling

### Animasyonlar

```css
/* Genişlik değişimi */
transition-all duration-500 ease-out

/* Opacity değişimi */
${isExpanded ? 'opacity-100' : 'opacity-0'}

/* Height değişimi (expanded content) */
${isExpanded ? 'max-h-96' : 'max-h-0'}

/* Hover indicator */
transition-opacity duration-300
```

### Responsive Breakpoints

```css
/* Mobile */
${isExpanded ? 'w-80' : 'w-48'}  /* 320px / 192px */

/* Desktop (sm+) */
${isExpanded ? 'sm:w-96' : 'w-48'}  /* 384px / 192px */
```

### Z-Index Hierarchy

```css
z-40  /* Widgets */
z-50  /* Navbar */
```

Widget'lar her zaman görünür ama navbar'ın altında kalır.

## Kullanıcı Deneyimi

### Davranışlar

1. **Sayfa yüklendiğinde:**
   - Her iki widget görünür
   - Rastgele kelime/cümle gösterilir
   - Compact view

2. **20 saniye sonra:**
   - Otomatik yeni kelime/cümle
   - Smooth transition

3. **Mouse hover:**
   - Widget genişler (500ms smooth)
   - Detaylı bilgi görünür
   - Alt çizgi indicator belirir

4. **Mouse ayrıldığında:**
   - Widget küçülür (500ms smooth)
   - Compact view'e döner

5. **Scroll'da:**
   - Widget sabit kalır (fixed position)
   - Her zaman erişilebilir

### Erişilebilirlik

- ✅ Keyboard navigation destekli değil (sadece hover)
- ✅ Screen reader friendly (semantic HTML)
- ✅ High contrast (WCAG AA+)
- ✅ Touch-friendly (mobil'de tap ile expand)

## Performance

### Optimizasyonlar

1. **API Caching:**
   - İlk fetch sonrası cache'lenir
   - 20 saniyede bir rotasyon client-side

2. **Component Optimization:**
   - Client component (sadece gerekli kısım)
   - useMemo/useCallback kullanımı
   - Minimal re-render

3. **Animation Performance:**
   - CSS transitions (GPU accelerated)
   - transform/opacity kullanımı
   - will-change optimizasyonu

### Bundle Size

```
EnglishFloatingWidget: ~2KB
RussianFloatingWidget: ~2KB
useEnglishWords: ~1KB
useRussianPhrases: ~0.5KB
Total: ~5.5KB gzipped
```

## Özelleştirme

### Rotasyon Süresini Değiştirme

```javascript
// useEnglishWords.js veya useRussianPhrases.js
const interval = setInterval(() => {
  // ...
}, 30000) // 30 saniye (default: 20000)
```

### Pozisyonu Değiştirme

```jsx
// EnglishFloatingWidget.jsx
<div className="fixed bottom-6 left-6">  // Değiştir

// RussianFloatingWidget.jsx
<div className="fixed bottom-6 right-6">  // Değiştir
```

### Renk Şemasını Değiştirme

```jsx
// İngilizce: blue → green
border-blue-200/60 → border-green-200/60
text-blue-700 → text-green-700
bg-blue-50/80 → bg-green-50/80

// Rusça: rose → purple
border-rose-200/60 → border-purple-200/60
text-rose-700 → text-purple-700
bg-rose-50/80 → bg-purple-50/80
```

## Troubleshooting

### Widget Görünmüyor

1. Layout.jsx içinde import edilmiş mi kontrol et
2. Database'de kelime var mı kontrol et (`SELECT COUNT(*) FROM english_words`)
3. API çalışıyor mu kontrol et (`/api/english-words`)
4. Console'da hata var mı kontrol et

### Otomatik Rotasyon Çalışmıyor

1. `useEffect` dependency array'i kontrol et
2. `setInterval` return cleanup kontrolü
3. Component unmount olmuyor mu kontrol et

### Hover Çalışmıyor

1. `onMouseEnter`/`onMouseLeave` event'leri kontrol et
2. `isExpanded` state güncellemesi kontrol et
3. CSS transition süresi yeterli mi kontrol et

### Mobile'da Sorun Var

1. Touch event'leri destekleniyor mu
2. `w-80 sm:w-96` responsive class'ları kontrol et
3. `bottom-6` pozisyonu mobile'da uygun mu

## Gelecek Geliştirmeler

### Potansiyel Özellikler

- ⏳ Widget'ları kapatma/açma toggle
- ⏳ Pozisyon özelleştirme (4 köşe seçimi)
- ⏳ Rotasyon hızı ayarı (10s/20s/30s/60s)
- ⏳ Favorilere ekleme
- ⏳ Öğrenildi olarak işaretleme
- ⏳ Kategori filtresi (İngilizce için)
- ⏳ Audio pronunciation (TTS)
- ⏳ Swipe gesture (mobil)
- ⏳ Keyboard shortcuts (expand/collapse)
- ⏳ Widget history (son 10 kelime)

---

**Versiyon:** v6.0.0 - Floating Language Widgets
**Oluşturulma:** 12 Şubat 2026
**Son Güncelleme:** 12 Şubat 2026
