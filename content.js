(function() {
  // Prevent duplicate execution
  if (document.getElementById('text-selection-assistant-host')) return;

  // Create host container for Shadow DOM
  const host = document.createElement('div');
  host.id = 'text-selection-assistant-host';
  
  // Basic styles to position host off-screen without interfering with layout
  host.style.position = 'absolute';
  host.style.top = '0';
  host.style.left = '0';
  host.style.width = '0';
  host.style.height = '0';
  host.style.zIndex = '2147483647';
  host.style.pointerEvents = 'none';
  
  document.body.appendChild(host);

  // Attach shadow root to isolate styles
  const shadowRoot = host.attachShadow({ mode: 'open' });

  // Add CSS styles
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

    :host {
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --bg-glass: rgba(15, 23, 42, 0.88);
      --border-glass: rgba(255, 255, 255, 0.08);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --shadow-premium: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15);
      --font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* Floating action trigger button */
    .trigger-btn {
      position: absolute;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 6px 12px;
      background: linear-gradient(135deg, var(--primary), #8b5cf6);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      font-family: var(--font-family);
      font-size: 12px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
      cursor: pointer;
      opacity: 0;
      transform: scale(0.9) translateY(5px);
      transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      user-select: none;
    }

    .trigger-btn.visible {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }

    .trigger-btn:hover {
      background: linear-gradient(135deg, var(--primary-hover), #7c3aed);
      transform: scale(1.05) translateY(-1px);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.5);
    }

    .trigger-btn:active {
      transform: scale(0.98) translateY(0);
    }

    .trigger-btn svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }

    /* Main Chat Popup Window */
    .popup-window {
      position: fixed;
      z-index: 2147483647;
      width: 380px;
      height: 380px;
      background: var(--bg-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-glass);
      border-radius: 16px;
      box-shadow: var(--shadow-premium);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: var(--font-family);
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    }

    .popup-window.visible {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    .popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid var(--border-glass);
      cursor: grab;
      user-select: none;
    }

    .popup-header:active {
      cursor: grabbing;
    }

    .popup-title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .popup-title-group svg {
      width: 16px;
      height: 16px;
      color: var(--primary);
      fill: currentColor;
    }

    .popup-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-main);
      letter-spacing: 0.2px;
    }

    .popup-close-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
    }

    .popup-close-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ef4444;
    }

    .popup-close-btn svg {
      width: 14px;
      height: 14px;
      stroke: currentColor;
      stroke-width: 2.5;
      fill: none;
    }

    .popup-body {
      flex: 1;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-sizing: border-box;
      background: radial-gradient(circle at top left, rgba(99, 102, 241, 0.08), transparent 60%);
      overflow: hidden;
    }

    /* Selected Text Preview */
    .preview-container {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 8px 10px;
      max-height: 70px;
      overflow-y: auto;
      overscroll-behavior: contain;
      font-size: 11px;
      line-height: 1.4;
      color: #cbd5e1;
      font-style: italic;
      transition: box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .preview-label {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--primary);
      font-weight: 700;
      margin-bottom: 2px;
      font-style: normal;
    }

    /* Chat Thread */
    .chat-thread {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 4px;
    }

    /* Chat Welcome Message */
    .welcome-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      text-align: center;
      gap: 8px;
      color: var(--text-muted);
    }

    .welcome-message svg {
      width: 24px;
      height: 24px;
      stroke: var(--text-muted);
      stroke-width: 2;
      fill: none;
      opacity: 0.5;
    }

    .welcome-message span {
      font-size: 11px;
    }

    /* Chat Bubbles */
    .message {
      max-width: 85%;
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 12px;
      line-height: 1.45;
      word-break: break-word;
      animation: fadeInMsg 0.2s ease-out forwards;
    }

    @keyframes fadeInMsg {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .message.user {
      align-self: flex-end;
      background: linear-gradient(135deg, var(--primary), #8b5cf6);
      color: #ffffff;
      border-bottom-right-radius: 2px;
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
    }

    .message.assistant {
      align-self: flex-start;
      background: rgba(255, 255, 255, 0.05);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-bottom-left-radius: 2px;
    }

    /* Simple markdown rendering within bubbles */
    .message.assistant code {
      background: rgba(255, 255, 255, 0.08);
      padding: 1px 4px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 11px;
      color: #f472b6;
    }
    .message.assistant ul {
      margin: 4px 0;
      padding-left: 16px;
    }
    .message.assistant li {
      margin: 2px 0;
    }
    .message.assistant strong {
      color: #ffffff;
      font-weight: 600;
    }

    .message.error {
      align-self: center;
      background: rgba(239, 68, 68, 0.1);
      color: #fca5a5;
      border: 1px solid rgba(239, 68, 68, 0.15);
      font-size: 11px;
      text-align: center;
      max-width: 90%;
      border-radius: 8px;
    }

    .message.error a {
      color: #818cf8;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
    }

    .message.error a:hover {
      text-decoration: underline;
    }

    /* Typing Indicator */
    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border-bottom-left-radius: 2px;
      align-self: flex-start;
      animation: fadeInMsg 0.2s ease-out forwards;
    }

    .typing-dot {
      width: 5px;
      height: 5px;
      background: var(--text-muted);
      border-radius: 50%;
      animation: typingDot 1.4s infinite ease-in-out;
      opacity: 0.4;
    }

    .typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typingDot {
      0%, 100% { transform: translateY(0); opacity: 0.4; }
      50% { transform: translateY(-3px); opacity: 0.95; }
    }

    /* Input Bar */
    .chat-input-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(15, 23, 42, 0.4);
      border: 1px solid var(--border-glass);
      border-radius: 10px;
      padding: 3px 6px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .chat-input-bar:focus-within {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
    }

    .chat-input {
      flex: 1;
      background: transparent;
      border: none;
      color: #ffffff;
      font-family: inherit;
      font-size: 12px;
      padding: 8px 4px;
      outline: none;
    }

    .chat-input::placeholder {
      color: var(--text-muted);
    }

    .chat-input:disabled {
      opacity: 0.5;
    }

    .chat-send-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s, background-color 0.15s;
    }

    .chat-send-btn:hover:not(:disabled) {
      color: var(--primary);
      background: rgba(255, 255, 255, 0.05);
    }

    .chat-send-btn:disabled {
      opacity: 0.3;
      cursor: default;
    }

    .chat-send-btn svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }

    /* Scrollbars */
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.22);
    }

    /* Visual Feedback Flash */
    @keyframes flash {
      0% {
        box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
        border-color: rgba(99, 102, 241, 0.4);
      }
      100% {
        box-shadow: 0 0 0 6px rgba(99, 102, 241, 0);
        border-color: rgba(255, 255, 255, 0.05);
      }
    }
    .flash-effect {
      animation: flash 0.6s ease-out;
    }
  `;
  shadowRoot.appendChild(style);

  // 1. Create Floating Trigger Button
  const triggerBtn = document.createElement('button');
  triggerBtn.className = 'trigger-btn';
  triggerBtn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
    </svg>
    <span>Panel Aç</span>
  `;
  shadowRoot.appendChild(triggerBtn);

  // 2. Create Floating Draggable Popup Window
  const popup = document.createElement('div');
  popup.className = 'popup-window';
  popup.innerHTML = `
    <div class="popup-header">
      <div class="popup-title-group">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        <span class="popup-title">Okuma Asistanı</span>
      </div>
      <button class="popup-close-btn" title="Kapat">
        <svg viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="popup-body">
      <div class="preview-container">
        <div class="preview-label">Seçilen Metin</div>
        <span class="selected-text-content"></span>
      </div>
      <div class="chat-thread">
        <div class="welcome-message">
          <svg viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
          </svg>
          <span>Metin hakkında ne sormak istersiniz?</span>
        </div>
      </div>
      <div class="chat-input-bar">
        <input type="text" class="chat-input" placeholder="Seçilen metinle ilgili sorun...">
        <button class="chat-send-btn" title="Gönder">
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  shadowRoot.appendChild(popup);

  const closeBtn = popup.querySelector('.popup-close-btn');
  const previewContainer = popup.querySelector('.preview-container');
  const selectedTextContent = popup.querySelector('.selected-text-content');
  const header = popup.querySelector('.popup-header');
  const chatThread = popup.querySelector('.chat-thread');
  const chatInput = popup.querySelector('.chat-input');
  const sendBtn = popup.querySelector('.chat-send-btn');

  let selectedText = '';
  let chatHistory = []; // Local history formatted as { role: 'user'|'assistant', text: string }
  const buttonWidth = 90; 
  const buttonHeight = 30;

  // 3. Selection Event Handlers
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('keyup', handleKeyUp);

  // Close active components when clicking outside host
  document.addEventListener('mousedown', (e) => {
    const path = e.composedPath();
    if (!path.includes(host)) {
      closePopup();
    }
  });

  // Close active components on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (popup.classList.contains('visible')) {
        closePopup();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  });

  // Prevent scroll propagation from spacebar or arrow keys inside popup
  popup.addEventListener('keydown', (e) => {
    if (['Space', ' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.key)) {
      e.stopPropagation();
    }
  });

  function closePopup() {
    popup.classList.remove('visible');
    hideTriggerButton();
  }

  function handleMouseUp(e) {
    setTimeout(processSelection, 20);
  }

  function handleKeyUp(e) {
    processSelection();
  }

  function processSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      hideTriggerButton();
      return;
    }

    const text = selection.toString().trim();
    if (text.length === 0) {
      hideTriggerButton();
      return;
    }

    selectedText = text;

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      showTriggerButton(rect);
    } catch (e) {
      hideTriggerButton();
    }
  }

  function showTriggerButton(rect) {
    let left = rect.left + window.scrollX + (rect.width / 2) - (buttonWidth / 2);
    let top = rect.bottom + window.scrollY + 8;

    if (rect.bottom + buttonHeight + 16 > window.innerHeight) {
      top = rect.top + window.scrollY - buttonHeight - 8;
    }

    const maxLeft = window.innerWidth + window.scrollX - buttonWidth - 16;
    left = Math.max(16, Math.min(left, maxLeft));

    triggerBtn.style.left = `${left}px`;
    triggerBtn.style.top = `${top}px`;
    triggerBtn.classList.add('visible');
  }

  function hideTriggerButton() {
    triggerBtn.classList.remove('visible');
  }

  // 4. Click Trigger to Open and Reset Chat
  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideTriggerButton();
    
    // Set Selection Preview text content
    selectedTextContent.textContent = selectedText;
    
    // Position center viewport initially
    const popupWidth = 380;
    const popupHeight = 360;
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;

    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;

    // Open/reset thread
    resetChatSession();
    popup.classList.add('visible');

    // Auto-focus the chat input field
    setTimeout(() => {
      chatInput.focus();
    }, 50);

    // Trigger visual flash
    previewContainer.classList.remove('flash-effect');
    void previewContainer.offsetWidth;
    previewContainer.classList.add('flash-effect');
  });

  function resetChatSession() {
    chatHistory = [];
    chatThread.innerHTML = `
      <div class="welcome-message">
        <svg viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
        </svg>
        <span>Metin hakkında ne sormak istersiniz?</span>
      </div>
    `;
    chatInput.value = '';
    enableInputState(true);
  }

  closeBtn.addEventListener('click', () => {
    closePopup();
  });

  // 5. Send Message Handling
  sendBtn.addEventListener('click', handleSendMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Clear input
    chatInput.value = '';

    // Remove welcome state if present
    const welcome = chatThread.querySelector('.welcome-message');
    if (welcome) welcome.remove();

    // Render User Message
    appendMessage('user', text);
    chatHistory.push({ role: 'user', text: text });
    scrollToBottom();

    // Set loading indicator
    const loadingBubble = appendLoadingIndicator();
    scrollToBottom();
    enableInputState(false);

    // Prepare API history list. 
    // The very first message needs to supply the selected text context.
    const apiHistory = [];
    chatHistory.forEach((msg, idx) => {
      if (idx === 0 && msg.role === 'user') {
        apiHistory.push({
          role: 'user',
          text: `Seçilen Metin:\n"""\n${selectedText}\n"""\n\nSoru: ${msg.text}`
        });
      } else {
        apiHistory.push(msg);
      }
    });

    // Send Message to Background Script
    chrome.runtime.sendMessage({
      action: 'ask-gemini',
      history: apiHistory
    }, (response) => {
      // Remove loading indicator
      loadingBubble.remove();
      enableInputState(true);
      
      if (response && response.success) {
        appendMessage('assistant', response.reply);
        chatHistory.push({ role: 'assistant', text: response.reply });
      } else {
        const errorMsg = response ? response.error : 'Sunucu bağlantısı koptu.';
        appendErrorMessage(errorMsg);
      }
      scrollToBottom();
      chatInput.focus();
    });
  }

  function appendMessage(role, text) {
    const bubble = document.createElement('div');
    bubble.className = `message ${role}`;
    
    if (role === 'assistant') {
      bubble.innerHTML = formatMarkdown(text);
    } else {
      bubble.textContent = text;
    }
    
    chatThread.appendChild(bubble);
  }

  function appendErrorMessage(errorMsg) {
    const bubble = document.createElement('div');
    bubble.className = 'message error';
    
    if (errorMsg === 'API_KEY_MISSING') {
      bubble.innerHTML = 'Gemini API anahtarı bulunamadı. Lütfen uzantı <a class="settings-link">Ayarlarından</a> bir anahtar ekleyin.';
      bubble.querySelector('.settings-link').addEventListener('click', (e) => {
        e.preventDefault();
        chrome.runtime.sendMessage({ action: 'open-options' });
      });
    } else {
      bubble.textContent = `Hata: ${errorMsg}`;
    }
    
    chatThread.appendChild(bubble);
  }

  function appendLoadingIndicator() {
    const bubble = document.createElement('div');
    bubble.className = 'typing-indicator';
    bubble.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatThread.appendChild(bubble);
    return bubble;
  }

  function formatMarkdown(text) {
    // Escape standard HTML tags for XSS protection
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Inline codes: `code`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold text formatting: **text**
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Simple markdown lists conversion: - item
    html = html.replace(/^\s*-\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, ''); // merge sequential lists

    // Replace linebreaks with tags
    html = html.replace(/\n/g, '<br>');

    return html;
  }

  function enableInputState(enabled) {
    chatInput.disabled = !enabled;
    sendBtn.disabled = !enabled;
  }

  function scrollToBottom() {
    chatThread.scrollTop = chatThread.scrollHeight;
  }

  // 6. Drag & Drop Mechanics
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  header.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // Left click only

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    
    initialLeft = parseInt(popup.style.left, 10) || 0;
    initialTop = parseInt(popup.style.top, 10) || 0;

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    
    e.preventDefault(); // Prevent text highlights
  });

  function handleDrag(e) {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newLeft = initialLeft + dx;
    let newTop = initialTop + dy;

    // Boundary constraints
    const maxX = window.innerWidth - 380; // width
    const maxY = window.innerHeight - 360; // height

    newLeft = Math.max(0, Math.min(newLeft, maxX));
    newTop = Math.max(0, Math.min(newTop, maxY));

    popup.style.left = `${newLeft}px`;
    popup.style.top = `${newTop}px`;
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

})();
