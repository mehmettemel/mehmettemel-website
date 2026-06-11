---
name: video
description: Video URL'si verilerek yt-dlp ile indirir, Google Gemini ile analiz eder ve sonucu döner. /video komutu ile tetiklenir.
---

# Video Analiz

Kullanici `/video <url>` komutu ile bir video linki verdiginde, videoyu indirip Gemini ile analiz eder.

## Kullanim

```
/video https://www.youtube.com/watch?v=xxx
/video https://vimeo.com/xxx
```

yt-dlp'nin destekledigi herhangi bir video URL'si verilebilir.

## Adimlar

1. Kullanicidan alinan URL'yi `scripts/video-analyze.mjs` scriptine ver:
   ```bash
   node scripts/video-analyze.mjs "<url>"
   ```
   - Timeout: 10 dakika (600000ms) — video indirme ve Gemini analizi zaman alabilir
   - Script progress bilgilerini stderr'e, sonucu stdout'a yazar

2. Script basarili donduyse ciktiyi kullaniciya Markdown olarak goster.

3. Script hata verdiyse hata mesajini kullaniciya bildir.

## Gereksinimler

- `yt-dlp` sistemde kurulu olmali
- `.env.local` dosyasinda `GEMINI_API_KEY` tanimli olmali
- `@google/genai` npm paketi kurulu olmali

## Notlar

- Sadece lokal ortamda calisir
- Video /tmp dizinine gecici olarak indirilir ve analiz sonrasi silinir
- Uzun videolar daha fazla zaman alabilir
