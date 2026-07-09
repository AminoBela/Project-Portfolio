/** Médias locaux des projets, associés par nom de repo GitHub. */
const mediaModules = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp,mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export interface ProjectMedia {
  url: string;
  type: 'video' | 'image';
  poster?: string;
}

function basename(path: string): string {
  return path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
}

export function getProjectMedia(repoName: string): ProjectMedia | null {
  const entries = Object.entries(mediaModules).filter(([path]) => basename(path) === repoName);
  if (entries.length === 0) return null;

  const video = entries.find(([path]) => /\.(mp4|webm)$/i.test(path));
  const image = entries.find(([path]) => !/\.(mp4|webm)$/i.test(path));

  if (video) {
    return { url: video[1], type: 'video', poster: image?.[1] };
  }
  return image ? { url: image[1], type: 'image' } : null;
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Vue: '#41b883',
  React: '#61dafb',
  Shell: '#89e051',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00ADD8',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  Dockerfile: '#0db7ed',
};

export function getLangColor(lang: string | null): string {
  return (lang && LANGUAGE_COLORS[lang]) || 'var(--accent)';
}

export function formatDate(iso: string, locale = 'fr-FR'): string {
  try {
    return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(
      new Date(iso)
    );
  } catch {
    return '';
  }
}
