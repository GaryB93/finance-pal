import { useState } from 'react';
import { Link } from 'react-router-dom';

const NewAccount = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ retypedPassword, setRetypedPassword ] = useState('');
  const [ question, setQuestion ] = useState('');
  const [ answer, setAnswer ] = useState('');

  const questions = [
    "-- select an option --",
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What was the make and model of your first car?",
  ];

  return (
    <form>
      <label htmlFor='username'>Username</label>
      <input name='username' id='username' type='text'
        value={username} required
        onChange={(e)=>{setUsername(e.target.value)}}/>
      
      <label htmlFor='password'>Password</label>
      <input name='password' id='password' type='password'
        value={password} required
        onChange={(e)=>{setPassword(e.target.value)}}/>

      <label htmlFor='retypedPassword'>Confirm Password</label>
      <input name='retypedPassword' id='retyped-password' type='password'
        value={retypedPassword} required
        onChange={(e)=>{setRetypedPassword(e.target.value)}}/>
      
      <label htmlFor='securityQuestion'>Security Question</label>
      <select name='securityQuestion' id='security-question' value={question}
        onChange={(e)=>{setQuestion(e.target.value)}}>
        <option value={0}>{questions[0]}</option>
        <option value={1}>{questions[1]}</option>
        <option value={2}>{questions[2]}</option>
        <option value={3}>{questions[3]}</option>
      </select>

      <label htmlFor='securityAnswer'>Answer</label>
      <input name='securityAnswer' id='security-answer' type='text'
        value={answer} required
        onChange={(e)=>{setAnswer(e.target.value)}}/>

      <button type='submit'>Create Account</button>
      <span>or</span>
      <Link to={'/'}>Back to Login</Link>
    </form>
  )
};

export default NewAccount;