import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaCheck } from 'react-icons/fa';
import PasswordRequirements from '../../components/PasswordRequirements/PasswordRequirements';

const NewPassword = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordReq, setPasswordReq] = useState(false);
  const [passwordMatcher, setPasswordMatcher] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('here');
  };

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h1>FinancePal</h1>
      <label htmlFor='new-password'>New Password</label>
      <input id='new-password'
        type='password'
        value={password}
        required
        onChange={(e)=>{setPassword(e.target.value)}}
        onFocus={()=>{setPasswordReq(true)}}
        onBlur={()=>{setPasswordReq(false)}}
      />

      { passwordReq && <PasswordRequirements password={password}/> }

      <label htmlFor='confirm-password'>Confirm Password</label>
      <input id='confirm-password'
        type='password'
        value={confirmPassword}
        required
        onChange={(e)=>{setConfirmPassword(e.target.value)}} 
        onFocus={()=>{setPasswordMatcher(true)}}
        onBlur={()=>{setPasswordMatcher(false)}}
      />

      {(passwordMatcher && confirmPassword !== '') &&
        <div id='password-match' data-testid='password-match'>
          {password === confirmPassword ?
            <IconContext.Provider value={{ color: 'green'}}>
              <FaCheck/>
            </IconContext.Provider>
            :
            <IconContext.Provider value={{ color: 'gray'}}>
              <FaCheck/>
            </IconContext.Provider>
          }
          <span>Passwords must match</span>
        </div>
      }

      <button type='submit' className='primaryBtn'>Change Password</button>

      <p>
        Back to <Link to='/'>Login</Link>
      </p>
    </form>
  )
};

export default NewPassword;