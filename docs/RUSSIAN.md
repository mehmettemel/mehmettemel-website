# Rusça Dil Öğrenme Sistemi

## Genel Bakış

Bu modül, Rusça kelime ve cümleleri kategorize edilmiş bir şekilde sunan interaktif bir öğrenme aracıdır. Kullanıcılar kategorilere göre filtreleme yapabilir ve rastgele kelime/cümle çekebilir.

## Dosya Yapısı

```
src/
├── data/
│   └── russian.js          # Tüm Rusça veriler ve helper fonksiyonlar
└── app/
    └── listeler/
        └── rusca/
            └── page.jsx    # Rusça sayfası komponenti
```

## Veri Yapısı (`src/data/russian.js`)

### Kategoriler

```javascript
export const russianCategories = [
  { id: 'cumle', name: 'Cümleler', emoji: '💬' },
  { id: 'fiil', name: 'Fiiller', emoji: '🏃' },
  { id: 'isim', name: 'İsimler', emoji: '📦' },
  { id: 'sayi', name: 'Sayılar', emoji: '🔢' },
  { id: 'renk', name: 'Renkler', emoji: '🎨' },
]
```

### Temel Kelime/Cümle Objesi

```javascript
{
  id: 1,                                    // Benzersiz ID
  russian: 'Привет',                        // Rusça (Cyrillic)
  pronunciation: 'Privyét',                 // Okunuş (Türkçe telaffuz)
  english: 'Hello',                         // İngilizce anlam
  turkish: 'Merhaba',                       // Türkçe anlam
  type: 'isim',                             // Kategori: cumle|fiil|isim|sayi|renk
}
```

### Fiil Objesi (Ek Alanlar)

Fiiller (type: 'fiil') için örnek cümle ve çevirisi eklenir:

```javascript
{
  id: 20,
  russian: 'говорить',
  pronunciation: 'gavarit',
  english: 'to speak',
  turkish: 'konuşmak',
  type: 'fiil',
  example: 'Я *говорю* по-русски',          // * arasındaki kelime highlight edilir
  exampleTranslation: 'Rusça konuşuyorum',  // Örnek cümlenin çevirisi
}
```

**Not:** `example` alanında `*kelime*` formatı kullanılır. UI'da bu kısım **bold + primary color** ile gösterilir.

### Renk Objesi (Ek Alanlar)

Renkler (type: 'renk') için hex renk kodu eklenir:

```javascript
{
  id: 80,
  russian: 'красный',
  pronunciation: 'krasnıy',
  english: 'red',
  turkish: 'kırmızı',
  type: 'renk',
  color: '#ef4444',                         // Hex renk kodu (UI'da önizleme için)
}
```

## Helper Fonksiyonlar

```javascript
// Kategoriye göre filtreleme
getRussianByCategory('fiil') // Tüm fiilleri döndürür

// Kategori bilgisi alma
getRussianCategory('renk') // { id: 'renk', name: 'Renkler', emoji: '🎨' }
```

## Sayfa Özellikleri (`page.jsx`)

1. **Kategori Seçimi:** Üstte yatay butonlar (tıkla → kategori değiştir)
2. **Rastgele Buton:** Seçili kategoriden rastgele öğe gösterir
3. **Kart Görünümü:**
   - Rusça metin (büyük font)
   - Okunuş (mono font, primary renk)
   - İngilizce + Türkçe çeviri
   - Fiiller için: Örnek cümle (fiil highlight)
   - Renkler için: Renk önizlemesi (yuvarlak)

## Yeni Öğe Ekleme

### Cümle Eklemek

```javascript
{
  id: 11,  // Benzersiz ID ver
  russian: 'Я люблю Россию',
  pronunciation: 'Ya lyublyu Rossiyu',
  english: 'I love Russia',
  turkish: 'Rusya\'yı seviyorum',
  type: 'cumle',
}
```

### Fiil Eklemek

```javascript
{
  id: 28,
  russian: 'читать',
  pronunciation: 'chitat',
  english: 'to read',
  turkish: 'okumak',
  type: 'fiil',
  example: 'Я *читаю* книгу',
  exampleTranslation: 'Kitap okuyorum',
}
```

### İsim Eklemek

```javascript
{
  id: 50,
  russian: 'кошка',
  pronunciation: 'koshka',
  english: 'cat',
  turkish: 'kedi',
  type: 'isim',
}
```

### Sayı Eklemek

```javascript
{
  id: 70,
  russian: 'двадцать',
  pronunciation: 'dvadtsat',
  english: '20 - twenty',
  turkish: 'yirmi',
  type: 'sayi',
}
```

### Renk Eklemek

```javascript
{
  id: 88,
  russian: 'коричневый',
  pronunciation: 'korichnevıy',
  english: 'brown',
  turkish: 'kahverengi',
  type: 'renk',
  color: '#92400e',
}
```

## Okunuş Kuralları

Okunuş alanı, Rusça kelimenin Türkçe/Latin harflerle nasıl telaffuz edileceğini gösterir. Amaç: Karşıdaki Rus vatandaşı anlayacak şekilde söylenebilmesi.

| Rusça Harf | Okunuş Örneği           |
| ---------- | ----------------------- |
| ы          | ı (kapalı ı)            |
| й          | y                       |
| ё          | yo                      |
| ж          | j                       |
| ч          | ch                      |
| ш          | sh                      |
| щ          | shch                    |
| ь          | (yumuşatma, yazılmaz)   |
| ъ          | (sert işaret, yazılmaz) |

## Navigasyon

- **URL:** `/listeler/rusca`
- **Navbar:** Listeler → Rusça 🇷🇺
- **Sitemap:** Dahil edildi

## Mevcut İstatistikler

| Kategori   | Adet   |
| ---------- | ------ |
| Cümleler   | 10     |
| Fiiller    | 8      |
| İsimler    | 10     |
| Sayılar    | 10     |
| Renkler    | 8      |
| **Toplam** | **46** |
