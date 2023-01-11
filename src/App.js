import React from 'react';
import './App.css';
import { getCategories } from './services/api';

function App() {
  return (
    <div>
      <h1>
        TESTE
      </h1>
      { console.log(getCategories()) }
    </div>
  );
}

export default App;
