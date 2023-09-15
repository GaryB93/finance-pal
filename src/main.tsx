import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/ErrorPage';
import Login from './routes/Login';
import Signup from './routes/Signup';
import RequestPassword from './routes/RequestPassword';
import SecurityQuestion from './routes/SecurityQuestion';

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
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
