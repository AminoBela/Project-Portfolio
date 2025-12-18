import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Gère la visibilité basée sur le scroll
        const toggleVisibility = () => {
            setIsScrolled(window.scrollY > 500);
        };

        // Gère la visibilité basée sur l'ouverture d'une modale
        const mutationObserver = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.attributeName === 'class') {
                    setIsModalOpen(document.body.classList.contains('modal-is-open'));
                }
            }
        });

        window.addEventListener('scroll', toggleVisibility);
        mutationObserver.observe(document.body, { attributes: true });

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            mutationObserver.disconnect();
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Le bouton n'est visible que si on a scrollé ET qu'aucune modale n'est ouverte
    const shouldBeVisible = isScrolled && !isModalOpen;

    return (
        <AnimatePresence>
            {shouldBeVisible && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    whileHover={{ y: -3 }}
                    className="scroll-to-top"
                    aria-label="Retour en haut"
                >
                    ↑
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
