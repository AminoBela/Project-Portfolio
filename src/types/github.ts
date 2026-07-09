/** Sous-ensemble des champs de l'API GitHub réellement utilisés par le site. */
export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  size: number;
  fork: boolean;
  topics?: string[];
}

export interface GithubReadme {
  content: string;
}

export type ProjectWithDetails = GithubRepo & {
  readmeContent: string;
  languages: Record<string, number>;
};
