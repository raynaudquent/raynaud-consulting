/* Examen du cours 1 : 20 questions tirées de la banque de 40, 30 minutes, réussite à 14/20. */
(function () {
  var COURS = 1;
  var NB_CONNAISSANCES = 15, NB_CAS = 5, SEUIL = 14, DUREE = 30 * 60;
  var ATTENTE = 24 * 3600 * 1000;
  var K_UNITES = "rc-cours-1-unites", K_ECHEC = "rc-examen-1-echec", K_REUSSITE = "rc-examen-1-reussite", K_EN_COURS = "rc-examen-1-en-cours";
  var UNITES = ["", "Le rôle du vendeur conseil", "L'accueil", "Les étapes de la vente", "Connaître ses produits",
    "Communiquer en surface de vente", "Plusieurs clients et temps forts", "Mises en situation", "Votre plan d'action"];

  var banque = window.QUESTIONS_COURS_1 || [];
  var cfg = window.ACADEMIE || { email: "infos@brame-store.com", paiement: {} };
  var $ = function (id) { return document.getElementById(id); };

  function lire(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function ecrire(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function effacer(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function montrer(id) {
    ["ecran-verrou", "ecran-attente", "ecran-intro", "ecran-examen", "ecran-resultat"].forEach(function (e) { $(e).hidden = e !== id; });
    window.scrollTo(0, 0);
  }
  function melanger(t) {
    t = t.slice();
    for (var i = t.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = t[i]; t[i] = t[j]; t[j] = x; }
    return t;
  }
  function aujourdHui() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function echapper(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function listeUnites(nums) {
    nums = nums.filter(function (v, i, t) { return t.indexOf(v) === i; }).sort();
    return nums.map(function (u) { return "unité " + u + " (" + UNITES[u] + ")"; }).join(", ");
  }

  /* --- Démarrage --- */
  function demarrer() {
    var reussite = lire(K_REUSSITE);
    if (reussite) { afficherResultat(reussite); return; }

    var unites = lire(K_UNITES) || [];
    if (unites.length < 8) { $("nb-unites").textContent = unites.length; montrer("ecran-verrou"); return; }

    var echec = lire(K_ECHEC);
    if (echec && Date.now() - echec.t < ATTENTE) { afficherAttente(echec); return; }

    var enCours = lire(K_EN_COURS);
    if (enCours && Date.now() < enCours.fin) { lancer(enCours); return; }
    if (enCours) { effacer(K_EN_COURS); }

    montrer("ecran-intro");
  }

  function afficherAttente(echec) {
    montrer("ecran-attente");
    if (echec.revoir && echec.revoir.length) $("attente-revoir").textContent = "À revoir en priorité : " + listeUnites(echec.revoir) + ".";
    function maj() {
      var reste = ATTENTE - (Date.now() - echec.t);
      if (reste <= 0) { effacer(K_ECHEC); location.reload(); return; }
      var h = Math.floor(reste / 3600000), m = Math.ceil((reste % 3600000) / 60000);
      if (m === 60) { h += 1; m = 0; }
      $("attente").textContent = (h ? h + " h " : "") + m + " min";
    }
    maj(); setInterval(maj, 30000);
  }

  /* --- Tirage et affichage --- */
  $("form-intro").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var connaissances = banque.map(function (q, i) { return i; }).filter(function (i) { return i < 30; });
    var cas = banque.map(function (q, i) { return i; }).filter(function (i) { return i >= 30; });
    var tirage = melanger(connaissances).slice(0, NB_CONNAISSANCES).sort(function (a, b) { return a - b; })
      .concat(melanger(cas).slice(0, NB_CAS).sort(function (a, b) { return a - b; }));
    var session = {
      nom: $("nom").value.trim().replace(/\s+/g, " "),
      email: $("email").value.trim(),
      questions: tirage.map(function (i) { return { i: i, ordre: melanger([0, 1, 2, 3]) }; }),
      reponses: {},
      fin: Date.now() + DUREE * 1000
    };
    ecrire(K_EN_COURS, session);
    lancer(session);
  });

  var minuteur = null;
  function lancer(session) {
    var html = session.questions.map(function (item, n) {
      var q = banque[item.i];
      return '<fieldset class="q"><legend><span>' + (n + 1) + ".</span> " + echapper(q.q) + "</legend>" +
        item.ordre.map(function (o, k) {
          var coche = session.reponses[n] === o ? " checked" : "";
          return '<label class="opt"><input type="radio" name="q' + n + '" value="' + o + '"' + coche + "> <span>" +
            "ABCD"[k] + ". " + echapper(q.o[o]) + "</span></label>";
        }).join("") + "</fieldset>";
    }).join("");
    $("questions").innerHTML = html;
    montrer("ecran-examen");

    function compter() {
      var n = Object.keys(session.reponses).length;
      $("repondu").textContent = n + " / " + session.questions.length;
    }
    $("questions").addEventListener("change", function (ev) {
      if (ev.target.type !== "radio") return;
      session.reponses[parseInt(ev.target.name.slice(1), 10)] = parseInt(ev.target.value, 10);
      ecrire(K_EN_COURS, session);
      compter();
      $("manque").hidden = true;
    });
    compter();

    function tic() {
      var reste = Math.max(0, Math.round((session.fin - Date.now()) / 1000));
      $("chrono").textContent = Math.floor(reste / 60) + ":" + String(reste % 60).padStart(2, "0");
      document.querySelector(".timer").classList.toggle("low", reste <= 300);
      if (reste <= 0) { corriger(session); }
    }
    tic();
    minuteur = setInterval(tic, 1000);

    $("form-examen").onsubmit = function (ev) {
      ev.preventDefault();
      var manquantes = session.questions.length - Object.keys(session.reponses).length;
      if (manquantes > 0 && $("manque").hidden) {
        $("manque").textContent = "Il vous reste " + manquantes + (manquantes > 1 ? " questions" : " question") +
          " sans réponse. Cliquez à nouveau sur « Valider » pour envoyer quand même.";
        $("manque").hidden = false;
        return;
      }
      corriger(session);
    };
  }

  /* --- Correction --- */
  function corriger(session) {
    if (minuteur) { clearInterval(minuteur); minuteur = null; }
    var score = 0, revoir = [];
    session.questions.forEach(function (item, n) {
      var q = banque[item.i];
      if (session.reponses[n] === q.a) score++; else revoir.push(q.u);
    });
    effacer(K_EN_COURS);
    var date = aujourdHui();
    var res = { nom: session.nom, email: session.email, score: score, total: session.questions.length, date: date, revoir: revoir, t: Date.now() };
    if (score >= SEUIL) {
      res.code = window.CodeReussite.calculer(COURS, session.nom, session.email, score, date);
      ecrire(K_REUSSITE, res);
      effacer(K_ECHEC);
    } else {
      ecrire(K_ECHEC, { t: res.t, revoir: revoir, score: score });
    }
    afficherResultat(res);
  }

  function afficherResultat(res) {
    montrer("ecran-resultat");
    var ok = res.score >= SEUIL;
    $("ecran-resultat").classList.toggle("fail", !ok);
    $("res-score").textContent = res.score + " / " + res.total;
    $("res-titre").textContent = ok ? "Examen réussi" : "Examen non réussi";
    $("res-message").textContent = ok ? "Bravo " + res.nom.split(" ")[0] + ", vous avez réussi l'examen." : "Il manque " + (SEUIL - res.score) + " bonne" + (SEUIL - res.score > 1 ? "s réponses" : " réponse") + " pour réussir.";
    $("res-texte").textContent = ok
      ? "Vous avez validé le cours « Les fondamentaux de la vente en magasin spécialisé » le " + res.date.split("-").reverse().join("/") + "."
      : "Vous pourrez repasser l'examen dans 24 heures, avec de nouvelles questions.";
    $("res-revoir").textContent = res.revoir && res.revoir.length ? (ok ? "Points à consolider : " : "À revoir en priorité : ") + listeUnites(res.revoir) + "." : "";
    $("res-reussite").hidden = !ok;
    var actions = $("res-actions");
    actions.innerHTML = "";
    if (ok) {
      $("res-code").textContent = res.code;
      var corps = function (offre) {
        return "Bonjour,\n\nJ'ai réussi l'examen du cours 1 et je souhaite commander : " + offre + ".\n\n" +
          "Nom sur le certificat : " + res.nom + "\nE-mail : " + res.email + "\nScore : " + res.score + "/" + res.total +
          "\nDate : " + res.date + "\nCode de réussite : " + res.code + "\n\nMerci de m'envoyer le lien de paiement.";
      };
      window.AcademiePaiement.brancher($("btn-certificat"), "certificat", { email: res.email, reference: res.code,
        sujet: "Certificat cours 1 – " + res.nom, corps: corps("Certificat à l'unité (39 €)") });
      window.AcademiePaiement.brancher($("btn-pass"), "pass", { email: res.email, reference: res.code,
        sujet: "Pass Certificats – " + res.nom, corps: corps("Pass Certificats (89 €)") });
      var renonce = $("renonce"), btns = $("btns-commande");
      renonce.onchange = function () {
        btns.style.opacity = renonce.checked ? "1" : ".5";
        btns.style.pointerEvents = renonce.checked ? "auto" : "none";
        btns.setAttribute("aria-disabled", renonce.checked ? "false" : "true");
      };
      actions.innerHTML = '<a class="btn btn-light" href="./">Retour à l\'Académie</a>';
    } else {
      actions.innerHTML = '<a class="btn btn-arrow" href="cours-1.html">Revoir le cours</a>';
    }
  }

  demarrer();
})();
