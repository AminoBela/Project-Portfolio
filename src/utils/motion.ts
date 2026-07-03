import type { Variants } from 'motion/react';

/* Variants performance-first — transform/opacity uniquement (GPU-composited). */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.35, ease: EASE_OUT },
  }),
  exit: (i: number = 0) => ({
    opacity: 0,
    y: -16,
    transition: { delay: i * 0.03, duration: 0.2, ease: 'easeIn' },
  }),
};

export const staggeredCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
  exit: (i: number = 0) => ({
    opacity: 0,
    y: -20,
    transition: { delay: i * 0.03, duration: 0.2, ease: 'easeIn' },
  }),
};
