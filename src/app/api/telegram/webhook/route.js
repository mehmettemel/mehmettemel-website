import { NextResponse } from 'next/server'
import {
  createNote,
  getNotesStats,
  createListItem,
  createRecipe,
  createPlace,
  createEnglishWord,
} from '@/lib/db'
import {
  handleLink,
  handleNote,
  handleListItemWithAI,
  handleRecipe,
  handlePlace,
  handleEnglishWord,
  isURL,
} from '@/lib/gemini'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const ALLOWED_USER_IDS = process.env.TELEGRAM_ALLOWED_USER_IDS
  ? process.env.TELEGRAM_ALLOWED_USER_IDS.split(',').map((id) =>
      parseInt(id.trim()),
    )
  : []

/**
 * Send a message to Telegram chat
 * @param {number} chatId - Telegram chat ID
 * @param {string} text - Message text (supports Markdown)
 * @returns {Promise<void>}
 */
async function sendTelegramMessage(chatId, text) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN not defined')
    throw new Error('Telegram bot token not configured')
  }

  // Validate text parameter
  if (!text || typeof text !== 'string') {
    console.error('Invalid text parameter for Telegram message:', text)
    throw new Error('Invalid message text')
  }

  try {
    const payload = {
      chat_id: chatId,
      text: text.substring(0, 4096), // Telegram has 4096 char limit
      parse_mode: 'HTML', // HTML is more reliable than Markdown
    }

    console.log('Sending Telegram message:', {
      chat_id: chatId,
      text_length: text?.length || 0,
      text_preview: (text || '').substring(0, 100) + '...',
    })

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    )

    const responseData = await response.json()

    if (!response.ok) {
      console.error(
        'Telegram API error response:',
        JSON.stringify(responseData, null, 2),
      )
      throw new Error(
        `Telegram API error: ${responseData.description || 'Unknown error'}`,
      )
    }

    console.log('Telegram message sent successfully')
    return responseData
  } catch (error) {
    console.error('Failed to send Telegram message:', error)
    console.error('Message text:', text)
    throw error
  }
}

/**
 * Parse message to determine type and content
 * NEW SIMPLE SYSTEM: Only 4 commands, AI handles ALL categorization
 * @param {string} text - Message text
 * @returns {Object|null} { type, content } or null if needs AI detection
 */
function parseMessage(text) {
  console.log('==== PARSE MESSAGE START ====')
  console.log('[parseMessage] Input text:', JSON.stringify(text))
  console.log('[parseMessage] Text length:', text.length)
  console.log('[parseMessage] First 10 chars:', text.substring(0, 10))

  // LIST COMMANDS (Okuma/İzleme/Alışveriş Listesi)
  // These go to list_items table
  if (text.startsWith('/f ') || text === '/f') {
    const content = text.slice(2).trim()
    console.log('[parseMessage] Matched: /f → list-film')
    return { type: 'list-film', content }
  }
  if (text.startsWith('/u ') || text === '/u') {
    const content = text.slice(2).trim()
    console.log('[parseMessage] Matched: /u → list-urun')
    return { type: 'list-urun', content }
  }
  if (text.startsWith('/k ') || text === '/k') {
    const content = text.slice(2).trim()
    console.log('[parseMessage] Matched: /k → list-kitap')
    return { type: 'list-kitap', content }
  }

  // RECIPE COMMAND (Tarifler)
  // Goes to recipes table
  if (text.startsWith('/tarif ') || text === '/tarif' || text.startsWith('/tarif\n')) {
    const content = text.replace(/^\/tarif[\s\n]*/, '').trim()
    console.log('[parseMessage] Matched: /tarif → recipe')
    return { type: 'recipe', content }
  }

  // ENGLISH WORD COMMAND (İngilizce Öğrenme)
  // Goes to english_words table
  if (text.startsWith('.i ') || text.startsWith('.i\n')) {
    const content = text.replace(/^\.i[\s\n]*/, '').trim()
    console.log('[parseMessage] Matched: .i → english-word')
    return { type: 'english-word', content }
  }

  // PLACES (Mekanlar)
  // Goes to places table
  if (text.startsWith('>mekan ') || text.startsWith('>mekan\n') ||
      text.startsWith('/mekan ') || text.startsWith('/mekan\n')) {
    const content = text.replace(/^(>mekan|\/mekan)[\s\n]*/, '').trim()
    console.log('[parseMessage] Matched: >mekan or /mekan → place')
    return { type: 'place', content }
  }

  // ========================================
  // ULTRA-SHORT KEŞİFLER COMMANDS
  // Type is manual, category is AI-determined
  // ========================================

  // QUOTES (AI categorizes: gıda/sağlık/kişisel/genel)
  if (text.startsWith('>al ') || text.startsWith('>al\n')) {
    const content = text.replace(/^>al[\s\n]*/, '').trim()
    console.log('[parseMessage] ✅ Matched: >al → quote (AI will categorize)')
    return { type: 'quote', category: null, content }
  }

  // LINKS (no categorization)
  if (text.startsWith('>li ')) {
    const content = text.replace(/^>li\s*/, '').trim()
    console.log('[parseMessage] ✅ Matched: >li → link')
    return { type: 'link', category: null, content }
  }

  // Auto-detect URL as link
  if (isURL(text)) {
    console.log('[parseMessage] Auto-detected URL → link')
    return { type: 'link', category: null, content: text.trim() }
  }

  // Default: treat as quote with AI categorization
  console.log('[parseMessage] No command found, defaulting to quote + AI categorization')
  return null
}

