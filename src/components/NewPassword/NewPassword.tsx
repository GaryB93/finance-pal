import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaCheck } from 'react-icons/fa';
import { useAppDispatch } from '../../hooks';
import PasswordRequirements from '../PasswordRequirements/PasswordRequirements';

const NewPassword = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // displays password tootips
  const [passwordReq, setPasswordReq] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  // used to set focus to certain input fields
  const passwordReqRef = useRef<HTMLInputElement>(null);
  const passMatchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        password.length < 8) {
      if (passwordReqRef.current !== null) {
        passwordReqRef.current.focus();
      }
    } else if (password !== confirmPassword) {
        if (passMatchRef.current !== null) {
          passMatchRef.current.focus();
        }
    } else {
      // update password in database and send user back to login page
      // make sure to reset userID and username in state
    }
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
        ref={passwordReqRef}
      />

      { passwordReq && <PasswordRequirements password={password}/> }

      <label htmlFor='confirm-password'>Confirm Password</label>
      <input id='confirm-password'
        type='password'
        value={confirmPassword}
        required
        onChange={(e)=>{setConfirmPassword(e.target.value)}} 
        onFocus={()=>{setPasswordMatch(true)}}
        onBlur={()=>{setPasswordMatch(false)}}
        ref={passMatchRef}
      />

      {passwordMatch &&
        <div id='password-match' role='alert'>
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

      <button type='submit' className='primaryBtn'>
          Change Password
      </button>

      <p>
        Back to <Link to='/'>Login</Link>
      </p>
    </form>
  )
};

export default NewPassword;