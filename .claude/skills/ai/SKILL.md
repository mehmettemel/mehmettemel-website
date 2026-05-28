---
name: ai
description: Yapay zeka, finans veya gelecek öngörülerini src/data/personal/future-insights.js dosyasına ekler. /ai komutu ile tetiklenir.
---

# Future Insights Not Ekle

Kullanıcı `/ai` komutu ile yapay zeka, finans veya gelecek öngörüsü verdiğinde `src/data/personal/future-insights.js` dosyasına ekler.

## Kategoriler

| Alt Kategori | Anahtar Konular |
|---|---|
| **AI & Teknoloji** | AI trendleri, sentetik veri, model gelişimi, otomasyon öngörüleri |
| **Ekonomi & Finans** | Faiz oranları, yatırım, makroekonomi, AGI'nin ekonomik etkileri |

## Format

Flat string olarak ilgili kategorinin `items` dizisinin **sonuna** ekle:
```js
'Not metni',
```

## Adımlar

1. `src/data/personal/future-insights.js` dosyasını oku
2. Duplike kontrolü yap
3. Kategoriyi belirle
4. İlgili kategorinin `items` sonuna ekle
5. Single quote'ları escape et (`'` → `\'`)
6. Onay: "Eklendi: future-insights.js → [kategori]"
