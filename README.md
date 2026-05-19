# Centre médical Le Damany — Site web médical professionnel

**Cabinet de médecine générale · Luxembourg**
Dr Andreea Le Damany · 217 rue Albert Unden, L-2652 Luxembourg

---

## 🏁 État du projet — Complété (itération 5)

Refactorisation complète en cohérence éditoriale et technique. Itération 5 : suppression de toutes les mentions « RDC / rez-de-chaussée / ascenseur » sur toutes les pages (le cabinet est entièrement au rez-de-chaussée, aucune précision nécessaire) ; intégration des logos BioNext (logo simple SVG + variante avec texte SVG, fond transparent) sur index.html (logo + description) et services.html (logo simple) ; bandeau avis patients Doctena (17 avis) intégré dans la zone hero de l'accueil avec défilement automatique, navigation manuelle et lien direct vers les avis Doctena.

---

## 📄 Pages et leurs rôles

| Fichier | Rôle | CTA principal |
|---|---|---|
| `index.html` | Homepage — intro cabinet, stats, aperçu services, équipe, BioNext, accès/carte | Prendre RDV (header + hero) |
| `services.html` | Services — colonnes Dr Le Damany (gauche) / Médecin à venir (droite), BioNext, CTA unique bas de page | Prendre rendez-vous sur Doctena |
| `about.html` | Le cabinet — profil Dr Le Damany, parcours, valeurs, recrutement | Son parcours → Prendre RDV |
| `infos.html` | Infos pratiques — adresse, RDV, CNS, **seul endroit avec téléphone secrétariat**, accès, FAQ, mentions légales | Prendre RDV sur Doctena |
| `urgences.html` | Urgences — minimal, clair : 112 / 113 / ressources officielles | Liens institutionnels uniquement |

---

## 🔗 URIs fonctionnels

### Pages principales
- `index.html` — Page d'accueil
- `services.html` — Services médicaux
- `services.html#geriatrie` — Ancre gériatrie
- `services.html#diabetologie` — Ancre diabétologie
- `services.html#prevention` — Ancre médecine préventive
- `about.html` — Le cabinet / équipe
- `infos.html` — Informations pratiques
- `infos.html#faq` — FAQ
- `infos.html#confidentialite` — Confidentialité RGPD
- `infos.html#mentions` — Mentions légales
- `urgences.html` — Urgences

### Liens externes critiques
- **Doctena (RDV)** : `https://www.doctena.lu/fr/specialite/medecin-generaliste/dr-andreea-le-damany-1717095`
- **Indeed recrutement** : `https://lu.indeed.com/viewjob?jk=f32af8c9e22e3333&from=shareddesktop_copy`
- **BioNext** : `https://www.bionext.lu/fr/laboratoire-luxembourg-limpertsberg-rue-albert-unden`
- **Maisons médicales** : `https://santesecu.public.lu/fr/urgences-gardes/services-garde/maisons-medicales.html`
- **Urgences & gardes** : `https://santesecu.public.lu/fr/urgences-gardes.html`
- **Pharmacies de garde** : `https://www.pharmacie.lu/pharmacies/garde`
- **Google Maps** : `https://maps.google.com/?q=217+rue+Albert+Unden,+2652+Luxembourg`

---

## ✅ Fonctionnalités implémentées

### Design & UI
- **Soft-UI / Glassmorphism** — border-radius 28 px (lg), 20 px (md), 14 px (sm), header glass blur 16 px
- **Palette** — blanc `#FFFFFF`, vert accent `#A8DCAB` / `#2BA466`, texte `#1E293B`, bleu logo `#2D78C6`
- **Animations** — staggered reveal (IntersectionObserver), hover lift + green glow, counter on scroll (easeInOut), floating RDV mobile
- **Typographie** — Inter (sans-serif) + Playfair Display (serif headings), responsive `clamp()`
- **Logo PNG** intégré dans header et footer de toutes les pages

