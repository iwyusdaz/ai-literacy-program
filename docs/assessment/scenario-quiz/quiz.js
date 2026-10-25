/* Scenario quiz — AI Literacy Program (MIT licensed code)
 * Loads items.json, renders one fieldset/legend per item, shows per-option
 * feedback in a live region after each answer, and a results summary by
 * objective at the end. No data is stored or sent anywhere.
 */
(function () {
  "use strict";

  var ICON_CORRECT = "✓";
  var ICON_WRONG = "✗";

  var form = document.getElementById("quiz-form");
  var loading = document.getElementById("loading");
  var resultsSection = document.getElementById("results");
  var overall = document.getElementById("overall");
  var byObjective = document.getElementById("by-objective");
  var nextSteps = document.getElementById("next-steps");
  var retryBtn = document.getElementById("retry");

  var items = [];
  var answered = {};

  fetch("items.json")
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(function (data) {
      items = data.items;
      render();
    })
    .catch(function () {
      loading.textContent =
        "Could not load items.json. Open this page through the website (or a local web server), not as a file:// URL.";
    });

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        node.setAttribute(k, attrs[k]);
      });
    }
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function render() {
    loading.hidden = true;
    items.forEach(function (item, qi) {
      var fs = el("fieldset", { "data-q": String(qi) });
      var legend = el("legend", null, (qi + 1) + " of " + items.length + " — " + item.stem);
      fs.appendChild(legend);

      var opts = el("div", { class: "options" });
      item.options.forEach(function (opt, oi) {
        var id = "q" + qi + "-o" + oi;
        var label = el("label", { for: id });
        var input = el("input", {
          type: "radio",
          name: "q" + qi,
          id: id,
          value: String(oi)
        });
        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + opt.text));
        opts.appendChild(label);
      });
      fs.appendChild(opts);

      var live = el("p", {
        class: "feedback",
        role: "status",
        "aria-live": "polite",
        id: "fb" + qi
      });
      fs.appendChild(live);
      form.appendChild(fs);
    });

    form.addEventListener("change", onAnswer);
    retryBtn.addEventListener("click", function () {
      window.location.reload();
    });
  }

  function onAnswer(e) {
    if (!e.target || e.target.name === undefined || e.target.name.indexOf("q") !== 0) return;
    var qi = parseInt(e.target.name.slice(1), 10);
    var oi = parseInt(e.target.value, 10);
    var item = items[qi];
    var opt = item.options[oi];
    var fs = form.querySelector('fieldset[data-q="' + qi + '"]');
    var live = document.getElementById("fb" + qi);

    fs.classList.add("answered");
    fs.classList.remove("was-correct", "was-wrong");

    var verdictText;
    if (opt.correct) {
      fs.classList.add("was-correct");
      verdictText = ICON_CORRECT + " Correct. ";
    } else {
      fs.classList.add("was-wrong");
      var correctIdx = item.options.findIndex(function (o) { return o.correct; });
      verdictText =
        ICON_WRONG + " Not quite — the better answer is option " +
        String.fromCharCode(65 + correctIdx) + ". ";
    }
    live.textContent = verdictText + opt.feedback;

    answered[qi] = opt.correct;
    if (Object.keys(answered).length === items.length) {
      showResults();
    }
  }

  function showResults() {
    var total = items.length;
    var correct = items.filter(function (_, qi) { return answered[qi]; }).length;

    overall.textContent =
      "You answered " + correct + " of " + total + " scenarios with the taught judgment (" +
      Math.round((correct / total) * 100) + "%). This is practice feedback, not a certificate.";

    // group by objective
    var groups = {};
    items.forEach(function (item, qi) {
      if (!groups[item.objective]) groups[item.objective] = { correct: 0, total: 0, questions: [] };
      groups[item.objective].total += 1;
      if (answered[qi]) groups[item.objective].correct += 1;
      groups[item.objective].questions.push(qi + 1);
    });

    byObjective.innerHTML = "";
    var table = el("table");
    var caption = el("caption", null, "Results by learning objective");
    var thead = el("thead");
    var hrow = el("tr");
    ["Objective", "Result", "Questions"].forEach(function (h) {
      hrow.appendChild(el("th", { scope: "col" }, h));
    });
    thead.appendChild(hrow);
    var tbody = el("tbody");
    Object.keys(groups).sort().forEach(function (objId) {
      var g = groups[objId];
      var row = el("tr");
      row.appendChild(el("td", null, objId));
      row.appendChild(el("td", null, g.correct + " / " + g.total + (g.correct === g.total ? " " + ICON_CORRECT : " " + ICON_WRONG)));
      row.appendChild(el("td", null, "Q" + g.questions.join(", Q")));
      tbody.appendChild(row);
    });
    table.appendChild(caption);
    table.appendChild(thead);
    table.appendChild(tbody);
    byObjective.appendChild(table);

    var weak = Object.keys(groups).filter(function (objId) {
      return groups[objId].correct < groups[objId].total;
    });
    nextSteps.innerHTML = "";
    if (weak.length === 0) {
      nextSteps.appendChild(
        el("p", null,
          "All objectives clear. Next: the performance task — correct a flawed AI-drafted memo and log your checks.")
      );
      var linkTask = el("a", { href: "../performance-task.html" }, "Go to the performance task");
      nextSteps.appendChild(el("p")).appendChild(linkTask);
    } else {
      var ul = el("ul");
      var LABELS = {
        "W1.1": "Module 1 — What AI is (and isn't)",
        "W1.2": "Module 1 — What AI is (and isn't)",
        "W2.1": "Module 2 — Checking outputs",
        "W2.2": "Module 2 — Checking outputs",
        "W3.1": "Module 3 — Data and privacy",
        "W3.2": "Module 3 — Data and privacy",
        "W4.1": "Module 4 — Oversight and escalation",
        "W4.2": "Module 4 — Oversight and escalation"
      };
      weak.forEach(function (objId) {
        var li = el("li");
        li.appendChild(document.createTextNode(objId + " — review "));
        var a = el("a", { href: moduleFor(objId) }, LABELS[objId] || "the modules");
        li.appendChild(a);
        ul.appendChild(li);
      });
      nextSteps.appendChild(el("p", null, "Objectives with misses — worth a re-read before the performance task:"));
      nextSteps.appendChild(ul);
    }

    resultsSection.hidden = false;
    resultsSection.setAttribute("tabindex", "-1");
    resultsSection.focus({ preventScroll: false });
  }

  function moduleFor(objId) {
    switch (objId) {
      case "W1.1":
      case "W1.2":
        return "../../workplace/module-1-what-ai-is.html";
      case "W2.1":
      case "W2.2":
        return "../../workplace/module-2-checking-outputs.html";
      case "W3.1":
      case "W3.2":
        return "../../workplace/module-3-data-and-privacy.html";
      case "W4.1":
      case "W4.2":
        return "../../workplace/module-4-oversight-and-escalation.html";
      default:
        return "../../workplace/index.html";
    }
  }
})();
