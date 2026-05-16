---
name: eng
description: İngilizce kelime eklemek için kullanılır. /eng komutu ile tetiklenir. Kelimeyi Türkçe veya İngilizce verilebilir, tam karşılığı, örnek cümlesi ve çevirisiyle birlikte src/data/english-words.js dosyasına ekler.
---

# İngilizce Kelime Ekle

Kullanıcı bir kelime verdiğinde (Türkçe veya İngilizce), o kelimenin tam karşılığını, örnek cümlesini ve çevirisini oluşturup `src/data/english-words.js` dosyasına ekler.

## Tetikleme

- Kullanıcı `/eng` komutu kullandığında

## Ekleme Adımları

1. `src/data/english-words.js` dosyasını oku
2. Kelimenin zaten listede olup olmadığını kontrol et (varsa kullanıcıya bildir, ekleme)
3. Kelimeyi tam olarak hazırla (aşağıdaki format)
4. `englishWords` dizisinin **sonuna** ekle
5. Kullanıcıya kısa onay ver

## Kelime Hazırlama

Kullanıcı Türkçe veya İngilizce bir kelime/deyim verebilir. Sen şunları hazırla:

- **english**: Kelimenin İngilizce hali (küçük harf)
- **turkish**: Türkçe karşılığı (birden fazla anlam varsa virgülle ayır)
- **example**: Doğal ve günlük hayatta kullanılabilir bir İngilizce örnek cümle (kelimenin anlamını net gösteren)
- **example_turkish**: Örnek cümlenin Türkçe çevirisi

## Format

```js
{ english: 'kelime', turkish: 'karşılık', example: 'Example sentence.', example_turkish: 'Örnek cümle çevirisi.' },
```

Tek satırda, dizinin sonundaki `]` öncesine ekle.

## Kurallar

- Kelime zaten varsa ekleme, kullanıcıya "Bu kelime zaten listede" de
- Örnek cümle doğal olsun, yapay veya ders kitabı gibi durmasın
- Türkçe karşılık kısa ve öz olsun
- Phrasal verb veya deyimler de eklenebilir (örn: "get away with", "break down")
- Kullanıcı birden fazla kelime verirse her birini ayrı ekle

## Örnekler

Kullanıcı: `/eng resilience`
→ Ekle:
```js
{ english: 'resilience', turkish: 'dayanıklılık, esneklik', example: 'Her resilience after losing everything was truly inspiring.', example_turkish: 'Her şeyi kaybettikten sonraki dayanıklılığı gerçekten ilham vericiydi.' },
```
Yanıt: "Eklendi: resilience (dayanıklılık, esneklik)"

Kullanıcı: `/eng göz ardı etmek`
→ Ekle:
```js
{ english: 'overlook', turkish: 'göz ardı etmek, gözden kaçırmak', example: 'It's easy to overlook small details when you're in a rush.', example_turkish: 'Aceledeyken küçük detayları göz ardı etmek kolaydır.' },
```
Yanıt: "Eklendi: overlook (göz ardı etmek, gözden kaçırmak)"
