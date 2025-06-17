// src/hooks/useGithubRepos.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useGithubRepos(username) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true); // Assure-toi que loading est toujours à true au début
      setError(null); // Réinitialise l'erreur
      console.log(`Tentative de récupération des repos pour l'utilisateur : AminoBela`);

      try {
        const response = await axios.get(`https://api.github.com/users/AminoBela/repos`);
        console.log('Projets GitHub récupérés :', response.data);
        setProjects(response.data);
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

    if (username) { // S'assure que le username est défini avant de faire la requête
        fetchRepos();
    } else {
        console.warn('Nom d\'utilisateur GitHub non fourni.');
        setLoading(false);
    }
  }, [username]); // Le tableau de dépendances est correct

  return { projects, loading, error };
}
