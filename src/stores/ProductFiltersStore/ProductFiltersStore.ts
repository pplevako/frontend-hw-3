import { makeAutoObservable } from 'mobx';

class ProductFiltersStore {
  private _searchTitle = '';
  private _selectedCategories = new Set<number>();

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
    return Array.from(this._selectedCategories);
  }

  setSelectedCategories(ids: (string | number)[]) {
    const newSet = new Set<number>();
    ids.forEach((id) => newSet.add(typeof id === 'string' ? parseInt(id, 10) : id));
    this._selectedCategories = newSet;
  }

  reset() {
    this._searchTitle = '';
    this._selectedCategories = new Set<number>();
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
