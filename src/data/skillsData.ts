import type { Skill } from '../types/content';

export const skills = [
  // --- SYSTÈMES & RÉSEAUX ---
  {
    name: 'Linux Administration',
    level: 85,
    icon: 'https://cdn.simpleicons.org/linux',
    category: 'Systèmes & Réseaux',
  },
  {
    name: 'Réseaux & Protocoles',
    level: 80,
    icon: 'https://cdn.simpleicons.org/cisco',
    category: 'Systèmes & Réseaux',
  },
  {
    name: 'Scripting (Bash/Perl)',
    level: 80,
    icon: 'https://cdn.simpleicons.org/gnubash',
    category: 'Systèmes & Réseaux',
  },
  {
    name: 'Ruby',
    level: 65,
    icon: 'https://cdn.simpleicons.org/ruby',
    category: 'Systèmes & Réseaux',
  },
  {
    name: 'Sécurité (iptables)',
    level: 70,
    icon: 'https://cdn.simpleicons.org/kalilinux',
    category: 'Systèmes & Réseaux',
  },

  // --- VIRTUALISATION & SERVICES ---
  {
    name: 'Docker',
    level: 85,
    icon: 'https://cdn.simpleicons.org/docker',
    category: 'Virtualisation & Services',
  },
  {
    name: 'Kubernetes',
    level: 70,
    icon: 'https://cdn.simpleicons.org/kubernetes',
    category: 'Virtualisation & Services',
  },
  {
    name: 'Serveurs Web',
    level: 75,
    icon: 'https://cdn.simpleicons.org/apache',
    category: 'Virtualisation & Services',
  },
  {
    name: 'Services (LDAP/NFS)',
    level: 70,
    icon: 'https://cdn.simpleicons.org/gnu',
    category: 'Virtualisation & Services',
  },
  {
    name: 'CI/CD & Git',
    level: 80,
    icon: 'https://cdn.simpleicons.org/git',
    category: 'Virtualisation & Services',
  },

  // --- DÉVELOPPEMENT & WEB ---
  {
    name: 'Java (POO)',
    level: 75,
    icon: 'https://cdn.simpleicons.org/coffeescript',
    category: 'Dév & Web',
  },
  {
    name: 'PHP',
    level: 70,
    icon: 'https://cdn.simpleicons.org/php',
    category: 'Dév & Web',
  },
  {
    name: 'HTML / CSS',
    level: 85,
    icon: 'https://cdn.simpleicons.org/html5',
    category: 'Dév & Web',
  },
  {
    name: 'JavaScript / React',
    level: 60,
    icon: 'https://cdn.simpleicons.org/react',
    category: 'Dév & Web',
  },
  {
    name: 'SQL (Oracle/MySQL)',
    level: 80,
    icon: 'https://cdn.simpleicons.org/mysql',
    category: 'Dév & Web',
  },
  {
    name: 'C (Système)',
    level: 65,
    icon: 'https://cdn.simpleicons.org/c',
    category: 'Dév & Web',
  },

  // --- MÉTHODES ---
  {
    name: 'Gestion de projet (Agile)',
    level: 75,
    icon: 'https://cdn.simpleicons.org/jira',
    category: 'Méthodes',
  },
  {
    name: 'ISO 27001',
    level: 65,
    icon: 'https://cdn.simpleicons.org/iso',
    category: 'Méthodes',
  },
  {
    name: 'PCA / PRA',
    level: 65,
    icon: 'https://cdn.simpleicons.org/databricks',
    category: 'Méthodes',
  },
  {
    name: 'Terraform (IaC)',
    level: 70,
    icon: 'https://cdn.simpleicons.org/terraform',
    category: 'Méthodes',
  }
] satisfies Skill[];
