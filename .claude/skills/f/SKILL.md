---
name: f
description: Future notlar grafiğine (/f) yeni gelecek notu ekler. /f komutu ile tetiklenir. Notu analiz edip src/data/future-notes.js dosyasına bir node olarak ekler ve mevcut notlarla anlamsal ilişki kurup links'e bağlar.
---

# Future Not Ekle

Kullanıcı `/f` komutu ile bir gelecek notu verdiğinde, notu `src/data/future-notes.js`
dosyasına bir **node** olarak ekler ve **mevcut notlarla anlamsal olarak
ilişkilendirip** `links`'e bağlar. Sayfa: `/future` (giriş gerekli): notlar kategoriye (etiket) göre
kart ızgarası olarak listelenir, arama ve kategori filtresi vardır; `links`
notun modalında "Bağlantılı" olarak görünür. Skill YALNIZCA veri dosyasını düzenler; bileşene dokunmaz.

## Veri Yapısı

```js
export const nodes = [
  {
    id: 'kebab-case-benzersiz-id',
    title: 'Kısa Başlık',        // 1-4 kelime, grafikte etiket olarak görünür
    tags: ['kategori'],           // tek etiket, 11 genel kategoriden biri
    body: 'Notun tam metni.',     // kullanıcının verdiği metin, olduğu gibi
  },
]

export const links = [
  { source: 'id-a', target: 'id-b' }, // iki notu birbirine bağlar
]
```

## Adım 1: Mevcut Notları Oku

`src/data/future-notes.js`'i oku. Var olan tüm `nodes`'u (id, title, tags, body)
ve `links`'i incele. Yeni notu bunlarla ilişkilendireceksin.

## Adım 2: Node Oluştur

- **id**: başlıktan türet, kebab-case, Türkçe karakterleri sadeleştir
  (ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u). Mevcut id'lerle çakışmasın.
- **title**: notun özünü veren 1-4 kelimelik kısa başlık. Grafikte nokta
  etiketi olarak görüneceği için kısa tut (örn. "Prompt Caching",
  "Ajan Döngüsü", "Context Penceresi").
- **tags**: 1 adet küçük harf etiket (kategori).
  (TEK etiket, şu 11 genel kategoriden biri: `fırsat`, `ai`, `toplum`, `finans`, `strateji`, `satış`, `pazarlama`, `network`, `ekip`, `operasyon`, `kariyer`. Yeni etiket icat etme; hiçbiri uymuyorsa en yakınını seç.

  **`fırsat` = gelecek vadeden işler.** Gelecekte büyüyecek, para kazandıracak ya da değer kazanacak iş / sektör / meslek / niş öngörüleri bu etikete gider (örn. "renovasyon patlayacak", "geri dönüşüm sektörü", "zenginlere hizmet", "insana özgü meslekler"). Not hem `fırsat` hem başka bir kategoriye uyuyorsa (örn. bir AI öngörüsü ama aynı zamanda iş fırsatı) ve ana fikri "şu iş / sektör kazanacak" ise `fırsat` seç; ana fikri teknolojinin ya da toplumun nasıl değişeceğiyse `ai` / `toplum` seç).
- **body**: kullanıcının verdiği metin. Olduğu gibi koru, yeniden yazma veya
  özetleme. Sadece `/f` prefix'ini ve varsa baştaki ipucunu temizle.
  Single quote'ları escape et (`'` → `\'`).

## Adım 3: İlişkilendirme (en önemli kısım)

Yeni notu mevcut notlarla **anlamsal olarak** bağla. İki not arasında gerçek
bir kavramsal ilişki varsa `links`'e `{ source: yeniId, target: mevcutId }`
ekle. İlişki türleri:

- **Aynı konu / araç**: ikisi de prompt yazımı, ikisi de aynı model, vb.
- **Ortak kavram**: "context", "tool use", "eval", "halüsinasyon",
  "maliyet" gibi ortak temalar
- **Karşıtlık / alternatif**: biri diğerinin alternatifi ya da çözümü
  (RAG ↔ uzun context gibi)
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

Aynı konu zaten bir node olarak varsa yeni node açma. Bunun yerine:
- Mevcut node'un `body`'sine yeni bilgiyi ekle (birleştir), ya da
- Konu farklıysa yeni node aç ama mevcutla ilişkilendir.
Kullanıcıya hangisini yaptığını bildir.

## Onay Sorma

Onay sorma; notu ekle, ilişkileri kur, sonucu bildir.

## Onay Formatı

```
Eklendi: future-notes.js → [başlık]
Bağlandı: [başlık] ↔ [ilişkili not] (gerekçe)
```

İlişki yoksa:

```
Eklendi: future-notes.js → [başlık] (henüz bağ yok, tek başına)
```
