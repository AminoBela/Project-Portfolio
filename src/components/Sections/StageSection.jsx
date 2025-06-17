import React from 'react';

                function StageSection() {
                  return (
                    <section id="stage" className="terminal-section stage-section">
                      <div className="container">
                        <h2 className="terminal-command">&gt; Stage</h2>
                        <div className="stage-card tech-card">
                          <div className="stage-header" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1rem' }}>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/7/70/Logo_ELA_Pav%C3%A9_Rose_-_Baseline.jpg"
                              alt="Logo ELA"
                              style={{ width: 64, height: 64, borderRadius: 8, background: '#fff', objectFit: 'contain', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                            />
                            <div>
                              <span className="terminal-text" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Association ELA</span>
                              <div className="terminal-text" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Stage de 8 semaines (2025)</div>
                            </div>
                          </div>
                          <div className="terminal-text" style={{ marginBottom: '0.7rem' }}>
                            <strong>Rôle :</strong> Développeur <br />
                            <strong>Mission :</strong> Développement de solutions automatisées pour la gestion de données et la génération de documents sous Excel (VBA).
                          </div>
                          <div className="terminal-text" style={{ marginBottom: '0.7rem' }}>
                            <strong>Technologies :</strong> VBA, Excel, macros, automatisation de tâches.
                          </div>
                          <div className="terminal-text" style={{ color: 'var(--text-secondary)' }}>
                            <ul style={{ marginLeft: '1.2rem', marginBottom: 0 }}>
                              <li>Création de scripts pour automatiser la gestion des adhérents et des dons</li>
                              <li>Génération automatique de documents CERFA</li>
                              <li>Optimisation de fichiers Excel volumineux et nettoyage de données</li>
                              <li>Documentation technique pour la reprise des outils</li>
                              <li>Support informatique</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>
                  );
                }

                export default StageSection;