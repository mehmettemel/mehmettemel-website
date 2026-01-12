// ============================================
// TELEGRAM BOT - KEŞİFLER ENTEGRASYONU (GÜNCEL)
// ============================================

const TG_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; // Telegram Bot Token
const SITE_API_URL = "https://mehmettemel.com/api/kesifler/add";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data.message || !data.message.text) return;

    const chatId = data.message.chat.id;
    const text = data.message.text;

    // Bot komutlarını atla
    if (text.startsWith('/')) return;

    console.log("📩 Mesaj Geldi: " + text);

    // Kullanıcıya işlem başladı bilgisi
    sendTelegramMessage(chatId, "⏳ İşleniyor...");

    // Next.js API'ye gönder
    const result = callNextAPI(text);

    if (result.success) {
      const emoji = result.type === 'link' ? '🔗' : '💭';
      const typeName = result.type === 'link' ? 'Link' : 'Not';

      let message = `✅ ${typeName} başarıyla eklendi!\n\n`;

      if (result.type === 'link') {
        message += `📝 Başlık: ${result.data.title}\n`;
        message += `🏷️ Kategori: ${result.data.type}\n`;
        message += `🔗 URL: ${result.data.url}`;
      } else {
        const textPreview = result.data.text.length > 100
          ? result.data.text.substring(0, 100) + '...'
          : result.data.text;
        message += `📝 Not: ${textPreview}\n`;
        message += `🏷️ Kategori: ${result.data.category}`;
        if (result.data.author) {
          message += `\n✍️ Yazar: ${result.data.author}`;
        }
      }

      sendTelegramMessage(chatId, message);
    } else {
      sendTelegramMessage(chatId, "❌ Hata: " + result.error);
    }
  } catch (err) {
    console.error("❌ Hata:", err);
    const errorData = JSON.parse(e.postData.contents);
    sendTelegramMessage(errorData.message.chat.id, "❌ Hata oluştu: " + err.toString());
  }
}

function sendTelegramMessage(chatId, message) {
  const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ chat_id: chatId, text: message })
  });
}

function callNextAPI(text) {
  try {
    const response = UrlFetchApp.fetch(SITE_API_URL, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ text: text }),
      muteHttpExceptions: true
    });

    const statusCode = response.getResponseCode();
    const responseText = response.getContentText();

    console.log(`API Response (${statusCode}):`, responseText);

    if (statusCode === 200) {
      return JSON.parse(responseText);
    } else {
      return {
        success: false,
        error: `API Hatası (${statusCode}): ${responseText}`
      };
    }
  } catch (err) {
    return {
      success: false,
      error: "API bağlantı hatası: " + err.toString()
    };
  }
}
