---
name: dev
description: Development sayfasına geliştirme notu eklemek için kullanılır. /dev komutu ile tetiklenir. Notu analiz edip türünü (soru-cevap, kısa not, konu) ve etiketlerini belirler, src/data/development.js dosyasına kart olarak ekler.
---

# Development Not Ekle

Kullanıcı `/dev` komutu ile bir geliştirme notu verdiğinde, içeriği analiz edip
`src/data/development.js` dosyasındaki `notes` dizisine kart olarak ekler.
Sayfa: `/moat/development`.

## Adım 1: Dosyayı Oku

`src/data/development.js`'i oku. İki şeye bak:
- `TAGS` — kanonik etiket listesi (etiketler **buradan** seçilir)
- `notes` — mevcut notlar (duplike kontrolü ve id çakışması için)

## Adım 2: Tür Tespiti

Notun türünü içeriğine göre belirle:

| type | Ne zaman | title alanı |
|---|---|---|
| `qa` | Bir soru + cevabı varsa, ya da "X neden Y?" / "nasıl yapılır?" kalıbındaysa | **Soru** |
| `note` | Tek/birkaç cümlelik pratik bilgi, ipucu, hatırlatma | Kısa başlık |
| `konu` | Uzun açıklama, birden fazla paragraf, bir konunun anlatımı | Konu başlığı |

Kullanıcı soruyu verip cevabı vermediyse: **cevabı sen yaz**, ama kısa ve
kesin tut. Emin olmadığın bir şeyi kesinmiş gibi yazma.

## Adım 2b: summary ve body — İKİSİ DE KISA, anlatımı kod taşır

**Türkçe düzyazı duvarı yazma.** Bu sitenin house style'ı: bağlamı 2-4
cümlede ver, mekanizmanın kendisini kod bloklarına ve o bloklardaki
**İngilizce** yorumlara bırak. body 200 karakteri geçiyorsa muhtemelen
kodun anlatması gereken bir şeyi düzyazıyla anlatıyorsun — kısalt, koda taşı.

**`summary`** — kartta görünen. 1-2 cümle, en fazla ~160 karakter.
Mekanizmayı tek nefeste veren cümle. Kod, madde işareti, paragraf yok.

**`body`** — modalda görünen KISA bağlam. 2-4 cümle, Türkçe. Amacı:
"neden önemli, hangi kuralı çiğniyor" — bir cümlede söylenebilecek kök sebep.
Adım adım anlatım, numaralı çözüm listesi, uzun paragraf YOK — bunlar koda gider.

Kötü (eski üslup, YAPMA):
> "React bağımlılıkları Object.is ile karşılaştırır — yani referans
> eşitliğine bakar, içeriğe değil. Bileşen gövdesinde tanımlanan bir
> fonksiyon her render'da sıfırdan oluşturulur. İçeriği aynı olsa bile
> referansı farklıdır. Effect 'bağımlılık değişti' deyip yeniden çalışır..."
> (4 paragraf sürüyor)

İyi (bu üslup):
> "React bağımlılıkları Object.is ile karşılaştırır — referansa bakar,
> içeriğe değil. Üç çözüm var, tercih sırasıyla aşağıda."
> (gerisi kod bloklarında)

## Adım 2c: Kodla görselleştir — asıl anlatım burada

**Kodla gösterilebilen her notta kod bloğu olsun.** `code` bir **dizi**dir,
her eleman `{ label, lang, snippet }`. Yorumlar `snippet` içinde daima
**İngilizce**; `label` Türkçe kalabilir.

Standart kalıp — önce sorun, sonra çözümler:

```js
code: [
  { label: 'Bug — infinite loop', lang: 'jsx', snippet: '...' },
  { label: 'Fix 1 — move it inside the effect', lang: 'jsx', snippet: '...' },
  { label: 'Fix 2 — useCallback', lang: 'jsx', snippet: '...' },
],
```

**Kurallar:**

- **Kod içindeki yorumlar İNGİLİZCE.** `label` Türkçe olabilir (kart/modal
  başlığı gibi okunur), ama `snippet` içindeki `//` yorumları İngilizce.
  Mekanizmanın "neden"i buraya yazılır — body'ye değil.
