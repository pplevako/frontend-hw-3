import { makeAutoObservable } from 'mobx';

class ProductFiltersStore {
  private _searchTitle = '';
  private _selectedCategories: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get searchTitle() {
    return this._searchTitle;
  }

  setSearchTitle(title: string) {
    this._searchTitle = title;
  }

  get selectedCategories(): readonly number[] {
    return this._selectedCategories;
  }

  setSelectedCategories(keys: number[]) {
    this._selectedCategories = keys;
  }

  reset() {
    this._searchTitle = '';
    this._selectedCategories = [];
  }

  get queryParams() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {
      title: {
        $containsi: this.searchTitle,
      },
    };
    if (this.selectedCategories.length > 0) {
      filters.productCategory = {
        id: {
          $in: this.selectedCategories,
        },
      };
    }
    return { filters };
  }
}

export default ProductFiltersStore;
