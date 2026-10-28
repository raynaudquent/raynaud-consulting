/* Code de réussite : empreinte du nom, de l'e-mail, du score et de la date.
 * Sert à contrôler qu'une demande de certificat n'a pas été modifiée à la main. */
window.CodeReussite = (function () {
  function empreinte(texte) {
    var h = 0x811c9dc5;
    for (var i = 0; i < texte.length; i++) {
      h ^= texte.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(36).toUpperCase().padStart(7, "0").slice(-7);
  }
  function normaliser(s) { return String(s || "").trim().replace(/\s+/g, " ").toLowerCase(); }
  function calculer(cours, nom, email, score, date) {
    var cle = [cours, normaliser(nom), normaliser(email), score, date, "rc-academie"].join("|");
    return "C" + cours + "-" + date.replace(/-/g, "") + "-" + String(score).padStart(2, "0") + "-" + empreinte(cle);
  }
  return { calculer: calculer };
})();
