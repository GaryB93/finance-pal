import { IconContext } from 'react-icons';
import { FaCheck } from 'react-icons/fa';

const PasswordRequirements = ({ password }: {password: string}): JSX.Element => {

  return (
    <div id='password-requirements' role='alert'
      style={{
        textAlign: 'left',
        fontSize: '.8rem',
        margin: 0,
        padding: '.2rem'
      }}>
      {/[A-Z]/.test(password) ?
        <IconContext.Provider value={{color: 'green'}}>
          <FaCheck/>
        </IconContext.Provider>
        :
        <IconContext.Provider value={{color: 'gray'}}>
          <FaCheck/>
        </IconContext.Provider>
      }
      <span style={{ marginLeft: '5px'}}>Uppercase</span><br/>

      {/[a-z]/.test(password) ?
        <IconContext.Provider value={{color: 'green'}}>
          <FaCheck/>
        </IconContext.Provider>
        :
        <IconContext.Provider value={{color: 'gray'}}>
          <FaCheck/>
        </IconContext.Provider>
      }
      <span style={{ marginLeft: '5px'}}>Lowercase</span><br/>
    
      {/\d/.test(password) ?
        <IconContext.Provider value={{color: 'green'}}>
          <FaCheck/>
        </IconContext.Provider>
        :
        <IconContext.Provider value={{color: 'gray'}}>
          <FaCheck/>
        </IconContext.Provider>
      }
      <span style={{ marginLeft: '5px'}}>Number</span><br/>

      {password.length >= 8 ?
        <IconContext.Provider value={{color: 'green'}}>
          <FaCheck/>
        </IconContext.Provider>
        :
        <IconContext.Provider value={{color: 'gray'}}>
          <FaCheck/>
        </IconContext.Provider>
      }
      <span style={{ marginLeft: '5px'}}>8+ characters</span><br/>
    </div>
  )
};

export default PasswordRequirements;