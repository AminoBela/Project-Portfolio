import { useEffect, useRef, useState } from 'react';

const POINTER_SELECTOR = 'a, button, [data-cursor="pointer"]';

const CustomCursor = ({ isMatrixMode }) => {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);
    const requestRef = useRef(null);
    const mousePositionRef = useRef({ x: -100, y: -100 });
    const isPointerRef = useRef(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouchDevice(true);
            return;
        }

        const setPointer = (next) => {
            if (isPointerRef.current === next) return;
            isPointerRef.current = next;
            cursorDotRef.current?.classList.toggle('is-pointer', next);
            cursorOutlineRef.current?.classList.toggle('is-pointer', next);
        };

        const handleMouseMove = (e) => {
            mousePositionRef.current = { x: e.clientX, y: e.clientY };
            const target = e.target;
            const isInteractive = target instanceof Element && target.closest(POINTER_SELECTOR) !== null;
            setPointer(isInteractive);
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
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
        return () => cancelAnimationFrame(requestRef.current);
    }, [isTouchDevice]);

    if (isTouchDevice) return null;

    const matrixClass = isMatrixMode ? ' is-matrix' : '';

    return (
        <>
            <div ref={cursorOutlineRef} className={`cursor-outline${matrixClass}`} />
            <div ref={cursorDotRef} className={`cursor-dot${matrixClass}`} />
        </>
    );
};

export default CustomCursor;
