import React from "react";

// Ajoute les logos dans src/assets/tech-logos/
const logos = {
    HTML: "/assets/tech-logos/html.svg",
    CSS: "/assets/tech-logos/css.svg",
    JavaScript: "/assets/tech-logos/js.svg",
    React: "/assets/tech-logos/react.svg",
    PHP: "/assets/tech-logos/php.svg",
    Java: "/assets/tech-logos/java.svg",
    SQL: "/assets/tech-logos/sql.svg",
    "Linux (Bash)": "/assets/tech-logos/linux.svg",
    Git: "/assets/tech-logos/git.svg",
    Docker: "/assets/tech-logos/docker.svg",
    Kubernetes: "/assets/tech-logos/k8s.svg",
    VBA: "/assets/tech-logos/vba.svg"
};

export default function SkillBar({ skill }) {
    return (
        <div className="skill-bar-container">
            <div className="skill-bar-label">
                {logos[skill.name] && <img src={logos[skill.name]} alt={skill.name} className="skill-logo" />}
                <span>{skill.name}</span>
            </div>
            <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: `${skill.level * 20}%` }} />
            </div>
        </div>
    );
}