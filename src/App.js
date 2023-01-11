import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Categories from './pages/Categories';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Categories } />
        <Route exact path="/carrinho" component={ ShoppingCart } />
      </Switch>
    </div>
  );
}

export default App;
