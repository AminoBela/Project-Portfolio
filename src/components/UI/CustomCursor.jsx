import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursorEl = cursorRef.current;
        const isTouchDevice = () =>
            window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

        if (!cursorEl || isTouchDevice()) {
            return;
        }

        let lastX = 0;
        let lastY = 0;
        let isHovering = false;

        const updateTransform = () => {
            const offset = isHovering ? 18 : 12;
            const scale = isHovering ? 1.75 : 1;
            cursorEl.style.transform = `translate3d(${lastX - offset}px, ${lastY - offset}px, 0) scale(${scale})`;
        };

        const moveCursor = (event) => {
            lastX = event.clientX;
            lastY = event.clientY;
            updateTransform();
        };

        const handleEnter = () => {
            isHovering = true;
            updateTransform();
        };

        const handleLeave = () => {
            isHovering = false;
            updateTransform();
        };

        const interactiveSelectors = 'a, button, .button, [data-cursor="pointer"]';
        const interactiveElements = document.querySelectorAll(interactiveSelectors);

        interactiveElements.forEach((element) => {
            element.addEventListener('mouseenter', handleEnter);
            element.addEventListener('mouseleave', handleLeave);
        });

        window.addEventListener('mousemove', moveCursor, { passive: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach((element) => {
                element.removeEventListener('mouseenter', handleEnter);
                element.removeEventListener('mouseleave', handleLeave);
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                width: '24px',
                height: '24px',
                background: 'radial-gradient(circle, rgba(102,255,153,0.9) 0%, rgba(46,134,171,0.3) 90%)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 0 16px rgba(102,255,153,0.45), 0 0 22px rgba(46,134,171,0.35)',
                borderRadius: '50%',
                pointerEvents: 'none',
                mixBlendMode: 'difference',
                zIndex: '9999',
                transition: 'transform 0.018s linear',
                willChange: 'transform',
            }}
        />
    );
}

