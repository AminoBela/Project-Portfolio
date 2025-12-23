import React, { useMemo, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button';
import cvPdf from '../../assets/cv.pdf';
import { technologies } from '../../data/technologies';
import { useTypingEffect } from '../../hooks/useTypingEffect';

// Lazy Loading de la modale PDF
const PdfViewerModal = React.lazy(() => import('../UI/PdfViewerModal'));

const HomeSection = () => {
    const { t, ready } = useTranslation();
    const [isCvModalOpen, setIsCvModalOpen] = useState(false);

    const animatedWords = useMemo(() => {
        if (!ready) return ['...'];
        return [
            t('home_subtitle_1'),
            t('home_subtitle_2'),
            t('home_subtitle_3')
        ];
    }, [t, ready]);

    const animatedTitle = useTypingEffect(animatedWords, { typeSpeed: 100, deleteSpeed: 80, delay: 2000 });

    const fixedPositions = [
        { top: 5, left: 10 },
        { top: 15, left: 65 },
        { top: 35, left: 35 },
        { top: 45, left: 85 },
        { top: 65, left: 15 },
        { top: 75, left: 60 },
        { top: 25, left: 90 },
        { top: 55, left: 5 },
    ];

    const techCloudStyles = useMemo(() => {
        const animationNames = ['float-1', 'float-2', 'float-3'];

        return technologies.map((tech, index) => {
            const pos = fixedPositions[index] || { 
                top: Math.random() * 80, 
                left: Math.random() * 80 
            };

            const animationName = animationNames[index % animationNames.length];

            return {
                ...tech,
                top: `${pos.top}%`,
                left: `${pos.left}%`,
                animation: `${animationName} ${8 + Math.random() * 8}s ease-in-out infinite alternate`
            };
        });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <>
            <section id="accueil" className="home-section">
                <div className="home-grid">
                    <motion.div
                        className="home-content-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 className="home-title" variants={itemVariants}>
                            {t('home_greeting')}
                        </motion.h1>
                        <motion.h2 className="home-subtitle" variants={itemVariants}>
                            <span className="home-subtitle-static">{t('home_i_am')}</span>
                            <span className="home-subtitle-dynamic">{animatedTitle}</span>
                            <span className="home-cursor">|</span>
                        </motion.h2>
                        <motion.p className="home-description" variants={itemVariants}>
                            {t('home_description')}
                        </motion.p>
                        <motion.div className="home-btn-group" variants={itemVariants}>
                            <Button href="#projets" primary>{t('home_btn_projects')}</Button>
                            <Button onClick={() => setIsCvModalOpen(true)} secondary>{t('home_btn_cv')}</Button>
                        </motion.div>
                    </motion.div>

                    <motion.div className="home-tech-cloud" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}>
                        {techCloudStyles.map((tech) => (
                            <motion.div
                                key={tech.name}
                                className="tech-icon-wrapper"
                                variants={{
                                    hidden: { opacity: 0, scale: 0 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                style={{
                                    top: tech.top,
                                    left: tech.left,
                                    animation: tech.animation
                                }}
                            >
                                <img src={tech.icon} alt={tech.name} className="tech-icon" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Chargement différé de la modale PDF */}
            <Suspense fallback={null}>
                {isCvModalOpen && (
                    <PdfViewerModal 
                        isOpen={isCvModalOpen} 
                        onClose={() => setIsCvModalOpen(false)} 
                        pdfFile={cvPdf} 
                    />
                )}
            </Suspense>
        </>
    );
};

export default HomeSection;
