import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';

const InternshipModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();

    const accentColor = '#bd93f9';

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-hero" style={{
                background: `linear-gradient(135deg, rgba(189, 147, 249, 0.15) 0%, rgba(0,0,0,0) 100%)`,
                borderBottom: `1px solid rgba(189, 147, 249, 0.3)`
            }}>
                <div className="modal-hero__content">
                    <span className="modal-hero__badge" style={{ backgroundColor: accentColor, color: '#000' }}>
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
                        <span className="stat-label">{t('alternance_rhythm_label')}</span>
                        <span className="stat-value">{t('alternance_rhythm_value')}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">{t('modal_internship_location')}</span>
                        <span className="stat-value">{t('modal_internship_location_value')}</span>
                    </div>
                </div>

                <div className="tech-section">
                    <div className="tech-stack">
                        <h4><i className="fa-solid fa-graduation-cap"></i> {t('modal_internship_mobility_title')}</h4>
                        <p className="project-full-desc" dangerouslySetInnerHTML={{ __html: t('modal_internship_mobility_desc') }} />
                    </div>

                    <div className="tech-stack" style={{ marginTop: '2rem' }}>
                        <h4><i className="fa-solid fa-bullseye"></i> {t('modal_internship_missions_title')}</h4>
                        <div className="project-tags large">
                            {['modal_internship_mission_1', 'modal_internship_mission_2', 'modal_internship_mission_3', 'modal_internship_mission_4'].map(key => (
                                <span key={key} className="tag" style={{ borderColor: accentColor, color: accentColor }}>
                                    {t(key)}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="tech-stack" style={{ marginTop: '2rem' }}>
                        <h4><i className="fa-solid fa-address-card"></i> {t('modal_internship_contact_title')}</h4>
                        <div className="modal-hero__actions" style={{ marginTop: '1rem' }}>
                            <a href="mailto:abelaliabendjafar@gmail.com" className="btn-github">
                                {t('alternance_cta_contact')}
                            </a>
                            <a href="https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/" target="_blank" rel="noopener noreferrer" className="btn-demo" style={{ color: accentColor, borderColor: accentColor }}>
                                {t('alternance_cta_linkedin')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default InternshipModal;
