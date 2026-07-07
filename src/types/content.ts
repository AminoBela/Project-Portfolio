import type { fr } from '../locales/fr';

export type TranslationKey = keyof typeof fr;

export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
}

export interface VutSkill {
  name: TranslationKey;
  icon: string;
  level: TranslationKey;
  comment: TranslationKey;
  github: string | null;
}

export interface TimelineDetails {
  intro: TranslationKey;
  tech: string[];
  highlights: TranslationKey[];
}

export interface TimelineEntry {
  id: string;
  type: 'education' | 'experience';
  status?: 'current' | 'future' | 'past';
  title: TranslationKey;
  location: TranslationKey;
  period: TranslationKey;
  description: TranslationKey;
  logo: string | null;
  details: TimelineDetails;
  color?: string;
  /** Renseigné pour les entrées de type education */
  institution?: TranslationKey;
  /** Renseigné pour les entrées de type experience */
  company?: TranslationKey;
}
