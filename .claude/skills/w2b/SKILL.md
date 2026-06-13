---
name: w2b
description: W2B (Where to Buy) sayfasına ürün/marka veya "ne nereden alınır" önerisi eklemek için kullanılır. /w2b komutu ile tetiklenir. Öneriyi analiz edip src/data/w2b.json dosyasındaki doğru kategoriye ekler.
---

# W2B Ekle

Kullanıcı `/w2b` komutu ile bir ürün/marka önerisi verdiğinde, içeriği analiz edip `src/data/w2b.json` dosyasındaki doğru kategoriye ekler. W2B = "Where to Buy" — hangi ürün hangi markadan / nereden alınır listesi.

## Veri Yapısı

`src/data/w2b.json`:

```json
{
  "title": "W2B",
  "subtitle": "Hangi ürün, hangi markadan?",
  "categories": [
    {
      "label": "Kategori Adı",
      "emoji": "🏠",
      "items": [
        { "product": "Ürün adı", "brands": ["Marka1", "Marka2"], "note": "Opsiyonel açıklama." }
      ]
    }
  ]
}
```

Her item:
- **product** (zorunlu): ne alınacağı (örn. "Tıraş makinesi", "Lastik")
- **brands** (zorunlu, dizi): önerilen marka(lar). Bir site/link ise `{ "name": "...", "href": "https://..." }` formatında olabilir. Markasız öneri W2B'ye eklenmez (markasız genel tavsiye life-tips'e gider).
- **note** (opsiyonel): model, renk, dikkat edilecek nokta, "neden" gibi ek bilgi.

## Adım 1: Kategori İpucu Tespiti

Kullanıcı metnin başında bir kategori ipucu yazabilir. Varsa öncelikli kullan:

| İpucu | Kategori (label) |
|---|---|
| `ev`, `elektronik`, `ev eşya`, `eşya`, `mutfak`, `beyaz eşya` | Ev & Elektronik |
| `giyim`, `ayakkabı`, `mont`, `kıyafet`, `tekstil` | Giyim & Ayakkabı |
| `araba`, `araç`, `oto`, `lastik`, `araç malzeme` | Araba |
| `güzellik`, `sağlık`, `kozmetik`, `bakım`, `cilt` | Güzellik & Sağlık |

İpucu bulunduysa metinden çıkar (ipucu önerinin parçası değil).

## Adım 2: İçerik Analizi (ipucu yoksa)

İpucu yoksa içeriğe bakarak kategoriyi belirle:

### Ev & Elektronik (🏠)
Beyaz eşya, elektronik, mutfak gereçleri, TV, klima, süpürge, yatak, havlu, aydınlatma, ev aletleri.

### Giyim & Ayakkabı (👔)
Takım elbise, ayakkabı, mont, kıyafet, tekstil markaları, karşılaştırma siteleri.

### Araba (🚗)
Lastik, motor yağı, yedek parça, araç kamerası, oto bakım/temizlik ürünleri.

### Güzellik & Sağlık (💄)
Kozmetik, cilt bakımı, klinik cihaz, sağlık ürünleri, supplement markaları.

Hiçbirine net uymuyorsa (örn. "ofis", "bebek", "hobi") yeni bir kategori oluştur: `categories` dizisine uygun bir `label` + `emoji` ile yeni obje ekle.

## Adım 3: Ayrıştırma (product / brands / note)

Metni şu parçalara ayır:

- **product**: ne alınacağı. Genelde ayraçtan (`→`, `:`, `-`, "markası", "için") önceki kısım ya da cümlenin öznesi.
- **brands**: önerilen marka(lar). Ayraçtan sonraki kısım. Birden fazlaysa `,` `/` `-` `ve` ile ayır, her birini ayrı string yap.
- **note**: ürün+marka dışındaki açıklama, model, renk, uyarı varsa note'a koy.
- **Link**: URL verilmişse o markayı `{ "name": "site.com", "href": "https://..." }` yap.

Örnekler:
- `/w2b matkap Bosch` → `{ "product": "Matkap", "brands": ["Bosch"] }`
- `/w2b araba lastik Michelin, Continental — çukurlu yolda Michelin alma` → Araba kategorisine `{ "product": "Lastik", "brands": ["Michelin", "Continental"], "note": "Çukurlu yolda Michelin alma." }`
- `/w2b kahve makinesi DeLonghi, çok iyi köpük yapıyor` → Ev & Elektronik'e `{ "product": "Kahve makinesi", "brands": ["DeLonghi"], "note": "Çok iyi köpük yapıyor." }`

## Adım 4: Duplike / Birleştirme Kontrolü

`src/data/w2b.json`'u oku ve hedef kategoride aynı `product` var mı bak:
- **Ürün yoksa**: yeni item olarak ekle.
- **Ürün varsa**: yeni markalardan mevcut olmayanları o item'ın `brands` dizisine ekle (markaları birleştir, duplike etme). Varsa yeni bir not bilgisini ekle/güncelle. Yeni satır açma.

## Adım 5: Ekleme

İlgili kategorinin `items` dizisinin **sonuna** dosyadaki kompakt tek-satır JSON stilini koruyarak ekle:

```json
{ "product": "...", "brands": ["..."], "note": "..." }
```

- Bir önceki item satırının sonuna `,` koymayı unutma (geçerli JSON kalmalı).
- String içindeki çift tırnakları escape et (`"` → `\"`).
- Türkçe karakterler olduğu gibi kalsın.

## Onay Sorma

Onay sorma; duplike yoksa direkt ekle. (Aynı /not akışı gibi.)

## Onay Formatı

```
Eklendi: w2b.json → [kategori] → [ürün]
```

Birleştirme yapıldıysa:

```
Güncellendi: w2b.json → [kategori] → [ürün] (marka eklendi: ...)
```
