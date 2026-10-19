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
  var items = document.querySelectorAll(".gallery figure, .listing");
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
    // Prefill the vehicle from a For Sale "Ask about this car" link.
    var wanted = new URLSearchParams(window.location.search).get("vehicle");
    if (wanted && form.elements.vehicle) {
      form.elements.vehicle.value = wanted;
      if (form.elements.message && !form.elements.message.value) {
        form.elements.message.value = "Hi, I'm interested in the " + wanted + ". Is it still available?";
      }
    }
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

// Home page tachometer: revs to redline and bounces off the limiter on load.
(function () {
  var tach = document.getElementById("tach");
  if (!tach) return;
  var needle = document.getElementById("tach-needle");
  var readout = document.getElementById("tach-readout");
  var shift = document.getElementById("tach-shift");
  var MAX = 8000, REDLINE = 7000;

  function set(rpm) {
    needle.style.transform = "rotate(" + (-135 + 270 * rpm / MAX) + "deg)";
    var hot = rpm >= REDLINE;
    readout.textContent = hot ? "REDLINE" : String(Math.round(rpm / 50) * 50);
    readout.classList.toggle("hot", hot);
    shift.classList.toggle("on", rpm >= 6500);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { set(7900); return; }

  // Keyframes: [time ms, rpm]. Idle, a quick blip, then a full pull to the limiter.
  var keys = [[0, 0], [450, 1100], [800, 900], [1150, 2600], [1450, 1800], [2900, 7950],
              [3020, 7600], [3140, 7950], [3260, 7650], [3380, 7950], [3500, 7700], [3700, 7900]];
  var ease = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  var start = null;
  function frame(now) {
    if (start === null) start = now;
    var t = now - start, i = 1;
    while (i < keys.length && keys[i][0] < t) i++;
    if (i >= keys.length) { set(keys[keys.length - 1][1]); return; }
    var a = keys[i - 1], b = keys[i];
    set(a[1] + (b[1] - a[1]) * ease((t - a[0]) / (b[0] - a[0])));
    requestAnimationFrame(frame);
  }
  set(0);
  setTimeout(function () { requestAnimationFrame(frame); }, 400);
})();
