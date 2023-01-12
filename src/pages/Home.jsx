import React, { Component } from 'react';
import AnyProduct from '../components/AnyProduct';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProductsCard from '../components/ProductsCard';
import Search from '../components/Search';
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
    // console.log(value);
    this.setState({
      search: value,
    });
    // console.log(search);
  };

  onClickButton = () => {
    const { search } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      const response = await getProductsFromCategoryAndQuery(undefined, search);
      console.log(response.results);
      this.setState({
        isLoading: false,
        products: response.results,
      });
    });
  };

  render() {
    const { isLoading, categories, products } = this.state;
    return (
      <div>
        <Header />
        <Search
          handleChange={ this.handleChange }
          onClickButton={ this.onClickButton }
        />
        {products.length === 0 ? <AnyProduct /> : (
          <div>
            {products.map((product) => (
              <ProductsCard
                key={ product.title }
                title={ product.title }
                price={ product.price }
                thumbnail={ product.thumbnail }
              />
            ))}
          </div>
        )}
        {isLoading ? <Loading /> : (
          <div>
            {categories.map((categorie) => (
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
