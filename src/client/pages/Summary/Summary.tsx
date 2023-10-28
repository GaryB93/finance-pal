import { useEffect, useMemo } from 'react';
import DoughnutChart from "../../components/DoughnutChart";
// import Menu from '../Menu';
import './Summary.css';
import axios from 'axios';
import { ENDPOINTS } from '../../constants/endpoints';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { financesFetched } from '../../reducers/financeReducer';
import { months } from '../../constants/months';
import { generateYears } from '../../utils/generateYears';
import { calculateTotal } from '../../utils/calculateTotal';
import { filterItems } from '../../utils/filterItems';
import { monthSelected, yearSelected } from '../../reducers/financeReducer';
import { expenseCategories } from '../../constants/categories';
import { Link } from 'react-router-dom';

const Summary = (): JSX.Element => {
  const userId = useAppSelector(state => state.user.userId);
  const created = useAppSelector(state => state.user.created);
  const incomes = useAppSelector(state => state.finance.incomes);
  const expenses = useAppSelector(state => state.finance.expenses);
  const month = useAppSelector(state => state.finance.month);
  const year = useAppSelector(state => state.finance.year);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const controller = new AbortController();
    axios({
      method: 'get',
      url: ENDPOINTS.GET_FINANCE_DATA + `${userId}`,
      signal: controller.signal,
    })
    .then(res => {
      dispatch(financesFetched(res.data));
    })
    .catch(err => {
      console.error(err);
    });
    
    return () => {
      controller.abort();
    };
  }, [userId, dispatch]);
  
  const filteredIncome = useMemo(() =>
    filterItems(incomes, month, year), [incomes, month, year]);
  const filteredExpenses = useMemo(() =>
    filterItems(expenses, month, year), [expenses, month, year]);
  const totalIncome = calculateTotal(filteredIncome);
  const totalExpenses = calculateTotal(filteredExpenses);
  const total = (totalIncome - totalExpenses).toFixed(2);
  const years = generateYears(created);

  return (
    <div className='summary'>
      {/* <Menu /> */}
      <div id='doughnut-container'>
        <DoughnutChart categories={expenseCategories} items={filteredExpenses}/>
      </div>
      <div id='select'>
        <select aria-label={'month'} value={month} id='month-selector'
          onChange={(e) => {dispatch(monthSelected(e.target.value))}}
        >
          {
            months.map((month, idx) =>
              <option value={idx} key={month}>{month}</option>
            )
          }
        </select>
        <select aria-label={'year'} value={year} id='year-selector'
          onChange={(e) => {dispatch(yearSelected(e.target.value))}}>
          {
            years.map(year =>
              <option value={year} key={year}>{year}</option>
            )
          }
        </select>
      </div>
      <div className={'month-summaries'}>
        <span>Income:</span>
        <span>{totalIncome.toFixed(2)}</span>
      </div>
      <div className={'month-summaries'}>
        <span>Expense:</span>
        <span>{totalExpenses.toFixed(2)}</span>
      </div>
      <hr style={{ width: '90%'}}/>
      <div className={'month-summaries'}>
        <span>Total:</span>
        <span>{total}</span>
      </div>
      <div className={'bottom'}>
        <Link to='/details'>Edit</Link>
      </div>
    </div>
  )
};

export default Summary;