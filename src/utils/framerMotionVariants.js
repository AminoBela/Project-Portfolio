/* Performance-first variants — transform/opacity only (GPU-composited). */

const EASE_OUT = [0.25, 0.46, 0.45, 0.94];

export const childVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE_OUT },
    },
};

export const sectionVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

export const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.35, ease: EASE_OUT },
    }),
    exit: (i = 0) => ({
        opacity: 0,
        y: -16,
        transition: { delay: i * 0.03, duration: 0.2, ease: 'easeIn' },
    }),
};

export const staggeredCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
    }),
    exit: (i = 0) => ({
        opacity: 0,
        y: -20,
        transition: { delay: i * 0.03, duration: 0.2, ease: 'easeIn' },
    }),
};
