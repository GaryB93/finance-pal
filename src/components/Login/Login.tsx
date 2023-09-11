import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMsg, setInvalidMsg] = useState(false);

  const handleLogin = () => {

  };

  return (
    <form id='login' onSubmit={handleLogin}>
      <label htmlFor='username'>Username</label>
      <input name='username' id='username' type='text' value={username} required
          onChange={(e) => {setUsername(e.target.value)}}/>

      <label htmlFor='password'>Password</label>
      <input name='password' id='password' type='password' value={password} required
        onChange={(e) => {setPassword(e.target.value)}}/>

      {invalidMsg &&
        <p>
          The username or password you entered is incorrect
        </p>
      }
      <button type='submit'>Login</button>

      <span>or</span>

      <Link to={'new_account'}>Create Account</Link>

      <Link to={'new_password'}>Forgot Password?</Link>
    </form>
  );
};

export default Login;