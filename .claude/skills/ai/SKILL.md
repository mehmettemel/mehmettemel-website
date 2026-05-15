---
name: ai
description: Yapay zeka ile ilgili notları data/personal/ai.md dosyasına ekler. /ai komutu ile tetiklenir. Notları uygun kategoriye (H2 başlık altına) yerleştirir.
---

# AI Not Ekle

Kullanıcı yapay zeka ile ilgili bir not, bilgi veya alıntı verdiğinde bunu `data/personal/ai.md` dosyasına ekler.

## Tetikleme

Bu skill şu durumlarda kullanılır:
- Kullanıcı `/ai` komutu kullandığında

## Kategori Belirleme

Notun içeriğine göre mevcut H2 başlıklarından birine ekle:

- **AI Agents & Workflow**: AI ajanları, otomasyon, workflow entegrasyonu, takım stratejileri, agent mimarisi
- **Prompting & Kullanım**: Prompt mühendisliği, AI kullanım teknikleri, best practice'ler, kod kalitesi
- **Modeller & Teknoloji**: Model karşılaştırmaları, yeni modeller, teknik gelişmeler, benchmark'lar, fine-tuning, RAG, embedding
- **Araçlar & Ürünler**: AI araçları, uygulamalar, platformlar, MCP, IDE entegrasyonları
- **Sektör & Trendler**: AI sektör haberleri, trendler, tahminler, etik, regülasyon, iş dünyası etkileri

Eğer hiçbir kategori uymuyorsa en yakın olanı seç. Yeni kategori oluşturma.

## Ekleme Adımları

1. `data/personal/ai.md` dosyasını oku
2. Notun hangi kategoriye ait olduğunu belirle
3. İlgili H2 başlığının altına yeni bir madde (`- `) olarak ekle
4. Maddeler bullet point formatında olsun
5. Kullanıcıya kısa onay ver

## Format

```markdown
## Kategori Adı

- Mevcut not 1
- Mevcut not 2
- YENİ NOT BURAYA
```

## Metin Temizleme

- Gereksiz boşlukları temizle
- Metin olduğu gibi korunsun, yeniden yazma veya özetleme
- Çok uzun metinlerde orijinal anlamı koruyarak kısaltılabilir

## Birden Fazla Not

Kullanıcı birden fazla not verirse:
- Her notu ayrı bir madde olarak ekle
- Her birini doğru kategoriye yerleştir

## Örnek

Kullanıcı: "/ai Claude 4.5 Sonnet, önceki modele göre %40 daha hızlı ve coding benchmark'larında SOTA"

→ `## Modeller & Teknoloji` altına ekle:
```markdown
- Claude 4.5 Sonnet, önceki modele göre %40 daha hızlı ve coding benchmark'larında SOTA
```

Yanıt: "Eklendi: Modeller & Teknoloji kategorisine 1 not"
