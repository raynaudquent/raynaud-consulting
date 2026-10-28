/* Progression du cours, enregistrée dans le navigateur. */
(function () {
  var CLE = "rc-cours-1-unites";
  var TOTAL = 8;

  function lire() {
    try { return JSON.parse(localStorage.getItem(CLE)) || []; } catch (e) { return []; }
  }
  function ecrire(liste) {
    try { localStorage.setItem(CLE, JSON.stringify(liste)); } catch (e) {}
  }

  var faites = lire();
  var cases = document.querySelectorAll("input[data-unit]");
  var items = document.querySelectorAll("#sommaire li");

  function afficher() {
    var n = faites.length;
    document.getElementById("bar").style.width = (n / TOTAL * 100) + "%";
    document.getElementById("progress-label").textContent =
      n + (n > 1 ? " unités" : " unité") + " sur " + TOTAL + (n > 1 ? " terminées" : " terminée");
    items.forEach(function (li, i) { li.classList.toggle("done", faites.indexOf(i + 1) > -1); });
    var hint = document.getElementById("exam-hint");
    if (hint) hint.textContent = n >= TOTAL ? "Toutes les unités sont terminées : vous pouvez passer l'examen." : "L'examen s'ouvre quand les 8 unités sont cochées.";
  }

  cases.forEach(function (c) {
    var u = parseInt(c.getAttribute("data-unit"), 10);
    c.checked = faites.indexOf(u) > -1;
    c.addEventListener("change", function () {
      faites = faites.filter(function (x) { return x !== u; });
      if (c.checked) faites.push(u);
      faites.sort();
      ecrire(faites);
      afficher();
    });
  });

  afficher();
})();
