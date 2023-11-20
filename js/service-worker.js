const DYNAMIC_SCRIPT_ID = 'dynamic-strikethrough-script';


// First, inject the strikethrough functionality in content.js 
chrome.action.onClicked.addListener(async (tab) => {
  // TO DO: register the script once so it doesn't generate multiple scripts on action

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['js/content.js']
  })
});

// now we should have a listener on the main page. So add context menu option (which should now work)

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "strikethrough",
    title: 'Strikethrough',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(info => {
  applyStrikethrough();
})

//Gets active tab and sends it a message to prompt strikethrough of selected text
async function applyStrikethrough() {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {});
  console.log(response)
}