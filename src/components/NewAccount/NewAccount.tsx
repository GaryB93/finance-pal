import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import './NewAccount.css';

const NewAccount = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [passwordTooltip, setPasswordTooltip] = useState(false);
  const [password2Tooltip, setPassword2Tooltip] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [hasQuestion, setHasQuestion] = useState(true);

  const [has8Chars, setHas8Chars] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNum, setHasNum] = useState(false);

  const passwordRef = useRef(null);

  const questions = [
    "-- select an option --",
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What was the make and model of your first car?",
  ];

  useEffect(() => {
    setHas8Chars(password.length >= 8 ? true : false);
    setHasUppercase(/[A-Z]/.test(password) ? true : false);
    setHasNum(/\d/.test(password) ? true : false);
  }, [password]);

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword ? true : false);
  },[password, confirmPassword]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if(!has8Chars || !hasUppercase || !hasNum) {
      passwordRef.current.focus();
    }
    setUsernameTaken(true);
    setHasQuestion(false);
  };

  return (
    <form id='signup' onSubmit={handleSignup}>
      <h1>Sign up</h1>
      <label htmlFor='username'>Username</label>
      <input id='username' type='text'
        value={username} required
        onChange={(e)=>{setUsername(e.target.value)}}/>
      
      <label htmlFor='password'>Password</label>
      <input id='password' type='password'
        value={password} required
        ref={passwordRef}
        onFocus={() => setPasswordTooltip(true)}
        onBlur={() => setPasswordTooltip(false)}
        onChange={(e)=>{setPassword(e.target.value)}}/>

      {passwordTooltip &&
        <p id='password-validator'>
          Password must contain at least 8 characters 
          {has8Chars ?
            <IconContext.Provider value={{color: 'green'}}>
              <FaCheck/>  
            </IconContext.Provider>
            :
            <IconContext.Provider value={{color: 'red'}}>
              <CgClose/>  
            </IconContext.Provider>
          }<br/>
          Password must contain an uppercase letter
          {hasUppercase ?
            <IconContext.Provider value={{color: 'green'}}>
              <FaCheck/>  
            </IconContext.Provider>
            :
            <IconContext.Provider value={{color: 'red'}}>
              <CgClose/>  
            </IconContext.Provider>
          }<br/>
          Password must contain a number
          {hasNum ?
            <IconContext.Provider value={{color: 'green'}}>
              <FaCheck/>  
            </IconContext.Provider>
            :
            <IconContext.Provider value={{color: 'red'}}>
              <CgClose/>  
            </IconContext.Provider>
          }<br/>
        </p>
      }

      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input id='confirmPassword' type='password'
        value={confirmPassword} required
        onFocus={() => setPassword2Tooltip(true)}
        onBlur={() => setPassword2Tooltip(false)}
        onChange={(e)=>{setConfirmPassword(e.target.value)}}/>

      {password2Tooltip &&
        <p id='password-message'>
          Passwords {!passwordsMatch && <span>do not</span>} match
          {passwordsMatch ?
            <IconContext.Provider value={{ color: 'green'}}>
              <FaCheck/>
            </IconContext.Provider>
            :
            <IconContext.Provider value={{ color: 'red'}}>
              <CgClose/>
            </IconContext.Provider>
          }
        </p>
      }
      
      <label htmlFor='securityQuestion'>Security Question</label>
      <select id='securityQuestion' value={question}
        onChange={(e)=>{setQuestion(e.target.value)}}>
        <option value={questions[0]}>{questions[0]}</option>
        <option value={questions[1]}>{questions[1]}</option>
        <option value={questions[2]}>{questions[2]}</option>
        <option value={questions[3]}>{questions[3]}</option>
      </select>

      <label htmlFor='securityAnswer'>Answer</label>
      <input id='securityAnswer' type='text'
        value={answer} required
        onChange={(e)=>{setAnswer(e.target.value)}}/>

      { usernameTaken &&
        <p className='error-message'>
          Sorry, that username is already taken
        </p>
      }

      { !hasQuestion &&
        <p className='error-message'>
          Please select a security question
        </p>
      }

      <button type='submit' className='primaryBtn'>Sign up</button>
      
      <p>
        Back to <Link to={'/'}>Login</Link>
      </p>
    </form>
  )
};

export default NewAccount;