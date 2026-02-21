import { Navigate, type RouteObject } from 'react-router';

import App from '../App';
import Product from '../App/pages/ProductPage';
import ProductsPage from '../App/pages/ProductsPage';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <Product />,
      },
      {
        path: '*',
        element: <Navigate to="/products" replace />,
      },
    ],
  },
];
