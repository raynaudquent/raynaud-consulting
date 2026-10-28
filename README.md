# Raynaud Consulting – coaching vente

Site vitrine statique (HTML + CSS, sans dépendance) de l'activité de coaching vente pour commerces spécialisés et concessions.

## Fichiers
| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil |
| `mentions-legales.html` | Mentions légales (compléter les champs entre crochets) |
| `404.html` | Page d'erreur |
| `favicon.svg` | Icône d'onglet |
| `styles.css` | Styles communs à toutes les pages |
| `conseils/` | Articles de conseils vente (référencement) |
| `og-image.png` | Image affichée quand le lien est partagé (LinkedIn, WhatsApp…) |
| `robots.txt`, `sitemap.xml` | Référencement Google |

## À compléter
1. **Prise de rendez-vous** : page Calendly (compte raynaud.quent@gmail.com) : https://calendly.com/raynaud-quent/30min. Créneaux et durée modifiables dans Calendly › Types d’événements.
4. **Avis clients** : la section `#avis` est masquée (`hidden`). La remplir et retirer `hidden` après les premiers clients.

## Publication avec GitHub Pages
Settings → Pages → Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
Adresse : https://www.brame-store.com/ (domaine chez Hostinger, DNS pointés vers GitHub Pages)

## Nom de domaine
Quand un domaine est choisi (ex. raynaud-consulting.fr) : le renseigner dans Settings → Pages → Custom domain, configurer le DNS chez le registrar, puis remplacer l'adresse GitHub Pages dans `index.html` (canonical, og:url, og:image, JSON-LD), `robots.txt` et `sitemap.xml`.

## Après la mise en ligne
- Déclarer le site dans Google Search Console et envoyer `sitemap.xml`.
- Créer une fiche Google Business Profile (zone desservie, sans adresse publique).
- Ajouter le lien du site dans le profil LinkedIn (section Coordonnées et bouton personnalisé).

## Académie en ligne (`formation/`)
Cours gratuits, examen en ligne, certificats payants et bilans visio. Tout fonctionne sans serveur : la progression et l'examen sont enregistrés dans le navigateur du vendeur.

| Fichier | Rôle |
|---|---|
| `formation/index.html` | Accueil de l'Académie : cours, certificat, bilans visio |
| `formation/cours-1.html` | Cours 1, 8 unités |
| `formation/examen-cours-1.html` | Examen : 20 questions tirées de la banque de 40, 30 min, réussite à 14/20, nouvel essai après 24 h |
| `formation/js/questions-cours-1.js` | Banque de questions du cours 1 |
| `formation/config.js` | **Liens de paiement** (Stripe ou autre) : à remplir |
| `formation/certificats.json` | **Registre des certificats émis** |
| `formation/certificat.html?id=…` | Affichage du certificat (PDF via « Imprimer », QR code, LinkedIn) |
| `formation/verifier.html` | Vérification publique d'un certificat |
| `formation/emettre.html` | Outil interne (non référencé) pour émettre un certificat |
| `formation/conditions.html` | Conditions de vente (compléter le médiateur de la consommation) |

### Brancher les paiements
Créer un « Payment Link » Stripe par offre (certificat 39 €, pass 89 €, bilans 79 €, 119 €, 249 €) et coller chaque adresse dans `formation/config.js`. Tant qu'un lien est vide, le bouton ouvre un e-mail de demande pré-rempli. Pour le certificat, Stripe reçoit l'e-mail du vendeur et son code de réussite (`client_reference_id`).

### Émettre un certificat après un paiement
1. Ouvrir `https://www.brame-store.com/formation/emettre.html`, recopier nom, e-mail, score, date et code de réussite de la demande.
2. Si le code est valide, copier la ligne JSON proposée dans `formation/certificats.json` (sur GitHub : crayon « Edit », virgule après la ligne précédente, « Commit changes »).
3. Envoyer au vendeur l'e-mail proposé, avec le lien de son certificat.

Limite connue : l'examen tourne dans le navigateur, une personne très motivée peut lire les réponses dans le code. Le code de réussite empêche seulement de modifier une demande à la main. Pour un contrôle strict, passer à une plateforme de cours hébergée.

## Formulaire de contact
Il ouvre la messagerie du visiteur (mailto). Pour recevoir les messages directement, brancher un service comme Formspree et remplacer l'attribut `action` du formulaire.
