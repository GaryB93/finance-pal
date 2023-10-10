import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import RequestPassword from './components/RequestPassword';
import SecurityQuestion from './components/SecurityQuestion';
import NewPassword from './components/NewPassword';
import Summary from './components/Summary';
import PrivateRoute from './components/PrivateRoute';
import ErrorPage from './components/ErrorPage';
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
    path: 'request_password',
    element: <RequestPassword/>,
  },
  {
    path: 'security_question',
    element: <PrivateRoute route={<SecurityQuestion/>}></PrivateRoute>,
  },
  {
    path: 'new_password',
    element: <PrivateRoute route={<NewPassword/>}></PrivateRoute>,
  },
  {
    path: 'summary',
    element: <PrivateRoute route={<Summary/>}></PrivateRoute>,
  },
  {
    path: 'summary2',
    element: <Summary/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
);
