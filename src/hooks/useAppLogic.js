import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollspy } from './useScrollspy';
import { useKonamiCode } from './useKonamiCode';

export const useAppLogic = () => {
    const { i18n } = useTranslation();
    const { activeSection } = useScrollspy();
    const { isTriggered: isMatrixMode, setIsTriggered: setIsMatrixMode } = useKonamiCode();

    const [isLangSwitching, setIsLangSwitching] = useState(false);
    const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
    const [isBannerVisible, setIsBannerVisible] = useState(() => {
        return localStorage.getItem('banner_dismissed') !== 'true';
    });
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    useEffect(() => {
        document.documentElement.lang = i18n.language;
        const titles = {
            fr: 'Amin Belalia | Portfolio',
            en: 'Amin Belalia | Portfolio',
            es: 'Amin Belalia | Portafolio'
        };
        document.title = titles[i18n.language] || 'Amin Belalia | Portfolio';
    }, [i18n.language]);

    useEffect(() => {
        console.log(
            "%c👋 Hey Dev! Looking for secrets? Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A",
            "color: #818cf8; font-family: monospace; font-size: 14px; background: #0f0f1a; padding: 10px; border-radius: 5px;"
        );
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                setIsTerminalOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
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
        localStorage.setItem('banner_dismissed', 'true');
    }, []);

    const closeInternshipModal = useCallback(() => {
        setIsInternshipModalOpen(false);
    }, []);

    const closeTerminal = useCallback(() => {
        setIsTerminalOpen(false);
    }, []);

    return {
        isLangSwitching,
        isInternshipModalOpen,
        isBannerVisible,
        isMatrixMode,
        isTerminalOpen,
        activeSection,
        setIsMatrixMode,
        handleLanguageChange,
        handleOpenInternshipModal,
        closeBanner,
        closeInternshipModal,
        closeTerminal,
    };
};
