import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

const ContactSection = () => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const email = "abelaliabendjafar@gmail.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.section
            id="contact"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="terminal-section contact-section"
        >
            <div className="container">
                <motion.h2 variants={childVariants} className="terminal-command">
                    {t('contact_title')}
                </motion.h2>

                <motion.div className="contact-card-wrapper" variants={childVariants}>
                    <div className="contact-card-header">
                        <div className="terminal-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <div className="status-badge">
                            <span className="status-pulse"></span>
                            {t('contact_status')}
                        </div>
                    </div>

                    <div className="contact-card-body">
                        <p className="contact-text">
                            <span className="prompt">root@portfolio:~$</span> echo "{t('contact_echo')}"
                        </p>
                        <p className="contact-description" dangerouslySetInnerHTML={{ __html: t('contact_desc') }}></p>

                        <div className="contact-grid">
                            {/* EMAIL AVEC COPIE */}
                            <div className="contact-item" onClick={handleCopyEmail}>
                                <div className="icon-box">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className="info-box">
                                    <span className="label">{t('contact_email_label')}</span>
                                    <span className="value">{email}</span>
                                </div>
                                <div className="action-icon">
                                    <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                                </div>
                                {copied && <span className="copy-feedback">{t('contact_copied')}</span>}
                            </div>

                            {/* LINKEDIN */}
                            <a
                                href="https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-item"
                            >
                                <div className="icon-box">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </div>
                                <div className="info-box">
                                    <span className="label">{t('contact_linkedin_label')}</span>
                                    <span className="value">Amin Belalia</span>
                                </div>
                                <div className="action-icon">
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                </div>
                            </a>

                            {/* LOCALISATION */}
                            <div className="contact-item no-hover">
                                <div className="icon-box">
                                    <i className="fa-solid fa-map-pin"></i>
                                </div>
                                <div className="info-box">
                                    <span className="label">{t('contact_location_label')}</span>
                                    <span className="value">{t('contact_location_value')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ContactSection;
