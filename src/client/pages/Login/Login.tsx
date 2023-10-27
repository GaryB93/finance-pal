import LoginForm from "../../components/LoginForm";
import './Login.css';

const Login = (): JSX.Element => {
  return (
    <div className='login-page'>
      {/* <Logo /> */}
      <LoginForm />
    </div>
  );
};

export default Login;