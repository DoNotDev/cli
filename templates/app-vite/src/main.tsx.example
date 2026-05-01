import './globals.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// ✅ SHELL LOADER: BaseStoresInitializer handles removal when stores are ready
// (removed early removal - BaseStoresInitializer has the knowledge of when stores are ready)

// Ensure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error(
    'Root element not found. Did you remove the root div from index.html?'
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
