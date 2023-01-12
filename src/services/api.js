export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL);
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}

export async function getProductById(productID) {
  const URL = `https://api.mercadolibre.com/items/${productID}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
