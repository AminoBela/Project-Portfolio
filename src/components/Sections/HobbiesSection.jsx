import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { sectionVariants, childVariants } from '../../utils/motion';


const hobbiesData = [
    {
        id: 'motorsport',
        size: 'large',
        icon: 'fa-flag-checkered',
        titleKey: 'hobby_motorsport',
        descKey: 'hobby_motorsport_desc',
        color: '#fb7185',
        accent: 'rgba(251, 113, 133, 0.18)'
    },
    {
        id: 'homelab',
        size: 'tall',
        icon: 'fa-server',
        titleKey: 'hobby_homelab',
        descKey: 'hobby_homelab_desc',
        color: '#34d399',
        accent: 'rgba(52, 211, 153, 0.18)'
    },
    {
        id: 'travel',
        size: 'wide',
        icon: 'fa-plane',
        titleKey: 'hobby_travel',
        descKey: 'hobby_travel_desc',
        color: '#38bdf8',
        accent: 'rgba(56, 189, 248, 0.18)'
    },
    {
        id: 'mechanic',
        size: 'small',
        icon: 'fa-wrench',
        titleKey: 'hobby_mechanic',
        descKey: 'hobby_mechanic_desc',
        color: '#fbbf24',
        accent: 'rgba(251, 191, 36, 0.18)'
    }
];

const HobbyCard = ({ hobby, t }) => {

    return (
        <motion.article
           
            className={`hobby-card hobby-card--${hobby.size}`}
            variants={childVariants}
            style={{ '--hobby-color': hobby.color, '--hobby-accent': hobby.accent }}
        >
            <div className="hobby-card__bg" aria-hidden="true" />
            <div className="hobby-card__icon-wrap">
                <i className={`fa-solid ${hobby.icon} hobby-card__icon`} aria-hidden="true" />
            </div>
            <div className="hobby-card__body">
                <h3 className="hobby-card__title">{t(hobby.titleKey)}</h3>
                <p className="hobby-card__desc">{t(hobby.descKey)}</p>
            </div>
        </motion.article>
    );
};

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

                <div className="hobbies-bento">
                    {hobbiesData.map((hobby) => (
                        <HobbyCard key={hobby.id} hobby={hobby} t={t} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
