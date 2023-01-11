import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Categories from './pages/Categories';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Categories } />
      </Switch>
    </div>
  );
}

export default App;
