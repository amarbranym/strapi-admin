import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Providers } from './components/providers/Provider';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Providers>
    <App />
  </Providers>
);


reportWebVitals();
