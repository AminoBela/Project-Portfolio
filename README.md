# Project-Portfolio

Bienvenue sur le dépôt de mon portfolio personnel, une application web moderne et interactive conçue pour présenter mes compétences, mes expériences et mes projets. Ce portfolio est construit avec les dernières technologies React et offre une expérience utilisateur fluide et multilingue.

## Aperçu du Projet

Ce portfolio est une Single Page Application (SPA) qui intègre des animations dynamiques, une gestion de thème (clair/sombre), et une prise en charge complète de l'internationalisation. Il est conçu pour être performant et réactif sur tous les appareils.

## Fonctionnalités Clés

*   **Interface Utilisateur Interactive** : Animations fluides avec Framer Motion, curseur personnalisé.
*   **Multilingue (i18n)** : Support pour le Français (FR), l'Anglais (EN) et l'Espagnol (ES) avec des transitions de langue stylisées.
*   **Thème Clair/Sombre** : Bascule facile entre les modes clair et sombre.
*   **Sections Dynamiques** :
    *   **Accueil** : Présentation rapide avec effet de texte animé et nuage de technologies flottantes.
    *   **À Propos** : Biographie détaillée, recherche de stage, compétences clés et langues.
    *   **Parcours** : Chronologie interactive des expériences professionnelles et formations.
    *   **Compétences** : Grilles de compétences techniques (BUT, Technologies) avec niveaux de maîtrise.
    *   **Projets** : Intégration dynamique des projets GitHub avec filtres et détails via modales.
    *   **Contact** : Informations de contact avec options de copie rapide et liens sociaux.
*   **Expérience de Démarrage Immersive** : Séquence de boot de type terminal au chargement initial (pour les écrans larges).
*   **Optimisation Mobile** : Design entièrement réactif et adaptatif.
*   **SEO & Accessibilité** : Mise à jour dynamique du titre de la page et de l'attribut `lang` du document HTML.

## Technologies Utilisées

*   **Frontend** :
    *   [**React**](https://react.dev/) : Bibliothèque JavaScript pour la construction d'interfaces utilisateur.
    *   [**Vite**](https://vitejs.dev/) : Outil de build rapide pour les projets web modernes.
    *   [**Framer Motion**](https://www.framer.com/motion/) : Bibliothèque d'animation pour React.
    *   [**i18next**](https://www.i18next.com/) & [**react-i18next**](https://react.i18next.com/) : Framework d'internationalisation pour les applications React.
    *   [**Axios**](https://axios-http.com/) : Client HTTP pour les requêtes API (utilisé pour les projets GitHub).
    *   [**React Markdown**](https://github.com/remarkjs/react-markdown) : Composant React pour rendre du Markdown.
    *   **CSS Modules / Vanilla CSS** : Pour le stylisme des composants.
*   **Développement** :
    *   [**ESLint**](https://eslint.org/) : Outil d'analyse statique de code pour identifier les problèmes.
    *   [**Git**](https://git-scm.com/) / [**GitHub**](https://github.com/) : Système de contrôle de version et plateforme d'hébergement de code.

## Installation

Pour lancer le projet en local, suivez ces étapes :

1.  **Clonez le dépôt** :
    ```bash
    git clone https://github.com/AminoBela/Project-Portfolio.git
    cd Project-Portfolio
    ```

2.  **Installez les dépendances** :
    ```bash
    npm install
    # ou
    yarn install
    ```

## Lancement du Projet

*   **Mode Développement** :
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    Ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`).

*   **Build pour la Production** :
    ```bash
    npm run build
    # ou
    yarn build
    ```
    Ceci va créer une version optimisée de votre application dans le dossier `dist/`.

*   **Prévisualisation de la Production** :
    ```bash
    npm run preview
    # ou
    yarn preview
    ```
    Permet de tester le build de production en local.

## Contact

N'hésitez pas à me contacter pour toute question ou opportunité :

*   **LinkedIn** : [Amin Belalia](https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/)
*   **GitHub** : [AminoBela](https://github.com/AminoBela)
*   **Email** : abelaliabendjafar@gmail.com

---

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
