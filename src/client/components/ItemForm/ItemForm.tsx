import { useState, useEffect } from "react";
import { Item } from "../../reducers/financeReducer";
import { categories } from "../../constants/categories";
import { formatDate } from "../../utils/formatDate";
import './ItemForm.css';

const ItemForm = ({ item, handleSaveItem }:
  { item: Item, handleSaveItem: (item: Item) => void }) => {
  const [inputs, setInputs] = useState({
    _id: item._id,
    description: item.description,
    category: item.category,
    amount: item.amount,
    date: formatDate(new Date(item.date)),
  });

  useEffect(() => {
    setInputs({
      ...item,
      date: formatDate(new Date(item.date)),
    });
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate and sanitize user inputs
    handleSaveItem(inputs);
  };

  return (
    <form id='item-form'>
      <h1>Item Details</h1>
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
        {categories.map(category =>
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