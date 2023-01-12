import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    infoProduct: [],
    id: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      id,
    }, this.getInfoProduct);
  }

  getInfoProduct = async () => {
    const { id } = this.state;
    const response = await getProductById(id);
    this.setState({
      infoProduct: response.results,
    });
  };

  render() {
    const { infoProduct } = this.state;

    return (
      <div
        data-testid="product-detail-link"
      >
        <p>TESTE</p>
        <p
          data-testid="product-detail-name"
        >
          {infoProduct.title}
        </p>
        <p
          data-testid="product-detail-price"
        >
          { infoProduct.price }
        </p>
        <p>
          { infoProduct.condition }
        </p>
        <img
          data-testid="product-detail-image"
          src={ infoProduct.thumbnail }
          alt={ infoProduct.title }
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
  match: PropTypes.string,
}.isRequired;
