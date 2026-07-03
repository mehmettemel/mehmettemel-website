---
name: analiz
description: Gıda araştırma çıktılarından (gida-arastirma/output/<konu>/) reviews sayfası için görsel olarak zengin, blok tabanlı analiz yazısı üretir. /analiz komutu ile tetiklenir. Recharts grafikleri ve framer-motion animasyonlu bloklarla sayfa oluşturur.
---

# Analiz Yazısı Üret

Kullanıcı `/analiz <klasör-yolu>` verdiğinde, araştırma çıktılarını okuyup
`src/data/reviews/<slug>.js` blok dosyası üretir ve registry'ye kaydeder.
Render altyapısı hazırdır: `src/components/review-blocks/ReviewArticle.jsx`
(Recharts + framer-motion). Skill YALNIZCA veri dosyası üretir — bileşen
yazmaz.

## Adım 1: Kaynakları Oku

Klasörde genellikle şunlar bulunur (hepsi olmayabilir):

| Dosya | İçerik | Kullanım |
|---|---|---|
| `taslak.md` | Kanıt dereceli ([güven: X], claim_id'li) metin taslağı | prose blokları + genel yapı |
| `infografik-verileri.json` | Dataset'ler (süreç, karşılaştırma, porsiyon, mit, güvenlik, kanıt haritası) | görsel bloklar |
| `infografik-fikirleri.md` | Hangi dataset hangi görsel formata uygun | blok tipi seçimi |
| `etkilesim-matrisi.json` | Gıda-gıda / gıda-ilaç etkileşimleri | dataTable |
| `saklama-tablosu.json` | Saklama koşulları | dataTable veya flowChecklist |
| `rapor.html` | Ham rapor | gerekirse ek bağlam |

## Adım 2: Bilgi Seçimi (en güçlü bilgiler)

- **confidence sıralaması:** strong > moderate > weak > speculative.
- Hero istatistikleri ve ana iddialar strong/moderate'ten seçilir.
- weak/speculative bilgi ATILMAZ ama: (a) `confidence` alanı mutlaka yazılır
  — renderer kesik çizgili çerçeveyle işaretler, (b) hero'da tekilse dikkat
  çekici değere izin var ama çoğunluk olamaz.
- `conflict: true` işaretli iddialarda iki tarafı da yaz (kurum ayrılıkları).
- `myth_busting: true` verileri compareBars item'ında `mythBusting: true` yap.
- Sayı uydurma; yalnızca kaynaktaki değerleri kullan.

## Adım 3: Blok Kataloğu

`blocks` dizisine şu tiplerden uygun olanları koy (sıra: özet → süreç/mekanizma
→ karşılaştırma → interaktif → mitler → güvenlik → tablo → pratik özet →
kanıt haritası):

```js
{ type: 'prose', title, body: ['**kalın** destekli paragraflar'] }
{ type: 'processStrip', title, subtitle, steps: [{ step, detail }] }        // süreç/zaman şeridi
{ type: 'compareBars', title, subtitle, labels: { a, b },
  items: [{ metric, unit, a: sayı, b: sayı, verdict, confidence, mythBusting? }],
  footnote? }                                                               // A/B bar grafikleri
{ type: 'portionGuide', title, subtitle, maxGrams,
  groups: [{ id, label, amount, detail, grams, confidence, conflict? }],
  whyNote }                                                                 // interaktif gauge
{ type: 'mythCards', title, cards: [{ myth, fact, confidence }] }           // flip kartlar
{ type: 'flowChecklist', title, subtitle,
  sections: [{ title, items: [{ check, result, danger? }] }] }              // ✓/✕ kontrol listesi
{ type: 'dataTable', title, subtitle, columns: [...],
  rows: [{ cells: [...], danger? }], note? }
  // son hücre 'strong|moderate|weak|speculative' ise rozet olarak çizilir
{ type: 'callout', tone: 'tip', title, body: ['madde', ...] }               // pratik özet
{ type: 'evidenceMap', title, subtitle,
  byConfidence: { strong, moderate, weak, speculative },
  byCategory: { 'Kategori Adı': sayı }, note }                              // şeffaflık (en sona)
```

Üst alanlar:

```js
export const review = {
  slug, title, subtitle, emoji, date: 'YYYY-MM-DD', category: 'gida',
  tags: [...], readingHint: 'N iddia · M infografik · kanıt dereceli',
  heroStats: [{ value: '2-5', unit: 'yıl', label, confidence }], // 4 adet
  blocks: [...],
}
```

Örnek dosya: `src/data/reviews/konserve-balik.js` — formatın kanonik örneği.

## Adım 4: Kayıt

`src/data/reviews/index.js` içine import ekle ve `richReviews` dizisine koy:

```js
import { review as yeniSlug } from './yeni-slug'
export const richReviews = [konserveBalik, yeniSlug]
```

Liste sayfası ve `/reviews/[slug]` route'u otomatik alır; başka dosyaya
dokunma.

## Adım 5: Doğrulama

1. `npx next build` — hata yok.
2. Preview'da `/reviews/<slug>` aç: hero istatistikleri, grafikler ve
   mit kartları render oluyor mu ekran görüntüsüyle bak.
3. weak/speculative bloklarda kesik çizgi görünüyor mu kontrol et.

## Kurallar

- Metin dili Türkçe; ölçü birimleri kaynaktan aynen.
- Her sayısal görselde `confidence` zorunlu.
- Kaynak klasördeki dosyalara dokunma (salt okunur).
- Onay sorma; üret, kaydet, build + görsel doğrulama yap, özetle.
