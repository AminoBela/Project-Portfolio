import React, { useMemo, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../UI/Button';
import cvPdf from '../../assets/cv.pdf';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import TechCloud from '../UI/TechCloud';
import AnimatedStats from '../UI/AnimatedStats';

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
                        <motion.div variants={itemVariants}>
                            <AnimatedStats />
                        </motion.div>
                    </motion.div>

                    <TechCloud />
                </div>
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
