import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class ProductDetails extends Component {
  render() {
    const { price, title, thumbnail, condition } = this.props;
    return (
      <div
        data-testid="product-detail-link"
      >
        <p>TESTE</p>
        <p
          data-testid="product-detail-name"
        >
          {title}
        </p>
        <p
          data-testid="product-detail-price"
        >
          {price}
        </p>
        <p>
          { condition }
        </p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <Header />
        {/* <button
          type="submit"
          data-testid="shopping-cart-button"
        /> */}
      </div>
    );
  }
}
export default ProductDetails;

ProductDetails.propTypes = {
  price: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  condition: PropTypes.string,
}.isRequired;
