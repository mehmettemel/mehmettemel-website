---
name: e
description: Entrepreneur sayfasına not eklemek için kullanılır. /e komutu ile tetiklenir. İçeriği analiz edip src/data/girisimcilik.js dosyasındaki doğru tab ve kategoriye yerleştirir.
---

# Entrepreneur Notu Ekle

Kullanıcı `/e` komutu ile bir not verdiğinde, içeriği analiz edip `src/data/girisimcilik.js` dosyasındaki doğru tab ve kategoriye ekler.

## Adım 1: Kategori İpucu Tespiti

Kullanıcı notun başında bir ipucu yazabilir. İpucu varsa öncelikli kullan:

**Tab ipuçları** (tabı doğrudan belirler, kategoriyi içerikten çıkar):
`iş`, `is`, `business` → **is** tab
`marketing`, `pazarlama` → **pazarlama** tab
`kariyer` → **kariyer** tab
`iletişim` → **iletisim** tab
`ai`, `gelecek`, `future`, `teknoloji`, `finans`, `finance`, `ekonomi` → **futureInsights** tab

**Alt kategori ipuçları** (hem tabı hem kategoriyi belirler):
`müşteri`, `musterı`, `satış` → is/Müşteri & Satış
`operasyon` → is/Operasyonlar
`temel` → is/Temel İlkeler
`ikna`, `müzakere` → iletisim/İletişim
`ai` → futureInsights/AI & Teknoloji
`ekonomi`, `finans`, `finance` → futureInsights/Ekonomi & Finans

İpucu bulunduysa metinden çıkar (ipucu notun parçası değil).

## Adım 2: İçerik Analizi (ipucu yoksa)

Notun içeriğine bakarak doğru tab ve kategoriyi belirle:

| Tab | Kategori | Anahtar Konular |
|---|---|---|
| **is** | Temel İlkeler | Girişimcilik, startup, iş kurma, ticaret, e-ticaret, risk yönetimi, şirket kurma, franchise |
| **is** | Müşteri & Satış | Müşteri ilişkileri, satış teknikleri, tedarikçi, ihracat, CRM, fiyatlama |
| **is** | Operasyonlar | Süreç yönetimi, çalışan yönetimi, verimlilik, otomasyon, yazılım/araçlar |
| **pazarlama** | Pazarlama | Reklam, sosyal medya, SEO, içerik pazarlama, marka, growth hacking, dikkat çekme |
| **kariyer** | İş & Kariyer | Kariyer gelişimi, maaş müzakeresi, liderlik, verimlilik, iş hayatı tavsiyeleri |
| **iletisim** | İletişim | İkna, müzakere, beden dili, konuşma teknikleri, güven oluşturma, çatışma yönetimi |
| **futureInsights** | AI & Teknoloji | Yapay zeka, otomasyon, teknoloji trendleri, gelecek öngörüleri, dijital dönüşüm |
| **futureInsights** | Ekonomi & Finans | Yatırım, borsa, kripto, makroekonomi, finansal trendler, para politikası |

**Karar kuralı:** Pratik iş tavsiyesi → `is` tabı. Tanıtım/büyüme → `pazarlama`. Kişisel gelişim kariyere uygulanmış → `kariyer`. İletişim/ikna → `iletisim`. Teknoloji/gelecek → `futureInsights`.

## Adım 3: Duplike Kontrolü

`src/data/girisimcilik.js` dosyasını oku. Notun özü zaten varsa kullanıcıya bildir, ekleme.

## Adım 4: Ekleme

### Format (flat string):
```js
'Not metni',
```

Hedef path: `tabs.<tabKey>.categories['<Kategori Adı>'].items` dizisinin **sonuna** ekle.

### Örnekler:
- `tabs.is.categories['Temel İlkeler'].items` sonuna ekle
- `tabs.kariyer.categories['İş & Kariyer'].items` sonuna ekle
- `tabs.futureInsights.categories['AI & Teknoloji'].items` sonuna ekle

## Metin Temizleme

- İpucunu ve `/e` prefix'ini kaldır
- Gereksiz boşlukları temizle
- Metin olduğu gibi korunsun, yeniden yazma veya özetleme yapma
- Single quote'ları escape et (`'` → `\'`)

## Onay Formatı

```
Eklendi: girisimcilik.js → [tab] / [kategori]
```
