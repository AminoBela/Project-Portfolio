export const educationData = [
    {
        id: 'cesi',
        type: 'education',
        status: 'future',
        title: 'cesi_title',
        institution: 'cesi_institution',
        location: 'cesi_location',
        period: 'cesi_period',
        description: 'cesi_desc',
        logo: 'https://upload.wikimedia.org/wikipedia/fr/e/ef/Logo_cesi_2022.png',
        details: null,
        color: '#bd93f9'
    },
    {
        id: 'but',
        type: 'education',
        status: 'current',
        title: 'but_title',
        institution: 'but_institution',
        location: 'but_location',
        period: 'but_period',
        description: 'but_desc',
        logo: 'https://ensgsi.univ-lorraine.fr/content/uploads/2023/09/logo-orange-et-rouge.png',
        details: null,
        color: '#50fa7b'
    },
    {
        id: 'polytech',
        type: 'education',
        status: 'past',
        title: 'polytech_title',
        institution: 'polytech_institution',
        location: 'polytech_location',
        period: 'polytech_period',
        description: 'polytech_desc',
        logo: 'https://yt3.googleusercontent.com/dlfb9W3nYcX5-uBro9MdZNfjbv_crHLKwWP2WMCw5bh5tTd2gIJes_RpwFw1MJQsph6sjSx3rXQ=s900-c-k-c0x00ffffff-no-rj',
        details: null,
        color: '#6272a4'
    },
    {
        id: 'bac',
        type: 'education',
        status: 'past',
        title: 'bac_title',
        institution: 'bac_institution',
        location: 'bac_location',
        period: 'bac_period',
        description: 'bac_desc',
        logo: null,
        details: null,
        color: '#6272a4'
    }
];

export const experiencesData = [
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
        id: 'poste',
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
        id: 'iss',
        type: 'experience',
        title: 'iss_title',
        company: 'iss_company',
        location: 'iss_location',
        period: 'iss_period',
        description: 'iss_desc',
        logo: 'https://www.developmentaid.org/files/organizationLogos/iss-facility-services-sa-120962.jpg',
        details: null
    }
];

export const timelineData = [...experiencesData, ...educationData];