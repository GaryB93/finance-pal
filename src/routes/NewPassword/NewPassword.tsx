import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewPassword.css';

const NewPassword = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    console.log('here');
  };

  return (
    <form id='change-password' onSubmit={handleSubmit}>
      <h1>FinancePal</h1>
      <label htmlFor='new-password'>New Password</label>
      <input type='password' id='new-password' value={password}
        required onChange={(e)=>{setPassword(e.target.value)}}/>

      <label htmlFor='confirm-password'>Confirm New Password</label>
      <input type='password' id='confirm-password' value={confirmPassword}
        required onChange={(e)=>{setConfirmPassword(e.target.value)}}/>

      <button type='submit' className='primaryBtn'>Change Password</button>

      <p>
        Back to <Link to='/'>Login</Link>
      </p>
    </form>
  )
};

export default NewPassword;