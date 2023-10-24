import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { chartData } from '../../utils/chartData';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {

  return (
    <Doughnut
      data={chartData()}
    />
  )
};

export default DoughnutChart;