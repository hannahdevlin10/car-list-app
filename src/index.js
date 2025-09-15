import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CarListProvider } from './context/CarListContext';

ReactDOM.render(
  <React.StrictMode>
    <CarListProvider>
      <App />
    </CarListProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();