import { useState, useEffect, useRef } from 'react';

export function useCountUp(endValue, options = {}) {
    const {
        duration = 2000,
        startValue = 0,
        delay = 0,
        startOnMount = false
    } = options;

    const [count, setCount] = useState(startOnMount ? startValue : endValue);
    const [hasStarted, setHasStarted] = useState(false);
    const frameRef = useRef(null);
    const startTimeRef = useRef(null);

    const startCounting = () => {
        if (hasStarted) return;
        setHasStarted(true);

        setTimeout(() => {
            startTimeRef.current = null;

            const animate = (currentTime) => {
                if (!startTimeRef.current) {
                    startTimeRef.current = currentTime;
                }

                const elapsed = currentTime - startTimeRef.current;
                const progress = Math.min(elapsed / duration, 1);

                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuart);

                setCount(currentValue);

                if (progress < 1) {
                    frameRef.current = requestAnimationFrame(animate);
                }
            };

            frameRef.current = requestAnimationFrame(animate);
        }, delay);
    };

    useEffect(() => {
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    return { count, startCounting, hasStarted };
}

export function useInViewCountUp(endValue, options = {}) {
    const ref = useRef(null);
    const { count, startCounting, hasStarted } = useCountUp(endValue, { ...options, startOnMount: true });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    startCounting();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [hasStarted, startCounting]);

    return { ref, count };
}
