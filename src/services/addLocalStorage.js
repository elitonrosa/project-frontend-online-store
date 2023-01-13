const addProductsLocalStorage = ({ target: { id } }) => localStorage
  .setItem('ID_PRODUTO', JSON.stringify(id));

export default addProductsLocalStorage;
