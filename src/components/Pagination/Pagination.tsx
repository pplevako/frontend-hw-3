import Text from '@components/Text';
import ArrowLeftIcon from '@components/icons/ArrowLeftIcon';
import ArrowRightIcon from '@components/icons/ArrowRightIcon';
import cx from 'clsx';
import React from 'react';

import styles from './Pagination.module.scss';

export type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  className,
  page: currentPage,
  pageCount: totalPages,
  onPageChange,
  disabled = false,
  ...props
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={cx(styles.pagination, className)} {...props}>
      <button
        className={styles.pageChangeBtn}
        onClick={handlePrev}
        disabled={disabled || currentPage <= 1}
      >
        <ArrowLeftIcon />
      </button>
      <Text view="p-18" tag="span">
        {currentPage} / {totalPages}
      </Text>
      <button
        className={styles.pageChangeBtn}
        onClick={handleNext}
        disabled={disabled || currentPage >= totalPages}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
