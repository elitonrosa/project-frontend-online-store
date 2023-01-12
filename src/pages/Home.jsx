import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    isLoading: false,
    categories: [],
    products: [],
    search: '',
  };

  componentDidMount() {
    this.categoriesList();
  }

  categoriesList = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const categories = await getCategories();
      this.setState({
        isLoading: false,
        categories,
      });
      // console.log(categories);
    }); // teste
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
    const { search } = this.state;
    console.log(search);
  };

  onClickButton = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { search } = this.state;
      const response = await getProductsFromCategoryAndQuery('', search);
      console.log(response);
      this.setState({
        isLoading: false,
        products: response,
      });
    });
  };

  render() {
    const { isLoading, categories } = this.state;
    return (
      <div>
        <Header />
        <label
          data-testid="home-initial-message"
          htmlFor="search-label"
        >
          <input
            type="text"
            id="search-label"
            data-testid="query-input"
            onChange={ this.handleChange }
          />
          Digite algum termo de pesquisa ou escolha uma categoria.
        </label>
        <button
          type="submit"
          data-testid="query-button"
          onClick={ this.onClickButton }
        >
          Pesquisar
        </button>
        {isLoading ? <Loading /> : (
          <div>
            { categories.map((categorie) => (
              <li
                key={ categorie.id }
              >
                <button
                  data-testid="category"
                  type="button"
                >
                  {categorie.name}
                </button>
              </li>))}
          </div>
        )}
      </div>

    );
  }
}
export default Home;
