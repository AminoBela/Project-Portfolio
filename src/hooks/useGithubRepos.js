// src/hooks/useGithubRepos.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeBase64 } from '../utils/stringUtils';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const axiosInstance = axios.create({
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export function useGithubRepos(username) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const reposResponse = await axiosInstance.get(`https://api.github.com/users/${username}/repos`);
        const repos = reposResponse.data;

        const projectsWithDetails = await Promise.all(
          repos.map(async (repo) => {
            let readmeContent = '';
            try {
              const readmeResponse = await axiosInstance.get(`https://api.github.com/repos/${username}/${repo.name}/readme`);
              readmeContent = decodeBase64(readmeResponse.data.content);
            } catch (e) {
              console.warn(`Could not fetch README for ${repo.name}`);
            }

            let languages = {};
            try {
              const languagesResponse = await axiosInstance.get(repo.languages_url);
              languages = languagesResponse.data;
            } catch (e) {
              console.warn(`Could not fetch languages for ${repo.name}`);
            }

            return {
              ...repo,
              readmeContent,
              languages,
            };
          })
        );

        setProjects(projectsWithDetails);
      } catch (err) {
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

    if (username) {
      fetchRepos();
    } else {
      console.warn('Nom d\'utilisateur GitHub non fourni.');
      setLoading(false);
    }
  }, [username]);

  return { projects, loading, error };
}
