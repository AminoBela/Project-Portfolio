import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

const InternshipBanner = ({ onOpenModal, isVisible, onClose }) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="internship-banner"
                    role="region"
                    aria-label={t('banner_status')}
                >
                    <div className="internship-banner__shimmer" aria-hidden="true" />

                    <div className="internship-banner__inner">
                        <div className="internship-banner__status">
                            <span className="internship-banner__pulse" aria-hidden="true">
                                <span className="internship-banner__pulse-dot" />
                                <span className="internship-banner__pulse-ring" />
                            </span>
                            <span className="internship-banner__status-label">
                                {t('banner_status')}
                            </span>
                        </div>

                        <span className="internship-banner__separator" aria-hidden="true" />

                        <span className="internship-banner__text">
                            {t('banner_text')}
                        </span>

                        <button
                            onClick={onOpenModal}
                            className="internship-banner__cta"
                            type="button"
                        >
                            <span>{t('banner_cta')}</span>
                            <i className="fa-solid fa-arrow-right internship-banner__cta-icon" aria-hidden="true" />
                        </button>

                        <button
                            onClick={onClose}
                            className="internship-banner__close"
                            aria-label={t('banner_close') || 'Close'}
                            type="button"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InternshipBanner;
