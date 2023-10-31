import { useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { months } from "../../constants/months";
import { filterItems } from "../../utils/filterItems";
import DetailsList from "../../components/DetailsList";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import ItemForm from "../../components/ItemForm";
import { Item, financesFetched } from "../../reducers/financeReducer";
import { ENDPOINTS } from "../../constants/endpoints";
import { expenseCategories, incomeCategories } from "../../constants/categories";
import axios from "axios";
import './Details.css';

const Details = (): JSX.Element => {
  const userId = useAppSelector(state => state.user.userId);
  const incomes = useAppSelector(state => state.finance.incomes);
  const expenses = useAppSelector(state => state.finance.expenses);
  const month = useAppSelector(state => state.finance.month);
  const year = useAppSelector(state => state.finance.year);
  const dispatch = useAppDispatch();
  const [type, setType] = useState('expense');
  const categories = type === 'expense' ? expenseCategories : incomeCategories;
  const [selectedItem, setSelectedItem] = useState({
    _id: '',
    description: '',
    category: categories[0],
    amount: 0,
    date: new Date().toISOString(),
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredIncome = useMemo(() =>
    filterItems(incomes, month, year), [incomes, month, year]);
  const filteredExpenses = useMemo(() =>
    filterItems(expenses, month, year), [expenses, month, year]);

  const handleSaveItem = (item: Item) => {
    axios({
      method: 'post',
      url: ENDPOINTS.SAVE_ITEM,
      data: {
        userId,
        type,
        item,
      }
    })
    .then(res => {
      dispatch(financesFetched(res.data));
      handleCloseModal();
    })
    .catch(err => {
      console.error(err);
    });
  };

  const handleCloseModal = () => {
    setSelectedItem({
      _id: '',
      description: '',
      category: categories[0],
      amount: 0,
      date: new Date().toISOString(),
    })
    setModalOpen(false);
  };

  return (
    <div className='details'>
      <h1>{months[Number.parseInt(month)]} {year}</h1>
      <div className='selection'>
        <button
          disabled={type === 'income'}
          onClick={() => setType('income')}>Income</button>
        <button
          disabled={type === 'expense'}
          onClick={() => setType('expense')}>Expenses</button>
      </div>
      { type === 'expense' &&
        <DetailsList
          items={filteredExpenses}
          setSelectedItem={setSelectedItem}
          setModalOpen={setModalOpen}
        />
      }
      { type === 'income' &&
        <DetailsList
          items={filteredIncome}
          setSelectedItem={setSelectedItem}
          setModalOpen={setModalOpen}
        />
      }
      <p>
        Select an item to edit
      </p>
      <div className='nav-btns'>
        <Link to='/summary' className='secondary-btn'>Back</Link>
        <button className='primary-btn' onClick={() => setModalOpen(true)}>Add Item</button>
      </div>
      <Modal
        isOpen={isModalOpen}
        hasCloseBtn={true}
        onClose={handleCloseModal}
      >
        <ItemForm item={selectedItem} handleSaveItem={handleSaveItem} type={type}/>
      </Modal>
    </div>
  );
};

export default Details;