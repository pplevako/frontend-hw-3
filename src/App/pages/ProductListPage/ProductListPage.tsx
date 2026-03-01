import Pagination from '@components/Pagination';
import Text from '@components/Text';
import { useStore } from '@stores/context';
import type ProductModel from '@stores/models/ProductModel';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';

import styles from './ProductListPage.module.scss';
import ProductFilters from './components/ProductFilters';
import ProductListItem from './components/ProductListItem';

const ProductListPage: React.FC = observer(() => {
  const { filtersStore, productListStore } = useStore();

  useEffect(() => {
    productListStore.fetchProducts();
  }, [
    productListStore,
    productListStore.page,
    filtersStore.searchTitle,
    filtersStore.selectedCategories,
  ]);

  const handlePageChange = useCallback(
    (page: number) => {
      productListStore.setPage(page);
    },
    [productListStore]
  );

  return (
    <div className={styles.productListPage}>
      <div className={styles.desc}>
        <Text view="title" color="primary" weight="bold">
          Products
        </Text>
        <Text view="p-20" color="secondary">
          We display products based on the latest products we have, if you want to see our old
          products please enter the name of the item
        </Text>
      </div>
      <div className={styles.filters}>
        <ProductFilters />
        <div className={styles.totalProducts}>
          <Text view="p-32" color="primary" weight="bold">
            Total products
          </Text>
          <Text view="p-20" color="accent" weight="bold">
            {productListStore.total}
          </Text>
        </div>
      </div>
      <div className={styles.grid}>
        {productListStore.products.map((product: ProductModel) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          page={productListStore.page}
          pageCount={productListStore.pageCount}
          onPageChange={handlePageChange}
          disabled={productListStore.loading}
        />
      </div>
    </div>
  );
});

export default ProductListPage;
