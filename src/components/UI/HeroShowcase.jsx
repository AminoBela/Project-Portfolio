import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const rowStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } }
};

const rowItem = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

function HeroShowcase() {
    const { t } = useTranslation();

    return (
        <motion.aside
            className="hero-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            aria-label="Profile summary"
        >
            <div className="hero-card__border" aria-hidden="true" />

            <header className="hero-card__head">
                <span className="hero-card__live">
                    <span className="hero-card__live-dot" />
                    {t('hero_card_live') || 'CURRENTLY'}
                </span>
                <span className="hero-card__handle">@aminbelalia</span>
            </header>

            <div className="hero-card__hero">
                <div className="hero-card__title">
                    {t('hero_card_status') || 'Available'}
                </div>
                <div className="hero-card__subtitle">
                    {t('hero_card_when') || 'Work-Study · Sept. 2026'}
                </div>
            </div>

            <div className="hero-card__divider" />

            <motion.ul
                className="hero-card__rows"
                variants={rowStagger}
                initial="hidden"
                animate="visible"
            >
                <motion.li className="hero-card__row" variants={rowItem}>
                    <span className="hero-card__row-key">
                        <i className="fa-solid fa-location-dot" aria-hidden="true" />
                        {t('hero_card_location_label') || 'Location'}
                    </span>
                    <span className="hero-card__row-val">
                        {t('hero_card_location_value') || 'Lorraine & Alsace, FR'}
                    </span>
                </motion.li>

                <motion.li className="hero-card__row" variants={rowItem}>
                    <span className="hero-card__row-key">
                        <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
                        {t('hero_card_education_label') || 'Education'}
                    </span>
                    <span className="hero-card__row-val">
                        {t('hero_card_education_value') || 'BUT Info → CESI Mastère'}
                    </span>
                </motion.li>

                <motion.li className="hero-card__row" variants={rowItem}>
                    <span className="hero-card__row-key">
                        <i className="fa-solid fa-server" aria-hidden="true" />
                        {t('hero_card_focus_label') || 'Focus'}
                    </span>
                    <span className="hero-card__row-val">
                        {t('hero_card_focus_value') || 'Infra · Cybersecurity · DevOps'}
                    </span>
                </motion.li>

                <motion.li className="hero-card__row" variants={rowItem}>
                    <span className="hero-card__row-key">
                        <i className="fa-solid fa-code" aria-hidden="true" />
                        {t('hero_card_stack_label') || 'Stack'}
                    </span>
                    <span className="hero-card__row-val hero-card__row-val--mono">
                        Linux · Docker · K8s · Terraform
                    </span>
                </motion.li>
            </motion.ul>

            <div className="hero-card__divider" />

            <footer className="hero-card__foot">
                <a href="https://github.com/AminoBela" target="_blank" rel="noopener noreferrer" className="hero-card__link" aria-label="GitHub">
                    <i className="fa-brands fa-github" aria-hidden="true" />
                    <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/" target="_blank" rel="noopener noreferrer" className="hero-card__link" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin" aria-hidden="true" />
                    <span>LinkedIn</span>
                </a>
            </footer>
        </motion.aside>
    );
}

export default HeroShowcase;
