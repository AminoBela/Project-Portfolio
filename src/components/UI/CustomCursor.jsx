import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = ({ isMatrixMode }) => {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);
    const requestRef = useRef(null);
    
    const mousePositionRef = useRef({ x: -100, y: -100 });
    
    const [isPointer, setIsPointer] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsTouchDevice(true);
            return;
        }

        const handleMouseMove = (e) => {
            mousePositionRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, [data-cursor="pointer"]')) {
                setIsPointer(true);
            }
        };

        const handleMouseOut = (e) => {
            if (e.target.closest('a, button, [data-cursor="pointer"]')) {
                setIsPointer(false);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        let lastX = -100;
        let lastY = -100;

        const animate = () => {
            const { x, y } = mousePositionRef.current;

            lastX += (x - lastX) * 0.1;
            lastY += (y - lastY) * 0.1;

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }
            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [isTouchDevice]);

    if (isTouchDevice) {
        return null;
    }

    return (
        <>
            <div
                ref={cursorOutlineRef}
                className={`cursor-outline ${isPointer ? 'is-pointer' : ''} ${isMatrixMode ? 'is-matrix' : ''}`}
            />
            <div
                ref={cursorDotRef}
                className={`cursor-dot ${isPointer ? 'is-pointer' : ''} ${isMatrixMode ? 'is-matrix' : ''}`}
            />
        </>
    );
};

export default CustomCursor;