### Technique
- **Bilingue FR/EN** — bascule persistante (localStorage), `data-fr` / `data-en` sur tous les éléments traduits
- **Mobile-first** — layout responsive, grands boutons tactiles, menu hamburger animé
- **Header sticky** glassmorphism avec détection scroll
- **FAQ accordéons** avec animation bounce (max-height transition)
- **GDPR banner** avec localStorage
- **Navigation active** — détection automatique de la page courante
- **SEO** — meta description, keywords, OG tags optimisés pour "Centre médical Le Damany", "Andreea Le Damany", "médecin généraliste Luxembourg", quartiers Mühlenbach, Limpertsberg, Rollingergrund
- **Accessibilité** — aria-labels, rôles sémantiques, navigation clavier

### Règles éditoriales respectées
- ✅ Téléphone secrétariat (`+352 28 51 89 42`) **uniquement sur infos.html**
- ✅ Secrétariat nommé "Secrétariat médical", jamais confondu avec la prise de RDV en ligne
- ✅ Tous les CTA de RDV pointent **exclusivement vers Doctena**
- ✅ Lien recrutement Indeed : `https://lu.indeed.com/viewjob?jk=f32af8c9e22e3333&from=shareddesktop_copy`
- ✅ Numéro nav "Le cabinet" (remplace "Le médecin") uniforme sur toutes les pages
- ✅ Urgences : liens boutons vers ressources officielles (Maisons médicales, Urgences & gardes, Pharmacies de garde)
- ✅ CHL mentionné textuellement sur la page Urgences (service urgences 24h/24)
- ✅ Aucune répétition de CTA identiques en double sur la même page

---

## 🗂️ Structure des fichiers

```
index.html              # Homepage
services.html           # Services médicaux
about.html              # Le cabinet (Dr Le Damany + recrutement)
infos.html              # Infos pratiques + téléphone secrétariat + FAQ
urgences.html           # Urgences (minimal)
css/
  style.css             # Styles principaux — Soft-UI, tokens CSS, composants partagés
js/
  main.js               # JS — bilingue, animations, FAQ, GDPR, navigation
images/
  logo.png              # Logo Centre médical Le Damany (vert + bleu, fond transparent)
  bionext-logo.svg      # Logo BioNext simple (fond transparent)
  bionext-logo-text.svg # Logo BioNext avec texte + description (fond transparent)
README.md               # Cette documentation
```

---

## 📊 Modèle de données

Aucune base de données — site statique pur. Données intégrées en dur dans le HTML via `data-fr` / `data-en`. Persistance légère via `localStorage` (langue choisie, consentement GDPR).

---

## 🚀 Informations médicales intégrées

| Donnée | Valeur |
|---|---|
| Médecin | Dr Andreea Le Damany |
| Adresse | 217 rue Albert Unden, L-2652 Luxembourg |
| Quartiers | Mühlenbach, Limpertsberg, Rollingergrund |
| Consultations | Lundi – Vendredi : 8h00 – 19h00 |
| Téléphone | +352 28 51 89 42 (secrétariat — infos.html uniquement) |
| Spécialités | Médecine générale, Gériatrie, Diabétologie, Médecine préventive |
| Langues | Français, English, Română |
| Convention | CNS conventionné |
| Labo sur place | BioNext — Lun–Ven 6h–12h, Sam 7h–12h |

---

## 🔜 Étapes suivantes recommandées

1. **Photo Dr Le Damany** — remplacer l'emoji 👩‍⚕️ par une photo professionnelle
2. **Profil Doctena** — vérifier et mettre à jour l'URL Doctena si besoin
3. **Google Maps** — remplacer l'iframe placeholder par les vraies coordonnées GPS du cabinet
4. **Second médecin** — mettre à jour `services.html` et `about.html` dès recrutement effectif
5. **Google Search Console** — soumettre le sitemap après déploiement
6. **Schéma JSON-LD** — ajouter markup `MedicalOrganization` pour le SEO local

---

## 🌐 Déploiement

Pour publier le site, utiliser l'onglet **Publish** de l'interface. Le site est entièrement statique (HTML + CSS + JS + PNG).

---

*Dernière mise à jour : itération 5 — Suppression des mentions RDC/ascenseur, logos BioNext SVG fond transparent (logo simple + logo+texte), bandeau avis Doctena dans hero accueil.*
# cm-ledamany
