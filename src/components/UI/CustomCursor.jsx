import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        let lastX = 0, lastY = 0;
        const moveCursor = (e) => {
            lastX = e.clientX - 12;
            lastY = e.clientY - 12;
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
            }
        };
        const isTouchDevice = () =>
            window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
        if (!isTouchDevice()) {
            window.addEventListener('mousemove', moveCursor, { passive: true });
            return () => window.removeEventListener('mousemove', moveCursor);
        }
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                width: "24px",
                height: "24px",
                background: "radial-gradient(circle, #F26419 0%, #2E86AB 90%)",
                boxShadow: "0 0 10px #F26419aa, 0 0 16px #2E86AB55",
                borderRadius: "50%",
                pointerEvents: "none",
                mixBlendMode: "difference",
                zIndex: "9999",
                transition: "transform 0.07s cubic-bezier(.77,0,.18,1)"
            }}
        />
    );
}