// On trie les données par ordre antichronologique pour un affichage logique
export const timelineData = [
    // --- EXPERIENCES ---
    {
        id: 'poste', // ID unique pour l'animation
        type: 'experience',
        title: 'Agent de production',
        company: 'La Poste',
        location: 'PIC Lorraine - Pagny-lès-Goin',
        period: 'Sept. 2023 - Actuel',
        description: 'Tri du courrier avec l\'aide des équipements automatiques ou de manière manuelle. Job étudiant le week-end.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/La_Poste_logo.svg/500px-La_Poste_logo.svg.png',
        details: null
    },
    {
        id: 'crous',
        type: 'experience',
        title: 'Étudiant Référent Résidence CROUS',
        company: 'CROUS Lorraine',
        location: 'Vandoeuvre-lès-Nancy',
        period: 'Déc. 2025 - Actuel',
        description: 'Responsable de l\'accueil, de l\'intégration et du soutien des étudiants résidents. Organisation d\'événements et gestion des problématiques quotidiennes.',
        logo: 'https://www.crous-lorraine.fr/wp-content/uploads/sites/15/2021/08/logo-crous.svg',
        details: null
    },
    {
        id: 'ela',
        type: 'experience',
        title: 'Stagiaire informatique',
        company: 'Association ELA',
        location: 'Laxou',
        period: 'Fév. 2025 - Avr. 2025',
        description: 'Développement de solutions en VBA pour la gestion de données depuis un CRM. Optimisation des workflows et support technique.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Logo_ELA_Pav%C3%A9_Rose_-_Baseline.jpg',
        details: {
            intro: "Retour sur mon stage de 8 semaines au sein de l’association ELA, centré sur l’automatisation d’outils métiers avec VBA et Excel.",
            tech: ["VBA", "Excel", "Macros avancées", "Power Query"],
            highlights: [
                "Automatisation complète du suivi des adhérents et des dons",
                "Génération dynamique des CERFA et documents administratifs",
                "Nettoyage et optimisation de classeurs Excel lourds",
                "Documentation claire pour assurer la continuité des outils",
                "Support technique et accompagnement des équipes"
            ]
        }
    },
    {
        id: 'iss',
        type: 'experience',
        title: 'Agent de nettoyage',
        company: 'ISS Luxembourg',
        location: 'Gares du Luxembourg',
        period: 'Étés 2020 - 2023',
        description: 'Nettoyage et entretien des infrastructures ferroviaires pendant les périodes estivales.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/ISS_logo.svg/500px-ISS_logo.svg.png',
        details: null
    },

    // --- FORMATIONS ---
    {
        id: 'but',
        type: 'education',
        title: 'BUT Informatique - Parcours DACS',
        institution: 'IUT Nancy-Charlemagne',
        location: 'Nancy',
        period: '2023 - 2026',
        description: 'Administration Linux, Virtualisation (Docker), Cloud, Sécurité, Administration réseau, Programmation (Java, C, JS, PHP...).',
        logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/a/a2/Logo_Universit%C3%A9_de_Lorraine.svg/500px-Logo_Universit%C3%A9_de_Lorraine.svg.png',
        details: null
    },
    {
        id: 'polytech',
        type: 'education',
        title: 'Cycle préparatoire Polytech (PeiP)',
        institution: 'Polytech Nancy',
        location: 'Vandoeuvre-lès-Nancy',
        period: '2022 - 2023',
        description: 'Formation en sciences de l\'ingénieur, mathématiques, circuits électriques et utilisation du logiciel CATIA V5.',
        logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/a/a2/Logo_Universit%C3%A9_de_Lorraine.svg/500px-Logo_Universit%C3%A9_de_Lorraine.svg.png',
        details: null
    },
    {
        id: 'bac',
        type: 'education',
        title: 'Baccalauréat Général',
        institution: 'Lycée Alfred Mézières',
        location: 'Longwy',
        period: '2019 - 2022',
        description: 'Spécialités : Mathématiques, Sciences de l’Ingénieur, et Physique.',
        logo: null,
        details: null
    }
].sort((a, b) => {
    const getYear = (period) => {
        const yearPart = period.split(' - ')[0].split(' ').pop();
        if (yearPart === 'Actuel') return new Date().getFullYear() + 1;
        const year = parseInt(yearPart, 10);
        return isNaN(year) ? 0 : year;
    };
    return getYear(b.period) - getYear(a.period);
});
