import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { technologies } from '../../data/technologies';

const TechCloud = () => {
    const fixedPositions = [
        { top: 5, left: 10 },
        { top: 15, left: 65 },
        { top: 35, left: 35 },
        { top: 45, left: 85 },
        { top: 65, left: 15 },
        { top: 75, left: 60 },
        { top: 25, left: 90 },
        { top: 55, left: 5 },
    ];

    const techCloudStyles = useMemo(() => {
        const animationNames = ['float-1', 'float-2', 'float-3'];

        return technologies.map((tech, index) => {
            const pos = fixedPositions[index] || { 
                top: Math.random() * 80, 
                left: Math.random() * 80 
            };

            const animationName = animationNames[index % animationNames.length];

            return {
                ...tech,
                top: `${pos.top}%`,
                left: `${pos.left}%`,
                animation: `${animationName} ${8 + Math.random() * 8}s ease-in-out infinite alternate`
            };
        });
    }, []);

    return (
        <motion.div 
            className="home-tech-cloud" 
            initial="hidden" 
            animate="visible" 
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
        >
            {techCloudStyles.map((tech) => (
                <motion.div
                    key={tech.name}
                    className="tech-icon-wrapper"
                    variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: { opacity: 1, scale: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    style={{
                        top: tech.top,
                        left: tech.left,
                        animation: tech.animation
                    }}
                >
                    <img src={tech.icon} alt={tech.name} className="tech-icon" />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default TechCloud;
