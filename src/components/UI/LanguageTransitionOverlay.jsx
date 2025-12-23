import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LanguageTransitionOverlay = () => {
    const [text, setText] = useState('INITIALIZING...');
    
    useEffect(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
        let interval;
        let counter = 0;
        
        interval = setInterval(() => {
            setText(prev => prev.split('').map((char, index) => {
                if (index < counter) return 'SYSTEM_UPDATE_LANG...'.charAt(index);
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(''));
            
            counter += 1/2;
            if (counter > 20) clearInterval(interval);
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(16, 20, 26, 0.98)',
                backdropFilter: 'blur(20px)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#66ff99',
                fontFamily: "'Fira Code', monospace",
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ textAlign: 'center' }}
            >
                <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1rem',
                    textShadow: '0 0 10px rgba(102, 255, 153, 0.5)'
                }}>
                    {text}
                </div>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            style={{
                                width: '40px',
                                height: '6px',
                                background: '#333',
                                overflow: 'hidden'
                            }}
                        >
                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: '#66ff99',
                                    boxShadow: '0 0 8px #66ff99'
                                }}
                                initial={{ x: '-100%' }}
                                animate={{ x: '0%' }}
                                transition={{ 
                                    duration: 0.4, 
                                    delay: i * 0.1,
                                    ease: "circOut" 
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LanguageTransitionOverlay;
