import { Navigate, type RouteObject } from 'react-router';

import App from '../App';
import ProductListPage from '../App/pages/ProductListPage';
import ProductPage from '../App/pages/ProductPage';

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
    mask: '/products/:documentId',
    create: (documentId: string) => `/products/${documentId}`,
  },
};

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={routes.products.create()} replace />,
      },
      {
        path: routes.products.mask,
        element: <ProductListPage />,
      },
      {
        path: routes.product.mask,
        element: <ProductPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
