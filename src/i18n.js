import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importation directe des fichiers de traduction
import { fr } from './locales/fr';
import { en } from './locales/en';
import { es } from './locales/es';

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  es: { translation: es },
};

i18n
  // .use(HttpApi) // On n'utilise plus le backend HTTP
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, // On passe les ressources directement
    supportedLngs: ['en', 'fr', 'es'],
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    // Plus besoin de backend configuration
    react: {
      useSuspense: false, // Toujours false car pas de chargement asynchrone
    },
  });

export default i18n;
