import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../../constants/endpoints';
import { useAppSelector } from '../../hooks';
import axios from 'axios';

const SecurityQuestion = (): JSX.Element => {
  const [answer, setAnswer] = useState('');
  const [inValidAnswer, setInValidAnswer] = useState(false);
  const userId = useAppSelector(state => state.user.userId);

  const { state } = useLocation();
  const { question } = state;

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: ENDPOINTS.CHECK_SECURITY_ANSWER,
      data: {
        userId: userId,
        answer: answer,
      },
    })
    .then(res => {
      if (res.data === 'answer is correct') {
        navigate('/new_password');
      } else {
        setInValidAnswer(true);
      }
    })
    .catch(err => {
      console.error(err);
    });
  };

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h1>FinancePal</h1>
      <label htmlFor='question'>Security Question</label>
      <input
        id='question'
        type='textbox'
        value={question}
        readOnly
      />

      <label htmlFor='answer'>Answer</label>
      <input
        id='answer'
        type='textbox'
        value={answer}
        autoFocus
        required
        onChange={(e)=>{
          setInValidAnswer(false);
          setAnswer(e.target.value);
        }}
      />

      { inValidAnswer &&
        <p className='error-message' role='alert'>
          The answer you provided is incorrect  
        </p> }

      <button type='submit' className='primaryBtn'>Submit</button>
      <p>
        Back to <Link to={'/'}>Login</Link>
      </p>
    </form>
  )
};

export default SecurityQuestion;