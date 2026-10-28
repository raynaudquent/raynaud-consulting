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
1. **Calendly** : créer un événement « Échange découverte 30 min » sur calendly.com, puis coller son lien dans `index.html` à la ligne `var CALENDLY_URL = '';`. Tous les boutons « Prendre rendez-vous » ouvriront alors la réservation en fenêtre.
2. **Photo** : ajouter `quentin.jpg` (format portrait 4:5) et remplacer le bloc « QR » de la section À propos (le code est en commentaire juste à côté).
3. **SIREN** : compléter dans le pied de page de `index.html`.
4. **Avis clients** : la section `#avis` est masquée (`hidden`). La remplir et retirer `hidden` après les premiers clients.
5. **Mentions légales** : SIRET, adresse, régime de TVA.

## Publication avec GitHub Pages
Settings → Pages → Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
Adresse : https://raynaudquent.github.io/raynaud-consulting/

## Nom de domaine
Quand un domaine est choisi (ex. raynaud-consulting.fr) : le renseigner dans Settings → Pages → Custom domain, configurer le DNS chez le registrar, puis remplacer l'adresse GitHub Pages dans `index.html` (canonical, og:url, og:image, JSON-LD), `robots.txt` et `sitemap.xml`.

## Après la mise en ligne
- Déclarer le site dans Google Search Console et envoyer `sitemap.xml`.
- Créer une fiche Google Business Profile (zone desservie, sans adresse publique).
- Ajouter le lien du site dans le profil LinkedIn (section Coordonnées et bouton personnalisé).

## Formulaire de contact
Il ouvre la messagerie du visiteur (mailto). Pour recevoir les messages directement, brancher un service comme Formspree et remplacer l'attribut `action` du formulaire.
