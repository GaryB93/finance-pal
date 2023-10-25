import { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks";
import { months } from "../../constants/months";
import { filterItems } from "../../utils/filterItems";
import './Details.css';
import DetailsList from "./DetailsList";
import { Link } from "react-router-dom";

const Details = (): JSX.Element => {
  const incomes = useAppSelector(state => state.finance.incomes);
  const expenses = useAppSelector(state => state.finance.expenses);
  const month = useAppSelector(state => state.finance.month);
  const year = useAppSelector(state => state.finance.year);
  // const dispatch = useAppDispatch();
  const [selection, setSelection] = useState('expenses');

  const filteredIncome = useMemo(() =>
    filterItems(incomes, month, year), [incomes, month, year]);
  const filteredExpenses = useMemo(() =>
    filterItems(expenses, month, year), [expenses, month, year]);

  return (
    <div className='details'>
      <h1>{months[Number.parseInt(month)]} {year}</h1>
      <div className='selection'>
        <button onClick={() => setSelection('income')}>Income</button>
        <button onClick={() => setSelection('expenses')}>Expenses</button>
      </div>
      {selection === 'expenses' && <DetailsList items={filteredExpenses}/>}
      {selection === 'income' && <DetailsList items={filteredIncome}/>}
      <p>
        Select an item to edit
      </p>
      <div>
        <Link to='/summary'>Back</Link>
        <button>Add Item</button>
      </div>
    </div>
  );
};

export default Details;