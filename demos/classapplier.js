function gEBI(id) {
  return document.getElementById(id);
}

var italicYellowBgApplier, boldRedApplier, pinkLinkApplier;

function toggleItalicYellowBg() {
  italicYellowBgApplier.toggleSelection();
}

function toggleBoldRed() {
  boldRedApplier.toggleSelection();
}

function togglePinkLink() {
  pinkLinkApplier.toggleSelection();
}

window.onload = function () {
  rangy.init();

  // Enable buttons
  var classApplierModule = rangy.modules.ClassApplier;

  // Next line is pure paranoia: it will only return false if the browser has no support for ranges,
  // selections or TextRanges. Even IE 5 would pass this test.
  if (rangy.supported && classApplierModule && classApplierModule.supported) {
    boldRedApplier = rangy.createClassApplier("boldRed", {
      tagNames: ["span", "img"]
    });

    italicYellowBgApplier = rangy.createClassApplier("italicYellowBg", {
      tagNames: ["span", "a", "b", "img"]
    });

    pinkLinkApplier = rangy.createClassApplier("pinkLink", {
      elementTagName: "a",
      elementProperties: {
        href: "http://code.google.com/p/rangy",
        title: "Rangy home page"
      }
    });

    var toggleBoldRedButton = gEBI("toggleBoldRedButton");
    toggleBoldRedButton.disabled = false;
    toggleBoldRedButton.ontouchstart = toggleBoldRedButton.onmousedown = function () {
      toggleBoldRed();
      return false;
    };

    var toggleItalicYellowBgButton = gEBI("toggleItalicYellowBgButton");
    toggleItalicYellowBgButton.disabled = false;
    toggleItalicYellowBgButton.ontouchstart = toggleItalicYellowBgButton.onmousedown = function () {
      toggleItalicYellowBg();
      return false;
    };

    var togglePinkLinkButton = gEBI("togglePinkLinkButton");
    togglePinkLinkButton.disabled = false;
    togglePinkLinkButton.ontouchstart = togglePinkLinkButton.onmousedown = function () {
      togglePinkLink();
      return false;
    };
  }
};
