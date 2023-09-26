import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { login } from '../../reducers/userReducer';
import './login.css';

const Login = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // fetch to database to verify username and password
    // if successful, update userID, username, loggedIn in state
    // navigate to summary page
    dispatch(login({ userID: '123', username: username}));
    navigate('summary');
    // if username doesn't match an existing account or the
    // password is invalid, set error message
  };

  return (
    <form className='login' onSubmit={handleLogin}>
      <h1>FinancePal</h1>
      <label htmlFor='username'>Username</label>
      <input id='username'
        type='text'
        value={username}
        required
        onChange={(e)=>{setUsername(e.target.value)}}
      />

      <label htmlFor='password'>Password</label>
      <input id='password'
        type='password'
        value={password}
        required
        onChange={(e)=>{setPassword(e.target.value)}}
      />

      <p id='forgot-password'>
        <Link to={'request_password'}>Forgot Password?</Link>
      </p>

      {invalidUser &&
        <p className='error-message' role='alert'>
          The username or password you entered is incorrect
        </p>
      }

      <button type='submit' className='primaryBtn'>Login</button>

      <p>
        Not a member? <Link to={'signup'}>Sign up</Link>
      </p>
    </form>
  );
};

export default Login;