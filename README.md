# Speedtwin — Maquette fonctionnelle

Refonte complète du site **Speedtwin**, atelier moto multimarque (BMW, KTM, Ducati & toutes marques) à Marseille 13006.

## Structure

```
.
├── index.html              # Accueil : hero, trust, marques, packs, FAQ, partenaires, CTA
├── entretien.html          # Catalogue de prestations + spécialités par marque + process
├── rendez-vous.html        # Wizard de RDV en 5 étapes (marque → modèle → service → date → contact)
├── occasion.html           # Motos d'occasion avec filtres par marque
├── contact.html            # Coordonnées, horaires, carte OSM, formulaire
├── mentions-legales.html   # Mentions légales + RGPD
├── robots.txt              # SEO
├── sitemap.xml             # SEO
├── manifest.webmanifest    # PWA
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── data.js         # Catalogue marques/modèles/services/packs/occasions
    │   ├── main.js         # Navigation mobile, animations scroll, toasts, contact form
    │   └── booking.js      # Logique du wizard de RDV (5 étapes, validation, créneaux)
    └── img/
        ├── logo.svg
        ├── logo-mark.svg
        └── favicon.svg
```

## Lancement local

```bash
# Solution la plus simple : ouvrir index.html dans le navigateur.
# Pour les fonctionnalités complètes (manifest, RGPD), servir via HTTP :
python -m http.server 8000
# puis http://localhost:8000
```

## Choix d'architecture & bonnes pratiques

### Identité visuelle
- Logo redessiné en SVG, italique dynamique conservé (ADN d'origine), chevron de vitesse rouge.
- Palette : noir profond, accent rouge `#ff1f1f`, accents par marque (BMW bleu, KTM orange, Ducati rouge).
- Typographies : **Bebas Neue** (display, italique) + **Inter** (corps).

### Accessibilité (WCAG 2.1 AA)
- `lang="fr"`, balises sémantiques, hiérarchie de titres respectée.
- Skip-link, focus visible, `aria-label`, `role="status"` sur les toasts.
- Respect de `prefers-reduced-motion`.
- Contrastes vérifiés sur fond noir.

### Performance
- Aucun framework — HTML/CSS/JS vanilla, < 60 Ko gzippés.
- Polices via `preconnect` + `display=swap`.
- SVG inline pour le logo (pas de requête HTTP supplémentaire).
- Images en `loading="lazy"`.
- Pas de tracking par défaut.

### SEO
- Meta titles uniques par page, < 60 caractères.
- Meta descriptions < 160 caractères.
- Open Graph + Twitter Card.
- `canonical` sur chaque page.
- Schema.org **MotorcycleRepair** sur l'accueil (NAP, horaires, géoloc, offres).
- Schema.org **Service** sur entretien.html.
- Schema.org **ReserveAction** sur rendez-vous.html.
- Sitemap XML + robots.txt.
- URLs propres en `.html` (compatibles tout hébergeur, y compris GitHub Pages).

### UX / Conversion
- Tunnel de RDV en 5 étapes, mobile-first, validation à chaque étape.
- Récapitulatif transparent avec estimation tarifaire.
- Filtres dynamiques sur la page occasion.
- Numéros cliquables `tel:`, emails cliquables `mailto:`.

## Brancher en production

Pour passer en réel, il suffit de :

1. **RDV** : remplacer le `data-submit` dans [assets/js/booking.js](assets/js/booking.js) par un POST vers une API (Formspree, Make.com, n8n, ou backend Node/PHP) qui envoie email + SMS de confirmation.
2. **Contact** : idem, remplacer le `mailto:` par un endpoint serveur.
3. **Calendrier** : connecter `SPEEDTWIN_DATA.slots` à un calendrier réel (Google Calendar API, Cal.com, ou base de données interne).
4. **Photos** : ajouter les vraies photos des motos dans `assets/img/occasions/` et adapter `moto-card__media`.
5. **Avis Google** : ajouter un widget (Trustpilot, Google Reviews) dans la section "trust".
6. **Domaine** : pointer `speedtwin-moto.fr` (ou autre) vers l'hébergement et mettre à jour `canonical` + `og:url`.

## Pistes d'évolution

- Carnet d'entretien numérique par client (espace privé après réservation).
- Estimation tarifaire dynamique selon modèle exact (jeu aux soupapes Desmo vs vidange simple).
- Blog SEO : guides d'entretien par modèle (mots-clés long-tail "entretien R 1250 GS Marseille", etc.).
- Intégration paiement de l'acompte au RDV (Stripe).
- Notifications SMS et rappels via Twilio.
- A/B test des CTA principaux (Plausible / GA4).
