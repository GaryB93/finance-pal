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
  const [passwordMatcher, setPasswordMatcher] = useState(false);

  // used to set focus to certain input fields
  const passInvalidRef = useRef<HTMLInputElement>(null);
  const passNoMatchRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        password.length < 8) {
      if (passInvalidRef.current !== null) {
        passInvalidRef.current.focus();
        return;
      }
    } else if (password !== confirmPassword) {
        if (passNoMatchRef.current !== null) {
          passNoMatchRef.current.focus();
        }
        return;
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
        ref={passInvalidRef}
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
        ref={passNoMatchRef}
      />

      {passwordMatcher &&
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