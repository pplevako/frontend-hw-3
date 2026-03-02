import ProductModel from '@stores/models/ProductModel';
import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import qs from 'qs';

const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/products';

class ProductStore {
  private _product: ProductModel | null = null;
  private _loading = false;
  private _error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      queryParams: false,
    });
  }

  get product() {
    return this._product;
  }

  get loading() {
    return this._loading;
  }

  get error() {
    return this._error;
  }

  get queryParams() {
    return {
      populate: ['images', 'productCategory'],
    };
  }

  reset() {
    this._product = null;
    this._loading = false;
    this._error = null;
  }

  async fetchProduct(documentId: string) {
    this.reset();
    try {
      const queryString = qs.stringify(this.queryParams, {
        encodeValuesOnly: true,
      });
      const response = await axios.get(`${BASE_URL}/${documentId}?${queryString}`);
      runInAction(() => {
        this._product = new ProductModel(response.data.data);
      });
    } catch (err) {
      runInAction(() => {
        this._error = err instanceof Error ? err.message : 'Unknown error';
      });
    } finally {
      runInAction(() => {
        this._loading = false;
      });
    }
  }
}

export default ProductStore;
