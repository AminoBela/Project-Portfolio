import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr', 'es'],
    fallbackLng: 'fr',
    debug: false, // Désactivé pour la production
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    // --- AJOUT IMPORTANT ---
    // On désactive Suspense pour gérer le chargement manuellement
    react: {
      useSuspense: false,
    },
  });

export default i18n;
