import React, { Component } from 'react';
// import ProductsCard from '../components/ProductsCard';

class ShoppingCart extends Component {
  state = {
    itemsLS: [],
  };

  componentDidMount() {
    this.getFromLS();
  }

  getFromLS = () => {
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items);
    console.log(itemsArray);
    this.setState({
      itemsLS: itemsArray,
    });
  };

  render() {
    const { itemsLS } = this.state;
    // const { id, price, title, thumbnail } = itemsLS;
    return (
      <div>
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}

export default ShoppingCart;
