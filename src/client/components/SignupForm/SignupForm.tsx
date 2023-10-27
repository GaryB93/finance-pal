import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useAppDispatch } from '../../hooks';
import { login } from '../../reducers/userReducer';
import PasswordRequirements from '../PasswordRequirements/PasswordRequirements';
import axios from 'axios';
import { ENDPOINTS } from '../../constants/endpoints';
import { securityQuestions } from '../../constants/securityQuestions';
import './SignupForm.css';

/**
 * TODO: Change password tooltip icons to checkboxes for accessibility?
 */

const SignupForm = (): JSX.Element => {
  
  // form input fields
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    question: securityQuestions[0],
    answer: '',
  });

  // displays password tooltips
  const [passwordReq, setPasswordReq] = useState(false);
  const [passwordMatcher, setPasswordMatcher] = useState(false);

  // displays error messages
  const [errorMsg, setErrorMsg] = useState({
    username: false,
    question: false,
  });

  // used to set focus to certain input fields
  const passInvalidRef = useRef<HTMLInputElement>(null);
  const passNoMatchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      username,
      password,
      confirmPassword,
      question,
      answer
    } = form;

    if (!/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        password.length < 8) {
      if (passInvalidRef.current !== null) {
        passInvalidRef.current.focus();
      }
    } else if(password !== confirmPassword) {
      if (passNoMatchRef.current !== null) {
        passNoMatchRef.current.focus();
      }
    } else if(question === securityQuestions[0]) {
        setErrorMsg({
          ...errorMsg,
          question: true,
        });
    } else {
      axios({
        method: 'post',
        url: ENDPOINTS.SIGN_UP, 
        data: {
         username,
         password,
         question,
         answer,
        },
      })
      .then(res => {
        if (res.data.userId) {
          dispatch(login({
            userId: res.data.userId,
            username: res.data.username,
            created: res.data.created,
          }));
          navigate('/summary');
        } else {
          setErrorMsg({
            ...errorMsg,
            username: true,
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className='signup-form' onSubmit={handleSignup}>
      <h1>Sign up</h1>
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        name='username'
        type='text'
        autoFocus
        autoComplete='off'
        required
        value={form.username}
        onChange={(e) => {
          setErrorMsg({
            ...errorMsg,
            username:false,
          });
          handleChange(e);
        }}
      />

      { errorMsg.username &&
        <p className='error-message' role='alert'>
          Sorry, that username is already taken
        </p> }
      
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        name='password'
        type='password'
        required
        value={form.password}
        onChange={handleChange}
        onFocus={()=>setPasswordReq(true)}
        onBlur={()=>setPasswordReq(false)}
        ref={passInvalidRef}
      />

      { passwordReq && <PasswordRequirements password={form.password}/> }

      <label htmlFor='confirm-password'>Confirm Password</label>
      <input
        id='confirm-password'
        name='confirmPassword'
        type='password'
        required
        value={form.confirmPassword}
        onChange={handleChange}
        onFocus={() => setPasswordMatcher(true)}
        onBlur={() => setPasswordMatcher(false)}
        ref={passNoMatchRef}
      />

      {passwordMatcher &&
        <div id='password-match' role='alert'>
          {form.password === form.confirmPassword ?
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
      <select
        id='security-question'
        name='question'
        value={form.question}
        onChange={(e) => {
          setErrorMsg({
            ...errorMsg,
            question: false,
          });
          handleChange(e);
        }}
      >
        {securityQuestions.map((question, idx) =>
          <option key={idx} value={question}>
            {question}
          </option>
        )}
      </select>

      { errorMsg.question &&
        <p className='error-message' role='alert'>
          Please select a security question
        </p>
      }

      <label htmlFor='securityAnswer'>Answer</label>
      <input
        id='securityAnswer'
        name='answer'
        type='text'
        autoComplete='off'
        required
        value={form.answer}
        onChange={handleChange}
      />

      <button type='submit' className='primary-btn'>Sign up</button>
      
      <p>
        Back to <Link to={'/'}>Login</Link>
      </p>
    </form>
  )
};

export default SignupForm;