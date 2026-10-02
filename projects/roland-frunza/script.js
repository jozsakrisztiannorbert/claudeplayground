(function () {
  "use strict";

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
