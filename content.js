// content.js

// get selected text and add a span around it with text-decoration line-through
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // const selectedText = window.getSelection().toString();
    const range = window.getSelection().getRangeAt(0);
    const spanElement = document.createElement('span');
    spanElement.style.textDecoration = 'line-through';
    range.surroundContents(spanElement);
  }
);