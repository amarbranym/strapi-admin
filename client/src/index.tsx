import React from 'react';
import ReactDOM from 'react-dom/client';
import './strapi/styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <App />
);


reportWebVitals();
