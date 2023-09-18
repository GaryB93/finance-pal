import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SecurityQuestion = (): JSX.Element => {
  const [answer, setAnswer] = useState('');
  const [inValidAnswer, setInValidAnswer] = useState(false);

  const {state} = useLocation();
  const [question, validAnswer] = state;

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer !== validAnswer) {
      setInValidAnswer(true);
      return;
    }
    navigate('/new_password');
  };

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h1>FinancePal</h1>
      <label htmlFor='question'>Security Question</label>
      <input type='textbox' id='question' value={question} readOnly/>

      <label htmlFor='answer'>Answer</label>
      <input type='textbox' id='answer' value={answer} required
        onChange={(e)=>{setAnswer(e.target.value)}}/>

      {inValidAnswer &&
        <p className='error-message'>
          The answer you provided is incorrect  
        </p>
      }

      <button type='submit' className='primaryBtn'>Submit</button>
      <p>
        Back to <Link to={'/'}>Login</Link>
      </p>
    </form>
  )
};

export default SecurityQuestion;