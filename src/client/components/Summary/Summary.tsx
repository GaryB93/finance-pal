import { useEffect, useState } from 'react';
import DoughnutChart from "../DoughnutChart";
import Menu from '../Menu';
import './Summary.css';
import axios from 'axios';
import { ENDPOINTS } from '../../constants/endpoints';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { financesFetched } from '../../reducers/financeReducer';
import { months } from '../../constants/months';
import { generateYears } from '../../utils/yearGenerator';

const Summary = () => {
  const today = new Date();

  const userId = useAppSelector(state => state.user.userId);
  const incomes = useAppSelector(state => state.finance.incomes);
  const expenses = useAppSelector(state => state.finance.expenses);
  const [month, setMonth] = useState(today.getMonth().toString());
  const [year, setYear] = useState(today.getFullYear().toString());
  const dispatch = useAppDispatch();
  
  const years = generateYears(today);

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


  // incomes.forEach(income => {
  //   const date = new Date(income.date);
  //   console.log(date);
  //   console.log('here');
  // });

  console.log('render');

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
          onChange={(e) => {setMonth(e.target.value)}}
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
          onChange={(e) => {setYear(e.target.value)}}>
          {
            years.map(year => 
              <option value={year} key={year}>{year}</option>
            )
          }
        </select>
      </div>
      <div className={'month-summaries'}>
        <span>Income:</span>
        <span>
          {incomes.reduce((acc, curr) => {
            const date = new Date(curr.date);
            console.log(date);
            // if (curr.date.getFullYear().toString() === year &&
            //   curr.date.getMonth().toString() == month) {
            //     return acc + curr.amount;
            // }
              return acc;
            }, 0)
          }
        </span>
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