import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
            }
        };
        // Désactive sur mobile/tactile
        if (window.innerWidth > 800) {
            window.addEventListener('mousemove', moveCursor);
            return () => window.removeEventListener('mousemove', moveCursor);
        }
    }, []);

    return <div ref={cursorRef} className="custom-cursor" />;
}