import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import '@fontsource-variable/inter/index.css';
import '@fontsource-variable/space-grotesk/index.css';
import './index.css';
import './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Élément #root introuvable');

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
