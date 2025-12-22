import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';

const InternshipModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    // On retire le retour null conditionnel pour laisser l'animation de sortie se jouer
    // if (!isOpen) return null; 

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-hero" style={{ background: 'linear-gradient(135deg, rgba(102, 255, 153, 0.15) 0%, rgba(0,0,0,0) 100%)', borderBottom: '1px solid rgba(102, 255, 153, 0.3)' }}>
                <div className="modal-hero__content">
                    <span className="modal-hero__badge" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
                        {t('modal_internship_badge')}
                    </span>
                    <h2>{t('modal_internship_title')}</h2>
                    <p className="expanded-card-subtitle">{t('modal_internship_subtitle')}</p>
                </div>
            </div>

            <div className="modal-body">
                <div className="stats-grid">
                    <div className="stat-box">
                        <span className="stat-label">{t('modal_internship_start')}</span>
                        <span className="stat-value">{t('about_internship_date')}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">{t('modal_internship_duration')}</span>
                        <span className="stat-value">{t('modal_internship_duration_value')}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">{t('modal_internship_location')}</span>
                        <span className="stat-value">{t('modal_internship_location_value')}</span>
                    </div>
                </div>

                <div className="tech-section">
                    <div className="tech-stack">
                        <h4><i className="fa-solid fa-location-dot"></i> {t('modal_internship_mobility_title')}</h4>
                        <p className="project-full-desc" dangerouslySetInnerHTML={{ __html: t('modal_internship_mobility_desc') }} />
                    </div>

                    <div className="tech-stack" style={{ marginTop: '2rem' }}>
                        <h4><i className="fa-solid fa-bullseye"></i> {t('modal_internship_missions_title')}</h4>
                        <ul className="highlights-list">
                            <li><span>✓</span> {t('modal_internship_mission_1')}</li>
                            <li><span>✓</span> {t('modal_internship_mission_2')}</li>
                            <li><span>✓</span> {t('modal_internship_mission_3')}</li>
                            <li><span>✓</span> {t('modal_internship_mission_4')}</li>
                        </ul>
                    </div>

                    <div className="tech-stack" style={{ marginTop: '2rem' }}>
                        <h4><i className="fa-solid fa-address-card"></i> {t('modal_internship_contact_title')}</h4>
                        <div className="contact-buttons" style={{ 
                            justifyContent: 'flex-start', 
                            display: 'flex', 
                            gap: '1rem', 
                            flexWrap: 'wrap' 
                        }}>
                            <a href="mailto:abelaliabendjafar@gmail.com" className="btn-download">
                                <i className="fa-solid fa-envelope"></i> abelaliabendjafar@gmail.com
                            </a>
                            <a href="tel:+33752078999" className="btn-social" style={{ width: 'auto', padding: '0 1.5rem', borderRadius: '12px' }}>
                                <i className="fa-solid fa-phone"></i> 07 52 07 89 99
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default InternshipModal;
