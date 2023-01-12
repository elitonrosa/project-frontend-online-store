import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductsCard extends Component {
  render() {
    const { price, title, thumbnail } = this.props;
    return (
      <div
        data-testid="product"
      >
        <p>
          {title}
        </p>
        <p>
          {price}
        </p>
        <img
          src={ thumbnail }
          alt={ title }
        />
      </div>
    );
  }
}

export default ProductsCard;

ProductsCard.propTypes = {
  price: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
}.isRequired;
