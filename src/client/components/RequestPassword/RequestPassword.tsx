import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { verifyUser } from '../../reducers/userReducer';
import axios from 'axios';
import { ENDPOINTS } from '../../constants/endpoints';

const RequestPassword = () => {
  const [username, setUsername] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    axios({
      method: 'get',
      url: ENDPOINTS.GET_SECURITY_QUESTION + `/${username}`,
    })
      .then(res => {
        if (res.data.userId) {
          dispatch(verifyUser({
            userId: res.data.userId,
            username: res.data.username,
          }));
          navigate('/security_question', {
            state: {
              question: res.data.question,
            }
          });
        } else {
          setUserNotFound(true);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <form className='login' onSubmit={handleRequest}>
      <h1>FinancePal</h1>
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        type='text'
        value={username}
        autoComplete='true'
        autoFocus
        required
        onChange={(e)=>{
          setUserNotFound(false);
          setUsername(e.target.value);
        }}
      />

      { userNotFound && 
        <p className='error-message' role='alert'>
          There is no account registered with the username entered
        </p> }

      <button type='submit' className='primary-btn'>Request New Password</button>

      <p>
        Back to <Link to='/'>Login</Link>
      </p>
    </form>
  )
};

export default RequestPassword;