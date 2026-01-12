import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const GEMINI_KEY = process.env.GEMINI_API_KEY

// Link mi Not mu tespit et
function isURL(text) {
  const urlPattern =
    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$|^www\.[\w-]+\.[\w-]+(\/[\w-./?%&=]*)?$/i
  return urlPattern.test(text.trim())
}

// Gemini API çağrısı
async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`

  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = await res.json()

    if (json.error) {
      throw new Error('Gemini API Hatası: ' + json.error.message)
    }

    if (!json.candidates || !json.candidates[0].content) {
      throw new Error('Gemini cevap döndüremedi.')
    }

    return json.candidates[0].content.parts[0].text
  } catch (error) {
    throw new Error('Gemini API çağrısı başarısız: ' + error.message)
  }
}

// Link işleme
async function handleLink(url) {
  const prompt = `Aşağıdaki URL'yi analiz et ve JSON formatında şu bilgileri döndür (sadece JSON döndür, markdown kod bloğu kullanma):
{
  "title": "Link başlığı",
  "description": "Kısa açıklama (max 150 karakter)",
  "type": "website/book/article/video seçeneklerinden en uygun olanı"
}

URL: ${url}

ÖNEMLI: Sadece düz JSON döndür, \`\`\`json gibi markdown formatı kullanma.`

  const aiResponse = await callGemini(prompt)

  // Markdown kod bloklarını temizle
  let cleanResponse = aiResponse.trim()
  cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '')

  const linkData = JSON.parse(cleanResponse)

  return {
    id: Date.now(),
    title: linkData.title,
    description: linkData.description,
    type: linkData.type,
    url: url,
  }
}

// Not işleme
async function handleNote(text) {
  const prompt = `Aşağıdaki notu analiz et ve JSON formatında şu bilgileri döndür (sadece JSON döndür, markdown kod bloğu kullanma):
{
  "text": "Notun kendisi (tırnak işaretlerini koruyarak)",
  "author": "Varsa yazar adı, yoksa null",
  "source": "Varsa kaynak, yoksa null",
  "category": "motivasyon/yazilim/tasarim/teknoloji/saglik/gida/seyahat kategorilerinden en uygun olanı",
  "tags": ["tag1", "tag2"]
}

Not: ${text}

ÖNEMLI:
- Sadece düz JSON döndür, \`\`\`json gibi markdown formatı kullanma.
- text alanında tırnak işaretlerini koruyarak düzgün escape et.`

  const aiResponse = await callGemini(prompt)

  // Markdown kod bloklarını temizle
  let cleanResponse = aiResponse.trim()
  cleanResponse = cleanResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '')

  const noteData = JSON.parse(cleanResponse)

  return {
    id: Date.now(),
    text: noteData.text,
    author: noteData.author,
    source: noteData.source,
    category: noteData.category,
    tags: noteData.tags || [],
  }
}

// kesifler.js dosyasını güncelle
async function updateKesiflerFile(type, newData) {
  const filePath = path.join(process.cwd(), 'src/data/kesifler.js')

  // Dosyayı oku
  const fileContent = await fs.readFile(filePath, 'utf-8')

  let updatedContent = fileContent

  if (type === 'link') {
    // usefulLinks array'ine ekle
    const newLink = `  {
    id: ${newData.id},
    title: '${newData.title.replace(/'/g, "\\'")}',
    description: '${newData.description.replace(/'/g, "\\'")}',
    type: '${newData.type}',
    url: '${newData.url}',
  },`

    // Array içine ekle - son ] işaretinden önce ekle
    updatedContent = updatedContent.replace(
      /(export const usefulLinks = \[)([\s\S]*?)(\n\])/,
      (match, p1, p2, p3) => {
        // Eğer array boş değilse sonuna ekle, boşsa direkt ekle
        return `${p1}${p2}${p2.trim() ? '\n' : ''}${newLink}${p3}`
      }
    )
  } else if (type === 'note') {
    // inspirationalQuotes array'ine ekle
    const newNote = `  {
    id: ${newData.id},
    text: '${newData.text.replace(/'/g, "\\'")}',
    author: ${newData.author ? `'${newData.author.replace(/'/g, "\\'")}'` : 'null'},
    source: ${newData.source ? `'${newData.source.replace(/'/g, "\\'")}'` : 'null'},
    category: '${newData.category}',
    tags: ${JSON.stringify(newData.tags)},
  },`

    updatedContent = updatedContent.replace(
      /(export const inspirationalQuotes = \[)([\s\S]*?)(\n\])/,
      (match, p1, p2, p3) => {
        return `${p1}${p2}${p2.trim() ? '\n' : ''}${newNote}${p3}`
      }
    )
  }

  // Dosyaya yaz
  await fs.writeFile(filePath, updatedContent, 'utf-8')

  return true
}

// API endpoint
export async function POST(request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Mesaj metni gerekli' }, { status: 400 })
    }

    // Link mi Not mu kontrol et
    const isLink = isURL(text)

    let result
    let type

    if (isLink) {
      type = 'link'
      result = await handleLink(text)
      await updateKesiflerFile('link', result)
    } else {
      type = 'note'
      result = await handleNote(text)
      await updateKesiflerFile('note', result)
    }

    return NextResponse.json({
      success: true,
      type,
      data: result,
      message: `${type === 'link' ? 'Link' : 'Not'} başarıyla eklendi!`,
    })
  } catch (error) {
    console.error('API Hatası:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
