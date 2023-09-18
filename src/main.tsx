import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/ErrorPage';
import Login from './routes/Login';
import Signup from './routes/Signup';
import RequestPassword from './routes/RequestPassword';
import SecurityQuestion from './routes/SecurityQuestion';
import NewPassword from './routes/NewPassword';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: 'signup',
    element: <Signup />
  },
  {
    path: 'request_password',
    element: <RequestPassword/>
  },
  {
    path: 'security_question',
    element: <SecurityQuestion/>
  },
  {
    path: 'new_password',
    element: <NewPassword/>
  },
  {
    path: 'summary',

  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
