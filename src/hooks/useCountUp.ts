import { useState, useEffect, useRef, useCallback } from 'react';

interface CountUpOptions {
  duration?: number;
  startValue?: number;
  delay?: number;
  startOnMount?: boolean;
}

export function useCountUp(endValue: number, options: CountUpOptions = {}) {
  const { duration = 2000, startValue = 0, delay = 0, startOnMount = false } = options;

  const [count, setCount] = useState(startOnMount ? startValue : endValue);
  const [hasStarted, setHasStarted] = useState(false);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const startCounting = useCallback(() => {
    setHasStarted((alreadyStarted) => {
      if (alreadyStarted) return true;

      timeoutRef.current = window.setTimeout(() => {
        let startTime: number | null = null;

        const animate = (currentTime: number) => {
          startTime ??= currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          setCount(Math.round(startValue + (endValue - startValue) * easeOutQuart));
          if (progress < 1) {
            frameRef.current = requestAnimationFrame(animate);
          }
        };

        frameRef.current = requestAnimationFrame(animate);
      }, delay);

      return true;
    });
  }, [duration, startValue, endValue, delay]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { count, startCounting, hasStarted };
}

/** Variante déclenchée quand l'élément référencé entre dans le viewport. */
export function useInViewCountUp<T extends HTMLElement = HTMLElement>(
  endValue: number,
  options: CountUpOptions = {}
) {
  const ref = useRef<T | null>(null);
  const { count, startCounting } = useCountUp(endValue, { ...options, startOnMount: true });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) startCounting();
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [startCounting]);

  return { ref, count };
}
