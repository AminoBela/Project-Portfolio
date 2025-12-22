import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MatrixRain = ({ onClose }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const rainDrops = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Vert Matrix
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const interval = setInterval(draw, 30);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 99999,
                background: 'black',
                overflow: 'hidden'
            }}
        >
            <canvas ref={canvasRef} style={{ display: 'block' }} />
            
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: '#0F0',
                fontFamily: "'Fira Code', monospace",
                textShadow: '0 0 10px #0F0',
                background: 'rgba(0,0,0,0.8)',
                padding: '2rem',
                border: '1px solid #0F0',
                borderRadius: '10px'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>SYSTEM COMPROMISED</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>ROOT ACCESS GRANTED</p>
                <button 
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: '1px solid #0F0',
                        color: '#0F0',
                        padding: '10px 20px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontWeight: 'bold',
                        boxShadow: '0 0 5px #0F0'
                    }}
                >
                    EJECT
                </button>
            </div>
        </motion.div>
    );
};

export default MatrixRain;
