import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Item, financesFetched } from "../../reducers/financeReducer";
import { expenseCategories, incomeCategories } from "../../constants/categories";
import { formatDate } from "../../utils/formatDate";
import { addTimeZoneOffset } from "../../utils/addTimeZoneOffset";
import { ENDPOINTS } from "../../constants/endpoints";
import axios from "axios";
import './ItemForm.css';

interface ItemFormProps {
  item: Item;
  type: string;
  handleCloseModal: () => void;
}

const ItemForm = ({ item, type, handleCloseModal }: ItemFormProps ) => {
  const [inputs, setInputs] = useState({
    _id: item._id,
    description: item.description,
    category: item.category,
    amount: item.amount.toString(),
    date: formatDate(new Date(item.date)),
  });
  const [errMessage, setErrMessage] = useState('');
  const userId = useAppSelector(state => state.user.userId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInputs({
      ...item,
      date: formatDate(new Date(item.date)),
      amount: item.amount.toString(),
    });
  }, [item]);
  
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
    } else if (Number.parseFloat(inputs.amount) <= 0 || inputs.amount.length < 1) {
      setErrMessage('Please enter an amount greater than 0');
    } else {
      axios({
        method: 'post',
        url: ENDPOINTS.SAVE_ITEM,
        data: {
          userId,
          type,
          item: {
            ...inputs,
            date: addTimeZoneOffset(new Date(inputs.date)),
            description: inputs.description.trim(),
            amount: Number.parseFloat(inputs.amount),
          }
        }
      }).then(res => {
        dispatch(financesFetched(res.data));
        handleCloseModal();
      }).catch(err => {
        console.error(err);
      });
    }
  };
  
  const handleDelete = () => {
    axios({
      method: 'delete',
      url: ENDPOINTS.DELETE_ITEM + `${item._id}`,
      data: {
        userId: userId,
      }
    }).then(res => {
      dispatch(financesFetched(res.data));
      handleCloseModal();
    }).catch(err => {
      console.error(err);
    });
  };

  const categories = type === 'expense' ? expenseCategories : incomeCategories;
  
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

      <div>
        { item._id !== '' &&
          <button
            className='warning-btn'
            type='button'
            onClick={handleDelete}>
            Delete
          </button>
        }
        <button
          className='primary-btn'
          type='submit'
          onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
  );
};

export default ItemForm;