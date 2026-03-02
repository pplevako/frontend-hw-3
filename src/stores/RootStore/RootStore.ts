import ProductCategoriesStore from '../ProductCategoriesStore';
import ProductFiltersStore from '../ProductFiltersStore';
import ProductListStore from '../ProductListStore';
import ProductStore from '../ProductStore';

const PAGE_SIZE = 9;

class RootStore {
  categoriesStore: ProductCategoriesStore;
  filtersStore: ProductFiltersStore;
  productListStore: ProductListStore;
  productStore: ProductStore;

  constructor() {
    this.categoriesStore = new ProductCategoriesStore();
    this.filtersStore = new ProductFiltersStore();
    this.productListStore = new ProductListStore(this.filtersStore, PAGE_SIZE);
    this.productStore = new ProductStore();
  }
}

export default RootStore;
