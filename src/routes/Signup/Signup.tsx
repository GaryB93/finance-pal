import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { CgCloseO } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import './Signup.css';

const Signup = (): JSX.Element => {
  const defaultOption = '-- select an option --'
  const options = [
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What was the make and model of your first car?",
  ];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [question, setQuestion] = useState(defaultOption);
  const [answer, setAnswer] = useState('');

  const [passwordTooltip, setPasswordTooltip] = useState(false);
  const [has8Chars, setHas8Chars] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNum, setHasNum] = useState(false);

  const [password2Tooltip, setPassword2Tooltip] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [usernameTaken, setUsernameTaken] = useState(false);
  const [hasQuestion, setHasQuestion] = useState(true);

  const passInvalidRef = useRef<HTMLInputElement>(null);
  const passNoMatchRef = useRef<HTMLInputElement>(null);

  // check for valid password entered
  useEffect(() => {
    setHas8Chars(password.length >= 8 ? true : false);
    setHasUppercase(/[A-Z]/.test(password) ? true : false);
    setHasNum(/\d/.test(password) ? true : false);
  }, [password]);

  // check if passwords match
  useEffect(() => {
    setPasswordsMatch(password === confirmPassword ? true : false);
  },[password, confirmPassword]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if(!has8Chars || !hasUppercase || !hasNum) {
      if (passInvalidRef.current !== null) {
        passInvalidRef.current.focus();
        return;
      }
    } else if(!passwordsMatch) {
      if (passNoMatchRef.current !== null) {
        passNoMatchRef.current.focus();
        return;
      }
    } else if(question === defaultOption) {
        setHasQuestion(false);
        return;
    } else {
      console.log('do stuff here');
    }
  };

  return (
    <form id='signup' onSubmit={handleSignup}>
      <h1>Sign up</h1>
      <label htmlFor='username'>Username</label>
      <input id='username' type='text' value={username} required
        onChange={(e)=>{setUsername(e.target.value)}}
      />
      
      <label htmlFor='password'>Password</label>
      <input id='password' type='password' value={password} required
        ref={passInvalidRef}
        onFocus={() => setPasswordTooltip(true)}
        onBlur={() => setPasswordTooltip(false)}
        onChange={(e)=>{setPassword(e.target.value)}}
      />

      {passwordTooltip &&
        <p id='password-validator' data-testid='tooltip1'>
          <span>Password must contain at least 8 characters</span>
          {has8Chars ?
            <IconContext.Provider value={{color: 'green'}}>
              <FaCheck/>  
            </IconContext.Provider>
            :
            <IconContext.Provider value={{color: 'red'}}>
              <CgCloseO/>  
            </IconContext.Provider>
          }<br/>
          <span>Password must contain an uppercase letter</span>
          {hasUppercase ?
            <IconContext.Provider value={{color: 'green'}}>
              <FaCheck/>  
            </IconContext.Provider>
            :
            <IconContext.Provider value={{color: 'red'}}>
              <CgCloseO/>  
            </IconContext.Provider>
          }<br/>
          <span>Password must contain a number</span>
          {hasNum ?
            <IconContext.Provider value={{color: 'green'}}>
              <FaCheck/>  
            </IconContext.Provider>
            :
            <IconContext.Provider value={{color: 'red'}}>
              <CgCloseO/>  
            </IconContext.Provider>
          }<br/>
        </p>
      }

      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input id='confirmPassword' type='password' value={confirmPassword} required
        ref={passNoMatchRef}
        onFocus={() => setPassword2Tooltip(true)}
        onBlur={() => setPassword2Tooltip(false)}
        onChange={(e)=>{setConfirmPassword(e.target.value)}}
      />

      {password2Tooltip &&
        <p id='password-message' data-testid='tooltip2'>
          <span>Passwords {!passwordsMatch && <span>do not</span>} match</span>
          {passwordsMatch ?
            <IconContext.Provider value={{ color: 'green'}}>
              <FaCheck/>
            </IconContext.Provider>
            :
            <IconContext.Provider value={{ color: 'red'}}>
              <CgCloseO/>
            </IconContext.Provider>
          }
        </p>
      }
      
      <label htmlFor='securityQuestion'>Security Question</label>
      <select id='securityQuestion' value={question}
        onChange={(e)=>{setQuestion(e.target.value)}}>
        <option value={defaultOption}>{defaultOption}</option>
        {options.map((question, idx) => 
          <option key={idx} value={question}>
            {question}
          </option>
        )}
      </select>

      <label htmlFor='securityAnswer'>Answer</label>
      <input id='securityAnswer' type='text' value={answer} required
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

export default Signup;