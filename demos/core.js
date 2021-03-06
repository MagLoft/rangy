const rangy = window['rangy-loader'](window, document)

function gEBI(id) {
  return document.getElementById(id);
}

function getFirstRange() {
  var sel = rangy.getSelection();
  return sel.rangeCount ? sel.getRangeAt(0) : null;
}

function reportSelectionText() {
  alert( rangy.getSelection().toString() );
}

function reportSelectionHtml() {
  alert( rangy.getSelection().toHtml() );
}

function inspectSelection() {
  alert( rangy.getSelection().inspect() );
}

function deleteSelection() {
  rangy.getSelection().deleteFromDocument();
}

function collapseSelectionToStart() {
  rangy.getSelection().collapseToStart();
}

function collapseSelectionToEnd() {
  rangy.getSelection().collapseToEnd();
}

function showContent(frag) {
  var displayEl = gEBI("selectioncontent");
  var codeEl = gEBI("code");
  while (displayEl.firstChild) {
      displayEl.removeChild(displayEl.firstChild);
  }
  if (frag) {
      displayEl.appendChild(frag);
  }
  codeEl.value = displayEl.innerHTML;
}

function inspectRange() {
  var range = getFirstRange();
  if (range) {
      alert(range.inspect());
  }
}

function reportRangeHtml() {
  var range = getFirstRange();
  if (range) {
      alert(range.toHtml());
  }
}

function extractRange() {
  var range = getFirstRange();
  if (range) {
      showContent(range.extractContents());
  }
}

function cloneRange() {
  var range = getFirstRange();
  if (range) {
      showContent(range.cloneContents());
  }
}

function deleteRange() {
  var range = getFirstRange();
  if (range) {
      range.deleteContents();
  }
}

function surroundRange() {
  var range = getFirstRange();
  if (range) {
      var el = document.createElement("span");
      el.style.backgroundColor = "pink";
      if (range.canSurroundContents(el)) {
          range.surroundContents(el);
      } else {
          alert("Unable to surround range because range partially selects a non-text node. See DOM4 spec for more information.");
      }
  }
}

function insertNodeAtRange() {
  var range = getFirstRange();
  if (range) {
      var el = document.createElement("span");
      el.style.backgroundColor = "lightblue";
      el.style.color = "red";
      el.style.fontWeight = "bold";
      el.appendChild(document.createTextNode("**INSERTED NODE**"));
      range.insertNode(el);
      rangy.getSelection().setSingleRange(range);
  }
}

function createButton(parentNode, clickHandler, value) {
  var button = document.createElement("input");
  button.type = "button";
  button.unselectable = true;
  button.className = "unselectable";
  button.ontouchstart = button.onmousedown = function() {
      clickHandler();
      return false;
  };
  button.value = value;
  parentNode.appendChild(button);
  button = null;
}

window.onload = function() {
  // Enable multiple selections in IE
  try {
      document.execCommand("MultipleSelection", true, true);
  } catch (ex) {}

  // Create selection buttons
  var selectionButtonsContainer = gEBI("selectionButtons");
  createButton(selectionButtonsContainer, reportSelectionText, "Get selection text");
  createButton(selectionButtonsContainer, inspectSelection, "Inspect selection");
  createButton(selectionButtonsContainer, reportSelectionHtml, "Get selection HTML");
  createButton(selectionButtonsContainer, deleteSelection, "Delete selection");
  createButton(selectionButtonsContainer, collapseSelectionToStart, "Collapse to start");
  createButton(selectionButtonsContainer, collapseSelectionToEnd, "Collapse to end");

  // Create Range buttons
  var rangeButtonsContainer = gEBI("rangeButtons");
  createButton(rangeButtonsContainer, inspectRange, "Inspect");
  createButton(rangeButtonsContainer, reportRangeHtml, "Get HTML");
  createButton(rangeButtonsContainer, extractRange, "Extract");
  createButton(rangeButtonsContainer, cloneRange, "Clone");
  createButton(rangeButtonsContainer, deleteRange, "Delete");
  createButton(rangeButtonsContainer, surroundRange, "Surround (where possible)");
  createButton(rangeButtonsContainer, insertNodeAtRange, "Insert node");

  // Display the control range element in IE
  if (rangy.features.implementsControlRange) {
      gEBI("controlRange").style.display = "block";
  }
};
