// content.js

//makes a strikethrough div elm with child as a child
function createStrikethroughDiv() {
  let div = document.createElement('div');
  div.classList.add("notable-pages-strikethrough");
  div.style.textDecoration = 'line-through';;
  return div;
}

// get selected text and add a span around it with text-decoration line-through
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    const selection = window.getSelection();
    let range = selection.getRangeAt(0);

    const rangeJSON = JSON.stringify(range);
    const selectionJSON = JSON.stringify(selection);

    // if selection fits in one text element, surround it and return
    if (range.startContainer === range.endContainer) {
      range.surroundContents(div);
    }

    else {
      let started = false;
      let finished= false;
      for (let child of range.commonAncestorContainer.children) {

        // if selection is anywhere in the container, highlight that whole container
        if (child.contains(range.startContainer)) {
          started = true;
        }

        // once started, keep highlighting until finished
        if (started) {
          if (child.contains(range.endContainer)) {
            finished=true;
          }
          let new_r = document.createRange();
          new_r.selectNode(child);
          div = createStrikethroughDiv();
          new_r.surroundContents(div);
          if (finished) {
            break;
          }
        }
      }
    }

    sendResponse({action:"strikethrough", range:rangeJSON})
    return true
  }
);


/**
 *     
const spanElement = document.createElement('span');
spanElement.style.textDecoration = 'line-through';

 */