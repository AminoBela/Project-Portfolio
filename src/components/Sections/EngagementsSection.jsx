import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

const engagementsData = [
    {
        id: 'jpo',
        icon: 'fa-door-open',
        titleKey: 'engagement_jpo_title',
        descKey: 'engagement_jpo_desc',
        period: '2026',
        badge: 'IUT Nancy-Charlemagne',
        color: '#50fa7b'
    },
    {
        id: 'oriaction',
        icon: 'fa-compass',
        titleKey: 'engagement_oriaction_title',
        descKey: 'engagement_oriaction_desc',
        period: '2025',
        badge: 'Salon Orientation',
        color: '#8be9fd'
    },
    {
        id: 'crous',
        icon: 'fa-house-user',
        titleKey: 'engagement_crous_title',
        descKey: 'engagement_crous_desc',
        period: '2025 - Actuel',
        badge: 'CROUS Lorraine',
        color: '#bd93f9'
    }
];

const EngagementCard = ({ engagement, t }) => (
    <motion.div
        className="engagement-card"
        variants={childVariants}
        style={{ '--engagement-color': engagement.color }}
    >
        <div className="engagement-card__icon">
            <i className={`fa-solid ${engagement.icon}`}></i>
        </div>
        <div className="engagement-card__content">
            <span className="engagement-card__badge">{engagement.badge}</span>
            <h3 className="engagement-card__title">{t(engagement.titleKey)}</h3>
            <p className="engagement-card__desc">{t(engagement.descKey)}</p>
            <span className="engagement-card__period">
                <i className="fa-regular fa-calendar"></i> {engagement.period}
            </span>
        </div>
    </motion.div>
);

export default function EngagementsSection() {
    const { t } = useTranslation();

    return (
        <motion.section
            id="engagements"
            className="engagements-section terminal-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="container">
                <motion.h2 variants={childVariants} className="terminal-command">
                    {t('engagements_title')}
                </motion.h2>

                <motion.p variants={childVariants} className="engagements-intro">
                    {t('engagements_intro')}
                </motion.p>

                <div className="engagements-grid">
                    {engagementsData.map((engagement) => (
                        <EngagementCard key={engagement.id} engagement={engagement} t={t} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
