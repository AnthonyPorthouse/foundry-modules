export function log(...messages) {
  console.log("[REBUFFED]", ...messages);
}

export function updateTextNode(selector, textValue) {
  document.querySelector(selector).childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() != "") {
      node.textContent = textValue;
    }
  });
}
