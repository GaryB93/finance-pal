import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import LoginPage from './routes/LoginPage';
import ErrorPage from './routes/ErrorPage';
import Login from './components/Login';
import NewAccount from './components/NewAccount';
// import ForgotPassword from './components/ForgotPassword';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Login />
        },
        {
          path: 'new_account',
          element: <NewAccount />
        },
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
