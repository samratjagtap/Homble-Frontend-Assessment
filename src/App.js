// src/App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './AppRouter';

const App = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};

export default App;
