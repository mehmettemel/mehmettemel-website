---
name: pin
description: Development sayfasındaki bir kartı en üste sabitlemek ya da sabitlemeyi kaldırmak için kullanılır. /pin komutu ile tetiklenir. "dev:<id>" referansı alır ve toggle çalışır - pinli değilse sabitler, pinliyse kaldırır.
---

# Kart Sabitle / Kaldır

Kullanıcı `/pin` ile bir referans verdiğinde, ilgili kaydın `pinned` alanını
TOGGLE eder. Sabitlenen kartlar sayfada her görünümde (filtre/arama dahil)
en üstte, vurgulu gösterilir.

## Adım 1: Referans Çözümleme

| Prefix | Dosya | Kayıt |
|---|---|---|
| `dev:<id>` | `src/data/development.js` | `notes` içinde `id` eşleşen obje |

Prefix'siz serbest metin gelirse: `development.js` içinde başlıkta ara;
tek eşleşme → uygula, birden çok → listele ve sor, yok → bildir.

## Adım 2: Toggle

Kaydı bul ve `pinned` durumuna bak:

- **`pinned` yok ya da false** → objeye `pinned: true,` ekle
  (`tags` satırından sonra uygun bir yere).
- **`pinned: true` var** → o satırı komple sil. `pinned: false` yazma;
  alan hiç olmasın.

Kaydın dizideki YERİNİ DEĞİŞTİRME — sıralamayı bileşen yapıyor
(pinli olanlar render'da öne alınır). Veri sırası "eklenme sırası"
olarak anlamlı kalmalı.

## Adım 3: Doğrulama

```bash
node --check src/data/development.js
```

## Sınırlar

- Aynı anda birden çok referans gelebilir (`/pin dev:a dev:b`) — hepsini uygula.
- Kaç kartın pinli kaldığını bildir. 3'ten fazla pinli varsa kullanıcıya
  hatırlat: "sabit kart çoğaldıkça vurgu anlamını yitirir" — ama engelleme.
- Commit ATMA.

## Onay Formatı

Sabitlendiğinde:

```
Sabitlendi: [başlık] (dev:<id>)
```

Kaldırıldığında:

```
Sabitleme kaldırıldı: [başlık] (dev:<id>)
```
