import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonamiCode = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (event) => {
      const { key } = event;
      
      // Si la touche correspond à la prochaine touche attendue dans la séquence
      if (key === KONAMI_CODE[index]) {
        const nextIndex = index + 1;
        
        // Si on a complété la séquence
        if (nextIndex === KONAMI_CODE.length) {
          setIsTriggered(true);
          setIndex(0); // Reset pour pouvoir le refaire
        } else {
          setIndex(nextIndex);
        }
      } else {
        // Si on se trompe, on repart à zéro
        setIndex(0);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index]);

  return { isTriggered, setIsTriggered };
};
