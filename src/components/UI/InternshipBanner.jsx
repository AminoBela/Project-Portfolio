import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const InternshipBanner = ({ onOpenModal, isVisible, onClose }) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="internship-banner" // Ajout d'une classe pour le style
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 2000,
                        overflow: 'hidden',
                        // Les couleurs sont maintenant gérées par le CSS via la classe .internship-banner
                    }}
                >
                    {/* Effet de scanline subtil */}
                    <div className="banner-scanline" />

                    <div className="container" style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        padding: '0.6rem 1rem',
                        gap: '1.5rem',
                        fontSize: '0.9rem',
                        flexWrap: 'wrap',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <span style={{ 
                                    display: 'inline-block', 
                                    width: '8px', 
                                    height: '8px', 
                                    borderRadius: '50%', 
                                    backgroundColor: 'var(--accent)',
                                    boxShadow: '0 0 10px var(--accent)',
                                    animation: 'pulse 1.5s infinite'
                                }}></span>
                                <span style={{ 
                                    position: 'absolute', 
                                    width: '100%', 
                                    height: '100%', 
                                    borderRadius: '50%', 
                                    border: '1px solid var(--accent)',
                                    animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                                }}></span>
                            </div>
                            <span style={{ 
                                fontWeight: '700', 
                                color: 'var(--accent)', 
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontSize: '0.8rem'
                            }}>
                                {t('banner_status')}
                            </span>
                            <span className="banner-separator">|</span>
                            <span style={{ fontWeight: '500', color: 'var(--color-text)' }}>{t('banner_text')}</span>
                        </div>

                        <button 
                            onClick={onOpenModal} 
                            className="banner-cta"
                        >
                            <span>{t('banner_cta')}</span>
                            <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8em' }}></i>
                        </button>

                        <button 
                            onClick={onClose}
                            className="banner-close"
                            aria-label="Fermer"
                        >
                            &times;
                        </button>
                    </div>
                    
                    <style>{`
                        /* Styles par défaut (Dark) */
                        .internship-banner {
                            background: linear-gradient(90deg, rgba(16, 20, 26, 0.98) 0%, rgba(20, 30, 40, 0.98) 100%);
                            border-bottom: 1px solid rgba(102, 255, 153, 0.3);
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                        }
                        .banner-scanline {
                            position: absolute;
                            top: 0; left: 0; width: 100%; height: 100%;
                            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
                            background-size: 100% 2px, 3px 100%;
                            pointer-events: none;
                            opacity: 0.3;
                        }
                        .banner-separator { color: rgba(255,255,255,0.2); }
                        
                        .banner-cta {
                            color: #1e1e1e;
                            background-color: var(--accent);
                            padding: 0.3rem 1rem;
                            border-radius: 4px;
                            border: none;
                            font-weight: bold;
                            font-size: 0.85rem;
                            cursor: pointer;
                            transition: all 0.2s;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            box-shadow: 0 0 10px rgba(102, 255, 153, 0.2);
                        }
                        .banner-cta:hover {
                            transform: translateY(-1px);
                            box-shadow: 0 4px 12px rgba(102, 255, 153, 0.4);
                            background-color: #fff;
                        }

                        .banner-close {
                            background: transparent;
                            border: none;
                            color: var(--text-secondary);
                            cursor: pointer;
                            font-size: 1.2rem;
                            padding: 0 0.5rem;
                            margin-left: auto;
                            opacity: 0.7;
                            transition: opacity 0.2s;
                        }
                        .banner-close:hover {
                            opacity: 1;
                            color: var(--color-text);
                        }

                        /* --- Styles pour le thème CLAIR --- */
                        :root.light .internship-banner {
                            background: linear-gradient(90deg, #f0f4f8 0%, #e2e8f0 100%);
                            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                        }
                        :root.light .banner-scanline {
                            opacity: 0.05; /* Scanline très discrète en light */
                            background: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.05) 50%);
                            background-size: 100% 4px;
                        }
                        :root.light .banner-separator { color: rgba(0,0,0,0.2); }
                        
                        :root.light .banner-cta {
                            color: #fff; /* Texte blanc sur bouton accent */
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        }
                        :root.light .banner-cta:hover {
                            background-color: var(--color-text); /* Devient noir/sombre au survol */
                            color: #fff;
                        }

                        @keyframes pulse {
                            0% { opacity: 1; }
                            50% { opacity: 0.5; }
                            100% { opacity: 1; }
                        }
                        @keyframes ping {
                            75%, 100% { transform: scale(2); opacity: 0; }
                        }
                        @media (max-width: 768px) {
                            .banner-separator { display: none; }
                            .container { flex-direction: column; text-align: center; gap: 0.8rem; padding: 1rem; }
                            .banner-cta { width: 100%; justify-content: center; }
                            .banner-close { position: absolute; top: 0.5rem; right: 0.5rem; }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InternshipBanner;
