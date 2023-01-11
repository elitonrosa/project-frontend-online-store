import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          Carrinho de Compras
        </Link>
      </div>
    );
  }
}
export default Header;
