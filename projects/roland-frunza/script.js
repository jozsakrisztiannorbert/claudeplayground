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

  // Ident: plays on every load; clicking the logo at the top of the page replays it.
  var ident = document.getElementById("ident");
  var brand = document.getElementById("brand");
  if (ident && brand) {
    brand.addEventListener("click", function (event) {
      if (window.scrollY > 10 || root.getAttribute("data-motion") === "off") return;
      event.preventDefault();
      var fresh = ident.cloneNode(true);
      ident.parentNode.replaceChild(fresh, ident);
      ident = fresh;
    });
  }

  // Hero key light follows the pointer (pointer events only, no scroll listeners).
  var hero = document.querySelector(".hero");
  if (hero && window.matchMedia && window.matchMedia("(hover: hover)").matches) {
    var keyFrame = null;
    hero.addEventListener("pointermove", function (event) {
      if (keyFrame) return;
      keyFrame = window.requestAnimationFrame(function () {
        var rect = hero.getBoundingClientRect();
        hero.style.setProperty("--kx", ((event.clientX - rect.left) / rect.width * 100).toFixed(1) + "%");
        hero.style.setProperty("--ky", ((event.clientY - rect.top) / rect.height * 100).toFixed(1) + "%");
        keyFrame = null;
      });
    });
  }

  // Grade comparison: the range input drives the split, by drag, click, touch or keyboard.
  var compare = document.getElementById("compare");
  var compareRange = document.getElementById("compare-range");
  if (compare && compareRange) {
    var setSplit = function () { compare.style.setProperty("--split", compareRange.value + "%"); };
    compareRange.addEventListener("input", setSplit);
    setSplit();
  }

  // Film player: frames open an in-page viewer with previous and next; the Instagram link stays available.
  var player = document.getElementById("player");
  var frameLinks = Array.prototype.slice.call(document.querySelectorAll(".frame[data-film]"));
  if (player && typeof player.showModal === "function" && frameLinks.length) {
    var pImg = document.getElementById("player-img");
    var pTitle = document.getElementById("player-title");
    var pKind = document.getElementById("player-kind");
    var pLength = document.getElementById("player-length");
    var pLink = document.getElementById("player-link");
    var current = 0;
    var opener = null;
    var show = function (index) {
      current = (index + frameLinks.length) % frameLinks.length;
      var link = frameLinks[current];
      var img = link.querySelector("img");
      pImg.src = img.currentSrc || img.src;
      pImg.alt = img.alt;
      pTitle.textContent = link.getAttribute("data-title");
      pKind.textContent = link.getAttribute("data-kind");
      pLength.textContent = link.getAttribute("data-length");
      pLink.href = link.href;
    };
    frameLinks.forEach(function (link, index) {
      link.addEventListener("click", function (event) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        opener = link;
        show(index);
        document.body.classList.add("has-dialog");
        player.showModal();
        document.getElementById("player-close").focus();
      });
    });
    document.getElementById("player-prev").addEventListener("click", function () { show(current - 1); });
    document.getElementById("player-next").addEventListener("click", function () { show(current + 1); });
    document.getElementById("player-close").addEventListener("click", function () { player.close(); });
    player.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
    player.addEventListener("click", function (event) { if (event.target === player) player.close(); });
    player.addEventListener("close", function () {
      document.body.classList.remove("has-dialog");
      if (opener) opener.focus();
    });
  }

  // Current section in the nav.
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__links a[href^='#']"));
  if (navLinks.length && "IntersectionObserver" in window) {
    var sectionFor = {};
    navLinks.forEach(function (link) {
      var section = document.getElementById(link.getAttribute("href").slice(1));
      if (section) sectionFor[section.id] = link;
    });
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = sectionFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    Object.keys(sectionFor).forEach(function (id) { navIo.observe(document.getElementById(id)); });
  }
})();
