# Selection Popup Assistant (Seçim Pop-up Asistanı)

Mouse ile web sayfalarında (özellikle NotebookLM, ChatGPT veya döküman okuma sayfalarında) metin seçtiğinizde beliren, Gemini API destekli ve Shadow DOM izolasyonlu premium bir okuma ve chat asistanı Chrome eklentisidir.

---

## 🌟 Özellikler

- **Shadow DOM İzolasyonu**: Eklentinin arayüzü ve tüm CSS stilleri Shadow DOM ile korunmaktadır. Ziyaret edilen web sitesinin CSS kuralları (reset CSS vb.) asistan panelinin görünümünü bozamaz; aynı şekilde asistanın kodları da ziyaret edilen siteyi etkilemez.
- **Konuşma Geçmişi (Chat History)**: Seçtiğiniz metinle ilgili asistan panelinde sohbet edebilirsiniz. Yapay zeka konuşma boyunca önceki sorularınızı ve yanıtları hatırlar.
- **Scroll Güvenliği (Overscroll Containment)**: Asistan panelinin içini kaydırırken ana sayfanın arka planda kayması (`scroll chaining`) tamamen engellenmiştir.
- **Exit Gestures (Pratik Kapatma)**: `Esc` tuşuna basarak veya panel dışındaki boş bir alana tıklayarak paneli yumuşak bir fade/scale animasyonuyla kapatabilirsiniz.
- **Premium Arayüz & Glassmorphism**: Yarı saydam arka plan, ince neon sınırlar, mikro animasyonlar ve şık yazı tipleriyle modern bir karanlık mod (dark mode) tasarımı sunar.
- **Güvenli API Anahtarı Yönetimi**: Gemini API anahtarınız kod içerisinde sabit (hardcoded) tutulmaz. Eklentinin Ayarlar (Options) sayfası üzerinden tarayıcının yerel hafızasına (`chrome.storage.sync`) kaydedilir.
- **CSP (Content Security Policy) Aşımı**: Web sitelerinin güvenlik politikalarına takılmamak adına istekler arka plan servis işçisi (`background.js`) üzerinden güvenli bir şekilde yönlendirilir.

---

## 🚀 Kurulum Adımları

Eklentiyi yerel geliştirici modu ile tarayıcınıza yüklemek için şu adımları izleyin:

1. Bu depoyu (repository) bilgisayarınıza indirin veya klonlayın.
2. Google Chrome tarayıcınızı açın ve adres çubuğuna `chrome://extensions/` yazarak gidin.
3. Sağ üst köşede bulunan **Geliştirici modu** (Developer mode) seçeneğini aktif hale getirin.
4. Sol üst köşede beliren **Paketlenmemiş öğe yükle** (Load unpacked) butonuna tıklayın.
5. İndirdiğiniz/klonladığınız proje klasörünü seçerek yükleyin.

---

## 🔑 Yapılandırma (API Anahtarı Ekleme)

Eklentinin çalışabilmesi için bir Gemini API anahtarına ihtiyacınız vardır:

1. Tarayıcınızın araç çubuğundaki eklentiler ikonuna tıklayarak **Selection Popup Assistant**'ı bulun.
2. Sağ tıklayıp **Seçenekler** (Options) butonuna basın (veya `chrome://extensions/` sayfasında eklentinin detaylarına girerek "Uzantı seçenekleri" seçeneğine tıklayın).
3. [Google AI Studio](https://aistudio.google.com/) üzerinden ücretsiz olarak alabileceğiniz API anahtarını kutucuğa yapıştırın ve **Ayarları Kaydet** butonuna tıklayın.

---

## 💻 Kullanım Rehberi

1. Herhangi bir web sayfasını açın (örneğin Wikipedia, ChatGPT veya NotebookLM). *Eğer sayfa zaten açıksa kurulum sonrası sayfayı bir kez yenileyin.*
2. Okuduğunuz metinden herhangi bir bölümü farenizle (mouse) seçin.
3. Seçtiğiniz metnin hemen altında belirecek olan mor renkli **Panel Aç** butonuna tıklayın.
4. Açılan pencerede seçtiğiniz metnin önizlemesini göreceksiniz. Alttaki kutucuğa sorunuzu yazarak (`Enter` veya gönder butonu ile) asistanla konuşmaya başlayın.
5. Paneli taşımak için üst başlık alanından tutup sürükleyebilirsiniz. Kapatmak için sağ üstteki **X** ikonuna basabilir, **Esc** tuşuna basabilir veya ekranın boş bir yerine tıklayabilirsiniz.

---

## 🛠️ Kullanılan Teknolojiler

- **Manifest V3** standardı
- **HTML5 & Vanilla CSS3** (Cam efekti / Glassmorphic UI)
- **Vanilla JavaScript** (ES6+)
- **Google Gemini API** (Varsayılan model: `gemini-2.5-flash`)
