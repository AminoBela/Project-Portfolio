import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
import cvPdf from '../../assets/cv.pdf';
import { technologies } from '../../data/technologies';
import { useTypingEffect } from '../../hooks/useTypingEffect';

const HomeSection = () => {
    const animatedTitle = useTypingEffect(
        ['Développeur Web', 'Spécialiste DevOps', 'Créateur de Solutions'],
        { typeSpeed: 100, deleteSpeed: 80, delay: 2000 }
    );

    // Memoize the icon styles with collision detection to prevent re-calculation and overlap
    const techCloudStyles = useMemo(() => {
        const positions = [];
        const iconSize = 110; // Increased icon size for more spacing
        const containerWidth = 400;
        const containerHeight = 350;
        const animationNames = ['float-1', 'float-2', 'float-3'];

        return technologies.map((tech, index) => {
            let newPos;
            let isOverlapping;
            let attempts = 0;

            do {
                newPos = {
                    top: 10 + Math.random() * 70,
                    left: 10 + Math.random() * 70,
                };

                const newPosPx = {
                    x: (newPos.left / 100) * containerWidth,
                    y: (newPos.top / 100) * containerHeight,
                };

                isOverlapping = positions.some(pos => {
                    const posPx = {
                        x: (pos.left / 100) * containerWidth,
                        y: (pos.top / 100) * containerHeight,
                    };
                    const distance = Math.sqrt(Math.pow(posPx.x - newPosPx.x, 2) + Math.pow(posPx.y - newPosPx.y, 2));
                    return distance < iconSize;
                });

                attempts++;
            } while (isOverlapping && attempts < 100);

            positions.push(newPos);

            // Assign a random animation name from the list
            const animationName = animationNames[index % animationNames.length];

            return {
                ...tech,
                top: `${newPos.top}%`,
                left: `${newPos.left}%`,
                animation: `${animationName} ${18 + Math.random() * 12}s ease-in-out infinite alternate`
            };
        });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section id="accueil" className="home-section">
            <div className="home-grid">
                <motion.div
                    className="home-content-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 className="home-title" variants={itemVariants}>
                        Amin Belalia
                    </motion.h1>
                    <motion.h2 className="home-subtitle" variants={itemVariants}>
                        <span className="home-subtitle-static">Je suis</span>
                        <span className="home-subtitle-dynamic">{animatedTitle}</span>
                        <span className="home-cursor">|</span>
                    </motion.h2>
                    <motion.p className="home-description" variants={itemVariants}>
                        Étudiant en BUT Informatique, passionné par la conception d'applications modernes
                        et l'automatisation des infrastructures qui les soutiennent.
                    </motion.p>
                    <motion.div className="home-btn-group" variants={itemVariants}>
                        <Button href="#projets" primary>&gt; Mes Projets</Button>
                        <Button href={cvPdf} download secondary>&gt; Mon CV</Button>
                    </motion.div>
                </motion.div>

                <motion.div className="home-tech-cloud" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
                    {techCloudStyles.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            className="tech-icon-wrapper"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
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
            </div>
        </section>
    );
};

export default HomeSection;
