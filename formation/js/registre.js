/* Lecture du registre des certificats (certificats.json) et informations sur les cours. */
window.Registre = (function () {
  var COURS = {
    1: { fr: "Les fondamentaux de la vente en magasin spécialisé", en: "Retail Sales Fundamentals for Specialist Stores", heures: 4 },
    2: { fr: "Découverte client et vente de conseil", en: "Customer Discovery and Consultative Selling", heures: 4 },
    3: { fr: "Traiter les objections et conclure", en: "Handling Objections and Closing the Sale", heures: 4 },
    4: { fr: "Vente additionnelle : accessoires, équipement, services", en: "Add-on Selling: Accessories, Gear and Services", heures: 4 },
    5: { fr: "Vendre en concession", en: "Dealership Sales", heures: 4 },
    6: { fr: "Manager et animer une équipe de vente", en: "Managing and Leading a Sales Team", heures: 4 },
    99: { fr: "Parcours complet Vente", en: "Complete Sales Programme", heures: 24 }
  };
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function chercher(id) {
    id = String(id || "").trim().toUpperCase();
    return fetch("certificats.json", { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("registre"); return r.json(); })
      .then(function (data) {
        return (data.certificats || []).filter(function (c) { return String(c.id).toUpperCase() === id; })[0] || null;
      });
  }
  function dateFr(iso) { var p = iso.split("-"); return parseInt(p[2], 10) + " " + MOIS[parseInt(p[1], 10) - 1] + " " + p[0]; }
  function dateEn(iso) { var p = iso.split("-"); return MONTHS[parseInt(p[1], 10) - 1] + " " + parseInt(p[2], 10) + ", " + p[0]; }
  function urlVerification(id) { return (window.ACADEMIE ? window.ACADEMIE.site : "https://www.brame-store.com") + "/formation/verifier.html?id=" + encodeURIComponent(id); }
  function urlCertificat(id) { return (window.ACADEMIE ? window.ACADEMIE.site : "https://www.brame-store.com") + "/formation/certificat.html?id=" + encodeURIComponent(id); }

  return { chercher: chercher, cours: COURS, dateFr: dateFr, dateEn: dateEn, urlVerification: urlVerification, urlCertificat: urlCertificat };
})();
