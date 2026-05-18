import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const ticking = useRef(false);

    useEffect(() => {
        const update = () => {
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                    setIsVisible(scrollTop > 600);
                    setProgress(maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0);
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', update, { passive: true });
        update();
        return () => window.removeEventListener('scroll', update);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const RADIUS = 22;
    const CIRC = 2 * Math.PI * RADIUS;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    onClick={scrollToTop}
                    className="back-to-top"
                    aria-label="Retour en haut"
                    initial={{ opacity: 0, scale: 0.8, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: 16 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.92 }}
                >
                    <svg className="back-to-top__ring" viewBox="0 0 52 52" aria-hidden="true">
                        <circle
                            cx="26"
                            cy="26"
                            r={RADIUS}
                            className="back-to-top__ring-track"
                        />
                        <circle
                            cx="26"
                            cy="26"
                            r={RADIUS}
                            className="back-to-top__ring-fill"
                            strokeDasharray={CIRC}
                            strokeDashoffset={CIRC * (1 - progress)}
                        />
                    </svg>
                    <svg className="back-to-top__arrow" viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="18 15 12 9 6 15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTopButton;
