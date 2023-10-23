import { useEffect } from 'react';
import DoughnutChart from "../DoughnutChart";
import Menu from '../Menu';
import './Summary.css';
import axios from 'axios';
import { ENDPOINTS } from '../../constants/endpoints';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { financesFetched } from '../../reducers/financeReducer';
import { months } from '../../constants/months';
import { generateYears } from '../../utils/generateYears';
import { calculateTotals } from '../../utils/calculateTotals';
import { monthSelected, yearSelected } from '../../reducers/financeReducer';

const Summary = () => {
  const userId = useAppSelector(state => state.user.userId);
  const created = useAppSelector(state => state.user.created);
  const incomes = useAppSelector(state => state.finance.incomes);
  const expenses = useAppSelector(state => state.finance.expenses);
  const month = useAppSelector(state => state.finance.month);
  const year = useAppSelector(state => state.finance.year);
  const dispatch = useAppDispatch();
  
  const years = generateYears(created);
  const totalIncome = calculateTotals(incomes, year, month);
  const totalExpenses = calculateTotals(expenses, year, month);

  useEffect(() => {
    const today = new Date();
    dispatch(monthSelected(today.getMonth().toString()));
    dispatch(yearSelected(today.getFullYear().toString()));
  }, [dispatch]);

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

  return (
    <div className='summary'>
      <Menu />
      <div id='doughnut-container'>
        <DoughnutChart />
      </div>
      <div id='select'>
        <select 
          aria-label={'month'}
          value={month}
          onChange={(e) => {dispatch(monthSelected(e.target.value))}}
        >
          {
            months.map((month, idx) =>
              <option value={idx} key={month}>{month}</option>
            )
          }
        </select>
        <select
          aria-label={'year'}
          value={year}
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
        <span>{(totalIncome - totalExpenses).toFixed(2)}</span>
      </div>
      <div className={'bottom'}>
        <button>Locked</button>
        <button>Edit</button>
      </div>
    </div>
  )
};

export default Summary;