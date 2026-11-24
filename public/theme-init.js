// Applies the saved or system theme before first paint to avoid a flash.
(function () {
  var t = null;
  try { t = localStorage.getItem("eab-theme"); } catch (e) {}
  if (t !== "light" && t !== "dark") {
    t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = t;
})();
