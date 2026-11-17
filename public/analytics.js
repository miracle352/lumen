// Google Analytics 4, loaded only after the visitor opts in (GDPR / ePrivacy).
// Nothing is sent to Google, and no cookie is set, until "Accept" is clicked.
(function () {
  var ID = "G-LUMEN0001";
  var KEY = "lumen-consent"; // "granted" | "denied"
  var banner = document.getElementById("consent");

  function choice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function remember(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadGA() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", ID);
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ID);
    document.head.appendChild(s);
    // Page-specific conversion, e.g. data-ga-event="subscribe" data-ga-plan="plus".
    var ev = document.body.getAttribute("data-ga-event");
    if (ev) gtag("event", ev, { plan: document.body.getAttribute("data-ga-plan") || undefined });
  }

  // Remove GA's first-party cookies (_ga, _ga_<container>) when consent is withdrawn.
  function clearGACookies() {
    var parts = location.hostname.split(".");
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name !== "_ga" && name.indexOf("_ga_") !== 0) return;
      for (var i = 0; i < parts.length; i++) {
        var domain = parts.slice(i).join(".");
        document.cookie = name + "=; Max-Age=0; path=/; domain=" + domain;
        document.cookie = name + "=; Max-Age=0; path=/; domain=." + domain;
      }
      document.cookie = name + "=; Max-Age=0; path=/";
    });
  }

  function show() { banner.hidden = false; }
  function hide() { banner.hidden = true; }

  document.getElementById("accept-all").addEventListener("click", function () {
    remember("granted");
    hide();
    if (!window.gtag) loadGA();
  });
  document.getElementById("reject-all").addEventListener("click", function () {
    var wasGranted = choice() === "granted";
    remember("denied");
    clearGACookies();
    hide();
    // Withdrawing consent: reload so the GA script is no longer on the page.
    if (wasGranted) location.reload();
  });
  var settings = document.getElementById("cookie-settings");
  if (settings) settings.addEventListener("click", function (e) { e.preventDefault(); show(); });

  var c = choice();
  if (c === "granted") loadGA();
  else if (c !== "denied") show();
})();
