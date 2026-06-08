// SafeJSON Popup

document.getElementById("open-tool").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://safejson.vercel.app" });
});

// Check current tab status via content script messaging
(async () => {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab?.id) return;

    // Try to ping the content script for its status
    chrome.tabs.sendMessage(
      tab.id,
      { action: "getStatus" },
      (response) => {
        if (chrome.runtime.lastError) return; // Content script not injected
        const status = document.getElementById("status");
        if (response?.formatted) {
          status.textContent = "JSON formatted by SafeJSON";
          status.className = "status";
        }
      }
    );
  } catch {
    // Quiet
  }
})();
