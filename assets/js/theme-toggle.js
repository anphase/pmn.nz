(function () {
  // The pre-paint script in _includes/head.html applies the stored choice;
  // keep its key and values in step with this file.
  var KEY = "theme";

  function readChoice(storage) {
    try {
      var value = storage.getItem(KEY);
      return value === "light" || value === "dark" ? value : "system";
    } catch (error) {
      return "system";
    }
  }

  function saveChoice(storage, choice) {
    try {
      if (choice === "system") {
        storage.removeItem(KEY);
      } else {
        storage.setItem(KEY, choice);
      }
    } catch (error) {
      // Storage blocked: the choice still applies to this page.
    }
  }

  function applyChoice(root, choice) {
    if (choice === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", choice);
    }
  }

  if (typeof module !== "undefined") {
    module.exports = { readChoice: readChoice, saveChoice: saveChoice, applyChoice: applyChoice };
    return;
  }

  function getStorage() {
    try {
      return window.localStorage;
    } catch (error) {
      return null;
    }
  }

  var toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  var storage = getStorage();
  var buttons = toggle.querySelectorAll("button[data-theme-choice]");

  function markPressed(choice) {
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === choice));
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var choice = button.dataset.themeChoice;
      saveChoice(storage, choice);
      applyChoice(document.documentElement, choice);
      markPressed(choice);
    });
  });

  // Keep other open tabs in step when the choice changes in one of them.
  window.addEventListener("storage", function () {
    var choice = readChoice(storage);
    applyChoice(document.documentElement, choice);
    markPressed(choice);
  });

  markPressed(document.documentElement.getAttribute("data-theme") || "system");
  toggle.hidden = false;
})();
