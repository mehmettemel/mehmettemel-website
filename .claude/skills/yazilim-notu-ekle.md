# Yazılım Notu Ekle

Bu skill SADECE yazılım kategorisi için kullanılır. Kullanıcı yazılım konulu bir not verdiğinde otomatik olarak tetiklenir.

## Otomatik Tetikleme

Bu skill şu durumlarda otomatik çalışır:
- Kullanıcı AI, yapay zeka, Claude, GitHub, coding, programlama, web development gibi yazılım konuları hakkında not verdiğinde
- Örnek: "Karpathy'nin AI tavsiyeleri: ..."
- Örnek: "Claude'u verimli kullanma: ..."
- Örnek: "GitHub best practices: ..."

## İşlem Adımları

Kullanıcı not verdiğinde:
1. Notun başlığını belirle (ilk cümleden veya içerikten çıkar)
2. Alt kategorisini belirle: yapay-zeka, github, web-gelistirme, programlama, vs
3. Uygun frontmatter ile markdown dosyası oluştur
4. content/ klasörüne ekle
5. Kullanıcıya sadece "✅ Eklendi" de, detay verme

## Kategori Yapısı

### Kitaplar (kitaplar)
- Kitap notları için kullanılır
- Frontmatter:
  - title: Kitap adı
  - date: YYYY-MM-DD
  - description: Kısa açıklama
  - category: "kitaplar"
  - tags: ["kitap", "yazar adı", "konu"]
  - author: Yazar adı
  - featured: false

### Kişiler (kisiler)
- Kişi araştırmaları için kullanılır
- Frontmatter:
  - title: Kişi adı
  - date: YYYY-MM-DD
  - description: Kısa açıklama
  - category: "kisiler"
  - tags: ["kişi", "alan", "meslek"]
  - author: Mehmet Temel
  - featured: false

### Yazılım (yazilim)
- Yazılım konulu notlar için kullanılır
- Alt başlıklar (subcategory):
  - yapay-zeka: AI, ML, LLM, Claude, GPT, ChatGPT, Karpathy, AI tavsiyeleri
  - github: Git, GitHub, version control, repository yönetimi
  - web-gelistirme: Frontend, backend, React, Next.js, web dev
  - programlama: Genel coding practices, best practices, clean code
  - veritabani: Database, SQL, NoSQL, Postgres
  - devops: Deployment, CI/CD, Docker, Kubernetes
  - genel: Yukarıdaki kategorilere uymayan yazılım notları
- Frontmatter:
  - title: Başlık (notun içeriğinden otomatik belirle)
  - date: YYYY-MM-DD (bugünün tarihi)
  - description: Kısa açıklama (1-2 cümle, notun özeti)
  - category: "yazilim"
  - subcategory: "alt-baslik-adi" (yukarıdaki listeden seç)
  - tags: ["yazilim", "subcategory", "ilgili-teknoloji", "vs"]
  - author: Mehmet Temel
  - featured: false

## Dosya Adlandırma

- Küçük harf kullan
- Türkçe karakterleri İngilizce karşılıkları ile değiştir (ç->c, ğ->g, ı->i, ö->o, ş->s, ü->u)
- Boşlukları tire (-) ile değiştir
- Örnek: "Yapay Zeka ve Etik" -> "yapay-zeka-ve-etik.md"

## Örnek Frontmatter

```yaml
---
title: "Claude AI ile Kod Geliştirme"
date: "2026-02-05"
description: "Claude AI'ın yazılım geliştirmede kullanımı, ipuçları ve best practice'ler."
category: "yazilim"
subcategory: "yapay-zeka"
tags: ["yazilim", "yapay zeka", "claude ai", "ai coding"]
author: "Mehmet Temel"
featured: false
---
```

## İçerik Yapısı

**ÖNEMLİ: Kullanıcı madde madde liste verdiğinde:**
- Her maddeyi AYNEN olduğu gibi yaz
- Maddeleri GRUPLAMAma
- Maddeleri YENİDEN ADLANDIRMA
- Sırayı DEĞİŞTİRME
- Sadece markdown madde işaretleri ekle (-)
- Her madde bir satır olmalı

**Genel formatlar:**
- ## başlıklarla bölümlere ayır
- Madde işaretleri ve kalın yazı kullan
- Kod blokları için ``` kullan
- Linkler için [metin](url) formatı kullan
