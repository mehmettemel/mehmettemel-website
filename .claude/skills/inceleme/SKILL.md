---
name: inceleme
description: İnceleme/araştırma sayfalarına not eklemek için kullanılır. /inceleme komutu ile tetiklenir. Mevcut content/ markdown dosyalarına yeni notlar ekler veya yeni inceleme sayfası oluşturur.
---

# İnceleme Notu Ekle

Kullanıcı bir kişi veya kitap hakkında not verdiğinde, ilgili `content/` markdown dosyasına ekler.

## Tetikleme

- Kullanıcı `/inceleme` komutu kullandığında
- Argümanlarda kaynak kişi/kitap adı ve not içeriği bulunur

## Kullanım Formatı

```
/inceleme [kaynak-adı] not içeriği buraya
```

Örnekler:
- `/inceleme huberman Sabah güneşine 10 dk çıkmak sirkadyen ritmi düzenler.`
- `/inceleme naval Seek wealth, not money or status.`
- `/inceleme antifragile Strese maruz kalan organizmalar güçlenir.`

## Kaynak Eşleştirme

Kullanıcının verdiği kaynak adını mevcut content/ dosyalarıyla eşleştir:

| Kullanıcı yazarsa | Dosya |
|---|---|
| huberman, andrew huberman | `content/andrew-huberman-notlari.md` |
| naval, naval ravikant | `content/naval-ravikant-notlari.md` |
| antifragile | `content/antifragile-notlari.md` |
| karpathy | `content/andrej-karpathy-software-3-0-ve-llmlerin-dogasi.md` |
| müftüoğlu, osman müftüoğlu | `content/osman-muftuoglu-notlari.md` |
| robert greene, greene | `content/robert-greene-notlari.md` |
| buyology | `content/buyology-notlari.md` |
| zaman algısı, zaman algisi | `content/kulturlerde-zaman-algisi.md` |

Eşleşme bulunamazsa → kullanıcıya sor veya yeni dosya oluştur.

## Ekleme Adımları

1. Kaynak adını eşleştir → ilgili markdown dosyasını bul
2. Dosyayı oku
3. Notun uygun bir başlık altına girip girmediğini değerlendir
4. Dosyanın SONUNA yeni bir `## Başlık` section'ı olarak ekle
5. Kullanıcıya kısa onay ver

## Ekleme Formatı

Dosyanın sonuna ekle:

```markdown

---

## Başlık (notun konusundan çıkar)

Not içeriği burada. Kullanıcının verdiği metni olduğu gibi koru.
```

## Birden Fazla Not

Kullanıcı birden fazla not verirse:
- Hepsini aynı dosyaya ekle
- Her biri ayrı `##` başlık altında olsun
- Aralarına `---` ayırıcı koy

## Yeni İnceleme Sayfası Oluşturma

Eğer kaynak için dosya yoksa, yeni dosya oluştur:

1. Dosya adı: `{slug}-notlari.md` (Türkçe karakterler İngilizce'ye çevrilir)
2. Frontmatter:
```yaml
---
title: "Kaynak Adı"
date: "YYYY-MM-DD"
description: "Kısa açıklama"
category: "kisiler" veya "kitaplar" veya "yazilim"
tags: ["ilgili", "taglar"]
author: "Yazar adı"
source: "Kaynak"
featured: false
---
```
3. Kategori seçimi:
   - Kişi ise → `kisiler`
   - Kitap ise → `kitaplar`
   - Kullanıcının kendi araştırması ise → `kisisel`

## Metin Kuralları

- Kullanıcının verdiği metni OLDUĞU GİBİ koru
- Yeniden yazma, özetleme, düzenleme YAPMA
- Sadece markdown formatlaması ekle (madde işaretleri, kalın yazı)
- Başlığı notun içeriğinden kısa ve açıklayıcı şekilde çıkar

## Örnek

Kullanıcı: `/inceleme huberman Soğuk duş stres hormonu kortizolü kısa süreli artırır ama uzun vadede stres toleransını yükseltir.`

→ `content/andrew-huberman-notlari.md` dosyasının sonuna ekle:

```markdown

---

## Soğuk Duş ve Stres Toleransı

Soğuk duş stres hormonu kortizolü kısa süreli artırır ama uzun vadede stres toleransını yükseltir.
```

Yanıt: "Eklendi: andrew-huberman-notlari.md"
