import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChangePassword from './pages/ChangePassword';
import Summary from './pages/Summary';
import Details from './pages/Details';
import ErrorPage from './pages/ErrorPage';
import { setupStore } from './store';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'change_password',
    element: <ChangePassword />,
  },
  {
    path: 'summary',
    element: <PrivateRoute route={<Summary />}></PrivateRoute>,
  },
  {
    path: 'details',
    element: <PrivateRoute route={<Details />}></PrivateRoute>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
);
