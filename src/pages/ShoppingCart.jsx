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
          ? <p>Opa</p>
          : (itemsLS.map((product, index) => (
            <ProductsCard
              key={ index }
              title={ product.title }
              price={ product.price }
              thumbnail={ product.thumbnail }
            />
          )))}
      </div>
    );
  }
}

export default ShoppingCart;
