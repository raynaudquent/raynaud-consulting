/* Boutons de paiement : lien Stripe si configuré dans config.js, sinon e-mail de demande. */
(function () {
  var cfg = window.ACADEMIE || { email: "infos@brame-store.com", paiement: {} };

  function lienPaiement(cle, options) {
    options = options || {};
    var url = (cfg.paiement || {})[cle];
    if (url) {
      var params = [];
      if (options.email) params.push("prefilled_email=" + encodeURIComponent(options.email));
      if (options.reference) params.push("client_reference_id=" + encodeURIComponent(options.reference));
      return { href: url + (params.length ? (url.indexOf("?") > -1 ? "&" : "?") + params.join("&") : ""), externe: true };
    }
    var sujet = options.sujet || "Demande – " + (options.label || cle);
    var corps = options.corps || "Bonjour,\n\nJe souhaite réserver : " + (options.label || cle) +
      ".\n\nNom :\nEntreprise / magasin :\nSIRET :\nTéléphone :\nDisponibilités :\n\nMerci.";
    return { href: "mailto:" + cfg.email + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(corps), externe: false };
  }

  function brancher(el, cle, options) {
    var l = lienPaiement(cle, options);
    el.href = l.href;
    if (l.externe) { el.target = "_blank"; el.rel = "noopener"; } else { el.removeAttribute("target"); }
  }

  document.querySelectorAll("[data-pay]").forEach(function (el) {
    brancher(el, el.getAttribute("data-pay"), { label: el.getAttribute("data-label") });
  });

  window.AcademiePaiement = { lien: lienPaiement, brancher: brancher };
})();
