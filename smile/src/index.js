import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';
import Auth from './Auth';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Auth>
      <Navigation />
    </Auth>
  </React.StrictMode>,
  document.getElementById('root')
);