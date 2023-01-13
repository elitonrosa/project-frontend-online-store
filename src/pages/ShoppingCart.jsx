import React, { Component } from 'react';
import ProductsCard from '../components/ProductsCard';

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
    this.setState({
      itemsLS: itemsArray,
    });
  };

  render() {
    const { itemsLS } = this.state;
    return (
      <div>
        {!itemsLS
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (itemsLS.map((product, index) => (
            <>
              <ProductsCard
                key={ index }
                title={ product.title }
                price={ product.price }
                thumbnail={ product.thumbnail }
              />
              <p
                data-testid="shopping-cart-product-quantity"
              >
                Quantidade: 1
              </p>
            </>
          )))}
      </div>
    );
  }
}

export default ShoppingCart;
