import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX - 14}px, ${e.clientY - 14}px,0)`;
            }
        };
        const isTouchDevice = () =>
            window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
        if (!isTouchDevice()) {
            window.addEventListener('mousemove', moveCursor);
            return () => window.removeEventListener('mousemove', moveCursor);
        }
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                width: "28px",
                height: "28px",
                background: "radial-gradient(circle, #F26419 0%, #2E86AB 90%)",
                boxShadow: "0 0 12px #F26419aa, 0 0 24px #2E86AB55",
                borderRadius: "50%",
                pointerEvents: "none",
                mixBlendMode: "difference",
                zIndex: "9999",
                transition: "transform 0.12s cubic-bezier(.77,0,.18,1)"
            }}
        />
    );
}