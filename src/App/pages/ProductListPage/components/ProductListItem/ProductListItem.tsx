import Button from '@components/Button';
import Card from '@components/Card';
import { routes } from '@config/routes';
import type ProductModel from '@stores/models/ProductModel';
import React from 'react';
import { useNavigate } from 'react-router';

import styles from './ProductListItem.module.scss';

type ProductListItemProps = {
  product: ProductModel;
};

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(routes.product.create(product.documentId));
  };

  const handleAddToCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <Card
      className={styles.productListItem}
      key={product.id}
      image={product.cardImageUrl}
      title={product.title}
      subtitle={product.description}
      captionSlot={product.categoryTitle}
      contentSlot={`$${product.price}`}
      onClick={handleCardClick}
      actionSlot={<Button onClick={handleAddToCardClick}>Add to Card</Button>}
    />
  );
};

export default ProductListItem;
