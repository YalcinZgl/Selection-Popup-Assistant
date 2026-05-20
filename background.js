// Background service worker for handling cross-origin requests and storage access securely.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ask-gemini') {
    handleAskGemini(request.history)
      .then(reply => {
        sendResponse({ success: true, reply });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'open-options') {
    chrome.runtime.openOptionsPage();
    sendResponse({ success: true });
    return false;
  }
});

async function handleAskGemini(history) {
  // Retrieve the stored API Key
  const data = await chrome.storage.sync.get('geminiApiKey');
  const apiKey = data.geminiApiKey;
  
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('API_KEY_MISSING');
  }

  const systemInstruction = 'Sen bir okuma asistanısın. Kullanıcı sana ana metinden bir bölüm (seçilen_metin) verecek ve bununla ilgili bir soru soracak. Ana sayfayı kaydırmadan okumaya devam edebilmesi için kısa, net ve odaklı bir cevap ver.';

  // Map our internal chat history format to Gemini API requirements
  const contents = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: contents,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      }
    })
  });

  if (!response.ok) {
    let errorMessage = `HTTP Hata Kodu: ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson.error && errorJson.error.message) {
        errorMessage = errorJson.error.message;
      }
    } catch (_) {}
    throw new Error(errorMessage);
  }

  const result = await response.json();
  
  try {
    if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts[0]) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Geçersiz yanıt formatı alındı.');
    }
  } catch (e) {
    throw new Error('Gemini API yanıtı çözümlenirken hata oluştu: ' + e.message);
  }
}
