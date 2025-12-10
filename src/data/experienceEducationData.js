// On trie les données par ordre antichronologique pour un affichage logique
export const timelineData = [
    // --- EXPERIENCES ---
    {
        type: 'experience',
        title: 'Agent de production',
        company: 'La Poste',
        location: 'PIC Lorraine - Pagny-lès-Goin',
        period: 'Sept. 2023 - Actuel',
        description: 'Tri du courrier avec l\'aide des équipements automatiques ou de manière manuelle. Job étudiant le week-end.',
        logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/0/0d/La_Poste_2022.svg/1280px-La_Poste_2022.svg.png' // Updated URL
    },
    {
        type: 'experience',
        title: 'Étudiant Référent Résidence CROUS',
        company: 'CROUS Lorraine',
        location: 'Vandoeuvre-lès-Nancy',
        period: 'Déc. 2025 - Actuel',
        description: 'Responsable de l\'accueil, de l\'intégration et du soutien des étudiants résidents. Organisation d\'événements et gestion des problématiques quotidiennes.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Logo_Crous.svg/langfr-250px-Logo_Crous.svg.png' // This one should be fine
    },
    {
        type: 'experience',
        title: 'Stagiaire informatique',
        company: 'Association ELA',
        location: 'Laxou',
        period: 'Fév. 2025 - Avr. 2025',
        description: 'Développement de solutions en VBA pour la gestion de données depuis un CRM (normalisation, génération de formulaires...). Support informatique.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Logo_ELA_Pav%C3%A9_Rose_-_Baseline.jpg' // This one was already working
    },
    {
        type: 'experience',
        title: 'Agent de nettoyage',
        company: 'ISS Luxembourg',
        location: 'Gares du Luxembourg',
        period: 'Étés 2020 - 2023',
        description: 'Nettoyage et entretien des infrastructures ferroviaires pendant les périodes estivales.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/LOGO_ISS_2020.png/250px-LOGO_ISS_2020.png' // Updated URL
    },

    // --- FORMATIONS ---
    {
        type: 'education',
        title: 'BUT Informatique - Parcours DACS',
        institution: 'IUT Nancy-Charlemagne',
        location: 'Nancy',
        period: '2023 - 2026',
        description: 'Administration Linux, Virtualisation (Docker), Cloud, Sécurité, Administration réseau, Programmation (Java, C, JS, PHP...).',
        logo: 'https://iut-charlemagne.univ-lorraine.fr/wp-content/uploads/2018/08/logo-orange-et-rouge.png' // Updated URL
    },
    {
        type: 'education',
        title: 'Cycle préparatoire Polytech (PeiP)',
        institution: 'Polytech Nancy',
        location: 'Vandoeuvre-lès-Nancy',
        period: '2022 - 2023',
        description: 'Formation en sciences de l\'ingénieur, mathématiques, circuits électriques et utilisation du logiciel CATIA V5.',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJOs99iin8Zr3SoY60p8PZ71ukmMEREgMicg&s' // Updated URL
    },
    {
        type: 'education',
        title: 'Baccalauréat Général',
        institution: 'Lycée Alfred Mézières',
        location: 'Longwy',
        period: '2019 - 2022',
        description: 'Spécialités : Mathématiques, Sciences de l’Ingénieur, et Physique.',
        logo: null // Pas de logo, on affichera une icône par défaut
    },
].sort((a, b) => {
    const getYear = (period) => {
        const yearPart = period.split(' - ')[0].split(' ').pop();
        if (yearPart === 'Actuel') return new Date().getFullYear() + 1;
        const year = parseInt(yearPart, 10);
        return isNaN(year) ? 0 : year;
    };
    return getYear(b.period) - getYear(a.period);
});
