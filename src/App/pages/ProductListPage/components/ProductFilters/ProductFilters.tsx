import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import type { Option } from '@components/MultiDropdown';
import { useStore } from '@stores/context';
import cx from 'clsx';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useMemo, useCallback } from 'react';

import styles from './ProductFilters.module.scss';

const ProductFilters: React.FC<React.HTMLAttributes<HTMLDivElement>> = observer(
  ({ className, ...props }) => {
    const { filtersStore, categoriesStore } = useStore();
    const [searchValue, setSearchValue] = useState(filtersStore.searchTitle);

    const debouncedSearch = useMemo(
      () =>
        debounce((value: string) => {
          filtersStore.setSearchTitle(value);
        }, 300),
      [filtersStore]
    );

    useEffect(() => {
      return () => {
        debouncedSearch.cancel();
      };
    }, [debouncedSearch]);

    const handleSearchChange = useCallback(
      (value: string) => {
        setSearchValue(value);
        debouncedSearch(value);
      },
      [debouncedSearch]
    );

    const selectedOptions = categoriesStore.categoryOptions.filter((opt) =>
      filtersStore.selectedCategories.includes(parseInt(opt.key, 10))
    );

    const handleCategoryChange = useCallback(
      (options: Option[]) => {
        filtersStore.setSelectedCategories(options.map((opt) => parseInt(opt.key, 10)));
      },
      [filtersStore]
    );

    const getTitle = (selected: Option[]) => {
      return selected.length === 0 ? 'Filter' : selected.map(({ value }) => value).join(', ');
    };

    return (
      <div className={cx(styles.filters, className)} {...props}>
        <Input
          className={styles.search}
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search product"
        />
        <MultiDropdown
          className={styles.categories}
          options={categoriesStore.categoryOptions}
          value={selectedOptions}
          onChange={handleCategoryChange}
          getTitle={getTitle}
          disabled={categoriesStore.loading}
        />
      </div>
    );
  }
);

export default ProductFilters;
