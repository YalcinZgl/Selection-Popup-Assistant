// Save API key to chrome.storage
function saveOptions() {
  const apiKey = document.getElementById('api-key').value.trim();
  const status = document.getElementById('status');

  chrome.storage.sync.set({
    geminiApiKey: apiKey
  }, () => {
    // Show success message
    status.textContent = 'Ayarlar başarıyla kaydedildi!';
    status.className = 'status-msg success';
    
    // Fade out status message after 3 seconds
    setTimeout(() => {
      status.style.opacity = '0';
      status.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        status.className = 'status-msg';
        status.style.opacity = '1';
      }, 500);
    }, 2500);
  });
}

// Restore API key from storage
function restoreOptions() {
  chrome.storage.sync.get({
    geminiApiKey: ''
  }, (items) => {
    document.getElementById('api-key').value = items.geminiApiKey;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save-btn').addEventListener('click', saveOptions);
