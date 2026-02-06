import React from 'react';
import { motion } from 'framer-motion';
import { childVariants } from '../../utils/framerMotionVariants';

const EducationCard = ({ item, t, onClick }) => {
    const statusClass = `education-card--${item.status}`;
    const statusLabel = t(`education_status_${item.status}`);

    return (
        <motion.div
            className={`education-card ${statusClass}`}
            variants={childVariants}
            // Hover géré par CSS
            onClick={() => onClick(item)}
            data-cursor="pointer"
        >
            {item.status === 'current' && <div className="education-card__shimmer" />}
            <span className="education-card__badge">{statusLabel}</span>

            <div className="education-card__header">
                {item.logo ? (
                    <img src={item.logo} alt="" className="education-card__logo" />
                ) : (
                    <div className="education-card__logo-placeholder">
                        <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                )}
                <div className="education-card__header-text">
                    <h3 className="education-card__title">{t(item.title)}</h3>
                    <span className="education-card__institution">{t(item.institution)}</span>
                </div>
            </div>

            <div className="education-card__period">
                <i className="fa-regular fa-calendar"></i>
                {t(item.period)}
            </div>

            <p className="education-card__description">{t(item.description)}</p>
        </motion.div>
    );
};

const AlternanceCard = ({ t, onClick }) => (
    <motion.div
        className="alternance-card"
        variants={childVariants}
        // Hover géré par CSS
        onClick={onClick}
        data-cursor="pointer"
    >
        <div className="alternance-card__icon">
            <i className="fa-solid fa-briefcase"></i>
        </div>
        <div className="alternance-card__content">
            <h4>{t('alternance_search_title')}</h4>
            <p dangerouslySetInnerHTML={{ __html: t('alternance_search_desc') }} />
            <span className="alternance-card__cta">{t('alternance_search_more')}</span>
        </div>
    </motion.div>
);

function EducationRoadmap({ educationData, t, onSelect, onAlternanceClick }) {
    return (
        <div className="education-roadmap">
            <h3 className="education-roadmap__title">
                <i className="fa-solid fa-graduation-cap"></i>
                {t('education_title')}
            </h3>

            <div className="education-cards">
                {educationData.map((item) => (
                    <EducationCard
                        key={item.id}
                        item={item}
                        t={t}
                        onClick={onSelect}
                    />
                ))}
            </div>

            <AlternanceCard t={t} onClick={onAlternanceClick} />
        </div>
    );
}

export default EducationRoadmap;
