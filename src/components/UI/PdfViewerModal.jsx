import React from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import Button from './Button';

const PdfViewerModal = ({ isOpen, onClose, pdfFile }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: 'calc(90vh - 4rem)', 
                width: '100%' 
            }}>
                {/* --- Barre d'outils en haut --- */}
                <div style={{ 
                    padding: '1rem',
                    borderBottom: '1px solid var(--card-border)',
                    display: 'flex',
                    justifyContent: 'space-between', // Espace entre les éléments
                    alignItems: 'center',
                    flexShrink: 0,
                    gap: '1rem',
                    paddingRight: '4rem' // Marge de sécurité ENORME pour le bouton fermer
                }}>
                    {/* Bouton à gauche pour éviter tout conflit à droite */}
                    <Button 
                        href={pdfFile} 
                        download="CV_Amin_Belalia.pdf" 
                        primary
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                        <i className="fa-solid fa-download" style={{ marginRight: '0.5rem' }}></i>
                        <span className="btn-text">Télécharger</span>
                    </Button>

                    <h3 style={{ 
                        margin: 0, 
                        fontSize: '1.1rem', 
                        color: 'var(--color-text)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'right' // Aligné à droite vers le bouton fermer mais avec le padding
                    }}>
                        Mon CV
                    </h3>
                </div>

                {/* --- Lecteur PDF --- */}
                <div style={{ flexGrow: 1, overflow: 'hidden', backgroundColor: '#525659' }}>
                    <object 
                        data={pdfFile} 
                        type="application/pdf" 
                        width="100%" 
                        height="100%"
                        aria-label="Lecteur de PDF pour le CV"
                    >
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            height: '100%', 
                            padding: '2rem', 
                            color: '#fff',
                            textAlign: 'center'
                        }}>
                            <p style={{ marginBottom: '1rem' }}>Votre navigateur ne peut pas afficher ce PDF directement.</p>
                            <Button 
                                href={pdfFile} 
                                download="CV_Amin_Belalia.pdf" 
                                primary
                            >
                                Télécharger le PDF
                            </Button>
                        </div>
                    </object>
                </div>
            </div>
            
            {/* Style pour cacher le texte du bouton sur mobile si besoin */}
            <style>{`
                @media (max-width: 600px) {
                    .btn-text { display: none; }
                }
            `}</style>
        </Modal>
    );
};

export default PdfViewerModal;
