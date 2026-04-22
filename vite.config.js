import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({ algorithm: 'brotliCompress' })
  ],
  // Supprime les console.log et debugger en production
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    // Utilise le target modern pour du code plus petit
    target: 'es2020',
    // Active le CSS code splitting
    cssCodeSplit: true,
    // esbuild minification (inclus dans Vite, plus rapide que terser)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    // Active le report de taille compressée
    reportCompressedSize: true,
  },
  // Optimise les dépendances au pré-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-i18next'],
  },
})
