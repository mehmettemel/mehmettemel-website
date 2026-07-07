---
name: food
description: Food notlar grafiğine (Obsidian-tarzı /reviews/food) yeni gıda notu ekler. /food komutu ile tetiklenir. Notu analiz edip src/data/food-notes.js dosyasına bir node olarak ekler ve mevcut notlarla anlamsal ilişki kurup links'e bağlar.
---

# Food Not Ekle

Kullanıcı `/food` komutu ile bir gıda notu verdiğinde, notu `src/data/food-notes.js`
dosyasına bir **node** olarak ekler ve **mevcut notlarla anlamsal olarak
ilişkilendirip** `links`'e bağlar. Sayfa: `/reviews/food` (Obsidian-tarzı
kuvvet-yönlü grafik). Skill YALNIZCA veri dosyasını düzenler; bileşene dokunmaz.

## Veri Yapısı

```js
export const nodes = [
  {
    id: 'kebab-case-benzersiz-id',
    title: 'Kısa Başlık',        // 1-4 kelime, grafikte etiket olarak görünür
    tags: ['etiket1', 'etiket2'], // 1-3 küçük harf etiket
    body: 'Notun tam metni.',     // kullanıcının verdiği metin, olduğu gibi
  },
]

export const links = [
  { source: 'id-a', target: 'id-b' }, // iki notu birbirine bağlar
]
```

## Adım 1: Mevcut Notları Oku

`src/data/food-notes.js`'i oku. Var olan tüm `nodes`'u (id, title, tags, body)
ve `links`'i incele. Yeni notu bunlarla ilişkilendireceksin.

## Adım 2: Node Oluştur

- **id**: başlıktan türet, kebab-case, Türkçe karakterleri sadeleştir
  (ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u). Mevcut id'lerle çakışmasın.
- **title**: notun özünü veren 1-4 kelimelik kısa başlık. Grafikte nokta
  etiketi olarak görüneceği için kısa tut (örn. "Ultra-işlenmiş Ekmek",
  "Zeytinyağı", "Konserve Balık").
- **tags**: 1-3 adet küçük harf etiket. Gıda türü, konu veya kategori
  (örn. `ekmek`, `market`, `ultra-işlenmiş`, `yağ`, `protein`, `saklama`).
- **body**: kullanıcının verdiği metin. Olduğu gibi koru, yeniden yazma veya
  özetleme. Sadece `/food` prefix'ini ve varsa baştaki ipucunu temizle.
  Single quote'ları escape et (`'` → `\'`).

## Adım 3: İlişkilendirme (en önemli kısım)

Yeni notu mevcut notlarla **anlamsal olarak** bağla. İki not arasında gerçek
bir kavramsal ilişki varsa `links`'e `{ source: yeniId, target: mevcutId }`
ekle. İlişki türleri:

- **Aynı gıda / malzeme**: ikisi de ekmek, ikisi de zeytinyağı, vb.
- **Ortak kavram**: "ultra-işlenmiş", "katkı maddesi", "fermantasyon",
  "raf ömrü", "omega-3" gibi ortak temalar
- **Karşıtlık / alternatif**: biri diğerinin sağlıklı alternatifi
  (Wasa ekmek ↔ ultra-işlenmiş ekmek gibi)
- **Neden-sonuç / mekanizma**: biri diğerinin sebebini/mekanizmasını açıklıyor

Kurallar:
- Zorlama bağ kurma. Gerçek bir ilişki yoksa bağlama — grafiğin okunur
  kalması için gevşek bağlantı iyidir, spagetti kötüdür.
- Bir not 0, 1 veya birkaç nota bağlanabilir. İlk not tek başınaysa
  `links` boş kalır, sorun değil.
- En güçlü 1-3 ilişkiyi seç, her şeyi her şeye bağlama.
- Bağ kurduğun her ilişki için kullanıcıya kısa gerekçe söyle.

## Adım 4: Ekleme

- Yeni node'u `nodes` dizisinin **sonuna** ekle.
- İlişkileri `links` dizisine ekle (`source` her zaman yeni not, `target`
  mevcut not).
- Dosyanın kompakt stilini koru (mevcut node formatına uy).
- Geçerli JS kalmalı: virgüller, tırnaklar doğru.

## Adım 5: Duplike Kontrolü

Aynı gıda/konu zaten bir node olarak varsa yeni node açma. Bunun yerine:
- Mevcut node'un `body`'sine yeni bilgiyi ekle (birleştir), ya da
- Konu farklıysa yeni node aç ama mevcutla ilişkilendir.
Kullanıcıya hangisini yaptığını bildir.

## Onay Sorma

Onay sorma; notu ekle, ilişkileri kur, sonucu bildir.

## Onay Formatı

```
Eklendi: food-notes.js → [başlık]
Bağlandı: [başlık] ↔ [ilişkili not] (gerekçe)
```

İlişki yoksa:

```
Eklendi: food-notes.js → [başlık] (henüz bağ yok, tek başına)
```
