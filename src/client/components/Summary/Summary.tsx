import { useEffect, useState } from 'react';
import DoughnutChart from "../DoughnutChart";
import Menu from '../Menu';
import './Summary.css';
import axios from 'axios';
import { ENDPOINTS } from '../../constants/endpoints';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { financesFetched } from '../../reducers/financeReducer';
import { months } from '../../constants/months';

const Summary = () => {
  const userId = useAppSelector(state => state.user.userId);
  const incomes = useAppSelector(state => state.finance.incomes);
  const expenses = useAppSelector(state => state.finance.expenses);
  const [month, setMonth] = useState('');
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

  incomes.forEach(income => {
    console.log(typeof income.date);
    Date.parse(income.date)
  });

  return (
    <div className='summary'>
      <Menu />
      <div id='doughnut-container'>
        <DoughnutChart />
      </div>
      <select aria-label={'month'}>
        {
          months.map((month, idx) => 
            <option value={idx} key={month}>{month} 2023</option>
          )
        }
      </select>
      <div className={'month-summaries'}>
        <span>Income:</span>
        <span>0.00</span>
      </div>
      <div className={'month-summaries'}>
        <span>Expense:</span>
        <span>0.00</span>
      </div>
      <hr style={{ width: '90%'}}/>
      <div className={'month-summaries'}>
        <span>Total:</span>
        <span>0.00</span>
      </div>
      <div className={'bottom'}>
        <button>Locked</button>
        <button>Edit</button>
      </div>
    </div>
  )
};

export default Summary;