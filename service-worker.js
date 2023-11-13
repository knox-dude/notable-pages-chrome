chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "strikethrough",
    title: 'Strikethrough',
    contexts: ['selection'],
  });
});

async function applyStrikethrough() {
  const selectedText = window.getSelection().toString();
  const range = window.getSelection().getRangeAt(0);
  console.log(selectedText, range);

  // Send a message to the background script
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, { selectedText, range });
  console.log(response)
}

chrome.contextMenus.onClicked.addListener(info => {
  applyStrikethrough();
})