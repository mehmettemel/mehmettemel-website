---
name: not
description: Kısa not, alıntı veya bilgi eklemek için kullanılır. /not komutu ile tetiklenir. Notları analiz edip src/data/ altındaki doğru dosya ve kategoriye yerleştirir.
---

# Not Ekle

Kullanıcı `/not` komutu ile bir not verdiğinde, içeriği analiz edip doğru JS dosyasına ve alt kategoriye ekler.

## Adım 1: Kategori İpucu Tespiti

Kullanıcı notun başında bir kategori ipucu yazabilir. İpucu varsa öncelikli olarak kullan:

**Üst kategori ipuçları** (dosyayı belirler, alt kategoriyi içerikten çıkar):
`sağlık`, `saglik`, `ilişkiler`, `iliskiler`, `kişisel`, `kisisel`, `toplum`, `trivia`, `quotes`, `entrepreneur`, `girişim`, `girisim`

**Alt kategori ipuçları** (hem dosyayı hem alt kategoriyi belirler):
`beslenme` → saglik.js/Beslenme, `mutfak` → saglik.js/Mutfak, `takviye` → saglik.js/Takviyeler, `bakım` → saglik.js/Bakım, `hastalık` → saglik.js/Hastalıklar
`mindset` → kisisel-gelisim.js/Mindset
`kadın` → iliskiler.js/Kadınlar
`network` → money.js/Networking, `insan ilişkileri` → money.js/İnsan İlişkileri
`business` → girisimcilik.js/İş/Temel İlkeler, `ecommerce` → girisimcilik.js/İş/Temel İlkeler, `e-commerce` → girisimcilik.js/İş/Temel İlkeler
`kariyer` → girisimcilik.js/Kariyer/İş & Kariyer
`marketing` → girisimcilik.js/Pazarlama/Pazarlama
`iletişim` → girisimcilik.js/İletişim/İletişim
`finance` → girisimcilik.js/Future Insights/Ekonomi & Finans
`ai`, `gelecek`, `future`, `teknoloji` → girisimcilik.js/Future Insights/AI & Teknoloji

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
| **Mindset** | Kişisel motivasyon, cesaret, alışkanlıklar, özgüven, eyleme geçme, disiplin, aile, ebeveynlik, retorik — şahsi karaktere uygulanacak notlar |

### iliskiler.js — Kadınlar
| Alt Kategori | Anahtar Konular |
|---|---|
| **Kadınlar** | Kadın-erkek ilişkileri, flört, evlilik |

### money.js — Life
| Alt Kategori | Anahtar Konular |
|---|---|
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

### girisimcilik.js — Entrepreneur (`src/data/girisimcilik.js`)
| Tab | Alt Kategori | Anahtar Konular |
|---|---|---|
| **is** | Temel İlkeler | İş kurma, girişimcilik, startup, ticaret, e-ticaret, risk, yönetim |
| **is** | Müşteri & Satış | Müşteri yönetimi, satış, tedarikçi, ihracat |
| **is** | Operasyonlar | Süreç yönetimi, operasyonel verimlilik, çalışan yönetimi |
| **pazarlama** | Pazarlama | Reklam, sosyal medya, growth hacking, SEO, marka, dikkat çekme |
| **kariyer** | İş & Kariyer | Kariyer, maaş, verimlilik, liderlik, iş hayatı tavsiyeleri |
| **iletisim** | İletişim | İkna, müzakere, beden dili, konuşma teknikleri, güven oluşturma |
| **futureInsights** | AI & Teknoloji | AI, otomasyon, teknoloji trendleri, gelecek öngörüleri |
| **futureInsights** | Ekonomi & Finans | Yatırım, borsa, kripto, finansal trendler, makroekonomi |

## Adım 3: Duplike Kontrolü

Hedef dosyayı oku ve notun özü zaten mevcut mu kontrol et. Varsa kullanıcıya bildir, ekleme.

## Adım 4: Ekleme

### saglik.js formatı (subItems destekler):
```js
{ text: 'Not metni', subItems: [] },
```

### personal/ dosyaları (flat string — saglik.js hariç):
```js
'Not metni',
```
İlgili kategorinin `items` dizisinin **sonuna** ekle.

### girisimcilik.js formatı (flat string, ama tabs yapısı var):
```js
'Not metni',
```
Hedef: `tabs.<tabKey>.categories['<Alt Kategori>'].items` dizisinin **sonuna** ekle.

Örnek: `kariyer` ipucu → `tabs.kariyer.categories['İş & Kariyer'].items` sonuna ekle.

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
