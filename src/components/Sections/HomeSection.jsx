import React, { useState, Suspense } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button';
import cvPdf from '../../assets/cv.pdf';
import AnimatedStats from '../UI/AnimatedStats';
import HeroShowcase from '../UI/HeroShowcase';

const PdfViewerModal = React.lazy(() => import('../UI/PdfViewerModal'));

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
};

const HomeSection = () => {
    const { t } = useTranslation();
    const [isCvModalOpen, setIsCvModalOpen] = useState(false);

    return (
        <>
            <section id="accueil" className="home-section">
                <div className="home-grid">
                    <motion.div
                        className="home-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span className="home-eyebrow" variants={itemVariants}>
                            <span className="home-eyebrow__dot" aria-hidden="true" />
                            {t('home_status') || 'Available · Sept. 2026'}
                        </motion.span>

                        <motion.h1 className="home-title" variants={itemVariants}>
                            {t('home_greeting')}
                        </motion.h1>

                        <motion.h2 className="home-subtitle" variants={itemVariants}>
                            <span className="home-subtitle-static">{t('home_i_am')}</span>
                            <span className="home-subtitle-dynamic">{t('home_subtitle_1')}</span>
                        </motion.h2>

                        <motion.p className="home-description" variants={itemVariants}>
                            {t('home_description')}
                        </motion.p>

                        <motion.div className="home-btn-group" variants={itemVariants}>
                            <Button href="#projets" primary>{t('home_btn_projects')}</Button>
                            <Button onClick={() => setIsCvModalOpen(true)} secondary>{t('home_btn_cv')}</Button>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <AnimatedStats />
                        </motion.div>
                    </motion.div>

                    <HeroShowcase />
                </div>

                <motion.a
                    href="#about"
                    className="home-scroll-indicator"
                    aria-label="Scroll to about section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                >
                    <span className="home-scroll-indicator__mouse">
                        <span className="home-scroll-indicator__wheel" />
                    </span>
                </motion.a>
            </section>

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
