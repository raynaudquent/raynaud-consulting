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
  espaceClient: "https://raynaud-consulting.teachizy.fr/connexion",
  paiement: {
    certificat: "https://raynaud-consulting.teachizy.fr/formations/les-fondamentaux-de-la-vente-en-magasin-specialise", // Certificat à l'unité, 39 € (version certifiante Teachizy)
    pass: "https://buy.stripe.com/bJe8wOdeha0mcpV3fj5gc01",                // Pass Certificats, 89 €
    bilanVendeur: "https://buy.stripe.com/5kQ14m2zD8WigGb3fj5gc02",        // Bilan Vendeur, 79 €
    bilanJeuDeRole: "https://buy.stripe.com/eVqcN43DH8Wi9dJ6rv5gc03",      // Bilan Jeu de rôle, 119 €
    bilanPointDeVente: "https://buy.stripe.com/fZuaEW2zD8Wi2PldTX5gc04"    // Bilan Point de vente, 249 €
  }
};
