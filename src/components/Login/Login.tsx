import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMsg, setInvalidMsg] = useState(false);

  const handleLogin = () => {
    setInvalidMsg(!invalidMsg);
  };

  return (
    <form id='login' onSubmit={handleLogin}>
      <h1>FinancePal</h1>
      <label htmlFor='username'>Username</label>
      <input id='username' type='text' value={username} required
          onChange={(e) => {setUsername(e.target.value)}}/>

      <label htmlFor='password'>Password</label>
      <input id='password' type='password' value={password} required
        onChange={(e) => {setPassword(e.target.value)}}/>

      <p>
        <Link to={'new_password'}>Forgot Password?</Link>
      </p>

      {invalidMsg &&
        <p className='error-message'>
          The username or password you entered is incorrect
        </p>
      }

      <button type='submit' className='primaryBtn'>Login</button>

      <p>
        Not a member? <Link to={'new_account'}>Sign up</Link>
      </p>
    </form>
  );
};

export default Login;