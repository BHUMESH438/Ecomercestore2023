import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { HomeLayout, Landing, Error, Products, SingleProduct, Cart, About, Register, Login, Checkout, Orders } from './pages';
import { ErrorElement } from './components';

import { loader as landingLoader } from './pages/Landing';
import { loader as singlePageLoader } from './pages/SingleProduct';
import { loader as allproductsLoader } from './pages/Product';
import { loader as checkoutLoader } from './pages/Checkout';
import { loader as orderLoader } from './pages/Orders';
//after declaration of loader in every compoenent the loader is passed to the router

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as checkoutAction } from './components/CheckoutForm';
import { store } from './store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />, //for all same error element
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
        errorElement: <ErrorElement />
      },
      {
        path: 'products',
        element: <Products />,
        loader: allproductsLoader(queryClient),
        errorElement: <ErrorElement />
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: singlePageLoader(queryClient),
        errorElement: <ErrorElement />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store)
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: orderLoader(store, queryClient)
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store)
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction
  }
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
