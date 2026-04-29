import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { technologies } from '../../data/technologies';

const TechCloud = () => {
    const containerRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);
    const iconsRef = useRef([]);

    const fixedPositions = useMemo(() => [
        { top: 5, left: 10, depth: 1.2 },
        { top: 15, left: 65, depth: 0.8 },
        { top: 35, left: 35, depth: 1.5 },
        { top: 45, left: 85, depth: 0.6 },
        { top: 65, left: 15, depth: 1.1 },
        { top: 75, left: 60, depth: 0.9 },
        { top: 25, left: 90, depth: 1.3 },
        { top: 55, left: 5, depth: 0.7 },
    ], []);

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
    }, [fixedPositions]);

    // Utilise rAF au lieu de setState pour l'effet parallaxe — zéro re-render
    const animate = useCallback(() => {
        const { x, y } = mouseRef.current;
        iconsRef.current.forEach((el, i) => {
            if (!el) return;
            const depth = techCloudStyles[i]?.depth || 1;
            el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
        rafRef.current = requestAnimationFrame(animate);
    }, [techCloudStyles]);

    useEffect(() => {
        // Pas de parallaxe sur mobile
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseRef.current = {
                x: (e.clientX - centerX) / 25,
                y: (e.clientY - centerY) / 25
            };
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, [animate]);

    return (
        <motion.div
            ref={containerRef}
            className="home-tech-cloud"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
        >
            {techCloudStyles.map((tech, index) => (
                <motion.div
                    key={tech.name}
                    ref={(el) => { iconsRef.current[index] = el; }}
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
                    }}
                    whileHover={{
                        scale: 1.12,
                        zIndex: 10
                    }}
                >
                    <img src={tech.icon} alt={tech.name} className="tech-icon" loading="lazy" />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default React.memo(TechCloud);
