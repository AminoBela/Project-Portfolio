import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { decodeBase64 } from '../utils/stringUtils';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const axiosInstance = axios.create({
  headers: {
    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
  },
});

// Cache en mémoire pour éviter les refetch inutiles
const cache = new Map();

export function useGithubRepos(username) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!username) {
      console.warn('Nom d\'utilisateur GitHub non fourni.');
      setLoading(false);
      return;
    }

    // Vérifie le cache
    if (cache.has(username)) {
      setProjects(cache.get(username));
      setLoading(false);
      return;
    }

    // Abort controller pour annuler les requêtes si le composant est démonté
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const reposResponse = await axiosInstance.get(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
          { signal }
        );
        const repos = reposResponse.data;

        // Batch les requêtes par lots de 5 pour limiter la pression sur l'API
        const BATCH_SIZE = 5;
        const projectsWithDetails = [];

        for (let i = 0; i < repos.length; i += BATCH_SIZE) {
          const batch = repos.slice(i, i + BATCH_SIZE);
          const batchResults = await Promise.allSettled(
            batch.map(async (repo) => {
              let readmeContent = '';
              let languages = {};

              // Fetch README et langages en parallèle pour chaque repo
              const [readmeResult, langResult] = await Promise.allSettled([
                axiosInstance.get(
                  `https://api.github.com/repos/${username}/${repo.name}/readme`,
                  { signal }
                ),
                axiosInstance.get(repo.languages_url, { signal }),
              ]);

              if (readmeResult.status === 'fulfilled') {
                readmeContent = decodeBase64(readmeResult.value.data.content);
              }
              if (langResult.status === 'fulfilled') {
                languages = langResult.value.data;
              }

              return { ...repo, readmeContent, languages };
            })
          );

          batchResults.forEach((result) => {
            if (result.status === 'fulfilled') {
              projectsWithDetails.push(result.value);
            }
          });
        }

        // Met en cache
        cache.set(username, projectsWithDetails);
        setProjects(projectsWithDetails);
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return;
        console.error('Erreur lors de la récupération des repos GitHub:', err.response ? err.response.data : err.message);
        if (err.response && err.response.status === 403) {
          setError('Quota API GitHub atteint. Veuillez réessayer plus tard ou utilisez un token personnel.');
        } else {
          setError('Impossible de charger les projets GitHub. Vérifiez votre connexion ou réessayez plus tard.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [username]);

  return { projects, loading, error };
}
