import { useEffect, useRef } from 'react';

export function useMagnetic(strength = 0.25) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || strength === 0) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouch = window.matchMedia('(hover: none)').matches;
        if (prefersReducedMotion || isTouch) return;

        let rafId = null;
        let pendingX = 0;
        let pendingY = 0;

        const apply = () => {
            el.style.setProperty('--magnet-x', `${pendingX}px`);
            el.style.setProperty('--magnet-y', `${pendingY}px`);
            rafId = null;
        };

        const handleMove = (e) => {
            const rect = el.getBoundingClientRect();
            pendingX = (e.clientX - rect.left - rect.width / 2) * strength;
            pendingY = (e.clientY - rect.top - rect.height / 2) * strength;
            if (rafId === null) rafId = requestAnimationFrame(apply);
        };

        const handleLeave = () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            el.style.setProperty('--magnet-x', '0px');
            el.style.setProperty('--magnet-y', '0px');
            el.removeEventListener('mousemove', handleMove);
        };

        const handleEnter = () => {
            el.addEventListener('mousemove', handleMove, { passive: true });
        };

        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);

        return () => {
            el.removeEventListener('mouseenter', handleEnter);
            el.removeEventListener('mouseleave', handleLeave);
            el.removeEventListener('mousemove', handleMove);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, [strength]);

    return ref;
}
