# Faz 0 · Frontend Yetkinlik Envanteri

> Roadmap Faz 0 → "Şu anki teknik yetkinliklerini listele" maddesinin çıktısı.
> Kendin dolduruyorsun. Amaç puan toplamak değil, **nerede sağlam, nerede boşluk var** görmek.

**Puanlama**

| Puan | Anlamı |
|---|---|
| 0 | Hiç kullanmadım |
| 1 | Örneğe bakarak yaparım |
| 2 | Kendi başıma yaparım, arada dokümana bakarım |
| 3 | Akıcı kullanırım, tercih sebeplerini bilirim |
| 4 | Başkasına öğretirim, mimari kararını verebilirim |

Doldururken kural: **puanın yanına 1 satır kanıt yaz** (hangi projede, ne yaptın). Kanıt yazamıyorsan puan muhtemelen bir fazla.

---

## 1. Dil — JavaScript / TypeScript

| Konu | Puan | Kanıt |
|---|---|---|
| Modern JS (destructuring, spread, modules, async/await) | | |
| Closure, scope, `this`, prototip zinciri | | |
| Event loop, microtask/macrotask, async sıralama | | |
| Immutability, referans vs değer, kopyalama tuzakları | | |
| TypeScript: temel tipler, interface, union | | |
| TypeScript: generic, utility types, tip daraltma | | |
| Hata yönetimi (try/catch sınırları, hata sınıfları) | | |

## 2. React

| Konu | Puan | Kanıt |
|---|---|---|
| Bileşen kompozisyonu, props tasarımı | | |
| `useState` / `useEffect` ve effect'in ne zaman gereksiz olduğu | | |
| `useMemo` / `useCallback` — ne zaman gerçekten gerekli | | |
| Re-render sebeplerini teşhis etmek | | |
| Context ve ne zaman kaçınmak gerektiği | | |
| Custom hook yazma | | |
| Ref, portal, imperatif kaçış kapıları | | |
| Liste/key mantığı ve reconciliation | | |
| Server Components vs Client Components ayrımı | | |

## 3. Framework — Next.js

| Konu | Puan | Kanıt |
|---|---|---|
| App Router yapısı (layout, page, template) | | |
| Statik / dinamik render kararı, `revalidate` | | |
| Server Actions veya API route ile veri yazma | | |
| Middleware, yönlendirme, korumalı sayfa | | |
| Metadata, SEO, sitemap/RSS | | |
| Görsel optimizasyonu, font yükleme | | |
| Caching davranışını açıklayabilme | | |

## 4. CSS ve Tasarım

| Konu | Puan | Kanıt |
|---|---|---|
| Flexbox ve Grid — layout'u ilk denemede kurma | | |
| Responsive yaklaşım, breakpoint kararları | | |
| Tailwind ile ölçeklenebilir yapı (token, varyant) | | |
| Tasarım sistemi kurma (Radix/shadcn tarzı) | | |
| Tipografi, boşluk, hiyerarşi kararları | | |
| Animasyon (CSS transition, Framer Motion) | | |
| Açık/koyu tema, renk sistemi | | |
| Sıfırdan görsel tasarım yapabilme (kod dışı) | | |

## 5. Veri ve Durum

| Konu | Puan | Kanıt |
|---|---|---|
| Sunucu durumu vs istemci durumu ayrımı | | |
| Veri çekme desenleri (loading, error, empty, stale) | | |
| Cache/invalidation mantığı (React Query vb.) | | |
| Form yönetimi ve validasyon | | |
| `localStorage` / kalıcılık ve tuzakları | | |
| Optimistic update | | |

## 6. Performans

| Konu | Puan | Kanıt |
|---|---|---|
| Core Web Vitals (LCP, CLS, INP) — ölçme ve düzeltme | | |
| Bundle analizi, code splitting, lazy loading | | |
| Görsel/font kaynaklı yavaşlıkları teşhis | | |
| Uzun liste sanallaştırma | | |
| DevTools Performance paneliyle profil çıkarma | | |

## 7. Erişilebilirlik

| Konu | Puan | Kanıt |
|---|---|---|
| Semantik HTML | | |
| Klavye navigasyonu, focus yönetimi | | |
| ARIA — ne zaman gerekli, ne zaman zararlı | | |
| Kontrast, hareket azaltma tercihleri | | |
| Ekran okuyucuyla test etme | | |

## 8. Test

| Konu | Puan | Kanıt |
|---|---|---|
| Birim test yazma | | |
| Bileşen testi (Testing Library) | | |
| E2E (Playwright/Cypress) | | |
| Neyin test edilmeye değer olduğuna karar verme | | |

## 9. Araçlar ve Süreç

| Konu | Puan | Kanıt |
|---|---|---|
| Git — rebase, çakışma çözme, geçmişi okuma | | |
| Code review verme/alma | | |
| CI kurma (lint, test, build) | | |
| Deploy ve rollback | | |
| Hata izleme / loglama (Sentry vb.) | | |
| Analitik kurulumu | | |

## 10. Platform Temelleri

| Konu | Puan | Kanıt |
|---|---|---|
| HTTP, status kodları, header'lar | | |
| Cookie, session, JWT — güvenlik sınırları | | |
| CORS | | |
| Tarayıcı depolama seçenekleri ve farkları | | |
| Temel web güvenliği (XSS, CSRF) | | |
| Network paneliyle sorun teşhisi | | |

---

## Doldurduktan sonra: özet

**En güçlü 5 konu** (4 veya 3 aldıkların arasından, kanıtı en net olanlar)

1.
2.
3.
4.
5.

**En kritik 5 boşluk** (0-1 aldıkların arasından, hedef rolü en çok etkileyenler)

1.
2.
3.
4.
5.

**Kendine dürüst soru:** Bir iş görüşmesinde "en iyi olduğun şey ne?" diye sorulsa, kanıtıyla anlatabileceğin tek cümle nedir?

>

---

*Doldurma tahmini: 30-45 dakika. Tek oturumda bitir, üzerine çok düşünme — ilk içgüdü genelde doğru.*
