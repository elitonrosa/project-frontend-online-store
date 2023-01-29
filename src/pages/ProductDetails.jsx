import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getProductById } from '../services/api';
import FormAvaliation from '../components/FormAvaliation';
import AvaliationProduct from '../components/AvaliationProduct';

class ProductDetails extends Component {
  state = {
    infoProduct: [],
    id: '',
    productsLocalStorage: [],
    emailUser: '',
    description: '',
    rate: '',
    message: false,
    savedAvaliations: [],
  };

  // Ler o Local Storage com o getItem, depois setar no productsLocalStorage
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const items = localStorage.getItem('ID_PRODUTO');
    const itemsArray = JSON.parse(items);
    const avaliationsLS = localStorage.getItem(id);
    const avaliations = JSON.parse(avaliationsLS);

    // Produto
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
    // Avaliações
    if (!avaliations) {
      this.setState({
        savedAvaliations: [],
      });
    } else {
      this.setState({
        savedAvaliations: avaliations,
      });
    }
  }

  getInfoProduct = async () => {
    const { id } = this.state;
    const response = await getProductById(id);
    this.setState({
      infoProduct: response,
    });
  };

  // Requisito 09
  addProductToCart = (product) => {
    // Adicionar chave quantidade no product
    // Verificar se o produto já existe no Local Storage, se existir aumentar a quantity (quantity + 1), se não existir (quantity: 1)
    this.setState((prevState) => ({
      productsLocalStorage: [
        ...prevState.productsLocalStorage,
        { ...product, quantity: 1 },
      ],
    }), () => {
      const { productsLocalStorage } = this.state;
      localStorage
        .setItem('ID_PRODUTO', JSON.stringify(productsLocalStorage));
    });
  };

  // Requisito 11
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  onClickButton = () => {
    const { emailUser, description, rate } = this.state;
    if (!emailUser && !description && !rate) {
      this.setState({
        message: true,
      });
    } else {
      this.setState((prevState) => ({
        message: false,
        savedAvaliations: [...prevState.savedAvaliations, {
          email: emailUser,
          text: description,
          rating: rate,
        }],
      }), () => {
        const { savedAvaliations, id } = this.state; // pega as avaliações salvas do state
        localStorage.setItem(id, JSON.stringify(savedAvaliations)); // salva no LSFormAvaliation
      });
    }
  };

  render() {
    const { infoProduct, message } = this.state;
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
        <FormAvaliation
          handleChange={ this.handleChange }
          onClickButton={ this.onClickButton }
          message={ message }
        />
        <AvaliationProduct { ...this.state } />
      </div>
    );
  }
}

export default ProductDetails;

ProductDetails.propTypes = {
  match: PropTypes.string,
}.isRequired;