- `label` her blokta olsun; sadece "Sorun"/"Çözüm" değil, **ne yaptığını** söylesin
- Birden fazla çözüm varsa her birini ayrı blok yap
- Kod **çalışır ve eksiksiz** olsun — yarım bileşen, hayali API yazma
- Gerçekçi isimler kullan (`Profile`, `userId`), `foo`/`bar` değil
- Kritik satıra İngilizce yorum düş: neyin yanlış/doğru olduğunu kod içinde göster
- 20 satırı geçme; uzunsa sadece ilgili parçayı ver
- Emoji kullanma

`lang`: `js`, `ts`, `jsx`, `tsx`, `css`, `html`, `bash`, `sql`, `json`

Kod bloklarında backtick geçiyorsa (template literal), snippet'i backtick'li
string olarak yaz ve içteki backtick/`${}` ifadelerini escape et:

```js
snippet: `fetch(\`/api/users/\${userId}\`)`,
```

## Adım 3: Etiketleme

`TAGS` listesinden **1-3 etiket** seç. Kurallar:

- Sadece listede olan etiketleri kullan. Uydurma.
- En spesifik olanı önce koy (`react` + `javascript` yerine konu React'sa `react` yeterli olabilir).
- Gerçekten hiçbir etiket uymuyorsa `TAGS` dizisine yeni etiket ekle ve
  kullanıcıya "yeni etiket açtım: X" diye bildir. Bunu nadiren yap.

Etiket seçim ipuçları:
- Hook, render, state, JSX → `react`
- App Router, RSC, route, metadata, caching → `nextjs`
- Tip, generic, interface → `typescript`
- Closure, event loop, prototype, async → `javascript`
- Flexbox, grid, Tailwind, animasyon → `css`
- Renk, tipografi, spacing, tasarım sistemi → `tasarım`
- LCP, bundle, lazy load, memo → `performans`
- ARIA, klavye, focus, semantik → `erişilebilirlik`
- Vitest, Playwright, Testing Library → `test`
- rebase, merge, commit → `git`
- ESLint, Prettier, build, CI → `araçlar`
- API, server, Node → `backend`
- SQL, Postgres, ORM, sorgu → `veritabanı`
- LLM, prompt, embedding, RAG → `ai`
- XSS, CSRF, JWT, cookie → `güvenlik`
- HTTP, CORS, storage, DevTools → `tarayıcı`
- Klasör yapısı, katman, bağımlılık yönü → `mimari`
- Mülakat, CV, iş arama → `kariyer`

## Adım 5: Duplike Kontrolü

Aynı konuyu işleyen bir not zaten varsa yeni kart açma. Bunun yerine:
- Mevcut notun `body`'sini yeni bilgiyle zenginleştir, ya da
- Yeterince farklıysa yeni kart aç ama kullanıcıya "şuna benzer bir not vardı" de.

## Adım 6: Ekleme

Yeni notu `notes` dizisinin **BAŞINA** ekle (en yeni üstte görünsün).

```js
{
  id: 'kebab-case-benzersiz-id',
  type: 'qa',
  title: 'Soru ya da başlık',
  summary: 'Kartta görünen 1-2 cümlelik öz.',
  body: 'Kısa bağlam, 2-4 cümle. Detay kodda.',
  tags: ['react'],
  code: [
    { label: 'Bug — ...', lang: 'jsx', snippet: '// English comments here' },
    { label: 'Fix — ...', lang: 'jsx', snippet: '// English comments here' },
  ],
},
```

**id kuralları:**
- Başlıktan türet, kebab-case
- Türkçe karakterleri sadeleştir: ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u
- Mevcut id'lerle çakışmasın
- Maksimum ~45 karakter

## Metin Temizleme

- `/dev` prefix'ini kaldır
- Single quote'ları escape et (`'` → `\'`)
- Paragraf ayrımı için `\n\n` kullan (modal `whitespace-pre-line` ile render ediyor)
- Kullanıcının metnini yeniden yazma; sadece noktalama/büyük harf düzelt

## Kaynak

Kullanıcı bir link ya da kaynak verdiyse `source` alanına koy:

```js
source: 'react.dev/reference/react/useEffect',
```

## Onay Sorma

Onay sorma; duplike yoksa direkt ekle.

## Onay Formatı

```
Eklendi: development.js → [tür] → [başlık]
Etiketler: #tag1 #tag2
```

Yeni etiket açtıysan:

```
Yeni etiket: #tag (TAGS listesine eklendi)
```
