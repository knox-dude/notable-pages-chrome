// content.js

//makes a strikethrough div elm with child as a child
function createStrikethroughDiv() {
  let div = document.createElement('div');
  div.classList.add("notable-pages-strikethrough");
  div.style.textDecoration = 'line-through';;
  return div;
}




function wrapTextNodesWithDiv(selection, id) {
  if (!selection || selection.rangeCount === 0) {
    return;
  }

  // Get the first range from the selection
  const range = selection.getRangeAt(0);

  // Create a DocumentFragment to hold the modified nodes
  let fragment = document.createDocumentFragment();
  const range_clone = range.cloneContents();

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // If it's a text node, wrap it with a div
      return createStrikethroughDiv(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // If it's an element node, copy it
      let newElement = node.cloneNode();

      // Recursively process its children
      for (let i = 0; i < node.childNodes.length; i++) {
        newElement.appendChild(processNode(node.childNodes[i]));
      }

      // Append the new element with modified children to the fragment
      return newElement;
    } else {
      // For other node types, clone them and append to the fragment
      return node.cloneNode(true);
    }
  }

  // Process each child node of the range
  for (let i = 0; i < range.cloneContents().childNodes.length; i++) {
    let node = range.cloneContents().childNodes[i];
    fragment.append(processNode(node));
  }

  // Remove the original content and insert the modified content
  range.deleteContents();
  range.insertNode(fragment);
}


  // Iterate through the nodes in the range
  // for (let i = 0; i < range_clone.childNodes.length; i++) {
  //   let node = range_clone.childNodes[i];
  //   queue.push(node)
  //   let node_descendent = node.cloneNode(true);

  //   while (node_descendent.hasChildNodes() || queue.length > 0) {
  //     queue.push(node_descendent.childNodes);
  //   }

  //   // Check if the node is a text node
  //   if (node.nodeType === Node.TEXT_NODE) {
  //     // Wrap the text node with the created div
  //     let wrappedNode = createDivWithId(id);
  //     id += 1;
  //     wrappedNode.appendChild(node.cloneNode(true));
  //     fragment.appendChild(wrappedNode);
  //   } else {
  //     // For non-text nodes, just append them to the fragment
  //     fragment.appendChild(node.cloneNode(true));
  //   }
  // }



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




    

    // function processNode(node) {
    //   if (node.nodeType === Node.ELEMENT_NODE) {
    //     for (let i = 0; i < node.children.length; i++) {
    //       processNode(node.children[i]);
    //     }
    //   } else if (node.nodeType === Node.TEXT_NODE) {
    //     node.style.textDecoration = "line-through";
    //     node.classList.add('notable-pages-strikethrough');
    //   }
    // }
    // let og = range.extractContents();
    // // const nodeIterator = Document.createNodeIterator(range.startContainer);

    // for (let i = 0; i < og.children.length; i++) {
    //   let child = og.children[i];
    //   processNode(child);
    // }
    // range.insertNode(og);

    // let original = range.extractContents().children;
    // // let fragment = document.createDocumentFragment();
    // // Process each child node of the range
    // for (let i = 0; i < original.length; i++) {
    //   let node = original[i];
    //   processNode(node);
    //   fragment.appendChild(node);
    // }
    // range.extractContents();
    // range.insertNode(fragment);
    // console.log(original);
    // console.log(fragment);
    // let span1 = createSpanWithId(id);
    // range.surroundContents(span1);

    // let span2 = createSpanWithId(id);

    // span2.appendChild(range.extractContents());
    // range.insertNode(span2);



    // else {
    //   // change style of nodes in selection
    //   for (let node of range.commonAncestorContainer.children) {
    //     if (node === range.startContainer) {
    //       let elm_range = document.createRange();
    //       elm_range.selectNode(node);
    //       elm_range.startOffset = range.startOffset;
    //       elm_range.endOffset = node.end_offset;
    //     }
    //     else if (range.comparePoint(node, range) === 1) {
    //       break;
    //     }
    //   }

    //   for (let node of nodes_to_modify) {
    //     node.style.textDecoration = 'line-through';
    //     node.classList
    //     let parent_node = node.parentNode;
    //     let new_node = createSpanWithId(id);
    //     new_node.appendChild(node);
    //     parent_node.replaceChild(new_node, node)

    //     // parent_node.insertBefore(new_node, node);
    //     // new_node.appendChild(node);
    //     id++;

    //     // parent_node.appendChild(new_node);
    //   }
    // }
    sendResponse({action:"strikethrough", range:rangeJSON})
    return true
  }
);


/**
 *     
const spanElement = document.createElement('span');
spanElement.style.textDecoration = 'line-through';

 */