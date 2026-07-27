# OKABA — logique de l'app (à respecter absolument)

Prototype cliquable mobile O'KABA. Fichier unique : `okaba-bundle.jsx`, monté dans `OKABA App.dc.html`.
Thème VERT (`OK.green` #0B7C39), or (`OK.gold`), police Manrope. Tout écran passe par `Screen` + `useNav()` (navigate/back/reset).

## Bouton « Publier » (+) — action sheet
Le bouton central ouvre une **action sheet** avec des flux DÉDIÉS, chacun a son propre bouton :
- Publier une annonce → flux `publier` (marketplace)
- Diffuser une capsule vidéo (Reel)
- Créer un établissement
- Créer un événement
- Soumettre mon CV / offre d'emploi
- Proposer un service
- Demande de partenariat

Conséquence : « Publier une annonce » = déposer un **produit de la marketplace**. Les services et les événements ont DÉJÀ leurs propres boutons dans l'action sheet → ils NE sont PAS des catégories du flux « annonce ».

## Catégories
- **MARKET_CATS** (filtres de navigation marketplace) : Tout, Made in Gabon, Immobilier, Véhicules, Électronique, Mode, Maison, Services, Événements.
- **Catégories publiables (annonce)** : Immobilier, Véhicules, Électronique, Mode, Maison UNIQUEMENT. Pas Services/Événements (boutons dédiés), pas Made in Gabon.

## Made in Gabon
C'est un **badge attribué par la plateforme** (nous), PAS une catégorie que l'utilisateur choisit. Il reste un filtre de navigation dans la marketplace, mais n'apparaît jamais comme choix à la publication.

## Flux « Publier une annonce » (dynamique)
1. Catégorie (produits publiables ci-dessus)
2. Détails — champs DYNAMIQUES selon le type + Prix (fixe / sur devis / gratuit selon le sens) + case « à débattre ». Champs texte/nombre en 2 colonnes pour raccourcir le parcours.
3. Médias (photos + vidéos)
4. Lieu — CONDITIONNEL : seulement pour immobilier (requis). Un véhicule/vêtement ne demande PAS de localisation.
5. Offre — 3 forfaits : Free / Pro / Business.

## Divers
- La Baie des Rois = entité « complexe » de l'annuaire (type `complexe`), rendue par `BaieHub`, première dans les résultats annuaire. Ses enseignes → `TenantScreen`.
- Photos : ne prendre que des visuels cohérents avec le sujet ; valider avant de câbler. Vraies photos du complexe dans `assets/baie-cover.png` / `baie-2.png`.
- Headers figés au scroll (sticky).
