import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../../styles/components/BootScreen.css'; // Assure-toi que le CSS est bien importé si nécessaire, ou garde les styles inline

const BOOT_TEXT = [
    "> INITIALIZING KERNEL...",
    "> LOADING MODULES: REACT, VITE, FRAMER_MOTION...",
    "> MOUNTING VIRTUAL DOM...",
    "> CHECKING NETWORK INTERFACES... [OK]",
    "> LOADING ASSETS... [OK]",
    "> CONFIGURING LOCALES (FR, EN, ES)... [OK]",
    "> STARTING PORTFOLIO_V1.0 SERVICE...",
    "> ACCESS GRANTED."
];

const BootScreen = ({ onComplete }) => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [progress, setProgress] = useState(0);
    
    const lineIndexRef = useRef(0);
    const lastTimeRef = useRef(Date.now());
    const progressRef = useRef(0);
    const animationFrameRef = useRef(null);

    const animate = useCallback(() => {
        const now = Date.now();
        const deltaTime = now - lastTimeRef.current;

        if (deltaTime > 300 && lineIndexRef.current < BOOT_TEXT.length) {
            setDisplayedLines(prev => [...prev, BOOT_TEXT[lineIndexRef.current]]);
            lineIndexRef.current++;
            lastTimeRef.current = now;
        }

        if (progressRef.current < 100) {
            progressRef.current += 0.8;
            setProgress(Math.min(100, progressRef.current));
        }

        if (lineIndexRef.current >= BOOT_TEXT.length && progressRef.current >= 100) {
            setTimeout(onComplete, 600);
            return;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [onComplete]);

    useEffect(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [animate]);

    return (
        <motion.div
            className="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            onClick={onComplete}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#0a0c10',
                color: '#66ff99',
                fontFamily: "'Fira Code', monospace",
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                overflow: 'hidden',
                cursor: 'pointer'
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%',
                pointerEvents: 'none',
                zIndex: 2
            }} />

            <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto 10vh auto', position: 'relative', zIndex: 3 }}>
                <div style={{ marginBottom: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    {displayedLines.map((line, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ 
                                marginBottom: '0.5rem', 
                                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                                color: index === displayedLines.length - 1 ? '#fff' : '#66ff99',
                                textShadow: '0 0 5px rgba(102, 255, 153, 0.5)'
                            }}
                        >
                            {line}
                        </motion.div>
                    ))}
                </div>

                <div style={{ width: '100%', height: '4px', background: '#333', marginTop: '1rem' }}>
                    <motion.div 
                        style={{ 
                            height: '100%', 
                            background: '#66ff99',
                            width: `${progress}%`,
                            boxShadow: '0 0 10px #66ff99'
                        }} 
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: '#888' }}>
                    <span>SYSTEM BOOT</span>
                    <span>{Math.floor(progress)}%</span>
                </div>
                
                <div style={{ 
                    position: 'absolute', 
                    bottom: '-30px', 
                    right: 0, 
                    fontSize: '0.7rem', 
                    color: '#444',
                    opacity: 0.7 
                }}>
                    [TAP TO SKIP]
                </div>
            </div>
        </motion.div>
    );
};

export default BootScreen;
