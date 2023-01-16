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
      itemsLS: itemsArray, // items que estão no LS
    });
  };

  // Requisito 10

  filterSpecificProduct = (idShoppingCart) => { // qdo clicamos em EXCLUIR, chama essa func
    // retorna todos os produtos menos o que foi clicado
    const { itemsLS } = this.state; // pega os itens do LS
    const result = itemsLS.filter((item) => (item.id !== idShoppingCart)); // se o id do item do ARRAY for diferente do parametro, retorna TRUE
    this.setState({
      itemsLS: result, // seta o estado com o ítem ja excluído
    }, () => {
      const { itemsLS: newItems } = this.state;
      // renomeia a variável (nao o estado)
      localStorage
        .setItem('ID_PRODUTO', JSON.stringify(newItems)); // salva no LS
    });
  };

  render() {
    const { itemsLS } = this.state;
    return (
      <div>
        {!itemsLS
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (itemsLS.map((product, index) => (
            <div
              key={ `${index}${product.id}` }
            >
              <ProductsCard
                title={ product.title }
                price={ product.price }
                thumbnail={ product.thumbnail }
              />
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => console.log('somar') }
              >
                +
              </button>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                { product.quantity }
              </p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => console.log('subtrair') }
              >
                -
              </button>
              <button
                type="button"
                data-testid="remove-product"
                onClick={ () => this.filterSpecificProduct(product.id) }
              >
                Excluir
              </button>
            </div>
          )))}
      </div>
    );
  }
}

export default ShoppingCart;
