import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { applyThemeToDocument } from './theme';

applyThemeToDocument();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
