(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  // Motion preference: the footer toggle wins over the system setting, remembered per browser.
  var motionBtn = document.getElementById("motion-toggle");
  var readPref = function () { try { return localStorage.getItem("rf-motion"); } catch (e) { return null; } };
  var writePref = function (v) { try { localStorage.setItem("rf-motion", v); } catch (e) { /* storage unavailable */ } };
  var systemReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var applyMotion = function (state) {
    if (state === "off") root.setAttribute("data-motion", "off");
    else if (state === "on") root.setAttribute("data-motion", "on");
    else root.removeAttribute("data-motion");
    var off = state === "off" || (state !== "on" && systemReduced);
    if (motionBtn) {
      motionBtn.setAttribute("aria-pressed", String(off));
      motionBtn.textContent = off ? "Turn motion on" : "Reduce motion";
    }
  };
  var pref = readPref();
  applyMotion(pref === "off" || pref === "on" ? pref : null);
  if (motionBtn) {
    motionBtn.addEventListener("click", function () {
      var currentlyOff = motionBtn.getAttribute("aria-pressed") === "true";
      var next = currentlyOff ? "on" : "off";
      writePref(next);
      applyMotion(next);
    });
  }

  // Hero headline: one word at a time, like a title card.
  var h1 = document.getElementById("hero-title");
  if (h1 && !h1.querySelector(".w")) {
    var words = h1.textContent.trim().split(/\s+/);
    h1.textContent = "";
    words.forEach(function (word, i) {
      var outer = document.createElement("span");
      outer.className = "w";
      outer.style.setProperty("--i", String(i));
      var inner = document.createElement("span");
      inner.textContent = word;
      outer.appendChild(inner);
      h1.appendChild(outer);
      if (i < words.length - 1) h1.appendChild(document.createTextNode(" "));
    });
  }

  // Scroll reveals. Everything is visible without JS; with JS, blocks rise in as they enter.
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal], .book"));
  var revealAll = function () { revealTargets.forEach(function (el) { el.classList.add("in"); }); };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
    // Safety net: nothing stays hidden if an observer never fires (print, odd viewports).
    window.setTimeout(revealAll, 4000);
  } else {
    revealAll();
  }

  // Selected films: the hovered frame lights the section behind it.
  var films = document.getElementById("films");
  var ambient = document.getElementById("films-ambient");
  if (films && ambient) {
    var frames = films.querySelectorAll(".frame");
    var hideTimer = null;
    Array.prototype.forEach.call(frames, function (frame) {
      var img = frame.querySelector("img");
      var light = function () {
        if (!img) return;
        window.clearTimeout(hideTimer);
        var src = img.currentSrc || img.src;
        if (ambient.getAttribute("src") !== src) ambient.setAttribute("src", src);
        films.classList.add("is-lit");
      };
      var dim = function () {
        hideTimer = window.setTimeout(function () { films.classList.remove("is-lit"); }, 200);
      };
      frame.addEventListener("pointerenter", light);
      frame.addEventListener("focus", light);
      frame.addEventListener("pointerleave", dim);
      frame.addEventListener("blur", dim);
    });
  }

  // Marquee pause control (autoplaying motion needs a pause affordance).
  var marquee = document.querySelector(".marquee");
  var toggle = document.getElementById("marquee-toggle");
  if (marquee && toggle) {
    toggle.addEventListener("click", function () {
      var paused = marquee.classList.toggle("is-paused");
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.textContent = paused ? "Play" : "Pause";
    });
  }

  // Copy email with a selectable-text fallback.
  var copyBtn = document.getElementById("copy-email");
  var emailEl = document.getElementById("email-value");
  var copyStatus = document.getElementById("copy-status");
  if (copyBtn && emailEl && copyStatus) {
    copyBtn.addEventListener("click", function () {
      var text = emailEl.textContent.trim();
      var done = function () { copyStatus.textContent = "Copied"; window.setTimeout(function () { copyStatus.textContent = ""; }, 2400); };
      var fallback = function () {
        var range = document.createRange();
        range.selectNodeContents(emailEl);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        copyStatus.textContent = "Selected, press copy";
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  // Booking form: inline validation, no network submission in the design preview.
  var form = document.getElementById("booking-form");
  if (form) {
    var status = document.getElementById("form-status");
    var submit = document.getElementById("submit-btn");

    var setError = function (id, message) {
      var input = document.getElementById(id);
      var error = document.getElementById(id + "-error");
      var field = input ? input.closest(".field") : null;
      if (error) error.textContent = message || "";
      if (field) field.classList.toggle("is-invalid", Boolean(message));
      if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("f-name");
      var email = document.getElementById("f-email");
      var firstInvalid = null;

      var nameMissing = !name.value.trim();
      setError("f-name", nameMissing ? "Add your name so I know who to answer." : "");
      if (nameMissing && !firstInvalid) firstInvalid = name;

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      setError("f-email", emailOk ? "" : "Enter an email address like ana@example.com so I can reply.");
      if (!emailOk && !firstInvalid) firstInvalid = email;

      if (firstInvalid) {
        firstInvalid.focus();
        status.className = "form__status";
        status.textContent = "";
        return;
      }

      submit.disabled = true;
      status.className = "form__status";
      status.textContent = "Sending…";

      // Design preview: the request is not sent anywhere. Wire this to a form backend before launch.
      window.setTimeout(function () {
        form.classList.add("is-sent");
        status.className = "form__status is-ok";
        status.textContent = "Request sent. I will answer within two working days.";
        submit.disabled = false;
        form.reset();
      }, 700);
    });

    var inputs = form.querySelectorAll("input, textarea, select");
    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") setError(input.id, "");
      });
    });
  }
})();
