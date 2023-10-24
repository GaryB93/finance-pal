import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { chartData } from '../../utils/chartData';
import { Item } from '../../reducers/financeReducer';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (
  {categories, items}:
  {categories: Array<string>, items: Array<Item>}) => {
  
    const totals = new Array(categories.length);
    totals.fill(0.00);
    items.forEach(item => {
      totals[categories.indexOf(item.category)] += item.amount;
    });

    return (
      <Doughnut
        data={chartData(categories, totals)}
      />
    );
};

export default DoughnutChart;