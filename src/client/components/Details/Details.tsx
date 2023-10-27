import { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks";
import { months } from "../../constants/months";
import { filterItems } from "../../utils/filterItems";
import DetailsList from "./DetailsList";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import ItemForm from "../ItemForm";
import './Details.css';

const Details = (): JSX.Element => {
  const incomes = useAppSelector(state => state.finance.incomes);
  const expenses = useAppSelector(state => state.finance.expenses);
  const month = useAppSelector(state => state.finance.month);
  const year = useAppSelector(state => state.finance.year);
  // const dispatch = useAppDispatch();
  const [type, setType] = useState('expenses');
  const [selectedItem, setSelectedItem] = useState({
    _id: '',
    description: '',
    category: '',
    amount: 0,
    date: '',
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredIncome = useMemo(() =>
    filterItems(incomes, month, year), [incomes, month, year]);
  const filteredExpenses = useMemo(() =>
    filterItems(expenses, month, year), [expenses, month, year]);

  const handleDetails = () => {
    console.log('here');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='details'>
      <h1>{months[Number.parseInt(month)]} {year}</h1>
      <div className='selection'>
        <button onClick={() => setType('income')}>Income</button>
        <button onClick={() => setType('expenses')}>Expenses</button>
      </div>
      { type === 'expenses' &&
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
      <div>
        <Link to='/summary'>Back</Link>
        <button className='primary-btn' onClick={() => setModalOpen(true)}>Add Item</button>
      </div>
      <Modal
        isOpen={isModalOpen}
        hasCloseBtn={true}
        onClose={handleCloseModal}
      >
        <ItemForm item={selectedItem} handleSubmit={handleDetails}/>
      </Modal>
      <p>{selectedItem.description}</p>
    </div>
  );
};

export default Details;