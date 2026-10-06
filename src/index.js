import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// App es el componente raíz: inicia el árbol y desde allí los datos descienden
// por props, mientras las acciones de los hijos ascienden mediante callbacks.
root.render(<App />);
