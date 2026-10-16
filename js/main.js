// Jackson Hills Automotive: small site behaviors (mobile menu, gallery, contact form).
(function () {
  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Gallery filters
  var chips = document.querySelectorAll(".chip[data-filter]");
  var items = document.querySelectorAll(".gallery figure");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      items.forEach(function (item) {
        item.hidden = !(f === "all" || item.getAttribute("data-cat") === f);
      });
    });
  });

  // Gallery lightbox
  var box = document.getElementById("lightbox");
  if (box) {
    var boxImg = box.querySelector("img");
    var boxCap = box.querySelector("figcaption");
    var closeBtn = box.querySelector(".lightbox-close");
    var lastFocus = null;
    var close = function () {
      box.hidden = true;
      if (lastFocus) lastFocus.focus();
    };
    document.querySelectorAll(".gallery button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        var cap = btn.parentElement.querySelector("figcaption strong");
        boxImg.src = img.getAttribute("src");
        boxImg.alt = img.alt;
        boxCap.textContent = cap ? cap.textContent : "";
        lastFocus = btn;
        box.hidden = false;
        closeBtn.focus();
      });
    });
    closeBtn.addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !box.hidden) close(); });
  }

  // Contact form. Until a form service is connected (see README), show a friendly notice.
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      if (form.getAttribute("action")) return; // a real endpoint is configured
      e.preventDefault();
      var status = document.getElementById("form-status");
      if (!form.checkValidity()) { form.reportValidity(); return; }
      status.hidden = false;
      status.textContent = "Thanks, " + (form.elements.name.value.split(" ")[0] || "friend") +
        ". This form isn't connected to an inbox yet, so please call or email us using the details on this page.";
    });
  }
})();
