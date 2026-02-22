import Button from '@components/Button';
import Card from '@components/Card';
import Text from '@components/Text';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './ProductsPage.module.scss';

type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsTotal, setProductsTotal] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios({
          method: 'get',
          url: 'https://front-school-strapi.ktsdev.ru/api/products?populate[0]=images&populate[1]=productCategory',
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedProducts = result.data.data.map((raw: any) => ({
          id: raw.documentId,
          title: raw.title,
          description: raw.description,
          imageUrl: raw.images[0]?.formats?.small?.url || '',
          price: raw.price,
          category: raw.productCategory?.title || '',
        }));
        setProducts(fetchedProducts);
        setProductsTotal(result.data.meta.pagination.total);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.productsPage}>
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
        <div className={styles.totalProducts}>
          <Text view="p-32" color="primary" weight="bold">
            Total products
          </Text>
          <Text view="p-20" color="accent" weight="bold">
            {productsTotal}
          </Text>
        </div>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.imageUrl}
            title={product.title}
            subtitle={product.description}
            captionSlot={product.category}
            contentSlot={`$${product.price}`}
            onClick={() => handleCardClick(product.id)}
            actionSlot={<Button onClick={handleAddToCardClick}>Add to Card</Button>}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
