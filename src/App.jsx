import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomeLayout, Landing, Error, Products, SingleProduct, Cart, About, Register, Login, Checkout, Orders } from './pages';
import { ErrorElement } from './components';
import { loader as landingLoader } from './pages/Landing';
import { loader as singlePageLoader } from './pages/SingleProduct';
import { loader as allproductsLoader } from './pages/Product';
//after declaration of loader in every compoenent the loader is passed to the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />, //for all same error element
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: <ErrorElement />
      },
      {
        path: 'products',
        element: <Products />,
        loader: allproductsLoader,
        errorElement: <ErrorElement />
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: singlePageLoader,
        errorElement: <ErrorElement />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      { path: 'about', element: <About /> },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: 'orders',
        element: <Orders />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
