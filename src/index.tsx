import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthorizationContext';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
);

reportWebVitals();
