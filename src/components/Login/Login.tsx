import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { login } from '../../reducers/userReducer';
import { ENDPOINTS } from '../../constants/endpoints';
import axios from 'axios';
import './Login.css';

interface Request {
  username: string;
  password: string;
}

interface Response {
  userId: string;
  username: string;
}

const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [invalidUser, setInvalidUser] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post<Request, Response>(ENDPOINTS.USER_LOGIN, {
      username,
      password
    })
    .then((res) => {
      if ((res.userId)) {
        dispatch(login({ userID: res.userId, username: res.username}));
        navigate('summary');
      } else {
        setInvalidUser(true);
      }
    })
    .catch((err) => {
      console.error(err);
    });
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