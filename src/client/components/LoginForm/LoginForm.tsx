import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { login } from '../../reducers/userReducer';
import { ENDPOINTS } from '../../constants/endpoints';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = (): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [invalidUser, setInvalidUser] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: ENDPOINTS.USER_LOGIN,
      data: {
        username,
        password
      },
    })
    .then(res => {
      if ((res.data.userId)) {
        dispatch(login({
          userId: res.data.userId,
          username: res.data.username,
          created: res.data.created,
        }));
        navigate('summary');
      } else {
        setInvalidUser(true);
      }
    })
    .catch(err => {
      console.error(err);
    });
  };

  return (
    <form className='login' onSubmit={handleLogin}>
      <h1>Welcome</h1>
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        type='text'
        value={username}
        autoComplete='off'
        required
        onChange={(e)=>{
          setInvalidUser(false);
          setUsername(e.target.value);
        }}
      />

      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        value={password}
        required
        onChange={(e)=>{
          setInvalidUser(false);
          setPassword(e.target.value)
        }}
      />

      <p>
        <Link to={'change_password'}>Forgot Password?</Link>
      </p>

      { invalidUser &&
        <p className='error-message' role='alert'>
          The username or password you entered is incorrect
        </p>
      }

      <button type='submit' className='primary-btn'>Login</button>

      <p>
        Not a member? <Link to={'signup'}>Sign up</Link>
      </p>
    </form>
  );
};

export default LoginForm;