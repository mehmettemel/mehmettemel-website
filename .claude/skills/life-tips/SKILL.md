---
name: life-tips
description: Life Tips sayfasına yeni ipucu eklemek için kullanılır. /life-tips komutu ile tetiklenir. İpucunu analiz edip src/data/life-tips.js dosyasındaki doğru tab ve kategoriye yerleştirir.
---

# Life Tips Ekle

Kullanıcı `/life-tips` komutu ile bir ipucu verdiğinde, içeriği analiz edip `src/data/life-tips.js` dosyasındaki doğru tab ve kategoriye ekler.

## Veri Yapısı

```js
export const tabs = {
  tabKey: {
    label: 'Tab Adı',
    emoji: '...',
    categories: {
      'Kategori Adı': {
        label: 'Kategori Adı',
        items: [
          'İpucu metni string olarak',
        ],
      },
    },
  },
}
```

## Adım 1: Tab ve Kategori İpucu Tespiti

Kullanıcı metnin başında bir tab veya kategori ipucu yazabilir. İpucu varsa öncelikli olarak kullan:

**Tab ipuçları** (tab'ı belirler, kategoriyi içerikten çıkar):

| İpucu | Tab Key | Açıklama |
|---|---|---|
| `genel` | genel | Genel ipuçları |
| `ev` | ev | Ev ile ilgili |
| `giyim` | giyim | Giyim ile ilgili |
| `arsa` | arsa | Arsa yatırımı |
| `araba`, `araç` | araba | Araç ile ilgili |
| `banka`, `bankacılık` | bankacilik | Bankacılık |
| `hukuk` | hukuk | Hukuk |

**Kategori ipuçları** (hem tab'ı hem kategoriyi belirler):

| İpucu | Tab → Kategori |
|---|---|
| `dizayn`, `dekorasyon` | ev → Dizayn |
| `klima` | ev → Klima |
| `ev bilgi`, `ev içi` | ev → Ev İçi Bilgiler |
| `ev alma` | ev → Ev Alma |
| `kiralama`, `ev kiralama` | ev → Ev Kiralama |
| `ev eşya`, `ev eşyaları` | ev → Ev Eşyaları |
| `ayakkabı` | giyim → Ayakkabı |
| `mont` | giyim → Mont |
| `kaza` | araba → Kaza |
| `sürüş` | araba → Sürüş |
| `araç malzeme`, `malzeme` | araba → Araç Malzemeleri |
| `araç yıkama`, `yıkama` | araba → Araç Yıkama |
| `alım satım` | araba → Alım Satım |
| `araç kiralama` | araba → Kiralama |
| `kredi notu` | bankacilik → Kredi Notu |

İpucu bulunduysa metinden çıkar (ipucu notun parçası değil).

## Adım 2: İçerik Analizi (ipucu yoksa)

İpucu yoksa notun içeriğine bakarak tab ve kategoriyi belirle:

### genel — Genel (💡)
Diğer kategorilere uymayan genel hayat ipuçları, alışveriş tavsiyeleri, tüketici hakları.

### ev — Ev (🏠)
| Kategori | Anahtar Konular |
|---|---|
| **Dizayn** | Mobilya, dekorasyon, iç tasarım, seramik, boya, pimapen |
| **Klima** | Klima kullanımı, enerji tasarrufu, derece ayarı |
| **Ev İçi Bilgiler** | Bina kalitesi, rutubet, yalıtım, duvar kontrolü |
| **Ev Alma** | Ev satın alma, tapu, imar, kat mülkiyeti, iskan |
| **Ev Kiralama** | Kiralık ev, kontrat, taşınma |
| **Ev Eşyaları** | Beyaz eşya, elektronik, mutfak gereçleri, marka önerileri |

### giyim — Giyim (👔)
| Kategori | Anahtar Konular |
|---|---|
| **Genel** | Kumaş türleri, kıyafet seçimi, takım elbise |
| **Ayakkabı** | Ayakkabı markaları, seçimi |
| **Mont** | Mont, katman giyim, gore-tex |

### arsa — Arsa (🌍)
| Kategori | Anahtar Konular |
|---|---|
| **Arsa** | Arsa yatırımı, tapu, imar, tarla, kadastro |

### araba — Araba (🚗)
| Kategori | Anahtar Konular |
|---|---|
| **Kaza** | Trafik kazası, tutanak, sigorta, TRAMER |
| **Sürüş** | Sürüş teknikleri, güvenlik, klima kullanımı |
| **Araç Malzemeleri** | Lastik, motor yağı, yedek parça, araç kamerası |
| **Araç Yıkama** | Araç temizliği, bakım ürünleri |
| **Alım Satım** | Araç alım satım, ekspertiz, fiyat değerleme |
| **Kiralama** | Araç kiralama |

### bankacilik — Bankacılık (🏦)
| Kategori | Anahtar Konular |
|---|---|
| **Genel** | Kredi kartı, dolandırıcılık, güvenlik |
| **Kredi Notu** | Kredi notu artırma, kredi skoru |

### hukuk — Hukuk (⚖️)
| Kategori | Anahtar Konular |
|---|---|
| **Hukuk** | Şikayet, dilekçe, SGK, çalışan hakları |

## Adım 3: Duplike Kontrolü

`src/data/life-tips.js` dosyasını oku ve ipucunun özü zaten mevcut mu kontrol et. Varsa kullanıcıya bildir, ekleme.

## Adım 4: Ekleme

İlgili kategorinin `items` dizisinin **sonuna** string olarak ekle:

```js
'İpucu metni',
```

## Tek Not Kuralı

Kullanıcı birbiriyle ilişkili birden fazla bilgi verirse (adım adım talimat + öneri + adres, ya da açıklama + kaynak + detay gibi), bunları **tek bir string olarak birleştir**. Ayrı item'lara bölme. Her `items` girişi bağımsız ve eksiksiz bir not olmalı.

## Metin Temizleme

- Tab/kategori ipucunu ve `/life-tips` prefix'ini kaldır
- Gereksiz boşlukları temizle
- Metin olduğu gibi korunsun, yeniden yazma veya özetleme
- Single quote'ları escape et (`'` → `\'`)

## Onay Formatı

```
Eklendi: life-tips.js → [tab label] → [kategori]
```
