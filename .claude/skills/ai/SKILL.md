---
name: ai
description: Yapay zeka ile ilgili notları src/data/personal/ai.js dosyasına ekler. /ai komutu ile tetiklenir. Notları uygun kategoriye yerleştirir.
---

# AI Not Ekle

Kullanıcı yapay zeka ile ilgili bir not verdiğinde bunu `src/data/personal/ai.js` dosyasına ekler.

## Tetikleme

- Kullanıcı `/ai` komutu kullandığında

## Kategori Belirleme

Notun içeriğine göre mevcut kategorilerden birine ekle:

- **AI Agents & Workflow**: AI ajanları, otomasyon, workflow, takım stratejileri, agent mimarisi
- **Prompting & Kullanım**: Prompt mühendisliği, AI kullanım teknikleri, kod kalitesi
- **Modeller & Teknoloji**: Model karşılaştırmaları, yeni modeller, benchmark, fine-tuning, RAG
- **Araçlar & Ürünler**: AI araçları, uygulamalar, platformlar, MCP, IDE entegrasyonları
- **Sektör & Trendler**: AI sektör haberleri, trendler, tahminler, etik, iş dünyası

## Ekleme Formatı

`src/data/personal/ai.js` dosyasında kategoriler şu formatta:

```js
'Kategori Adı': {
  label: 'Kategori Adı',
  items: [
    'mevcut not 1',
    'mevcut not 2',
    'YENİ NOT BURAYA',  // ← sonuna ekle
  ]
}
```

## Ekleme Adımları

1. `src/data/personal/ai.js` dosyasını oku
2. Kategoriyi belirle
3. İlgili kategorinin `items` dizisinin sonuna flat string olarak ekle
4. Single quote'ları escape et
5. Kullanıcıya kısa onay ver: "Eklendi: ai.js → [kategori]"

## Metin Temizleme

- Metin olduğu gibi korunsun, yeniden yazma veya özetleme
- Single quote'ları escape et (`'` → `\'`)

## Örnek

Kullanıcı: `/ai Claude 4.5 Sonnet coding benchmark'larında SOTA`

→ `src/data/personal/ai.js` → **Modeller & Teknoloji** kategorisine ekle:
```js
'Claude 4.5 Sonnet coding benchmark\'larında SOTA',
```

Yanıt: "Eklendi: ai.js → Modeller & Teknoloji"
