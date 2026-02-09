import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

const hobbiesData = [
    {
        id: 'motorsport',
        icon: 'fa-flag-checkered',
        titleKey: 'hobby_motorsport',
        color: '#ff5555'
    },
    {
        id: 'homelab',
        icon: 'fa-server',
        titleKey: 'hobby_homelab',
        color: '#50fa7b'
    },
    {
        id: 'travel',
        icon: 'fa-plane',
        titleKey: 'hobby_travel',
        color: '#8be9fd'
    },
    {
        id: 'mechanic',
        icon: 'fa-wrench',
        titleKey: 'hobby_mechanic',
        color: '#ffb86c'
    }
];

const HobbyCard = ({ hobby, t }) => (
    <motion.div
        className="hobby-card"
        variants={childVariants}
        style={{ '--hobby-color': hobby.color }}
    >
        <div className="hobby-card__icon">
            <i className={`fa-solid ${hobby.icon}`}></i>
        </div>
        <span className="hobby-card__title">{t(hobby.titleKey)}</span>
    </motion.div>
);

export default function HobbiesSection() {
    const { t } = useTranslation();

    return (
        <motion.section
            id="hobbies"
            className="hobbies-section terminal-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="container">
                <motion.h2 variants={childVariants} className="terminal-command">
                    {t('hobbies_title')}
                </motion.h2>

                <motion.p variants={childVariants} className="hobbies-intro">
                    {t('hobbies_intro')}
                </motion.p>

                <div className="hobbies-grid">
                    {hobbiesData.map((hobby) => (
                        <HobbyCard key={hobby.id} hobby={hobby} t={t} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
