import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInViewCountUp } from '../../hooks/useCountUp';

const statsData = [
    { id: 'years', valueKey: 3, suffix: '+', labelKey: 'stats_years' },
    { id: 'technologies', valueKey: 10, suffix: '+', labelKey: 'stats_technologies' },
    { id: 'projects', valueKey: 15, suffix: '+', labelKey: 'stats_projects' },
    { id: 'languages', valueKey: 5, suffix: '', labelKey: 'stats_languages' }
];

const StatItem = ({ stat, t }) => {
    const { ref, count } = useInViewCountUp(stat.valueKey, {
        duration: 2000,
        delay: 200
    });

    return (
        <motion.div
            ref={ref}
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <span className="stat-item__value">
                {count}{stat.suffix}
            </span>
            <span className="stat-item__label">{t(stat.labelKey)}</span>
        </motion.div>
    );
};

export default function AnimatedStats() {
    const { t } = useTranslation();

    return (
        <div className="animated-stats">
            {statsData.map((stat) => (
                <StatItem key={stat.id} stat={stat} t={t} />
            ))}
        </div>
    );
}
