import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollspy } from './useScrollspy';
import { useKonamiCode } from './useKonamiCode';

export const useAppLogic = () => {
    const { t, i18n } = useTranslation();
    const { activeSection, isMenuOpen, toggleMenu, setIsMenuOpen } = useScrollspy();
    const { isTriggered: isMatrixMode, setIsTriggered: setIsMatrixMode } = useKonamiCode();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isLangSwitching, setIsLangSwitching] = useState(false);
    const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    // Document Title & Language Effect
    useEffect(() => {
        document.documentElement.lang = i18n.language;
        const titles = {
            fr: 'Amin Belalia | Portfolio',
            en: 'Amin Belalia | Portfolio',
            es: 'Amin Belalia | Portafolio'
        };
        document.title = titles[i18n.language] || 'Amin Belalia | Portfolio';
    }, [i18n.language]);

    // Konami Code Hint Effect
    useEffect(() => {
        console.log(
            "%c👋 Hey Dev! Looking for secrets? Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A",
            "color: #66ff99; font-family: monospace; font-size: 14px; background: #10141a; padding: 10px; border-radius: 5px;"
        );
    }, []);

    // Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            setIsScrolled(prev => {
                if (prev !== scrolled) return scrolled;
                return prev;
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLanguageChange = useCallback((lng) => {
        if (i18n.language === lng) return;
        setIsLangSwitching(true);
        setTimeout(() => {
            i18n.changeLanguage(lng);
            setTimeout(() => {
                setIsLangSwitching(false);
            }, 800);
        }, 500);
    }, [i18n]);

    const handleOpenInternshipModal = useCallback(() => {
        setIsInternshipModalOpen(true);
    }, []);

    const closeBanner = useCallback(() => {
        setIsBannerVisible(false);
    }, []);

    const closeInternshipModal = useCallback(() => {
        setIsInternshipModalOpen(false);
    }, []);

    return {
        // State
        isScrolled,
        isLangSwitching,
        isInternshipModalOpen,
        isBannerVisible,
        isMatrixMode,
        activeSection,
        isMenuOpen,

        // Actions
        setIsMatrixMode,
        setIsMenuOpen,
        toggleMenu,
        handleLanguageChange,
        handleOpenInternshipModal,
        closeBanner,
        closeInternshipModal,

        // Data
        t,
        i18n
    };
};
