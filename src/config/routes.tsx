import { Navigate, type RouteObject } from 'react-router';

import App from '../App';
import ProductPage from '../App/pages/ProductPage';
import ProductsPage from '../App/pages/ProductsPage';

export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  products: {
    mask: '/products',
    create: () => '/products',
  },
  product: {
    mask: '/products/:id',
    create: (id: string) => `/products/${id}`,
  },
};

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.products.mask,
        element: <ProductsPage />,
      },
      {
        path: routes.product.mask,
        element: <ProductPage />,
      },
      {
        path: '*',
        element: <Navigate to={routes.products.create()} replace />,
      },
    ],
  },
];
