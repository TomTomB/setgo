import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FOO } from '@setgo/core';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log(FOO);
