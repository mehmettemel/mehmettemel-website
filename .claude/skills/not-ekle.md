# Not Ekle

Kullanıcı kısa bir not, alıntı veya bilgi verdiğinde bu notu `src/data/notes.js` dosyasına ekler.

## Tetikleme

Bu skill şu durumlarda kullanılır:
- Kullanıcı `/not` komutu kullandığında
- Kullanıcı kısa bir not, alıntı veya bilgi paylaştığında ve "ekle", "kaydet", "not al" gibi ifadeler kullandığında

## Kategori Belirleme

Notun içeriğine göre şu 4 kategoriden birini seç:

- **saglik**: Sağlık, beslenme bilimi, fitness, egzersiz, uyku, mental sağlık, wellness, vitaminler, takviyeler, bağışıklık, bağırsak sağlığı, nefes teknikleri
- **gida**: Yemek, tarif ipuçları, mutfak teknikleri, gıda saklama, gıda kalitesi, besin değerleri, yiyecek seçimi
- **kisisel**: Kişisel gelişim, motivasyon, ilham, hayat dersleri, başarı, ilişkiler, kariyer, verimlilik, alışkanlıklar, yatırım stratejileri, liderlik
- **genel**: Tarih, politika, felsefe, toplum, ekonomi, teknoloji, bilim, kültür, eğitim — yukarıdaki 3 kategoriye uymayan her şey

## Ekleme Adımları

1. `src/data/notes.js` dosyasını oku
2. Kategoriyi belirle
3. İlgili kategori dizisine (saglik, gida, kisisel, genel) yeni bir obje ekle
4. Obje formatı:
   ```js
   {
     id: Date.now(),  // benzersiz timestamp
     text: 'Not metni burada',
     author: 'Yazar adı',  // opsiyonel, yoksa bu field'ı ekleme
     source: 'Kaynak',      // opsiyonel, yoksa bu field'ı ekleme
   }
   ```
5. Notu dizinin **sonuna** ekle
6. Kullanıcıya kısa onay ver

## Metin Temizleme

- `>al`, `>not` gibi prefix'leri kaldır
- Gereksiz boşlukları temizle
- Tırnak işaretlerini düzelt
- Metin olduğu gibi korunsun, yeniden yazma veya özetle

## Birden Fazla Not

Kullanıcı birden fazla not verirse:
- Her notu ayrı bir obje olarak ekle
- Her birine ayrı id ver
- Hepsini doğru kategoriye yerleştir

## Yazar/Kaynak Tespiti

- Metnin sonunda "- İsim" varsa → author alanına yaz
- Bilinen kişilerden alıntıysa (Huberman, Müftüoğlu vb.) → author alanına yaz
- Kitap/video referansı varsa → source alanına yaz
- Belirsizse author/source ekleme

## Örnek

Kullanıcı: "Sabah güneşine 10 dk çıkmak sirkadyen ritmi düzenler - Huberman"

→ saglik dizisine ekle:
```js
{
  id: 1715600000000,
  text: 'Sabah güneşine 10 dk çıkmak sirkadyen ritmi düzenler.',
  author: 'Huberman',
}
```

Yanıt: "Eklendi: saglik kategorisine 1 not"
