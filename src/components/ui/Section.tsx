import type { ReactNode } from 'react';
import Reveal from './Reveal';
import './Section.css';

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`site-section ${className}`.trim()}>
      <div className="site-container">
        {title && (
          <Reveal>
            <h2 className="site-section__title">{title}</h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
