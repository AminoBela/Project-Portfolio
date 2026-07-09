/** Courbe d'ease commune à toutes les animations du site. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Timing partagé du morph carte↔modale des projets (layoutId). */
export const MORPH_TRANSITION = { duration: 0.45, ease: EASE_OUT } as const;
