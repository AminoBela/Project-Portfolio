import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

const engagementsData = [
    {
        id: 'oriaction',
        icon: 'fa-compass',
        titleKey: 'engagement_oriaction_title',
        descKey: 'engagement_oriaction_desc',
        year: '2025',
        badge: 'Salon Orientation',
        color: '#38bdf8'
    },
    {
        id: 'crous',
        icon: 'fa-house-user',
        titleKey: 'engagement_crous_title',
        descKey: 'engagement_crous_desc',
        year: '2025 →',
        badge: 'CROUS Lorraine',
        color: '#a78bfa'
    },
    {
        id: 'jpo',
        icon: 'fa-door-open',
        titleKey: 'engagement_jpo_title',
        descKey: 'engagement_jpo_desc',
        year: '2026',
        badge: 'IUT Nancy-Charlemagne',
        color: '#34d399'
    }
];

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

                <motion.div className="engagements-timeline" variants={childVariants}>
                    <div className="engagements-timeline__rail" aria-hidden="true" />
                    <motion.div
                        className="engagements-timeline__progress"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                        aria-hidden="true"
                    />

                    <ol className="engagements-timeline__items">
                        {engagementsData.map((engagement, i) => (
                            <motion.li
                                key={engagement.id}
                                className="engagements-timeline__item"
                                style={{ '--engagement-color': engagement.color }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.4 + i * 0.2, ease: 'easeOut' }}
                            >
                                <div className="engagements-timeline__year">{engagement.year}</div>
                                <div className="engagements-timeline__node" aria-hidden="true">
                                    <span className="engagements-timeline__node-ring" />
                                    <i className={`fa-solid ${engagement.icon}`}></i>
                                </div>
                                <div className="engagements-timeline__card">
                                    <span className="engagements-timeline__badge">{engagement.badge}</span>
                                    <h3 className="engagements-timeline__title">{t(engagement.titleKey)}</h3>
                                    <p className="engagements-timeline__desc">{t(engagement.descKey)}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </motion.div>
            </div>
        </motion.section>
    );
}
