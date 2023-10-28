import { useState, useEffect } from "react";
import { Item } from "../../reducers/financeReducer";
import { expenseCategories, incomeCategories } from "../../constants/categories";
import { formatDate } from "../../utils/formatDate";
import './ItemForm.css';

const ItemForm = ({ item, handleSaveItem, type }:
  { item: Item, handleSaveItem: (item: Item) => void, type: string }) => {
  const [inputs, setInputs] = useState({
    _id: item._id,
    description: item.description,
    category: item.category,
    amount: item.amount,
    date: formatDate(new Date(item.date)),
  });
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setInputs({
      ...item,
      date: formatDate(new Date(item.date)),
    });
  }, [item]);

  const categories = type === 'expense' ? expenseCategories : incomeCategories;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setErrMessage('');
      setInputs({
      ...inputs,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputs.description === '') {
      setErrMessage('Please enter a description');
    } else if (inputs.amount <= 0) {
      setErrMessage('Please enter an amount greater than 0');
    } else {
      handleSaveItem({
        ...inputs,
        description: inputs.description.trim(),
      });
    }
  };

  return (
    <form id='item-form'>
      <h1>{type === 'expense' ? 'Expense' : 'Income'} Details</h1>
      <label htmlFor='description'>Description</label>
      <input
        id='description'
        type='text'
        autoComplete='off'
        value={inputs.description}
        onChange={handleChange}
      />

      <label htmlFor='category'>Category</label>
      <select
        id='category'
        value={inputs.category}
        onChange={handleChange}
      >
        { categories.map(category =>
            <option value={category} key={category}>{category}</option>
        )}
      </select>

      <label htmlFor='amount'>Amount</label>
      <input
        id='amount'
        className='remove-arrows'
        type='number'
        value={inputs.amount}
        onChange={handleChange}
      />

      <label htmlFor='date'>Date</label>
      <input
        id='date'
        type='date'
        value={inputs.date}
        onChange={handleChange}
      />

      { errMessage !== '' &&
        <p className='error-message' role='alert'>
          { errMessage }
        </p> }

      <button
        className='primary-btn'
        type='submit'
        onClick={handleSubmit}>
        Save
      </button>
    </form>
  );
};

export default ItemForm;