import { useEffect, useRef } from 'react';
import './Scrollbar.css';

/**
 * Scrollbar custom en overlay : la barre native est masquée globalement.
 * Suit la position de scroll, se masque après inactivité, cliquable et draggable.
 */
export default function Scrollbar() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    let raf = 0;
    let hideTimer = 0;
    let dragging = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const trackH = track.clientHeight;
      const thumbH = Math.max(40, (window.innerHeight / doc.scrollHeight) * trackH);
      const y = max > 0 ? (window.scrollY / max) * (trackH - thumbH) : 0;
      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${y}px)`;
      track.classList.toggle('is-idle', max <= 0);
    };

    const show = () => {
      track.classList.add('is-visible');
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        if (!dragging) track.classList.remove('is-visible');
      }, 1100);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        show();
        raf = 0;
      });
    };

    const scrollFromPointer = (clientY: number) => {
      const rect = track.getBoundingClientRect();
      const thumbH = thumb.clientHeight;
      const ratio = (clientY - rect.top - thumbH / 2) / (rect.height - thumbH);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: Math.min(Math.max(ratio, 0), 1) * max, behavior: 'instant' });
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      track.classList.add('is-dragging', 'is-visible');
      track.setPointerCapture(e.pointerId);
      scrollFromPointer(e.clientY);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (dragging) scrollFromPointer(e.clientY);
    };
    const endDrag = () => {
      dragging = false;
      track.classList.remove('is-dragging');
      show();
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointermove', onPointerMove);
      track.removeEventListener('pointerup', endDrag);
      track.removeEventListener('pointercancel', endDrag);
      window.clearTimeout(hideTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="site-scrollbar" ref={trackRef} aria-hidden="true">
      <div className="site-scrollbar__thumb" ref={thumbRef} />
    </div>
  );
}
