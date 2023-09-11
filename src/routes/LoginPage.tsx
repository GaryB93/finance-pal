import { Outlet } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div id='login-page'>
      <Outlet />
    </div>
  )
};

export default LoginPage;