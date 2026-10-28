/*
 * Réglages de l'Académie Raynaud Consulting.
 * Seul fichier à modifier pour brancher les paiements.
 *
 * Liens de paiement : créer un « Payment Link » dans Stripe (ou autre),
 * puis coller l'adresse entre les guillemets. Tant qu'un lien est vide,
 * le bouton ouvre un e-mail de demande à la place.
 */
window.ACADEMIE = {
  site: "https://www.brame-store.com",
  email: "infos@brame-store.com",
  paiement: {
    certificat: "",          // Certificat à l'unité, 39 €
    pass: "",                // Pass Certificats, 89 €
    bilanVendeur: "",        // Bilan Vendeur, 79 €
    bilanJeuDeRole: "",      // Bilan Jeu de rôle, 119 €
    bilanPointDeVente: ""    // Bilan Point de vente, 249 €
  }
};
