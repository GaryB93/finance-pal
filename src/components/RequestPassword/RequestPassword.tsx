import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { verifyUser } from '../../reducers/userReducer';

const RequestPassword = () => {
  const [username, setUsername] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // fetch to see if username entered exists in database
    // if not set userNotFound to true to display error
    // else route to security question prompt
    // with security question and answer returned from db
    // set userID and username in state
    dispatch(verifyUser({ userID: '123', username: username }));
    navigate('/security_question', {state: ['question', 'answer']});
  };

  return (
    <form className='login' onSubmit={handleRequest}>
      <h1>FinancePal</h1>
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        type='text'
        value={username}
        required
        onChange={(e)=>{setUsername(e.target.value)}}
      />

      {userNotFound && 
        <p className='error-message' role='alert'>
          There is no account registered with the username entered
        </p>
      }

      <button type='submit' className='primaryBtn'>Request New Password</button>

      <p>
        Back to <Link to='/'>Login</Link>
      </p>
    </form>
  )
};

export default RequestPassword;