import { useEffect } from 'react';
import { transform } from 'motion/react';
import type { Theme } from './useTheme';

const SECTION_IDS = ['accueil', 'about', 'parcours', 'competences', 'projets', 'contact'];

const DARK_COLORS = ['#0b0b0d', '#12101d', '#0c1219', '#150f1e', '#101014', '#131230'];
const LIGHT_COLORS = ['#fafafa', '#ecebfb', '#e8f1f6', '#f0e9fb', '#f1f1f3', '#e4e5fa'];

/**
 * Fait glisser la couleur de fond en continu avec le scroll :
 * interpolation entre la teinte de chaque section, proportionnelle à la position.
 */
export function useBackgroundShift(theme: Theme) {
  useEffect(() => {
    const colors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
    let mapper: ((y: number) => string) | null = null;

    const measure = () => {
      const positions: number[] = [];
      const stops: string[] = [];
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) {
          positions.push(el.offsetTop);
          stops.push(colors[i] ?? colors[colors.length - 1] ?? '#000');
        }
      });
      mapper = positions.length >= 2 ? transform(positions, stops) : null;
    };

    let raf = 0;
    const paint = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (mapper) {
          document.body.style.backgroundColor = mapper(window.scrollY + window.innerHeight * 0.4);
        }
        raf = 0;
      });
    };

    measure();
    paint();

    // Les sections lazy modifient la hauteur de page : on re-mesure
    const resizeObserver = new ResizeObserver(() => {
      measure();
      paint();
    });
    resizeObserver.observe(document.body);
    window.addEventListener('scroll', paint, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', paint);
      if (raf) cancelAnimationFrame(raf);
      document.body.style.backgroundColor = '';
    };
  }, [theme]);
}
