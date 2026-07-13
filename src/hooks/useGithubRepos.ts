import { useState, useEffect } from 'react';
import { decodeBase64 } from '../utils/string';
import type { GithubRepo, GithubReadme, ProjectWithDetails } from '../types/github';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const CACHE_KEY = 'github_repos_cache';
const CACHE_TTL = 24 * 60 * 60 * 1000;
// Au-delà, le cache est servi mais rafraîchi silencieusement en arrière-plan
const REFRESH_AFTER = 60 * 60 * 1000;
const BATCH_SIZE = 5;

const headers: HeadersInit = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

// Cache en mémoire pour éviter les refetch inutiles entre montages
const memoryCache = new Map<string, ProjectWithDetails[]>();

class HttpError extends Error {
  constructor(public status: number) {
    super(`HTTP ${status}`);
  }
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { headers, signal });
  if (!response.ok) throw new HttpError(response.status);
  return response.json() as Promise<T>;
}

function readLocalCache(username: string, ignoreTtl = false): ProjectWithDetails[] | null {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY}_${username}`);
    const time = localStorage.getItem(`${CACHE_KEY}_${username}_time`);
    if (!raw) return null;
    if (!ignoreTtl && (!time || Date.now() - parseInt(time, 10) >= CACHE_TTL)) return null;
    return JSON.parse(raw) as ProjectWithDetails[];
  } catch (e) {
    console.warn('Erreur de lecture du cache localStorage', e);
    return null;
  }
}

function writeLocalCache(username: string, projects: ProjectWithDetails[]): void {
  try {
    localStorage.setItem(`${CACHE_KEY}_${username}`, JSON.stringify(projects));
    localStorage.setItem(`${CACHE_KEY}_${username}_time`, Date.now().toString());
  } catch (e) {
    console.warn("Erreur d'écriture dans le cache localStorage", e);
  }
}

interface UseGithubReposResult {
  projects: ProjectWithDetails[];
  loading: boolean;
  error: string | null;
}

function getCacheAge(username: string): number | null {
  try {
    const time = localStorage.getItem(`${CACHE_KEY}_${username}_time`);
    return time ? Date.now() - parseInt(time, 10) : null;
  } catch {
    return null;
  }
}

function getCached(username: string): ProjectWithDetails[] | null {
  if (!username) return null;
  const inMemory = memoryCache.get(username);
  if (inMemory) return inMemory;
  const local = readLocalCache(username);
  if (local) memoryCache.set(username, local);
  return local;
}

export function useGithubRepos(username: string): UseGithubReposResult {
  const [projects, setProjects] = useState<ProjectWithDetails[]>(() => getCached(username) ?? []);
  const [loading, setLoading] = useState(() => Boolean(username) && getCached(username) === null);
  const [error, setError] = useState<string | null>(null);

  // Resynchronise l'état si le username change en cours de vie (pattern React
  // "adjust state during render", évite un setState synchrone dans l'effet).
  const [prevUsername, setPrevUsername] = useState(username);
  if (username !== prevUsername) {
    setPrevUsername(username);
    const cached = getCached(username);
    setProjects(cached ?? []);
    setLoading(Boolean(username) && cached === null);
    setError(null);
  }

  useEffect(() => {
    if (!username) return;
    const hasCache = memoryCache.has(username);
    const age = getCacheAge(username);
    // Cache frais : rien à faire. Cache vieilli : refresh silencieux (stale-while-revalidate).
    if (hasCache && age !== null && age < REFRESH_AFTER) return;
    const silent = hasCache;

    const controller = new AbortController();
    const { signal } = controller;

    const fetchRepos = async () => {
      try {
        const repos = await fetchJson<GithubRepo[]>(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
          signal
        );

        // Batch les requêtes par lots pour limiter la pression sur l'API
        const projectsWithDetails: ProjectWithDetails[] = [];
        for (let i = 0; i < repos.length; i += BATCH_SIZE) {
          const batch = repos.slice(i, i + BATCH_SIZE);
          const batchResults = await Promise.allSettled(
            batch.map(async (repo): Promise<ProjectWithDetails> => {
              const [readmeResult, langResult] = await Promise.allSettled([
                fetchJson<GithubReadme>(
                  `https://api.github.com/repos/${username}/${repo.name}/readme`,
                  signal
                ),
                fetchJson<Record<string, number>>(repo.languages_url, signal),
              ]);

              return {
                ...repo,
                readmeContent:
                  readmeResult.status === 'fulfilled'
                    ? decodeBase64(readmeResult.value.content)
                    : '',
                languages: langResult.status === 'fulfilled' ? langResult.value : {},
              };
            })
          );

          for (const result of batchResults) {
            if (result.status === 'fulfilled') projectsWithDetails.push(result.value);
          }
        }

        memoryCache.set(username, projectsWithDetails);
        writeLocalCache(username, projectsWithDetails);
        setProjects(projectsWithDetails);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if (silent) {
          // Refresh d'arrière-plan raté : on garde le cache affiché
          console.warn('Rafraîchissement GitHub silencieux échoué:', err);
          return;
        }
        console.error('Erreur lors de la récupération des repos GitHub:', err);

        // Quota atteint : retombe sur un cache expiré s'il existe
        if (err instanceof HttpError && err.status === 403) {
          const staleCache = readLocalCache(username, true);
          if (staleCache) {
            setProjects(staleCache);
            return;
          }
          setError(
            'Quota API GitHub atteint. Veuillez réessayer plus tard ou utilisez un token personnel.'
          );
        } else {
          setError(
            'Impossible de charger les projets GitHub. Vérifiez votre connexion ou réessayez plus tard.'
          );
        }
      } finally {
        if (!silent) setLoading(false);
      }
    };

    void fetchRepos();

    return () => controller.abort();
  }, [username]);

  return { projects, loading, error };
}
