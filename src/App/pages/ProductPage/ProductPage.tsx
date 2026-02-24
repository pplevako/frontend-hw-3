import Button from '@components/Button';
import Text from '@components/Text/Text';
import ArrowLeftIcon from '@components/icons/ArrowLeftIcon';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import styles from './ProductPage.module.scss';

type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const result = await axios({
          method: 'get',
          url: `https://front-school-strapi.ktsdev.ru/api/products/${id}?populate[0]=images`,
        });
        const raw = result.data.data;
        setProduct({
          id: raw.documentId,
          title: raw.title,
          description: raw.description,
          imageUrl: raw.images[0]?.formats?.medium?.url || '',
          price: raw.price,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className={styles.productPage}>
      <div className={styles.nav}>
        <button onClick={handleGoBack} className={styles.backButton}>
          <ArrowLeftIcon />
          <Text view="p-20">Back</Text>
        </button>
      </div>
      <div className={styles.productContent}>
        <div className={styles.productImage}>
          <img src={product.imageUrl} alt={product.title} />
        </div>
        <div className={styles.productDetail}>
          <div>
            <Text className={styles.productTitle} view="title" color="primary" weight="bold">
              {product.title}
            </Text>
            <Text view="p-20" color="secondary">
              {product.description}
            </Text>
          </div>
          <div className={styles.productFooter}>
            <Text view="title" color="primary" weight="bold">
              {`$${product.price}`}
            </Text>
            <div className={styles.productActions}>
              <Button>Buy Now</Button>
              <Button className={styles.btnAddToCard}>Add to Card</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
