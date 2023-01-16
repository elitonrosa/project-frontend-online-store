import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  state = {
    infoProduct: [],
    id: '',
    productsLocalStorage: [],
  };

  // Ler o Local Storage com o getItem, depois setar no productsLocalStorage
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items);
    if (!itemsArray) {
      this.setState({
        productsLocalStorage: [],
        id,
      }, this.getInfoProduct);
    } else {
      this.setState({
        productsLocalStorage: itemsArray,
        id,
      }, this.getInfoProduct);
    }
  }

  getInfoProduct = async () => {
    const { id } = this.state;
    const response = await getProductById(id);
    this.setState({
      infoProduct: response,
    });
  };

  // Requisito 9
  addProductToCart = (product) => {
    this.setState((prevState) => ({
      productsLocalStorage:
      [...prevState.productsLocalStorage, { ...product, quantity: 1 }],
    }), () => {
      const { productsLocalStorage } = this.state;
      localStorage
        .setItem('ID_PRODUTO', JSON.stringify(productsLocalStorage));
    });
  };

  render() {
    const { infoProduct } = this.state;
    return (
      <div
        data-testid="product"
      >
        <h1>Detalhes do produto</h1>
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
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addProductToCart(infoProduct) }
          id={ infoProduct.id }
        >
          Eu quero
        </button>
        <Header data-testid="shopping-cart-button" />
        {/* <button
          type="submit"
          data-testid="shopping-cart-button"
        > */}
      </div>
    );
  }
}
export default ProductDetails;

ProductDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;
