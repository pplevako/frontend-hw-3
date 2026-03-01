import type { Option } from '@components/MultiDropdown';
import type ProductCategoryModel from '@stores/models/ProductModel';
import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/product-categories';

class ProductCategoriesStore {
  categories: ProductCategoryModel[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // TODO: add pagination
  async fetchCategories() {
    this.loading = true;
    this.error = null;
    try {
      const response = await axios.get(BASE_URL);
      runInAction(() => {
        // TODO: add API type
        this.categories = response.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
        }));
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : 'Unknown error';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  get categoryOptions(): Option[] {
    return this.categories.map((c) => ({ key: c.id.toString(), value: c.title }));
  }
}

export default ProductCategoriesStore;
