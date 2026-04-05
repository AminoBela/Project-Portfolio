import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { technologies } from '../../data/technologies';

const TechCloud = () => {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const fixedPositions = [
        { top: 5, left: 10, depth: 1.2 },
        { top: 15, left: 65, depth: 0.8 },
        { top: 35, left: 35, depth: 1.5 },
        { top: 45, left: 85, depth: 0.6 },
        { top: 65, left: 15, depth: 1.1 },
        { top: 75, left: 60, depth: 0.9 },
        { top: 25, left: 90, depth: 1.3 },
        { top: 55, left: 5, depth: 0.7 },
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            setMousePosition({
                x: (e.clientX - centerX) / 25,
                y: (e.clientY - centerY) / 25
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const techCloudStyles = useMemo(() => {
        const animationNames = ['float-1', 'float-2', 'float-3'];

        return technologies.map((tech, index) => {
            const pos = fixedPositions[index] || {
                top: Math.random() * 80,
                left: Math.random() * 80,
                depth: 1
            };

            const animationName = animationNames[index % animationNames.length];

            return {
                ...tech,
                top: `${pos.top}%`,
                left: `${pos.left}%`,
                depth: pos.depth,
                animation: `${animationName} ${8 + Math.random() * 8}s ease-in-out infinite alternate`
            };
        });
    }, []);

    return (
        <motion.div
            ref={containerRef}
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
                        animation: tech.animation,
                        transform: `translate(${mousePosition.x * tech.depth}px, ${mousePosition.y * tech.depth}px)`
                    }}
                    whileHover={{
                        scale: 1.2,
                        boxShadow: '0 0 30px rgba(var(--accent-rgb), 0.5)',
                        zIndex: 10
                    }}
                >
                    <img src={tech.icon} alt={tech.name} className="tech-icon" />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default TechCloud;
