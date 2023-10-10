import { useState } from 'react';

interface Styles {
  backgroundColor?: string;
  color?: string;
  display?: string;
  padding?: string;
  alignItems?: string;
  borderRadius?: string;
  border?: string,
  maxWidth?: string,
  margin?: string,
}

interface Option {
  value: string;
  text: string;
}

interface SelectProps {
  label: string;
  options: Array<Option>;
  selected: string;
  styles?: Styles;
}

const Select = ({ label, options, selected, styles }: SelectProps) => {
  const [picked, setPicked] = useState('');

  const defaultStyles: Styles = {
    backgroundColor: '#f1f1f1',
    color: '#787878',
    display: 'flex',
    padding: '0 5px',
    alignItems: 'center',
    borderRadius: '10px',
    border: '1px solid #ababab',
    maxWidth: '300px',
  }

  const newStyles = Object.assign(defaultStyles, styles);

  return (
    <div className='custom-select' style={newStyles}>
      <label htmlFor='select' style={{padding: '0 10px 0 5px'}}>{label}</label>
      <select id='select'
        style={{
          flex: 1,
          textAlign: 'center',
          border: 'none',
          borderLeft: newStyles.border,
          background: 'none',
          color: newStyles.color,
        }}>
        {options.map(option =>
          <option value={option.value}>{option.text}</option>
        )}
      </select>
    </div>
  )
};

export default Select;