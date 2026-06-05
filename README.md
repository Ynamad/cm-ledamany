# Centre Médical Le Damany — Site Internet Officiel

Ce dépôt contient le code source du site internet pour le Centre Médical Le Damany, cabinet de médecine générale situé à Luxembourg (Mühlenbach, Limpertsberg, Rollingergrund). Le site est conçu pour offrir une expérience utilisateur fluide, accessible et bilingue aux patients du docteur Andreea Le Damany.

## 🌐 Informations Générales

Le site est accessible en production à l'adresse suivante : https://cm-ledamany.lu

Le cabinet propose des consultations en médecine générale, gériatrie, diabétologie et médecine préventive, avec la présence sur place d'un centre de prélèvements BioNext.

## 🛠️ Spécifications Techniques et Fonctionnalités

Le site a été développé de manière moderne avec les technologies et fonctionnalités suivantes :

* Architecture : Pages statiques performantes (HTML5, CSS3, JavaScript moderne) construites selon une approche mobile-first.
* Design et UI : Identité visuelle basée sur le style Soft-UI et Glassmorphism, typographie combinant Inter et Playfair Display, animations au défilement via IntersectionObserver.
* Multilingue : Support complet Français / Anglais avec détection et persistance du choix de la langue via localStorage.
* SEO et Accessibilité : Balises Open Graph optimisées pour le référencement local, respect des critères d'accessibilité avec attributs ARIA et navigation au clavier intégrée.
* Conformité : Gestion de la confidentialité et RGPD avec un bandeau de cookies persistant.

## 📁 Structure du Projet

L'arborescence des fichiers est organisée de la manière suivante :

index.html             # Page d'accueil, présentation générale et avis Doctena
services.html         # Offre de soins (Dr Le Damany et futur médecin)
about.html            # Présentation du cabinet, parcours et section recrutement
infos.html            # Informations pratiques, FAQ, RGPD et mentions légales
urgences.html         # Numéros et liens de secours indispensables
css/style.css         # Design system, tokens CSS et composants partagés
js/main.js            # Logique applicative (langues, animations, FAQ, cookies)
images/               # Ressources graphiques, logos officiels et variantes SVG

## 🔗 Liens et Intégrations Critiques

Pour assurer le bon fonctionnement du site, plusieurs liens externes stratégiques sont configurés :

1. Prise de rendez-vous : Redirection exclusive de tous les boutons d'appel à l'action (CTA) vers le profil Doctena du Dr Le Damany.
2. Recrutement : Lien de candidature vers l'annonce active sur la plateforme Indeed.
3. Partenaires et Santé : Liens officiels vers BioNext, le portail Santé du Luxembourg, les maisons médicales et les pharmacies de garde.

## ⚙️ Déploiement

Le site est configuré pour un déploiement continu et sécurisé via la plateforme Cloudflare.
