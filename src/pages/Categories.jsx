import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getCategories } from '../services/api';

class Categories extends Component {
  state = {
    isLoading: false,
    categories: [],
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
      console.log(categories);
    });
  };

  render() {
    const { isLoading, categories } = this.state;
    return (
      <div>
        <Header />
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
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
export default Categories;
