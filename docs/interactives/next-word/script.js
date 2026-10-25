/* Next-word interactive — AI Literacy Program
 * Vanilla JS. No network calls, no storage. MIT licensed.
 *
 * The "model" is a tiny hard-coded bigram chain: for each sentence starter,
 * every word maps to a probability distribution over the next word.
 * END-of-sentence is the token ".". Temperature reshapes the distribution:
 * p_i' = p_i^(1/T), renormalized (T<1 sharpens, T>1 flattens).
 */
(function () {
  "use strict";

  var END = ".";

  var MODEL = {
    s1: {
      text: "The goalkeeper caught the",
      "": [["ball", 58], ["rebound", 14], ["corner", 10], ["flag", 8], ["cold", 6], ["trophy", 4]],
      ball: [["and", 28], ["just", 24], ["cleanly", 20], ["again", 14], ["with", 8], [END, 6]],
      rebound: [["and", 30], ["then", 20], ["cleanly", 18], ["near", 12], ["quick", 10], [END, 10]],
      corner: [["flag", 25], ["kick", 25], ["and", 20], ["near", 10], ["quickly", 10], [END, 10]],
      flag: [["and", 30], ["near", 25], [END, 15], ["then", 10], ["at", 10], ["quickly", 10]],
      cold: [[END, 40], ["air", 30], ["water", 20], ["and", 10]],
      trophy: [["and", 35], [END, 25], ["with", 15], ["again", 15], ["at", 10]]
    },
    s2: {
      text: "She opened the door and",
      "": [["saw", 30], ["stepped", 22], ["smiled", 15], ["listened", 12], ["gasped", 11], ["froze", 10]],
      saw: [["the", 30], ["him", 22], ["nothing", 18], ["her", 14], ["everyone", 10], [END, 6]],
      stepped: [["inside", 30], ["back", 22], ["into", 18], ["through", 12], ["aside", 10], [END, 8]],
      smiled: [["at", 32], [END, 22], ["anyway", 16], ["again", 14], ["slowly", 16]],
      listened: [["for", 28], [END, 24], ["again", 18], ["carefully", 16], ["twice", 14]],
      gasped: [[END, 34], ["quietly", 22], ["loudly", 18], ["and", 16], ["twice", 10]],
      froze: [[END, 36], ["in", 24], ["for", 20], ["solid", 20]]
    },
    s3: {
      text: "The experiment showed that the",
      "": [["results", 28], ["hypothesis", 18], ["method", 15], ["theory", 14], ["data", 13], ["sample", 12]],
      results: [["were", 30], ["matched", 22], ["differed", 18], ["changed", 14], ["held", 10], [END, 6]],
      hypothesis: [["was", 34], ["needed", 22], ["held", 18], ["failed", 16], [END, 10]],
      method: [["worked", 28], ["was", 24], ["needed", 18], ["changed", 14], [END, 16]],
      theory: [["was", 30], ["predicted", 24], ["held", 18], ["collapsed", 16], [END, 12]],
      data: [["was", 30], ["showed", 22], ["matched", 18], ["differed", 14], [END, 16]],
      sample: [["was", 32], ["showed", 22], ["included", 18], ["differed", 14], [END, 14]]
    },
    s4: {
      text: "On Monday morning the",
      "": [["train", 32], ["meeting", 20], ["office", 16], ["weather", 12], ["traffic", 11], ["sun", 9]],
      train: [["was", 30], ["arrived", 24], ["left", 18], ["stopped", 14], [END, 14]],
      meeting: [["was", 32], ["started", 24], ["ran", 16], ["ended", 14], [END, 14]],
      office: [["was", 30], ["opened", 22], ["emptied", 18], ["hummed", 14], [END, 16]],
      weather: [["was", 34], ["turned", 22], ["changed", 18], [END, 16], ["held", 10]],
      traffic: [["was", 30], ["stopped", 22], ["cleared", 18], ["returned", 14], [END, 16]],
      sun: [["was", 30], ["rose", 24], ["returned", 18], ["disappeared", 16], [END, 12]]
    },
    s5: {
      text: "The best way to learn is",
      "": [["practice", 35], ["reading", 25], ["asking", 15], ["teaching", 12], ["trying", 8], ["sleeping", 5]],
      practice: [["with", 28], [END, 24], ["every", 18], ["and", 16], ["before", 14]],
      reading: [["the", 28], [END, 24], ["aloud", 20], ["widely", 16], ["slowly", 12]],
      asking: [["questions", 40], [END, 24], ["for", 20], ["why", 16]],
      teaching: [["someone", 32], [END, 26], ["it", 22], ["others", 20]],
      trying: [["it", 34], [END, 26], ["again", 22], ["anyway", 18]],
      sleeping: [["on", 30], [END, 28], ["well", 22], ["enough", 20]]
    },
    s6: {
      text: "The detective noticed that the",
      "": [["clue", 30], ["witness", 22], ["letter", 15], ["clock", 13], ["window", 11], ["dog", 9]],
      clue: [["was", 30], ["had", 22], ["pointed", 18], ["fitted", 14], [END, 16]],
      witness: [["was", 30], ["had", 24], ["changed", 18], ["lied", 14], [END, 14]],
      letter: [["was", 30], ["had", 24], ["arrived", 18], ["burned", 14], [END, 14]],
      clock: [["was", 32], ["had", 24], ["stopped", 20], ["ticked", 12], [END, 12]],
      window: [["was", 30], ["had", 24], ["faced", 18], ["opened", 14], [END, 14]],
      dog: [["was", 30], ["had", 24], ["barked", 20], ["waited", 12], [END, 14]]
    }
  };

  var GENERIC = [[END, 45], ["and", 15], ["the", 12], ["again", 10], ["then", 8], ["quickly", 10]];

  var starterSel = document.getElementById("starter");
  var generateBtn = document.getElementById("generate");
  var resetBtn = document.getElementById("reset");
  var sentenceOut = document.getElementById("sentence");
  var statusOut = document.getElementById("status");
  var doneMsg = document.getElementById("done");
  var tempInput = document.getElementById("temperature");
  var tempValue = document.getElementById("temp-value");
  var probBody = document.getElementById("prob-body");

  var words = [];      // generated words (strings); END stored as "."
  var finished = false;
  var chosenWord = null;

  function chain() {
    return MODEL[starterSel.value];
  }

  function currentContext() {
    // the last generated word is the bigram context; "" before any generation
    return words.length ? words[words.length - 1] : "";
  }

  function rawDistribution() {
    var c = chain();
    var dist = c[currentContext()];
    return dist || GENERIC;
  }

  function withTemperature(dist, t) {
    var adjusted = dist.map(function (pair) {
      return [pair[0], Math.pow(pair[1], 1 / t)];
    });
    var sum = adjusted.reduce(function (acc, p) { return acc + p[1]; }, 0);
    return adjusted
      .map(function (p) { return [p[0], (p[1] / sum) * 100]; })
      .sort(function (a, b) { return b[1] - a[1]; });
  }

  function pickWeighted(dist) {
    var r = Math.random() * 100;
    var acc = 0;
    for (var i = 0; i < dist.length; i++) {
      acc += dist[i][1];
      if (r <= acc) return dist[i][0];
    }
    return dist[dist.length - 1][0];
  }

  function sentenceHTML() {
    var starter = chain().text;
    var html = '<span class="starter">' + escapeHTML(starter) + "</span>";
    words.forEach(function (w) {
      if (w === END) {
        html += ".";
      } else {
        html += " " + '<span class="word">' + escapeHTML(w) + "</span>";
      }
    });
    return html;
  }

  function plainSentence() {
    return chain().text + (words.length ? " " + words.join(" ") : "");
  }

  function escapeHTML(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function renderTable(dist) {
    probBody.innerHTML = "";
    dist.forEach(function (pair) {
      var word = pair[0];
      var pct = pair[1];
      var tr = document.createElement("tr");
      if (chosenWord !== null && word === chosenWord) {
        tr.className = "chosen";
      }

      var tdWord = document.createElement("td");
      tdWord.textContent = word === END ? ". (end of sentence)" : word;
      if (chosenWord !== null && word === chosenWord) {
        tdWord.appendChild(document.createTextNode(" ← chosen"));
      }

      var tdBar = document.createElement("td");
      tdBar.className = "bar-cell";
      var bar = document.createElement("span");
      bar.className = "bar";
      bar.style.width = Math.max(2, pct) + "%";
      tdBar.appendChild(bar);

      var tdPct = document.createElement("td");
      tdPct.className = "pct";
      tdPct.textContent = pct.toFixed(1) + "%";

      tr.appendChild(tdWord);
      tr.appendChild(tdBar);
      tr.appendChild(tdPct);
      probBody.appendChild(tr);
    });
  }

  function renderStatus(message) {
    statusOut.textContent = message;
  }

  function updateTempLabel() {
    tempValue.textContent = Number(tempInput.value).toFixed(1);
  }

  function refresh(distribution) {
    sentenceOut.innerHTML = sentenceHTML();
    renderTable(distribution || withTemperature(rawDistribution(), Number(tempInput.value)));
  }

  function generate() {
    if (finished) return;
    var t = Number(tempInput.value);
    var dist = withTemperature(rawDistribution(), t);
    var word = pickWeighted(dist);
    chosenWord = word;
    words.push(word);

    if (word === END) {
      finished = true;
      generateBtn.disabled = true;
      doneMsg.hidden = false;
    }

    refresh(dist);
    var nextStep = words.length + 1;
    var shown = word === END ? "end of sentence" : "“" + word + "”";
    renderStatus(
      "Generated word " + nextStep + ": " + shown + ". Sentence so far: “" +
      plainSentence() + "”"
    );
  }

  function resetState(message) {
    words = [];
    chosenWord = null;
    finished = false;
    generateBtn.disabled = false;
    doneMsg.hidden = true;
    refresh();
    renderStatus(message);
  }

  generateBtn.addEventListener("click", generate);

  resetBtn.addEventListener("click", function () {
    resetState("Reset. The sentence is back to the starter. Press “Generate next word”.");
  });

  starterSel.addEventListener("change", function () {
    resetState(
      "New starter chosen: “" + chain().text + "…”. Press “Generate next word”."
    );
  });

  tempInput.addEventListener("input", function () {
    updateTempLabel();
    if (!finished) refresh();
  });

  // initial paint
  updateTempLabel();
  refresh();
})();
