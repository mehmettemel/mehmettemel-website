---
name: ai
description: Yapay zeka ile ilgili notları src/data/personal/ai.js dosyasına ekler. /ai komutu ile tetiklenir. Notları uygun kategoriye yerleştirir.
---

# AI Not Ekle

Kullanıcı `/ai` komutu ile yapay zeka ile ilgili bir not verdiğinde `src/data/personal/ai.js` dosyasına ekler.

## Kategoriler

| Alt Kategori | Anahtar Konular |
|---|---|
| **AI Agents & Workflow** | AI ajanları, otomasyon, workflow, takım stratejileri, agent mimarisi, AGENTS.md |
| **Prompting & Kullanım** | Prompt mühendisliği, AI kullanım teknikleri, kod kalitesi, code review |
| **Modeller & Teknoloji** | Model karşılaştırmaları, benchmark, fine-tuning, RAG, embedding |
| **Araçlar & Ürünler** | AI araçları, platformlar, MCP, IDE entegrasyonları |
| **Sektör & Trendler** | AI sektör haberleri, trendler, etik, sentetik veri |

## Format

Flat string olarak ilgili kategorinin `items` dizisinin **sonuna** ekle:
```js
'Not metni',
```

## Adımlar

1. `src/data/personal/ai.js` dosyasını oku
2. Duplike kontrolü yap
3. Kategoriyi belirle
4. İlgili kategorinin `items` sonuna ekle
5. Single quote'ları escape et (`'` → `\'`)
6. Onay: "Eklendi: ai.js → [kategori]"
