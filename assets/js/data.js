/**
 * Catalogue marques / modèles / services Speedtwin
 * Données indicatives basées sur les gammes constructeurs 2024-2025.
 */
window.SPEEDTWIN_DATA = {
  brands: {
    bmw: {
      name: "BMW Motorrad",
      color: "#1c69d4",
      logo: "assets/img/brand-bmw.svg",
      families: {
        "Roadster / Heritage": ["R 12 nineT", "R 12", "R 18", "R 18 Classic"],
        "Sport": ["S 1000 RR", "M 1000 RR", "S 1000 R", "S 1000 XR"],
        "Adventure / GS": ["R 1300 GS", "R 1300 GS Adventure", "R 1250 GS", "R 1250 GS Adventure", "F 900 GS", "F 900 GS Adventure", "F 800 GS", "G 310 GS"],
        "Touring": ["K 1600 GT", "K 1600 GTL", "K 1600 B", "K 1600 Grand America", "R 1250 RT"],
        "Roadster A2": ["G 310 R", "F 900 R"],
        "Urban Mobility": ["CE 02", "CE 04"]
      }
    },
    ktm: {
      name: "KTM",
      color: "#ff5800",
      logo: "assets/img/brand-ktm.svg",
      families: {
        "Naked Duke": ["125 Duke", "250 Duke", "390 Duke", "790 Duke", "990 Duke", "990 Duke R", "1390 Super Duke R", "1390 Super Duke R EVO", "1390 Super Duke RR"],
        "Sport RC": ["RC 125", "RC 390", "RC 8C"],
        "Adventure": ["390 Adventure", "890 Adventure", "890 Adventure R", "1290 Super Adventure S", "1290 Super Adventure R", "1390 Super Adventure S EVO"],
        "Sport-Tourer": ["1290 Super Duke GT", "1390 Super Duke GT"],
        "Enduro / SMC": ["690 SMC R", "690 Enduro R", "450 EXC-F", "500 EXC-F"]
      }
    },
    ducati: {
      name: "Ducati",
      color: "#cc0000",
      logo: "assets/img/brand-ducati.svg",
      families: {
        "Superbike Panigale": ["Panigale V2", "Panigale V4", "Panigale V4 S", "Panigale V4 R", "Panigale V4 SP2"],
        "Naked Streetfighter": ["Streetfighter V2", "Streetfighter V4", "Streetfighter V4 S", "Streetfighter V4 SP2"],
        "Monster": ["Monster", "Monster +", "Monster SP", "Monster V2"],
        "Multistrada": ["Multistrada V2", "Multistrada V2 S", "Multistrada V4", "Multistrada V4 S", "Multistrada V4 Rally", "Multistrada V4 Pikes Peak"],
        "Diavel": ["Diavel V4", "XDiavel"],
        "Hypermotard": ["Hypermotard 698 Mono", "Hypermotard 950", "Hypermotard 950 SP"],
        "Scrambler": ["Scrambler Icon", "Scrambler Full Throttle", "Scrambler Nightshift"],
        "DesertX": ["DesertX", "DesertX Rally", "DesertX Discovery"]
      }
    },
    autres: {
      name: "Autres marques",
      color: "#888",
      logo: "assets/img/brand-other.svg",
      families: {
        "Toutes marques européennes & japonaises": ["À préciser dans le formulaire"]
      }
    }
  },

  services: [
    {
      id: "revision-annuelle",
      title: "Révision annuelle",
      icon: "wrench",
      duration: "2 à 4 h",
      priceFrom: 189,
      desc: "Contrôle complet selon préconisations constructeur : vidange moteur, filtre à huile, niveaux, freinage, éclairage, pneumatiques, transmission.",
      includes: [
        "Vidange moteur + filtre à huile",
        "Contrôle des niveaux (frein, liquide refroidissement, embrayage)",
        "Contrôle freinage avant / arrière",
        "Contrôle éclairage & feux",
        "Pression et état des pneus",
        "Lubrification chaîne ou contrôle cardan",
        "Diagnostic électronique multimarques",
        "Rapport d'intervention détaillé"
      ]
    },
    {
      id: "grosse-revision",
      title: "Grosse révision (intervalle constructeur)",
      icon: "gear",
      duration: "4 à 8 h",
      priceFrom: 390,
      desc: "Intervention longue selon kilométrage : bougies, filtre à air, jeu aux soupapes, courroies de distribution Ducati, contrôle complet châssis.",
      includes: [
        "Tout le contenu de la révision annuelle",
        "Remplacement bougies",
        "Filtre à air",
        "Contrôle / réglage jeu aux soupapes",
        "Courroies de distribution (Ducati)",
        "Contrôle suspension avant et arrière",
        "Liquide de frein & embrayage",
        "Diagnostic ECU + reset des compteurs d'entretien"
      ]
    },
    {
      id: "desmo-service",
      title: "Desmo Service Ducati",
      icon: "ducati",
      duration: "6 à 10 h",
      priceFrom: 690,
      desc: "Service majeur Ducati à 24 000 / 30 000 km : contrôle et ajustement du jeu aux soupapes du système Desmodromique, courroies, bougies.",
      includes: [
        "Contrôle et réglage du jeu Desmodromique",
        "Remplacement courroies de distribution",
        "Bougies neuves",
        "Filtre à air & filtre à huile",
        "Vidange moteur huile préconisée",
        "Diagnostic DDS",
        "Reset compteur entretien"
      ]
    },
    {
      id: "pneumatiques",
      title: "Montage & équilibrage pneus",
      icon: "tire",
      duration: "45 min à 1 h 30",
      priceFrom: 35,
      desc: "Montage main d'œuvre par pneu, équilibrage de précision, valves neuves, mise au rebut.",
      includes: [
        "Démontage & remontage roue",
        "Équilibrage haute précision",
        "Valve neuve",
        "Recyclage du pneu usagé",
        "Conseil profil & pression"
      ]
    },
    {
      id: "freinage",
      title: "Entretien freinage",
      icon: "brake",
      duration: "1 à 3 h",
      priceFrom: 79,
      desc: "Plaquettes, disques, purge liquide de frein, contrôle étriers et durites.",
      includes: [
        "Diagnostic complet du circuit",
        "Remplacement plaquettes AV / AR",
        "Contrôle disques",
        "Purge liquide DOT 4 / DOT 5.1",
        "Contrôle étriers et durites"
      ]
    },
    {
      id: "transmission",
      title: "Chaîne, pignon, couronne",
      icon: "chain",
      duration: "1 à 2 h",
      priceFrom: 95,
      desc: "Kit chaîne complet, contrôle tension, lubrification.",
      includes: [
        "Dépose / repose kit chaîne",
        "Remplacement par kit OEM ou DID/RK",
        "Contrôle tension & alignement",
        "Lubrification"
      ]
    },
    {
      id: "diagnostic",
      title: "Diagnostic électronique",
      icon: "diag",
      duration: "30 min à 1 h",
      priceFrom: 49,
      desc: "Lecture & effacement des codes défauts toutes marques. Diagnostic ABS, ride-by-wire, ECU.",
      includes: [
        "Lecture codes défaut",
        "Effacement après réparation",
        "Diagnostic ABS / TC / IMU",
        "Mise à jour cartographie quand disponible"
      ]
    },
    {
      id: "preparation-ct",
      title: "Préparation contrôle technique",
      icon: "shield",
      duration: "1 h",
      priceFrom: 49,
      desc: "Mise en conformité de la moto avant passage au contrôle technique obligatoire (loi en vigueur).",
      includes: [
        "Contrôle des 78 points du CT moto",
        "Réglages éclairage",
        "Pneus & freinage",
        "Pollution / bruit",
        "Attestation de passage"
      ]
    },
    {
      id: "hivernage",
      title: "Forfait hivernage",
      icon: "snow",
      duration: "Saison",
      priceFrom: 149,
      desc: "Stockage sécurisé + remise en route printanière de votre moto.",
      includes: [
        "Lavage complet",
        "Vidange & traitement carburant",
        "Mise sur béquille d'atelier",
        "Maintien batterie",
        "Stockage en local sécurisé",
        "Remise en route et contrôle"
      ]
    },
    {
      id: "personnalisation",
      title: "Personnalisation & accessoires",
      icon: "spark",
      duration: "Sur devis",
      priceFrom: 0,
      desc: "Pose d'accessoires Akrapovič, GIVI, Öhlins, Brembo, Rizoma. Reprogrammation cartographie.",
      includes: [
        "Échappement Akrapovič",
        "Top-case / bagagerie GIVI",
        "Suspensions Öhlins",
        "Freinage Brembo",
        "Reprogrammation moteur"
      ]
    }
  ],

  packages: [
    {
      id: "essentiel",
      title: "Pack Essentiel",
      tagline: "Pour rouler serein toute l'année",
      price: 189,
      color: "#aaaaaa",
      services: ["Vidange + filtre", "Contrôle 25 points", "Diagnostic électronique", "Rapport d'intervention"]
    },
    {
      id: "performance",
      title: "Pack Performance",
      tagline: "Le bon compromis entretien + sécurité",
      price: 349,
      color: "#ff1f1f",
      featured: true,
      services: ["Tout le Pack Essentiel", "Plaquettes AV/AR", "Purge liquide de frein", "Lubrification chaîne", "Contrôle suspension"]
    },
    {
      id: "premium",
      title: "Pack Premium",
      tagline: "L'entretien complet, niveau concession",
      price: 690,
      color: "#d4af37",
      services: ["Tout le Pack Performance", "Jeu aux soupapes / Desmo", "Bougies + filtre à air", "Liquide refroidissement", "Lavage détaillé"]
    }
  ],

  slots: {
    // Jours d'ouverture et plages horaires (lecture seule pour la démo)
    days: {
      0: null, // Dimanche fermé
      1: null, // Lundi fermé
      2: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"],
      3: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"],
      4: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"],
      5: ["08:00","09:00","10:00","11:00","14:00","15:00","16:00","17:00"],
      6: ["09:00","10:00","11:00","14:00","15:00","16:00","17:00"]
    }
  },

  occasions: [
    {
      id: "occ-001",
      title: "Ducati Panigale V2",
      year: 2022,
      km: 8400,
      price: 13900,
      cv: 155,
      brand: "ducati",
      garantie: "12 mois",
      desc: "Première main, carnet d'entretien Speedtwin à jour. Échappement Akrapovič homologué."
    },
    {
      id: "occ-002",
      title: "BMW R 1250 GS Adventure",
      year: 2021,
      km: 21000,
      price: 17500,
      cv: 136,
      brand: "bmw",
      garantie: "12 mois",
      desc: "Pack confort, pack dynamique, valises Vario. Révision majeure faite par nos soins."
    },
    {
      id: "occ-003",
      title: "KTM 890 Duke R",
      year: 2023,
      km: 6200,
      price: 9990,
      cv: 121,
      brand: "ktm",
      garantie: "12 mois",
      desc: "Quickshifter, Track Pack actif, pneus neufs. Comme neuve."
    },
    {
      id: "occ-004",
      title: "Ducati Monster 937",
      year: 2022,
      km: 11800,
      price: 11200,
      cv: 111,
      brand: "ducati",
      garantie: "12 mois",
      desc: "Pack Sport, levier Rizoma, sabot moteur carbone."
    },
    {
      id: "occ-005",
      title: "BMW S 1000 R",
      year: 2022,
      km: 9500,
      price: 13400,
      cv: 165,
      brand: "bmw",
      garantie: "12 mois",
      desc: "Pack M, suspension DDC, échappement Akrapovič."
    },
    {
      id: "occ-006",
      title: "KTM 1290 Super Adventure S",
      year: 2021,
      km: 18900,
      price: 14800,
      cv: 160,
      brand: "ktm",
      garantie: "12 mois",
      desc: "Carnet à jour, valises latérales, pare-brise touring."
    }
  ]
};
