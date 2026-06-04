---
name: not
description: Kısa not, alıntı veya bilgi eklemek için kullanılır. /not komutu ile tetiklenir. Notları analiz edip src/data/personal/ altındaki doğru dosya ve kategoriye yerleştirir.
---

# Not Ekle

Kullanıcı `/not` komutu ile bir not verdiğinde, içeriği analiz edip `src/data/personal/` altındaki doğru JS dosyasına ve alt kategoriye ekler.

## Adım 1: Kategori İpucu Tespiti

Kullanıcı notun başında bir kategori ipucu yazabilir. İpucu varsa öncelikli olarak kullan:

**Üst kategori ipuçları** (dosyayı belirler, alt kategoriyi içerikten çıkar):
`sağlık`, `saglik`, `ilişkiler`, `iliskiler`, `kişisel`, `kisisel`, `money`, `para`, `toplum`, `trivia`, `quotes`, `ai`

**Alt kategori ipuçları** (hem dosyayı hem alt kategoriyi belirler):
`beslenme` → saglik.js/Beslenme, `mutfak` → saglik.js/Mutfak, `takviye` → saglik.js/Takviyeler, `bakım` → saglik.js/Bakım, `hastalık` → saglik.js/Hastalıklar
`mindset` → kisisel-gelisim.js/Mindset, `kariyer` → kisisel-gelisim.js/İş & Kariyer
`kadın` → iliskiler.js/Kadınlar
`iletişim` → money.js/İletişim, `network` → money.js/Networking, `insan ilişkileri` → money.js/İnsan İlişkileri
`business` → money.js/Business, `ecommerce` → money.js/Business, `e-commerce` → money.js/Business, `marketing` → money.js/Marketing, `finance` → money.js/Finance, `ideas` → money.js/Ideas

İpucu bulunduysa metinden çıkar (ipucu notun parçası değil).

## Adım 2: İçerik Analizi (ipucu yoksa)

Notun içeriğine bakarak hedef dosya ve alt kategoriyi belirle:

### saglik.js — Sağlık
| Alt Kategori | Anahtar Konular |
|---|---|
| **Temel Sağlık** | Uyku, nefes, stres, fiziksel aktivite, egzersiz, spor, sauna, dopamin |
| **Beslenme** | Yeme-içme, besin değerleri, gıda kalitesi, sebze, meyve, et, yağ, su içme, oruç |
| **Mutfak** | Pişirme teknikleri, gıda güvenliği, restoran, saklama, şarküteri |
| **Takviyeler** | Vitamin, mineral, supplement, kreatin, magnezyum, omega-3, D3K2, B12 |
| **Bakım** | Cilt, saç, diş, güneş kremi, egzema, oil pulling |
| **Hastalıklar** | İç sağlık, insülin direnci, antibiyotik, hastane sistemi, glikasyon |

### kisisel-gelisim.js — Kişisel Gelişim
| Alt Kategori | Anahtar Konular |
|---|---|
| **İş & Kariyer** | İş, girişimcilik, startup, kariyer, maaş, verimlilik, liderlik, feedback |
| **Mindset** | Kişisel motivasyon, cesaret, alışkanlıklar, özgüven, eyleme geçme, disiplin, aile, ebeveynlik, retorik — şahsi karaktere uygulanacak notlar |

### iliskiler.js — Kadınlar
| Alt Kategori | Anahtar Konular |
|---|---|
| **Kadınlar** | Kadın-erkek ilişkileri, flört, evlilik |

### money.js — Life
| Alt Kategori | Anahtar Konular |
|---|---|
| **Business** | Ticaret, iş hayatı, e-ticaret, müşteri yönetimi, tedarikçi, muhasebe, risk yönetimi, çalışan yönetimi |
| **Marketing** | Pazarlama, reklam, sosyal medya, growth hacking, SEO, içerik pazarlama, marka, dikkat çekme |
| **Finance** | Yatırım, borsa, kripto, bütçe, tasarruf, finansal okuryazarlık |
| **Ideas** | İş fikirleri, girişim fırsatları, yan gelir, niş alanlar, SaaS |
| **İletişim** | İkna, müzakere, beden dili, konuşma teknikleri, güven oluşturma, çatışma yönetimi |
| **Networking** | Sosyal ağ kurma, ilişki yönetimi, networking stratejileri |
| **İnsan İlişkileri** | Dostluk, sosyal bağlar, empati, çatışma çözümü, toplumsal ilişkiler |

### toplum.js — Toplum & Dünya
| Alt Kategori | Anahtar Konular |
|---|---|
| **Toplum & Dünya** | Tarih, politika, felsefe, ekonomi, medeniyet, güç dinamikleri, toplumsal gözlemler, kültürel analizler, varoluşsal konular |

### trivia.js — Trivia
| Alt Kategori | Anahtar Konular |
|---|---|
| **Trivia** | Genel kültür, ilginç bilgiler, fun facts, bilimsel merak, psikoloji deneyleri |

### quotes.js — Quotes
| Alt Kategori | Anahtar Konular |
|---|---|
| **Quotes** | Kısa (1-2 cümle), ilham verici, özlü sözler ve alıntılar |

### ai.js — AI
| Alt Kategori | Anahtar Konular |
|---|---|
| **AI Agents & Workflow** | AI ajanları, otomasyon, workflow, takım stratejileri |
| **Prompting & Kullanım** | Prompt mühendisliği, AI kullanım teknikleri, kod kalitesi |
| **Modeller & Teknoloji** | Model karşılaştırmaları, benchmark, fine-tuning, RAG |
| **Araçlar & Ürünler** | AI araçları, platformlar, MCP, IDE entegrasyonları |
| **Sektör & Trendler** | AI sektör haberleri, trendler, etik |

## Adım 3: Duplike Kontrolü

Hedef dosyayı oku ve notun özü zaten mevcut mu kontrol et. Varsa kullanıcıya bildir, ekleme.

## Adım 4: Ekleme

### saglik.js formatı (subItems destekler):
```js
{ text: 'Not metni', subItems: [] },
```

### Diğer tüm dosyalar (flat string):
```js
'Not metni',
```

İlgili kategorinin `items` dizisinin **sonuna** ekle.

## Metin Temizleme

- Kategori ipucunu ve `/not` prefix'ini kaldır
- Gereksiz boşlukları temizle
- Metin olduğu gibi korunsun, yeniden yazma veya özetleme
- Single quote'ları escape et (`'` → `\'`)

## Yazar/Kaynak

- Metnin sonunda "- İsim" veya "(İsim)" varsa:
  - quotes.js için → " — Yazar" olarak metnin sonuna ekle
  - Diğer dosyalar için → metnin içinde bırak

## Kısa Söz mü Uzun Not mu?

- 1-2 cümlelik, ilham verici, özlü → `quotes.js`
- Pratik bilgi, tavsiye, detaylı açıklama → ilgili konu dosyası

## Onay Formatı

```
Eklendi: [dosya].js → [alt kategori]
```
