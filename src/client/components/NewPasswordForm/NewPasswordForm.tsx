import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PasswordRequirements from "../PasswordRequirements/PasswordRequirements";
import { IconContext } from 'react-icons';
import { FaCheck } from 'react-icons/fa';
import Modal from "../Modal/Modal";
import { logout, verifiedUser } from '../../reducers/userReducer';
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoints";
import './NewPasswordForm.css';

const NewPasswordForm = (): JSX.Element => {
  // form inputs
  const [inputs, setInputs] = useState({
    username: '',
    question: '',
    answer: '',
    password: '',
    confirmPassword: '',
  });

  // stages to conditionally render next steps in form process
  const [enterAnswer, setEnterAnswer] = useState(false);
  const [enterNewPassword, setEnterNewPassword] = useState(false);

  // conditionally render error messages
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidAnswer, setInValidAnswer] = useState(false);

  // displays password tootips
  const [passwordReq, setPasswordReq] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  // modal display
  const [isModalOpen, setModalOpen] = useState(false);

  // used to set focus to certain input fields
  const passwordReqRef = useRef<HTMLInputElement>(null);
  const passMatchRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.userId);

  const verifyUser = () => {
    axios({
      method: 'get',
      url: ENDPOINTS.GET_SECURITY_QUESTION + `/${inputs.username}`,
    })
    .then(res => {
      if (res.data.userId) {
        dispatch(verifiedUser({
          userId: res.data.userId,
          username: res.data.username,
        }));
        setInputs({
          ...inputs,
          question: res.data.question
        });
        setEnterAnswer(true);
      } else {
        setInvalidUser(true);
      }
    })
    .catch(err => {
      console.error(err);
    });
  };

  const checkAnswer = () => {
    axios({
      method: 'post',
      url: ENDPOINTS.CHECK_SECURITY_ANSWER,
      data: {
        userId: userId,
        answer: inputs.answer,
      },
    })
    .then(res => {
      if (res.data === 'answer is correct') {
        setEnterNewPassword(true);
      } else {
        setInValidAnswer(true);
      }
    })
    .catch(err => {
      console.error(err);
    })
  };

  const changePassword = () => {
    const { password, confirmPassword } = inputs;
    if (!/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        password.length < 8) {
      if (passwordReqRef.current) {
        passwordReqRef.current.focus();
      }
    } else if (password !== confirmPassword) {
        if (passMatchRef.current) {
          passMatchRef.current.focus();
        }
    } else {
      axios({
        method: 'put',
        url: ENDPOINTS.CHANGE_PASSWORD,
        data: {
          userId,
          password,
        },
      })
      .then(res => {
        if (res.data === 'success') {
          setModalOpen(true);
        }
      })
      .catch(err => {
        console.error(err);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enterNewPassword) {
      changePassword();
    } else if (enterAnswer) {
      checkAnswer();
    } else {
      verifyUser();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    dispatch(logout);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidUser(false);
    setInValidAnswer(false);
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value
    });
  };

  return (
    <>
      <form className='change-password-form' onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={inputs.username}
          autoComplete='off'
          required
          readOnly={enterAnswer}
          onChange={handleChange}
        />

        { invalidUser &&
          <p className='error-message' role='alert'>
            There is no account registered with the username entered
          </p> }

        { enterAnswer &&
          <>
            <label htmlFor='question'>Security Question</label>
            <textarea id='question' readOnly value={inputs.question}
              style={{
                fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                fontSize: '1rem',
                background: 'none',
                padding: '0.5rem',
                resize: 'none',
                border: 'none',
              }}
            />
            <label htmlFor='answer'>Answer</label>
            <input
              id='answer'
              type='password'
              value={inputs.answer}
              required
              readOnly={enterNewPassword}
              onChange={handleChange}
            />
            { invalidAnswer &&
              <p className='error-message' role='alert'>
                The answer you provided is incorrect
              </p>
            }
          </>
        }
        { enterNewPassword &&
          <>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              value={inputs.password}
              required
              onChange={handleChange}
              onFocus={() => setPasswordReq(true)}
              onBlur={() => setPasswordReq(false)}
              ref={passwordReqRef}
            />

            { passwordReq && <PasswordRequirements password={inputs.password} />}

            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              type='password'
              value={inputs.confirmPassword}
              required
              onChange={handleChange}
              onFocus={() => setPasswordMatch(true)}
              onBlur={() => setPasswordMatch(false)}
              ref={passMatchRef}
            />

            { passwordMatch &&
              <div id='password-match' role='alert'>
                {inputs.password === inputs.confirmPassword ?
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
          </>
        }
        <button type='submit' className='primary-btn'>Submit</button>
        <p>
          Back to <Link to={'/'}>Login</Link>
        </p>
      </form>
      <Modal
        isOpen={isModalOpen}
        hasCloseBtn={true}
        onClose={handleCloseModal}
      >
        <p>
          Password successfully changed. You will now be redirected to the login page.
        </p>
      </Modal>
    </>
  )
};

export default NewPasswordForm;