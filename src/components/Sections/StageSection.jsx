import React from 'react';
import '../../styles/components.css';

const stageHighlights = [
    'Automatisation complète du suivi des adhérents et des dons',
    'Génération dynamique des CERFA et documents administratifs',
    'Nettoyage et optimisation de classeurs Excel lourds',
    'Documentation claire pour assurer la continuité des outils',
    'Support technique et accompagnement des équipes'
];

function StageSection() {
    return (
        <section id="stage" className="terminal-section stage-section">
            <div className="container">
                <div className="stage-wrapper">
                    <header className="stage-header">
                        <h2 className="terminal-command">&gt; Stage</h2>
                        <p className="stage-intro">
                            Retour sur mon stage de 8 semaines au sein de l’association ELA, centré sur
                            l’automatisation d’outils métiers avec VBA et Excel.
                        </p>
                    </header>

                    <article className="stage-card">
                        <div className="stage-card__top">
                            <div className="stage-logo" data-cursor="pointer">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/70/Logo_ELA_Pav%C3%A9_Rose_-_Baseline.jpg"
                                    alt="Logo de l'association ELA"
                                    loading="lazy"
                                />
                            </div>
                            <div className="stage-meta">
                                <span className="stage-organization">Association ELA</span>
                                <span className="stage-role">Développeur — Stage de 8 semaines (2025)</span>
                            </div>
                            <span className="stage-tag">VBA & Automatisation</span>
                        </div>

                        <div className="stage-body">
                            <p className="stage-description">
                                Développement de solutions automatisées pour fluidifier la gestion interne :
                                scripts VBA, génération de documents, optimisation des workflows et transfert
                                de connaissances vers l’équipe.
                            </p>

                            <dl className="stage-infos">
                                <div>
                                    <dt>Technologies</dt>
                                    <dd>VBA, Excel, macros avancées, Power Query</dd>
                                </div>
                                <div>
                                    <dt>Livrables</dt>
                                    <dd>Scripts VBA modulaires, génération de PDF, guide de maintenance</dd>
                                </div>
                            </dl>

                            <ul className="stage-highlights">
                                {stageHighlights.map((item, index) => (
                                    <li key={index} className="stage-highlight">
                                        <span className="stage-bullet" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default StageSection;
