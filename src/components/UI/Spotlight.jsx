import { useEffect, useRef } from 'react';

function Spotlight() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouch = window.matchMedia('(hover: none)').matches;
        if (prefersReducedMotion || isTouch) return;

        let rafId = null;
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let currentX = targetX;
        let currentY = targetY;

        const handleMove = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const tick = () => {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;
            el.style.setProperty('--spot-x', `${currentX}px`);
            el.style.setProperty('--spot-y', `${currentY}px`);
            rafId = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        rafId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return <div ref={ref} className="spotlight" aria-hidden="true" />;
}

export default Spotlight;