/**
 * POST /api/telegram/webhook
 * Handle incoming Telegram webhook updates
 */
export async function POST(request) {
  let chatId
  let update

  try {
    update = await request.json()

    // Check if it's a message
    if (!update.message || !update.message.text) {
      return NextResponse.json({ ok: true })
    }

    const { message } = update
    chatId = message.chat.id
    const userId = message.from.id
    const text = message.text

    console.log('='.repeat(80))
    console.log('[TELEGRAM WEBHOOK] New message received')
    console.log('[TELEGRAM WEBHOOK] User ID:', userId)
    console.log('[TELEGRAM WEBHOOK] Full text:', text)
    console.log('[TELEGRAM WEBHOOK] Text length:', text.length)
    console.log('[TELEGRAM WEBHOOK] First char code:', text.charCodeAt(0))
    console.log('='.repeat(80))

    // Check user authorization
    if (ALLOWED_USER_IDS.length > 0 && !ALLOWED_USER_IDS.includes(userId)) {
      await sendTelegramMessage(chatId, '❌ Bu botu kullanma yetkiniz yok.')
      return NextResponse.json({ ok: true })
    }

    // Handle /help command
    if (text === '/help') {
      await sendTelegramMessage(
        chatId,
        `🤖 <b>Bot Komutları</b> - ULTRA KISA SİSTEM

📚 <b>CACHE (Okuma/İzleme/Alışveriş)</b>
AI otomatik yazar/yönetmen/marka bulur:
• /k [isim] - Kitap
• /f [isim] - Film/Dizi
• /u [isim] - Ürün

🍳 <b>TARİFLER</b>
• /tarif [tarif metni]
  AI malzemeleri, yapılışı, süreyi analiz eder

🇬🇧 <b>İNGİLİZCE KELİME</b>
• .i [kelime] - İngilizce kelime ekle
  AI Türkçe karşılık ve örnek cümle bulur
  Örnek: .i serendipity

📍 <b>MEKANLAR</b>
• >mekan [mekan bilgisi]
  AI otomatik şehir, ülke, kategori bulur
  TEK veya BİRDEN FAZLA mekan gönderebilirsiniz!

  Örnekler:
  - Tek: >mekan Pizzarium, Roma, İtalya
  - Çoklu: >mekan "Pizzarium Roma" "Kız Kulesi İstanbul"
  - Serbest metin: >mekan Dün Roma'da Pizzarium'a gittik sonra Kız Kulesi'nde çay içtik

✨ <b>KEŞİFLER - ULTRA KISA (AI Otomatik Kategori)</b>
Sadece 2 karakter! AI kategoriyi otomatik bulur:

💭 <b>>al</b> [metin] - Alıntılar
  Örnek: >al Sauna 40% mortality decrease

🔗 <b>>li</b> [url] - Link
  Örnek: >li https://example.com

📊 <b>DİĞER</b>
• /stats - İstatistikler
• /help - Bu mesaj

💡 <b>İPUCU:</b>
Mekanlar için serbest metin yazabilirsiniz!
AI metninizden tüm mekanları otomatik çıkarır.`,
      )
      return NextResponse.json({ ok: true })
    }

    // Handle /stats command
    if (text === '/stats') {
      try {
        const stats = await getNotesStats()
        const byType = stats.byType || {}

        const statsText = `📊 <b>İstatistikler</b>

📝 Toplam: ${stats.total} not

🔗 Link: ${byType.link || 0}
💭 Alıntı: ${byType.quote || 0}`

        await sendTelegramMessage(chatId, statsText)
      } catch (error) {
        await sendTelegramMessage(
          chatId,
          '❌ İstatistikler alınırken hata oluştu.',
        )
      }
      return NextResponse.json({ ok: true })
    }

    // Start processing message
    try {
      await sendTelegramMessage(chatId, '⏳ Not işleniyor...')
    } catch (statusError) {
      console.warn('Failed to send status message, continuing...', statusError)
    }

    // Parse message
    let parsed = parseMessage(text)

    console.log('🔍 [TELEGRAM] Parsed result:', JSON.stringify(parsed))

    // If no command found, default to quote with genel category
    if (!parsed) {
      console.log('⚠️ [TELEGRAM] No command found, defaulting to quote + genel')
      parsed = { type: 'quote', category: 'genel', content: text }
    } else {
      console.log('✅ [TELEGRAM] Command recognized:', parsed.type)
      if (parsed.category) {
        console.log('✅ [TELEGRAM] Category specified:', parsed.category)
      }
    }

    // Handle list items with AI enrichment
    if (
      parsed.type === 'list-kitap' ||
      parsed.type === 'list-film' ||
      parsed.type === 'list-urun'
    ) {
      console.log('🎯 [LIST] List command detected!')
      console.log('🎯 [LIST] Type:', parsed.type)
      console.log('🎯 [LIST] Content:', parsed.content)

      const listType = parsed.type.replace('list-', '')

      try {
        console.log('🤖 [LIST] Calling AI to enrich item...')
        // Use AI to find author/director/brand
        const listData = await handleListItemWithAI(listType, parsed.content)
        console.log('🤖 [LIST] AI result:', listData)

        console.log('💾 [LIST] Saving to database...')
        const listItem = await createListItem(listData)
        console.log('💾 [LIST] Saved successfully! ID:', listItem.id)

        const emoji = { kitap: '📚', film: '🎬', urun: '🛍️' }[listType] || '📋'
        const categoryName =
          { kitap: 'Kitap', film: 'Film/Dizi', urun: 'Ürün' }[listType] ||
          'Liste'

        const authorText = listItem.author ? `\n✍️ ${listItem.author}` : ''
        const descriptionText = listItem.description
          ? `\n\n📖 ${listItem.description}`
          : ''
        await sendTelegramMessage(
          chatId,
          `✅ ${emoji} <b>${categoryName} eklendi!</b>\n\n📝 ${listItem.name}${authorText}${descriptionText}\n\nID: ${listItem.id}`,
        )

        return NextResponse.json({ ok: true, listId: listItem.id })
      } catch (error) {
        throw new Error(`Liste item eklenemedi: ${error.message}`)
      }
    }

    // Handle recipe with AI parsing
    if (parsed.type === 'recipe') {
      console.log('🍳 [RECIPE] Recipe command detected!')
      console.log('🍳 [RECIPE] Content:', parsed.content)

      try {
        console.log('🤖 [RECIPE] Calling Gemini AI to parse recipe...')
        // Use Gemini AI to parse and structure recipe data
        const recipeData = await handleRecipe(parsed.content)
        console.log('🤖 [RECIPE] AI result:', recipeData)

        console.log('💾 [RECIPE] Saving to database...')
        const recipe = await createRecipe(recipeData)
        console.log('💾 [RECIPE] Saved successfully! ID:', recipe.id)

        await sendTelegramMessage(
          chatId,
          `✅ 🍳 <b>Tarif eklendi!</b>

📝 <b>${recipe.name}</b>

ID: ${recipe.id}

🔗 Tarife buradan ulaşabilirsiniz:
mehmettemel.com/listeler/tarif`,
        )

        return NextResponse.json({ ok: true, recipeId: recipe.id })
      } catch (error) {
        throw new Error(`Tarif eklenemedi: ${error.message}`)
      }
    }

    // Handle English word with AI
    if (parsed.type === 'english-word') {
      console.log('🇬🇧 [ENGLISH] English word command detected!')
      console.log('🇬🇧 [ENGLISH] Content:', parsed.content)

      try {
        console.log('🤖 [ENGLISH] Calling Gemini AI to process word...')
        // Use Gemini AI to find translation and example
        const wordData = await handleEnglishWord(parsed.content)
        console.log('🤖 [ENGLISH] AI result:', wordData)

        console.log('💾 [ENGLISH] Saving to database...')
        const word = await createEnglishWord(wordData)
        console.log('💾 [ENGLISH] Saved successfully! ID:', word.id)

        const exampleTurkishText = word.example_turkish
          ? `\n🇹🇷 ${word.example_turkish}`
          : ''

        await sendTelegramMessage(
          chatId,
          `✅ 🇬🇧 <b>İngilizce kelime eklendi!</b>

📝 <b>${word.english}</b>
🇹🇷 ${word.turkish}

💬 Örnek:
${word.example}${exampleTurkishText}

ID: ${word.id}

🔗 Kelimeye buradan ulaşabilirsiniz:
mehmettemel.com/listeler/ingilizce`,
        )

        return NextResponse.json({ ok: true, wordId: word.id })
      } catch (error) {
        throw new Error(`İngilizce kelime eklenemedi: ${error.message}`)
      }
    }

    // Handle place with AI parsing (supports multiple places)
    if (parsed.type === 'place') {
      console.log('📍 [PLACE] Place command detected!')
      console.log('📍 [PLACE] Content:', parsed.content)

      try {
        console.log('🤖 [PLACE] Calling Gemini AI to parse place(s)...')
        const placesArray = await handlePlace(parsed.content)
        console.log('🤖 [PLACE] AI result:', placesArray)
        console.log('🤖 [PLACE] Found', placesArray.length, 'place(s)')

        // Validate array
        if (!Array.isArray(placesArray) || placesArray.length === 0) {
          throw new Error('Hiçbir mekan bulunamadı. Lütfen formatı kontrol edin.')
        }

        console.log('💾 [PLACE] Saving to database...')
        const savedPlaces = []

        // Save each place to database
        for (let i = 0; i < placesArray.length; i++) {
          const placeData = placesArray[i]
          console.log(`💾 [PLACE] Saving place ${i + 1}/${placesArray.length}:`, placeData.name)

          const place = await createPlace(placeData)
          console.log(`💾 [PLACE] Saved successfully! ID: ${place.id}`)

          savedPlaces.push(place)
        }

        console.log(`✅ [PLACE] All ${savedPlaces.length} place(s) saved successfully!`)

        const categoryEmoji = {
          restoran: '🍽️',
          kafe: '☕',
          bar: '🍺',
          muze: '🏛️',
          park: '🌳',
          tarihi: '🏰',
          doga: '🏔️',
          alisveris: '🛍️',
          konaklama: '🏨',
          diger: '📍'
        }

        // Send success message
        if (savedPlaces.length === 1) {
          // Single place - detailed message
          const place = savedPlaces[0]
          const emoji = categoryEmoji[place.category] || '📍'
          const addressText = place.address ? `\n📍 ${place.address}` : ''
          const notesText = place.notes ? `\n\n💭 ${place.notes}` : ''
          const urlText = place.url ? `\n\n🔗 ${place.url}` : ''

          await sendTelegramMessage(
            chatId,
            `✅ ${emoji} <b>Mekan eklendi!</b>

📝 ${place.name}
🌍 ${place.city}, ${place.country}${addressText}${notesText}${urlText}

ID: ${place.id}`
          )
        } else {
          // Multiple places - summary message
          const placesList = savedPlaces
            .map((place, index) => {
              const emoji = categoryEmoji[place.category] || '📍'
              return `${index + 1}. ${emoji} ${place.name} - ${place.city}, ${place.country}`
            })
            .join('\n')

          const placeIds = savedPlaces.map(p => p.id).join(', ')

          await sendTelegramMessage(
            chatId,
            `✅ <b>${savedPlaces.length} mekan eklendi!</b>

${placesList}

ID: ${placeIds}`
          )
        }

        return NextResponse.json({
          ok: true,
          placeIds: savedPlaces.map(p => p.id),
          count: savedPlaces.length
        })
      } catch (error) {
        throw new Error(`Mekan eklenemedi: ${error.message}`)
      }
    }

    // Categorize content with Gemini AI
    // AI ALWAYS determines the category (gıda/sağlık/kişisel/genel)
    console.log('🤖 [TELEGRAM] Using full AI categorization for:', parsed.type)

    let categorizedData

    switch (parsed.type) {
      case 'link':
        categorizedData = await handleLink(parsed.content)
        break
      case 'quote':
        categorizedData = await handleNote(parsed.content)
        break
      default:
        throw new Error(`Unknown note type: ${parsed.type}`)
    }

    // Validate categorizedData
    if (!categorizedData) {
      throw new Error('Not verisi oluşturulamadı. Lütfen tekrar deneyin.')
    }

    // Check if multi-note (quotes can return arrays)
    const isMultiNote = Array.isArray(categorizedData)
    console.log('Is multi-note:', isMultiNote)
    console.log(
      'Categorized data length:',
      Array.isArray(categorizedData) ? categorizedData.length : 'N/A',
    )

    // Validate array has items
    if (isMultiNote && categorizedData.length === 0) {
      throw new Error('Hiçbir not bulunamadı. Lütfen formatı kontrol edin.')
    }

    if (isMultiNote) {
      console.log('Processing multiple notes...')
      // Handle multiple notes
      const savedNotes = []

      for (let i = 0; i < categorizedData.length; i++) {
        const noteData = categorizedData[i]
        console.log(`Processing note ${i + 1}/${categorizedData.length}:`, {
          hasType: !!noteData?.type,
          hasText: !!noteData?.text,
          hasCategory: !!noteData?.category,
        })

        if (!noteData || !noteData.type || !noteData.text) {
          console.warn('Invalid note data, skipping:', noteData)
          continue
        }

        const note = await createNote(noteData)
        console.log(
          `Created note #${note.id} (${note.note_type}/${note.category})`,
        )

        savedNotes.push({
          id: note.id,
        })
      }

      console.log(`Saved ${savedNotes.length} notes successfully`)

      // Check if any notes were saved
      if (savedNotes.length === 0) {
        throw new Error('Notlar kaydedilemedi. Lütfen formatı kontrol edin.')
      }

      // Send success message for multiple notes
      const emoji =
        { link: '🔗', quote: '💭' }[parsed.type] || '📝'

      const firstNote =
        Array.isArray(categorizedData) && categorizedData.length > 0
          ? categorizedData[0]
          : {}

      // Safe array operations
      const noteIds =
        Array.isArray(savedNotes) && savedNotes.length > 0
          ? savedNotes
              .map((n) => n?.id)
              .filter((id) => id != null)
              .join(', ')
          : 'N/A'

      // Escape HTML special characters
      const escapeHtml = (text) => {
        if (!text) return ''
        try {
          return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
        } catch (e) {
          console.error('escapeHtml error:', e)
          return ''
        }
      }

      const category = escapeHtml(firstNote?.category || 'Belirtilmemiş')
      const source = escapeHtml(firstNote?.source || 'Belirtilmemiş')
      const author = escapeHtml(firstNote?.author || 'Belirtilmemiş')

      const successMessage = `✅ ${emoji} <b>${savedNotes?.length || 0} not eklendi!</b>

Kategori: ${category}
Kaynak: ${source}
Yazar: ${author}
ID: ${noteIds}`

      console.log('Sending success message:', successMessage)

      // Try to send success message but don't let it fail the whole operation
      try {
        await sendTelegramMessage(chatId, successMessage)
      } catch (msgError) {
        console.error('Failed to send formatted success message:', msgError)
        // Fallback: send simple message without special formatting
        try {
          await sendTelegramMessage(
            chatId,
            `✅ ${savedNotes.length} not eklendi! ID: ${noteIds}`,
          )
        } catch (fallbackError) {
          console.error('Failed to send fallback message too:', fallbackError)
          // Last resort: send minimal message without any variables
          try {
            await sendTelegramMessage(chatId, '✅ Not eklendi!')
          } catch (minimalError) {
            console.error(
              'All message attempts failed, but note was saved:',
              minimalError,
            )
            // Don't throw - note was saved successfully
          }
        }
      }

      // Always return success if notes were saved
      return NextResponse.json({
        ok: true,
        noteIds: savedNotes.map((n) => n?.id).filter(Boolean),
      })
    }

    // Validate single note data
    if (
      !categorizedData ||
      !categorizedData.type ||
      !categorizedData.category
    ) {
      throw new Error('Not formatı hatalı. Lütfen tekrar deneyin.')
    }

    // Save single note to database
    const note = await createNote(categorizedData)

    console.log(`Created note #${note.id} (${note.note_type}/${note.category})`)

    // Send success message
    const emoji =
      { link: '🔗', quote: '💭' }[parsed.type] || '📝'

    // Escape HTML special characters
    const escapeHtml = (text) => {
      if (!text) return ''
      try {
        return String(text)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;')
      } catch (e) {
        console.error('escapeHtml error:', e)
        return ''
      }
    }

    const category = escapeHtml(categorizedData?.category || 'Belirtilmemiş')

    const successMessage = `✅ ${emoji} <b>Not eklendi!</b>

Kategori: ${category}
ID: ${note?.id || 'N/A'}`

    console.log('Sending success message:', successMessage)

    // Try to send success message but don't let it fail the whole operation
    try {
      await sendTelegramMessage(chatId, successMessage)
    } catch (msgError) {
      console.error('Failed to send formatted success message:', msgError)
      // Fallback: send simple message without special formatting
      try {
        await sendTelegramMessage(chatId, `✅ Not eklendi! ID: ${note.id}`)
      } catch (fallbackError) {
        console.error('Failed to send fallback message too:', fallbackError)
        // Last resort: send minimal message
        try {
          await sendTelegramMessage(chatId, '✅ Not eklendi!')
        } catch (minimalError) {
          console.error(
            'All message attempts failed, but note was saved:',
            minimalError,
          )
          // Don't throw - note was saved successfully
        }
      }
    }

    // Always return success if note was saved
    return NextResponse.json({ ok: true, noteId: note.id })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    console.error('Error stack:', error?.stack)
    console.error('Error type:', typeof error)

    // Send error message to user
    if (chatId) {
      try {
        // Get user-friendly error message
        let userMessage =
          error?.message || String(error) || 'Bilinmeyen bir hata oluştu.'

        // Ensure userMessage is a string
        userMessage = String(userMessage)

        // Truncate very long error messages
        if (userMessage && userMessage.length > 500) {
          userMessage = userMessage.substring(0, 500) + '...'
        }

        // Add hints based on error type
        let hint = ''
        if (userMessage.includes('parse')) {
          hint = '\n\n💡 İpucu: Mesajınızın formatını kontrol edin.'
        } else if (
          userMessage.includes('length') ||
          userMessage.includes('undefined')
        ) {
          hint =
            '\n\n💡 İpucu: Not eklerken doğru formatı kullanın. /help ile örneklere bakın.'
        } else if (userMessage.includes('Gemini')) {
          hint =
            '\n\n💡 İpucu: AI işleme sırasında bir sorun oluştu. Lütfen tekrar deneyin.'
        }

        const errorMessage = `❌ <b>Hata oluştu</b>

${userMessage}${hint}

📖 /help komutu ile kullanım kılavuzunu görebilirsiniz.`

        await sendTelegramMessage(chatId, errorMessage)
      } catch (msgError) {
        console.error('Failed to send error message to user:', msgError)
        // Try to send a simple fallback message
        await sendTelegramMessage(
          chatId,
          '❌ Bir hata oluştu. Lütfen tekrar deneyin.',
        )
      }
    }

    return NextResponse.json(
      { error: error?.message || 'Unknown error' },
      { status: 500 },
    )
  }
}

/**
 * GET /api/telegram/webhook
 * Health check endpoint
 */
export async function GET() {
  const timestamp = new Date().toISOString()
  return NextResponse.json({
    status: 'ok',
    message: 'Telegram webhook is active',
    timestamp,
    version: '2.0.1-description-fix',
    botConfigured: !!TELEGRAM_BOT_TOKEN,
    userFilterEnabled: ALLOWED_USER_IDS.length > 0,
    allowedUsers: ALLOWED_USER_IDS.length,
    commandsParsed: ['/k', '/f', '/u', '/l', '/a', '/v', '/b'],
  })
}
