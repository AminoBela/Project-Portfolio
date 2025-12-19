// On trie les données par ordre antichronologique pour un affichage logique
export const timelineData = [
    // --- EXPERIENCES ---
    {
        id: 'poste', // ID unique pour l'animation
        type: 'experience',
        title: 'poste_title',
        company: 'poste_company',
        location: 'poste_location',
        period: 'poste_period',
        description: 'poste_desc',
        logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/0/0d/La_Poste_2022.svg/langfr-2560px-La_Poste_2022.svg.png',
        details: null
    },
    {
        id: 'crous',
        type: 'experience',
        title: 'crous_title',
        company: 'crous_company',
        location: 'crous_location',
        period: 'crous_period',
        description: 'crous_desc',
        logo: 'https://pbs.twimg.com/profile_images/1871548296432418816/JqhgFUlI_400x400.jpg',
        details: null
    },
    {
        id: 'ela',
        type: 'experience',
        title: 'ela_title',
        company: 'ela_company',
        location: 'ela_location',
        period: 'ela_period',
        description: 'ela_desc',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Logo_ELA_Pav%C3%A9_Rose_-_Baseline.jpg',
        details: {
            intro: "ela_details_intro",
            tech: ["VBA", "Excel", "Macros avancées", "Power Query"],
            highlights: [
                "ela_details_highlight_1",
                "ela_details_highlight_2",
                "ela_details_highlight_3",
                "ela_details_highlight_4",
                "ela_details_highlight_5"
            ]
        }
    },
    {
        id: 'iss',
        type: 'experience',
        title: 'iss_title',
        company: 'iss_company',
        location: 'iss_location',
        period: 'iss_period',
        description: 'iss_desc',
        logo: 'https://www.developmentaid.org/files/organizationLogos/iss-facility-services-sa-120962.jpg',
        details: null
    },

    // --- FORMATIONS ---
    {
        id: 'but',
        type: 'education',
        title: 'but_title',
        institution: 'but_institution',
        location: 'but_location',
        period: 'but_period',
        description: 'but_desc',
        logo: 'https://ensgsi.univ-lorraine.fr/content/uploads/2023/09/logo-orange-et-rouge.png',
        details: null
    },
    {
        id: 'polytech',
        type: 'education',
        title: 'polytech_title',
        institution: 'polytech_institution',
        location: 'polytech_location',
        period: 'polytech_period',
        description: 'polytech_desc',
        logo: 'https://yt3.googleusercontent.com/dlfb9W3nYcX5-uBro9MdZNfjbv_crHLKwWP2WMCw5bh5tTd2gIJes_RpwFw1MJQsph6sjSx3rXQ=s900-c-k-c0x00ffffff-no-rj',
        details: null
    },
    {
        id: 'bac',
        type: 'education',
        title: 'bac_title',
        institution: 'bac_institution',
        location: 'bac_location',
        period: 'bac_period',
        description: 'bac_desc',
        logo: null,
        details: null
    }
].sort((a, b) => {
    const getYear = (period) => {
        const yearPart = period.split(' - ')[0].split(' ').pop();
        if (yearPart === 'Actuel' || yearPart === 'Present') return new Date().getFullYear() + 1;
        const year = parseInt(yearPart, 10);
        return isNaN(year) ? 0 : year;
    };
    // Note: The sorting logic might need adjustment if period formats differ significantly between languages.
    // For "Sept. 2023 - Actuel", this should be fine.
    return getYear(b.period) - getYear(a.period);
});
