import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

const hobbiesData = [
    {
        id: 'motorsport',
        icon: 'fa-flag-checkered',
        titleKey: 'hobby_motorsport',
        descKey: 'hobby_motorsport_desc',
        emoji: '🏎️',
        color: '#ff5555',
        gradient: 'linear-gradient(135deg, #ff5555 0%, #ff3333 100%)'
    },
    {
        id: 'homelab',
        icon: 'fa-server',
        titleKey: 'hobby_homelab',
        descKey: 'hobby_homelab_desc',
        emoji: '🖥️',
        color: '#50fa7b',
        gradient: 'linear-gradient(135deg, #50fa7b 0%, #3dd68c 100%)'
    },
    {
        id: 'travel',
        icon: 'fa-plane',
        titleKey: 'hobby_travel',
        descKey: 'hobby_travel_desc',
        emoji: '✈️',
        color: '#8be9fd',
        gradient: 'linear-gradient(135deg, #8be9fd 0%, #6bc5e0 100%)'
    },
    {
        id: 'mechanic',
        icon: 'fa-wrench',
        titleKey: 'hobby_mechanic',
        descKey: 'hobby_mechanic_desc',
        emoji: '🔧',
        color: '#ffb86c',
        gradient: 'linear-gradient(135deg, #ffb86c 0%, #f0a050 100%)'
    }
];

const HobbyCard = ({ hobby, t, index }) => (
    <motion.div
        className="hobby-card"
        variants={childVariants}
        style={{ '--hobby-color': hobby.color, '--hobby-gradient': hobby.gradient }}
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
        <div className="hobby-card__emoji">{hobby.emoji}</div>
        <div className="hobby-card__icon-ring">
            <div className="hobby-card__icon">
                <i className={`fa-solid ${hobby.icon}`}></i>
            </div>
        </div>
        <div className="hobby-card__content">
            <h3 className="hobby-card__title">{t(hobby.titleKey)}</h3>
            <p className="hobby-card__desc">{t(hobby.descKey)}</p>
        </div>
        <div className="hobby-card__shine"></div>
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
                    {hobbiesData.map((hobby, index) => (
                        <HobbyCard key={hobby.id} hobby={hobby} t={t} index={index} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
