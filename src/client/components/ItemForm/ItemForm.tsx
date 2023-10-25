import { useState } from "react";
import { Item } from "../../reducers/financeReducer";
import { categories } from "../../constants/categories";
import './ItemForm.css';

const ItemForm = ({ item, handleSubmit }: { item: Item | null, handleSubmit: () => void }) => {
  const [inputs, setInputs] = useState({
    description: item?.description || '',
    category: item?.category || '',
    amount: item?.amount || 0,
    date: item?.date || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value
    });
    console.log(e.target.value);
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
        onClick={() => handleSubmit(item?._id, inputs)}>
        Save
      </button>
    </form>
  );
};

export default ItemForm;