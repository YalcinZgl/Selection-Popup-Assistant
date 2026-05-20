# Selection Popup Assistant 🚀

A premium Manifest V3 Chrome Extension powered by the Google Gemini API. Designed specifically for deep reading environments (like NotebookLM, ChatGPT, or long documents), this extension brings an isolated, glassmorphic chat assistant directly to your selected text, eliminating context switching and scroll fatigue.

---

## 🌟 Features

* **Shadow DOM Isolation:** The assistant UI and all CSS styles are fully encapsulated inside a Shadow DOM. Target website CSS rules (like reset stylesheets) cannot distort the panel's appearance, and the extension's code will never interfere with the host website.
* **Conversational Memory (Chat History):** Engage in deep follow-up discussions regarding your selected text. The AI remembers previous questions and responses throughout the active session.
* **Scroll Lock & Safety (Overscroll Containment):** While scrolling inside the assistant panel, background scroll chaining on the main web page is completely blocked.
* **Exit Gestures:** Easily close the panel with a smooth fade/scale micro-animation by pressing the `Esc` key or clicking anywhere outside the popup.
* **Premium Glassmorphic UI:** Offers a modern dark-mode experience featuring a semi-transparent blurred background, subtle neon borders, micro-animations, and clean typography.
* **Secure API Key Management:** Your Gemini API key is never hardcoded. It is securely saved to the browser's local synchronized storage (`chrome.storage.sync`) via the extension's Options page.
* **CSP (Content Security Policy) Bypass:** To avoid web security policy blocks on strict platforms, all API requests are safely routed through a background service worker (`background.js`).

---

## 🚀 Installation Steps

Follow these steps to load the extension locally in Developer Mode:

1. **Download the Code:** Clone or download this repository as a `.zip` file to your computer and extract it.
2. **Open Extensions Page:** Open Google Chrome and navigate to `chrome://extensions/` in the address bar.
3. **Enable Developer Mode:** Toggle the **Developer mode** switch in the top-right corner to active.
4. **Load Unpacked:** Click the **Load unpacked** button that appears in the top-left corner.
5. **Select Folder:** Choose the extracted project directory (the folder containing `manifest.json`) to install.

---

## 🔑 Configuration (Adding Your API Key)

To bring your assistant to life, you need a Gemini API key:

1. Click the extensions puzzle piece icon in your browser toolbar and find **Selection Popup Assistant**.
2. Right-click it and select **Options** (or go to `chrome://extensions/`, click **Details** on the extension card, and click **Extension options**).
3. Generate a free API key via [Google AI Studio](https://aistudio.google.com/), paste it into the input box, and click **Save Settings**.

---

## 💻 User Guide

1. Open any web page (e.g., Wikipedia, ChatGPT, or NotebookLM). *Note: If the page was already open, refresh it once after installation.*
2. Highlight/select any portion of text with your mouse cursor.
3. Click the purple **Open Panel** action button that dynamically pops up near your selection.
4. The panel will open, displaying a preview of your selected context. Type your question in the input box below and hit `Enter` (or click the send icon) to start chatting.
5. **Controls:** Drag the window by holding down on the top header bar. Close it by clicking the `X` icon, hitting `Esc`, or clicking outside the window.

---

## 🛠️ Tech Stack

* **Manifest V3** Architecture
* HTML5 & Vanilla CSS3 (Glassmorphic Styling)
* Vanilla JavaScript (ES6+)
* Google Gemini API (Default model: `gemini-2.5-flash`)
