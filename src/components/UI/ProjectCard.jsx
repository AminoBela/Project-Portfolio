/* Sections terminal stylées */
.terminal-section {
    border: none;
    background: transparent;
    position: relative;
    padding-top: 5rem;
    padding-bottom: 5rem;
}

.terminal-section::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: linear-gradient(135deg, rgba(102, 255, 153, 0.06), rgba(46, 134, 171, 0.05));
    border: 1px solid rgba(102, 255, 153, 0.12);
    transform: translateY(18px);
    filter: blur(38px);
    opacity: 0.7;
    pointer-events: none;
}

.terminal-section .container {
    position: relative;
    z-index: 1;
}

/* Compétences */
.skills-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-top: 1.2rem;
}

.legend-dot {
    display: inline-block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    margin-right: 0.35rem;
    box-shadow: 0 0 8px rgba(102, 255, 153, 0.25);
}

.legend-dot--expert { background: linear-gradient(135deg, #66ff99, #4ade80); }
.legend-dot--advanced { background: linear-gradient(135deg, #60a5fa, #38bdf8); }
.legend-dot--confirmed { background: linear-gradient(135deg, #fbbf24, #f97316); }
.legend-dot--progress { background: linear-gradient(135deg, #c084fc, #a855f7); }

.skills-groups {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid */
    gap: 2rem; /* Espacement uniforme */
    margin-top: 1.8rem;
    align-items: start;
}

.skills-group {
    background: rgba(16, 24, 32, 0.32);
    border: 1px solid rgba(102, 255, 153, 0.1);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.18);
    display: flex;
    flex-direction: column;
    gap: 1rem; /* Alignement uniforme entre les éléments */
    height: 100%; /* Assure une hauteur uniforme */
}

.skills-group__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
}

.skills-group__header h3 {
    margin: 0;
    font-size: 1.05rem;
    font-family: var(--font-code);
    color: var(--accent);
    letter-spacing: 0.04em;
    line-height: 1.1;
}

.skills-group__header span {
    font-size: 0.78rem;
    color: var(--text-secondary);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
}

/* Items individuels des compétences */
.skills-grid-wide {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* Assure des tailles consistantes */
    gap: 1rem; /* Égalisation des espacements */
    flex: 1 1 auto;
}

.skills-item {
    background-color: rgba(46, 134, 171, 0.1);
    border: 1px solid rgba(102, 255, 153, 0.12);
    border-radius: 12px;
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem; 
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.skills-item:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(102, 255, 153, 0.15);
}