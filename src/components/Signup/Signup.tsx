import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useAppDispatch } from '../../hooks';
import { login } from '../../reducers/userReducer';
import PasswordRequirements from '../PasswordRequirements/PasswordRequirements';
import './Signup.css';

const Signup = (): JSX.Element => {
  const options = [
    '-- select an option --',
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What was the make and model of your first car?",
  ];
  
  // form input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [question, setQuestion] = useState(options[0]);
  const [answer, setAnswer] = useState('');

  // displays password tooltips
  const [passwordReq, setPasswordReq] = useState(false);
  const [passwordMatcher, setPasswordMatcher] = useState(false);

  // displays error messages
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [hasQuestion, setHasQuestion] = useState(true);

  // used to set focus to certain input fields
  const passInvalidRef = useRef<HTMLInputElement>(null);
  const passNoMatchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        password.length < 8) {
      if (passInvalidRef.current !== null) {
        passInvalidRef.current.focus();
        return;
      }
    } else if(password !== confirmPassword) {
      if (passNoMatchRef.current !== null) {
        passNoMatchRef.current.focus();
        return;
      }
    } else if(question === options[0]) {
        setHasQuestion(false);
        return;
    } else {
      dispatch(login({ userID: '111', username }));
      navigate('/summary');
    }
  };

  return (
    <form className='login' onSubmit={handleSignup}>
      <h1>FinancePal</h1>
      <label htmlFor='username'>Username</label>
      <input id='username'
        type='text'
        value={username}
        required
        onChange={(e)=>{setUsername(e.target.value)}}
      />

      { usernameTaken &&
        <p className='error-message'>
          Sorry, that username is already taken
        </p> }
      
      <label htmlFor='password'>Password</label>
      <input id='password'
        type='password'
        value={password}
        required
        onChange={(e)=>{setPassword(e.target.value)}}
        onFocus={()=>setPasswordReq(true)}
        onBlur={()=>setPasswordReq(false)}
        ref={passInvalidRef}
      />

      { passwordReq && <PasswordRequirements password={password}/> }

      <label htmlFor='confirm-password'>Confirm Password</label>
      <input id='confirm-password'
        type='password'
        value={confirmPassword}
        required
        onChange={(e)=>{setConfirmPassword(e.target.value)}}
        onFocus={() => setPasswordMatcher(true)}
        onBlur={() => setPasswordMatcher(false)}
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
      
      <label htmlFor='security-question'>Security Question</label>
      <select id='security-question'
        value={question}
        onChange={(e)=>{setQuestion(e.target.value)}}>
          {options.map((question, idx) => 
            <option key={idx} value={question}>
              {question}
            </option>
          )}
      </select>

      { !hasQuestion &&
        <p className='error-message' role='alert'>
          Please select a security question
        </p>
      }

      <label htmlFor='securityAnswer'>Answer</label>
      <input id='securityAnswer'
        type='text'
        value={answer}
        required
        onChange={(e)=>{setAnswer(e.target.value)}}
      />

      <button type='submit' className='primaryBtn'>Sign up</button>
      
      <p>
        Back to <Link to={'/'}>Login</Link>
      </p>
    </form>
  )
};

export default Signup;